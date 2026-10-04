import type { Metadata } from "next";
import { CartPage } from "@/components/shop/cart-ui";
export const metadata: Metadata = { title: "Your Bag" };
export default function Page() { return <CartPage />; }
