// src/utils/syncCart.js
import api from "../api";

export async function syncLocalCartToServer() {
  try {
    const local = JSON.parse(localStorage.getItem("cart") || "[]");
    if (!local.length) return;
    // transform local to server expected shape
    const items = local.map(it => ({
      type: it.type || "vegetable",
      itemId: it.id,
      name: it.name,
      image: it.image,
      unitPrice: it.unitPrice || it.unitPrice,
      quantity: it.userQty || it.quantity || 1,
      totalPrice: it.totalPrice || ( (it.unitPrice || it.price) * (it.userQty || it.quantity || 1) )
    }));
    const res = await api.post("/cart/sync", { items });
    // server returns merged cart; optionally replace front local cart with server copy or clear local
    localStorage.removeItem("cart");
    return res.data.items;
  } catch (err) {
    console.error("Sync cart failed", err);
  }
}
