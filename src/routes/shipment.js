// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import {
//   createShipment,
//   updateShipmentStatus,
//   getAllShipments
// } from "../controllers/shipmentController.js";

// const router = express.Router();

// // ➕ Admin creates shipment
// router.post("/", authMiddleware(["admin"]), createShipment);

// // 🔄 Admin updates shipment status
// router.put("/:id", authMiddleware(["admin"]), updateShipmentStatus);

// // 📦 Admin gets all shipments; customers see only their shipments
// router.get("/", authMiddleware(["admin", "customer"]), getAllShipments);

// export default router;


// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import {
//   createShipment,
//   updateShipmentStatus,
//   getAllShipments
// } from "../controllers/shipmentController.js";

// const router = express.Router();

// router.post("/", authMiddleware(["admin"]), createShipment);
// router.put("/:id", authMiddleware(["admin"]), updateShipmentStatus);
// router.get("/", authMiddleware(["admin","customer"]), getAllShipments);

// export default router;


import express from "express";
import { protect, authMiddleware } from "../middleware/authMiddleware.js";
import {
  createShipment,
  updateShipmentStatus,
  getShipmentByOrder,
  getAllShipments
} from "../controllers/shipmentController.js";

const router = express.Router();

// Customer creates shipment (after order)
router.post("/create", protect, createShipment);

// Update shipment status (Admin)
router.put("/:shipmentId/status", protect, authMiddleware(["admin"]), updateShipmentStatus);

// Get shipment by order
router.get("/order/:orderId", protect, getShipmentByOrder);

// Admin: get all shipments
router.get("/", protect, authMiddleware(["admin"]), getAllShipments);

export default router;
