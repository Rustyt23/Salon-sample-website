"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/salon";
import { BookingButton } from "./ui";

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Look Good Salon home"><span>look good<span className="brand-dot">.</span></span><span className="brand-subtitle">S A L O N</span></Link>;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", handleKey); };
  }, [open]);

  return <header className="site-header"><div className="container navbar">
    <Brand />
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <Link key={item.label} href={item.href} className={pathname === item.href ? "active" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
    <div className="nav-actions"><BookingButton /><button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div>
  {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.label} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}<Link href="/book" className="button button-dark" onClick={() => setOpen(false)}>Book Appointment</Link><p>Hair. Beauty. A little time for you.</p></nav>}
  </header>;
}
