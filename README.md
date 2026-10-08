# Shopify developer & media buyer portfolio

A Next.js 16 portfolio for Youseef’s Shopify development, conversion optimization, and paid social services. Includes responsive navigation, concept case studies, social sharing images, and a validated project inquiry form.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000. For a production preview, run `npm run build` followed by `npm run start`.

## Personalize the portfolio

Edit `src/data/portfolio.ts`. The `profile` object supplies your name, initials, introduction, contact links, and identity across the homepage, navigation, footer, search metadata, and social sharing image.

- Set `name` and `monogram` to your name and initials.
- Set `email` to your public contact address.
- Set `whatsapp` to international digits only, including the country code (no `+`, spaces, or punctuation).
- Set `linkedin` to your full LinkedIn profile URL.
- Set `location`, `role`, `introduction`, and `description` to your own copy.
- The hero intentionally has no portrait; project images remain in the case studies.

Empty contact values show a coming-soon state. They do not produce broken contact links.

The same file contains service options, customer problems, process steps, and projects. The included brands and case study results are labeled examples. Keep those labels for example content. Real case studies also require updating the concept-specific text in `src/app/work/[slug]/page.tsx` and its `opengraph-image.tsx`. The homepage omits demo statistics and sample testimonials.

The inquiry form shows four required fields. Website, company, and budgets are optional and expandable. A mobile contact button appears after the hero and hides when the contact section approaches the viewport.

The background combines a continuously drifting grid, burgundy glows, grid light trails, and floating particles. The grid moves one complete tile per cycle for a seamless loop and moves more slowly on mobile. On devices with a mouse, a soft glow follows the pointer. Touch devices keep the ambient effects, reduced-motion preferences disable animation, and background animations pause when the browser tab is hidden. The effects live in `src/components/site-background.tsx`, `src/components/background-spotlight.tsx`, and the background styles in `src/app/globals.css`.

Selected Work follows the hero and starts with the dashboard carousel. Below it, a live website gallery for Atheen, Next & Go, and Orakit shows three columns on desktop and stacked cards on mobile. Edit `featuredWebsites` in `src/data/portfolio.ts` to update those cards. Screenshots are stored locally in `public/images/projects/` (1200 × 1000), captured from the public homepages on October 7, 2026 using the Thum.io screenshot API. Visitors can enlarge the images, switch between projects with buttons or arrow keys, and visit each live store. The separate concept case study routes remain available.

The combined Services & Approach section sits at the bottom of the homepage, after Contact and directly above the footer. It brings common challenges, service options, and the process into one section. The `#problems` and `#process` anchors point to content inside `#services`. Selected Work includes a three-row infinite carousel of eight supplied Meta Ads, Google Ads, and Shopify results screenshots, scrolling in alternating directions. Images are stored in `public/images/results/`; update their paths, dimensions, and alt text in `src/components/dashboard-carousel.tsx` when replacing them. The rows complete each loop in 40, 46, and 53 seconds. Visitors can pause motion using the button; hovering over the images keeps the rows moving. Reduced-motion preferences show all eight screenshots in static grids, hiding the decorative duplicates used for continuous scrolling.

## Measure inquiries

`src/lib/analytics.ts` emits a `portfolio:conversion` browser event and pushes to `window.dataLayer` when a tag manager has already created it. Events include `cta_click` with its button placement, `form_start` once per inquiry, and `inquiry_success` after a successful API response. Form values and personal details are never included.

These are integration hooks, not an installed analytics provider. Connect your chosen analytics account or tag manager to collect them. Measure successful inquiries per visit and qualified inquiries over time; CTA clicks alone do not establish a conversion improvement.

## Configure the domain and contact delivery

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SITE_URL` to your full website origin without a trailing slash; it controls canonical URLs, the sitemap, and social metadata. Rebuild after changing it.

For inquiry delivery, configure either:

- **Resend:** `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, and `CONTACT_TO_EMAIL`. The sender must be approved in your Resend account.
- **Formspree:** `FORMSPREE_FORM_ID`.

If both providers are configured, the site uses Resend. Without a provider, the form validates inquiries and explains that delivery is unavailable; it never reports a sent message.

Optional request limiting uses `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` together, allowing five inquiries per IP per ten-minute window. Keep API keys and delivery configuration server-only.

## Check changes

```sh
npm run lint
npm run typecheck
npm run build
```

With the production server running on port 3000, run:

```sh
npx playwright install chromium
npm run test:e2e
```

The browser checks cover desktop and mobile layouts, keyboard navigation, accessibility, form validation, case study metadata, and contact API failures. Run the default suite without delivery credentials: it checks the disconnected form state and does not send an actual inquiry. Screenshots are saved under `artifacts/`; failures include traces under `test-results/`.

