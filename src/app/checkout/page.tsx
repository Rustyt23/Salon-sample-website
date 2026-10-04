import type { Metadata } from "next";
import { Checkout } from "@/components/shop/checkout";
export const metadata: Metadata = { title: "Demo Checkout", robots: { index: false, follow: false } };
export default function Page() { return <Checkout />; }
