// import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware.js";
// import { addStock, approveStock, getPendingStocks , getFarmerStock } from "../controllers/farmerStockController.js";
// const router = express.Router();

// // Farmer adds stock
// router.post("/", authMiddleware(["farmer"]), addStock);

// // Admin approves stock
// router.put("/approve/:id", authMiddleware(["admin"]), approveStock);

// // Admin: view pending stocks
// router.get("/pending", authMiddleware(["admin"]), getPendingStocks);

// router.get("/farmer/:id", authMiddleware(["farmer", "admin"]), getFarmerStock);

// export default router;


import express from "express";
import { protect, authMiddleware, protectWithRole } from "../middleware/authMiddleware.js";
import { addStock, approveStock, getPendingStocks, getFarmerStock } from "../controllers/farmerStockController.js";
import FarmerStock from "../models/FarmerStock.js";


const router = express.Router();

// Farmer adds stock
router.post("/", protectWithRole(["farmer"]), addStock);

// Admin approves stock
router.put("/approve/:id", protectWithRole(["admin"]), approveStock);

// Admin: view pending stocks
router.get("/pending",  protectWithRole(["admin"]), getPendingStocks);

// Get approved stocks for a farmer (farmer or admin)
router.get("/farmer/:id",  protectWithRole(["farmer", "admin"]), getFarmerStock);

// Farmer: view own pending stocks
router.get(
  "/my-pending",
  protectWithRole(["farmer"]),
  async (req, res) => {
    try {
      const stocks = await FarmerStock.find({
        farmer: req.user._id,
        approved: false,
      });
      res.json({ success: true, stocks });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
);

export default router;
