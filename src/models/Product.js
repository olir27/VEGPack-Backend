

// import mongoose from "mongoose";

// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },

//     type: {
//       type: String,
//       enum: ["vegetable", "package"],
//       required: true,
//     },

//     description: { type: String },

//     price: { type: Number, required: true },

//     // Display unit, e.g. "500g", "1kg", "1 pack"
//     quantity: { type: String },

//     image: { type: String },

//     // For packages: included vegetable products
//     vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

//     // Used by farmer/product controllers
//     stock: { type: Number, default: 0 },
//     farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//     // Admin approval for farmer products
//     approved: { type: Boolean, default: true },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Product", ProductSchema);

// src/models/Product.js
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

    // Inventory count
      stock: { type: Number},


    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    // Admin approval for farmer products
    approved: { type: Boolean, default: true },
  },
  { timestamps: true }
);

ProductSchema.index({ type: 1 });          // fast filter (package / vegetable)
ProductSchema.index({ approved: 1 });      // fast admin filtering
ProductSchema.index({ farmer: 1 });        // fast farmer products


export default mongoose.model("Product", ProductSchema);