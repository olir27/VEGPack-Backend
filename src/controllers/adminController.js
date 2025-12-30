

import Product from "../models/Product.js";
import User from "../models/User.js";
import FarmerStock from "../models/FarmerStock.js";
import Order from "../models/Order.js";

export const getAllProducts = async (req, res) => {
  try {
    let { page = 1, limit = 20, type } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};
    if (type) filter.type = type;

    const total = await Product.countDocuments(filter);

   const products = await Product.find(filter)
  .select("name price image description type vegetables stock quantity")
  .skip((page - 1) * limit)
  .limit(limit)
  .lean();


    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
      page,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const addProduct = async (req, res) => {
  try {
    console.log("ADMIN ADD PRODUCT BODY:", req.body);
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
     console.error("ADD PRODUCT ERROR:", err); 
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, product: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================
     USERS
=========================== */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================
     FARMERS
=========================== */
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" }).select("-password");
    res.json({ success: true, farmers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const approveFarmer = async (req, res) => {
  try {
    const farmer = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    res.json({ success: true, farmer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectFarmer = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Farmer rejected & removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================
     FARMER STOCK
=========================== */
export const getFarmerStock = async (req, res) => {
  try {
    const { farmerId } = req.query;
    const filter = farmerId ? { farmer: farmerId } : {};

    const stocks = await FarmerStock.find(filter)
      .populate("farmer", "name email")
      .lean(); // ⚡

    res.json({ success: true, stocks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const approveStock = async (req, res) => {
  try {
    const stock = await FarmerStock.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    );
    
    // Create product in main products collection
    await Product.create({
      name: stock.vegetable,
      price: stock.price,
      quantity: stock.quantity,
      type: "vegetable",
      description: `Fresh ${stock.vegetable} from farmer`,
      approved: true,
    });
    
    res.json({ success: true, stock });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const rejectStock = async (req, res) => {
  try {
    await FarmerStock.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Stock rejected & removed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ===========================
     ORDERS
=========================== */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .populate("items.productId", "name price image")
      .lean(); // ⚡ HUGE speed boost

    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

