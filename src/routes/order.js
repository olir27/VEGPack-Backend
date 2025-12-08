// import express from "express";
// import Order from "../models/Order.js";

// const router = express.Router();

// // Create Order
// router.post("/", async (req, res) => {
//   try {
//     const { customer, items, paymentMethod, subtotal, paymentId } = req.body;

//     const order = new Order({
//       customer,
//       items,
//       paymentMethod,
//       subtotal,
//       paymentId: paymentId || null,
//       status: paymentMethod === "COD" ? "Pending" : "Paid",
//     });

//     await order.save();
//     res.status(201).json({ message: "Order created successfully", order });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create order", error: err.message });
//   }
// });

// export default router;


// import express from "express";
// import { createOrder, confirmCODOrder } from "../controllers/orderController.js";
// import { createPaymentIntent, confirmStripePayment } from "../controllers/paymentController.js";
// import { updateShipmentStatus } from "../controllers/shipmentController.js";
// import { authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create", authMiddleware, createOrder);
// router.post("/confirm-cod", authMiddleware, confirmCODOrder);

// router.post("/payment/create-intent", authMiddleware, createPaymentIntent);
// router.post("/payment/confirm", authMiddleware, confirmStripePayment);

// router.post("/shipment/update", updateShipmentStatus);

// export default router;



// import express from "express";
// import { createOrder, confirmCODOrder } from "../controllers/orderController.js";
// import { createPaymentIntent, confirmStripePayment } from "../controllers/paymentController.js";
// import { updateShipmentStatus } from "../controllers/shipmentController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Order creation
// router.post("/create", protect, createOrder);

// // COD confirm
// router.post("/confirm-cod", protect, confirmCODOrder);

// // Stripe payment
// router.post("/payment/create-intent", protect, createPaymentIntent);
// router.post("/payment/confirm", protect, confirmStripePayment);

// // Shipment update (admin only – optional)
// router.post("/shipment/update", updateShipmentStatus);

// export default router;



// // routes/order.js
// import express from "express";
// import { createOrder, confirmCODOrder , getAllOrders} from "../controllers/orderController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/create", protect, createOrder);
// router.post("/confirm-cod", protect, confirmCODOrder);
// router.get("/", getAllOrders); // GET /api/orders

// export default router;


// import express from "express";
// import { getAllOrders, createOrder, confirmCODOrder,getMyOrders} from "../controllers/orderController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.get("/", protect, getAllOrders);
// router.post("/create", protect, createOrder);
// router.post("/confirm-cod", protect, confirmCODOrder);
// router.get("/my-orders", protect, getMyOrders);

// export default router;

// import express from "express";
// import { getAllOrders, createOrder, confirmCODOrder, getMyOrders } from "../controllers/orderController.js";
// import { protect, authMiddleware } from "../middleware/authMiddleware.js";

// const router = express.Router();

// // Admin only
// router.get("/", protect, authMiddleware(["admin"]), getAllOrders);

// // Normal user
// router.get("/my-orders", protect, getMyOrders);

// router.post("/create", protect, createOrder);
// router.post("/confirm-cod", protect, confirmCODOrder);

// export default router;

import express from "express";
import {
  getAllOrders,
  createOrder,
  confirmCODOrder,
  getMyOrders,
} from "../controllers/orderController.js";
import { protect, authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Admin only – global orders
router.get("/", protect, authMiddleware(["admin"]), getAllOrders);

// Logged-in user – own orders
router.get("/my-orders", protect, getMyOrders);

router.post("/create", protect, createOrder);
router.post("/confirm-cod", protect, confirmCODOrder);

export default router;