import { Clock3, MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { salon } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { SectionHeading } from "./ui";

export function ContactActions() {
  return <div className="contact-actions"><a href={salon.phoneHref} className="button button-outline" aria-label="Call (sample number)"><Phone size={17} aria-hidden="true" /> Call</a><a href={salon.whatsappUrl} className="button button-outline" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (sample number)"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a><a href={salon.mapsUrl} className="button button-dark" target="_blank" rel="noopener noreferrer"><Navigation size={17} aria-hidden="true" /> Directions</a></div>;
}

export function VisitSection({ standalone = false }: { standalone?: boolean }) {
  return <section className={`${standalone ? "visit-standalone" : "visit-section"}`} id="visit"><div className={`container ${standalone ? "" : "section"}`}>
    {!standalone && <SectionHeading eyebrow="YOUR NEIGHBOURHOOD. YOUR SALON." title={<>Come in. <em>Feel at home.</em></>} />}
    <div className="visit-grid"><div className="visit-photo"><SalonImage name="interior" alt="Inspiration for a relaxed visit: a bright salon interior" sizes="(max-width: 768px) 100vw, 50vw" /><span className="visit-photo-caption">A little inspiration for your visit</span></div><div className="visit-info"><p className="eyebrow">VISIT LOOK GOOD SALON</p><h2>Good days,<br /><em>this way.</em></h2><div className="visit-detail"><MapPin size={21} strokeWidth={1.4} aria-hidden="true" /><div><h3>Find us in Indore</h3><p>{salon.address}</p></div></div><div className="visit-detail"><Clock3 size={21} strokeWidth={1.4} aria-hidden="true" /><div><h3>Make a little time</h3><p>{salon.hours}</p><span className="sample-inline">Sample opening hours</span></div></div><ContactActions /><p className="contact-sample-note">Call & WhatsApp use a sample number: {salon.phone}.<br />Directions opens the real supplied location in a new tab.</p></div></div>
  </div></section>;
}
