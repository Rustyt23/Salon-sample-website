import Link from "next/link";
import { BadgeCheck, Droplets, ShieldCheck, Star, ArrowUpRight, Play } from "lucide-react";
import { reviews, instagramPosts, salon } from "@/data/salon";
import { SalonImage } from "./salon-image";
import { ScrollTitle, SectionHeading } from "./ui";

const benefits = [
  { icon: BadgeCheck, title: "A look that fits you", description: "Personal consultations. Thoughtful technique. A finish that feels like your own." },
  { icon: Droplets, title: "Care in every detail", description: "Considered products and treatments, selected for your hair and skin." },
  { icon: ShieldCheck, title: "Space to feel at ease", description: "Clean tools, a comfortable studio, and people who make you feel welcome." },
];

export function WhyChooseUs() {
  return <section className="section container why-section"><div className="why-image" data-reveal="image" data-scroll-depth><SalonImage name="interior" alt="Bright and comfortable salon with modern styling stations" sizes="(max-width: 768px) 90vw, 45vw" /><div className="why-image-caption"><span>THE LOOK GOOD EXPERIENCE</span><p>A little time.<br /><em>A lot of care.</em></p></div></div><div className="why-content"><div data-reveal="heading"><p className="eyebrow">WHY LOOK GOOD</p><h2><ScrollTitle>Good hands.<br /><em>Great feeling.</em></ScrollTitle></h2></div><div className="benefits">{benefits.map(({ icon: Icon, title, description }, index) => <div className="benefit" data-reveal data-reveal-order={index} key={title}><span><Icon size={24} strokeWidth={1.2} aria-hidden="true" /></span><div><h3>{title}</h3><p>{description}</p></div></div>)}</div></div></section>;
}

export function Reviews() {
  return <section className="reviews-section" id="reviews"><div className="section container"><SectionHeading centered eyebrow="THE CLIENT EXPERIENCE" title={<>Good looks. <em>Kind words.</em></>} /><div className="grid gap-5 md:grid-cols-3">{reviews.map((review, index) => <article key={review.name} className="review-card" data-reveal data-reveal-order={index}><div className="review-top"><span className="review-stars" aria-label="5 out of 5 illustrative rating">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} aria-hidden="true" />)}</span><span className="review-quote-mark" aria-hidden="true">“</span></div><blockquote>“{review.quote}”</blockquote><div className="review-person"><span className="review-avatar">{review.initials}</span><div><h3>{review.name}</h3><p>{review.service}</p></div></div></article>)}</div></div></section>;
}

export function InstagramSection() {
  return <section className="section container instagram-section"><SectionHeading eyebrow="THE LOOK BOOK" title={<>Fresh looks.<br /><em>Worth a closer look.</em></>} description="Colour, texture, and the details that make a look."><Link className="text-link" href="/gallery">Explore the gallery <ArrowUpRight size={16} aria-hidden="true" /></Link></SectionHeading>
    <div className="editorial-reels">{instagramPosts.map((post, index) => <a key={post.image} className="instagram-post reel-card" data-reveal data-reveal-order={index} href={salon.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`View ${post.caption} inspiration on Instagram`}>
      <SalonImage name={post.image} alt={post.alt} sizes="(max-width: 640px) 45vw, 24vw" />
      <span className="reel-index">0{index + 1} / THE EDIT</span><span className="reel-play" aria-hidden="true"><Play size={18} strokeWidth={1.2} /></span>
      <span className="reel-caption"><span>{["COLOUR STORIES", "INSIDE THE STUDIO", "BEAUTY DETAILS", "THE FINISH"][index]}</span><strong>{post.caption}</strong><ArrowUpRight size={18} aria-hidden="true" /></span>
    </a>)}</div><div className="instagram-bottom"><a href={salon.instagramUrl} target="_blank" rel="noopener noreferrer">Find us on Instagram <ArrowUpRight size={14} aria-hidden="true" /></a><span>{salon.instagramHandle}</span></div>
  </section>;
}
