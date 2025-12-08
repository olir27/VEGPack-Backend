// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema(
//   {
//     orderId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Order",
//       required: true,
//     },
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     amount: {
//       type: Number,
//       required: true,
//     },
//     currency: {
//       type: String,
//       default: "usd",
//     },
//     paymentMethod: {
//       type: String,
//       required: true,
//       enum: ["stripe", "paypal", "cod"], // future expansion
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Succeeded", "Failed"],
//       default: "Pending",
//     },
//     transactionId: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// const Payment = mongoose.model("Payment", paymentSchema);
// export default Payment;


import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "lkr" },
    paymentMethod: { type: String, enum: ["stripe", "cod"], required: true },
    paymentStatus: { type: String, enum: ["Pending", "Succeeded", "Failed"], default: "Pending" },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
