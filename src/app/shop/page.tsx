import type { Metadata } from "next";
import { ShopCollection } from "@/components/shop/products";
export const metadata: Metadata = { title: "Shop", description: "Explore the Look Good Salon concept collection of haircare, beauty and grooming essentials. Frontend shopping demo." };
export default function ShopPage() { return <ShopCollection />; }
