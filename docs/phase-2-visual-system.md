# Phase 2.1 Visual System

Status: Approved as the Phase 2 creative and design-system foundation. Production
release still requires final assets, operational approvals, inquiry configuration,
and final accessibility verification.

## Governing Sources

1. Luxe Event Co. Website Strategy, Design, Development, SEO and AEO Implementation Master Specification.
2. Luxe Brands client intake form, formatted July 2026.

Where those sources differ, the master specification governs architecture and the client intake governs verified business and brand facts. No unverified service, operational, proof, or location claim is introduced by this visual system.

## Creative Direction

The visual direction is an **Editorial Event Portfolio**.

Luxe Event Co. should feel like a composed record of hospitality, atmosphere, material, and guest experience. It must not resemble a rental catalogue, generic full-service platform, beige-and-gold template, or set of interchangeable service cards.

The parent brand remains visually cohesive while each division is recognizable through image subject, crop, rhythm, material, and composition:

| Division | Primary visual qualities | Image emphasis | Composition emphasis |
| --- | --- | --- | --- |
| Luxe Coffee Bar | Crafted, warm, atmospheric | Hands, pours, steam, service, café details, guest interaction | Intimate crops, warm directional light, rhythmic close-ups |
| Luxe Sweet Cart | Indulgent, tactile, playful, elevated | Live preparation, texture, toppings, finished presentation, guest response | Softer contours, unexpected crop relationships, moments of abundance |
| Luxe Seating Rentals | Architectural, structured, modern | Completed spaces, rows, room plans, materials, venue context | Strong lines, wider fields, measured geometry, negative space |

These are not separate colour themes. The parent palette remains consistent across all three.

## Colour Foundation

| Token | Value | Primary role |
| --- | --- | --- |
| Warm White / Ivory | `#F8F6F2` | Primary page field and negative space |
| Champagne Gold | `#C8A97E` | Decorative accent, rules, key shapes, large display details |
| Matte Black | `#1F1F1F` | Primary text, controls, and selected dark surfaces |
| Soft Taupe | `#D8CEC3` | Secondary surfaces and material warmth |
| Warm Grey | `#7A7A7A` | Large metadata, icons, and non-essential detail |

### Colour Rules

- Ivory is the default page surface.
- Matte black carries body copy and functional contrast.
- Champagne gold may guide attention, but it cannot dominate a background, paragraph, or long text passage.
- Warm grey is not permitted for small essential text on ivory because it does not reach 4.5:1.
- Small accent copy uses the derived `#695438` gold-ink token. It preserves the champagne character at 6.65:1 contrast on ivory.
- Surface variation comes from ivory-and-taupe blends, photography, texture, rules, and negative space rather than additional decorative colours.

### Contrast Reference

| Foreground | Background | Ratio | Approved use |
| --- | --- | --- | --- |
| `#1F1F1F` | `#F8F6F2` | 15.27:1 | All text and controls |
| `#595754` | `#F8F6F2` | 6.67:1 | Secondary body text |
| `#695438` | `#F8F6F2` | 6.65:1 | Small gold-accent text |
| `#7A7A7A` | `#F8F6F2` | 3.98:1 | Large text, icons, or decorative detail only |
| `#C8A97E` | `#F8F6F2` | 2.06:1 | Decorative lines, shapes, and non-text accents only |

## Contrast and Surface Rhythm

The approved Home contrast study establishes the site-wide tonal system for every remaining page blueprint. It is a reusable design rule, not a Home-only decoration and not a requirement to copy the Home section order.

### Surface Roles

| Role | Surface | Intended use |
| --- | --- | --- |
| Canvas | Ivory grid field | Orientation, reading, negative space, service details, FAQs, and connective content |
| Narrative | Taupe-and-ivory blend | Parent-brand explanation, testimonials, softer editorial chapters, and contextual transitions |
| Soft | Lighter taupe-and-ivory blend | Connected choices, combined experiences, and supporting comparison moments |
| Emphasis | Matte black | Decisive brand statements, operational proof, selected conversion moments, and high-value factual content |
| Visual | Photography or video | Experience storytelling where local copy contrast is controlled independently of the media |

### Sequencing Rules

- Every permanent page must define a deliberate surface sequence before implementation.
- The ivory grid remains the connective canvas between tonal chapters.
- Surface changes mark a meaningful shift in purpose; sections must not alternate dark and light mechanically.
- Matte-black chapters are reserved for information that merits decisive emphasis and cannot appear back-to-back.
- Taupe fields provide warmth and separation without competing with approved photography.
- Full-bleed fields retain the shared maximum content width and editorial grid for headings, copy, controls, and evidence.
- Dark fields use ivory primary copy, muted ivory secondary copy, translucent ivory rules, and restrained champagne-gold labels.
- Gold remains an accent on every surface and cannot be used as the primary contrast device.
- Mobile retains the same chapter logic but may shorten padding and simplify decorative boundaries before reducing readable type.

The canonical CSS roles are:

- `--surface-chapter-canvas`
- `--surface-chapter-taupe`
- `--surface-chapter-soft`
- `--surface-chapter-dark`
- `--surface-dark-copy`
- `--surface-dark-copy-muted`
- `--surface-dark-rule`

Reusable `.surface-chapter*` primitives provide full-bleed surfaces with content constrained to the page grid. Page-specific selectors may use the same tokens when an existing component cannot accept a utility class.

## Typography

### Display Face

Manrope is also the display face. Major headings use its scale, weight, spacing, line breaks, and composition to create an editorial presence without introducing a disconnected second typographic voice.

### Body Face

Manrope is the body and interface face. It supports navigation, controls, labels, paragraphs, metadata, service details, FAQs, and conversion copy at weights 400, 500, and 600. The shared family keeps functional and expressive content recognizably within the same parent identity.

### Wordmark Exception

The approved Luxe Event Co. wordmark remains in its existing Manrope-based treatment. Editorial headings must not imitate, distort, or compete with the wordmark.

### Type Hierarchy

| Role | Responsive size | Line height | Maximum measure |
| --- | --- | --- | --- |
| Display XL | `clamp(3.6rem, 9vw, 9.5rem)` | `0.88` | `14ch` |
| Display L | `clamp(3rem, 6.4vw, 7rem)` | `0.92` | `14ch` |
| Heading L | `clamp(2.25rem, 4.5vw, 4.75rem)` | `0.98` | `18ch` |
| Heading M | `clamp(1.75rem, 3vw, 3rem)` | `1.05` | `24ch` |
| Heading S | `clamp(1.35rem, 1.8vw, 1.8rem)` | `1.15` | `30ch` |
| Lead body | `clamp(1.125rem, 1.5vw, 1.375rem)` | `1.55` | `48ch` |
| Body | `clamp(1rem, 0.4vw + 0.92rem, 1.125rem)` | `1.6` | `66ch` |
| Small | `0.875rem` | `1.5` | Context-dependent |
| Label | `0.75rem` | `1.3` | Short phrases only |

### Typography Rules

- One display-level heading dominates each viewport.
- Signature internal-page headings use two or three intentional desktop lines and never wrap to a fourth line.
- Controlled lines remain intact while their display size scales fluidly to the available mobile width.
- Display XL tracking is fixed at `-0.055em`, matching the approved Experiences-page reference.
- Display L tracking is `-0.08em`; Heading L is `-0.055em`; Heading M is `-0.04em`.
- Body tracking remains normal.
- Short labels may use `0.12em` to `0.18em` spacing and uppercase styling.
- Uppercase is not used for sentences or paragraphs.
- No essential copy is rendered below 14px.
- Non-signature headings retain natural, readable wrapping.
- Heading and body measures are enforced before font size is reduced.

## Spacing System

The base unit is 4px.

Core scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128px`.

Responsive values:

- Page inline space: `clamp(22px, 5vw, 76px)`.
- Major section space: `clamp(80px, 10vw, 160px)`.
- Editorial grid gap: `clamp(16px, 2.2vw, 40px)`.
- Maximum content width: `1440px`.
- Reading width: `672px`.

Whitespace must establish grouping and hierarchy. It cannot be used as arbitrary empty filler. Mobile spacing is recomposed according to content priority rather than reduced with one universal multiplier.

## Layout System

### Grid

| Context | Grid |
| --- | --- |
| Desktop | 12 columns |
| Tablet | 8 columns |
| Mobile | 4 columns |

The grid is an alignment framework, not a requirement that every module become a rectangle.

### Composition Rules

- Photography leads experience and event storytelling.
- Full-width visual moments are balanced by concise reading-width copy.
- Controlled asymmetry must strengthen hierarchy and direction.
- Cards are reserved for genuine peer choices or compact comparison tasks.
- Image crop, focal point, and aspect ratio are selected at each breakpoint.
- Section boundaries use space, crop changes, rules, or subtle surface shifts.
- Layering may combine type, photography, rules, and material fields, but cannot obscure essential content.
- Product-only cutouts and inventory grids cannot become the dominant language of Seating Rentals.

### Responsive Re-composition

- Desktop may support two focal layers and wider image fields.
- Tablet reduces simultaneous focal points and brings controls closer to relevant content.
- Mobile follows decision priority and touch flow, not desktop source geometry.
- Short-height and landscape layouts remove decorative space before shrinking readable type.
- Ultra-wide layouts cap text and core content while allowing selected photography to bleed.
- DOM order must remain logical even when the visual order changes.
- No breakpoint may create clipped content, horizontal scrolling, or a hidden conversion path.

## Photography Direction

- First-party event photography is the default.
- Images should show hospitality, interaction, finish, environment, and scale.
- Service pages require their own photography as established in Phase 1.
- Event pages should combine atmosphere, guest context, and relevant experience details.
- Intentional crops must preserve the service action or emotional focal point.
- Meaningful images receive specific alternative text. Decorative fields use empty alternative text.
- Stock imagery and repetitive product cutouts are prohibited unless explicitly approved as temporary placeholders.

## Motion System

| Token | Duration | Use |
| --- | --- | --- |
| Fast | `180ms` | Hover, focus, and small control response |
| Standard | `320ms` | Menu and selector state transitions |
| Reveal | `700ms` | Controlled image or section reveal |
| Slow | `1000ms` | Large visual transitions used sparingly |
| Ambient | `16000ms` | Optional gentle decorative movement |

Easing:

- Luxe out: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)`.

### Motion Rules

- All meaningful content exists in server-rendered HTML.
- Motion cannot delay access to copy, navigation, or inquiry actions.
- Reveals use opacity and transform rather than layout-changing properties.
- No essential content depends on hover, scroll, or selector interaction to become available.
- Use no more than one primary motion idea in a section.
- Continuous movement, parallax, and pinned-scroll sequences require explicit review.
- `prefers-reduced-motion` disables non-essential movement and smooth scrolling.
- Reduced-motion users receive complete, immediately visible content.

## Accessibility Standard

The visual system targets WCAG 2.2 Level AA.

- Normal text reaches at least 4.5:1 contrast.
- Large text and meaningful graphics reach at least 3:1.
- Focus remains visible and is not communicated through colour alone.
- Touch targets are designed to reach at least 44 by 44 CSS pixels.
- Layout remains usable at 200% zoom.
- Responsive visual reordering does not alter logical reading or keyboard order.
- Motion is optional, restrained, and removable.

## Site-Wide Continuity

The approved implementation language carries across the complete site. Reuse means preserving recognizable principles and components, not duplicating one page.

### Required Across Pages

- Luxe Event Co. remains the parent identity in the global shell, footer, metadata, and structured data.
- The fine ivory grid, approved typography, tracking, measures, spacing, rules, and surface rhythm remain consistent.
- Every page has one clear primary purpose and primary CTA, using the Phase 1 page contract.
- Internal links remain descriptive and contextual.
- Contextual inquiry panels adapt their heading, copy, and CTA to the active service or event.
- Signature modules appear where required by their placement rules and the page purpose.
- Meaningful content remains server-rendered, keyboard accessible, responsive, and available without motion.
- First-party imagery follows the division-specific photography direction.
- Approved proof, testimonials, and operational claims appear only where their context remains accurate.

### Contextualized Per Blueprint

- Hero composition, media treatment, and animation.
- Number and order of tonal chapters.
- Primary and secondary CTA language.
- Proof, testimonials, FAQs, inclusions, and operational details.
- Signature-module prominence and placement.
- Division and event imagery, crop, visual emphasis, and narrative pacing.

### Prohibited Reuse

- Copying the Home section sequence onto another page.
- Repeating the same inquiry heading and CTA everywhere.
- Alternating surfaces as a decorative formula.
- Turning signature elements into generic card grids.
- Reusing a claim, logo, quote, or recommendation where its evidence does not apply.

## Implementation Contract

The canonical machine-readable system is in `app/design-system.ts`.

The canonical CSS implementation is in `app/globals.css`:

- `--color-luxe-*` defines the palette.
- `--type-*` defines type scale and measures.
- `--space-*` defines rhythm.
- `--layout-*` defines container and grid limits.
- `--motion-*` and `--ease-*` define animation behaviour.
- `--surface-*` defines tonal chapter roles and dark-surface copy/rule treatment.
- `.type-*`, `.layout-*`, and `.surface-chapter*` provide reusable primitives.

Page blueprints created later in Phase 2 must identify which system roles they use. Any new colour, font, spacing interval, card pattern, or motion behaviour requires explicit addition to this document before production implementation.

## Step 2.1 Acceptance Check

- The five specified foundation colours are exact.
- Gold has an explicit accent-only rule.
- Display, body, and wordmark roles are differentiated.
- Responsive type sizes, line lengths, line heights, and tracking are defined.
- Spacing, container, and grid systems are defined.
- Photography, cropping, asymmetry, layering, and card usage have constraints.
- Mobile re-composition rules are explicit.
- Motion types, durations, easing, and prohibitions are explicit.
- Reduced motion and crawlable-content requirements are explicit.
- Accessibility contrast and focus rules are documented.
- Site-wide contrast roles, sequencing rules, and reuse boundaries are documented.
- The Phase 2 creative system is approved for local blueprint use; production
  release remains subject to the documented asset, content, inquiry, and
  accessibility gates.
