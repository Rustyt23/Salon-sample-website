"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Brush, Clock3, Droplets, Palette, Paintbrush, ScanFace, Scissors, Sparkles, Waves } from "lucide-react";
import { formatPrice, services, type Service } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { LookPortrait } from "./look-portrait";
import { SectionHeading } from "./ui";

const serviceIcons = { haircut: Scissors, styling: Waves, colour: Palette, spa: Droplets, grooming: ScanFace, facial: Sparkles, makeup: Brush, nails: Paintbrush };

export function ServiceCard({ service, motionIndex = 0 }: { service: Service; motionIndex?: number }) {
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const enabled = useRef(false);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  const bookingHref = `/book?service=${service.id}`;
  const Icon = serviceIcons[service.id as keyof typeof serviceIcons] ?? Sparkles;

  function followCursor(event: PointerEvent<HTMLDivElement>) {
    if (!enabled.current) return;
    pointer.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const element = surface.current;
      if (!element) return;
      const bounds = (element.parentElement ?? element).getBoundingClientRect();
      const x = Math.max(0, Math.min((pointer.current.x - bounds.left) / bounds.width, 1));
      const y = Math.max(0, Math.min((pointer.current.y - bounds.top) / bounds.height, 1));
      element.style.setProperty("--tilt-x", `${(0.5 - y) * 5.5}deg`);
      element.style.setProperty("--tilt-y", `${(x - 0.5) * 5.5}deg`);
      element.style.setProperty("--spot-x", `${x * 100}%`);
      element.style.setProperty("--spot-y", `${y * 100}%`);
    });
  }
  function reset() {
    enabled.current = false; cancelAnimationFrame(frame.current); frame.current = 0;
    surface.current?.style.setProperty("--tilt-x", "0deg");
    surface.current?.style.setProperty("--tilt-y", "0deg");
    surface.current?.removeAttribute("data-pointer-active");
  }

  return <article className="service-card" data-reveal data-reveal-order={motionIndex % 4} data-service={service.id}>
    <div className="service-surface" ref={surface}
      onPointerEnter={(event) => {
        enabled.current = event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
        if (enabled.current) { surface.current?.setAttribute("data-pointer-active", "true"); followCursor(event); }
      }} onPointerMove={followCursor} onPointerLeave={reset} onPointerCancel={reset}>
      <Link href={bookingHref} className="service-image" aria-label={`Explore an appointment for ${service.name}`}>
        {service.id === "spa" ? <LookPortrait tile={8} alt="Glossy, smooth hair inspiration for a nourishing hair spa" className="service-care-photo" /> : <SalonImage name={service.image} alt={service.alt} sizes="(max-width: 640px) 45vw, (max-width: 1024px) 45vw, 24vw" />}
        <span className="service-image-label">{service.category}</span>
        <span className="service-symbol" aria-hidden="true"><Icon size={23} strokeWidth={1.3} /><svg className="service-orbit" viewBox="0 0 56 56"><circle cx="28" cy="28" r="25" /></svg></span>
      </Link>
      <div className="service-card-content"><h3><Link href={bookingHref}>{service.name}</Link></h3><p>{service.description}</p>
        <div className="service-details"><span>From <strong>{formatPrice(service.price)}</strong></span><span><Clock3 size={12} aria-hidden="true" /> {service.duration}</span></div>
        <Link className="service-book-link" href={bookingHref}>Explore service <ArrowUpRight size={18} strokeWidth={1.3} aria-hidden="true" /></Link>
      </div>
    </div>
  </article>;
}

export function PopularServices() {
  return <section className="section container premium-services" id="services"><SectionHeading eyebrow="THE SALON MENU" title={<>Made for <em>your look.</em></>} description="Hair, beauty and grooming, thoughtfully tailored."><Link href="/services" className="text-link">Explore all services <ArrowUpRight size={16} aria-hidden="true" /></Link></SectionHeading>
    <div className="services-grid">{services.map((service, index) => <ServiceCard key={service.id} service={service} motionIndex={index} />)}</div>
  </section>;
}
