

// src/routes/payment.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPaymentIntent,
  confirmStripePayment,
  createCheckoutSession,
  confirmCheckoutSession,
} from "../controllers/paymentController.js";

const router = express.Router();

// (optional) old endpoints
router.post("/create-intent", protect, createPaymentIntent);
router.post("/confirm", protect, confirmStripePayment);

// 🔴 Stripe Checkout Session endpoint
router.post("/checkout-session", protect, createCheckoutSession);
router.post("/checkout-success", protect, confirmCheckoutSession);

export default router; // ✅ இது தான் default export (error fix)