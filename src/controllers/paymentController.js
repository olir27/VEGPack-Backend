

// src/controllers/paymentController.js
import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import CartItem from "../models/CartItem.js";
import Shipment from "../models/Shipment.js";
import sendEmail from "../utils/sendEmail.js";
import { updateProductStockForOrder } from "../utils/updateStockForOrder.js";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * 🔁 Common helper – payment success ஆனதும் எல்லா side effects:
 *  - Order update (Paid, Processing, deliveryMethod="CARD")
 *  - Product.stock minus (updateProductStockForOrder)
 *  - Payment record create
 *  - Cart clear
 *  - Shipment create
 *  - Email notification
 */
const handleSuccessfulPayment = async ({
  orderId,
  userId,
  amount,
  currency,
  transactionId,
  source, // 'payment_intent' | 'checkout_session'
}) => {
  // 1️⃣ Order + user தகவல்
  const order = await Order.findById(orderId).populate(
    "userId",
    "name email"
  );
  if (!order) throw new Error("Order not found");

  // Idempotent – already paid என்றால் மீண்டும் செய்ய வேண்டாம்
  if (order.paymentStatus === "Paid") {
    return order;
  }

  // 🔴 Stock check + minus
  await updateProductStockForOrder(orderId);

  // 2️⃣ Order update
  order.paymentStatus = "Paid";
  order.shipmentStatus = "Processing";
  order.deliveryMethod = "CARD";

  if (source === "payment_intent") {
    order.paymentIntentId = transactionId;
  } else if (source === "checkout_session") {
    order.checkoutSessionId = transactionId;
  }

  await order.save();

  // 3️⃣ Payment record
  const existingPayment = await Payment.findOne({ orderId, transactionId });
  if (!existingPayment) {
    await Payment.create({
      orderId,
      userId,
      amount,
      currency: currency || "lkr",
      paymentMethod: "stripe",
      paymentStatus: "Succeeded",
      transactionId,
    });
  }

  // 4️⃣ Cart clear – அந்த orderல use ஆன products மட்டும்
  const productIds = order.items
    .map((i) => i.productId)
    .filter(Boolean);

  if (productIds.length) {
    await CartItem.deleteMany({
      user: userId,
      itemId: { $in: productIds },
    });
  }

  // 5️⃣ Shipment create – இல்லனா create பண்ணு
  const existingShipment = await Shipment.findOne({ orderId });
  if (!existingShipment) {
    await Shipment.create({
      orderId,
      userId,
      address: order.shippingAddress?.address || "",
      deliveryOption: order.deliveryOption || "standard",
      status: "pending",
    });
  }

  // 6️⃣ Email notification
  const userEmail = order.userId?.email;
  const userName = order.userId?.name || "Customer";

  if (userEmail) {
    const msg = `
      Hello ${userName},<br/><br/>
      Your payment of <b>₹${amount}</b> was successful and your order <b>${order._id}</b> has been confirmed.<br/>
      We will start processing your shipment shortly.<br/><br/>
      Thank you for ordering from <b>VEGPack</b>!
    `;

    await sendEmail({
      email: userEmail,
      subject: "VegPack - Order & Payment Confirmation",
      message: msg,
    });
  }

  return order;
};

/**
 * 💳 PaymentIntent – inline card form (CardElement) use பண்ற flow க்கு
 * amount = ரூபாயில் (e.g. 500 => ₹500)
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res.status(400).json({
        success: false,
        message: "Amount and Order ID are required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // rupees -> cents
      currency: "lkr",
      metadata: { orderId, userId: req.user._id.toString() },
      payment_method_types: ["card"],
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe createPaymentIntent error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * ✅ PaymentIntent success confirm (inline card flow க்கு)
 */
export const confirmStripePayment = async (req, res) => {
  try {
    const { orderId, paymentIntentId } = req.body;

    if (!orderId || !paymentIntentId) {
      return res.status(400).json({
        success: false,
        message: "Order ID and PaymentIntent ID required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (paymentIntent.status !== "succeeded") {
      return res
        .status(400)
        .json({ success: false, message: "Payment not completed" });
    }

    const amount = paymentIntent.amount / 100;
    const currency = paymentIntent.currency;
    const userId = req.user._id;

    const updatedOrder = await handleSuccessfulPayment({
      orderId,
      userId,
      amount,
      currency,
      transactionId: paymentIntent.id,
      source: "payment_intent",
    });

    res.status(200).json({
      success: true,
      message: "Payment confirmed and order updated",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Stripe confirmStripePayment error:", err);
    res.status(500).json({
      success: false,
      message: "Stripe confirm error",
      error: err.message,
    });
  }
};

/**
 * 🌐 Stripe Checkout Session – hosted page
 */
// controllers/paymentController.js

export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    // 🔹 1) Items subtotal
    const itemsSubTotal = (order.items || []).reduce((sum, item) => {
      const qty = item.qty || item.quantity || 1;
      return sum + (item.price || 0) * qty;
    }, 0);

    // 🔹 2) Delivery charge derive from order.totalAmount (if set)
    let deliveryCharge = 0;
    if (typeof order.totalAmount === "number") {
      const diff = order.totalAmount - itemsSubTotal;
      deliveryCharge = diff > 0 ? diff : 0;
    } else {
      // fallback – older orders: items இருந்தா இந்த default use பண்ணலாம்
      deliveryCharge = (order.items && order.items.length) ? 20 : 0;
    }

    // 🔹 3) Line items for products
    const lineItems = (order.items || []).map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: { name: item.name },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.qty || item.quantity || 1,
    }));

    // 🔹 4) Extra line item – Delivery Charge
    if (deliveryCharge > 0) {
      lineItems.push({
        price_data: {
          currency: "lkr",
          product_data: { name: "Delivery Charge" },
          unit_amount: Math.round(deliveryCharge * 100),
        },
        quantity: 1,
      });
    }

    // 🔹 5) Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/order-success?orderId=${order._id}&paid=1&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/checkout`,
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
      },
    });

    return res.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    console.error("createCheckoutSession error:", err);
    res.status(500).json({
      success: false,
      message: "Stripe session error",
      error: err.message,
    });
  }
};

/**
 * 🧾 Stripe Checkout Session success confirm
 */
export const confirmCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      { expand: ["payment_intent"] }
    );

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment not completed yet",
      });
    }

    const orderId = session.metadata?.orderId;
    const metadataUserId = session.metadata?.userId;
    const userId = metadataUserId || req.user._id;

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: "Order ID missing in session",
      });
    }

    const amount = session.amount_total / 100;
    const currency = session.currency;

    const updatedOrder = await handleSuccessfulPayment({
      orderId,
      userId,
      amount,
      currency,
      transactionId: session.id,
      source: "checkout_session",
    });

    res.status(200).json({
      success: true,
      message: "Checkout session confirmed",
      order: updatedOrder,
    });
  } catch (err) {
    console.error("Stripe confirmCheckoutSession error:", err);
    res.status(500).json({
      success: false,
      message: "Stripe checkout confirm error",
      error: err.message,
    });
  }
};