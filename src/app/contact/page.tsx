import type { Metadata } from "next";
import { VisitSection } from "@/components/visit";
import { BookingCTA, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Visit Us", description: "Find the supplied Gen-Z Unisex Salon location near Mornee Saree in Old Agarwal Nagar, Indore. Get directions to plan your visit." };

export default function ContactPage() {
  return <><PageIntro eyebrow="LET’S MAKE IT A GOOD DAY" title={<>Your little escape,<br /><em>right here.</em></>} description="A fresh look, a friendly hello, and a little time for yourself. Find us in Old Agarwal Nagar, Indore." /><VisitSection standalone /><BookingCTA /></>;
}
