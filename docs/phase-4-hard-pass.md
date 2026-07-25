# Phase 4 hard-pass

Date: July 25, 2026

## Result

Phase 4 passes the local release-readiness gate.

The implementation has complete metadata, canonical, crawl-control, sitemap,
social-sharing, structured-data, internal-link, image, local-SEO, page-experience,
JavaScript-SEO, redirect, and brand-identity systems for all 16 approved routes.
The production build, 331 automated tests, ESLint, source-diff validation, and
rendered browser audit all pass.

This is a local implementation pass, not a claim that unconfigured external
accounts, DNS, SSL, production redirects, social crawlers, Search Console, Bing
Webmaster Tools, or field Core Web Vitals have been verified.

## Indexable route and metadata map

The source of truth is `app/metadata-config.ts`. Every route below emits its title,
description, self-referencing canonical, Open Graph URL, Open Graph site name,
Open Graph image, and Twitter large-image card in initial HTML.

| Route | Title | Description |
| --- | --- | --- |
| `/` | Luxury Event Experiences in Toronto \| Luxe Event Co. | Discover how Luxe Event Co. combines mobile coffee, live dessert, and considered rentals for weddings, corporate events, and celebrations across Toronto and the GTA. |
| `/experiences` | Coffee, Dessert & Seating Experiences \| Luxe Event Co. | Compare Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals, then choose one experience or coordinate all three for an event in Toronto and the GTA. |
| `/experiences/coffee-bar` | Mobile Coffee Bar in Toronto \| Luxe Coffee Bar | Bring a complete mobile café to Toronto and GTA events with baristas, handcrafted coffee and matcha, two service formats, and tailored presentation. |
| `/experiences/sweet-cart` | Dessert Cart Experiences in Toronto \| Luxe Sweet Cart | Create a live dessert moment at Toronto and GTA events with mini pancakes, waffles, donuts, toppings, and a cart styled around the occasion. |
| `/experiences/seating-rentals` | Event & Seating Rentals in Toronto \| Luxe Seating Rentals | Explore chairs, tables, tents, linens, and lighting for Toronto and GTA events, with clear guidance on layouts, quote requirements, delivery, and setup. |
| `/events` | Event Experiences by Occasion \| Luxe Event Co. | Start with the occasion, then find the right mix of Luxe coffee, live dessert, and rentals for weddings, business events, showers, and private celebrations. |
| `/events/weddings` | Wedding Coffee, Dessert & Rentals \| Luxe Event Co. | See where coffee, live dessert, and considered rentals can support a Toronto or GTA wedding, from cocktail hour through the late-night celebration. |
| `/events/corporate-events` | Corporate Coffee & Event Experiences \| Luxe Event Co. | Plan scalable coffee, matcha, dessert, and rental support for Toronto and GTA office events, conferences, client hospitality, and recurring programs. |
| `/events/brand-activations` | Branded Coffee Carts & Activations \| Luxe Event Co. | Turn coffee, matcha, dessert, cups, signage, and cart styling into a cohesive branded activation for launches and campaigns in Toronto and the GTA. |
| `/events/baby-showers` | Baby Shower Coffee, Dessert & Rentals \| Luxe Event Co. | Shape a Toronto or GTA baby shower with coffee, matcha, live dessert, signage, and considered rentals, with indoor and outdoor planning guidance. |
| `/events/bridal-showers` | Bridal Shower Coffee, Dessert & Rentals \| Luxe Event Co. | Create a polished Toronto or GTA bridal shower with café-style drinks, live dessert, signage, florals, and rentals planned as one cohesive setting. |
| `/events/birthdays` | Birthday Dessert & Coffee Experiences \| Luxe Event Co. | Plan a personalized Toronto or GTA birthday with coffee, non-coffee drinks, live dessert, custom signage, and rentals for milestone or family celebrations. |
| `/events/private-events` | Private Event Coffee, Dessert & Rentals \| Luxe Event Co. | Explore coffee, live dessert, signage, and rentals for Toronto and GTA engagements, anniversaries, graduations, holidays, and other private events. |
| `/gallery` | Event Experience Gallery \| Luxe Event Co. | View Luxe Event Co. coffee, dessert, and rental work, grouped by the weddings, activations, celebrations, and guest moments each experience served. |
| `/faq` | Event Planning & Booking FAQs \| Luxe Event Co. | Get clear answers about Luxe Event Co. booking, retainers, travel, setup, menus, customization, service capacity, and rental planning before you inquire. |
| `/inquire` | Plan Your Event Experience \| Luxe Event Co. | Prepare a Luxe Event Co. inquiry with your date, venue, guest count, service needs, and event context before continuing to the booking platform. |

All 16 titles are unique. All 16 descriptions are unique.

## Deliverable coverage

| Deliverable | Result | Implementation or evidence |
| --- | --- | --- |
| Metadata map, titles, descriptions, canonicals | Pass | `app/metadata-config.ts`; initial-HTML tests for all routes |
| Robots controls | Pass locally | `app/robots.ts`; production allow rules; non-production and error-response `X-Robots-Tag` protections in `worker/index.ts` |
| XML sitemap | Pass locally | `app/sitemap.ts`; exactly the 16 canonical route URLs; redirect domains excluded |
| Google and Bing verification configuration | Ready, awaiting tokens | Conditional metadata wiring in `app/layout.tsx`; token fields remain `null` in `app/site-config.ts` |
| Open Graph metadata and social images | Pass locally | Seven distinct 1200×630 strategic PNG cards plus route fallback mapping; rendered metadata and direct visual review passed |
| Organization, WebSite, WebPage, logo, division, and service schema | Pass locally | Connected Home graph and stable IDs in `app/schema-builders.ts` |
| LocalBusiness schema | Correctly omitted | No approved public address and matching local-business profile model; omission is documented in `app/schema-architecture.ts` |
| CollectionPage and ItemList schema | Pass locally | Experiences and Events hubs; Gallery uses CollectionPage without inventing image evidence |
| Breadcrumb schema | Pass locally | Visible and JSON-LD breadcrumbs match on all 15 non-home pages |
| ContactPage schema | Pass locally | `/inquire` |
| FAQ schema | Pass locally with documented limitation | Only visible answers are marked up; no rich-result promise |
| Internal links and orphan prevention | Pass locally | Every route is reachable through crawlable anchors; automated graph checks pass |
| Image alt text and filename review | Pass locally | Meaningful assets have contextual alternatives; repeated trust logos are intentionally decorative beside visible organization names; public filenames are descriptive lowercase kebab-case |
| Local SEO consistency | Pass locally | One public name, phone, email, canonical site, service-area model, and division model are reused from `app/site-config.ts` |
| Core Web Vitals and page experience | Pass implementation gate | Server rendering, reserved geometry, responsive image rules, font strategy, reduced motion, limited client boundaries, no intrusive promotional overlay, no history manipulation |
| JavaScript SEO | Pass locally | Critical content, metadata, canonicals, links, and schema are present in initial HTML; 4xx/5xx status handling is server-side |
| Domain redirects | Pass implementation gate | One-hop 301 logic for protocol, `www`, path normalization, and three service domains in `worker/index.ts` |
| Site name, favicon, and brand identity | Pass locally | `WebSite` name signals, `og:site_name`, application name, favicon, Apple touch icon, and high-resolution organization logo are consistent |

## Acceptance-criteria evidence

- Build: pass.
- Automated tests: 331 passed, 0 failed.
- ESLint: pass.
- `git diff --check`: pass.
- Browser routes: all 16 audited at 390×844 and 1440×900.
- Browser errors: 0 across both route sweeps.
- Horizontal overflow: 0 routes at both tested sizes.
- Broken rendered images: 0 routes at both tested sizes.
- H1 and main landmarks: exactly one of each on every route.
- Breadcrumbs: visible on every non-home route.
- JSON-LD: parsed successfully on every route; no invalid script blocks.
- Schema restrictions: no `AggregateRating`, self-serving `Review`, or event-page
  `Event` entities.
- Social cards: all seven strategic files are 1200×630 sRGB PNGs and passed visual
  review.
- `llms.txt`: optional discovery content only; no page, route, canonical, schema,
  or navigation behavior depends on it.

## Launch conditions and production-only checks

These items cannot be honestly hard-passed from the local repository:

1. Add the real Google Search Console and Bing Webmaster Tools verification tokens,
   verify ownership, and submit the canonical sitemap in both services.
2. Confirm the production project is attached to the apex, `www`, and all three
   service domains; confirm SSL is valid on every source domain; then test each
   redirect from the public internet.
3. Test representative deployed URLs in Search Console URL Inspection and a
   rendered structured-data validator.
4. Run live social-sharing debuggers after deployment so platform-specific caches
   and public image retrieval are verified.
5. Measure production field Core Web Vitals. Local implementation demonstrates
   progress toward good thresholds but cannot establish real-user LCP, INP, or CLS.
6. Reconcile the approved website identity with the live Google Business Profile,
   social profiles, directories, and corporate materials. Add UTM-tagged GBP links
   only when that profile and measurement convention are confirmed.

Do not add `LocalBusiness`, a public address, ratings, prices, opening hours, or
offers merely to make a validator appear more complete.
