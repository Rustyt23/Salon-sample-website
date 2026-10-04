import { MAX_QUANTITY, products, type CartLine } from "@/data/shop";

const STORAGE_KEY = "look-good-cart-v1";
type CartSnapshot = { items: CartLine[]; ready: boolean };
const serverSnapshot: CartSnapshot = { items: [], ready: false };
let snapshot = serverSnapshot;
const listeners = new Set<() => void>();

export function sanitiseCart(value: unknown): CartLine[] {
  if (!Array.isArray(value)) return [];
  const quantities = new Map<string, number>();
  for (const line of value) {
    if (!line || typeof line !== "object" || !products.some((product) => product.id === line.productId) || !Number.isInteger(line.quantity) || line.quantity < 1) continue;
    quantities.set(line.productId, Math.min(MAX_QUANTITY, (quantities.get(line.productId) ?? 0) + line.quantity));
  }
  return [...quantities].map(([productId, quantity]) => ({ productId, quantity }));
}
function readStorage(): CartLine[] {
  try { return sanitiseCart(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]")); } catch { return []; }
}
export function getCartSnapshot() {
  if (typeof window !== "undefined" && !snapshot.ready) snapshot = { items: readStorage(), ready: true };
  return snapshot;
}
export function getServerCartSnapshot() { return serverSnapshot; }
function handleStorage(event: StorageEvent) {
  if (event.key !== STORAGE_KEY && event.key !== null) return;
  snapshot = { items: readStorage(), ready: true };
  listeners.forEach((listener) => listener());
}
export function subscribeToCart(listener: () => void) {
  if (!listeners.size) window.addEventListener("storage", handleStorage);
  listeners.add(listener);
  return () => { listeners.delete(listener); if (!listeners.size) window.removeEventListener("storage", handleStorage); };
}
export function writeCart(items: CartLine[]) {
  snapshot = { items: sanitiseCart(items), ready: true };
  try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot.items)); } catch { /* Keep the cart usable when browser storage is unavailable. */ }
  listeners.forEach((listener) => listener());
}
