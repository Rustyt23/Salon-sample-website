import Link from "next/link";
import { Camera, MapPin } from "lucide-react";
import { salon } from "@/data/salon";
import { Brand } from "./navbar";

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid"><div className="footer-brand"><Brand footer /><p>Good hair. Great energy.<br />A space for every version of you.</p><a href={salon.instagramUrl} target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Open Instagram (demo profile)"><Camera size={19} aria-hidden="true" /><span>Find a little inspiration</span></a></div>
      <div><h3>Explore</h3><ul><li><Link href="/services">Our services</Link></li><li><Link href="/gallery">Our work</Link></li><li><Link href="/#reviews">Kind words</Link></li><li><Link href="/contact">Find us</Link></li></ul></div>
      <div><h3>A little time for you</h3><ul><li><Link href="/book">Book Appointment</Link></li><li><a href={salon.whatsappUrl} target="_blank" rel="noopener noreferrer">WhatsApp <span className="sample-inline">(sample)</span></a></li><li><a href={salon.phoneHref}>Call <span className="sample-inline">(sample)</span></a></li></ul><p className="footer-hours">{salon.hours}<br /><span className="sample-inline">Sample opening hours</span></p></div>
      <div><h3>Come say hello</h3><p className="footer-address">{salon.address}</p><a className="footer-directions" href={salon.mapsUrl} target="_blank" rel="noopener noreferrer"><MapPin size={16} aria-hidden="true" /> Get directions</a></div>
    </div>
    <div className="footer-bottom"><p>© 2026 {salon.name}. Made for your good days.</p><p>LOOK GOOD · SALON PREVIEW</p></div>
    <p className="demo-disclaimer">{salon.demoNotice}</p>
  </div></footer>;
}
