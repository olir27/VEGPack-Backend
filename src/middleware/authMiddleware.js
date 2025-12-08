// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const protect = async (req, res, next) => {
//   let token;
//   try {
//     if(req.headers.authorization?.startsWith("Bearer")){
//       token = req.headers.authorization.split(" ")[1];
//     }
//     if(!token) return res.status(401).json({ success:false, message:"Not authorized, no token" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).select("-password");
//     if(!user) return res.status(404).json({ success:false, message:"User not found" });

//     req.user = user;
//     next();
//   } catch(err){
//     return res.status(401).json({ success:false, message:"Token invalid or expired" });
//   }
// };

// export const authMiddleware = (roles=[]) => {
//   return (req, res, next) => {
//     if(!roles.includes(req.user.role)){
//       return res.status(403).json({ success:false, message:"Access denied for your role" });
//     }
//     next();
//   };
// };



// middleware/authMiddleware.js
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Protect routes
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token)
//       return res.status(401).json({ success: false, message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user)
//       return res.status(404).json({ success: false, message: "User not found" });

//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // Role-based middleware (Admin, Farmer, Customer)
// export const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }
//     next();
//   };
// };



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Protect routes (Token required)
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // Role-based access (Admin, Farmer, Customer)
//  const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     // Ensure user exists after protect middleware
//     if (!req.user) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     next();
//   };
// };

// export default authMiddleware;



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Protect routes (Token required)
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not authorized" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid token" });
//   }
// };

// // Role-based access (Admin, Farmer, Customer)
// export const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     next();
//   };
// };


// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /**
//  * Protect routes – ensure a valid JWT token is present
//  */
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     // Check for Bearer token in headers
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "Not authorized, no token" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Fetch user from DB
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Attach user to request
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Token invalid or expired" });
//   }
// };

// /**
//  * Role-based authorization middleware
//  * @param {Array} roles - Array of allowed roles, e.g., ["admin", "farmer"]
//  */
// export const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
     
//     if (!roles.includes(req.user.role)) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

   

//     next();
//   };
// };

// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ success: false, message: "Access denied" });
//   }
//   next();
// };

// /**
//  * Optional helper to combine protect + role check
//  * Usage: router.post("/", ...protectWithRole(["farmer"]), addStock);
//  */
// export const protectWithRole = (roles = []) => [protect, authMiddleware(roles)];

// export default authMiddleware;



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /**
//  * Protect routes – ensure a valid JWT token is present
//  */
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// /**
//  * Role-based access
//  */
// export const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     next();
//   };
// };

// /**
//  * Admin-only helper
//  */
// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ success: false, message: "Admin only" });
//   }
//   next();
// };

// /**
//  * Combined helper
//  */
// export const protectWithRole = (roles = []) => [protect, authMiddleware(roles)];



// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// /**
//  * Protect routes – ensure a valid JWT token is present
//  */
// export const protect = async (req, res, next) => {
//   let token;

//   try {
//     // Check Authorization header
//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ success: false, message: "No token provided" });
//     }

//     // Verify JWT token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find user by ID in token
//     const user = await User.findById(decoded.id).select("-password");
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     // Attach user to request object
//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(401).json({ success: false, message: "Invalid or expired token" });
//   }
// };

// /**
//  * Role-based access middleware
//  * @param {Array} roles – allowed roles, e.g., ['admin', 'farmer']
//  */
// export const authMiddleware = (roles = []) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ success: false, message: "Not authenticated" });
//     }

//     // If roles array is empty, allow all authenticated users
//     if (roles.length && !roles.includes(req.user.role)) {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }

//     next();
//   };
// };

// /**
//  * Admin-only middleware
//  */
// export const isAdmin = (req, res, next) => {
//   if (!req.user || req.user.role !== "admin") {
//     return res.status(403).json({ success: false, message: "Admin only" });
//   }
//   next();
// };

// /**
//  * Combined helper for protected routes with specific roles
//  * Usage: router.get('/admin', protectWithRole(['admin']), handler)
//  */
// export const protectWithRole = (roles = []) => [protect, authMiddleware(roles)];


import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Protect routes – ensure a valid JWT token is present
 */
export const protect = async (req, res, next) => {
  let token;

  try {
    // 1️⃣ Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2️⃣ Or cookie
    else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID in token
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
     console.error("protect error:", err);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

/**
 * Role-based access middleware
 */
export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (roles.length && !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ success: false, message: "Access denied" });
    }

    next();
  };
};

export const isAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ success: false, message: "Admin only" });
  }
  next();
};

export const protectWithRole = (roles = []) => [protect, authMiddleware(roles)];