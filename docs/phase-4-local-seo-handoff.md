# Step 4.13 — Local SEO Foundation Handoff

## Outcome

The website now has a single governed local-business record in
`app/local-seo.ts`. It derives its approved values from `app/site-config.ts` and
is consumed by the structured-data graph. It also records the exact values and
verification states to use when Luxe updates its Google Business Profile,
division social profiles, relevant directories, and corporate materials.

No external account or listing has been changed in this step.

## Canonical public business record

| Field | Approved value |
| --- | --- |
| Business name | Luxe Event Co. |
| Telephone | +1 647-869-1352 |
| Machine-readable telephone | +16478691352 |
| Email | bookings@luxeeventco.ca |
| Website | https://luxeeventco.ca |
| Primary market | Toronto and the Greater Toronto Area |
| Extended area | Select destination events throughout Southern Ontario |
| Divisions | Luxe Coffee Bar, Luxe Sweet Cart, Luxe Seating Rentals |
| Public description | Luxe Event Co. brings together mobile coffee, live dessert, and event rentals for weddings, corporate events, activations, and private celebrations across Toronto and the GTA. |
| Public address | Not approved; do not publish |
| Public hours | Not approved; do not publish |

The approved primary municipality set remains:

Toronto, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City,
Thornhill, North York, Mississauga, Brampton, Oakville, Burlington, Milton,
Pickering, Ajax, Whitby, Oshawa, Scarborough, and Etobicoke.

## Website implementation

- Home identifies Toronto and the GTA as the primary market and retains the
  complete, grouped service-area section.
- The complete municipality set is intentionally limited to Home, the
  service-area FAQ answer, and Seating Rentals, where location and delivery
  planning are directly relevant.
- Inquire now uses representative municipalities instead of repeating the
  entire list.
- Other experience and event pages retain concise Toronto/GTA context and use
  individual place names only when they add real planning value.
- Structured data reads the business name, website, public description,
  telephone, email, and primary service-area set through the canonical identity.
- No municipality landing pages exist in the route map or sitemap.

## Google Business Profile strategy

The existence, ownership, URL, category, address configuration, hours, and
current service areas of a Luxe profile have not been verified. The code
therefore records the profile as `verification-required` rather than implying
that it has been connected.

Subject to owner and eligibility verification:

1. Begin with one parent Luxe Event Co. service-area profile.
2. Do not show a residential address. If Luxe travels to clients and does not
   receive customers at its operating base, hide the address and configure
   accurate service areas.
3. Do not create separate profiles for the three divisions merely because they
   have separate brands or Instagram accounts. Each would need to meet Google's
   independent real-world business or department eligibility requirements.
4. Use the real-world business name without adding city or service keywords.
5. Select the smallest accurate category set after reviewing the available
   Google categories and Luxe's core operating model.
6. Verify that the selected service areas reflect actual travel operations and
   the location from which the business is based.
7. Use public hours only if they meaningfully describe when customers can
   contact or visit Luxe.

## Google Business Profile measurement links

The governed website link is:

`https://luxeeventco.ca/?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=website`

The governed inquiry link, if the profile supports and Luxe approves a
corresponding destination, is:

`https://luxeeventco.ca/inquire?utm_source=google&utm_medium=organic&utm_campaign=gbp&utm_content=inquiry`

The site's existing canonical system keeps the clean page URL canonical when a
visitor arrives with these parameters. UTM naming should remain lowercase and
unchanged to avoid fragmented reporting.

## Social, directory, and corporate-material controls

The three division Instagram URLs are confirmed and remain attached to their
respective divisions. There is no confirmed parent social profile.

No directory inventory was supplied. Before updating or creating a listing,
record:

- directory name and listing URL;
- listing owner and login custodian;
- current business name, phone, email, website, and service area;
- whether duplicates exist;
- last verification date;
- correction status.

Do not create low-value directory listings solely for link acquisition.
Prioritize legitimate event, wedding, hospitality, rental, chamber, venue, or
professional listings only when they are relevant to the business.

Corporate materials requiring an owner-side consistency review include
proposals, invoices, insurance certificates, email signatures, presentation
decks, stationery, and vendor onboarding records. The canonical public record
above is the update source, but this implementation does not claim those
external files have already changed.

## Location-page gate

No city page should be added until Luxe can provide enough original local value:

- first-hand events and useful local evidence;
- approved local photography;
- venue or area-specific planning knowledge;
- permissioned local testimonials or case studies;
- a distinct searcher need;
- enough original information to avoid a city-name substitution template.

Without that evidence, a city page would be thin or doorway-like and remains
excluded.

## Verification

`tests/local-seo-foundation.test.mjs` verifies:

- derivation of the canonical identity from site configuration;
- reuse of that record in structured data;
- the verification-gated Profile and external-surface states;
- complete UTM parameter construction;
- exact Home contact identity and market language;
- full-list restraint across all 16 rendered routes;
- absence of city landing pages from the sitemap;
- the evidence gate for any future local page.

The full production build and test suite must remain green after any public
business-information update.
