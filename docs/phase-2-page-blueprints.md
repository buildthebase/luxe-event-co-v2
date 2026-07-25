# Phase 2 Page Blueprints and Responsive Wireframes

Status: Complete locally for Phase 2 review. This document does not authorize a commit, deployment, or publication.

## Governing references

1. Luxe Event Co. Website Strategy, Design, Development, SEO and AEO Implementation Master Specification.
2. Luxe Event Co. Complete Intake, July 2026.
3. The client-approved location correction, including removal of Hamilton.
4. Phase 1 architecture, intent, linking, schema, inquiry, and evidence contracts.
5. Phase 2 visual, signature, responsive, accessibility, and interaction systems.

The typed source of truth is `app/phase-2-blueprints.ts`. It joins every approved page purpose and CTA from `app/page-contract.ts` to a page-specific hierarchy, surface sequence, desktop wireframe, mobile recomposition, differentiator, and dependency list.

## Wireframe archetypes

| Archetype | Desktop behavior | Mobile behavior |
| --- | --- | --- |
| Home | Cinematic hero, signature selector, event paths, proof, planning, and conversion systems | One media frame, complete content parity, touch-led choices, stacked proof |
| Hub | Connected directory, comparison, and pathway composition | Ordered decision sequence with every summary and destination retained |
| Experience detail | Division-specific visual language, comparison, inclusions, operations, proof, FAQs | Complete service-planning order without compressed desktop columns |
| Event detail | Occasion-specific applications, combinations, logistics, proof, FAQs | Event-led reading sequence with the same decision information |
| Gallery | Filtered and captioned visual groups | Touch-sized filter rail and full-width image stories |
| FAQ | Category navigation and disclosure groups | Full-width native disclosures with equivalent answers and links |
| Contact | Qualification, preparation, contact fallback, and handoff boundary | One logical focus and reading order with no missing preparation content |

## Page-by-page content brief

| Page | Primary CTA | Approved hierarchy | Distinguishing direction | Open production dependencies |
| --- | --- | --- | --- | --- |
| Home | Plan Your Event | Cinematic hero; parent positioning; selector; unified experience; event paths; combinations; real-event media; proof; working principles; planning; testimonials; service area; inquiry | Introduces three divisions as one event world | Hero films/posters, real-event media, testimonials, inquiry destination |
| Experiences | Explore an Experience | Hero; independent/combined explanation; three division studies; comparison; combinations; event paths; gallery; planning; inquiry | Coffee atmospheric, Dessert tactile, Seating architectural | Division assets, media for all three divisions, combined-event proof |
| Coffee Bar | Inquire About Coffee Service | Hero; overview; two formats; comparison; inclusions; drinks; seasonal service; customization; operations; events; gallery; related experiences; FAQs; inquiry | Complete café experience rather than a mobile cart | Media, approved menu, service-rate and utility specification |
| Sweet Cart | Inquire About a Dessert Experience | Hero; positioning; two collections; live desserts; soft serve; inclusions; toppings; customization; operations; events; gallery; combinations; FAQs; inquiry | Live dessert interaction and décor moment | Media, approved toppings and enhancements, service-rate specification |
| Seating Rentals | Discuss Your Rental Requirements | Hero; overview; categories; additional inventory; layouts; delivery/setup/teardown; indoor/outdoor; quote inputs; events; gallery; combinations; area; FAQs; inquiry | Room design and guest flow rather than a product catalogue | Inventory, quantities, policies, professional room photography |
| Events | Find Your Event Experience | Hero; event-led explanation; seven occasions; combinations; gallery; planning; inquiry | Starts with the occasion rather than the service | Representative real-event media |
| Weddings | Plan Your Wedding Experience | Hero; applications; day stages; three service roles; combinations; customization; planner/venue coordination; logistics; gallery; testimonials; FAQs; inquiry | Hospitality woven through the complete day | Wedding media, testimonial approval, final coordination details |
| Corporate Events | Discuss a Corporate Event | Hero; capabilities; event formats; three services; branding; scale; Trusted By; gallery/cases; process; FAQs; inquiry | Professional reliability, repeatability, and scale | Corporate media, case facts, final volume and multi-day parameters |
| Brand Activations | Create a Branded Experience | Hero; branded experiences; brand surfaces; applications; content moments; multi-location/multi-day; services; proof; gallery; planning; inquiry | Agency and campaign workflow with tangible brand surfaces | Campaign permissions, activation media, production lead times |
| Baby Showers | Plan a Baby Shower | Hero; coffee/matcha; dessert; seating; signage/styling; indoor/outdoor; combinations; gallery; planning; FAQs; inquiry | Soft atmosphere with clear coordination | Approved media, styling examples, outdoor requirements |
| Bridal Showers | Plan a Bridal Shower | Hero; café service; matcha; dessert; rentals; menus/signage/styling; combinations; gallery; FAQs; inquiry | Cohesive, visual host and planner experience | Approved media, styling boundary, customization examples |
| Birthdays | Plan a Birthday Experience | Hero; milestone/adult/family contexts; appropriate children's events; drinks; desserts; rentals; signage; combinations; gallery; FAQs; inquiry | Premium milestone positioning, not a children's-party template | Media across age contexts, signage examples, menu guidance |
| Private Events | Discuss Your Event | Hero; engagements; anniversaries; graduations; cultural/religious events; holidays/family; other milestones; service possibilities; combinations; gallery; planning; FAQs; inquiry | Flexible but event-specific coverage for uncategorized occasions | Media and contextual review for represented celebrations |
| Gallery | Start Planning Your Event | Hero; filters; grouped stories; captions; related links; inquiry | Evidence grouped by service and event context, never an image wall | Final originals, permissions, filenames, alt text, captions, taxonomy |
| FAQ | Ask About Your Event | Hero; category navigation; booking; area; logistics; three divisions; customization; inquiry | Direct, policy-aware answers connected to deeper pages | Final pricing, minimum, utility, weather, delivery, and payment policies |
| Inquire | Begin Your Inquiry | Hero; inquiry scope; preparation details; guidance; next steps; handoff; contacts; FAQ/privacy | Qualification and preparation without duplicating the booking platform | Platform URL, minimum guidance, privacy language, return behavior |

## Content parity and responsive approval rule

- Desktop and mobile use the same server-rendered content, headings, links, metadata, and structured data.
- CSS may alter grouping, columns, crop, decorative art, and presentation order only when logical DOM order remains intact.
- Important text may not be removed to make a smaller layout fit.
- Hero and section type scale down fluidly but may not become unreadably small or clip.
- Mobile actions remain visible without hover, and every functional control targets at least 44 by 44 CSS pixels.
- Final photography requires breakpoint-specific crop review; a desktop focal point cannot be assumed to work on mobile.
- All reserved photography, proof, policy, and inquiry dependencies are publication gates, not invitations to invent content.

