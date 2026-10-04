"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation } from "@/data/salon";
import { BookingButton } from "./ui";
import "./navigation-motion.css";

export function Brand({ footer = false }: { footer?: boolean }) {
  return <Link href="/" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Look Good Salon home"><span>look good<span className="brand-dot">.</span></span><span className="brand-subtitle">S A L O N</span></Link>;
}

export function Navbar() {
  const pathname = (usePathname() ?? "/").replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    let frame = 0;
    const updateHeader = () => {
      frame = 0;
      const scrolled = String(window.scrollY > 24);
      if (header.current?.dataset.scrolled !== scrolled) {
        header.current?.setAttribute("data-scrolled", scrolled);
      }
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader);
    };
    updateHeader();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const toggleButton = toggle.current;
    document.body.style.overflow = "hidden";
    const background = [...document.querySelectorAll<HTMLElement>("main, footer, [data-mobile-actions]")].map((element) => ({ element, inert: element.inert }));
    background.forEach(({ element }) => { element.inert = true; });
    header.current?.querySelector<HTMLAnchorElement>("#mobile-navigation a")?.focus({ preventScroll: true });
    const desktop = window.matchMedia("(min-width: 851px)");
    const handleViewport = () => { if (desktop.matches) setOpen(false); };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const controls = [...(header.current?.querySelectorAll<HTMLElement>("a, button") ?? [])].filter((element) => element.getClientRects().length > 0);
      const first = controls[0]; const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    desktop.addEventListener("change", handleViewport);
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = previous; background.forEach(({ element, inert }) => { element.inert = inert; }); desktop.removeEventListener("change", handleViewport); window.removeEventListener("keydown", handleKey); if (toggleButton?.getClientRects().length) toggleButton.focus({ preventScroll: true }); };
  }, [open]);

  return <header ref={header} className="site-header" data-scrolled="false" data-menu-open={open}><div className="container navbar">
    <Brand />
    <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((item) => <Link key={item.label} href={item.href} className={pathname === item.href ? "active" : ""} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
    <div className="nav-actions"><BookingButton /><button ref={toggle} className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></div>
  </div>
  {open && <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">{navigation.map((item, index) => <Link key={item.label} href={item.href} style={{ animationDelay: `${80 + index * 45}ms` }} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}<Link href="/book" className="button button-dark" onClick={() => setOpen(false)}>Book Appointment</Link><p>Hair. Beauty. A little time for you.</p></nav>}
  </header>;
}
