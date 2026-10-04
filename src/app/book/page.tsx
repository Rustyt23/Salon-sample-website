import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Clock3, Scissors, Sparkles } from "lucide-react";
import { SalonImage } from "@/components/salon-image";

export const metadata: Metadata = { title: "Book Appointment", description: "A preview of the appointment experience at Look Good Salon. Online appointment booking is coming in Phase 2." };
const steps = [
  { icon: Scissors, number: "01", title: "Find your fresh look", text: "Choose the service that feels right for you." },
  { icon: CalendarDays, number: "02", title: "Make a little time", text: "Pick a day and a time that fit your plans." },
  { icon: Sparkles, number: "03", title: "Leave the rest to us", text: "Confirm your details and get ready to feel good." },
];

export default function BookPage() {
  return <section className="container book-page"><div className="book-photo"><SalonImage name="haircut" alt="Stylist working carefully on a fresh haircut" sizes="(max-width: 768px) 100vw, 40vw" priority /><div className="book-photo-caption"><span>YOUR NEXT GOOD HAIR DAY</span><h2>A little time.<br />A fresh <em>feeling.</em></h2></div></div><div className="book-content"><span className="coming-soon-badge"><Clock3 size={14} aria-hidden="true" /> ONLINE BOOKING · COMING SOON</span><h1>Let’s make it<br />a <em>good day.</em></h1><p className="book-description">Your next look is worth a little time. Our online appointment experience is on its way.</p><div className="booking-steps">{steps.map(({ icon: Icon, number, title, text }) => <div className="booking-step" key={number}><span className="booking-step-icon"><Icon size={22} strokeWidth={1.3} aria-hidden="true" /></span><div><span className="step-number">STEP {number}</span><h2>{title}</h2><p>{text}</p></div></div>)}</div><div className="booking-placeholder-note"><h2>Coming in Phase 2</h2><p>This is a preview of the booking experience. Online bookings aren’t available yet, and no appointment can be submitted here.</p><button type="button" className="button button-dark" disabled>Online booking coming soon</button></div><div className="book-links"><Link className="text-link" href="/services">Explore the service menu</Link><Link className="text-link" href="/contact">Plan your visit</Link></div></div></section>;
}
