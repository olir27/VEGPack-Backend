// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   type: { type: String, enum: ["vegetable", "package"], required: true },
//   description: { type: String },
//   price: { type: Number, required: true },
//   quantity: { type: String, required: true } ,
//   image: { type: String },
  
//   // optional: include vegetable IDs if it's a package
//   vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// }, { timestamps: true });

// export default mongoose.model("Product", ProductSchema); // ✅ make sure default export
// src/models/Product.js
// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     // "vegetable" | "package"
//     type: { type: String, enum: ["vegetable", "package"], required: true },

//     description: String,
//     price: { type: Number, required: true },

//     // Display quantity / weight label (e.g. "500g", "1kg")
//     // required‑aa irundhaa, createProduct() la error varum, so optional‑aa vechuttu:
//     quantity: { type: String },

//     image: String,

//     // Packages‑ku – ulla irukkura vegetable products
//     vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

//     // Controllers la use pannur extra fields:
//     stock: { type: Number, default: 0 },                      // inventory
//     farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // who added
//     approved: { type: Boolean, default: true },               // admin approval
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", ProductSchema);


import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    type: {
      type: String,
      enum: ["vegetable", "package"],
      required: true,
    },

    description: { type: String },

    price: { type: Number, required: true },

    // Display unit, e.g. "500g", "1kg", "1 pack"
    quantity: { type: String },

    image: { type: String },

    // For packages: included vegetable products
    vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    // Used by farmer/product controllers
    stock: { type: Number, default: 0 },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Admin approval for farmer products
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);