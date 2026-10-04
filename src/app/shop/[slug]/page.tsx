import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/shop";
import { ProductDetail } from "@/components/shop/products";
export const dynamicParams = false;
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  return { title: product?.name ?? "Product", description: product?.benefit };
}
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();
  return <ProductDetail product={product} key={product.id} />;
}
