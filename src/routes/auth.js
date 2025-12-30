
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