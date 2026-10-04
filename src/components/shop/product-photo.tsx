import type { Product } from "@/data/shop";

export function ProductPhoto({ product, view = 0, className = "" }: { product: Product; view?: number; className?: string }) {
  const image = product.images[view] ?? product.images[0];
  return <div className={`product-photo ${className}`} role="img" aria-label={image.alt} style={{ backgroundPosition: `${(image.tile % 4) * 100 / 3}% ${Math.floor(image.tile / 4) * 100 / 3}%` }} />;
}
