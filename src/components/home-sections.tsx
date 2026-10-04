import { BadgeCheck, Droplets, ShieldCheck, Sparkles, Star, Camera } from "lucide-react";
import { reviews, instagramPosts, salon } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { ScrollTitle, SectionHeading } from "./ui";

const benefits = [
  { icon: BadgeCheck, title: "People who care", description: "Thoughtful consultations and professional service, from your first hello to your final look." },
  { icon: Droplets, title: "Only the good stuff", description: "Quality products, chosen with care for your hair, skin, and the finish you love." },
  { icon: ShieldCheck, title: "Comfort, without compromise", description: "Clean tools, a tidy space, and hygiene that makes every visit feel comfortable." },
  { icon: Sparkles, title: "Fresh ideas. Your style.", description: "Modern techniques and a personal touch, for a look that feels like your own." },
];

export function WhyChooseUs() {
  return <section className="section container why-section"><div className="why-image" data-reveal="image" data-scroll-depth><SalonImage name="interior" alt="Bright and comfortable salon space with modern styling stations" sizes="(max-width: 768px) 100vw, 50vw" /><div className="why-image-caption"><span>A SPACE TO SLOW DOWN</span><p>Come as you are.<br />Leave <em>feeling good.</em></p></div></div><div className="why-content"><div data-reveal="heading"><p className="eyebrow">MORE THAN A NEW LOOK</p><h2><ScrollTitle>Good hands.<br /><em>Great feeling.</em></ScrollTitle></h2><p className="why-description">Because the way you feel matters just as much as the way you look.</p></div><div className="benefits">{benefits.map(({ icon: Icon, title, description }, index) => <div className="benefit" data-reveal data-reveal-order={index} key={title}><span><Icon size={24} strokeWidth={1.2} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div></section>;
}

export function Reviews() {
  return <section className="reviews-section" id="reviews"><div className="section container"><SectionHeading centered eyebrow="THE GOOD FEELING GOES HOME WITH YOU" title={<>A few <em>kind words.</em></>} description="An example of the stories we hope to be part of." /><div className="grid gap-5 md:grid-cols-3">{reviews.map((review, index) => <article key={review.name} className="review-card" data-reveal data-reveal-order={index}><div className="review-top"><span className="review-stars" aria-label="5 out of 5 sample rating">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</span><span className="review-sample">Sample review</span></div><blockquote>“{review.quote}”</blockquote><div className="review-person"><span className="review-avatar">{review.initials}</span><div><h3>{review.name}</h3><p>{review.service}</p></div></div></article>)}</div><p className="sample-note text-center">These are fictional sample reviews for the website demo.</p></div></section>;
}

export function InstagramSection() {
  return <section className="section container instagram-section"><SectionHeading eyebrow="A LITTLE GOOD IN YOUR FEED" title={<>Stay in the <em>look.</em></>} description="Daily details. Fresh inspiration. A peek behind the chair."><a className="text-link instagram-link" href={salon.instagramUrl} target="_blank" rel="noopener noreferrer"><Camera size={17} aria-hidden="true" /> Find us on Instagram</a></SectionHeading><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">{instagramPosts.map((post, index) => <a key={post.image} className="instagram-post" data-reveal data-reveal-order={index} href={salon.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`${post.caption} — sample Instagram post`}><SalonImage name={post.image} alt={post.alt} /><span className="instagram-overlay"><Camera size={22} aria-hidden="true" /><span>{post.caption}</span></span></a>)}</div><div className="instagram-bottom"><span>{salon.instagramHandle}</span><p>Sample posts & handle · Instagram link opens the platform.</p></div></section>;
}
