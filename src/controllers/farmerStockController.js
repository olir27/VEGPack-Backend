// import FarmerStock from "../models/FarmerStock.js";

// // Farmer adds stock
// export const addStock = async (req, res) => {
//   try {
//     const { vegetable, quantity, price } = req.body;
//     if (!vegetable || !quantity || !price) return res.status(400).json({ message: "Missing fields" });

//     const stock = await FarmerStock.create({
//       farmer: req.user._id,
//       vegetable,
//       quantity,
//       price,
//       approved: false
//     });

//     res.status(201).json(stock);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Admin approves stock
// export const approveStock = async (req, res) => {
//   try {
//     const stock = await FarmerStock.findById(req.params.id);
//     if (!stock) return res.status(404).json({ message: "Stock not found" });

//     stock.approved = true;
//     await stock.save();
//     res.json(stock);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Admin: get all pending stocks
// export const getPendingStocks = async (req, res) => {
//   try {
//     const stocks = await FarmerStock.find({ approved: false }).populate("farmer", "name email");
//     res.json(stocks);
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Get all approved stocks for a farmer
// export const getFarmerStock = async (req, res) => {
//   try {
//     const farmerId = req.params.id;
//     const stocks = await FarmerStock.find({ farmer: farmerId, approved: true });
//     res.json({ success: true, stocks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// controllers/farmerStockController.js
import FarmerStock from "../models/FarmerStock.js";

// Farmer adds stock
export const addStock = async (req, res) => {
  try {
    const { vegetable, quantity, price } = req.body;
    if (!vegetable || !quantity || !price) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const stock = await FarmerStock.create({
      farmer: req.user._id,
      vegetable,
      quantity,
      price,
      approved: false
    });

    res.status(201).json(stock);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin approves stock
export const approveStock = async (req, res) => {
  try {
    const stock = await FarmerStock.findById(req.params.id);
    if (!stock) return res.status(404).json({ message: "Stock not found" });

    stock.approved = true;
    await stock.save();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: get all pending stocks
export const getPendingStocks = async (req, res) => {
  try {
    const stocks = await FarmerStock.find({ approved: false }).populate("farmer", "name email");
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all approved stocks for a farmer
export const getFarmerStock = async (req, res) => {
  try {
    const farmerId = req.params.id;
    const stocks = await FarmerStock.find({ farmer: farmerId, approved: true });
    res.json({ success: true, stocks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};