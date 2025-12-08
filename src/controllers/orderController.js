// import Order from "../models/Order.js";
// import Product from "../models/Product.js";

// /**
//  * 🔹 Create a new order (Customer)
//  */
// export const createOrder = async (req, res) => {
//   try {
//     const { products } = req.body; // [{ product: productId, quantity }]
//     if (!products || !products.length) {
//       return res.status(400).json({ success: false, message: "No products provided" });
//     }

//     // ✅ Calculate total price
//     let totalPrice = 0;
//     for (const item of products) {
//       const productData = await Product.findById(item.product);
//       if (!productData) {
//         return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
//       }
//       totalPrice += productData.price * item.quantity;
//     }

//     // ✅ Create order
//     const order = await Order.create({
//       customer: req.user._id,
//       products,
//       totalPrice,
//     });

//     // ✅ Populate for response
//     const populatedOrder = await Order.findById(order._id)
//       .populate("products.product", "name price type")
//       .populate("customer", "name email");

//     res.status(201).json({
//       success: true,
//       message: "Order created successfully",
//       order: populatedOrder,
//     });
//   } catch (err) {
//     console.error("Order creation error:", err.message);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// };

// /**
//  * 🔹 Get orders (Customer or Admin)
//  * - Customers see only their own orders
//  * - Admin sees all orders
//  * - Pagination support
//  */
// export const getOrders = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     let filter = {};
//     if (req.user.role === "customer") {
//       filter.customer = req.user._id;
//     }

//     const orders = await Order.find(filter)
//       .populate("products.product", "name price type")
//       .populate("customer", "name email")
//       .skip(skip)
//       .limit(limit)
//       .sort({ createdAt: -1 });

//     const total = await Order.countDocuments(filter);

//     res.json({
//       success: true,
//       page,
//       totalPages: Math.ceil(total / limit),
//       count: orders.length,
//       orders,
//     });
//   } catch (err) {
//     console.error("Get orders error:", err.message);
//     res.status(500).json({ success: false, message: "Server error", error: err.message });
//   }
// // };

// import Order from "../models/Order.js";
// import Payment from "../models/Payment.js"; // if you have a payment model
// import Shipment from "../models/Shipment.js";

// // Create Order
// export const createOrder = async (req, res) => {
//   try {
//     const { customer, items, subtotal, paymentMethod } = req.body;

//     if (!customer || !items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "Invalid order data" });
//     }

//     // Payment status: COD = Paid, Online = Pending
//     const paymentStatus = paymentMethod === "COD" ? "Paid" : "Pending";

//     // 1️⃣ Create Order
//     const order = await Order.create({ customer, items, subtotal, paymentMethod, paymentStatus });

//     // 2️⃣ If COD, trigger shipment immediately
//     if (paymentMethod === "COD") {
//       await Shipment.create({
//         orderId: order._id,
//         status: "Pending",
//         address: customer.address,
//       });
//     }

//     res.status(201).json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Order creation failed", error: err.message });
//   }
// };

// // Get Orders (customer sees own orders, admin sees all)
// export const getOrders = async (req, res) => {
//   try {
//     let orders;
//     if (req.user.role === "admin") {
//       orders = await Order.find().sort({ createdAt: -1 });
//     } else {
//       orders = await Order.find({ "customer._id": req.user._id }).sort({ createdAt: -1 });
//     }
//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to fetch orders", error: err.message });
//   }
// };

// // Get single order (for frontend confirmation page)
// export const getOrderById = async (req, res) => {
//   try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ success: false, message: "Order not found" });
//     res.json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to fetch order", error: err.message });
//   }
// };


// import Order from "../models/Order.js";
// import Shipment from "../models/Shipment.js";

// // Create order
// export const createOrder = async (req, res) => {
//   try {
//     const { customer, items, subtotal, paymentMethod } = req.body;

//     if (!customer || !items || items.length === 0)
//       return res.status(400).json({ success: false, message: "Invalid order data" });

//     const paymentStatus = paymentMethod === "COD" ? "Paid" : "Pending";

//     const order = await Order.create({ customer, items, subtotal, paymentMethod, paymentStatus });

//     // Trigger shipment immediately if COD
//     if (paymentMethod === "COD") {
//       await Shipment.create({
//         orderId: order._id,
//         address: customer.address,
//         status: "Pending",
//       });
//     }

//     res.status(201).json({ success: true, order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Order creation failed", error: err.message });
//   }
// };

// // Get orders
// export const getOrders = async (req, res) => {
//   try {
//     let orders;
//     if (req.user.role === "admin") {
//       orders = await Order.find().sort({ createdAt: -1 });
//     } else {
//       orders = await Order.find({ "customer._id": req.user._id }).sort({ createdAt: -1 });
//     }
//     res.json({ success: true, orders });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to fetch orders", error: err.message });
//   }
// };


// import Order from "../models/Order.js";
// import Cart from "../models/CartItem.js";

// // Step 1: Create Order (COD or CARD)
// export const createOrder = async (req, res) => {
//   try {
//     const { customer, items, paymentMethod, subtotal } = req.body;

//     const newOrder = await Order.create({
//       customer,
//       items,
//       paymentMethod,
//       subtotal,
//       paymentStatus: paymentMethod === "COD" ? "Pending" : "Unpaid",
//       status: "Processing",
//     });

//     res.status(201).json({ order: newOrder });
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     res.status(500).json({ message: "Failed to create order", error: err.message });
//   }
// };

// // Step 2: For COD → Immediately Confirm Order
// export const confirmCODOrder = async (req, res) => {
//   const { orderId } = req.body;
//   try {
//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       { paymentStatus: "Pending", status: "Confirmed" },
//       { new: true }
//     );
//     res.status(200).json({ message: "Order confirmed", order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to confirm order" });
//   }
// };



// import Order from "../models/Order.js";

// // Create a new order
// export const createOrder = async (req, res) => {
//   try {
//     const { items, shippingAddress, deliveryMethod, totalAmount } = req.body;

//     if (!items || items.length === 0 || !deliveryMethod) {
//       return res.status(400).json({ success: false, message: "Invalid order data" });
//     }

//     const newOrder = await Order.create({
//       userId: req.user._id,
//       items,
//       shippingAddress,
//       deliveryMethod,  
//       totalAmount,
//       paymentStatus: deliveryMethod === "COD" ? "Pending" : "Unpaid",
//       shipmentStatus: "Pending",
//     });

//     res.status(201).json({ success: true, order: newOrder });
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     res.status(500).json({ success: false, message: "Failed to create order", error: err.message });
//   }
// };


// // Confirm COD order
// export const confirmCODOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;
//     if (!orderId) return res.status(400).json({ message: "Order ID required" });

//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       { paymentStatus: "Pending", status: "Confirmed" },
//       { new: true }
//     );

//     res.status(200).json({ message: "Order confirmed", order });
//   } catch (err) {
//     console.error("COD confirmation failed:", err);
//     res.status(500).json({ message: "Failed to confirm order" });
//   }
// };


// import Order from "../models/Order.js";

// // Create new order
// export const createOrder = async (req, res) => {
//   try {
//     const { items, shippingAddress, deliveryMethod, totalAmount } = req.body;

//     if (!items || !items.length || !deliveryMethod) {
//       return res.status(400).json({ success: false, message: "Invalid order data" });
//     }

//     const order = await Order.create({
//       userId: req.user._id,
//       items,
//       shippingAddress,
//       deliveryMethod,
//       totalAmount,
//       paymentStatus: deliveryMethod === "COD" ? "Pending" : "Unpaid",
//       shipmentStatus: "Pending",
//     });

//     res.status(201).json({ success: true, order });
//   } catch (error) {
//     console.error("Order Creation Failed:", error);
//     res.status(500).json({ success: false, message: "Order creation failed", error });
//   }
// };

// // COD confirm
// export const confirmCODOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;

//     if (!orderId) {
//       return res.status(400).json({ success: false, message: "Order ID required" });
//     }

//     const order = await Order.findByIdAndUpdate(
//       orderId,
//       { status: "Confirmed", paymentStatus: "Pending" },
//       { new: true }
//     );

//     res.status(200).json({ success: true, order });
//   } catch (error) {
//     console.error("COD Confirm Failed:", error);
//     res.status(500).json({ success: false, message: "Failed to confirm COD order" });
//   }
// };



import Order from "../models/Order.js";

// Create a new order (COD or CARD)


export const createOrder = async (req, res) => {
  try {
    const { 
      items, 
      shippingAddress, 
      deliveryMethod, 
      deliveryOption, 
      deliveryDate, 
      totalAmount 
    } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Items missing" });
    }

    if (!deliveryMethod) {
      return res.status(400).json({ success: false, message: "Delivery method required" });
    }

    if (!deliveryOption || !deliveryDate) {
      return res.status(400).json({ success: false, message: "Delivery option/date required" });
    }

    const newOrder = await Order.create({
      userId: req.user._id,
      items,
      shippingAddress,
      deliveryMethod,
      deliveryOption,
      deliveryDate,
      totalAmount,

      paymentStatus: deliveryMethod === "COD" ? "Pending" : "Unpaid",
      shipmentStatus: "Pending",
    });

    res.status(201).json({ success: true, order: newOrder });

  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: "Failed to create order", 
      error: err.message 
    });
  }
};


// Confirm COD Order
export const confirmCODOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) return res.status(400).json({ success: false, message: "Order ID required" });

    const order = await Order.findByIdAndUpdate(
      orderId,
      { paymentStatus: "Pending", shipmentStatus: "Processing" },
      { new: true }
    );

    res.status(200).json({ success: true, message: "COD confirmed", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to confirm COD order" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getMyOrders error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch your orders",
      error: err.message,
    });
  }
};