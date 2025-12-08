import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vegetable: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: Number, required: true },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("FarmerStock", stockSchema);
