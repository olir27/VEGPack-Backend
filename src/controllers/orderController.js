

// src/controllers/orderController.js
import Order from "../models/Order.js";
import { updateProductStockForOrder } from "../utils/updateStockForOrder.js";

// Create a new order (COD or CARD)
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      deliveryMethod,
      deliveryOption,
      deliveryDate,
      totalAmount,
    } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Items missing" });
    }

    if (!deliveryMethod) {
      return res
        .status(400)
        .json({ success: false, message: "Delivery method required" });
    }

    if (!deliveryOption || !deliveryDate) {
      return res.status(400).json({
        success: false,
        message: "Delivery option/date required",
      });
    }

    const newOrder = await Order.create({
      userId: req.user._id,
      items,
      shippingAddress,
      deliveryMethod,
      deliveryOption,
      deliveryDate,
      totalAmount,
      paymentStatus: deliveryMethod === "COD" ? "Pending" : "Unpaid",
      shipmentStatus: "Pending",
    });

    res.status(201).json({ success: true, order: newOrder });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: err.message,
    });
  }
};

export const confirmCODOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId)
      return res.status(400).json({ success: false, message: "Order ID required" });

    const order = await Order.findById(orderId);
    if (!order)
      return res.status(404).json({ success: false, message: "Order not found" });

    if (["Processing", "Shipped", "Delivered"].includes(order.shipmentStatus)) {
      return res.json({ success: true, message: "Order already confirmed", order });
    }

    // 🔴 grams / units-based minus
    await updateProductStockForOrder(orderId);

    order.paymentStatus = "Pending";
    order.shipmentStatus = "Processing";
    await order.save();

    res.status(200).json({ success: true, message: "COD confirmed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: err.message || "Failed to confirm COD order",
    });
  }
};

// Admin: get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Logged-in user – own orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getMyOrders error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your orders",
      error: err.message,
    });
  }
};


// 🔹 Admin / internal: generic order update (shipmentStatus, paymentStatus etc.)
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, order });
  } catch (err) {
    console.error("updateOrder error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Update failed" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    return res.json({ success: true, message: "Order deleted" });
  } catch (err) {
    console.error("Admin deleteOrder error:", err);
    return res
      .status(500)
      .json({ success: false, message: err.message || "Delete failed" });
  }
};