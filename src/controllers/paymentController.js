// import Stripe from "stripe";
// import Payment from "../models/Payment.js";
// import Order from "../models/Order.js";
// import { configDotenv } from "dotenv";
// configDotenv()

// // Confirm STRIPE_SECRET_KEY exists
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("STRIPE_SECRET_KEY is not defined in .env");
// }

// // ✅ Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// /**
//  * Create a Stripe Payment Intent
//  */
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     // Find order
//     const order = await Order.findById(orderId).populate("customer");
//     if (!order) return res.status(404).json({ message: "Order not found" });

//     // Create payment intent
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(order.totalPrice * 100), // Stripe expects cents
//       currency: "usd",
//       metadata: {
//         orderId: order._id.toString(),
//         userId: order.customer._id.toString(),
//       },
//     });

//     // Save payment record in DB
//     const payment = await Payment.create({
//       orderId: order._id,
//       userId: order.customer._id,
//       amount: order.totalPrice,
//       currency: "usd",
//       paymentMethod: "stripe",
//       paymentStatus: "Pending",
//       transactionId: paymentIntent.id,
//     });

//     res.status(200).json({
//       clientSecret: paymentIntent.client_secret,
//       paymentId: payment._id,
//       message: "Payment intent created successfully",
//     });
//   } catch (err) {
//     console.error("PaymentController Error:", err);
//     res.status(500).json({ message: "Payment initiation failed", error: err.message });
//   }
// };

// /**
//  * Confirm Payment and update DB
//  */
// export const confirmPayment = async (req, res) => {
//   try {
//     const { paymentId, status } = req.body;

//     const payment = await Payment.findById(paymentId);
//     if (!payment) return res.status(404).json({ message: "Payment not found" });

//     // Update payment status
//     payment.paymentStatus = status === "succeeded" ? "Succeeded" : "Failed";
//     await payment.save();

//     // Update order status if payment succeeded
//     if (status === "succeeded") {
//       await Order.findByIdAndUpdate(payment.orderId, { status: "Paid" });
//     }

//     res.status(200).json({ message: "Payment updated successfully", payment });
//   } catch (err) {
//     console.error("Confirm Payment Error:", err);
//     res.status(500).json({ message: "Payment confirmation failed", error: err.message });
//   }
// };


// import Stripe from "stripe";
// import Order from "../models/Order.js";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Online Payment Intent
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { orderId, amount } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // in paise
//       currency: "inr",
//       metadata: { orderId },
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Payment failed", error: err.message });
//   }
// };

// // Webhook to confirm payment
// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object;
//       const orderId = paymentIntent.metadata.orderId;

//       // Update order payment status
//       await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" });

//       // Trigger shipment
//       await Shipment.create({
//         orderId,
//         status: "Pending",
//         address: (await Order.findById(orderId)).customer.address,
//       });
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error(err);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// };



// import dotenv from "dotenv";
// dotenv.config();
// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import Shipment from "../models/Shipment.js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-11-15",
// });

// // Create Stripe Payment Intent (Online Payment)
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const {  amount } = req.body;

//     if ( !amount)
//       return res.status(400).json({  error: " amount required" });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,// in paise
//       currency: "inr",
//        payment_method_types: ["card"],
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Stripe PaymentIntent Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

// // Stripe Webhook for Online Payment Confirmation
// export const handleStripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object;
//       const orderId = paymentIntent.metadata.orderId;

//       // 1️⃣ Update order payment status
//       const order = await Order.findByIdAndUpdate(orderId, { paymentStatus: "Paid" }, { new: true });

//       // 2️⃣ Create shipment automatically
//       await Shipment.create({
//         orderId,
//         address: order.customer.address,
//         status: "Pending",
//       });

//       console.log("Payment succeeded and shipment created for order:", orderId);
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error("Webhook Error:", err);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// };


// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import dotenv from "dotenv";

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET);

// // Step 1: Create Stripe Payment Intent
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, orderId } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100,
//       currency: "usd",
//       metadata: { orderId },
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Step 2: Update Order After Payment Success
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;

//     await Order.findByIdAndUpdate(orderId, {
//       paymentStatus: "Paid",
//       paymentIntentId,
//     });

//     res.json({ message: "Payment updated successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import dotenv from "dotenv";

// dotenv.config();

// // Make sure the Stripe secret key is loaded
// if (!process.env.STRIPE_SECRET_KEY) {
//   console.error("❌ STRIPE_SECRET_KEY not found in .env");
//   process.exit(1);
// }

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2025-08-13",
// });

// // ------------------- CREATE PAYMENT INTENT -------------------
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, orderId, currency = "inr" } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Amount and Order ID are required" });
//     }

//     // Multiply by 100 because Stripe expects amount in smallest currency unit (paise)
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency,
//       metadata: { orderId },
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe createPaymentIntent error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // ------------------- CONFIRM PAYMENT AND UPDATE ORDER -------------------
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;

//     if (!orderId || !paymentIntentId) {
//       return res.status(400).json({ success: false, message: "Order ID and PaymentIntent ID are required" });
//     }

//     // Optional: You can verify the payment status via Stripe API
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ success: false, message: "Payment not completed yet" });
//     }

//     // Update the order in DB
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         paymentStatus: "Paid",
//         paymentIntentId,
//         orderStatus: "Processing",
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.status(200).json({ success: true, message: "Payment confirmed and order updated", order: updatedOrder });

//   } catch (error) {
//     console.error("Stripe confirmPayment error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };



// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import dotenv from "dotenv";

// dotenv.config();

// // Make sure the Stripe secret key is loaded
// if (!process.env.STRIPE_SECRET_KEY) {
//   console.error("❌ STRIPE_SECRET_KEY not found in .env");
//   process.exit(1);
// }

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2025-08-13",
// });

// // ------------------- CREATE PAYMENT INTENT -------------------
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, orderId, currency = "inr" } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Amount and Order ID are required" });
//     }

//     // Multiply by 100 because Stripe expects amount in smallest currency unit (paise)
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency,
//       metadata: { orderId },
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe createPaymentIntent error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// // ------------------- CONFIRM PAYMENT AND UPDATE ORDER -------------------
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;

//     if (!orderId || !paymentIntentId) {
//       return res.status(400).json({ success: false, message: "Order ID and PaymentIntent ID are required" });
//     }

//     // Optional: You can verify the payment status via Stripe API
//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ success: false, message: "Payment not completed yet" });
//     }

//     // Update the order in DB
//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         paymentStatus: "Paid",
//         paymentIntentId,
//         orderStatus: "Processing",
//       },
//       { new: true }
//     );

//     if (!updatedOrder) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     res.status(200).json({ success: true, message: "Payment confirmed and order updated", order: updatedOrder });

//   } catch (error) {
//     console.error("Stripe confirmPayment error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };



// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import Payment from "../models/Payment.js";
// import dotenv from "dotenv";

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // 🔴 NEW: Create Stripe Checkout Session (hosted page on checkout.stripe.com)
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ success: false, message: "Order ID is required" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     // Order items -> Stripe line items
//     const lineItems = (order.items || []).map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100), // rupees -> paise
//       },
//       quantity: item.qty || 1,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       // Stripe payment முடிச்சு முடிஞ்சதும் frontend க்கு redirect ஆகும் URL
//       success_url: `${process.env.CLIENT_URL}/order-success?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/checkout`,
//       metadata: {
//         orderId: order._id.toString(),
//         userId: req.user._id.toString(),
//       },
//     });

//     return res.json({
//       success: true,
//       sessionId: session.id,
//       url: session.url, // 🔴 இதுதான் https://checkout.stripe.com/... URL
//     });
//   } catch (err) {
//     console.error("createCheckoutSession error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Stripe session error", error: err.message });
//   }
// };

// // Create Stripe Payment Intent
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, orderId } = req.body;

//     if (!amount || !orderId) return res.status(400).json({ success: false, message: "Amount and Order ID required" });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "inr",
//       payment_method_types: ["card"],
//       metadata: { orderId, userId: req.user._id.toString() },
//     });

//     res.status(200).json({ success: true, clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Stripe error", error: err.message });
//   }
// };

// // Confirm Stripe Payment
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;
//     if (!orderId || !paymentIntentId) return res.status(400).json({ success: false, message: "Order ID and PaymentIntent ID required" });

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
//     if (paymentIntent.status !== "succeeded") return res.status(400).json({ success: false, message: "Payment not completed" });

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       { paymentStatus: "Paid", shipmentStatus: "Processing", paymentIntentId },
//       { new: true }
//     );

//     await Payment.create({
//       orderId,
//       userId: req.user._id,
//       amount: paymentIntent.amount / 100,
//       currency: paymentIntent.currency,
//       paymentMethod: "stripe",
//       paymentStatus: "Succeeded",
//       transactionId: paymentIntent.id,
//     });

//     res.status(200).json({ success: true, message: "Payment confirmed", order: updatedOrder });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Stripe confirm error", error: err.message });
//   }
// };


// src/controllers/paymentController.js
// import Stripe from "stripe";
// import Order from "../models/Order.js";
// import Payment from "../models/Payment.js";
// import dotenv from "dotenv";
// import CartItem from "../models/CartItem.js";   // 🔴 DB cart
// import Shipment from "../models/Shipment.js";   // 🔴 shipment
// import sendEmail from "../utils/sendEmail.js";  // 🔴 email util

// dotenv.config();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// // 🔴 மறுபடியும் பயன்படுத்த common helper
// const handleSuccessfulPayment = async ({
//   orderId,
//   userId,
//   amount,
//   currency,
//   transactionId,
//   source, // 'payment_intent' | 'checkout_session'
// }) => {
//   // Order + user info எடுத்துக்கோம்
//   const order = await Order.findById(orderId).populate("userId", "name email");
//   if (!order) throw new Error("Order not found");

//   // Idempotent – already paid என்றால் மீண்டும் செய்ய வேண்டாம்
//   if (order.paymentStatus === "Paid") {
//     return order;
//   }

//   // 1️⃣ Order update
//   order.paymentStatus = "Paid";
//   order.shipmentStatus = "Processing";
//   order.deliveryMethod = "CARD";

//   if (source === "payment_intent") {
//     order.paymentIntentId = transactionId;
//   } else if (source === "checkout_session") {
//     order.checkoutSessionId = transactionId;
//   }

//   await order.save();

//   // 2️⃣ Payment record create (இல்லாதெனில்)
//   const existingPayment = await Payment.findOne({ orderId, transactionId });
//   if (!existingPayment) {
//     await Payment.create({
//       orderId,
//       userId,
//       amount,
//       currency: currency || "inr",
//       paymentMethod: "stripe",
//       paymentStatus: "Succeeded",
//       transactionId,
//     });
//   }

//   // 3️⃣ Cart clear – அந்த orderல use ஆன products
//   const productIds = order.items.map((i) => i.productId).filter(Boolean);
//   if (productIds.length) {
//     await CartItem.deleteMany({
//       user: userId,
//       itemId: { $in: productIds },
//     });
//   }

//   // 4️⃣ Shipment create – இல்லனா create பண்ணு
//   const existingShipment = await Shipment.findOne({ orderId });
//   if (!existingShipment) {
//     await Shipment.create({
//       orderId,
//       userId,
//       address: order.shippingAddress?.address || "",
//       deliveryOption: order.deliveryOption || "standard",
//       status: "pending",
//     });
//   }

//   // 5️⃣ Email notification
//   const userEmail = order.userId?.email;
//   const userName = order.userId?.name || "Customer";

//   if (userEmail) {
//     const msg = `
//       Hello ${userName},<br/><br/>
//       Your payment of <b>₹${amount}</b> was successful and your order <b>${order._id}</b> has been confirmed.<br/>
//       We will start processing your shipment shortly.<br/><br/>
//       Thank you for ordering from <b>VEGPack</b>!
//     `;

//     await sendEmail({
//       email: userEmail,
//       subject: "VegPack - Order & Payment Confirmation",
//       message: msg, // உங்கள் sendEmail util HTML handle பண்ணுதுனு assume பண்ணுறோம்
//     });
//   }

//   return order;
// };

// // 🔴 Stripe Checkout Session success confirm
// export const confirmCheckoutSession = async (req, res) => {
//   try {
//     const { sessionId } = req.body;

//     if (!sessionId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Session ID is required" });
//     }

//     const session = await stripe.checkout.sessions.retrieve(sessionId, {
//       expand: ["payment_intent"],
//     });

//     if (session.payment_status !== "paid") {
//       return res
//         .status(400)
//         .json({ success: false, message: "Payment not completed yet" });
//     }

//     const orderId = session.metadata?.orderId;
//     const metadataUserId = session.metadata?.userId;
//     const userId = metadataUserId || req.user._id;

//     if (!orderId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Order ID missing in session" });
//     }

//     const amount = session.amount_total / 100;
//     const currency = session.currency;

//     const updatedOrder = await handleSuccessfulPayment({
//       orderId,
//       userId,
//       amount,
//       currency,
//       transactionId: session.id, // அல்லது session.payment_intent.id இருந்தாலும் போதும்
//       source: "checkout_session",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Checkout session confirmed",
//       order: updatedOrder,
//     });
//   } catch (err) {
//     console.error("Stripe confirmCheckoutSession error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Stripe checkout confirm error",
//       error: err.message,
//     });
//   }
// };

// // 🔴 PaymentIntent (inline card) க்கு confirm endpoint
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;

//     if (!orderId || !paymentIntentId) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Order ID and PaymentIntent ID required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res
//         .status(400)
//         .json({ success: false, message: "Payment not completed" });
//     }

//     const amount = paymentIntent.amount / 100;
//     const currency = paymentIntent.currency;
//     const userId = req.user._id;

//     const updatedOrder = await handleSuccessfulPayment({
//       orderId,
//       userId,
//       amount,
//       currency,
//       transactionId: paymentIntent.id,
//       source: "payment_intent",
//     });

//     res.status(200).json({
//       success: true,
//       message: "Payment confirmed and order updated",
//       order: updatedOrder,
//     });
//   } catch (err) {
//     console.error("Stripe confirmStripePayment error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Stripe confirm error",
//       error: err.message,
//     });
//   }
// };

// // (OPTIONAL) – still there if some parts of app use it
// export const createPaymentIntent = async (req, res) => {
//   try {
//     const { amount, orderId } = req.body;

//     if (!amount || !orderId) {
//       return res.status(400).json({ success: false, message: "Amount and Order ID are required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(amount * 100),
//       currency: "inr",
//       metadata: { orderId, userId: req.user._id.toString() },
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({
//       success: true,
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     console.error("Stripe createPaymentIntent error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };

// (OPTIONAL) – if you still use CardElement flow anywhere
// export const confirmStripePayment = async (req, res) => {
//   try {
//     const { orderId, paymentIntentId } = req.body;

//     if (!orderId || !paymentIntentId) {
//       return res.status(400).json({ success: false, message: "Order ID and PaymentIntent ID are required" });
//     }

//     const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

//     if (paymentIntent.status !== "succeeded") {
//       return res.status(400).json({ success: false, message: "Payment not completed yet" });
//     }

//     const updatedOrder = await Order.findByIdAndUpdate(
//       orderId,
//       {
//         paymentStatus: "Paid",
//         shipmentStatus: "Processing",
//         paymentIntentId,
//       },
//       { new: true }
//     );

//     await Payment.create({
//       orderId,
//       userId: req.user._id,
//       amount: paymentIntent.amount / 100,
//       currency: paymentIntent.currency,
//       paymentMethod: "stripe",
//       paymentStatus: "Succeeded",
//       transactionId: paymentIntent.id,
//     });

//     res.status(200).json({
//       success: true,
//       message: "Payment confirmed and order updated",
//       order: updatedOrder,
//     });
//   } catch (error) {
//     console.error("Stripe confirmPayment error:", error);
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// };


// // 🔴 Stripe Checkout Session உருவாக்குறது (இது already உங்க codeல இருக்கலாம்)
// export const createCheckoutSession = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ success: false, message: "Order ID is required" });
//     }

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     const lineItems = (order.items || []).map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.qty || 1,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.CLIENT_URL}/order-success?orderId=${order._id}&paid=1&session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.CLIENT_URL}/checkout`,
//       metadata: {
//         orderId: order._id.toString(),
//         userId: req.user._id.toString(),
//       },
//     });

//     return res.json({
//       success: true,
//       sessionId: session.id,
//       url: session.url,
//     });
//   } catch (err) {
//     console.error("createCheckoutSession error:", err);
//     res
//       .status(500)
//       .json({ success: false, message: "Stripe session error", error: err.message });
//   }
// };


// src/controllers/paymentController.js
import Stripe from "stripe";
import dotenv from "dotenv";

import Order from "../models/Order.js";
import Payment from "../models/Payment.js";
import CartItem from "../models/CartItem.js";
import Shipment from "../models/Shipment.js";
import sendEmail from "../utils/sendEmail.js";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined in .env");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // optional apiVersion, let Stripe decide latest compatible
});

/**
 * 🔁 Common helper – payment success ஆனதும் எல்லா side effects இங்க handle பண்ணும்:
 *  - Order update (Paid, Processing, deliveryMethod="CARD")
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
  // 1️⃣ Order + user தகவல் எடுத்துக்கோ
  const order = await Order.findById(orderId).populate("userId", "name email");
  if (!order) throw new Error("Order not found");

  // Idempotent – already paid என்றால் மீண்டும் side effects செய்ய வேண்டாம்
  if (order.paymentStatus === "Paid") {
    return order;
  }

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

  // 3️⃣ Payment record (இல்லாதெனில் create)
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
  const productIds = order.items.map((i) => i.productId).filter(Boolean);
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
      message: msg, // sendEmail HTML handle பண்ணுதுனு assume பண்ணுறோம்
    });
  }

  return order;
};

/**
 * 💳 (Optional) PaymentIntent – inline card form (CardElement) use பண்ற flow க்கு
 * amount = ரூபாயில் (e.g. 500 => ₹500)
 */
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || !orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and Order ID are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // rupees -> paise
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

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

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
 * 🌐 Stripe Checkout Session – hosted page (https://checkout.stripe.com/...)
 * Frontend Checkout.jsx -> createCheckoutSession(orderId) call pannum
 */
export const createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!orderId) {
      return res
        .status(400)
        .json({ success: false, message: "Order ID is required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const lineItems = (order.items || []).map((item) => ({
      price_data: {
        currency: "lkr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty || 1,
    }));

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
      url: session.url, // frontend direct‑ஆ redirect use பண்ணும்
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
 * OrderSuccess.jsx -> confirmCheckoutSession(sessionId) call பண்ணும்
 */
export const confirmCheckoutSession = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res
        .status(400)
        .json({ success: false, message: "Session ID is required" });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

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
      transactionId: session.id, // அல்லது session.payment_intent.id use pannalaam
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