# Step 4.17 — JavaScript SEO Handoff

## Outcome

Every public route uses server rendering, and search-critical information is available in the initial HTTP HTML without waiting for hydration or interaction. Client JavaScript enhances three bounded systems—navigation, the Home cinematic sequence, and gallery filtering—but does not create the primary page content, metadata, canonical URL, structured data, or crawl paths.

## Implemented controls

- All 16 permanent routes return complete initial HTML with a unique title, meta description, index/follow directive, self-referencing canonical, H1, substantial visible content, crawlable links, and JSON-LD.
- Internal navigation and contextual routes use anchors with `href` values. No route discovery depends on click handlers, JavaScript URLs, or hash-fragment routing.
- FAQ answers remain in initial HTML inside native `details` elements.
- Gallery groups and filterable content are server rendered before client filtering.
- The Home hero's service meaning, title, description, and actions remain in initial HTML even though decorative choreography is enhanced after hydration.
- Production routes never begin with `noindex`, and client code is prohibited from adding, removing, or rewriting canonical and robots directives.
- `robots.txt` allows the fingerprinted JavaScript and CSS assets needed for rendering and hydration.
- Below-the-fold images use native `loading="lazy"` with a real `src`, alt text, intrinsic dimensions, and responsive selection in initial HTML. Loading is viewport-driven, not click-driven.
- Unknown URLs return a real HTTP 404 with visible server-rendered recovery content.
- Non-200 application responses receive a server-side `X-Robots-Tag: noindex` policy.
- If rendering fails before the application error boundary can respond, the worker returns a minimal script-free HTTP 500 recovery document.

## Deviation identified and corrected

The framework correctly returned HTTP 404 and visible not-found content, but the not-found component's metadata declaration was not present in the generated HTML. Rather than depend on JavaScript or assume future framework behaviour, the production response layer now applies a `noindex` HTTP header to every 4xx and 5xx response. The meaningful 404 status and recovery content remain the primary signals.

## Deliberate boundaries

1. **No dynamic rendering or crawler detection was added.** Google recommends server-side or static rendering over crawler-specific dynamic rendering. Visitors and crawlers receive the same HTML.
2. **No metadata is rewritten after hydration.** The initial HTML is authoritative.
3. **No critical text is lazy loaded.** Lazy loading is limited to eligible media. Content hidden visually by a disclosure or filter still exists in HTML.
4. **Search Console URL Inspection is not claimed complete.** It requires the deployed, verified canonical property and Google's live rendering infrastructure.
5. **Framework asset fetches are validated structurally, not against the undeployed CDN.** Live status, MIME type, caching, and rendering errors must be checked after deployment.
6. **The application error boundary remains interactive.** Its retry button requires JavaScript by design, while the worker-level 500 fallback guarantees that a true non-200 rendering failure still communicates status and recovery without JavaScript.

## Production URL Inspection matrix

After deployment, inspect at least:

- Home: `/`
- Hub: `/experiences`
- Service: `/experiences/coffee-bar`
- Event type: `/events/weddings`
- Gallery: `/gallery`
- FAQ: `/faq`
- Inquiry: `/inquire`
- Unknown URL: a temporary unlinked path expected to return 404

For each representative indexable URL, confirm:

1. URL is available to Google and indexing is allowed.
2. Crawled and rendered HTML contain the intended title, description, canonical, H1, primary copy, internal links, and JSON-LD.
3. Required CSS, JavaScript, font, image, and video poster resources load without robots blocking or response errors.
4. Lazy images expose their final `src` when visible in the rendered viewport.
5. The user-declared canonical matches the inspected URL.

For the temporary 404 URL, confirm the live response remains HTTP 404, visibly explains the missing page, and carries the server-side noindex directive.

