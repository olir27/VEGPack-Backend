

import Shipment from "../models/Shipment.js";
import Order from "../models/Order.js";

// ---------------------------- CREATE SHIPMENT ----------------------------
export const createShipment = async (req, res) => {
  try {
    const { orderId, address, deliveryOption } = req.body;

    if (!orderId || !address) {
      return res.status(400).json({ success: false, message: "Order ID and Address are required" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const shipment = await Shipment.create({
      orderId,
      userId: req.user._id,
      address,
      deliveryOption,
      trackingNumber: "TRK" + Math.floor(100000 + Math.random() * 900000)
    });

    return res.status(201).json({ success: true, shipment });

  } catch (error) {
    console.error("Create Shipment Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
// ---------------------------- UPDATE SHIPMENT STATUS ----------------------------
export const updateShipmentStatus = async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const { status } = req.body;

    const validStatuses = ["pending", "out_for_delivery", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const shipment = await Shipment.findByIdAndUpdate(
      shipmentId,
      { status },
      { new: true }
    );

    if (!shipment) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    // 🔴 Order.shipmentStatus‑um update pannunga – reviews work aagum
    const statusMap = {
      pending: "Pending",
      out_for_delivery: "Shipped",
      delivered: "Delivered",
      cancelled: "Pending", // or "Failed" nu venumna maathalam
    };

    const orderStatus = statusMap[status];
    if (orderStatus) {
      await Order.findByIdAndUpdate(shipment.orderId, {
        shipmentStatus: orderStatus,
      });
    }

    return res.status(200).json({ success: true, shipment });
  } catch (error) {
    console.error("Update Shipment Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
// ---------------------------- GET SHIPMENT BY ORDER ----------------------------
export const getShipmentByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const shipment = await Shipment.findOne({ orderId });

    if (!shipment) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    return res.status(200).json({ success: true, shipment });

  } catch (error) {
    console.error("Get Shipment Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ---------------------------- GET ALL SHIPMENTS (ADMIN ONLY) ----------------------------
export const getAllShipments = async (req, res) => {
  try {

    const shipments = await Shipment.find()
      .populate("orderId")
      .populate("userId", "name email");

    res.status(200).json({ success: true, shipments });

  } catch (error) {
    console.error("Get All Shipments Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
