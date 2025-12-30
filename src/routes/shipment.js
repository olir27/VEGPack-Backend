

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
