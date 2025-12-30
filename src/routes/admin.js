

// ============= BACKEND: routes/admin.js =============
import express from "express";
import {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
  getAllFarmers,
  approveFarmer,
  rejectFarmer,
  getFarmerStock,
  approveStock,
  rejectStock,
  getAllOrders,
  updateOrder,
} from "../controllers/adminController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all admin routes
router.use(protect, isAdmin);

/* ===========================
     PRODUCTS
=========================== */
router.get("/products", getAllProducts);
router.post("/products", addProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

/* ===========================
     USERS
=========================== */
router.get("/users", getAllUsers);

/* ===========================
     FARMERS
=========================== */
router.get("/farmers", getAllFarmers);
router.put("/farmers/approve/:id", approveFarmer);
router.delete("/farmers/reject/:id", rejectFarmer);

/* ===========================
     FARMER STOCK
=========================== */
router.get("/farmer-stock", getFarmerStock);
router.put("/farmer-stock/approve/:id", approveStock);
router.delete("/farmer-stock/reject/:id", rejectStock);

/* ===========================
     ORDERS
=========================== */
router.get("/orders", getAllOrders);
router.put("/orders/:id", updateOrder);

export default router;