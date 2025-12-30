

// src/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    price: Number,
    qty: { type: Number, default: 1 },
    image: String,

    // vegetables க்கு weight / type
    weightLabel: String,           // e.g. "500g"
    type: String,                  // "vegetable" | "package" | etc.
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔴 முக்கியம்: இது string[] இல்லை, sub-document array
    items: {
      type: [orderItemSchema],
      validate: [
        (val) => Array.isArray(val) && val.length > 0,
        "At least one item is required",
      ],
    },

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      landmark: String,
    },

    deliveryMethod: {
      type: String,
      enum: ["COD", "CARD"],
      required: true,
    },

    deliveryOption: {
      type: String,
      required: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Unpaid"],
      default: "Pending",
    },

    shipmentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },

    district: String, 

    totalAmount: Number,

    paymentIntentId: { type: String },
    checkoutSessionId: { type: String },
  },
  { timestamps: true }
);

orderSchema.index({ userId: 1 });                  // user orders
orderSchema.index({ createdAt: -1 });              // recent orders
orderSchema.index({ shipmentStatus: 1 });          // admin filters
orderSchema.index({ paymentStatus: 1 });           // payment filters
orderSchema.index({ userId: 1, createdAt: -1 });   // user order history

export default mongoose.model("Order", orderSchema);