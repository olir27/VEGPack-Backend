import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmName: { type: String, required: true },
  address: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Farmer", farmerSchema);
