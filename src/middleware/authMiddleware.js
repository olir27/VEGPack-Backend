

import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes – ensure a valid JWT token is present
 */
export const protect = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2️⃣ Or cookie
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID in token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
     console.error("protect error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Role-based access middleware
 */
export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied" });
    }

    next();
  };
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  next();
};

export const protectWithRole = (roles = []) => [protect, authMiddleware(roles)];