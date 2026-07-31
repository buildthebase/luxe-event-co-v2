# Phase 4B.5 — Service-Discovery Content

Date: July 26, 2026  
Status: Implemented in existing page surfaces

## Implementation decision

The nine discovery questions were added to existing overviews, event-fit
content, or FAQs. No standalone discovery section, resource article, or new
route was created.

Each answer has one definitive page:

| Definitive page | Questions answered | Existing surface used |
|---|---|---|
| `/experiences` | Can all three services be coordinated through one provider? | Existing booking-clarity definition list |
| `/experiences/coffee-bar` | What is a mobile coffee bar? How does mobile espresso catering work? Which events suit it? | Existing overview and event-fit section |
| `/experiences/sweet-cart` | What is dessert-cart catering? How is it different from a dessert table? How does on-site preparation work? | Existing positioning, dessert-process section, and one matching FAQ |
| `/experiences/seating-rentals` | What is included with event-rental service? | Existing rental FAQ, replacing the narrower inventory-only question |
| `/events/brand-activations` | What is a branded coffee-cart activation? | Existing activation overview |

## Content controls

- Definitions use plain language before brand positioning.
- Answers describe the service mechanics without publishing unverified
  throughput, staffing, space, utility, timing, or rental-policy claims.
- Event suitability is tied to schedule and guest flow rather than claiming
  universal fit.
- Dessert-cart and dessert-table language explains the service distinction
  without diminishing another vendor format.
- Rental inclusions clearly separate confirmed categories from proposal-defined
  delivery, placement, setup, takedown, and pickup.
- The Experiences Hub owns the complete one-provider coordination answer;
  division pages may mention combinations without reproducing it.

## Schema treatment

The Coffee Bar and Sweet Cart pages already emit FAQ schema only for their
visible FAQ items. The new Sweet Cart comparison question is visible and
therefore remains eligible for exact FAQPage representation under the existing
implementation.

The Experiences Hub, Seating Rentals, and Brand Activations answers were not
given new FAQ schema merely because they use answer-oriented language.

