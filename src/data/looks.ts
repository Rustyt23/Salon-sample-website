export type StudioCategory = "Cut" | "Colour" | "Style";
export type StudioLook = {
  id: string; name: string; category: StudioCategory; tile: number;
  description: string; detail: string; service: string; swatch?: string;
};

export const studioCategories: StudioCategory[] = ["Cut", "Colour", "Style"];
export const studioLooks: StudioLook[] = [
  { id: "layers", name: "Long Layers", category: "Cut", tile: 0, description: "Movement, shape, and a beautifully effortless finish.", detail: "Soft dimension · Face-framing layers", service: "haircut" },
  { id: "bob", name: "Bob Cut", category: "Cut", tile: 1, description: "A clean silhouette with a little attitude.", detail: "Chin-length shape · A precise finish", service: "haircut" },
  { id: "bangs", name: "Curtain Bangs", category: "Cut", tile: 2, description: "The softest frame for your features.", detail: "Parted fringe · Effortless texture", service: "haircut" },
  { id: "chocolate", name: "Chocolate Brown", category: "Colour", tile: 3, description: "Rich, glossy brunette with depth in every strand.", detail: "Deep brunette · A luminous finish", service: "colour", swatch: "#493026" },
  { id: "caramel", name: "Caramel", category: "Colour", tile: 4, description: "Sunlit ribbons of warmth, beautifully blended.", detail: "Warm highlights · Soft dimension", service: "colour", swatch: "#b6824d" },
  { id: "burgundy", name: "Burgundy", category: "Colour", tile: 5, description: "A quietly bold shade that catches the light.", detail: "Wine-red tones · Rich dimension", service: "colour", swatch: "#67353e" },
  { id: "honey", name: "Honey Blonde", category: "Colour", tile: 6, description: "Golden, glowing, and full of light.", detail: "Golden blonde · A soft blend", service: "colour", swatch: "#c8a46a" },
  { id: "waves", name: "Soft Waves", category: "Style", tile: 7, description: "Loose, touchable waves with a natural rhythm.", detail: "Relaxed texture · Soft movement", service: "styling" },
  { id: "straight", name: "Sleek Straight", category: "Style", tile: 8, description: "Smooth lines and a beautifully polished finish.", detail: "Silky texture · A glossy finish", service: "styling" },
  { id: "blowout", name: "Blowout", category: "Style", tile: 9, description: "Lift, bounce, and that just-left-the-salon feeling.", detail: "Full volume · A sweeping shape", service: "styling" },
];

export const transformations = [
  { id: "balayage", name: "Balayage", before: 10, after: 4, description: "From flat colour to warm, softly blended dimension." },
  { id: "haircut", name: "Haircut", before: 0, after: 1, description: "A new silhouette. A fresh perspective." },
  { id: "keratin", name: "Keratin / Smoothening", before: 10, after: 8, description: "Explore the difference a smooth, polished finish can make." },
  { id: "bridal", name: "Bridal Makeup", before: 10, after: 11, description: "Soft definition and an elegant finish for your moment." },
];
