import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery";
import { BookingCTA, PageIntro } from "@/components/ui";
import { imageCredits } from "@/data/salon";

export const metadata: Metadata = { title: "The Gallery", description: "Explore salon inspiration, from beautifully blended hair colour and fresh cuts to makeup and grooming. Sample photography for the Look Good Salon demo." };

export default function GalleryPage() {
  return <><PageIntro eyebrow="THE LOOK BOOK" title={<>A little inspiration.<br />Endless <em>possibilities.</em></>} description="The colours, cuts, and finishing touches that make a look feel personal. Find a little inspiration for your next visit." /><section className="container gallery-page"><p className="gallery-demo-note">INSPIRATION GALLERY · Sample images, not actual work or interiors from this salon.</p><GalleryGrid filterable /><details className="image-credits"><summary>Photography credits</summary><p>Demo photography is provided by these creators on Unsplash and Pexels.</p><ul>{imageCredits.map((credit, index) => <li key={`${credit.name}-${index}`}><a href={credit.source} target="_blank" rel="noopener noreferrer">{credit.name} · {credit.platform}</a></li>)}</ul></details></section><BookingCTA /></>;
}
