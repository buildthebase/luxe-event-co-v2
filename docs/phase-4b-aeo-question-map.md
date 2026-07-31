# Phase 4B.4 — AEO Question Map

Date: July 26, 2026  
Status: Canonical answer-ownership map; no public-page additions

## Map contract

The structured source of truth is
`app/aeo-question-map.ts`. It contains the question, normalized query topic,
definitive primary page, secondary page, ICP, funnel stage, search intent,
proposed answer, required evidence, internal links, format, publishing status,
and validation status for every canonical question cluster.

The 84 natural-language variants found in Step 4B.2 inherit the ownership of
their 21 canonical questions. Step 4B.5 later promoted nine materially distinct
service-discovery questions into the same structured map because each requires
its own direct answer and definitive service page. Step 4B.6 added nine
event-planning questions with one event-page owner apiece. Step 4B.7 added nine
neutral comparison questions. Step 4B.8 consolidated eleven cost prompts into
nine definitive pricing questions. Step 4B.9 reused existing operational owners
for 19 capacity and logistics prompts and promoted two dessert-specific
questions. Step 4B.10 reused established menu, FAQ, service, activation, and
combined-experience owners for 17 customization topics and promoted only the
missing rental-styling question. Step 4B.11 then consolidated all ten local and
service-area prompts into the existing travel, pricing, venue-access, and
rental-delivery owners. The map remains at 60 question records without creating
a new route or city page.

## Definitive page assignments

| Question topic | Definitive page | Priority supporting page | Publishing status | Validation status |
|---|---|---|---|---|
| Choosing an experience | `/events` | `/experiences` | Live | Validated |
| Wedding service timing | `/events/weddings` | `/experiences/coffee-bar` | Live with dependency limits | Validated with dependency limits |
| Guest use and value | `/events` | `/events/weddings` | Planned | Pending first-party validation |
| Capacity, throughput, and lines | `/faq` | `/experiences/coffee-bar` | Live with dependency limits | Validated with dependency limits |
| Staffing and inclusions | `/faq` | `/experiences/coffee-bar` | Live | Validated with dependency limits |
| Menu and dietary fit | `/faq` | `/experiences/coffee-bar` | Live | Validated |
| Branding and creative approval | `/events/brand-activations` | `/events/corporate-events` | Live with dependency limits | Validated with dependency limits |
| Space, power, and water | `/faq` | `/experiences/coffee-bar` | Live with dependency limits | Pending first-party validation |
| Venue access and timing | `/faq` | `/inquire` | Live with dependency limits | Validated with dependency limits |
| Outdoor and weather | `/faq` | `/events/weddings` | Live with dependency limits | Validated with dependency limits |
| Pricing, minimums, and scope | `/faq` | `/inquire` | Live | Validated with dependency limits |
| Booking lead time and availability | `/faq` | `/inquire` | Live | Validated |
| Travel and service area | `/faq` | `/` | Live | Validated with dependency limits |
| Dessert quantity and flow | `/experiences/sweet-cart` | `/faq` | Live with dependency limits | Validated with dependency limits |
| Rental inventory and layout | `/experiences/seating-rentals` | `/events` | Live with dependency limits | Validated with dependency limits |
| Rental delivery and setup | `/experiences/seating-rentals` | `/faq` | Live with dependency limits | Validated with dependency limits |
| Rental risk and changes | `/faq` | `/experiences/seating-rentals` | Blocked | Pending first-party validation |
| Corporate scale and repetition | `/events/corporate-events` | `/events/brand-activations` | Live with dependency limits | Validated with dependency limits |
| Procurement, insurance, and compliance | `/events/corporate-events` | `/faq` | Live with dependency limits | Validated with dependency limits |
| Coordination and role boundaries | `/faq` | `/inquire` | Live with dependency limits | Validated with dependency limits |
| Comparable proof | `/gallery` | `/events/corporate-events` | Live with dependency limits | Pending permission validation |

## Routing refinements from Step 4B.3

The definitive-page review changed five earlier assignments:

- Guest value moved from Weddings to Events because it is shared by wedding
  and private-event prospects.
- Capacity and throughput moved from Coffee Bar to FAQ because the answer
  covers both Coffee Bar and Sweet Cart.
- Staffing and inclusions moved from Coffee Bar to FAQ for the same
  cross-division reason.
- Menu and dietary fit moved from Coffee Bar to FAQ so dessert requirements do
  not depend on a coffee-specific answer.
- Travel and service area moved from Home to FAQ. Home retains a concise local
  summary and links to the detailed answer.

These changes reduce duplication and prevent one division from becoming the
authority for another division's operating answer.

## Publishing interpretation

- **Live**: the definitive page contains a responsible answer supported by
  current evidence.
- **Live with dependency limits**: useful qualified guidance is live, but a
  missing number, policy, workflow, or proof item cannot be added.
- **Planned**: the mapped answer needs stronger first-party evidence before it
  becomes public.
- **Blocked**: the answer depends on unapproved operating or contractual facts.
- **Revalidation required**: current sources conflict and owner confirmation is
  required before the answer is expanded or reused.

## Duplication rule

Only the definitive page may hold the complete answer. A secondary page may
briefly establish context and link to that answer. It must not paraphrase the
entire answer, reproduce a competing FAQ, or create a second schema entity for
the same content.

This step records link ownership but does not claim that every proposed link is
already implemented. Link implementation should occur only when the related
content step authorizes public-page changes.

## Step 4B.5 service-discovery ownership

| Question | Definitive page |
|---|---|
| What is a mobile coffee bar? | `/experiences/coffee-bar` |
| How does mobile espresso catering work? | `/experiences/coffee-bar` |
| What is dessert-cart catering? | `/experiences/sweet-cart` |
| What is the difference between a dessert cart and a dessert table? | `/experiences/sweet-cart` |
| What is included with an event-rental service? | `/experiences/seating-rentals` |
| What is a branded coffee-cart activation? | `/events/brand-activations` |
| Can coffee, dessert, and rentals be coordinated through one provider? | `/experiences` |
| Which events are suitable for mobile coffee catering? | `/experiences/coffee-bar` |
| How does on-site dessert preparation work? | `/experiences/sweet-cart` |

## Step 4B.6 event-planning ownership

| Question | Definitive page |
|---|---|
| When should coffee be served at a wedding? | `/events/weddings` |
| Is a coffee bar appropriate for cocktail hour? | `/events/weddings` |
| Which desserts work well for bridal showers? | `/events/bridal-showers` |
| How should coffee catering be planned for a corporate event? | `/events/corporate-events` |
| What works well for employee appreciation? | `/events/corporate-events` |
| What services work well for baby showers? | `/events/baby-showers` |
| Which event rentals are required for outdoor events? | `/events/private-events` |
| How should guest flow around a coffee or dessert station be managed? | `/events` |
| Which services can be combined for a complete event setup? | `/events` |

## Step 4B.7 comparison ownership

| Comparison | Definitive page |
|---|---|
| Café cart versus full-service coffee bar | `/experiences/coffee-bar` |
| Coffee cart versus traditional coffee catering | `/experiences/coffee-bar` |
| Mobile coffee bar versus venue coffee service | `/experiences/coffee-bar` |
| Dessert cart versus dessert table | `/experiences/sweet-cart` |
| Hosted versus self-serve dessert station | `/experiences/sweet-cart` |
| Mini pancakes versus waffles versus mini donuts | `/experiences/sweet-cart` |
| Individual vendors versus one coordinated event provider | `/experiences` |
| Rental delivery versus delivery with setup | `/experiences/seating-rentals` |
| Standard corporate catering versus branded experiential service | `/events/brand-activations` |

## Step 4B.8 pricing ownership

| Pricing topic | Definitive page |
|---|---|
| Mobile coffee catering cost and pricing method | `/experiences/coffee-bar` |
| Guest count versus service duration | `/faq` |
| Dessert-cart cost and pricing factors | `/experiences/sweet-cart` |
| Chair and table pricing | `/experiences/seating-rentals` |
| Delivery and setup inclusion | `/experiences/seating-rentals` |
| Travel fees | `/faq` |
| Branding and price | `/events/brand-activations` |
| Combined services and the overall quote | `/experiences` |
| Booking retainer | `/faq` |

## Step 4B.9 capacity and logistics ownership

| Operational topic | Definitive page |
|---|---|
| Guest capacity; drinks per hour; barista count | `/faq` |
| Attendant count; dessert-service duration | `/experiences/sweet-cart` |
| Floor space; electricity; water | `/faq` |
| Indoor use; outdoor use; weather requirements | `/faq` |
| Setup time; teardown time; load-in access; venue coordination | `/faq` |
| Multi-station service; multi-day and recurring requests | `/events/corporate-events` |
| Rental delivery and setup | `/experiences/seating-rentals` |
| Guest-flow planning | `/events` |

## Step 4B.10 customization and branding ownership

| Customization topic | Definitive page |
|---|---|
| Custom drink menus; signature beverages | `/faq` and `/experiences/coffee-bar`, respectively |
| Seasonal menus; matcha; non-coffee beverages; dairy-free milk | `/faq` |
| Branded cups | `/faq`, linked to the complete activation workflow |
| Branded menus; branded carts; campaign drink names; event-colour alignment | `/events/brand-activations` |
| Custom signage | `/faq`, linked to Brand Activations when campaign-led |
| Dessert and topping customization | `/experiences/sweet-cart` and `/faq`, respectively |
| Rental styling | `/experiences/seating-rentals` |
| Combining coffee, dessert, and rentals | `/experiences` |
| Branding production timelines; required client files and assets | `/events/brand-activations` |

## Step 4B.11 local and service-area ownership

| Local topic | Definitive page |
|---|---|
| Toronto and GTA availability; approved municipality coverage | `/faq` |
| Extended travel; Southern Ontario; destination-event availability | `/faq` |
| Travel fees; distance-sensitive minimum review; location effects on price and logistics | `/faq` |
| Rental delivery areas and delivery feasibility | `/experiences/seating-rentals` |
| Setup feasibility by venue location and access | `/faq` |

No local page is authorized. The approved route set remains unchanged until a
location has unique events, imagery, testimonials or case studies, venue
context, first-hand operating information, and a distinct local searcher need.
