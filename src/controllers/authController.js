// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import generateToken from "../utils/generateToken.js";
// import sendEmail from "../utils/sendEmail.js";
// import crypto from "crypto";
// import { OAuth2Client } from "google-auth-library";
// import dotenv from "dotenv";

// dotenv.config();
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// // -------------------- REGISTER --------------------
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     if (!name || !email || !password || !role) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, message: "Email already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hashedPassword, role });

//     res.status(201).json({
//       success: true,
//       message: "User registered successfully",
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("Register Error:", error);
//     res.status(500).json({ success: false, message: "Server error while registering user", error: error.message });
//   }
// };

// // -------------------- LOGIN --------------------
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ success: false, message: "Email and password are required" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(400).json({ success: false, message: "Invalid credentials" });

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch)
//       return res.status(400).json({ success: false, message: "Invalid credentials" });

//     res.json({
//       success: true,
//       message: "Login successful",
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ success: false, message: "Server error while logging in", error: error.message });
//   }
// };

// // -------------------- GET PROFILE --------------------
// export const getUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select("-password");
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     res.json({ success: true, user });
//   } catch (error) {
//     console.error("Get Profile Error:", error);
//     res.status(500).json({ success: false, message: "Server error fetching profile", error: error.message });
//   }
// };

// // -------------------- GOOGLE LOGIN --------------------
// export const googleLogin = async (req, res) => {
//   try {
//     const { tokenId } = req.body;
//     const ticket = await client.verifyIdToken({ idToken: tokenId, audience: process.env.GOOGLE_CLIENT_ID });
//     const { email, name } = ticket.getPayload();

//     let user = await User.findOne({ email });
//     if (!user) {
//       const randomPassword = crypto.randomBytes(20).toString("hex");
//       user = await User.create({ name, email, password: await bcrypt.hash(randomPassword, 10), role: "customer" });
//     }

//     res.json({
//       success: true,
//       message: "Google login successful",
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//       token: generateToken(user._id),
//     });
//   } catch (error) {
//     console.error("Google login error:", error);
//     res.status(500).json({ success: false, message: "Google login failed", error: error.message });
//   }
// };

// // -------------------- FORGOT PASSWORD --------------------
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     user.resetPasswordOTP = otp;
//     user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
//     await user.save();

//     await sendEmail({
//       to: user.email,
//       subject: "OTP for Password Reset",
//       text: `Your OTP is ${otp}. It expires in 10 minutes.`,
//     });

//     res.json({ message: "OTP sent successfully to your email!" });
//   } catch (err) {
//     console.error("Forgot Password Error:", err);
//     res.status(500).json({ message: "Error sending OTP" });
//   }
// };

// // -------------------- VERIFY OTP --------------------
// export const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (user.resetPasswordExpire < Date.now())
//       return res.status(400).json({ message: "OTP expired" });

//     res.json({ message: "OTP verified successfully!" });
//   } catch (err) {
//     console.error("Verify OTP Error:", err);
//     res.status(500).json({ message: "Error verifying OTP" });
//   }
// };

// // -------------------- RESET PASSWORD --------------------
// export const resetPassword = async (req, res) => {
//   try {
//     const { email, otp, password } = req.body;
//     if (!email || !otp || !password) return res.status(400).json({ message: "All fields are required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (!user.resetPasswordOTP || user.resetPasswordOTP !== otp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     if (user.resetPasswordExpire < Date.now())
//       return res.status(400).json({ message: "OTP expired" });

//     user.password = password;
//     user.resetPasswordOTP = undefined;
//     user.resetPasswordExpire = undefined;
//     await user.save();

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
//     res.json({ message: "Password reset successful", token });
//   } catch (err) {
//     console.error("Reset Password Error:", err);
//     res.status(500).json({ message: "Error resetting password" });
//   }
// };

// // -------------------- UPDATE PROFILE --------------------
// export const updateUserProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     const { name, email, password } = req.body;
//     if (name) user.name = name;
//     if (email) user.email = email;
//     if (password) user.password = await bcrypt.hash(password, 10);

//     await user.save();

//     res.json({ success: true, message: "Profile updated successfully", user: { id: user._id, name: user.name, email: user.email, role: user.role }, token: generateToken(user._id) });
//   } catch (error) {
//     console.error("Update Profile Error:", error);
//     res.status(500).json({ success: false, message: "Error updating profile", error: error.message });
//   }
// };





import User from "../models/User.js";
import jwt from "jsonwebtoken";
import  sendEmail  from "../utils/sendEmail.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";


// Generate JWT
// // const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// const cookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
// };

// Token & cookie options (same as munnaadi)
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

// Register
// export const register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if(existing) return res.status(400).json({ message: "Email already exists" });

//     const user = await User.create({ name, email, password, role });
//     const token = generateToken(user._id);
//     res.json({ token, user });
//   } catch(err){
//     res.status(500).json({ message: err.message });
//   }
// };


// export const register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already exists" });

//     // Allow only "customer" or "farmer" from frontend. Admin manual‑aa create panna vendum.
//     let finalRole = "customer";
//     if (role === "farmer") finalRole = "farmer";

//     const user = await User.create({ name, email, password, role: finalRole });
//     const token = generateToken(user._id);
//     res.json({ token, user });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

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

// // Login
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if(!user || !user.password) 
//       return res.status(400).json({ message: "Invalid credentials" });

// if (user.role === "farmer" && !user.approved) {
//   return res.status(403).json({
//     message: "Your farmer account is waiting for admin approval.",
//   });
// }

//     const match = await user.matchPassword(password);
//     if(!match) return res.status(400).json({ message: "Invalid credentials" });

//     const token = generateToken(user._id);
//     res.json({ token, user });
//   } catch(err){
//     res.status(500).json({ message: err.message });
//   }
// };

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
// Google Login
// export const googleLogin = async (req, res) => {
//   const { email, name, googleId } = req.body;
//   try {
//     let user = await User.findOne({ email });

//     if(user){
//       // Update googleId if missing
//       if(!user.googleId){
//         user.googleId = googleId;
//         await user.save();
//       }
//     } else {
//       user = await User.create({ name, email, googleId });
//     }

//     const token = generateToken(user._id);
//     res.json({ token, user });
//   } catch(err){
//     res.status(500).json({ message: err.message });
//   }
// // };
// export const googleLogin = async (req, res) => {
//   const { email, name, googleId } = req.body;
//   try {
//     let user = await User.findOne({ email });

//     if (user) {
//       if (!user.googleId) {
//         user.googleId = googleId;
//         await user.save();
//       }
//     } else {
//       user = await User.create({ name, email, googleId });
//     }

//     const token = generateToken(user._id);

//     res
//       .cookie("token", token, cookieOptions)
//       .json({ success: true, token, user });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };
// src/controllers/authController.js (inside same file)
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