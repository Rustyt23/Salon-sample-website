import Link from "next/link";
import { Clock3 } from "lucide-react";
import { formatPrice, services, type Service } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { SectionHeading } from "./ui";

export function ServiceCard({ service }: { service: Service }) {
  return <article className="service-card"><Link href="/book" className="service-image" aria-label={`Explore an appointment for ${service.name}`}><SalonImage name={service.image} alt={service.alt} /><span className="service-image-label">{service.category}</span></Link><div className="service-card-content"><h3><Link href="/book">{service.name}</Link></h3><p>{service.description}</p><div className="service-details"><span>From <strong>{formatPrice(service.price)}</strong></span><span><Clock3 size={14} aria-hidden="true" /> {service.duration}</span></div></div></article>;
}

export function PopularServices() {
  return <section className="section container" id="services"><SectionHeading eyebrow="A LITTLE CARE, A LOT OF CONFIDENCE" title={<>Good looks start <em>here.</em></>} description="Your everyday essentials. Your special-occasion moments."><Link href="/services" className="text-link">Explore all services</Link></SectionHeading><div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{services.map((service) => <ServiceCard key={service.id} service={service} />)}</div><p className="sample-note">Sample menu · Indicative prices and durations for this demo.</p></section>;
}
