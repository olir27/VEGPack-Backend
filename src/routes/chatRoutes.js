// routes/chatRoutes.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

// Debug: Check if API key is loaded
console.log("🔑 Gemini API Key loaded:", !!process.env.GEMINI_API_KEY);

// Initialize Gemini only if API key exists
let genAI = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  console.log("✅ Gemini AI initialized successfully");
} else {
  console.error("❌ GEMINI_API_KEY not found in environment variables");
}

router.post("/", async (req, res) => {
  console.log("📨 Chat request received:", req.body);

  try {
    const { message } = req.body;

    // Validation
    if (!message || !message.trim()) {
      console.log("⚠️ Empty message received");
      return res.status(400).json({
        success: false,
        reply: "Please provide a message",
      });
    }

    // Check if API key exists
    if (!process.env.GEMINI_API_KEY || !genAI) {
      console.error("❌ Gemini API not configured");
      return res.status(500).json({
        success: false,
        reply: "Chat service is not configured. Please contact admin.",
      });
    }

    console.log("🤖 Generating response for:", message);

    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp",
    });

    // System prompt for VEGPack context
    const systemPrompt = `You are a helpful assistant for VEGPack, an online vegetable delivery platform. 
    
Help customers with:
- Information about fresh organic vegetables
- Package options (small, medium, family packages)
- Delivery schedules and options
- How to place orders
- Payment methods (COD and online payment)
- General questions about the service

Keep responses friendly, concise (2-3 sentences max), and helpful.`;

    const fullPrompt = `${systemPrompt}\n\nCustomer: ${message}\n\nAssistant:`;

    // Generate response
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Response generated:", text.substring(0, 50) + "...");

    res.json({
      success: true,
      reply: text,
    });

  } catch (error) {
    console.error("❌ Gemini Error:", error);
    console.error("Error details:", error.message);
    
    // Handle specific errors
    if (error.message?.includes("API key")) {
      return res.status(500).json({
        success: false,
        reply: "API key error. Please contact support.",
      });
    }

    if (error.message?.includes("quota") || error.message?.includes("429")) {
      return res.status(429).json({
        success: false,
        reply: "Service is busy. Please try again in a moment.",
      });
    }

    if (error.message?.includes("SAFETY")) {
      return res.status(200).json({
        success: true,
        reply: "I'm here to help with vegetable orders and delivery questions. How can I assist you?",
      });
    }

    res.status(500).json({
      success: false,
      reply: "Sorry, I'm having trouble responding right now. Please try again.",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

export default router;