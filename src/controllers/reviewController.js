import Review from "../models/Review.js";
import Order from "../models/Order.js";   

// ➕ Add review (customer)
// ➕ Add review (customer)
export const addReview = async (req, res) => {
  try {
    const { product, rating, comment } = req.body;

    if (!product || !rating || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Product, rating and comment are required" });
    }

    // 🔴 1. இந்த user அந்த product வாங்கியிருக்கானுனு check பண்ணு
    const hasPurchased = await Order.findOne({
      userId: req.user._id,
      "items.productId": product,
      // Optional: already delivered ஆனவுக்கு மட்டும் review allow பண்ணவேணும்னா:
      shipmentStatus: "Delivered",
    });

    if (!hasPurchased) {
      return res.status(400).json({
        success: false,
        message: "You can only review products you have purchased and received.",
      });
    }

    // 🔴 2. Create review (initially approved = false)
    const review = await Review.create({
      product,
      customer: req.user._id,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review submitted! It will be visible after admin approval.",
      review,
    });
  } catch (err) {
    console.error("Add review error:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

// 🧾 Admin approves a review
export const approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    review.approved = true;
    await review.save();

    res.json({ success: true, message: "Review approved", review });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// 🧩 Get reviews for a specific product
export const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId, approved: true })
      .populate("customer", "name");

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Admin: get all reviews (approved + pending)
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("customer", "name email")
      .populate("product", "name");
    res.json({ success: true, reviews });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// 🌐 Public - get all approved reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }) // 🔴 only approved
      .populate("customer", "name");

    res.json({ success: true, count: reviews.length, reviews });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};