


// src/controllers/cartController.js
import CartItem from "../models/CartItem.js";

/**
 * GET /api/cart
 * Logged-in user cart items பெறுவது
 */
export const getCart = async (req, res) => {
  try {
    const items = await CartItem.find({ user: req.user._id });
    res.json({ success: true, items });
  } catch (err) {
    console.error("getCart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/cart/add
 * Cart க்கு item add / merge
 */
export const addToCart = async (req, res) => {
  try {
    const {
      type,
      itemId,
      name,
      image,
      unitPrice,
      quantity,
      weightLabel, // ✅ vegetable weight (100g, 250g, 500g...)
    } = req.body;

    if (!type || !itemId || !name || !unitPrice || !quantity) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const wl = weightLabel || ""; // normalize weight label

    const totalPrice = unitPrice * quantity;

    // ✅ ஒரே product + ஒரே weight இருந்தா மட்டும் merge பண்ணும்
    const existing = await CartItem.findOne({
      user: req.user._id,
      itemId,
      weightLabel: wl,
    });

    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = existing.unitPrice * existing.quantity;
      await existing.save();
      return res.json({ success: true, item: existing });
    }

    const cartItem = await CartItem.create({
      user: req.user._id,
      type,
      itemId,
      name,
      image: image || "",
      unitPrice,
      quantity,
      totalPrice,
      weightLabel: wl, // ✅ store weight
    });

    res.status(201).json({ success: true, item: cartItem });
  } catch (err) {
    console.error("addToCart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * PUT /api/cart/update/:id
 * Quantity மட்டும் update பண்ணுறது (weight change இல்ல)
 */
export const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    const item = await CartItem.findOne({ _id: id, user: req.user._id });
    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    item.quantity = quantity;
    item.totalPrice = item.unitPrice * quantity;
    await item.save();

    res.json({ success: true, item });
  } catch (err) {
    console.error("updateCartItem error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * DELETE /api/cart/remove/:id
 * Cart item remove
 */
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await CartItem.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.json({ success: true, message: "Item removed from cart" });
  } catch (err) {
    console.error("deleteCartItem error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/cart/clear-ordered
 * Order ஆகி விட்ட products (productIds list) cartலிருந்து remove பண்ணது
 */
export const clearOrderedItems = async (req, res) => {
  try {
    const { productIds } = req.body;
    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "productIds required" });
    }

    // itemId = Product ID (vegetable / package)
    await CartItem.deleteMany({
      user: req.user._id,
      itemId: { $in: productIds },
    });

    return res.json({
      success: true,
      message: "Ordered items removed from cart",
    });
  } catch (err) {
    console.error("clearOrderedItems error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * POST /api/cart/sync
 * Guest localStorage cart → login ஆனப் பிறகு user DB cart க்கு merge பண்ணது
 */
export const syncCart = async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid cart data" });
    }

    for (const item of items) {
      const wl = item.weightLabel || "";

      const existing = await CartItem.findOne({
        user: req.user._id,
        itemId: item.itemId,
        weightLabel: wl,
      });

      if (existing) {
        existing.quantity += item.quantity;
        existing.totalPrice = existing.unitPrice * existing.quantity;
        await existing.save();
      } else {
        await CartItem.create({
          user: req.user._id,
          type: item.type,
          itemId: item.itemId,
          name: item.name,
          image: item.image || "",
          unitPrice: item.unitPrice,
          quantity: item.quantity,
          totalPrice: item.unitPrice * item.quantity,
          weightLabel: wl,
        });
      }
    }

    const cart = await CartItem.find({ user: req.user._id });
    res.json({ success: true, items: cart });
  } catch (err) {
    console.error("syncCart error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};