import { Hero, PhilosophyStrip } from "@/components/hero";
import { PopularServices } from "@/components/services";
import { BookingCTA } from "@/components/ui";
import { StyleStudio } from "@/components/style-studio";
import { Transformations } from "@/components/transformations";
import { WhyChooseUs, Reviews, InstagramSection } from "@/components/home-sections";
import { VisitSection } from "@/components/visit";
import { SalonFavourites } from "@/components/shop/products";

export default function HomePage() {
  return <><link rel="preload" href="/images/style-atlas.webp" as="image" /><Hero /><Transformations /><PhilosophyStrip /><PopularServices /><StyleStudio /><SalonFavourites /><WhyChooseUs /><InstagramSection /><Reviews /><VisitSection /><BookingCTA /></>;
}
