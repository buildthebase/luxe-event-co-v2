# Phase 4.9 Crawling and Indexing Handoff

## Implemented locally

- Production `robots.txt` allows crawling and references the canonical sitemap.
- The XML sitemap contains the 16 approved canonical production routes only.
- Sitemap entries omit `lastmod` until a reliable meaningful-change source exists.
- Every sitemap URL is expected to return `200`, remain indexable, and self-canonicalize.
- Production pages use `index, follow` directives with unrestricted snippet previews.
- Unknown hosted domains receive an `X-Robots-Tag` noindex directive and a restrictive
  non-production `robots.txt`.
- Google and Bing HTML verification token fields are centralized but intentionally
  empty until real ownership values are supplied.
- Redirect domains, preview URLs, third-party inquiry destinations, query URLs,
  redirects, and missing routes are excluded from the sitemap.

## Human tasks required before and after launch

1. Connect and validate `luxeeventco.ca` as the production custom domain.
2. Keep every preview or staging deployment owner-only or password-protected.
   Code-level noindex protection is defense in depth, not a replacement for access control.
3. Create a Google Search Console Domain property for `luxeeventco.ca` and complete
   DNS ownership verification. If HTML-tag verification is used instead, supply only
   the token value for the centralized Google verification field.
4. Add the site in Bing Webmaster Tools. Importing the verified Search Console
   property is preferred; otherwise complete DNS or meta-tag verification and supply
   the Bing `msvalidate.01` token if that method is selected.
5. After the public production release, submit
   `https://luxeeventco.ca/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
6. In Google URL Inspection, run a live test for Home, Experiences, Coffee Bar,
   Events, Weddings, Gallery, FAQ, and Inquire. Confirm crawl allowed, index allowed,
   user-declared canonical, Google-selected canonical, rendered content, and mobile access.
7. Run a production crawl using a technical crawler such as Screaming Frog or Sitebulb,
   plus Bing Webmaster Tools Site Scan. Confirm the 16 sitemap routes return `200`,
   are indexable, self-canonical, internally linked, and free of redirect or missing-page
   sitemap entries.
8. Review the live CDN, firewall, access controls, and bot protection. Production must
   not challenge or block verified Googlebot or Bingbot; previews must remain private.
   Confirm this from crawler tests and hosting/security logs rather than user-agent
   spoofing alone.
9. Record the verification dates, sitemap submission dates, inspection results,
   crawl export, and any exclusions for the final Phase 4 hard pass.
