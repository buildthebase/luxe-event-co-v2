# Phase 3.1 Application Architecture

## Decision

The existing Next.js App Router architecture is retained. The permanent URL
structure already matches the approved sitemap, while dynamic experience and
event routes avoid duplicating route plumbing.

The recommended top-level `components/`, `content/`, and `lib/` folders are not
introduced solely for cosmetic conformity. Their responsibilities already exist
within `app/components`, route-adjacent typed content modules, and centralized
technical modules. Moving them would create broad import churn without changing
runtime behavior or editorial workflow.

## Current Responsibility Map

- `app/page.tsx`: Home route composition.
- `app/experiences/page.tsx`: Experiences collection route.
- `app/experiences/[slug]/page.tsx`: Three permanent experience routes.
- `app/events/page.tsx`: Events collection route.
- `app/events/[slug]/page.tsx`: Seven permanent event routes.
- `app/gallery`, `app/faq`, `app/inquire`: Supporting permanent routes.
- `app/components`: Reusable layout, navigation, hero, signature, gallery,
  trust, inquiry, and page-template components.
- Route-adjacent `*-content.ts` modules: Visible, typed editorial content.
- `app/site-config.ts`: Organization, contact, service-area, division, event,
  and route configuration.
- `app/metadata-config.ts`: Typed metadata registry and metadata generation.
- `app/schema-builders.ts`: Shared schema identifiers and repeated schema
  generation.
- `app/schema-architecture.ts`: Route-by-route schema governance.
- `app/components/json-ld.tsx`: Consistent safe JSON-LD serialization.
- `app/conversion-measurement.ts`: Analytics event contract.
- `app/inquiry-boundary.ts`: Third-party inquiry boundary.

## Architectural Rules

1. Permanent URLs come from `site-config.ts`; route code must not invent URLs.
2. Organization and contact facts come from `site-config.ts`.
3. Metadata comes from `metadata-config.ts`.
4. Repeated schema structures use `schema-builders.ts`.
5. Visible editorial content remains separate from technical configuration.
6. Reusable components stay in `app/components`; route files compose them.
7. Dynamic route slugs are validated against typed configuration and call
   `notFound()` for anything outside the permanent URL map.
8. The third-party inquiry platform remains a handoff, not the site's content
   or organization authority.

## Deferred Decisions

- Final inquiry URL remains intentionally unconfigured.
- Final media and gallery assets remain dependent on approved client assets.
- A future CMS may replace route-adjacent content modules without changing URLs.
- A top-level folder migration should occur only if the application grows beyond
  the current single-site boundary or a CMS integration makes it materially useful.
