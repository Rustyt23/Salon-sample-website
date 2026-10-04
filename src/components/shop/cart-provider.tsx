"use client";

import { createContext, useContext, useState, useSyncExternalStore } from "react";
import { calculateTotals, MAX_QUANTITY, products, type CartItem } from "@/data/shop";
import { getCartSnapshot, getServerCartSnapshot, subscribeToCart, writeCart } from "./cart-store";
import { CartDrawer } from "./cart-ui";

type CartContextValue = {
  items: CartItem[]; ready: boolean; count: number; totals: ReturnType<typeof calculateTotals>;
  drawerOpen: boolean; message: string; openCart: () => void; closeCart: () => void;
  add: (id: string, quantity?: number, reveal?: boolean) => void;
  setQuantity: (id: string, quantity: number) => void; remove: (id: string) => void; clear: () => void;
};
const CartContext = createContext<CartContextValue | null>(null);
export function CartProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [message, setMessage] = useState("");
  const items = state.items.flatMap((line) => {
    const product = products.find((entry) => entry.id === line.productId);
    return product ? [{ product, quantity: line.quantity }] : [];
  });
  function add(id: string, quantity = 1, reveal = true) {
    const product = products.find((entry) => entry.id === id);
    if (!product) return;
    const current = getCartSnapshot().items;
    const existing = current.find((line) => line.productId === id);
    const next = Math.min(MAX_QUANTITY, (existing?.quantity ?? 0) + quantity);
    writeCart(existing ? current.map((line) => line.productId === id ? { ...line, quantity: next } : line) : [...current, { productId: id, quantity: next }]);
    setMessage(next === existing?.quantity ? `Demo limit: ${MAX_QUANTITY} of each product.` : `${product.name} added to your bag.`);
    if (reveal) setDrawerOpen(true);
  }
  function remove(id: string) {
    writeCart(getCartSnapshot().items.filter((line) => line.productId !== id));
    setMessage("Product removed from your bag.");
  }
  function setQuantity(id: string, quantity: number) {
    if (quantity < 1) { remove(id); return; }
    writeCart(getCartSnapshot().items.map((line) => line.productId === id ? { ...line, quantity: Math.min(MAX_QUANTITY, Math.floor(quantity)) } : line));
    setMessage(`Quantity updated to ${Math.min(MAX_QUANTITY, Math.floor(quantity))}.`);
  }
  const value: CartContextValue = { items, ready: state.ready, count: items.reduce((sum, item) => sum + item.quantity, 0), totals: calculateTotals(items), drawerOpen, message, openCart: () => setDrawerOpen(true), closeCart: () => setDrawerOpen(false), add, setQuantity, remove, clear: () => { writeCart([]); setMessage("Your demo order is complete. Your bag is now empty."); } };
  return <CartContext.Provider value={value}>{children}<CartDrawer /><span className="sr-only" role="status" aria-live="polite">{message}</span></CartContext.Provider>;
}
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("Cart components must be inside CartProvider.");
  return context;
}
