"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, MessageCircle, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { formatPrice } from "@/data/salon";
import { MAX_QUANTITY, orderWhatsAppUrl, type CartItem, type calculateTotals } from "@/data/shop";
import { useCart } from "./cart-provider";
import { ProductPhoto } from "./product-photo";

export function CartTrigger({ beforeOpen }: { beforeOpen?: () => void }) {
  const { count, openCart } = useCart();
  return <button className="cart-trigger" type="button" aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`} onClick={() => { beforeOpen?.(); openCart(); }}><ShoppingBag size={20} strokeWidth={1.5} aria-hidden="true" /><span className="cart-count" key={count} aria-hidden="true">{count > 99 ? "99+" : count}</span></button>;
}
export function QuantityControl({ quantity, onChange, name }: { quantity: number; onChange: (quantity: number) => void; name: string }) {
  return <div className="quantity-control" aria-label={`Quantity for ${name}`}><button type="button" disabled={quantity <= 1} aria-label={`Decrease ${name} quantity`} onClick={() => onChange(quantity - 1)}><Minus size={14} aria-hidden="true" /></button><output aria-live="polite" aria-label={`${name} quantity`}>{quantity}</output><button type="button" disabled={quantity >= MAX_QUANTITY} aria-label={`Increase ${name} quantity`} onClick={() => onChange(quantity + 1)}><Plus size={14} aria-hidden="true" /></button></div>;
}
export function CartLines({ items, editable = true, onNavigate }: { items: CartItem[]; editable?: boolean; onNavigate?: () => void }) {
  const { setQuantity, remove } = useCart();
  return <ul className="cart-lines">{items.map(({ product, quantity }) => <li key={product.id} className="cart-line">
    <Link href={`/shop/${product.slug}`} onClick={onNavigate} tabIndex={-1} aria-hidden="true"><ProductPhoto product={product} /></Link>
    <div className="cart-line-body"><p className="product-brand">LUMA RITUAL</p><h3><Link href={`/shop/${product.slug}`} onClick={onNavigate}>{product.name}</Link></h3><p className="cart-line-size">{product.size} · {formatPrice(product.price)} each</p><div className="cart-line-bottom">{editable ? <QuantityControl quantity={quantity} onChange={(value) => setQuantity(product.id, value)} name={product.name} /> : <span>Qty {quantity}</span>}<strong>{formatPrice(product.price * quantity)}</strong></div></div>
    {editable && <button className="remove-item" type="button" aria-label={`Remove ${product.name}`} onClick={() => remove(product.id)}><Trash2 size={16} aria-hidden="true" /></button>}
  </li>)}</ul>;
}
export function Totals({ totals }: { totals: ReturnType<typeof calculateTotals> }) {
  return <dl className="shop-totals"><div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div><div><dt>Illustrative delivery</dt><dd>{totals.delivery ? formatPrice(totals.delivery) : "Complimentary"}</dd></div><div className="total-line"><dt>Estimated total</dt><dd>{formatPrice(totals.total)}</dd></div></dl>;
}
export function WhatsAppOrder({ items, href, onClick }: { items: CartItem[]; href?: string; onClick?: () => void }) {
  return <a className="button button-outline whatsapp-order" href={href ?? orderWhatsAppUrl(items)} target="_blank" rel="noopener noreferrer" onClick={onClick}><MessageCircle size={17} aria-hidden="true" />Order on WhatsApp</a>;
}
export function EmptyCart({ onNavigate }: { onNavigate?: () => void }) {
  return <div className="empty-cart"><ShoppingBag size={40} strokeWidth={1} aria-hidden="true" /><h2>A little care<br />for your shelf.</h2><p>Your bag is waiting for its first favourite.</p><Link href="/shop" className="button button-dark" onClick={onNavigate}>Explore the collection <ArrowRight size={16} aria-hidden="true" /></Link></div>;
}
export function CartDrawer() {
  const { items, count, totals, drawerOpen, closeCart, ready } = useCart();
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (drawerOpen) {
      if (!element.open) { element.showModal(); closeButton.current?.focus({ preventScroll: true }); }
      return;
    }
    const timer = window.setTimeout(() => element.close(), window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260);
    return () => window.clearTimeout(timer);
  }, [drawerOpen]);
  return <dialog ref={dialog} className="cart-drawer" data-state={drawerOpen ? "open" : "closed"} aria-labelledby="cart-drawer-title" onCancel={(event) => { event.preventDefault(); closeCart(); }} onClick={(event) => { if (event.target === event.currentTarget) closeCart(); }}><div className="cart-drawer-inner">
    <header className="cart-drawer-header"><div><p className="eyebrow">YOUR LITTLE CARE EDIT</p><h2 id="cart-drawer-title">Your bag <span>({count})</span></h2></div><button ref={closeButton} type="button" className="icon-button" onClick={closeCart} aria-label="Close cart"><X size={22} aria-hidden="true" /></button></header>
    <div className="cart-drawer-content">{!ready ? <p>Loading your bag…</p> : items.length ? <><p className="delivery-note">{totals.subtotal >= 1499 ? "Complimentary demo delivery unlocked." : `Add ${formatPrice(1499 - totals.subtotal)} for complimentary demo delivery.`}</p><CartLines items={items} onNavigate={closeCart} /><p className="quantity-note">Demo limit: 20 of each product.</p></> : <EmptyCart onNavigate={closeCart} />}</div>
    {!!items.length && <div className="cart-drawer-footer"><Totals totals={totals} /><Link href="/checkout" className="button button-dark" onClick={closeCart}>Continue to checkout <ArrowRight size={16} aria-hidden="true" /></Link><div className="cart-drawer-secondary"><Link href="/cart" className="text-link" onClick={closeCart}>View your bag</Link><a href={orderWhatsAppUrl(items)} target="_blank" rel="noopener noreferrer" onClick={closeCart}>Order on WhatsApp ↗</a></div><p className="shop-fineprint">Frontend demo · no payments or deliveries.</p></div>}
  </div></dialog>;
}
export function CartPage() {
  const { items, count, totals, ready } = useCart();
  return <div className="container shop-page"><div className="shop-page-heading"><p className="eyebrow">THE LOOK GOOD SHOP</p><h1>Your <em>care edit.</em></h1><p>{count ? `${count} ${count === 1 ? "essential" : "essentials"}, ready for your shelf.` : "A little everyday luxury starts here."}</p></div>{!ready ? <div className="cart-loading" role="status">Loading your bag…</div> : !items.length ? <EmptyCart /> : <div className="cart-page-layout"><div><CartLines items={items} /><Link href="/shop" className="text-link">← Continue shopping</Link><p className="quantity-note">Demo limit: 20 of each product.</p></div><aside className="order-summary"><p className="eyebrow">THE DETAILS</p><h2>Order summary</h2><Totals totals={totals} /><p className="shop-fineprint">Delivery is ₹99, or complimentary on orders of ₹1,499 and above. Illustrative pricing only.</p><Link className="button button-dark" href="/checkout">Continue to checkout <ArrowRight size={16} aria-hidden="true" /></Link><WhatsAppOrder items={items} /><p className="shop-fineprint">This checkout is a demo. No payment is collected and no delivery is arranged.</p></aside></div>}</div>;
}
