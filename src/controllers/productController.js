import Product from "../models/Product.js";

// Add product (admin only)
export const createProduct = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ success:false, message:"Only admin can add products" });

    const { name, price, type, description, image, vegetables, stock } = req.body;
    if (!name || !price || !type) return res.status(400).json({ success:false, message:"Missing fields" });

    if (type === "package" && (!vegetables || vegetables.length === 0))
      return res.status(400).json({ success:false, message:"Package must include at least one vegetable" });

    const product = await Product.create({
      name,
      price,
      type,
      description: description || "",
      image: image || "",
      vegetables: type === "package" ? vegetables : [],
      stock: stock || 0,
      approved: true,
    });

    res.status(201).json({ success: true, product });
  } catch(err) {
    res.status(500).json({ success:false, message: err.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    let { page = 1, limit = 20 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    const total = await Product.countDocuments(); // total number of products
    const products = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      products,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (err) {
    console.error("Get Products Error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// controllers/productController.js
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("vegetables", "name price image quantity"); // 🔴 image + quantity சேர்க்க

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });

    res.json({ success: true, product });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: err.message });
  }
};
