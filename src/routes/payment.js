// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { createPaymentIntent } from "../controllers/paymentController.js";

// const router = express.Router();

// router.post("/create-intent", authMiddleware(["customer"]), createPaymentIntent);

// export default router;


// import express from "express";
// import { createPaymentIntent, handleStripeWebhook } from "../controllers/paymentController.js";

// const router = express.Router();

// // Create payment intent (frontend calls this)
// router.post("/create-intent", createPaymentIntent);

// // Stripe webhook (raw body required)
// router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

// export default router;

// import express from "express";
// import Stripe from "stripe";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// // Initialize Stripe with secret key from environment
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Create Payment Intent
// router.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, currency = "inr" } = req.body;

//     if (!amount) return res.status(400).json({ error: "Amount is required" });

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount, // in paise
//       currency,
//       payment_method_types: ["card"],
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (err) {
//     console.error("Stripe createPaymentIntent error:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;


// import express from "express";
// import { createPaymentIntent, confirmStripePayment } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Customer creates payment intent
// router.post("/create-intent", protect, createPaymentIntent);

// // Confirm payment after Stripe success
// router.post("/confirm", protect, confirmStripePayment);

// export default router;



// routes/payment.js
// import express from "express";
// import { createPaymentIntent, confirmStripePayment } from "../controllers/paymentController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create-intent", protect, createPaymentIntent);
// router.post("/confirm", protect, confirmStripePayment);

// export default router;


// import {
//   createPaymentIntent,
//   confirmStripePayment,
//   createCheckoutSession,   // 🔴 add
// } from "../controllers/paymentController.js";

// router.post("/create-intent", protect, createPaymentIntent);
// router.post("/confirm", protect, confirmStripePayment);

// // 🔴 NEW: Stripe Checkout Session
// router.post("/checkout-session", protect, createCheckoutSession);


// // routes/payment.js
// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import {
//   createPaymentIntent,
//   confirmStripePayment,
//   createCheckoutSession,   // Checkout Session controller
// } from "../controllers/paymentController.js";

// const router = express.Router();

// // (optional) old PaymentIntent API – use pannalaam future use kku
// router.post("/create-intent", protect, createPaymentIntent);
// router.post("/confirm", protect, confirmStripePayment);

// // 🔴 NEW: Stripe Checkout Session (hosted page on checkout.stripe.com)
// router.post("/checkout-session", protect, createCheckoutSession);

// // ✅ Default export — இது தான் முக்கியம்
// export default router;


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