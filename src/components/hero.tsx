import Link from "next/link";
import { ArrowDown, BadgeCheck, Sparkles, ShieldCheck } from "lucide-react";
import { SalonImage } from "./salon-image";
import { BookingButton, WhatsAppButton } from "./ui";

export function Hero() {
  return <section className="hero container"><div className="hero-copy">
    <p className="eyebrow"><span className="eyebrow-line" /> LOOK GOOD SALON · INDORE</p>
    <h1><span className="hero-title-line"><span>Look good.</span></span><span className="hero-title-line"><span>Feel <em>like you.</em></span></span></h1>
    <p className="hero-description">Your signature look, in good hands. Thoughtful cuts, beautiful colour, and a little time for yourself.</p>
    <p className="hero-services">Hair <span>•</span> Beauty <span>•</span> Grooming <span>•</span> Makeup</p>
    <div className="hero-buttons"><BookingButton /><WhatsAppButton /></div>
    <Link href="#style-studio" className="hero-studio-link"><span className="hero-scroll-icon"><ArrowDown size={17} aria-hidden="true" /></span> Find your look in The Style Studio</Link>
  </div><div className="hero-visual" data-hero-motion>
    <div className="hero-portrait"><SalonImage name="color" alt="Editorial close-up of beautifully blended balayage in soft waves" sizes="(max-width: 640px) 90vw, 50vw" priority /></div>
    <div className="hero-editorial-label"><span>THE GOOD HAIR EDIT</span><p>A look that is<br /><em>entirely yours.</em></p></div>
    <span className="hero-image-index">01 / LOOK GOOD</span>
  </div></section>;
}

export function PhilosophyStrip() {
  return <div className="philosophy-strip"><div className="container" data-reveal>
    <span><BadgeCheck size={18} strokeWidth={1.3} aria-hidden="true" /> Personal consultations</span>
    <span><Sparkles size={18} strokeWidth={1.3} aria-hidden="true" /> Considered care</span>
    <span><ShieldCheck size={18} strokeWidth={1.3} aria-hidden="true" /> Comfort & hygiene</span>
  </div></div>;
}
