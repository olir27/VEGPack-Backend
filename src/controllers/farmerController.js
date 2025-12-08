import User from "../models/User.js";
import Farmer from "../models/Farmer.js";
import Product from "../models/Product.js";

// Admin-only: get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find().populate("user", "name email");
    res.json({ success: true, farmers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Admin-only: get single farmer
export const getFarmerById = async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id).populate("user", "name email");
    if (!farmer) return res.status(404).json({ success: false, message: "Farmer not found" });
    res.json({ success: true, farmer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all products of a farmer
export const getFarmerProducts = async (req, res) => {
  try {
    const farmerId = req.params.id;
    const products = await Product.find({ farmer: farmerId });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Farmer adds a vegetable
export const postVegetable = async (req, res) => {
  try {
    const { name, price, stock, description } = req.body;
    const farmerId = req.user._id;

    if (!name || !price) return res.status(400).json({ success: false, message: "Missing required fields" });

    const product = await Product.create({
      name,
      price,
      stock: stock || 0,
      description,
      type: "vegetable",
      farmer: farmerId,
      approved: false, // needs admin approval
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
