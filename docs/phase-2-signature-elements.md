# Phase 2.2 Recognizable Signature Elements

Status: Implemented across the complete Phase 2 page blueprints.

## Governing Sources

1. Luxe Event Co. Website Strategy, Design, Development, SEO and AEO Implementation Master Specification.
2. Luxe Brands client intake form, formatted July 2026.
3. Phase 1 page, linking, inquiry-boundary, and permission requirements.
4. Phase 2.1 visual system.

## Objective

Create recurring visual structures that make the future Luxe site recognizable without turning coffee, dessert, and seating into catalogue categories or generic recommendation cards.

The signature system contains:

1. Experience Selector.
2. Event Planning Pathway.
3. Combined Experience Feature.
4. Credibility Strip.
5. Contextual Inquiry Panel.

## Experience Selector

### Purpose

Present Coffee, Dessert, and Seating as distinct expressions inside one connected composition.

### Content

| Expression | Division | Visual response | Link |
| --- | --- | --- | --- |
| Coffee | Luxe Coffee Bar | Dark organic mass, circular ritual, warm gold detail | `/experiences/coffee-bar` |
| Dessert | Luxe Sweet Cart | Soft taupe form, curved gesture, elevated playfulness | `/experiences/sweet-cart` |
| Seating | Luxe Seating Rentals | Layered planes, architectural geometry, structured contrast | `/experiences/seating-rentals` |

### Composition

- One shared field and connecting line hold all three expressions together.
- The three choices are not separate floating cards.
- Desktop uses one connected three-expression composition with page-specific alignment.
- Mobile becomes a compact descending sequence with shared alignment rather than three full-width cards.
- Each choice remains a normal crawlable link with a descriptive accessible name.

### Placement

- Home: implemented prominently after the parent-brand introduction.
- Experiences: implemented immediately after the page introduction.

The complete Home blueprint now replaces the temporary compact coming-soon composition.

## Event Planning Pathway

### Sequence

1. Choose the occasion.
2. Select the experiences.
3. Personalize the details.
4. Begin the inquiry.

### Behaviour

- This is an explanatory interface, not an inquiry form.
- Each step links to an appropriate planning destination.
- Desktop uses a connected four-part sequence.
- Tablet uses a two-by-two sequence.
- Narrow mobile uses one compact sequence with visible order and continuity.
- No personal data is collected by the module.

### Placement

- Experiences Hub.
- Events Hub.
- Home planning overview in the complete Home blueprint.
- Future page blueprints may reuse a shortened variation only if the four-stage meaning remains intact.

## Combined Experience Feature

### Curated Compositions

| Occasion | Composition | Destination |
| --- | --- | --- |
| Bridal shower | Coffee Bar + Sweet Cart | `/events/bridal-showers` |
| Corporate reception | Coffee Bar + Seating | `/events/corporate-events` |
| Wedding | Coffee + Dessert + Rentals | `/events/weddings` |
| Product launch | Branded drinks + Signage | `/events/brand-activations` |

### Rules

- These are planning directions, not fixed packages or automated recommendations.
- Each row begins with the event context rather than a sales tier.
- The feature uses connected rows, service nodes, and editorial copy rather than recommendation cards.
- Copy cannot imply an inclusion, price, availability, or operational guarantee that the intake has not confirmed.

### Placement

- Home combined-experience showcase.
- Experiences Hub.
- Events Hub where it supports event-led discovery.

## Credibility Strip

### Approved Candidate Names

- OPTrust.
- CST Savings.
- Convergint.
- ICNA Canada.
- Waste Connections of Canada.

The intake confirms Luxe is comfortable showcasing these organizations, and publication permission for their names has now been confirmed. All five records are marked `approved`.

### Display Gate

- The component displays the approved organization names and approved local logo assets.
- Logo assets retain their original proportions, render monochromatically within the restrained proof treatment, and are never altered to imply partnership or endorsement.
- The strip must never imply endorsement, partnership, or a case-study claim beyond the approved evidence.

### Placement

- Home.
- Corporate Events.
- Brand Activations.

All five approved names and local logo assets are visible in the Home hero proof
panel and the dedicated Corporate Events and Brand Activations credibility
modules. Name and logo permission does not imply testimonial, case-study,
campaign-detail, or endorsement permission.

## Contextual Inquiry Panels

### Principle

Inquiry language follows the visitor's current page and planning context. The same heading and paragraph are not repeated across the site.

### Required Contexts

| Context | Heading |
| --- | --- |
| Experiences | Bring the experiences together. |
| Coffee Bar | Inquire about coffee service. |
| Sweet Cart | Plan your dessert experience. |
| Seating Rentals | Discuss your seating requirements. |
| Weddings | Plan your wedding experience. |
| Corporate Events | Discuss a corporate event. |
| Brand Activations | Create a branded experience. |
| Baby Showers | Plan a baby shower experience. |
| Bridal Showers | Plan a bridal shower experience. |
| Birthdays | Plan a birthday experience. |
| Private Events | Discuss your private event. |

### Boundary

- Panels link to `/inquire`.
- Panels do not collect data.
- The operational third-party form remains separate.
- No third-party platform URL is invented before configuration is approved.

## Responsive System

### Desktop

- Selector: three connected expressions within one editorial field.
- Pathway: four-part horizontal sequence.
- Combinations: editorial introduction beside a ruled list.
- Inquiry: sculptural mark, contextual copy, and focused CTA.

### Tablet

- Selector remains a three-part composition with reduced art scale.
- Pathway becomes two-by-two.
- Combinations place the introduction above the list.
- Inquiry CTA moves beneath the copy while retaining the shared dark field.

### Mobile

- Selector becomes a compact vertical composition with a shared guide line.
- Names, destinations, and meaningful differentiators remain available; decorative
  art may simplify before content is removed.
- Combination rows retain occasion and composition while decorative nodes are removed.
- Pathway remains ordered and explanatory.
- Inquiry mark, copy, and CTA recompose without horizontal overflow.

## Motion and Accessibility

- Hover and focus responses use the Phase 2.1 motion tokens.
- No signature content is hidden until interaction.
- All destinations are crawlable HTML links.
- Reduced motion removes transforms and transitions through the global safeguard.
- Visual art is decorative and excluded from the accessibility tree.
- The Experience Selector, Pathway, Combinations, and Inquiry Panel have explicit section headings.
- Credibility proof renders only records whose permission state is `approved`.

## Implementation Contract

- Content and placement data: `app/signature-elements.ts`.
- Reusable components: `app/components/signature-elements.tsx`.
- Visual implementation: `app/globals.css`.
- Experiences integration: `app/experiences/page.tsx`.
- Events integration: `app/events/page.tsx`.
- Experience and event contextual inquiries: `app/components/route-detail.tsx`.
- Complete page placement and responsive contracts: `app/phase-2-blueprints.ts`.

No new production claim, operational promise, organization proof, or inquiry platform has been invented.
