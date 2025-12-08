import express from "express";
import { getAllUsers, getProfile, updateProfile } from "../controllers/userController.js";
import { protect, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only route
router.get("/", protect, authMiddleware(["admin"]), getAllUsers);

// User profile routes
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
