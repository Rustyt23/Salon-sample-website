# Style Studio imagery

`public/images/style-atlas.webp` is an illustrative, AI-generated portrait atlas, created with the built-in image generation tool. It is a compressed 1254 × 1254 WebP (about 246 KiB). CSS selects twelve 3:4 portraits from one 4-column × 3-row grid. The entire atlas stays cached, so switching looks does not trigger further image downloads.

## Generation brief

Create a precise, edge-to-edge 4-column by 3-row portrait atlas for a premium Indian salon website. Use the same fictional adult Indian woman in every tile: identical face, aligned forward-facing head-and-shoulders pose, cream studio background, black sleeveless top, soft natural editorial lighting, realistic skin and hair. Only the hair and makeup change. No borders, text, logos, watermark or salon tools.

In reading order: long dark layers; chin-length bob; curtain bangs; glossy chocolate brown waves; caramel balayage; burgundy hair; honey blonde; soft dark waves; sleek straight dark hair; voluminous blowout; unstyled natural/frizzy dark hair and minimal makeup; elegant bridal updo and bridal makeup.

The source generation is retained in the Codex generated-images directory. This brief records the intended composition, not a claim of real client transformations.

## Replacement guidance

Replace this atlas with salon-approved model photography or matched before/after client images with consent. Keep the 4 × 3 grid, consistent framing, and tile order, or update `src/data/looks.ts` and `LookPortrait` together. Higher-resolution portraits will improve large-screen detail. The preview is a visual mood board, not a prediction of a customer's result.

Existing hero, service, gallery and interior photographs are stock inspiration; their credits remain available on `/gallery`. The reviews, prices, hours, phone/WhatsApp number and Instagram handle also need verified business content before launch. Maps uses the existing supplied Indore location.
