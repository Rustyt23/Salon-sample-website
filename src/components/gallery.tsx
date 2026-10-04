"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { gallery, type GalleryItem } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { SectionHeading } from "./ui";

export function GalleryGrid({ items = gallery, filterable = false }: { items?: GalleryItem[]; filterable?: boolean }) {
  const [category, setCategory] = useState("All looks");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const filtered = category === "All looks" ? items : items.filter((item) => item.category === category);
  const active = activeIndex === null ? null : filtered[activeIndex];

  useEffect(() => {
    const element = dialog.current;
    if (!element) return;
    if (activeIndex !== null && !element.open) element.showModal();
    if (activeIndex === null && element.open) element.close();
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [activeIndex]);

  const move = (direction: number) => setActiveIndex((index) => index === null ? null : (index + direction + filtered.length) % filtered.length);

  return <>
    {filterable && <div className="gallery-filters" role="group" aria-label="Filter gallery by category">{["All looks", ...new Set(items.map((item) => item.category))].map((item) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>}
    <div className={`gallery-grid ${filterable ? "gallery-grid-full" : ""}`} aria-live="polite">{filtered.map((item, index) => <figure className="gallery-card" data-reveal data-reveal-order={index % (filterable ? 3 : 4)} key={item.id}><button className="gallery-image" type="button" aria-label={`Preview ${item.title}`} onClick={() => setActiveIndex(index)}><SalonImage name={item.image} alt={item.alt} /><span className="gallery-preview-icon"><Maximize2 size={19} aria-hidden="true" /></span></button><figcaption><span>{item.category}</span><h3>{item.title}</h3></figcaption></figure>)}</div>
    <dialog ref={dialog} className="lightbox" aria-labelledby="lightbox-title" onCancel={() => setActiveIndex(null)} onClose={() => setActiveIndex(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveIndex(null); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } }}>
      <div className="lightbox-panel"><button type="button" className="lightbox-close" onClick={() => setActiveIndex(null)} aria-label="Close preview"><X size={23} /></button>
        {active && <><div className="lightbox-image lightbox-image-enter" key={active.id} onTouchStart={(event) => { touch.current = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }} onTouchEnd={(event) => { if (!touch.current) return; const dx = event.changedTouches[0].clientX - touch.current.x; const dy = event.changedTouches[0].clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dy) < 50) move(dx < 0 ? 1 : -1); touch.current = null; }}><SalonImage name={active.image} alt={active.alt} sizes="90vw" className="lightbox-photo" /></div><div className="lightbox-caption"><div><p>{active.category} · Inspiration image</p><h2 id="lightbox-title">{active.title}</h2></div><div className="lightbox-controls"><button type="button" disabled={filtered.length < 2} onClick={() => move(-1)} aria-label="Previous image"><ChevronLeft size={23} /></button><span aria-live="polite">{(activeIndex ?? 0) + 1} / {filtered.length}</span><button type="button" disabled={filtered.length < 2} onClick={() => move(1)} aria-label="Next image"><ChevronRight size={23} /></button></div></div></>}
      </div>
    </dialog>
  </>;
}

export function OurWork() {
  return <section className="our-work"><div className="container section"><SectionHeading eyebrow="A LITTLE INSPIRATION" title={<>Looks to <em>fall for.</em></>} description="Fresh cuts, beautiful colour, and the details that make it yours."><Link href="/gallery" className="text-link">View the gallery</Link></SectionHeading><GalleryGrid items={gallery.slice(0, 4)} /><p className="sample-note">Inspiration gallery · Sample photography, not actual salon client work. Select a photo for a closer look.</p></div></section>;
}
