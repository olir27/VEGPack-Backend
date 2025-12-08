import jwt from "jsonwebtoken";

/**
 * Generate JWT Token
 * @param {Object} user - user document from MongoDB
 * @returns {string} JWT token
 */
const generateToken = (user) => {
  try {
    const payload = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "30d", // fallback added ✅
    });

    return token;
  } catch (err) {
    console.error("JWT Generation Error:", err.message);
    throw new Error("Token generation failed");
  }
};

export default generateToken;
