import { Clock3, MapPin, Phone, MessageCircle, Navigation } from "lucide-react";
import { salon } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { ScrollTitle, SectionHeading } from "./ui";

export function ContactActions() {
  return <div className="contact-actions"><a href={salon.phoneHref} className="button button-outline" aria-label="Call"><Phone size={17} aria-hidden="true" /> Call</a><a href={salon.whatsappUrl} className="button button-outline" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={17} aria-hidden="true" /> WhatsApp</a><a href={salon.mapsUrl} className="button button-dark" target="_blank" rel="noopener noreferrer"><Navigation size={17} aria-hidden="true" /> Directions</a></div>;
}

export function VisitSection({ standalone = false }: { standalone?: boolean }) {
  return <section className={`${standalone ? "visit-standalone" : "visit-section"}`} id="visit"><div className={`container ${standalone ? "" : "section"}`}>
    {!standalone && <SectionHeading eyebrow="FIND US IN INDORE" title={<>Come in. <em>Feel at home.</em></>} />}
    <div className="visit-grid"><div className="visit-photo" data-reveal="image" data-scroll-depth><SalonImage name="interior" alt="Inspiration for a relaxed visit: a bright salon interior" sizes="(max-width: 768px) 100vw, 50vw" /><span className="visit-photo-caption">A little inspiration for your visit</span></div><div className="visit-info" data-reveal data-reveal-order="1"><p className="eyebrow">VISIT LOOK GOOD SALON</p><h2><ScrollTitle>Find your<br /><em>way here.</em></ScrollTitle></h2><div className="visit-detail"><MapPin size={21} strokeWidth={1.4} aria-hidden="true" /><div><h3>Find us in Indore</h3><p>{salon.address}</p></div></div><div className="visit-detail"><Clock3 size={21} strokeWidth={1.4} aria-hidden="true" /><div><h3>Make a little time</h3><p>{salon.hours}</p></div></div><ContactActions /></div></div>
  </div></section>;
}
