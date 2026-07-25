# Step 4.16 — Core Web Vitals and Page Experience Handoff

## Outcome

The site now has an explicit Core Web Vitals and page-experience control layer covering loading, responsiveness, layout stability, mobile use, secure delivery, navigation, typography, content hierarchy, overlays, interaction integrity, and browser-history behaviour.

The implementation keeps the existing server-rendered architecture. It does not add a monitoring library, tag manager, consent banner, loading overlay, modal, or animation dependency.

## Implemented controls

- Current good Core Web Vitals targets are recorded as LCP at or below 2.5 seconds, INP at or below 200 milliseconds, and CLS at or below 0.1, evaluated at the 75th percentile and segmented by mobile and desktop.
- Only navigation, the Home cinematic sequence, and gallery filtering hydrate in the browser.
- The Home sequence bypasses autoplay choreography for reduced-motion, Save-Data, slow-2g, and 2g visitors and always offers a Skip intro control.
- Approved images use intrinsic dimensions, responsive `sizes`, deliberate loading priority, and stable media frames.
- The single font family uses its Latin subset, three approved weights, preload, and swap behaviour.
- Responsive viewport units use `svh`; global scrollbar space and browser text sizing are stabilized.
- Every permanent route retains a skip link, labelled primary navigation, one primary `main` landmark, and a separate footer.
- The mobile menu is a native, closed-by-default disclosure. It is visitor initiated, Escape dismissible, link dismissible, and therefore treated as navigation—not as a promotional interstitial.
- Automatic promotional overlays, content gates, deceptive controls, and browser Back interference are prohibited.
- Canonical HTTP and `www` requests normalize to the HTTPS origin. Canonical HTTPS responses add HSTS, MIME-sniffing protection, and a strict-origin referrer policy.
- Third-party scripts remain at zero until a provider, consent model, and performance impact are approved.

## Deliberate deviations and boundaries

1. **No “Core Web Vitals pass” is claimed yet.** LCP, INP, and CLS are field metrics. A successful build and source-level safeguards prevent known regressions but cannot prove the 75th-percentile experience of real visitors.
2. **No synthetic score is treated as a ranking target.** Lighthouse thresholds remain diagnostic quality controls. Google explicitly notes that good reports do not guarantee top rankings and that page experience extends beyond Core Web Vitals.
3. **No real-user monitoring script was added.** The analytics provider, collection endpoint, consent behaviour, retention rules, and JavaScript cost are not approved. Adding speculative telemetry would conflict with the current third-party and privacy boundary.
4. **Live HTTPS is not marked verified.** Redirect and response-header behaviour is implemented and testable in the production worker, but certificate delivery, redirect chains at the edge, mixed content, and Search Console's HTTPS report require the deployed canonical origin.
5. **The mobile navigation remains full-height when opened.** Removing it would reduce navigation usability. It is a user-requested disclosure with a clear close path, not an automatic or promotional interstitial.
6. **Final photography and hero film performance remains conditional.** Current placeholders and approved brand assets obey the delivery contracts. Each future photograph, poster, and video derivative still requires visual review and production transfer-size validation.
7. **Browser interaction and visual QA were not repeated in this step.** The existing route-wide responsive and accessibility contracts remain in force; this step adds source and rendered-output gates. Representative throttled and interaction traces belong at production closeout.

## Production closeout

Before launch:

1. Run mobile and desktop Lighthouse diagnostics on representative templates using a production build.
2. Inspect LCP discovery, request chains, font transfer, image selection, main-thread work, hydration, and layout shifts.
3. Exercise navigation, gallery filtering, FAQ disclosures, and Home Skip intro while recording interaction traces.
4. Validate the canonical host's certificate, HTTP-to-HTTPS and `www` redirects, HSTS header, mixed-content state, and Search Console HTTPS report.
5. Re-test with final approved photography, posters, videos, inquiry integration, analytics, and consent tooling.

After launch:

1. Monitor Search Console and PageSpeed Insights when enough Chrome UX Report traffic exists.
2. Evaluate LCP, INP, and CLS separately at the 75th percentile for mobile and desktop.
3. Add consent-compatible real-user monitoring only after its governance and performance cost are approved.
4. Investigate regressions by page template and LCP element rather than relying on one aggregate score.

