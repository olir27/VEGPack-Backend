
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
  default: "standard",
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