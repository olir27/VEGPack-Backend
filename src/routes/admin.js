// import express from "express";
// import { isAdmin } from "../middleware/auth.js";
// import {
//   getAllProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getAllUsers,
//   getAllFarmers,
//   approveFarmer,
//   getFarmerStock,
//   approveStock,
//   getAllOrders,
// } from "../controllers/adminController.js";

// const router = express.Router();

// // Admin middleware
// router.use(isAdmin);

// // Products
// router.get("/products", getAllProducts);
// router.post("/products", addProduct);
// router.put("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);

// // Users
// router.get("/users", getAllUsers);

// // Farmers
// router.get("/farmers", getAllFarmers);
// router.put("/farmers/approve/:id", approveFarmer);

// // Farmer stock
// router.get("/farmer-stock", getFarmerStock);
// router.put("/farmer-stock/approve/:id", approveStock);

// // Orders
// router.get("/orders", getAllOrders);

// export default router;



// import express from "express";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import Farmer from "../models/Farmer.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // --------------------------- PRODUCTS -----------------------------

// // GET all products
// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json({ products });
// });

// // Create product
// router.post("/products", async (req, res) => {
//   const { name, price } = req.body;
//   const p = new Product({ name, price });
//   await p.save();
//   res.json({ success: true, product: p });
// });

// // Update product
// router.put("/products/:id", async (req, res) => {
//   const { name, price } = req.body;
//   await Product.findByIdAndUpdate(req.params.id, { name, price });
//   res.json({ success: true });
// });

// // Delete product
// router.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // --------------------------- USERS -----------------------------

// router.get("/users", async (req, res) => {
//   const users = await User.find({ role: "user" });
//   res.json({ users });
// });

// // --------------------------- FARMERS -----------------------------

// router.get("/farmers", async (req, res) => {
//   const farmers = await Farmer.find();
//   res.json({ farmers });
// });

// // Approve farmer
// router.put("/farmers/approve/:id", async (req, res) => {
//   await Farmer.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // --------------------------- FARMER STOCK -----------------------------

// router.get("/farmer-stock", async (req, res) => {
//   const stocks = await FarmerStock.find().populate("farmer");
//   res.json({ stocks });
// });

// // Approve stock
// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // --------------------------- ORDERS -----------------------------

// router.get("/orders", async (req, res) => {
//   const orders = await Order.find()
//     .populate("customer")
//     .populate("items.productId");
//   res.json({ orders });
// });

// // Update order status
// router.put("/orders/:id", async (req, res) => {
//   const { status } = req.body;
//   await Order.findByIdAndUpdate(req.params.id, { status });
//   res.json({ success: true });
// });

// export default router;



// import express from "express";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import Farmer from "../models/Farmer.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // ALL ADMIN routes protected
// router.use(protect, isAdmin);

// // --------------------------- PRODUCTS -----------------------------

// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json({ success: true, products });
// });

// router.post("/products", async (req, res) => {
//   const { name, price, category, image } = req.body;

//   const newProduct = new Product({ name, price, category, image });
//   await newProduct.save();

//   res.json({ success: true, product: newProduct });
// });

// router.put("/products/:id", async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ success: true });
// });

// router.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // --------------------------- USERS -----------------------------

// router.get("/users", async (req, res) => {
//   const users = await User.find();
//   res.json({ success: true, users });
// });

// // --------------------------- FARMERS -----------------------------

// router.get("/farmers", async (req, res) => {
//   const farmers = await Farmer.find();
//   res.json({ success: true, farmers });
// });

// router.put("/farmers/approve/:id", async (req, res) => {
//   await Farmer.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // --------------------------- FARMER STOCK -----------------------------

// router.get("/farmer-stock", async (req, res) => {
//   const stocks = await FarmerStock.find().populate("farmer");
//   res.json({ success: true, stocks });
// });

// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // --------------------------- ORDERS -----------------------------

// router.get("/orders", async (req, res) => {
//   const orders = await Order.find()
//     .populate("customer")
//     .populate("items.productId");

//   res.json({ success: true, orders });
// });

// router.put("/orders/:id", async (req, res) => {
//   await Order.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ success: true });
// });

// export default router;


// import express from "express";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import Farmer from "../models/Farmer.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// router.use(protect, isAdmin);

// // Products
// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json({ success: true, products });
// });

// router.post("/products", async (req, res) => {
//   const p = await Product.create(req.body);
//   res.json({ success: true, product: p });
// });

// router.put("/products/:id", async (req, res) => {
//   await Product.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ success: true });
// });

// router.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // Users
// router.get("/users", async (req, res) => {
//   res.json({ success: true, users: await User.find() });
// });

// // Farmers
// router.get("/farmers", async (req, res) => {
//   res.json({ success: true, farmers: await Farmer.find() });
// });

// router.put("/farmers/approve/:id", async (req, res) => {
//   await Farmer.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // Farmer Stock
// router.get("/farmer-stock", async (req, res) => {
//   res.json({
//     success: true,
//     stocks: await FarmerStock.find().populate("farmer"),
//   });
// });

// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true });
//   res.json({ success: true });
// });

// // Orders
// router.get("/orders", async (req, res) => {
//   res.json({
//     success: true,
//     orders: await Order.find()
//       .populate("customer")
//       .populate("items.productId"),
//   });
// });

// router.put("/orders/:id", async (req, res) => {
//   await Order.findByIdAndUpdate(req.params.id, req.body);
//   res.json({ success: true });
// });

// export default router;


// import express from "express";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// const router = express.Router();

// // Apply middleware for all admin routes
// router.use(protect, isAdmin);

// // ----------------- PRODUCTS -----------------
// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json({ success: true, products });
// });

// router.post("/products", async (req, res) => {
//   const p = await Product.create(req.body);
//   res.json({ success: true, product: p });
// });

// router.put("/products/:id", async (req, res) => {
//   const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json({ success: true, product });
// });

// router.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // ----------------- USERS -----------------
// router.get("/users", async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json({ success: true, users });
// });

// // ----------------- FARMERS -----------------
// router.get("/farmers", async (req, res) => {
//   const farmers = await User.find({ role: "farmer" }).select("-password");
//   res.json({ success: true, farmers });
// });

// router.put("/farmers/approve/:id", async (req, res) => {
//   const farmer = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//   res.json({ success: true, farmer });
// });

// // ----------------- FARMER STOCK -----------------
// router.get("/farmer-stock", async (req, res) => {
//   const stocks = await FarmerStock.find().populate("farmer", "name email");
//   res.json({ success: true, stocks });
// });

// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   const stock = await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//   res.json({ success: true, stock });
// });

// router.delete("/farmer-stock/:id", async (req, res) => {
//   await FarmerStock.findByIdAndDelete(req.params.id);
//   res.json({ success: true });
// });

// // ----------------- ORDERS -----------------
// router.get("/orders", async (req, res) => {
//   const orders = await Order.find()
//     .populate("customer", "name email")
//     .populate("items.productId", "name price");
//   res.json({ success: true, orders });
// });

// router.put("/orders/:id", async (req, res) => {
//   const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json({ success: true, order });
// });

// export default router;



// import express from "express";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Protect all admin routes
// router.use(protect, isAdmin);

// // ------------------ PRODUCTS ------------------
// router.get("/products", async (req, res) => {
//   const products = await Product.find();
//   res.json({ success: true, products });
// });

// router.post("/products", async (req, res) => {
//   const product = await Product.create(req.body);
//   res.json({ success: true, product });
// });

// router.put("/products/:id", async (req, res) => {
//   const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json({ success: true, product: updated });
// });

// router.delete("/products/:id", async (req, res) => {
//   await Product.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: "Product deleted" });
// });

// // ------------------ USERS ------------------
// router.get("/users", async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json({ success: true, users });
// });

// // ------------------ FARMERS ------------------
// router.get("/farmers", async (req, res) => {
//   const farmers = await User.find({ role: "farmer" }).select("-password");
//   res.json({ success: true, farmers });
// });

// router.put("/farmers/approve/:id", async (req, res) => {
//   const farmer = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//   res.json({ success: true, farmer });
// });

// // ------------------ FARMER STOCK ------------------
// router.get("/farmer-stock", async (req, res) => {
//   const stocks = await FarmerStock.find().populate("farmer", "name email");
//   res.json({ success: true, stocks });
// });

// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   const stock = await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//   res.json({ success: true, stock });
// });

// router.delete("/farmer-stock/:id", async (req, res) => {
//   await FarmerStock.findByIdAndDelete(req.params.id);
//   res.json({ success: true, message: "Stock rejected and removed" });
// });

// // ------------------ ORDERS ------------------
// router.get("/orders", async (req, res) => {
//   const orders = await Order.find()
//     .populate("customer", "name email")
//     .populate("items.productId", "name price");
//   res.json({ success: true, orders });
// });

// router.put("/orders/:id", async (req, res) => {
//   const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json({ success: true, order });
// });

// export default router;



// import express from "express";
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";
// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Protect all admin routes
// router.use(protect, isAdmin);

// // ------------------ PRODUCTS ------------------
// router.get("/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ success: true, products });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.post("/products", async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.json({ success: true, product });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.put("/products/:id", async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, product: updated });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.delete("/products/:id", async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Product deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // ------------------ USERS ------------------
// router.get("/users", async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json({ success: true, users });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // ------------------ FARMERS ------------------
// router.get("/farmers", async (req, res) => {
//   try {
//     const farmers = await User.find({ role: "farmer" }).select("-password");
//     res.json({ success: true, farmers });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.put("/farmers/approve/:id", async (req, res) => {
//   try {
//     const farmer = await User.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//     res.json({ success: true, farmer });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // ------------------ FARMER STOCK ------------------
// router.get("/farmer-stock", async (req, res) => {
//   try {
//     const stocks = await FarmerStock.find().populate("farmer", "name email");
//     res.json({ success: true, stocks });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.put("/farmer-stock/approve/:id", async (req, res) => {
//   try {
//     const stock = await FarmerStock.findByIdAndUpdate(req.params.id, { approved: true }, { new: true });
//     res.json({ success: true, stock });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.delete("/farmer-stock/:id", async (req, res) => {
//   try {
//     await FarmerStock.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Stock rejected and removed" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// // ------------------ ORDERS ------------------
// router.get("/orders", async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email") // <-- changed from 'customer' to 'userId'
//       .populate("items.productId", "name price");
//     res.json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// router.put("/orders/:id", async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, order });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server error", error: error.message });
//   }
// });

// export default router;


// // routes/adminRoutes.js
// import express from "express";
// import {
//   getAllProducts,
//   addProduct,
//   updateProduct,
//   deleteProduct,
//   getAllUsers,
//   getAllFarmers,
//   approveFarmer,
//   rejectFarmer,
//   getFarmerStock,
//   approveStock,
//   rejectStock,
//   getAllOrders,
//   updateOrder,
// } from "../controllers/adminController.js";

// import { protect, isAdmin } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Protect all admin routes
// router.use(protect, isAdmin);

// /* ===========================
//       PRODUCTS
// =========================== */
// router.get("/products", getAllProducts);
// router.post("/products", addProduct);
// router.put("/products/:id", updateProduct);
// router.delete("/products/:id", deleteProduct);

// /* ===========================
//       USERS
// =========================== */
// router.get("/users", getAllUsers);

// /* ===========================
//       FARMERS
// =========================== */
// router.get("/farmers", getAllFarmers);
// router.put("/farmers/approve/:id", approveFarmer);
// router.delete("/farmers/reject/:id", rejectFarmer);

// /* ===========================
//       FARMER STOCK
// =========================== */
// router.get("/farmer-stock", getFarmerStock);
// router.put("/farmer-stock/approve/:id", approveStock);
// router.delete("/farmer-stock/reject/:id", rejectStock);

// /* ===========================
//       ORDERS
// =========================== */
// router.get("/orders", getAllOrders);
// router.put("/orders/:id", updateOrder);

// export default router;



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