


// src/routes/review.js
import express from "express";
import { authMiddleware, protect } from "../middleware/authMiddleware.js";
import {
  addReview,
  approveReview,
  getReviews,
  getReviewsByProduct,
  getAllReviewsAdmin,  
  deleteReview,         // 🔴 புதியது
} from "../controllers/reviewController.js";

const router = express.Router();

// ➕ Customer adds review
router.post("/", protect, authMiddleware(["customer"]), addReview);

// 🧾 Admin approves review
router.put("/approve/:id", protect, authMiddleware(["admin"]), approveReview);

// 🧾 Admin: get all reviews (pending + approved)
router.get(
  "/admin/all",
  protect,
  authMiddleware(["admin"]),
  getAllReviewsAdmin
);

// 🌐 Public - get all approved reviews
router.get("/", getReviews);

// 🧩 Public - get approved reviews for a specific product
router.get("/:productId", getReviewsByProduct);

router.delete("/:id",protect,authMiddleware(["admin"]),deleteReview);

export default router;