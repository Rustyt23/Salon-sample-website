import type { Metadata } from "next";
import { services, type ServiceCategory } from "@/data/salon";
import { ServiceCard } from "@/components/services";
import { BookingCTA, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Our Services", description: "Explore the menu of haircuts, styling, colour, hair spa, grooming, facials, makeup and nail care at Look Good Salon." };
const categories: { name: ServiceCategory; description: string; number: string }[] = [
  { name: "Hair", description: "Fresh cuts. Rich colour. Your signature finish.", number: "01" },
  { name: "Grooming", description: "Considered details. Clean lines. Quiet confidence.", number: "02" },
  { name: "Beauty", description: "A little glow, from head to fingertips.", number: "03" },
];

export default function ServicesPage() {
  return <><PageIntro eyebrow="THE LOOK GOOD MENU" title={<>A little care.<br />A lot of <em>you.</em></>} description="An everyday refresh or a whole new look. Discover the rituals that make you feel your best." /><div className="container services-page-menu">{categories.map((category) => <section className="service-category" key={category.name}><div className="category-heading" data-reveal><span>{category.number}</span><h2>{category.name}</h2><p>{category.description}</p></div><div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">{services.filter((service) => service.category === category.name).map((service, index) => <ServiceCard key={service.id} service={service} motionIndex={index} />)}</div></section>)}</div><BookingCTA /></>;
}
