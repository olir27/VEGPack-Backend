// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: {
//       type: String,
//       enum: ["admin", "farmer", "customer"],
//       default: "customer",
//     },
//     googleId: { type: String },
//     resetPasswordOTP: { type: String },
//     resetPasswordExpire: { type: Date },
//   },
//   { timestamps: true }
// );

// // ✅ Hash password before saving (only if modified)
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// export default mongoose.model("User", userSchema);   

// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   role: { type: String, enum: ["admin","customer","farmer"], default: "customer" },
//   googleId: { type: String },
// }, { timestamps: true });

// // Hash password
// userSchema.pre("save", async function(next){
//   if(!this.isModified("password")) return next();
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// // Match password
// userSchema.methods.matchPassword = async function(enteredPassword){
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// export default mongoose.model("User", userSchema);



// ============= BACKEND: models/User.js (ADD approved FIELD) =============
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String },
//   role: { type: String, enum: ["admin","customer","farmer"], default: "customer" },
//   googleId: { type: String },
//   approved: { type: Boolean, default: true }, // ✅ Added for farmer approval
// }, { timestamps: true });
// src/models/User.js
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ["admin", "customer", "farmer"], default: "customer" },
  googleId: { type: String },
  approved: { type: Boolean, default: true },
  
}, { timestamps: true });
// Hash password
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Match password
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);

