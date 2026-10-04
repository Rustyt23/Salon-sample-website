import { formatPrice, salon } from "./salon";

export const productCategories = ["Shampoo & Conditioner", "Hair Serums", "Hair Masks", "Styling Products", "Beard Care", "Skin Care", "Nail Care", "Salon Combos"] as const;
export type Product = {
  id: string; slug: string; name: string; category: typeof productCategories[number];
  price: number; originalPrice?: number; benefit: string; description: string; size: string;
  benefits: string[]; howToUse: string[]; rating: number; badge?: "Bestseller" | "New" | "Featured";
  images: { tile: number; alt: string }[];
};

const collection: Omit<Product, "images">[] = [
  { id: "balance", slug: "daily-balance-duo", name: "Daily Balance Duo", category: "Shampoo & Conditioner", price: 899, originalPrice: 1099, benefit: "A softer start to every wash day.", description: "A gentle shampoo and a creamy conditioner for an easy everyday hair ritual. A considered pairing for soft, manageable lengths.", size: "2 × 300 ml", benefits: ["Gently cleanses daily build-up", "Softens and helps detangle lengths", "A fresh, lightweight finish"], howToUse: ["Massage shampoo into wet hair, then rinse.", "Work conditioner through the mid-lengths and ends.", "Leave for two minutes and rinse thoroughly."], rating: 4.8, badge: "Bestseller" },
  { id: "serum", slug: "silk-finish-serum", name: "Silk Finish Serum", category: "Hair Serums", price: 649, originalPrice: 799, benefit: "Smooth lengths. A little more shine.", description: "A lightweight finishing serum for flyaways and a polished finish, without weighing down your styling.", size: "50 ml", benefits: ["Tames the appearance of flyaways", "Adds a soft, glossy finish", "Lightweight on the lengths"], howToUse: ["Warm one or two pumps between your palms.", "Smooth over damp or dry mid-lengths and ends.", "Style as usual; avoid applying directly to the scalp."], rating: 4.9, badge: "Bestseller" },
  { id: "mask", slug: "deep-comfort-mask", name: "Deep Comfort Mask", category: "Hair Masks", price: 799, benefit: "Your weekly moment of nourishment.", description: "A rich rinse-out mask for lengths that need a little extra care. Make space for a slower, softer wash day.", size: "250 ml", benefits: ["Leaves lengths feeling softer", "Helps improve manageability", "A comforting weekly care ritual"], howToUse: ["Apply to clean, towel-dried hair.", "Comb through lengths and leave for five minutes.", "Rinse well. Use once a week."], rating: 4.7, badge: "New" },
  { id: "cream", slug: "airy-hold-cream", name: "Airy Hold Cream", category: "Styling Products", price: 549, benefit: "Natural movement, softly defined.", description: "A flexible styling cream for texture, shape and a touchable finish. For good hair that still moves like yours.", size: "100 ml", benefits: ["Soft, flexible hold", "Helps define natural texture", "A touchable finish"], howToUse: ["Work a pea-sized amount between palms.", "Distribute through damp or dry hair.", "Shape with fingers or a brush."], rating: 4.7 },
  { id: "beard", slug: "beard-ritual-oil", name: "Beard Ritual Oil", category: "Beard Care", price: 449, benefit: "A softer beard. A neater finish.", description: "An everyday grooming oil for a soft, cared-for beard and a subtle, clean finish.", size: "30 ml", benefits: ["Conditions beard hair", "Helps soften coarse texture", "Adds a neat, subtle sheen"], howToUse: ["Place two or three drops into palms.", "Massage through a clean, dry beard.", "Comb into shape."], rating: 4.8 },
  { id: "cleanse", slug: "gentle-cleanse-face-wash", name: "Gentle Cleanse", category: "Skin Care", price: 399, benefit: "A fresh reset for your daily routine.", description: "A gentle face wash for a simple, refreshing daily cleanse. An understated addition to your bathroom shelf.", size: "100 ml", benefits: ["Cleanses everyday impurities", "A soft, comfortable after-feel", "Easy to add to your daily routine"], howToUse: ["Apply a small amount to damp skin.", "Massage gently, avoiding the eye area.", "Rinse and follow with your usual moisturiser."], rating: 4.7, badge: "New" },
  { id: "nails", slug: "gloss-finish-cuticle-oil", name: "Gloss Finish Oil", category: "Nail Care", price: 349, benefit: "The smallest details, beautifully cared for.", description: "A nourishing nail and cuticle oil for your finishing ritual. A little care after every manicure.", size: "15 ml", benefits: ["Conditions dry cuticles", "Adds a healthy-looking nail sheen", "A quick, easy finishing touch"], howToUse: ["Apply a small drop around each nail.", "Massage gently into the cuticle.", "Let it absorb before using your hands."], rating: 4.8 },
  { id: "combo", slug: "complete-care-ritual", name: "Complete Care Ritual", category: "Salon Combos", price: 1899, originalPrice: 2249, benefit: "Four essentials. One thoughtful ritual.", description: "The Daily Balance shampoo and conditioner, Silk Finish Serum and Deep Comfort Mask in one considered collection. A complete shelf refresh or a thoughtful gift.", size: "4-piece care set", benefits: ["Cleanse, condition, nourish and finish", "A coordinated everyday and weekly ritual", "Presented together in a gift box"], howToUse: ["Cleanse and condition with the Daily Balance Duo.", "Use the Deep Comfort Mask once a week.", "Finish with a small amount of Silk Finish Serum."], rating: 4.9, badge: "Featured" },
];

export const products: Product[] = collection.map((product, index) => ({ ...product, images: [
  { tile: index * 2, alt: `Luma Ritual ${product.name}, front packaging view` },
  { tile: index * 2 + 1, alt: `Luma Ritual ${product.name}, styled packaging view` },
] }));
export const featuredProducts = products.filter((product) => ["balance", "serum", "mask", "combo"].includes(product.id));
export const MAX_QUANTITY = 20;
export type CartLine = { productId: string; quantity: number };
export type CartItem = { product: Product; quantity: number };
export function calculateTotals(items: CartItem[]) {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 1499 ? 0 : 99;
  return { subtotal, delivery, total: subtotal + delivery };
}
export type CustomerDetails = { name: string; phone: string; email: string; address: string; city: string; state: string; pincode: string };
export function orderWhatsAppUrl(items: CartItem[], customer?: CustomerDetails, payment?: string, orderId?: string) {
  const totals = calculateTotals(items);
  const message = ["Hello Look Good Salon! I'd like to discuss this demo product order:", ...items.map(({ product, quantity }) => `${product.name} × ${quantity} — ${formatPrice(product.price * quantity)}`), `Subtotal: ${formatPrice(totals.subtotal)}`, `Illustrative delivery: ${formatPrice(totals.delivery)}`, `Estimated total: ${formatPrice(totals.total)}`, customer ? `Customer: ${customer.name}\nPhone: ${customer.phone}${customer.email ? `\nEmail: ${customer.email}` : ""}\nAddress: ${customer.address}, ${customer.city}, ${customer.state} ${customer.pincode}` : "", payment ? `Demo payment choice: ${payment}` : "", orderId ? `Sample order ID: ${orderId}` : "", "Fictional Luma Ritual products. This is a website demo; no payment has been taken."].filter(Boolean).join("\n");
  return `https://wa.me/${salon.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
