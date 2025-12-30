

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/auth.js";
import farmerRoutes from "./routes/farmer.js";
import farmerStockRoutes from "./routes/farmerStock.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import paymentRoutes from "./routes/payment.js";
import reviewRoutes from "./routes/review.js";
import shipmentRoutes from "./routes/shipment.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import adminRoutes from "./routes/admin.js";
import cookieParser from "cookie-parser";
import uploadRoutes from "./routes/upload.js";


// ⭐ NEW — Chatbot Route
import chatRoutes from "./routes/chatRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- MIDDLEWARE --------------------
app.use(cors({
  origin: ["http://localhost:5173","https://veg-pack-frontend.vercel.app"],
  // origin:"https://veg-pack-frontend.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
// app.use(express.json({ limit: "10mb" }));
// app.use(express.urlencoded({ extended: true, limit: "10mb" }));



// ✅ Cookies
app.use(cookieParser());

// -------------------- DATABASE --------------------
connectDB();

// -------------------- ROUTES --------------------
app.use("/api/auth", authRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/farmer-stock", farmerStockRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);

// ⭐ NEW — Chatbot API
app.use("/api/chat", chatRoutes);

// -------------------- ERROR HANDLING --------------------
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Global error handler:", err.stack);
  res.status(500).json({ success: false, message: "Server error", error: err.message });
});

// -------------------- START SERVER --------------------
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
