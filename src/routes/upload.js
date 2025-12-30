import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/image",
  protect,
  isAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ success: false, message: "No file uploaded" });
      }

      const b64 = req.file.buffer.toString("base64");
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;

      const result = await cloudinary.uploader.upload(dataURI, {
        folder: "vegpack/products",
      });

      return res.json({
        success: true,
        url: result.secure_url,
        publicId: result.public_id,
      });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(500).json({ success: false, message: "Upload failed" });
    }
  }
);

export default router;