# Look Good Salon — Final Client Demo

A premium frontend-only salon demo built with Next.js App Router, TypeScript, Tailwind CSS v4, and reusable components. The existing Phase 1 design is preserved, with a complete mock booking journey, gallery previews, and mobile quick actions. The site exports static files and needs no backend.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3100.

## Production build and preview

```sh
npm run lint
npm run typecheck
npm run build
npm run preview
```

`npm run build` exports all five routes into `out/`. The production preview serves them at http://localhost:3100. Stop the development server first if it is using that port.

## Deploy

The demo is published to the existing private Sites project configured in `.openai/hosting.json`. To deploy elsewhere, run `npm ci` followed by `npm run build` and upload the contents of `out/` to any static host. No environment variables, database, or server runtime are required. Preserve the exported directory structure so `/services/`, `/gallery/`, `/contact/`, and `/book/` resolve correctly.

## Booking demo

`/book/` offers service selection, an India-timezone calendar, sample time slots, customer name and Indian phone validation, an optional note, a running summary, and an animated sample confirmation. Its WhatsApp button prepares the booking details in a message addressed to the dummy number. Nothing is sent automatically, saved, or reserved. Refreshing the page resets the experience. No cookies or browser storage are used for booking details.

Service cards preselect the relevant service via `/book/?service=haircut` and equivalent links. Some sample time slots are always unavailable, with other disabled slots varying by date. Dates run from the current day in India through the next 60 days.

## Data to replace before a real presentation or launch

- Phone and WhatsApp: intentionally non-working sample `+91 00000 00000`.
- Instagram: sample handle and a generic Instagram destination.
- Service prices, durations, descriptions, opening hours, and fictional sample reviews.
- Stock inspiration images and sample social posts; these are not actual client work or salon interiors.

Edit `src/data/salon.ts` for business content and `src/data/booking.ts` for mock availability and booking labels. The exact provided Gen-Z Unisex Salon address and Google Maps Directions link are retained. All Directions links open that destination in a new tab.

Photography is bundled locally in responsive WebP sizes, with creator attribution in the gallery and `public/images/credits.json`. Fonts are bundled locally through Fontsource.

## Quality and accessibility

The layout is responsive, with reduced-motion support, visible focus indicators, keyboard-operable service and time choices, inline validation, disabled unavailable options, and an accessible native gallery dialog. The mobile menu contains keyboard focus while open and restores it on Escape. The mobile Book / WhatsApp / Call / Directions bar respects safe-area insets, and booking actions remain visible above it.

## Scope

This final client demo has no backend, database, admin dashboard, authentication, payment flow, WhatsApp API integration, data persistence, or real appointment availability.
