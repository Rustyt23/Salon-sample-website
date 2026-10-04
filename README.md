# Look Good Salon — Phase 1

A premium, frontend-only salon demo built with Next.js App Router, TypeScript, Tailwind CSS v4, and reusable React components. The app exports static files and does not need a backend.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3100. For a production preview, run `npm run build` followed by `npm run preview`.

## Validation

```sh
npm run lint
npm run typecheck
npm run build
```

The production build exports all pages to `out/`.

## Pages

- `/` — sticky navigation, hero, eight popular services, gallery/lightbox, benefits, sample reviews, sample Instagram posts, visit details, booking CTA, footer.
- `/services` — all eight services grouped into hair, grooming, and beauty with sample INR prices and durations.
- `/gallery` — categorized inspiration gallery, accessible native dialog lightbox with previous/next controls and keyboard navigation, photography credits.
- `/contact` — supplied location, exact Google Maps Directions link opening in a new tab, sample hours, call and WhatsApp links.
- `/book` — polished, explicitly unavailable booking shell. No appointment is submitted or saved.

## Business data

Edit `src/data/salon.ts` to update the brand, service menu, sample prices, reviews, gallery, contact details, opening hours, and social links. Only the supplied address and Maps destination are real. Images are stock inspiration, not this salon's actual work or interior. Phone and WhatsApp use the intentionally dummy `+91 00000 00000`; replace these before using the website for a real business. The Instagram CTA opens Instagram because no business account was provided.

Photography lives locally in `public/images/`, with responsive WebP sizes. Creator/source attribution is in `public/images/credits.json`, the reusable config, and the gallery page. Fonts are bundled locally through Fontsource.

## Accessibility and responsiveness

Semantic sections, accessible navigation, skip link, focus indicators, image alt text, mobile menu with Escape dismissal, dialog focus containment/return, keyboard gallery controls, reduced-motion support, and responsive layouts are included.

## Phase boundary

There is no database, real booking flow, admin dashboard, authentication, WhatsApp API, or payment processing. All booking CTAs lead to the Phase 2 placeholder.
