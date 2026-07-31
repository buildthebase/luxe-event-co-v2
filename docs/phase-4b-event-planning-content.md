# Phase 4B.6 — Event-Planning Content

Date: July 26, 2026  
Status: Implemented on existing event-page surfaces

## Content placement

| Planning question | Definitive page | Existing surface used |
|---|---|---|
| When should coffee be served at a wedding? | `/events/weddings` | FAQ |
| Is a coffee bar appropriate for cocktail hour? | `/events/weddings` | FAQ |
| Which desserts work well for bridal showers? | `/events/bridal-showers` | FAQ |
| How should coffee catering be planned for a corporate event? | `/events/corporate-events` | FAQ |
| What works well for employee appreciation? | `/events/corporate-events` | Application |
| What services work well for baby showers? | `/events/baby-showers` | FAQ |
| Which event rentals are required for outdoor events? | `/events/private-events` | FAQ |
| How should guest flow around a coffee or dessert station be managed? | `/events` | Event-led approach |
| Which services can be combined for a complete event setup? | `/events` | Event-led approach |

## Anti-bloat decisions

- No new route, resource article, or event-planning chapter was created.
- Existing FAQs and application copy were strengthened where they already owned
  the subject.
- One new FAQ was added on Weddings because cocktail-hour suitability is a
  separate decision from general wedding timing.
- The Events Hub owns the two cross-event answers so every event page does not
  repeat station-flow and combined-setup guidance.
- Answers stay short and lead into existing service or inquiry paths.

## Accuracy controls

- Wedding timing is presented as a set of possible windows, not a universal
  recommendation.
- Corporate planning names the inputs Luxe reviews without inventing staffing,
  utility, or duration values.
- Outdoor rentals are explicitly site- and event-dependent; no item is described
  as universally required.
- Station flow avoids an unsupported footprint, queue length, or throughput
  promise.
- Combined services remain independently selectable and are not presented as a
  fixed package.
