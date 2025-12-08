// src/routes/product.js
import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productController.js";
import { protect, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts); // for customers
router.post("/", protect, authMiddleware(["admin"]), createProduct); // admin add product
router.get("/:id", getProductById); // get single product by id

export default router;
