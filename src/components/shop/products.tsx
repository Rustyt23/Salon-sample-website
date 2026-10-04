"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Search, ShoppingBag, SlidersHorizontal, Star } from "lucide-react";
import { formatPrice } from "@/data/salon";
import { featuredProducts, productCategories, products, type Product } from "@/data/shop";
import { useCart } from "./cart-provider";
import { ProductPhoto } from "./product-photo";
import { QuantityControl, WhatsAppOrder } from "./cart-ui";
import { SectionHeading } from "../ui";

export function ProductActions({ product, quantity = 1 }: { product: Product; quantity?: number }) {
  const { add } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return <div className="product-actions"><button className={`button button-dark ${added ? "product-added" : ""}`} type="button" disabled={added} onClick={() => { if (!add(product.id, quantity)) return; setAdded(true); if (timer.current) clearTimeout(timer.current); timer.current = setTimeout(() => setAdded(false), 1500); }}>{added ? <Check size={15} aria-hidden="true" /> : <ShoppingBag size={15} aria-hidden="true" />}{added ? "Added" : "Add to Cart"}</button><button type="button" className="buy-now" onClick={() => { add(product.id, quantity, false); router.push("/checkout"); }}>Buy Now <ArrowRight size={14} aria-hidden="true" /></button></div>;
}
export function Price({ product }: { product: Product }) {
  return <span className="product-price"><strong>{formatPrice(product.price)}</strong>{product.originalPrice && <del aria-label={`Original price ${formatPrice(product.originalPrice)}`}>{formatPrice(product.originalPrice)}</del>}</span>;
}
export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const surface = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const coordinates = useRef({ x: 0, y: 0 });
  const active = useRef(false);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function follow(event: PointerEvent<HTMLDivElement>) {
    if (!active.current) return;
    coordinates.current = { x: event.clientX, y: event.clientY };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const element = surface.current;
      if (!element) return;
      const rect = (element.parentElement ?? element).getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (coordinates.current.x - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (coordinates.current.y - rect.top) / rect.height));
      element.style.setProperty("--product-x", `${(0.5 - y) * 5}deg`);
      element.style.setProperty("--product-y", `${(x - 0.5) * 5}deg`);
      element.style.setProperty("--product-spot-x", `${x * 100}%`);
      element.style.setProperty("--product-spot-y", `${y * 100}%`);
    });
  }
  function reset() {
    active.current = false; cancelAnimationFrame(frame.current); frame.current = 0;
    surface.current?.removeAttribute("data-tilt");
    surface.current?.style.setProperty("--product-x", "0deg"); surface.current?.style.setProperty("--product-y", "0deg");
  }
  return <article className="product-card" data-reveal data-reveal-order={index % 4}><div className="product-surface" ref={surface} onPointerEnter={(event) => { active.current = event.pointerType === "mouse" && window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches; if (active.current) { surface.current?.setAttribute("data-tilt", "true"); follow(event); } }} onPointerMove={follow} onPointerLeave={reset} onPointerCancel={reset}>
    <Link href={`/shop/${product.slug}`} className="product-image-link" aria-label={`View ${product.name}`}><ProductPhoto product={product} />{product.badge && <span className="product-badge">{product.badge}</span>}<span className="product-view" aria-hidden="true">Discover <ArrowRight size={15} /></span></Link>
    <div className="product-card-content"><div className="product-card-meta"><span className="product-brand">LUMA RITUAL</span><span className="product-rating" aria-label={`Illustrative rating: ${product.rating} out of 5`}><Star size={11} fill="currentColor" aria-hidden="true" />{product.rating}</span></div><h3><Link href={`/shop/${product.slug}`}>{product.name}</Link></h3><p className="product-benefit">{product.benefit}</p><div className="product-price-row"><Price product={product} /><span>{product.size}</span></div><ProductActions product={product} /></div>
  </div></article>;
}
export function SalonFavourites() {
  return <section className="section container salon-favourites"><SectionHeading eyebrow="THE TAKE-HOME EDIT" title={<>Salon <em>Favourites</em></>} description="A little salon care, for every day."><Link href="/shop" className="text-link">View All Products <ArrowRight size={16} aria-hidden="true" /></Link></SectionHeading><div className="featured-products-grid">{featuredProducts.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div><p className="collection-note">Meet Luma Ritual, our fictional demo brand. Products and ratings are illustrative.</p></section>;
}
export function ShopCollection() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All products");
  const [maximum, setMaximum] = useState(2500);
  const [sort, setSort] = useState("featured");
  const filtered = products.filter((product) => (category === "All products" || product.category === category) && product.price <= maximum && `${product.name} ${product.category} ${product.benefit}`.toLowerCase().includes(search.trim().toLowerCase())).sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : sort === "name" ? a.name.localeCompare(b.name) : products.indexOf(a) - products.indexOf(b));
  function reset() { setSearch(""); setCategory("All products"); setMaximum(2500); setSort("featured"); }
  return <div className="container shop-page"><div className="shop-page-heading shop-intro"><div><p className="eyebrow">THE LOOK GOOD SHOP</p><h1>The <em>care edit.</em></h1><p>Good hair days don’t end at the salon.<br />Discover a few essentials for your everyday ritual.</p></div><div className="shop-intro-note"><span>01 — THE CONCEPT COLLECTION</span><p>Luma Ritual is a fictional demo brand.<br />Products, prices and ratings are illustrative.</p><span>THOUGHTFUL CARE. BEAUTIFUL ROUTINES.</span></div></div>
    <div className="shop-toolbar"><label className="shop-search"><Search size={18} aria-hidden="true" /><span className="sr-only">Search products</span><input type="search" placeholder="Find your next essential…" value={search} onChange={(event) => setSearch(event.target.value)} /></label><label className="shop-sort">Sort by<select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Our favourites</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option><option value="name">Name: A–Z</option></select></label></div>
    <div className="shop-collection-layout"><aside className="shop-filters" aria-label="Product filters"><p className="filter-heading"><SlidersHorizontal size={15} aria-hidden="true" />THE COLLECTION</p><label className="mobile-category">Collection<select value={category} onChange={(event) => setCategory(event.target.value)}>{["All products", ...productCategories].map((name) => <option key={name} value={name}>{name}</option>)}</select></label><div className="category-filters" role="group" aria-label="Categories">{["All products", ...productCategories].map((name) => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)}>{name}<span>{name === "All products" ? products.length : products.filter((product) => product.category === name).length}</span></button>)}</div><div className="price-filter"><label htmlFor="maximum-price">Maximum price <strong>{formatPrice(maximum)}</strong></label><input id="maximum-price" type="range" min="300" max="2500" step="50" value={maximum} onChange={(event) => setMaximum(Number(event.target.value))} /><div><span>₹300</span><span>₹2,500</span></div></div><button type="button" className="reset-filters" onClick={reset}>Reset filters</button></aside>
    <div><p className="shop-result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "essential" : "essentials"}{category !== "All products" ? ` · ${category}` : " for your shelf"}</p>{filtered.length ? <div className="shop-products-grid">{filtered.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}</div> : <div className="shop-no-results"><h2>A fresh search?</h2><p>No products match your filters.</p><button className="button button-outline" type="button" onClick={reset}>Reset filters</button></div>}</div></div>
    <div className="shop-bottom-note"><ShoppingBag size={23} strokeWidth={1.2} aria-hidden="true" /><p>A complete shopping experience to explore.<br /><span>Frontend demo · no real orders, payments or deliveries.</span></p><Link href="/book" className="text-link">Pair it with an appointment <ArrowRight size={15} aria-hidden="true" /></Link></div>
  </div>;
}
export function ProductDetail({ product }: { product: Product }) {
  const [view, setView] = useState(0);
  const [quantity, setQuantity] = useState(1);
  return <div className="container shop-page"><nav className="shop-breadcrumb" aria-label="Breadcrumb"><Link href="/shop">Shop</Link><span aria-hidden="true">/</span><span aria-current="page">{product.name}</span></nav><div className="product-detail-layout"><div className="product-gallery"><div className="product-main-photo"><ProductPhoto product={product} view={view} key={view} />{product.badge && <span className="product-badge">{product.badge}</span>}</div><div className="product-thumbnails" role="group" aria-label="Product images">{product.images.map((image, index) => <button key={image.tile} type="button" aria-label={`Show ${index === 0 ? "front" : "styled"} view`} aria-pressed={view === index} onClick={() => setView(index)}><ProductPhoto product={product} view={index} /></button>)}<p>Considered care.<br />For your everyday ritual.</p></div></div>
    <div className="product-detail-content"><p className="eyebrow">LUMA RITUAL · {product.category.toUpperCase()}</p><h1>{product.name}</h1><p className="product-detail-benefit">{product.benefit}</p><div className="product-detail-price"><Price product={product} />{product.originalPrice && <span className="product-discount">Save {Math.round((1 - product.price / product.originalPrice) * 100)}%</span>}</div><p className="product-size">{product.size} <span>·</span> <Star size={12} fill="currentColor" aria-hidden="true" /> {product.rating} / 5 <span>(illustrative rating)</span></p><p className="product-description">{product.description}</p><div className="product-quantity"><span>Quantity</span><QuantityControl quantity={quantity} name={product.name} onChange={setQuantity} /></div><ProductActions product={product} quantity={quantity} /><WhatsAppOrder items={[{ product, quantity }]} /><p className="shop-fineprint">Fictional demo product · no real purchase or delivery.<br />Illustrative delivery ₹99; complimentary from ₹1,499.</p><div className="product-info"><details open><summary>Why you’ll love it</summary><ul>{product.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul></details><details><summary>How to use</summary><ol>{product.howToUse.map((step) => <li key={step}>{step}</li>)}</ol></details></div></div></div><section className="product-related"><SectionHeading eyebrow="COMPLETE YOUR RITUAL" title={<>A little more <em>care.</em></>} /><div className="featured-products-grid">{products.filter((entry) => entry.id !== product.id).slice(0, 4).map((entry, index) => <ProductCard product={entry} index={index} key={entry.id} />)}</div></section></div>;
}
