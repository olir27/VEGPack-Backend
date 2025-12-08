// import mongoose from "mongoose";

// const CartItemSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { type: String, enum: ["vegetable", "package"], required: true },
//   itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   image: { type: String },
//   unitPrice: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// }, { timestamps: true });

// export default mongoose.model("CartItem", CartItemSchema);


// import mongoose from "mongoose";

// const CartItemSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { type: String, enum: ["vegetable", "package"], required: true },
//   itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   image: { type: String },
//   unitPrice: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// }, { timestamps: true });

// export default mongoose.model("CartItem", CartItemSchema);


// import mongoose from "mongoose";

// const CartItemSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   type: { type: String, enum: ["vegetable", "package"], required: true },
//   itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   image: { type: String },
//   unitPrice: { type: Number, required: true },
//   quantity: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   vegetables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
// }, { timestamps: true });

// export default mongoose.model("CartItem", CartItemSchema);



import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["vegetable", "package"], required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  image: String,
  unitPrice: { type: Number, required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  weightLabel: { type: String, default: "" },

}, { timestamps: true });

export default mongoose.model("CartItem", CartItemSchema);
