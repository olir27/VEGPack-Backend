// import mongoose from "mongoose";

// const shipmentSchema = new mongoose.Schema(
//   {
//     order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true},
//     trackingNumber: { type: String, required: true },
//     estimatedDelivery: { type: Date },
//     status: {type: String,enum: ["Pending", "Shipped", "Delivered"],default: "Pending" }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Shipment", shipmentSchema);


// import mongoose from "mongoose";

// const shipmentSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//       required: true
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true
//     },
//     address: {
//       type: String,
//       required: true
//     },
//     deliveryOption: {
//       type: String,
//       enum: ["standard", "express"],
//       default: "standard"
//     },
//     status: {
//       type: String,
//       enum: ["pending", "out_for_delivery", "delivered", "cancelled"],
//       default: "pending"
//     },
//     trackingNumber: {
//       type: String
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Shipment", shipmentSchema);


// src/models/Shipment.js
import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    address: {
      type: String,
      required: true
    },
    deliveryOption: {
      type: String,
      enum: [
        "standard",
        "express",
        "Home Delivery", // 🔴 உங்கள் customerDetails default
        "Weekly",
        "Monthly",
      ],
      default: "standard"
    },
    status: {
      type: String,
      enum: ["pending", "out_for_delivery", "delivered", "cancelled"],
      default: "pending"
    },
    trackingNumber: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", shipmentSchema);