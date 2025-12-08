// import express from "express";
// import {registerUser,loginUser,googleLogin, forgotPassword,verifyOtp, resetPassword,getUserProfile,updateUserProfile,} from "../controllers/authController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // 🔓 Public routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.post("/google-login", googleLogin);

// // 🧩 Forgot & Reset Password (using OTP)
// router.post("/forgot-password", forgotPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/reset-password", resetPassword); // ✅ removed ":token"

// // 🔐 Protected routes (requires JWT)
// router.get("/profile", authMiddleware(), getUserProfile);
// router.put("/profile", authMiddleware(), updateUserProfile); // 🔥 Update profile

// export default router;


// import express from "express";
// import { register, login, googleLogin, forgotPassword, resetPassword,verifyOtp,changePassword, } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";


// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/change-password", protect, changePassword);

// export default router;

// import express from "express";
// import {
//   register,
//   login,
//   googleLogin,
//   forgotPassword,
//   resetPassword,
//   verifyOtp,
//   changePassword,
//   logout,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);
// router.post("/google-login", googleLogin);
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);
// router.post("/verify-otp", verifyOtp);
// router.post("/change-password", protect, changePassword);

// // ✅ logout
// router.post("/logout", logout);

// export default router;

import express from "express";
import {
  register,
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  verifyOtp,
  changePassword,
  logout,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);              // ✅ NO protect / isAdmin here
router.post("/google-login", googleLogin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/verify-otp", verifyOtp);
router.post("/change-password", protect, changePassword);
router.post("/logout", logout);

export default router;