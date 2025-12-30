





import User from "../models/User.js";
import jwt from "jsonwebtoken";
import  sendEmail  from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";


// Token & cookie options (same as munnaadi)
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// const cookieOptions = {
//   httpOnly: true,
//   secure: true,         // REQUIRED for Vercel & Render
//   sameSite: "None",     // REQUIRED for cross-site cookies
//   path: "/"
// };
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",         // 🔁 only secure in prod
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  path: "/",
};


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ success: false, message: "Email already exists" });

    // only "customer" or "farmer" allowed from frontend
    let finalRole = "customer";
    if (role === "farmer") finalRole = "farmer";

    const user = await User.create({ name, email, password, role: finalRole });
    const token = generateToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const match = await user.matchPassword(password);
    if (!match)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(user._id);

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({ success: true, token, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
export const googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;
  try {
    let user = await User.findOne({ email });

    if (user) {
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      user = await User.create({ name, email, googleId });
    }

    const token = generateToken(user._id);

    res
      .cookie("token", token, cookieOptions)
       .status(200)   // ✅ cookie set
      .json({ success: true, token, user });   // ✅ shape: { success, token, user }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// ========== LOGOUT ==========
export const logout = (req, res) => {
  res
    .clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    })
    .json({ success: true, message: "Logged out" });
};

// Forgot password

// in-memory OTP store OR you can store in DB
let otpStore = {};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP temporarily
    otpStore[email] = otp;

    // Send email
    await sendEmail({
      email,
      subject: "VegPack - Password Reset OTP",
      message: `Your OTP for password reset is <b>${otp}</b>. It is valid for 5 minutes.`,
    });

    res.status(200).json({
      message: "OTP sent to your email",
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Reset password


export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields required" });
    }

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    // delete OTP
    delete otpStore[email];

    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// verify otp

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    if (otpStore[email] != otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP correct
    res.status(200).json({
      message: "OTP verified successfully",
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};



// 🔴 Change password (logged-in user, requires current password)
export const changePassword = async (req, res) => {
  try {
    const userId = req.user._id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current and new password are required",
      });
    }

    const user = await User.findById(userId);
    if (!user || !user.password) {
      return res.status(400).json({
        success: false,
        message: "User not found or password not set",
      });
    }

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    // Hash new password manually and update with findByIdAndUpdate
    const hashed = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(userId, { password: hashed });

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.error("changePassword error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};