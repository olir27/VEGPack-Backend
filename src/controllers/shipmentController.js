// import Shipment from "../models/Shipment.js";
// import Order from "../models/Order.js";

// // ➕ Create shipment
// export const createShipment = async (req, res) => {
//   try {
//     const { order, courier, trackingNumber, estimatedDelivery } = req.body;
//     const shipment = await Shipment.create({ order, courier, trackingNumber, estimatedDelivery });
//     res.status(201).json({
//       success: true,
//       message: "Shipment created successfully",
//       shipment
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // 🔄 Update shipment status
// export const updateShipmentStatus = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id);
//     if (!shipment) return res.status(404).json({ message: "Shipment not found" });

//     shipment.status = req.body.status;
//     await shipment.save();

//     res.json({
//       success: true,
//       message: "Shipment status updated successfully",
//       shipment
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // 📦 Get all shipments (Admin) or user's own shipments (Customer)
// export const getAllShipments = async (req, res) => {
//   try {
//     let shipments;

//     if (req.user.role === "admin") {
//       // ✅ Admin can see all
//       shipments = await Shipment.find().populate({
//         path: "order",
//         populate: { path: "customer", select: "name email" }
//       });
//     } else if (req.user.role === "customer") {
//       // ✅ Customer can see only their shipments
//       shipments = await Shipment.find()
//         .populate({
//           path: "order",
//           match: { customer: req.user._id }, // Only orders belonging to this customer
//           select: "customer totalPrice"
//         })
//         .then(all => all.filter(s => s.order !== null)); // Filter out shipments not belonging to them
//     } else {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     res.json({
//       success: true,
//       count: shipments.length,
//       shipments
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };


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
