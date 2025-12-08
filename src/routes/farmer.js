import express from "express";
import {
  getFarmers,
  getFarmerById,
} from "../controllers/farmerController.js";

import { protect, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin-only: farmers
router.get("/", protect, authMiddleware(["admin"]), getFarmers);
router.get("/:id", protect, authMiddleware(["admin"]), getFarmerById);

export default router;
