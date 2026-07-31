# Phase 4B.20 — AEO Measurement Framework

Date: July 27, 2026  
Status: Measurement contract and implementation hooks complete; production data
sources remain pending

## Outcome

The framework covers all 18 requested measurements across search visibility,
landing-page performance, on-page answer engagement, inquiry progression,
sales-question discovery, identifiable AI referrals, and branded demand.

It does not install an analytics script. The provider, property, consent
behaviour, retention settings, engaged-view definition, attribution window, and
inquiry-platform integration are not approved. Installing a tracker now would
create an unsupported privacy and performance assumption.

## Source responsibilities

| Source | Primary responsibility |
| --- | --- |
| Google Search Console | Google queries, impressions, clicks, CTR, landing pages, position context, and image-search performance |
| Bing Webmaster Tools | Bing query, page, and visibility trends |
| Approved web analytics | Comparison and logistics engagement, landing-page inquiry starts and handoffs, and identifiable referrals |
| Approved inquiry platform | Reliable handoff or completion context where supported and approved |
| Sales question log | Anonymized new question themes from inquiry and quote conversations |
| Google Business Profile | Supporting branded and local visibility context where available |

Search Console and Bing verification must be completed before their exports can
be used. Query classifications may overlap: a query can be non-branded, local,
commercial, comparison-oriented, and long-tail at the same time.

## On-site readiness

The conversion contract now includes:

- `comparison_section_engagement`; and
- `logistics_section_engagement`.

Stable measurement hooks identify the Experiences comparison, Coffee Bar
service planning, Sweet Cart operations, Weddings coordination, and shared FAQ
logistics sections. No collection runtime is active. The hooks are inert until
an approved consent-aware analytics implementation reads them.

Inquiry starts and handoffs remain separate events. Reporting must preserve the
first canonical landing page and current CTA source path without attaching
names, email addresses, phone numbers, dates, or inquiry text.

## Reporting cadence

- Monthly: export search performance, classify new queries, review landing
  pages, and reconcile anonymized sales-question themes.
- Quarterly: review service and event visibility, image search, section
  engagement, inquiry progression, branded demand, and evidence gaps together.
- After a material page change: annotate the change and wait for enough
  comparable data before judging it.

No fixed performance target is invented before a baseline exists. CTR must be
interpreted with query intent, average position, device, and search type rather
than compared as one site-wide number.

## Existing-page-first decision rule

For every finding:

1. assign it to the definitive existing page;
2. diagnose whether the issue is presentation, directness, evidence,
   operational confirmation, internal linking, or inquiry continuity;
3. improve the smallest useful element;
4. annotate and measure the change; and
5. create a new page only when the intent is materially distinct, repeatedly
   evidenced, cannot be served without diluting the current page, and has enough
   original evidence for a useful standalone resource.

This prevents query reports from becoming a route-generation system.

## Dependencies before production reporting

- Google Search Console and Bing Webmaster Tools verification.
- An approved analytics provider, consent model, property, retention policy,
  and reporting access.
- An approved section-engagement threshold and landing-page attribution window.
- The production inquiry-platform handoff and any reliable completion signal.
- An owner and cadence for anonymized sales-question classification.

AI-search referral reporting will include only identifiable referrers or
approved campaign parameters. Direct visits and stripped referrers remain
unknown; they must not be relabelled as AI traffic.

## Deliberate deviations

- No speculative analytics or session-replay script was installed.
- No arbitrary query-volume, CTR, long-tail word-count, or page-creation
  threshold was invented before a baseline exists.
- No personal inquiry data is permitted in analytics parameters.
- No dashboard or new public content route was created.
- This is the Step 4B.20 measurement framework, not the final Phase 4B hard
  pass.
