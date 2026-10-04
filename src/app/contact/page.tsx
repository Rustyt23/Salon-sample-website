import type { Metadata } from "next";
import { VisitSection } from "@/components/visit";
import { BookingCTA, PageIntro } from "@/components/ui";

export const metadata: Metadata = { title: "Visit Us", description: "Find the supplied Gen-Z Unisex Salon location near Mornee Saree in Old Agarwal Nagar, Indore. Get directions to plan your visit." };

export default function ContactPage() {
  return <><PageIntro eyebrow="LET’S MAKE IT A GOOD DAY" title={<>Your little escape,<br /><em>right here.</em></>} description="A fresh look, a friendly hello, and a little time for yourself. Visit the supplied salon location in the heart of Indore." /><VisitSection standalone /><section className="container contact-note"><span className="eyebrow">A NOTE FOR THIS PREVIEW</span><p>The address belongs to Gen-Z Unisex Salon, as supplied for this demo. Look Good Salon is the demo brand. Opening hours and contact numbers are placeholders; only the Directions link points to a verified supplied destination.</p></section><BookingCTA /></>;
}
