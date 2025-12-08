// // // src/controllers/cartController.js
// // import CartItem from "../models/CartItem.js";
// // import Product from "../models/Product.js"; // ✅ Important: register Product schema
// // import Order from "../models/Order.js";

// // /* ----------------------------
// //    GET CART ITEMS
// // ------------------------------*/
// // export const getCart = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const items = await CartItem.find({ user: userId })
// //       .populate("vegetables", "name price image"); // populate vegetable details
// //     res.json({ success: true, items });
// //   } catch (err) {
// //     console.error("Get Cart Error:", err);
// //     res.status(500).json({ success: false, message: "Server error", error: err.message });
// //   }
// // };

// // /* ----------------------------
// //    ADD TO CART
// // ------------------------------*/
// // // export const addToCart = async (req, res) => {
// // //   try {
// // //     const userId = req.user._id;
// // //     const { type, itemId, name, image, unitPrice, quantity, vegetables } = req.body;

// // //     if (!type || !itemId || !name || !unitPrice || !quantity) {
// // //       return res.status(400).json({ success: false, message: "Missing required fields" });
// // //     }

// // //     // Check if item already exists in cart
// // //     const existing = await CartItem.findOne({ user: userId, type, itemId });

// // //     if (existing) {
// // //       existing.quantity += Number(quantity);
// // //       existing.totalPrice = existing.quantity * existing.unitPrice;
// // //       await existing.save();
// // //       return res.json({ success: true, item: existing });
// // //     }

// // //     // Create new cart item
// // //     const totalPrice = Number(unitPrice) * Number(quantity);
// // //     const newItem = await CartItem.create({
// // //       user: userId,
// // //       type,
// // //       itemId,
// // //       name,
// // //       image,
// // //       unitPrice,
// // //       quantity,
// // //       totalPrice,
// // //       vegetables: vegetables || [],
// // //     });

// // //     res.json({ success: true, item: newItem });
// // //   } catch (err) {
// // //     console.error("Add to Cart Error:", err);
// // //     res.status(500).json({ success: false, message: "Error adding to cart", error: err.message });
// // //   }
// // // };

// // export const addToCart = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const { type, itemId, name, image, unitPrice, quantity, vegetables } = req.body;

// //     if (!type || !itemId || !name || !unitPrice || !quantity)
// //       return res.status(400).json({ success: false, message: "Missing fields" });

// //     let existing = await CartItem.findOne({ user: userId, type, itemId });

// //     if (existing) {
// //       existing.quantity += Number(quantity);
// //       existing.totalPrice = existing.quantity * existing.unitPrice;
// //       await existing.save();
// //       return res.json({ success: true, item: existing });
// //     }

// //     const newItem = await CartItem.create({
// //       user: userId,
// //       type,
// //       itemId,
// //       name,
// //       image,
// //       unitPrice,
// //       quantity,
// //       totalPrice: unitPrice * quantity,
// //       vegetables: vegetables || [],
// //     });

// //     res.json({ success: true, item: newItem });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Add to cart failed", error: err.message });
// //   }
// // };



// // /* ----------------------------
// //    UPDATE CART ITEM
// // ------------------------------*/
// // export const updateCartItem = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const { id } = req.params;
// //     const { quantity } = req.body;

// //     const item = await CartItem.findOne({ _id: id, user: userId });
// //     if (!item) return res.status(404).json({ success: false, message: "Cart item not found" });

// //     item.quantity = Number(quantity);
// //     item.totalPrice = item.unitPrice * item.quantity;
// //     await item.save();

// //     res.json({ success: true, item });
// //   } catch (err) {
// //     console.error("Update Cart Error:", err);
// //     res.status(500).json({ success: false, message: "Error updating cart item", error: err.message });
// //   }
// // };

// // /* ----------------------------
// //    DELETE CART ITEM
// // ------------------------------*/
// // export const deleteCartItem = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const { id } = req.params;

// //     await CartItem.deleteOne({ _id: id, user: userId });
// //     res.json({ success: true, message: "Item removed from cart" });
// //   } catch (err) {
// //     console.error("Delete Cart Error:", err);
// //     res.status(500).json({ success: false, message: "Error deleting item", error: err.message });
// //   }
// // };

// // /* ----------------------------
// //    SYNC CART (local → server)
// // ------------------------------*/
// // export const syncCart = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const localCart = req.body.items || [];

// //     for (const it of localCart) {
// //       const existing = await CartItem.findOne({ user: userId, type: it.type, itemId: it.itemId });
// //       if (existing) {
// //         existing.quantity += Number(it.quantity);
// //         existing.totalPrice = existing.quantity * existing.unitPrice;
// //         await existing.save();
// //       } else {
// //         await CartItem.create({
// //           user: userId,
// //           type: it.type,
// //           itemId: it.itemId,
// //           name: it.name,
// //           image: it.image,
// //           unitPrice: it.unitPrice,
// //           quantity: it.quantity,
// //           totalPrice: it.totalPrice,
// //           vegetables: it.vegetables || [],
// //         });
// //       }
// //     }

// //     const items = await CartItem.find({ user: userId }).populate("vegetables", "name price image");
// //     res.json({ success: true, items });
// //   } catch (err) {
// //     console.error("Sync Cart Error:", err);
// //     res.status(500).json({ success: false, message: "Error syncing cart", error: err.message });
// //   }
// // };

// // /* ----------------------------
// //    CHECKOUT
// // ------------------------------*/
// // export const checkout = async (req, res) => {
// //   try {
// //     const userId = req.user._id;
// //     const { itemIds = [], address, deliveryCharge = 20 } = req.body;

// //     if (!address) return res.status(400).json({ success: false, message: "Address required" });

// //     const filter = itemIds.length > 0 ? { _id: { $in: itemIds }, user: userId } : { user: userId };
// //     const items = await CartItem.find(filter).lean();

// //     if (!items.length) return res.status(400).json({ success: false, message: "No items to checkout" });

// //     const subtotal = items.reduce((sum, i) => sum + (i.totalPrice || i.unitPrice * i.quantity), 0);
// //     const total = subtotal + Number(deliveryCharge);

// //     const order = await Order.create({
// //       user: userId,
// //       items,
// //       address,
// //       subtotal,
// //       deliveryCharge,
// //       total,
// //       status: "pending",
// //     });

// //     await CartItem.deleteMany(filter);

// //     res.json({ success: true, order });
// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     res.status(500).json({ success: false, message: "Checkout failed", error: err.message });
// //   }
// // };



// // src/controllers/cartController.js

// // // controllers/cartController.js
// // import CartItem from "../models/CartItem.js";
// // import Order from "../models/Order.js";

// // /* ----------------------------
// //    GET CART ITEMS
// // ------------------------------*/
// // export const getCart = async (req, res) => {
// //   try {
// //     const items = await CartItem.find({ user: req.user._id }).lean();
// //     return res.json({ success: true, items });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, message: "Cart load failed" });
// //   }
// // };

// // /* ----------------------------
// //    ADD TO CART
// // ------------------------------*/
// // export const addToCart = async (req, res) => {
// //   try {
// //     const { type, itemId, name, price, image, quantity = 1 } = req.body;

// //     if (!itemId || !name || !price)
// //       return res.status(400).json({ success: false, message: "Missing fields" });

// //     const existing = await CartItem.findOne({ user: req.user._id, itemId });

// //     if (existing) {
// //       existing.quantity += quantity;
// //       existing.totalPrice = existing.quantity * existing.price;
// //       await existing.save();
// //       return res.json({ success: true, item: existing });
// //     }

// //     const item = await CartItem.create({
// //       user: req.user._id,
// //       type,
// //       itemId,
// //       name,
// //       price,
// //       image,
// //       quantity,
// //       totalPrice: price * quantity,
// //     });

// //     res.json({ success: true, item });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, message: "Add failed" });
// //   }
// // };

// // /* ----------------------------
// //    DELETE CART ITEM
// // ------------------------------*/
// // export const deleteCartItem = async (req, res) => {
// //   try {
// //     await CartItem.deleteOne({ _id: req.params.id, user: req.user._id });
// //     res.json({ success: true, message: "Item removed" });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, message: "Delete failed" });
// //   }
// // };

// // /* ----------------------------
// //    UPDATE CART ITEM QTY
// // ------------------------------*/
// // export const updateCartItem = async (req, res) => {
// //   try {
// //     const item = await CartItem.findOne({
// //       _id: req.params.id,
// //       user: req.user._id,
// //     });

// //     if (!item)
// //       return res.status(404).json({ success: false, message: "Item not found" });

// //     item.quantity = req.body.quantity;
// //     item.totalPrice = item.quantity * item.price;
// //     await item.save();

// //     res.json({ success: true, item });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, message: "Update failed" });
// //   }
// // };

// // /* ----------------------------
// //    CHECKOUT
// // ------------------------------*/
// // export const checkout = async (req, res) => {
// //   try {
// //     const { address } = req.body;

// //     if (!address)
// //       return res.status(400).json({ success: false, message: "Address required" });

// //     const items = await CartItem.find({ user: req.user._id }).lean();

// //     if (!items.length)
// //       return res.status(400).json({ success: false, message: "Cart empty" });

// //     const subtotal = items.reduce((a, b) => a + b.totalPrice, 0);
// //     const deliveryCharge = 20;
// //     const total = subtotal + deliveryCharge;

// //     const order = await Order.create({
// //       user: req.user._id,
// //       items,
// //       address,
// //       subtotal,
// //       deliveryCharge,
// //       total,
// //       status: "pending",
// //     });

// //     await CartItem.deleteMany({ user: req.user._id });

// //     res.json({ success: true, order });
// //   } catch (err) {
// //     return res.status(500).json({ success: false, message: "Checkout failed" });
// //   }
// // };


// // controllers/cartController.js
// // import CartItem from "../models/CartItem.js";
// // import Order from "../models/Order.js"; // Make sure you have an Order model
// // import Product from "../models/Product.js"; // optional, for validation

// // /* ----------------------------
// //    GET CART ITEMS
// // ------------------------------*/
// // export const getCart = async (req, res) => {
// //   try {
// //     const items = await CartItem.find({ user: req.user._id }).lean();
// //     res.json({ success: true, items });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Cart load failed" });
// //   }
// // };

// // /* ----------------------------
// //    ADD TO CART
// // ------------------------------*/
// // export const addToCart = async (req, res) => {
// //   try {
// //     const { type, itemId, name, unitPrice, image, quantity = 1, vegetables } = req.body;

// //     if (!itemId || !name || !unitPrice || !type) {
// //       return res.status(400).json({ success: false, message: "Missing required fields" });
// //     }

// //     // Check if item already exists in cart
// //     const existing = await CartItem.findOne({ user: req.user._id, itemId });

// //     if (existing) {
// //       existing.quantity += quantity;
// //       existing.totalPrice = existing.quantity * existing.unitPrice;
// //       await existing.save();
// //       return res.json({ success: true, item: existing });
// //     }

// //     // Create new cart item
// //     const newItem = await CartItem.create({
// //       user: req.user._id,
// //       type,
// //       itemId,
// //       name,
// //       image,
// //       unitPrice,
// //       quantity,
// //       totalPrice: unitPrice * quantity,
// //       vegetables: vegetables || [],
// //     });

// //     res.json({ success: true, item: newItem });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Add to cart failed" });
// //   }
// // };

// // /* ----------------------------
// //    UPDATE CART ITEM
// // ------------------------------*/
// // export const updateCartItem = async (req, res) => {
// //   try {
// //     const { quantity } = req.body;
// //     if (!quantity || quantity < 1) {
// //       return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
// //     }

// //     const item = await CartItem.findOne({ _id: req.params.id, user: req.user._id });
// //     if (!item) return res.status(404).json({ success: false, message: "Item not found" });

// //     item.quantity = quantity;
// //     item.totalPrice = item.unitPrice * quantity;
// //     await item.save();

// //     res.json({ success: true, item });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Update failed" });
// //   }
// // };

// // /* ----------------------------
// //    DELETE CART ITEM
// // ------------------------------*/
// // export const deleteCartItem = async (req, res) => {
// //   try {
// //     await CartItem.deleteOne({ _id: req.params.id, user: req.user._id });
// //     res.json({ success: true, message: "Item removed" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Delete failed" });
// //   }
// // };

// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const userId = req.user._id;

// //     const { address, phone } = req.body;

// //     if (!address || !phone) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Address and phone are required",
// //       });
// //     }

// //     // Get cart items
// //     const items = await CartItem.find({ user: userId });

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Cart is empty" });
// //     }

// //     // Calculate total
// //     const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

// //     // Create order
// //     const order = await Order.create({
// //       user: userId,
// //       items,
// //       total,
// //       address,
// //       phone,
// //       status: "Pending",
// //     });

// //     // Clear cart
// //     await CartItem.deleteMany({ user: userId });

// //     return res.status(200).json({
// //       success: true,
// //       message: "Order placed successfully",
// //       order,
// //     });

// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     return res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };



// // import CartItem from "../models/CartItem.js";
// // import Order from "../models/Order.js";
// // import mongoose from "mongoose";

// // // Get cart items for logged-in user
// // export const getCart = async (req, res) => {
// //   try {
// //     const cartItems = await CartItem.find({ user: req.user._id });
// //     res.json({ success: true, items: cartItems });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // // Add item to cart
// // export const addToCart = async (req, res) => {
// //   try {
// //     const { itemId, name, quantity, unitPrice, type, image } = req.body;
// //     const totalPrice = unitPrice * quantity;

// //     const existing = await CartItem.findOne({ user: req.user._id, itemId });
// //     if (existing) {
// //       existing.quantity += quantity;
// //       existing.totalPrice += totalPrice;
// //       await existing.save();
// //       return res.json({ success: true, item: existing });
// //     }

// //     const cartItem = await CartItem.create({
// //       user: req.user._id,
// //       itemId,
// //       name,
// //       type,
// //       image,
// //       quantity,
// //       unitPrice,
// //       totalPrice,
// //     });

// //     res.json({ success: true, item: cartItem });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // // Remove cart item
// // export const deleteCartItem = async (req, res) => {
// //   try {
// //     await CartItem.findByIdAndDelete(req.params.id);
// //     res.json({ success: true, message: "Item removed" });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };

// // // Update cart item
// // export const updateCartItem = async (req, res) => {
// //   try {
// //     const { quantity } = req.body;
// //     const cartItem = await CartItem.findById(req.params.id);
// //     if (!cartItem) return res.status(404).json({ success: false, message: "Item not found" });

// //     cartItem.quantity = quantity;
// //     cartItem.totalPrice = cartItem.unitPrice * quantity;
// //     await cartItem.save();

// //     res.json({ success: true, item: cartItem });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };




// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const { items, name, email, phone, address, landmark, deliveryOption, paymentMethod } = req.body;

// //     if (!items || !items.length) {
// //       return res.status(400).json({ success: false, message: "No items selected" });
// //     }

// //     if (!name || !phone || !address) {
// //       return res.status(400).json({ success: false, message: "Customer details incomplete" });
// //     }

// //     // Format items: convert itemId strings to ObjectId
// //     const formattedItems = items.map((item) => ({
// //       ...item,
// //       itemId: new mongoose.Types.ObjectId(item.itemId)
// //     }));

// //     // Calculate total amount
// //     const amount = formattedItems.reduce(
// //       (sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity),
// //       0
// //     );

// //     // Prepare order
// //     const order = new Order({
// //       items: formattedItems,
// //       customerDetails: {
// //         name,
// //         email,
// //         phone,
// //         addressLine: address,
// //         landmark: landmark || "",
// //         deliveryType: deliveryOption || "Home Delivery"
// //       },
// //       amount,
// //       paymentMethod: paymentMethod || "COD",
// //       status: paymentMethod === "COD" ? "cod_confirmed" : "pending_payment"
// //     });

// //     await order.save();

// //     // Remove purchased items from user's cart
// //     if (req.user) {
// //       const itemIds = formattedItems.map(i => i.itemId);
// //       await CartItem.deleteMany({ user: req.user._id, itemId: { $in: itemIds } });
// //     }

// //     return res.status(200).json({ success: true, message: "Order placed successfully", order });

// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     return res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };





// // src/controllers/cartController.js
// import CartItem from "../models/CartItem.js";
// import Order from "../models/Order.js";
// import mongoose from "mongoose";
// import Stripe from "stripe";


// // ======================= GET CART =======================
// export const getCart = async (req, res) => {
//   try {
//     const cartItems = await CartItem.find({ user: req.user._id });
//     res.json({ success: true, items: cartItems });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ======================= ADD TO CART =======================
// export const addToCart = async (req, res) => {
//   try {
//     const { itemId, name, quantity, unitPrice, type, image } = req.body;
//     const totalPrice = unitPrice * quantity;

//     const existing = await CartItem.findOne({ user: req.user._id, itemId });
//     if (existing) {
//       existing.quantity += quantity;
//       existing.totalPrice += totalPrice;
//       await existing.save();
//       return res.json({ success: true, item: existing });
//     }

//     const cartItem = await CartItem.create({
//       user: req.user._id,
//       itemId,
//       name,
//       type,
//       image,
//       quantity,
//       unitPrice,
//       totalPrice,
//     });

//     res.json({ success: true, item: cartItem });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ======================= REMOVE ITEM =======================
// export const deleteCartItem = async (req, res) => {
//   try {
//     await CartItem.findByIdAndDelete(req.params.id);
//     res.json({ success: true, message: "Item removed" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ======================= UPDATE ITEM =======================
// export const updateCartItem = async (req, res) => {
//   try {
//     const { quantity } = req.body;
//     const cartItem = await CartItem.findById(req.params.id);
//     if (!cartItem) return res.status(404).json({ success: false, message: "Item not found" });

//     cartItem.quantity = quantity;
//     cartItem.totalPrice = cartItem.unitPrice * quantity;
//     await cartItem.save();

//     res.json({ success: true, item: cartItem });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // ======================= CHECKOUT =======================
// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const { items, name, email, phone, address, landmark, deliveryOption, paymentMethod } = req.body;

// //     if (!items || !items.length)
// //       return res.status(400).json({ success: false, message: "No items selected" });

// //     if (!name || !phone || !address)
// //       return res.status(400).json({ success: false, message: "Customer details incomplete" });

// //     // Convert string itemId to ObjectId
// //     const formattedItems = items.map((item) => ({
// //       itemId: new mongoose.Types.ObjectId(item.itemId),
// //       name: item.name,
// //       quantity: item.quantity,
// //       unitPrice: item.unitPrice,
// //       totalPrice: item.totalPrice || item.unitPrice * item.quantity,
// //       type: item.type,
// //       image: item.image || "",
// //     }));

// //     // Calculate total amount
// //     const amount = formattedItems.reduce((sum, item) => sum + item.totalPrice, 0);

// //     // Create new order
// //     const order = new Order({
// //       items: formattedItems,
// //       customerDetails: {
// //         name,
// //         email: email || "",
// //         phone,
// //         addressLine: address,
// //         landmark: landmark || "",
// //         deliveryType: deliveryOption || "Home Delivery",
// //       },
// //       amount,
// //       paymentMethod: paymentMethod || "COD",
// //       status: paymentMethod === "COD" ? "cod_confirmed" : "pending_payment",
// //     });

// //     await order.save();

// //     // Remove purchased items from user's cart
// //     if (req.user) {
// //       const itemIds = formattedItems.map((i) => i.itemId);
// //       await CartItem.deleteMany({ user: req.user._id, itemId: { $in: itemIds } });
// //     }

// //     res.status(200).json({ success: true, message: "Order placed successfully", order });
// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };


// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const { items, name, email, phone, address, landmark, deliveryOption, paymentMethod } = req.body;

// //     // 1️⃣ Validate input
// //     if (!items || !Array.isArray(items) || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "No items selected" });
// //     }

// //     if (!name || !phone || !address) {
// //       return res.status(400).json({ success: false, message: "Customer details incomplete" });
// //     }

// //     console.log("User:", req.user);  // Check if user is logged in
// //     console.log("Items:", items);

// //     // 2️⃣ Format items safely
// //     const formattedItems = items.map((item) => {
// //       const validId = mongoose.Types.ObjectId.isValid(item.itemId) ? new mongoose.Types.ObjectId(item.itemId) : null;
// //       if (!validId) console.warn(`Invalid itemId skipped: ${item.itemId}`);
// //       return {
// //         itemId: validId,
// //         name: item.name || "Unnamed Item",
// //         type: item.type || "unknown",
// //         image: item.image || "",
// //         quantity: item.quantity || 1,
// //         unitPrice: item.unitPrice || 0,
// //         totalPrice: item.totalPrice || (item.unitPrice || 0) * (item.quantity || 1),
// //       };
// //     }).filter(i => i.itemId !== null); // remove invalid items

// //     if (formattedItems.length === 0) {
// //       return res.status(400).json({ success: false, message: "No valid items to checkout" });
// //     }

// //     // 3️⃣ Calculate total
// //     const amount = formattedItems.reduce((sum, item) => sum + item.totalPrice, 0);

// //     // 4️⃣ Create order
// //     const order = new Order({
// //       items: formattedItems,
// //       customerDetails: {
// //         name,
// //         email: email || "",
// //         phone,
// //         addressLine: address,
// //         landmark: landmark || "",
// //         deliveryType: deliveryOption || "Home Delivery",
// //       },
// //       amount,
// //       paymentMethod: paymentMethod || "COD",
// //       status: paymentMethod === "COD" ? "cod_pending" : "pending_payment",
// //       user: req.user ? req.user._id : null, // optional if logged in
// //     });

// //     await order.save();

// //     // 5️⃣ Remove items from user's cart (if logged in)
// //     if (req.user) {
// //       const itemIds = formattedItems.map(i => i.itemId);
// //       await CartItem.deleteMany({ user: req.user._id, itemId: { $in: itemIds } });
// //     }

// //     // 6️⃣ Return response
// //     return res.status(200).json({
// //       success: true,
// //       orderId: order._id,
// //       amount,
// //       paymentMethod: order.paymentMethod,
// //     });

// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     return res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };



// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const { items, name, email, phone, address, landmark, deliveryOption, paymentMethod } = req.body;

// //     // Validate input
// //     if (!items || !Array.isArray(items) || items.length === 0)
// //       return res.status(400).json({ success: false, message: "No items selected" });

// //     if (!name || !phone || !address)
// //       return res.status(400).json({ success: false, message: "Customer details incomplete" });

// //     // Format items safely
// //     const formattedItems = items.map((item) => {
// //       const validId = mongoose.Types.ObjectId.isValid(item.itemId) ? new mongoose.Types.ObjectId(item.itemId) : null;
// //       return {
// //         itemId: validId,
// //         name: item.name || "Unnamed Item",
// //         type: item.type || "unknown",
// //         image: item.image || "",
// //         quantity: item.quantity || 1,
// //         unitPrice: item.unitPrice || 0,
// //         totalPrice: item.totalPrice || (item.unitPrice || 0) * (item.quantity || 1),
// //       };
// //     }).filter(i => i.itemId !== null); // remove invalid items

// //     if (formattedItems.length === 0)
// //       return res.status(400).json({ success: false, message: "No valid items to checkout" });

// //     // Calculate total
// //     const amount = formattedItems.reduce((sum, item) => sum + item.totalPrice, 0);

// //     // Create order
// //     const order = new Order({
// //       items: formattedItems,
// //       customerDetails: {
// //         name,
// //         email: email || "",
// //         phone,
// //         addressLine: address,
// //         landmark: landmark || "",
// //         deliveryType: deliveryOption || "Home Delivery",
// //       },
// //       amount,
// //       paymentMethod: paymentMethod || "COD",
// //       status: paymentMethod === "COD" ? "cod_pending" : "pending_payment",
// //       user: req.user ? req.user._id : null,
// //     });

// //     await order.save();

// //     // Remove items from user's cart
// //     if (req.user) {
// //       const itemIds = formattedItems.map(i => i.itemId);
// //       await CartItem.deleteMany({ user: req.user._id, itemId: { $in: itemIds } });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       orderId: order._id,
// //       amount,
// //       paymentMethod: order.paymentMethod,
// //     });

// //   } catch (err) {
// //     console.error("Checkout Error:", err);
// //     return res.status(500).json({ success: false, message: "Server Error" });
// //   }
// // };




// // export const checkoutCart = async (req, res) => {
// //   try {
// //     const { name, email, phone, address, items, paymentMethod, amount } = req.body;

// //     if (!name || !phone || !address || !items || items.length === 0) {
// //       return res.status(400).json({ success: false, message: "Invalid order data" });
// //     }

   
// //  const order = await Order.create({
// //   customer: { name, email, phone, address },
// //   items,
// //   paymentMethod,
// //   amount,
// //   status: paymentMethod === "COD" ? "Pending Payment" : "Pending Payment", // <-- match enum
// // });


// //     if (paymentMethod === "COD") {
// //       return res.json({ success: true, paymentMethod: "COD", orderId: order._id });
// //     }


// //     // Online payment → create Stripe session
// //     return res.json({ success: true, paymentMethod: "CARD", orderId: order._id, amount });
// //   } catch (err) {
// //     console.error("Checkout error:", err);
// //     res.status(500).json({ success: false, message: "Checkout failed" });
// //   }
// // };



// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// export const checkoutCart = async (req, res) => {
//   try {
//     const { name, email, phone, address, landmark, deliveryOption, items, paymentMethod, amount } = req.body;

//     // Basic validations
//     if (!name || !phone || !address || !items || !Array.isArray(items) || items.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid order data" });
//     }

//     // Create order in DB
//     const order = await Order.create({
//       customer: { name, email, phone, address, landmark, deliveryOption },
//       items,
//       paymentMethod,
//       amount,
//       status: "Pending Payment",
//     });

//     // If COD → respond success directly
//     if (paymentMethod === "COD") {
//       return res.json({ success: true, paymentMethod: "COD", orderId: order._id });
//     }

//     // Online payment → create Stripe session
//     const lineItems = items.map(item => ({
//       price_data: {
//         currency: "inr",
//         product_data: { name: item.name },
//         unit_amount: item.unitPrice * 100, // amount in paise
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`,
//       cancel_url: `${process.env.FRONTEND_URL}/checkout`,
//       metadata: { orderId: order._id.toString() },
//     });

//     return res.json({
//       success: true,
//       paymentMethod: "CARD",
//       orderId: order._id,
//       sessionId: session.id,
//       amount,
//     });

//   } catch (err) {
//     console.error("Checkout error:", err);

//     if (err.name === "ValidationError") {
//       const messages = Object.values(err.errors).map(e => e.message);
//       return res.status(400).json({ success: false, message: messages.join(", ") });
//     }

//     res.status(500).json({ success: false, message: "Checkout failed", error: err.message });
//   }
// };

// controllers/cartController.js
// controllers/cartController.js
// import CartItem from "../models/CartItem.js";

// export const getCart = async (req, res) => {
//   try {
//     const items = await CartItem.find({ user: req.user._id });
//     res.json({ success: true, items });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const addToCart = async (req, res) => {
//   try {
//     const { type, itemId, name, image, unitPrice, quantity } = req.body;

//     if (!type || !itemId || !name || !unitPrice || !quantity) {
//       return res.status(400).json({ success: false, message: "Missing required fields" });
//     }

//     const totalPrice = unitPrice * quantity;
//     const existing = await CartItem.findOne({ user: req.user._id, itemId });

//     if (existing) {
//       existing.quantity += quantity;
//       existing.totalPrice = existing.unitPrice * existing.quantity;
//       await existing.save();
//       return res.json({ success: true, item: existing });
//     }

//     const cartItem = await CartItem.create({
//       user: req.user._id,
//       type,
//       itemId,
//       name,
//       image: image || "",
//       unitPrice,
//       quantity,
//       totalPrice,
//       weightLabel,
//     });

//     res.status(201).json({ success: true, item: cartItem });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const updateCartItem = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     if (!quantity || quantity < 1) {
//       return res.status(400).json({ success: false, message: "Invalid quantity" });
//     }

//     const item = await CartItem.findOne({ _id: id, user: req.user._id });
//     if (!item) {
//       return res.status(404).json({ success: false, message: "Cart item not found" });
//     }

//     item.quantity = quantity;
//     item.totalPrice = item.unitPrice * quantity;
//     await item.save();

//     res.json({ success: true, item });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const deleteCartItem = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleted = await CartItem.findOneAndDelete({ _id: id, user: req.user._id });
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Cart item not found" });
//     }

//     res.json({ success: true, message: "Item removed from cart" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// export const clearOrderedItems = async (req, res) => {
//   try {
//     const { productIds } = req.body;
//     if (!Array.isArray(productIds) || productIds.length === 0) {
//       return res
//         .status(400)
//         .json({ success: false, message: "productIds required" });
//     }

//     // itemId = Product ID (vegetable / package)
//     await CartItem.deleteMany({
//       user: req.user._id,
//       itemId: { $in: productIds },
//     });

//     return res.json({ success: true, message: "Ordered items removed from cart" });
//   } catch (err) {
//     console.error("clearOrderedItems error:", err);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


// export const syncCart = async (req, res) => {
//   try {
//     const { items } = req.body;

//     if (!items || !Array.isArray(items)) {
//       return res.status(400).json({ success: false, message: "Invalid cart data" });
//     }

//     for (const item of items) {
//       const existing = await CartItem.findOne({ user: req.user._id, itemId: item.itemId });

//       if (existing) {
//         existing.quantity += item.quantity;
//         existing.totalPrice = existing.unitPrice * existing.quantity;
//         await existing.save();
//       } else {
//         await CartItem.create({
//           user: req.user._id,
//           type: item.type,
//           itemId: item.itemId,
//           name: item.name,
//           image: item.image || "",
//           unitPrice: item.unitPrice,
//           quantity: item.quantity,
//           totalPrice: item.unitPrice * item.quantity,
//         });
//       }
//     }

//     const cart = await CartItem.find({ user: req.user._id });
//     res.json({ success: true, items: cart });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


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