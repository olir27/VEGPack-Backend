

import Order from "../models/Order.js";
import Product from "../models/Product.js";

const parseWeightToGrams = (label) => {
  if (!label) return 0;
  const txt = String(label).trim().toLowerCase();
  const num = parseFloat(txt);
  if (Number.isNaN(num)) return 0;

  if (txt.includes("kg")) return Math.round(num * 1000);  // 1.5kg -> 1500g
  if (txt.includes("g")) return Math.round(num);          // 500g -> 500
  // no unit → assume kg
  return Math.round(num * 1000);
};

export const updateProductStockForOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  const gramsMap = {}; // vegetable grams
  const unitMap = {};  // package units

  for (const item of order.items || []) {
    if (!item.productId) continue;
    const key = item.productId.toString();
    const qty = item.qty || item.quantity || 1;

    if (item.type === "vegetable") {
      const gramsPerUnit = parseWeightToGrams(item.weightLabel);
      const need = gramsPerUnit * qty;
      if (!need) continue;
      gramsMap[key] = (gramsMap[key] || 0) + need;
    } else {
      const needUnits = qty;
      unitMap[key] = (unitMap[key] || 0) + needUnits;
    }
  }

  const allIds = Array.from(
    new Set([...Object.keys(gramsMap), ...Object.keys(unitMap)])
  );
  if (!allIds.length) return;

  const products = await Product.find({ _id: { $in: allIds } });

  // Availability check
  for (const p of products) {
    const id = p._id.toString();
    if (p.type === "vegetable") {
      const needGrams = gramsMap[id] || 0;
      if (needGrams && p.stock < needGrams) {
        throw new Error(
          `Not enough stock for ${p.name}. Only ${p.stock}g left.`
        );
      }
    } else {
      const needUnits = unitMap[id] || 0;
      if (needUnits && p.stock < needUnits) {
        throw new Error(
          `Not enough stock for ${p.name}. Only ${p.stock} units left.`
        );
      }
    }
  }

  // Decrease stock
  const ops = [];

  for (const p of products) {
    const id = p._id.toString();
    if (p.type === "vegetable") {
      const needGrams = gramsMap[id] || 0;
      if (needGrams) {
        ops.push({
          updateOne: {
            filter: { _id: id },
            update: { $inc: { stock: -needGrams } },
          },
        });
      }
    } else {
      const needUnits = unitMap[id] || 0;
      if (needUnits) {
        ops.push({
          updateOne: {
            filter: { _id: id },
            update: { $inc: { stock: -needUnits } },
          },
        });
      }
    }
  }

  if (ops.length) {
    await Product.bulkWrite(ops);
  }
};