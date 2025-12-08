// import mongoose from "mongoose";
//  const orderSchema = new mongoose.Schema({ 
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", 
//     required: true }, 
//     products: [
//        { 
//         product: { type: mongoose.Schema.Types.ObjectId, ref: 
//           "Product" },
//            quantity: { type: String, required: true } 
//           }
//          ],
//           totalPrice: { type: Number, required: true }, 
//           status: { type: String, enum: 
//             ["Pending","Paid","Shipped","Delivered"],
//              default: "Pending" } }, 
//              { timestamps: true }); 
             
//              export default mongoose.model("Order", orderSchema);




// // src/models/Order.js
// import mongoose from "mongoose";

// const OrderSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       type: { type: String },
//       itemId: Number,
//       name: String,
//       image: String,
//       unitPrice: Number,
//       quantity: Number,
//       totalPrice: Number,
//     }
//   ],
//   address: { type: String, required: true },
//   subtotal: Number,
//   deliveryCharge: Number,
//   total: Number,
//   status: { type: String, default: "pending" },
// }, { timestamps: true });

// export default mongoose.models.Order || mongoose.model("Order", OrderSchema);



// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: [
//       {
//         itemId: {
//           type: mongoose.Schema.Types.ObjectId, // FIXED (ObjectId, not Number)
//           required: true,
//         },
//         name: String,
//         unitPrice: Number,
//         quantity: Number,
//         totalPrice: Number,
//         image: String,
//         type: String,
//         vegetables: [],
//       },
//     ],

//     total: {
//       type: Number,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     status: {
//       type: String,
//       default: "Pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const ItemSchema = new mongoose.Schema({
//   itemId: String,
//   name: String,
//   quantity: Number,
//   unitPrice: Number,
//   totalPrice: Number,
//   type: String,
// });

// const CustomerSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   district: String,
//   addressLine: String,
//   landmark: String,
//   deliveryType: String,
//   deliveryDate: String,
// });

// const OrderSchema = new mongoose.Schema({
//   items: [ItemSchema],
//   customerDetails: CustomerSchema,
//   amount: Number,
//   paymentMethod: { type: String, enum: ["COD", "CARD"], default: "COD" },
//   status: { type: String, enum: ["pending_payment","paid","cod_confirmed","payment_failed","cancelled"], default: "pending_payment" },
//   paymentIntentId: String,
//   paymentInfo: Object,
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Order", OrderSchema);



// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     landmark: String,
//     deliveryOption: String,
//   },
//   items: [
//     {
//       itemId: String,
//       name: String,
//       type: String,
//       quantity: Number,
//       unitPrice: Number,
//       totalPrice: Number,
//     }
//   ],
//   paymentMethod: { type: String, enum: ["COD", "CARD"], required: true },
//   status: { type: String, enum: ["Pending Payment", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Pending Payment" },
//   amount: Number,
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);



// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: { type: String, required: true },
//     email: { type: String },
//     phone: { type: String, required: true },
//     address: { type: String, required: true },
//     landmark: { type: String },
//     deliveryOption: { type: String },
//   },
//   items: [
//     {
//       itemId: { type: String, required: true },
//       name: { type: String, required: true },
//       type: { type: String },
//       quantity: { type: Number, required: true },
//       unitPrice: { type: Number, required: true },
//       totalPrice: { type: Number, required: true },
//     }
//   ],
//   paymentMethod: { type: String, enum: ["COD", "CARD"], required: true },
//   status: { 
//     type: String, 
//     enum: ["Pending Payment", "Processing", "Shipped", "Delivered", "Cancelled"], 
//     default: "Pending Payment" 
//   },
//   amount: { type: Number, required: true },
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     landmark: String,
//     deliveryOption: String
//   },
//   items: [{
//     itemId: mongoose.Schema.Types.ObjectId,
//     name: String,
//     quantity: Number,
//     unitPrice: Number,
//     totalPrice: Number
//   }],
//   subtotal: Number,
//   paymentMethod: { type: String, enum: ["COD","Online"], required: true },
//   paymentStatus: { type: String, enum: ["Pending","Paid"], default: "Pending" },
//   shipmentStatus: { type: String, enum: ["Pending","Shipped"], default: "Pending" },
// }, { timestamps: true });

// export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema({
//   customer: {
//     name: String,
//     email: String,
//     phone: String,
//     address: String,
//     deliveryOption: String,
//   },
//   items: [
//     {
//       itemId: { type: mongoose.Schema.Types.ObjectId, required: true },
//       name: String,
//       quantity: Number,
//       unitPrice: Number,
//       totalPrice: Number,
//     },
//   ],
//   paymentMethod: { type: String, enum: ["COD", "Online"], required: true },
//   subtotal: { type: Number, required: true },
//   paymentId: { type: String }, // Stripe payment id for Online
//   status: { type: String, enum: ["Pending", "Paid"], default: "Pending" },
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     items: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//         name: String,
//         price: Number,
//         qty: Number,
//       },
//     ],

//     shippingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       landmark: String,
//     },

//     deliveryMethod: { type: String, enum: ["COD", "CARD"], required: true },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Paid", "Failed"],
//       default: "Pending",
//     },

//     paymentIntentId: { type: String },

//     shipmentStatus: {
//       type: String,
//       enum: ["Pending", "Processing", "Shipped", "Delivered"],
//       default: "Pending",
//     },

//     totalAmount: Number,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     items: [
//       {
//         productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
//         name: String,
//         price: Number,
//         qty: Number,
//         image: String, 

//       },
//     ],

//     shippingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       landmark: String,
      

//     },
    

//     deliveryMethod: { type: String, enum: ["COD", "CARD"], required: true },
     
//      deliveryOption: {
//       type: String,  // customer gives any text
//       required: true,
//     },

//      deliveryDate: {
//       type: Date,
//       required: true,
//     }, 
    
//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Paid", "Failed", "Unpaid"],
//       default: "Pending",
//     },

//     shipmentStatus: {
//       type: String,
//       enum: ["Pending", "Processing", "Shipped", "Delivered"],
//       default: "Pending",
//     },

//     totalAmount: Number,
//      // 🔴 optional tracking fields
//     paymentIntentId: { type: String },
//     checkoutSessionId: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);

// // src/models/Order.js
// import mongoose from "mongoose";

// const orderSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

//     items: [
//       {
//         productId: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         name: String,
//         price: Number,
//         qty: Number,
//         image: String,

//         // ✅ புதிய fields
//         weightLabel: String, // e.g. "500g"
//         type: String,        // "vegetable" | "package"
//       },
//     ],

//     shippingAddress: {
//       name: String,
//       phone: String,
//       address: String,
//       landmark: String,
//     },

//     deliveryMethod: { type: String, enum: ["COD", "CARD"], required: true },
//     deliveryOption: { type: String, required: true },
//     deliveryDate: { type: Date, required: true },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Paid", "Failed", "Unpaid"],
//       default: "Pending",
//     },
//     shipmentStatus: {
//       type: String,
//       enum: ["Pending", "Processing", "Shipped", "Delivered"],
//       default: "Pending",
//     },

//     totalAmount: Number,

//     paymentIntentId: { type: String },
//     checkoutSessionId: { type: String },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Order", orderSchema);


// src/models/Order.js
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    price: Number,
    qty: { type: Number, default: 1 },
    image: String,

    // vegetables க்கு weight / type
    weightLabel: String,           // e.g. "500g"
    type: String,                  // "vegetable" | "package" | etc.
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 🔴 முக்கியம்: இது string[] இல்லை, sub-document array
    items: {
      type: [orderItemSchema],
      validate: [
        (val) => Array.isArray(val) && val.length > 0,
        "At least one item is required",
      ],
    },

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      landmark: String,
    },

    deliveryMethod: {
      type: String,
      enum: ["COD", "CARD"],
      required: true,
    },

    deliveryOption: {
      type: String,
      required: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Unpaid"],
      default: "Pending",
    },

    shipmentStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered"],
      default: "Pending",
    },

    totalAmount: Number,

    paymentIntentId: { type: String },
    checkoutSessionId: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);