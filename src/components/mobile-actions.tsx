"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MessageCircle, Navigation, Phone, ShoppingBag, Store } from "lucide-react";
import { salon } from "@/data/salon";
import { orderWhatsAppUrl } from "@/data/shop";
import { useCart } from "./shop/cart-provider";

export function MobileActions() {
  const pathname = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  const { items, count, openCart } = useCart();
  if (pathname.startsWith("/shop") || pathname === "/cart" || pathname === "/checkout") return <nav className="mobile-actions" aria-label="Quick shop actions" data-mobile-actions>
    <Link href="/shop"><Store size={20} strokeWidth={1.6} aria-hidden="true" /><span>Shop</span></Link>
    <button type="button" onClick={openCart} aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}><ShoppingBag size={20} strokeWidth={1.6} aria-hidden="true" /><span>Bag ({count})</span></button>
    <a href={items.length ? orderWhatsAppUrl(items) : salon.whatsappUrl} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" /><span>WhatsApp</span></a>
    <Link href="/book"><CalendarDays size={20} strokeWidth={1.6} aria-hidden="true" /><span>Book</span></Link>
  </nav>;
  return <nav className="mobile-actions" aria-label="Quick salon actions" data-mobile-actions>
    <Link href="/book" className="mobile-action-book" aria-current={pathname === "/book" ? "page" : undefined}><CalendarDays size={20} strokeWidth={1.6} aria-hidden="true" /><span>Book</span></Link>
    <a href={salon.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" /><span>WhatsApp</span></a>
    <a href={salon.phoneHref} aria-label="Call"><Phone size={20} strokeWidth={1.6} aria-hidden="true" /><span>Call</span></a>
    <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={20} strokeWidth={1.6} aria-hidden="true" /><span>Directions</span></a>
  </nav>;
}
