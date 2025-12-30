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
    let { page = 1, limit = 20, type } = req.query;

    page = Number(page);
    limit = Number(limit);

    const filter = {};
    if (type) filter.type = type; // 🔥 server-side filter

    const total = await Product.countDocuments(filter);

    const products = await Product.find(filter)
      .select("name price image description vegetables type") // keep minimal
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      totalProducts: total,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
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
