
// routes/cartRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  syncCart,
   clearOrderedItems, // ✅ Added sync function
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:id", protect, updateCartItem);
router.delete("/remove/:id", protect, deleteCartItem);
router.post("/sync", protect, syncCart); // ✅ Added sync route
router.post("/clear-ordered", protect, clearOrderedItems);

export default router;