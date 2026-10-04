import { Hero, PhilosophyStrip } from "@/components/hero";
import { PopularServices } from "@/components/services";
import { BookingCTA } from "@/components/ui";
import { OurWork } from "@/components/gallery";
import { WhyChooseUs, Reviews, InstagramSection } from "@/components/home-sections";
import { VisitSection } from "@/components/visit";

export default function HomePage() {
  return <><Hero /><PhilosophyStrip /><PopularServices /><OurWork /><WhyChooseUs /><Reviews /><InstagramSection /><VisitSection /><BookingCTA /></>;
}
