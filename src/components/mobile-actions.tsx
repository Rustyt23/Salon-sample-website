"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, MessageCircle, Navigation, Phone } from "lucide-react";
import { salon } from "@/data/salon";

export function MobileActions() {
  const pathname = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  return <nav className="mobile-actions" aria-label="Quick salon actions" data-mobile-actions>
    <Link href="/book" className="mobile-action-book" aria-current={pathname === "/book" ? "page" : undefined}><CalendarDays size={20} strokeWidth={1.6} aria-hidden="true" /><span>Book</span></Link>
    <a href={salon.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (sample number)"><MessageCircle size={20} strokeWidth={1.6} aria-hidden="true" /><span>WhatsApp</span></a>
    <a href={salon.phoneHref} aria-label="Call (sample number)"><Phone size={20} strokeWidth={1.6} aria-hidden="true" /><span>Call</span></a>
    <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer"><Navigation size={20} strokeWidth={1.6} aria-hidden="true" /><span>Directions</span></a>
  </nav>;
}
