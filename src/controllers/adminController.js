// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// // Products
// export const getAllProducts = async (req, res) => {
//   const products = await Product.find();
//   res.json({ success: true, products });
// };

// export const addProduct = async (req, res) => {
//   const { name, price, type, image } = req.body;
//   const product = await Product.create({ name, price, type, image });
//   res.json({ success: true, product });
// };

// export const updateProduct = async (req, res) => {
//   const { id } = req.params;
//   const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
//   res.json({ success: true, product: updated });
// };

// export const deleteProduct = async (req, res) => {
//   const { id } = req.params;
//   await Product.findByIdAndDelete(id);
//   res.json({ success: true, message: "Product deleted" });
// };

// // Users
// export const getAllUsers = async (req, res) => {
//   const users = await User.find().select("-password");
//   res.json({ success: true, users });
// };

// // Farmers
// export const getAllFarmers = async (req, res) => {
//   const farmers = await User.find({ role: "farmer" }).select("-password");
//   res.json({ success: true, farmers });
// };

// export const approveFarmer = async (req, res) => {
//   const { id } = req.params;
//   const farmer = await User.findByIdAndUpdate(id, { approved: true }, { new: true });
//   res.json({ success: true, farmer });
// };

// // Farmer stock
// export const getFarmerStock = async (req, res) => {
//   const stocks = await FarmerStock.find().populate("farmer", "name email");
//   res.json({ success: true, stocks });
// };

// export const approveStock = async (req, res) => {
//   const { id } = req.params;
//   const stock = await FarmerStock.findByIdAndUpdate(id, { approved: true }, { new: true });
//   res.json({ success: true, stock });
// };

// // Orders
// export const getAllOrders = async (req, res) => {
//   const orders = await Order.find()
//     .populate("customer", "name email")
//     .populate("items.productId", "name price");
//   res.json({ success: true, orders });
// };



// // controllers/adminController.js
// import Product from "../models/Product.js";
// import User from "../models/User.js";
// import FarmerStock from "../models/FarmerStock.js";
// import Order from "../models/Order.js";

// /* ===========================
//       PRODUCTS
// =========================== */

// export const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json({ success: true, products });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const addProduct = async (req, res) => {
//   try {
//     const product = await Product.create(req.body);
//     res.json({ success: true, product });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateProduct = async (req, res) => {
//   try {
//     const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, product: updated });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteProduct = async (req, res) => {
//   try {
//     await Product.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Product deleted" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ===========================
//       USERS
// =========================== */

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find().select("-password");
//     res.json({ success: true, users });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ===========================
//       FARMERS
// =========================== */

// export const getAllFarmers = async (req, res) => {
//   try {
//     const farmers = await User.find({ role: "farmer" }).select("-password");
//     res.json({ success: true, farmers });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const approveFarmer = async (req, res) => {
//   try {
//     const farmer = await User.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );
//     res.json({ success: true, farmer });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const rejectFarmer = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Farmer rejected & removed" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ===========================
//       FARMER STOCK
// =========================== */

// export const getFarmerStock = async (req, res) => {
//   try {
//     const stocks = await FarmerStock.find().populate("farmer", "name email");
//     res.json({ success: true, stocks });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const approveStock = async (req, res) => {
//   try {
//     const stock = await FarmerStock.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );
//     res.json({ success: true, stock });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const rejectStock = async (req, res) => {
//   try {
//     await FarmerStock.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Stock rejected & removed" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// /* ===========================
//       ORDERS
// =========================== */

// export const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate("userId", "name email") // customer details
//       .populate("items.productId", "name price image"); // product details

//     res.json({ success: true, orders });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateOrder = async (req, res) => {
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json({ success: true, order });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


import Product from "../models/Product.js";
import User from "../models/User.js";
import FarmerStock from "../models/FarmerStock.js";
import Order from "../models/Order.js";

/* ===========================
     PRODUCTS
=========================== */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json({ success: true, product });
  } catch (err) {
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
    const query = farmerId ? { farmer: farmerId } : {};
    const stocks = await FarmerStock.find(query).populate("farmer", "name email");
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
      .populate("items.productId", "name price image");

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

