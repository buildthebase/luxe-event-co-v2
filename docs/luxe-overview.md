# Luxe Event Co. Overview Contract

This document turns the approved Project Overview into an implementation contract for the Luxe Event Co. website. It is intentionally limited to the overview phase. Page-level copy, visual composition, photography, inquiry-platform integration, and domain redirects belong to later phases.

## Brand Model

Luxe Event Co. is the parent brand. The three divisions remain distinct experiences within the same coordinated event platform:

1. Luxe Coffee Bar: crafted coffee and warm hospitality.
2. Luxe Sweet Cart: elevated desserts and beautifully staged indulgence.
3. Luxe Seating Rentals: considered seating and room structure.

The site should make the relationship between the divisions obvious without flattening their individual identities. A visitor who arrives through any one division should be able to discover the other two naturally.

## Business Direction

The website is designed to attract and qualify clients who value presentation, service quality, customization, reliability, and the guest experience. It should position Luxe as an event experience company, not primarily as a cart rental company or a price-led provider.

Priority audiences include:

- Weddings and wedding planners.
- Corporate events and corporate buyers.
- Brand activations and marketing agencies.
- Venues and event partners.
- Baby showers, bridal showers, birthdays, and premium private events.

The site should communicate value before price, make multi-service bookings feel natural, and support both intimate and larger events.

## Permanent Route Contract

The preferred host is `https://luxeeventco.ca`. Routes use lowercase hyphenated paths, no query-string versions of primary pages, and one consistent trailing-slash policy. The current policy is no trailing slash except for the root path.

| Area | Path |
| --- | --- |
| Home | `/` |
| Experiences hub | `/experiences` |
| Coffee Bar | `/experiences/coffee-bar` |
| Sweet Cart | `/experiences/sweet-cart` |
| Seating Rentals | `/experiences/seating-rentals` |
| Events hub | `/events` |
| Weddings | `/events/weddings` |
| Corporate Events | `/events/corporate-events` |
| Brand Activations | `/events/brand-activations` |
| Baby Showers | `/events/baby-showers` |
| Bridal Showers | `/events/bridal-showers` |
| Birthdays | `/events/birthdays` |
| Private Events | `/events/private-events` |
| Gallery | `/gallery` |
| FAQ | `/faq` |
| Inquire / Contact | `/inquire` |

Only these Luxe Event Co. routes should be intentionally indexed in the primary sitemap. Duplicate or temporary routes should not be introduced.

## Journey Contracts

### Experience-led

`Home -> Experiences -> Division -> Relevant event applications -> Complementary experiences -> Inquire`

### Event-led

`Home -> Events -> Event context -> Recommended experiences -> Proof and inspiration -> Inquire`

### Multi-service

`Experience or event page -> Relevant combination -> Gallery proof -> Multi-service inquiry`

### Wedding

`Home or search result -> Weddings -> Coffee, desserts, seating -> Wedding proof -> Suggested combinations -> Planning information -> Inquire`

### Corporate

`Home or search result -> Corporate Events or Brand Activations -> Capabilities -> Custom branding -> Scale and logistics -> Proof -> Inquire`

### Gallery-led

`Gallery -> Filter by event or experience -> Related page -> Inquire`

Every indexable page must provide a clear next step, and experience/detail pages must expose at least one path to a complementary Luxe experience.

## Inquiry Boundary

The website owns the explanation, qualification, context, CTA, handoff, tracking, fallback contact options, and any permitted return/confirmation page.

The third-party inquiry platform owns form construction, conditional questions, submissions, lead storage, confirmations, quotes, packages, agreements, deposits, payments, reminders, CRM, post-event follow-up, reviews, and internal notifications.

The site must not recreate those third-party functions without a later explicit scope decision.

## Inputs Required Before Implementation

These details are intentionally not invented in the overview phase:

- The production inquiry-platform URL and any return/confirmation URL.
- Preferred fallback email address and phone number.
- Minimum booking requirements and service-area boundaries.
- Verified service capacities, guest-count ranges, and logistics.
- Confirmed domain ownership and redirect access for the three service-specific domains.
- Approved photography and gallery taxonomy.

## Overview Completion Criteria

The overview foundation is complete when:

- The parent-brand relationship is reflected in the content and route model.
- All 16 permanent routes are represented without duplicate primary paths.
- Experience-led, event-led, multi-service, wedding, corporate, and gallery-led journeys are accounted for.
- The website/third-party responsibility boundary is explicit.
- Unknown business inputs are recorded rather than guessed.

## Step 1.1 Parent-Brand Architecture

The parent entity is represented by `siteConfig` and the shared `SiteShell`. The three divisions are modeled as first-class `Division` records rather than generic categories. Each record has a stable landing path and dedicated slots for:

- Service description and inclusions.
- Customization information.
- Event applications.
- Relevant FAQs.
- Search targets.
- Gallery items and alt text.
- Division-specific inquiry CTA.
- Complementary division links.

Empty slots remain explicit until approved business information, photography, and contact details are supplied. The implementation must not fill them with invented claims.

The global structured data identifies Luxe Event Co. as the `Organization` and each division as a linked `Service` whose provider is the parent organization. Division landing pages, navigation, footer, canonical metadata, and future contact details must continue to use the parent entity as the primary relationship.

## Step 1.2 Audience Segments

Audience requirements are modeled separately from division content so pages do not default to one generic service message. The current audience model contains four primary groups:

1. Wedding clients: couples, planners, venues, coordinators, and family members assisting with planning.
2. Corporate clients: office managers, executive assistants, HR teams, event and conference organizers, procurement teams, developers, institutions, universities, and client-experience teams.
3. Brand activation clients: agencies, experiential teams, retail and luxury brands, product launches, PR agencies, and campaign teams.
4. Premium private-event clients: shower, birthday, engagement, anniversary, milestone, planner, and decorator audiences.

Each audience record defines its concerns, content requirements, proof requirements, relevant experiences, relevant event paths, primary CTA, secondary CTA, and inquiry context. Event records point back to the audience records they serve. This allows a future page to assemble audience-appropriate content and conversion paths without copying generic service copy across every route.

The model does not claim proof, capacity, minimums, pricing, or logistics that have not yet been supplied. Those fields remain content-phase inputs.

## Step 1.3 Page-Level Search Intent

The page-to-intent registry is stored in `app/search-intent.ts`. Every primary route has one unique strategic primary search purpose and a controlled list of supporting topics. All entries are marked `strategic-draft`.

These phrases must not be copied directly into final titles, descriptions, headings, or page copy until they are validated against:

- Current search-result analysis.
- Competitor review.
- Google Search Console data when available.
- Google Business Profile insights.
- Keyword research.

The primary-intent uniqueness check is part of the registry contract. Supporting topics are directional coverage areas, not a mandate to repeat keywords unnaturally.

## Step 1.5 Topic And Entity Map

The formal relationship map is stored in `app/topic-entity-map.ts`. It connects:

- Luxe Event Co. as the parent organization.
- Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals as first-class divisions.
- Confirmed core services, including the Café Cart Experience, Signature Coffee Bar Experience, espresso, matcha, seasonal beverages, desserts, rentals, setup and teardown, branding, signage, lighting, and multi-service packages.
- The approved indexable event routes plus non-indexable contextual applications such as grand openings, conferences, product launches, employee appreciation, client appreciation, trade shows, holiday parties, engagements, anniversaries, and graduations.
- Toronto, the Greater Toronto Area, every approved named municipal/location context, and Southern Ontario as a distinct destination-event context for select larger events.

The map deliberately distinguishes approved indexable routes from contextual topics. It can therefore support page copy, internal linking, structured data, FAQs, image captions, metadata, future resources, and local-search expansion without automatically creating duplicate pages or implying that every topic is independently indexable.

## Step 1.6 Content Differentiation Requirements

The page-level content differentiation model is stored in `app/content-differentiation.ts`. It defines the factual and first-hand content each page must eventually contain, rather than allowing generic luxury-event copy to be repeated across routes.

The requirements are classified as:

- **Confirmed:** supplied by the latest client intake or jointly established in the master specification and intake. Examples include Coffee Bar and Sweet Cart inclusions, capacities, three simultaneous setups, menu and dessert frameworks, service-area locations, booking policy, and `$5 million liability insurance`.
- **Deferred:** important operational information that Luxe has not yet supplied, including standard service windows, power and water, outdoor requirements, rental delivery/setup, and final Seating Rentals capacity/minimums.
- **Needs proof:** capabilities stated in the intake that require approved examples, permissions, or workflow detail before public publication, including named partnerships, corporate branding workflow, testimonials, and event photography.

Every one of the 16 approved routes has a content brief with a purpose, required requirements, proof priorities, and a do-not-invent list. This model will inform page copy, FAQs, metadata, structured data, image captions, internal links, and future content briefs.

### Google Search And Generative-AI Implications

Google's current guidance supports the same foundation described in this plan: helpful, reliable, people-first content; crawlable pages; clear internal links; important information in text; high-quality supporting media; and structured data that matches the visible page. Google also states that there are no special AI-only files, markup, or optimizations required for AI Overviews or AI Mode.

Sources:

- [Google: Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)

For Luxe, this means AEO/GEO work will be expressed through accurate first-hand service information, original event evidence, clear page relationships, useful answers, and technical accessibility. It will not be expressed through mass-produced location pages, invented operational details, or special AI markup.

## Step 1.7 Internal Linking Architecture

The internal linking contract is stored in `app/internal-linking.ts`. It defines page-level link plans for all 16 approved routes, including required destinations, minimum relationship counts, link purpose, contextual anchor text, and conversion paths.

The architecture requires:

- Home to introduce the parent journey and link to the Experiences hub, all three divisions, Events, priority event pages, Gallery, and Inquire.
- Experiences to link to all divisions, relevant event contexts, Gallery, and Inquire.
- Each division to link back to Experiences, both complementary divisions, at least three relevant event pages, Gallery, FAQ, and Inquire.
- Events to link to all approved event pages, all divisions, Gallery, and Inquire.
- Each event page to link to Events, relevant divisions, a related event where useful, Gallery, FAQ, and Inquire.
- Gallery image groups to link to their associated division or event page and Inquire.
- FAQ answers to link to the relevant service or event page and Inquire.
- Inquire to link back to Experiences, Events, FAQ, and confirmed contact methods.

The map distinguishes indexable route destinations from contextual relationships. It does not create a page for every city or every event application automatically.

Google's [internal link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) recommends crawlable `<a href>` links and concise, descriptive anchor text. Google's [sitelink guidance](https://developers.google.com/search/docs/appearance/sitelinks) also recommends a logical site structure, links to important pages from relevant pages, and avoiding repetitive anchors. The implementation will therefore use descriptive contextual phrases such as `Inquire about Luxe Coffee Bar`, `Corporate event experiences`, and `View the Luxe event gallery`, rather than generic `click here` or repeated `learn more` links.

## Step 1.8 Conversion Measurement

The provider-neutral measurement plan is stored in `app/conversion-measurement.ts`. It defines the event name, trigger, page scope, parameters, intended business interpretation, and source requirement for every required conversion signal.

The plan covers:

- Primary navigation, experience selectors, and event selectors.
- Coffee Bar, Sweet Cart, and Seating Rentals page views.
- Wedding, Corporate Events, and Brand Activations page views, plus the remaining event routes.
- Combined-experience selection.
- Gallery filters and gallery-item openings.
- Testimonial interactions where interactive proof exists.
- Inquiry starts and third-party inquiry handoffs.
- Phone, email, and Instagram clicks.
- Optional menu/PDF downloads.
- Optional confirmation returns from the third-party platform.

The recommended event names are preserved exactly: `experience_select`, `event_type_select`, `service_page_view`, `event_page_view`, `combined_experience_select`, `gallery_filter`, `gallery_item_open`, `inquiry_start`, `inquiry_handoff`, `phone_click`, `email_click`, and `social_click`. Supporting events are included for primary navigation, testimonials, optional downloads, and confirmation returns.

No analytics provider or tracking script is installed as part of this planning step. Provider selection, consent, retention, reporting, inquiry-platform handoff, and confirmation-return behavior must be approved before production tracking is enabled. Analytics parameters must not contain direct personal information or free-text inquiry content.

## Intake Reconciliation

The original Luxe Brands intake form, including the newly formatted client-provided version, is now available as a confirmed business-input source for the implementation foundation. It does not replace this overview contract or the strategic-draft search map. It resolves several inputs that were previously intentionally left unknown:

- Public contact email: `bookings@luxeeventco.ca`.
- Public phone: `+1 647 869 1352`.
- Primary service area: Toronto and the GTA, including Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, North York, Mississauga, Brampton, Oakville, Burlington, Milton, Ajax, Pickering, Whitby, Oshawa, Scarborough, and Etobicoke.
- Extended service: select destination events throughout Southern Ontario, with travel fees where applicable.
- Coffee capacity: up to 500 guests; Sweet Cart capacity: up to 400 guests; up to three simultaneous setups.
- Coffee minimum signal: approximately 30 guests, with service-specific minimums still requiring final policy copy.
- Typical booking value: `$900-$3,000+`, subject to guest count, duration, travel, and customization.
- Recommended notice: four days, with earlier booking recommended for weddings and peak-season dates.
- Peak periods: April-October, plus November-December corporate and holiday demand.
- Booking policy signal: 30% non-refundable retainer, balance due seven days before the event, and availability confirmed only after contract and retainer.
- Trust signal: `$5 million liability insurance`, to be highlighted as a major proof point where the relevant phase and page content call for operational confidence.
- Confirmed Coffee Bar, Sweet Cart, and rental offering families are represented as structured division data rather than generic catalogue categories.

The intake also confirms that the long-term customer journey should support `Choose Your Event -> Select Your Experiences -> Customize Your Event -> Receive Your Proposal -> Book Online`. The current site still owns only explanation, qualification, context, CTA, tracking, and handoff; the third-party inquiry and proposal platform remains intentionally unconnected until its URL and integration are approved.

Still deferred: the production inquiry URL, final rental capacities and minimums, exact service-area/travel-fee rules, permissions for corporate names and event photography, Google Business Profile details, and ownership/redirect status for service-specific domains.

The completed Phase 1 hard-pass is recorded in `docs/phase-1-audit.md`. It is the operational checklist for deciding whether Phase 2 can begin without silently treating deferred business inputs as approved facts.

The client has confirmed `$5 million liability insurance` as a significant selling point. It should be included in the Step 1.6 content-differentiation requirements, relevant FAQs, corporate and wedding proof requirements, inquiry reassurance, and any later service-page content where insurance is materially useful to the decision.
