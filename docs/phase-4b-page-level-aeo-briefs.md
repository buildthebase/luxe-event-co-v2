# Phase 4B.12 — Page-Level AEO Briefs

Date: July 26, 2026  
Status: Complete internal brief set; no public-page additions

## Canonical source

The complete structured briefs are maintained in
`app/aeo-page-briefs.ts`. Every record identifies:

- primary ICPs;
- primary and secondary question themes;
- search intent;
- required answers;
- required first-party evidence;
- required internal links;
- recommended content formats;
- questions that must not be duplicated;
- questions that should move to FAQ; and
- future resources with an explicit evidence gate.

The briefs cover all 16 permanent indexable pages. Events, Gallery, and Inquire
were added to the 13-page minimum because they own event selection,
first-party proof, and booking preparation.

## Page ownership summary

| Page | Primary ICP | Primary answer role | Shared questions moved to FAQ | Future resource gate |
|---|---|---|---|---|
| Home | All ICPs | Parent identity, divisions, market, event pathways | Pricing, service area, setup, utilities, weather | Permissioned cross-division case study |
| Experiences | All ICPs | Division comparison and coordinated-provider decision | Shared pricing, travel, and setup | Permissioned coordinated event |
| Coffee Bar | Wedding, corporate, brand/agency, partners | Mobile coffee discovery, formats, menus, inclusions, comparisons, coffee pricing | Throughput, staffing, utilities, travel, weather | Approved operating specification |
| Sweet Cart | Wedding, private, corporate, brand/agency | Dessert discovery, preparation, formats, menu, customization, dessert pricing | Travel, utilities, weather, booking | Approved quantity and throughput model |
| Seating Rentals | Wedding, corporate, private, partners | Inventory boundaries, styling, layout, delivery/setup comparison, rental pricing | Shared travel, venue, weather, booking | Approved inventory and rental policies |
| Events | All ICPs | Occasion selection, combined setup, station flow | Shared price, travel, staffing, setup | Permissioned decision examples |
| Weddings | Wedding clients and partners | Wedding timing, cocktail hour, combinations, venue coordination | Price, payment, staffing, utilities, travel | Permissioned real timelines |
| Corporate Events | Corporate, brand/agency, partners | Corporate planning, appreciation, scale, procurement, insurance | Shared booking, travel, utilities, setup | Approved recurring/multi-day model |
| Brand Activations | Brand/agency, corporate, partners | Activation definition, branding surfaces, assets, approvals, production | Shared travel, utilities, setup, payment | Approved workflow and case studies |
| Baby Showers | Private clients and partners | Service fit, setting, personalization, indoor/outdoor planning | Pricing, venue, weather, travel, payment | Several permissioned shower examples |
| Bridal Showers | Wedding/private clients and partners | Dessert selection, café hospitality, cohesive setting | Pricing, venue, setup, travel, payment | Several permissioned format examples |
| Birthdays | Private clients and partners | Milestone fit, personalization, live dessert, flexible setting | Pricing, travel, setup, payment | Varied permissioned milestone examples |
| Private Events | Private clients and partners | Flexible occasion fit, outdoor rentals, host planning | Weather, utilities, travel, setup, payment | Approved outdoor policy and examples |
| Gallery | All ICPs | Permissioned visual proof and first-hand context | Policies and operational limits | Fully permissioned case studies |
| FAQ | All ICPs | Shared booking, pricing, local, logistics, policy, and customization answers | None; FAQ is the destination | Approved technical and rental specifications |
| Inquire | All ICPs | Booking preparation and accurate platform handoff | All unresolved shared policies | None; resource content belongs elsewhere |

## Duplication model

- Home and hubs summarize; they do not reproduce service or event answers.
- Service pages own service discovery, inclusions, menus, service comparisons,
  and service-specific pricing factors.
- Event pages own occasion timing, fit, combinations, and planning decisions.
- Brand Activations owns the complete branding-production answer.
- Gallery owns permissioned proof, not service instructions.
- FAQ owns shared booking, pricing, service-area, travel, utility, access,
  weather, and policy answers.
- Inquire collects context after the substantive answer has been provided.

## Resource threshold

A future guide, catalogue, case study, or technical resource remains
unauthorized until the evidence gate in its page brief is satisfied. A future
resource must solve a distinct searcher need; it cannot restate a conversion
page at greater length.

## Implementation boundary

This step creates internal editorial controls only. It adds no public copy,
route, FAQ entry, schema type, testimonial, case study, or hidden AEO markup.
