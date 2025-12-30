

// src/routes/order.js
import express from "express";
import {
  getAllOrders,
  createOrder,
  confirmCODOrder,
  getMyOrders,
  deleteOrder,
  updateOrder,
} from "../controllers/orderController.js";
import { protect, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔹 Admin only – global orders list / manage
router.get("/", protect, authMiddleware(["admin"]), getAllOrders);

// 🔹 Logged-in user – own orders list
router.get("/my-orders", protect, getMyOrders);

// 🔹 Create / confirm COD (customer)
router.post("/create", protect, createOrder);
router.post("/confirm-cod", protect, confirmCODOrder);

// 🔹 Admin: update & delete single order
router.put("/:id", protect, authMiddleware(["admin"]), updateOrder);
router.delete("/:id", protect, authMiddleware(["admin"]), deleteOrder);

export default router;