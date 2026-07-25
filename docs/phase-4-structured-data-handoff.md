# Step 4.12 — Structured Data Architecture Handoff

## Outcome

The site now emits one JSON-LD graph per rendered page. The complete identity graph
is published on Home, while internal pages reference its stable identifiers and add
only the entities that describe their visible content.

Stable identifiers:

- `https://luxeeventco.ca/#organization`
- `https://luxeeventco.ca/#website`
- `https://luxeeventco.ca/#coffee-bar-service`
- `https://luxeeventco.ca/#sweet-cart-service`
- `https://luxeeventco.ca/#seating-rentals-service`

The implementation is centralized in `app/schema-builders.ts`. Page types and
exclusions are documented in `app/schema-architecture.ts`.

## Template map

| Template | Structured-data model |
| --- | --- |
| Home | `Organization`, `WebSite`, `WebPage`, logo and primary `ImageObject` nodes, three division `Organization` nodes, and three stable `Service` nodes |
| Experiences hub | One `CollectionPage` + `WebPage` entity, `ItemList`, and `BreadcrumbList` |
| Experience detail | `Service`, `WebPage`, and `BreadcrumbList`; visible FAQs also receive `FAQPage` context |
| Events hub | One `CollectionPage` + `WebPage` entity, `ItemList`, and `BreadcrumbList` |
| Event-type detail | `Service`, `WebPage`, and `BreadcrumbList`; never `Event` |
| Gallery | One `CollectionPage` + `WebPage` entity, `BreadcrumbList`, and only approved `ImageObject` nodes |
| FAQ | One `FAQPage` + `WebPage` entity using the same 47 visible question-and-answer records, plus `BreadcrumbList` |
| Inquire | One `ContactPage` + `WebPage` entity and `BreadcrumbList` |

## Deliberate deviations from the generalized Step 4.12 plan

### LocalBusiness is omitted

The current source material does not confirm a legitimate public street address or
meaningful public opening hours. A service area is not used as a substitute for
those facts, and a residential address is not exposed. The existing `Organization`
model contains the accurate public telephone, email, URL, logo, and service area.
`LocalBusiness` should be reconsidered only after Luxe approves a public location
and the website and Google Business Profile can be kept consistent.

### The parent Organization has no sameAs values

The three available Instagram profiles identify the three divisions, not the
parent company. Each profile is therefore attached to its corresponding division
`Organization`. Treating all three as `sameAs` for the parent would blur entity
ownership.

### Service images are temporarily omitted

No approved representative service photography is currently published on the
experience pages. Decorative CSS artwork and social-sharing cards are not used as
evidence of a service. Add `image` only when approved, relevant photography is
visible on the corresponding page.

### WebPage subtypes are consolidated

`CollectionPage`, `FAQPage`, and `ContactPage` are WebPage subtypes. Each applicable
page therefore uses one entity with an `@type` array instead of contradictory or
duplicated page entities.

### The complete identity graph is Home-only

The former global graph repeated the complete organization, division, and service
model on every route. Home now owns that graph. Internal pages reuse its stable
`@id` values and emit only page-relevant nodes, reducing duplication and the risk
of inconsistent facts.

### Service and FAQ markup are contextual

`Service` is used for machine-readable meaning, not presented as a guaranteed
Google rich-result feature. `FAQPage` is retained only where visible questions and
answers exactly match the JSON-LD records; it is not presented as a rich-result
claim.

### Ratings, reviews, commerce, and Event markup remain excluded

The graphs contain no `AggregateRating`, self-serving `Review`, `Offer`, `Product`,
price, invented location, or `Event` entity. Event-type pages describe services
for kinds of occasions rather than dated public events.

## Integrity controls

`tests/structured-data-architecture.test.mjs` renders all 16 permanent routes and
checks:

- one parseable JSON-LD document and graph per template;
- canonical `https://luxeeventco.ca` identifiers and no duplicate top-level `@id`;
- the required stable organization, website, logo, division, and service entities;
- correct division ownership of Instagram profiles;
- absence of unsupported LocalBusiness, Event, commerce, rating, review, address,
  hours, and price claims;
- visible and JSON-LD breadcrumb label parity on every non-home route;
- the intended entity types for hubs, detail pages, Gallery, FAQ, and Inquire;
- provider references back to the stable Luxe organization;
- exact visible FAQ coverage and omission of unapproved service images.

The breadcrumb component and JSON-LD builder both use `app/navigation-config.ts`,
which prevents the visible and machine-readable trails from drifting apart.

## Production follow-up

After deployment, validate the rendered canonical production URLs rather than a
source-code sample:

1. Test representative URLs from every template in Schema.org Validator.
2. Test Google-supported features, especially Organization and Breadcrumb markup,
   in Rich Results Test.
3. Confirm the deployed HTML contains the same graph verified locally.
4. Monitor Search Console enhancement and structured-data reports where Google
   provides them.
5. Reconsider `LocalBusiness` only if a legitimate public location and matching
   business-profile facts are approved.
6. Add Gallery and Service `ImageObject` or `image` relationships only when the
   corresponding approved images are visibly published.

Live production-tool validation remains a launch task because this step intentionally
does not deploy or modify the production site.
