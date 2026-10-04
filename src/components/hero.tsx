import { Sparkles, Scissors, MapPin } from "lucide-react";
import { SalonImage } from "./salon-image";
import { BookingButton, WhatsAppButton } from "./ui";

export function Hero() {
  return <section className="hero container"><div className="hero-copy">
    <p className="eyebrow"><span className="eyebrow-line" /> YOUR STYLE. YOUR SPACE.</p>
    <h1>Look good.<br />Feel <em>like you.</em></h1>
    <p className="hero-description">A fresh look. A little confidence. A moment just for you. Welcome to your new favourite salon.</p>
    <p className="hero-services">Hair <span>•</span> Beauty <span>•</span> Grooming <span>•</span> Makeup</p>
    <div className="hero-buttons"><BookingButton /><WhatsAppButton /></div>
    <div className="hero-footnote"><span className="hero-footnote-icon"><Scissors size={21} strokeWidth={1.4} aria-hidden="true" /></span><div><strong>For every look. For everyone.</strong><span>Your neighbourhood unisex salon in Indore.</span></div></div>
  </div><div className="hero-visual">
    <div className="hero-portrait"><SalonImage name="color" alt="Beautifully blended balayage cascading in soft waves" sizes="(max-width: 768px) 90vw, 45vw" priority /></div>
    <div className="hero-studio"><SalonImage name="interior" alt="A welcoming, sunlit salon with comfortable styling chairs" sizes="(max-width: 768px) 42vw, 18vw" /><span><MapPin size={12} aria-hidden="true" /> YOUR LITTLE ESCAPE</span></div>
    <div className="hero-stamp"><Sparkles size={27} strokeWidth={1.1} aria-hidden="true" /><span>GOOD HAIR.<br />GREAT ENERGY.</span></div>
    <p className="hero-image-note">A little inspiration for your next look.</p>
  </div></section>;
}

export function PhilosophyStrip() {
  return <div className="philosophy-strip"><div className="container"><span>Thoughtfully styled.</span><Sparkles size={18} strokeWidth={1.1} aria-hidden="true" /><span>Beautifully cared for.</span><Sparkles size={18} strokeWidth={1.1} aria-hidden="true" /><span>Unapologetically you.</span></div></div>;
}
