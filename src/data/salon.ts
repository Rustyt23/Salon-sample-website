export const salon = {
  name: "Look Good Salon",
  tagline: "A little time for you. A whole new feeling.",
  address: "Gen-Z Unisex Salon, 53, near Mornee Saree, Old Agarwal Nagar, Indore, Madhya Pradesh 452001",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gen-Z+unisex+salon%2C+53%2C+near+Mornee+Saree%2C+Old+Agarwal+Nagar%2C+Indore%2C+Madhya+Pradesh+452001&query_place_id=ChIJQbDy0LX9YjkRRxot4DI0P0c",
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsappNumber: "910000000000",
  whatsappUrl: "https://wa.me/910000000000?text=Hello%20Look%20Good%20Salon",
  instagramHandle: "@lookgoodsalon.demo",
  instagramUrl: "https://www.instagram.com/",
  hours: "Monday – Sunday, 10 AM – 8 PM",
  demoNotice: "Demo website — images, prices, reviews and contact details are illustrative.",
} as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shop", href: "/shop" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/contact" },
];

export type ServiceCategory = "Hair" | "Grooming" | "Beauty";
export type Service = {
  id: string; name: string; category: ServiceCategory;
  description: string; price: number; duration: string;
  image: string; alt: string; tag?: string;
};

export const services: Service[] = [
  { id: "haircut", name: "Haircut", category: "Hair", description: "A fresh shape, a precise cut, and a look that feels like you.", price: 499, duration: "45 min", image: "haircut", alt: "Stylist blow-drying a woman's hair for a polished finish", tag: "THE EVERYDAY ESSENTIAL" },
  { id: "styling", name: "Hair Styling", category: "Hair", description: "Soft waves, a sleek finish, or something a little more special.", price: 699, duration: "45 min", image: "hero", alt: "Glossy black hair styled with a soft fringe" },
  { id: "colour", name: "Hair Colour", category: "Hair", description: "Rich colour and beautifully blended tones, made personal.", price: 1999, duration: "120 min", image: "color", alt: "Dimensional balayage with softly styled waves", tag: "A LITTLE TRANSFORMATION" },
  { id: "spa", name: "Hair Spa", category: "Hair", description: "A restorative ritual to nourish your hair and slow your day.", price: 999, duration: "60 min", image: "interior", alt: "Comfortable salon chairs in a bright, relaxing studio" },
  { id: "grooming", name: "Beard & Grooming", category: "Grooming", description: "Clean lines, a considered shape, and a confident finish.", price: 349, duration: "30 min", image: "grooming", alt: "Barber shaping and trimming a man's hair", tag: "REFINED, DOWN TO THE DETAIL" },
  { id: "facial", name: "Facial", category: "Beauty", description: "Thoughtful skin care for a refreshed, naturally radiant glow.", price: 1499, duration: "60 min", image: "beauty", alt: "Gentle facial treatment in a beauty salon" },
  { id: "makeup", name: "Makeup", category: "Beauty", description: "From understated elegance to your unforgettable occasion.", price: 2499, duration: "75 min", image: "makeup", alt: "Woman applying makeup with a soft brush", tag: "YOUR MOMENT TO SHINE" },
  { id: "nails", name: "Nail Care", category: "Beauty", description: "Neat shapes, considered colours, and a little finishing touch.", price: 599, duration: "45 min", image: "nails", alt: "Professional applying polish during a manicure" },
];

export const gallery = [
  { id: "colour", image: "color", title: "The soft balayage", category: "Colour", alt: "Long wavy hair with blended blonde and brunette balayage" },
  { id: "haircut", image: "haircut", title: "A fresh perspective", category: "Hair", alt: "A stylist blow-drying hair with a round brush" },
  { id: "makeup", image: "makeup", title: "A moment of glamour", category: "Makeup", alt: "A woman applying makeup with a soft brush" },
  { id: "grooming", image: "grooming", title: "Clean cut. Quiet confidence.", category: "Grooming", alt: "A barber working on a neatly groomed men's haircut" },
  { id: "styling", image: "hero", title: "The glossy finish", category: "Hair", alt: "Woman with glossy black hair and softly styled bangs" },
  { id: "nails", image: "nails", title: "Details, beautifully done", category: "Beauty", alt: "A close-up of a professional manicure" },
  { id: "facial", image: "beauty", title: "The reset ritual", category: "Beauty", alt: "A relaxing facial treatment" },
  { id: "studio", image: "interior", title: "A space to unwind", category: "The studio", alt: "Warm, naturally lit salon interior with styling chairs" },
];
export type GalleryItem = (typeof gallery)[number];

export const reviews = [
  { name: "Aanya S.", initials: "AS", service: "Haircut & styling", quote: "They took the time to understand exactly what I wanted. I left with the best haircut and a little extra confidence." },
  { name: "Rohan M.", initials: "RM", service: "Beard & grooming", quote: "A calm space, attention to the smallest details, and a seriously good finish. Just the kind of reset I needed." },
  { name: "Priya K.", initials: "PK", service: "Hair colour", quote: "My colour looks so natural and feels so fresh. The whole experience was warm, relaxed, and thoughtful." },
];

export const instagramPosts = [
  { image: "color", alt: "Soft balayage inspiration", caption: "A softer shade of you." },
  { image: "interior", alt: "Inside a bright, welcoming salon", caption: "Your little escape." },
  { image: "makeup", alt: "Makeup brush blending a beauty look", caption: "Ready for your moment." },
  { image: "grooming", alt: "A fresh men's grooming look", caption: "All in the details." },
];

export const imageCredits = [
  { name: "Antonio Friedemann", platform: "Unsplash", source: "https://unsplash.com/photos/woman-with-black-hair-and-red-lipstick-RhfbrAWZgrw" },
  { name: "Daniil Kondrashin", platform: "Pexels", source: "https://www.pexels.com/photo/a-woman-at-a-hairdresser-14615063/" },
  { name: "Yovanka Loria Salon", platform: "Unsplash", source: "https://unsplash.com/photos/persons-hand-on-long-wavy-ombre-hair-e900d39_6No" },
  { name: "Gabriel Puyén", platform: "Pexels", source: "https://www.pexels.com/photo/close-up-photo-of-manicuring-of-nails-6135684/" },
  { name: "KATRIN BOLOVTSOVA", platform: "Pexels", source: "https://www.pexels.com/photo/photo-of-woman-holding-make-up-brush-4672727/" },
  { name: "Giorgio Trovato", platform: "Unsplash", source: "https://unsplash.com/photos/OKXwmdbdXkk" },
  { name: "Gustavo Fring", platform: "Pexels", source: "https://www.pexels.com/photo/man-getting-his-hair-cut-at-a-barber-shop-7447132/" },
  { name: "Gustavo Fring", platform: "Pexels", source: "https://www.pexels.com/photo/woman-getting-facial-treatment-3985323/" },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(price);
}
