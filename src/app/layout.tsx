import type { Metadata } from "next";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileActions } from "@/components/mobile-actions";
import { MotionEffects } from "@/components/motion-effects";

export const metadata: Metadata = {
  title: { default: "Look Good Salon | Hair, Beauty & Grooming in Indore", template: "%s | Look Good Salon" },
  description: "A little time for you. Discover hair, beauty, grooming and makeup at Look Good Salon in Indore. Find your next look and explore our appointment demo.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-scroll-behavior="smooth"><body><a href="#main-content" className="skip-link">Skip to content</a><Navbar /><main id="main-content">{children}</main><Footer /><MobileActions /><MotionEffects /></body></html>;
}
