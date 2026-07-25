# Phase 3.2 Central Site Configuration

## Decision

Step 3.2 is implemented as a focused consolidation, not an architectural
rebuild. `app/site-config.ts` is the authoritative source for stable
organization facts and external integration settings. Division records remain
in the same module through the typed `experiences` export.

## Confirmed Configuration

- Legal organization name: Luxe Event Co.
- Public organization name: Luxe Event Co.
- Primary domain: luxeeventco.ca.
- Canonical base URL: https://luxeeventco.ca.
- Public inquiry email: bookings@luxeeventco.ca.
- Public telephone: +1 647-869-1352.
- Division names, URLs, and Instagram profiles.
- Approved service areas and Southern Ontario extension wording.
- Favicon, organization-image, Google-thumbnail, and social-image paths.
- Default site title and description.

These facts are sourced from the client intake, master specification, and
subsequent approved corrections.

## Pending Configuration

The following values remain explicitly unconfigured:

- Google Search Console verification token.
- Analytics provider and measurement identifier.
- Third-party inquiry platform name and URL.

No placeholder token, tracking script, or external inquiry destination is
invented. Each pending setting has a typed `null` value and status in
`siteConfig`, allowing the approved value to be added in one location later.

## Consumer Rules

1. Production code must import organization facts from `site-config.ts`.
2. Metadata and manifest assets must use `siteConfig.brandAssets`.
3. Canonical, robots, sitemap, schema, and redirect destinations must derive
   from `siteConfig.url`.
4. Social links must use the central social-profile map or typed division
   records.
5. Telephone links use the normalized E.164 value; visible telephone text uses
   the configured display value.
6. The inquiry page falls back to the public inquiry email until the approved
   third-party URL is configured.
7. Static documentation and generated public files may mirror configuration,
   but production TypeScript must not establish a competing source of truth.
