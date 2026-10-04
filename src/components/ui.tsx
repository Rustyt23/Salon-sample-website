import Link from "next/link";
import { MessageCircle, Sparkles } from "lucide-react";
import { salon } from "@/data/salon";

export function BookingButton({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return <Link href="/book" className={`button ${light ? "button-light" : "button-dark"} ${className}`}>Book Appointment</Link>;
}

export function WhatsAppButton({ dark = false }: { dark?: boolean }) {
  return <a className={`button ${dark ? "button-outline-light" : "button-outline"}`} href={salon.whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>;
}

export function ScrollTitle({ children }: { children: React.ReactNode }) {
  return <span className="scroll-title-mask"><span className="scroll-title-content">{children}</span></span>;
}

export function SectionHeading({ eyebrow, title, description, children, centered = false }: { eyebrow: string; title: React.ReactNode; description?: string; children?: React.ReactNode; centered?: boolean }) {
  return <div className={`section-heading ${centered ? "section-heading-centered" : ""}`} data-reveal="heading">
    <div><p className="eyebrow">{eyebrow}</p><h2><ScrollTitle>{title}</ScrollTitle></h2>{description && <p className="section-description">{description}</p>}</div>
    {children && <div className="section-action">{children}</div>}
  </div>;
}

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: React.ReactNode; description: string }) {
  return <section className="page-intro container"><p className="eyebrow"><Sparkles size={16} aria-hidden="true" /> {eyebrow}</p><h1>{title}</h1><p>{description}</p></section>;
}

export function BookingCTA() {
  return <section className="booking-cta"><div className="container booking-cta-inner" data-reveal>
    <Sparkles className="cta-sparkle" strokeWidth={1} aria-hidden="true" />
    <div><p className="eyebrow">MAKE A LITTLE TIME FOR YOURSELF</p><h2><ScrollTitle>Your next good hair day<br />starts <em>here.</em></ScrollTitle></h2><p>Choose your service. We’ll take care of the details.</p></div>
    <div className="cta-actions"><BookingButton light /><span>We can’t wait to see you.</span></div>
  </div></section>;
}
