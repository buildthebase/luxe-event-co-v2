# Events Hub Blueprint

Status: Implemented locally for review. Not approved for commit or production release.

## Governing Sources

This page is governed by:

- The Luxe Event Co. master specification.
- The complete client-submitted Luxe Event Co. intake.
- The approved Phase 1 page contract, search intent, internal-linking, entity, conversion, and content-differentiation plans.
- The approved Phase 2 visual system, signature elements, Home blueprint, and Experiences Hub blueprint.

## Purpose And Conversion

The Events Hub helps visitors begin with what they are planning rather than a predefined service. The primary CTA is **Find Your Event Experience**. It moves visitors to the visible event pathways before the final inquiry panel prepares the operational handoff.

## Content Architecture

The page includes:

1. An occasion-first Events hero.
2. A concise explanation of Luxe's event-led approach.
3. Dedicated visible pathways for Weddings, Corporate Events, Brand Activations, Baby Showers, Bridal Showers, Birthdays, and Private Events.
4. Curated combined-event examples that remain planning directions rather than fixed packages.
5. A featured-gallery preview reserved for permission-cleared real-event photography or video.
6. The approved explanatory planning pathway.
7. An event-specific final inquiry panel.

## Differentiation And Content Boundaries

- Event pages are introduced through audience, atmosphere, schedule, and guest-flow context.
- Weddings and corporate events receive priority visibility in line with the client intake.
- Brand Activations address campaign, audience, presentation, and branded details.
- Private celebrations remain premium and personal without being positioned as budget party packages.
- Recommendations are not represented as fixed packages, prices, guaranteed availability, or universal operational promises.
- Gallery placeholders do not imply that unapproved photography already exists.

## Search And AEO

- The unique primary intent remains **Event services Toronto**.
- Visible copy identifies all seven indexable event pathways and all three Luxe divisions.
- Toronto and GTA context appears naturally in the hero and metadata.
- The page answers how Luxe approaches events, whether one or several experiences can be selected, and how each experience may support different occasions.
- Crawlable links connect every event page, every experience page, Gallery, FAQ through the planning pathway, and Inquire.

## Schema

The visible event pathways are represented by:

- `CollectionPage`.
- `WebPage`.
- `ItemList` with seven ordered `ListItem` entries.
- `BreadcrumbList`.

No `Event` schema is used because this page describes event-service applications rather than a specific public event with a date and location.

## Responsive Behaviour

- Desktop uses an asymmetric editorial hero, a horizontal approach sequence, and broad event rows.
- Mid-width layouts recompose the event rows before copy becomes compressed.
- Mobile uses one full-width event pathway at a time and preserves every CTA as a real link.
- Heading scale, spacing, and gallery placeholders remain fluid without horizontal overflow.
