// // import express from "express";
// // import {
// //   getCart,
// //   addToCart,
// //   updateCartItem,
// //   deleteCartItem,
// //   syncCart,
// //   checkout,
// // } from "../controllers/cartController.js";
// // import { protect } from "../middleware/authMiddleware.js";

// // const router = express.Router();

// // // All cart routes require login (customer/admin can add to cart)
// // router.use(protect);

// // router.get("/", getCart);
// // router.post("/", addToCart);
// // router.put("/:id", updateCartItem);
// // router.delete("/:id", deleteCartItem);
// // router.post("/sync", syncCart);
// // router.post("/checkout", checkout);

// // export default router;



// // import express from "express";
// // import { protect } from "../middleware/authMiddleware.js";
// // import CartItem from "../models/CartItem.js";
// // import Order from "../models/Order.js";

// // const router = express.Router();

// // // 👉 Get User Cart
// // router.get("/", protect, async (req, res) => {
// //   try {
// //     const items = await CartItem.find({ user: req.user._id }).lean();
// //     res.json({ success: true, items });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: "Failed to load cart" });
// //   }
// // });

// // // 👉 Add to Cart
// // router.post("/add", protect, async (req, res) => {
// //   try {
// //     const { packageId, name, price, image } = req.body;

// //     const exist = await CartItem.findOne({
// //       user: req.user._id,
// //       packageId,
// //     });

// //     if (exist) {
// //       return res.json({ success: true, message: "Already in cart" });
// //     }

// //     await CartItem.create({
// //       user: req.user._id,
// //       packageId,
// //       name,
// //       price,
// //       image,
// //     });

// //     res.json({ success: true, message: "Added to cart" });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: "Add to cart failed" });
// //   }
// // });

// // // 👉 Checkout
// // router.post("/checkout", protect, async (req, res) => {
// //   try {
// //     const { items, total } = req.body;

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "No items" });
// //     }

// //     await Order.create({
// //       user: req.user._id,
// //       items,
// //       total,
// //     });

// //     // Clear cart
// //     await CartItem.deleteMany({ user: req.user._id });

// //     res.json({ success: true, message: "Order placed!" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Checkout failed" });
// //   }
// // });

// // export default router;




// // // routes/cartRoutes.js
// // import express from "express";
// // import { protect } from "../middleware/authMiddleware.js";
// // import {
// //   getCart,
// //   addToCart,
// //   updateCartItem,
// //   deleteCartItem,
// //   checkout,
// // } from "../controllers/cartController.js";

// // const router = express.Router();

// // router.get("/", protect, getCart);
// // router.post("/add", protect, addToCart);
// // router.put("/update/:id", protect, updateCartItem);
// // router.delete("/delete/:id", protect, deleteCartItem);
// // router.post("/checkout", protect, checkout);

// // export default router;



// // src/routes/cartRoutes.js
// // import express from "express";
// // import { protect } from "../middleware/authMiddleware.js";
// // import CartItem from "../models/CartItem.js";

// // const router = express.Router();

// // // Get user cart
// // router.get("/", protect, async (req, res) => {
// //   try {
// //     const items = await CartItem.find({ user: req.user._id }).lean();
// //     res.json({ success: true, items }); // ✅ items must be here
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Failed to load cart" });
// //   }
// // });

// // export default router;


// // import express from "express";
// // import { protect } from "../middleware/authMiddleware.js";
// // import CartItem from "../models/CartItem.js";

// // const router = express.Router();

// // // Get cart
// // router.get("/", protect, async (req, res) => {
// //   try {
// //     const items = await CartItem.find({ user: req.user._id }).lean();
// //     res.json({ success: true, items });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Failed to load cart" });
// //   }
// // });

// // // Add to cart
// // router.post("/add", protect, async (req, res) => {
// //   try {
// //     const { productId, name, price, image, quantity } = req.body;

// //     const item = await CartItem.findOne({ user: req.user._id, productId });

// //     if (item) {
// //       item.quantity += quantity;
// //       await item.save();
// //     } else {
// //       await CartItem.create({
// //         user: req.user._id,
// //         productId,
// //         name,
// //         price,
// //         image,
// //         quantity,
// //       });
// //     }

// //     res.json({ success: true, message: "Added to cart" });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Add to cart failed" });
// //   }
// // });

// // // Update quantity
// // router.put("/update/:id", protect, async (req, res) => {
// //   try {
// //     const { quantity } = req.body;

// //     await CartItem.findByIdAndUpdate(req.params.id, { quantity });

// //     res.json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Update failed" });
// //   }
// // });

// // // Remove item
// // router.delete("/remove/:id", protect, async (req, res) => {
// //   try {
// //     await CartItem.findByIdAndDelete(req.params.id);

// //     res.json({ success: true });
// //   } catch (err) {
// //     res.status(500).json({ success: false, message: "Delete failed" });
// //   }
// // });

// // export default router;



// // import express from "express";
// // import { protect } from "../middleware/authMiddleware.js";
// // import {
// //   getCart,
// //   addToCart,
// //   updateCartItem,
// //   deleteCartItem,
// //   checkoutCart,
// // } from "../controllers/cartController.js";

// // const router = express.Router();

// // // Get all cart items
// // router.get("/", protect, getCart);

// // // Add to cart
// // router.post("/add", protect, addToCart);

// // // Update quantity
// // router.put("/update/:id", protect, updateCartItem);

// // // Delete cart item
// // router.delete("/remove/:id", protect, deleteCartItem);

// // router.post("/checkout", authMiddleware, checkoutCart);


// // export default router;



// // import express from "express";
// // import { protect, authMiddleware } from "../middleware/authMiddleware.js";
// // import {
// //   getCart,
// //   addToCart,
// //   updateCartItem,
// //   deleteCartItem,
// //   checkoutCart,
// // } from "../controllers/cartController.js";

// // const router = express.Router();

// // // Get all cart items
// // router.get("/", protect, getCart);

// // // Add item to cart
// // router.post("/add", protect, addToCart);

// // // Update quantity
// // router.put("/update/:id", protect, updateCartItem);

// // // Remove cart item
// // router.delete("/remove/:id", protect, deleteCartItem);

// // // Checkout (Only customers allowed)
// // router.post(
// //   "/checkout",
// //   protect,
// //   authMiddleware(["customer"]), // change roles based on your system
// //   checkoutCart
// // );

// // export default router;



// import express from "express";
// import { protect, authMiddleware } from "../middleware/authMiddleware.js";
// import {
//   getCart,
//   addToCart,
//   updateCartItem,
//   deleteCartItem,
  
// } from "../controllers/cartController.js";

// const router = express.Router();

// router.get("/", protect, getCart);
// router.post("/add", protect, addToCart);
// router.put("/update/:id", protect, updateCartItem);
// router.delete("/remove/:id", protect, deleteCartItem);
// // router.post("/checkout", protect, authMiddleware(["customer"]), checkoutCart);

// export default router;
// routes/cartRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  syncCart,
   clearOrderedItems, // ✅ Added sync function
} from "../controllers/cartController.js";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/update/:id", protect, updateCartItem);
router.delete("/remove/:id", protect, deleteCartItem);
router.post("/sync", protect, syncCart); // ✅ Added sync route
router.post("/clear-ordered", protect, clearOrderedItems);

export default router;