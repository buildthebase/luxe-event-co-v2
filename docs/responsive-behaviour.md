# Step 2.3 Responsive Behaviour

## Governing Sources

- Luxe Event Co. Website Strategy, Design, Development, SEO and AEO Implementation Master Specification.
- Luxe Event Co. Complete Intake, July 2026.
- The established Step 2.1 visual system and approved page blueprints.

## Responsive Contract

Responsive behavior changes composition, not meaning. Every permanent route keeps the same primary content, headings, internal links, metadata, structured data, and inquiry path at every supported viewport. No important content is conditionally removed for mobile.

The global shell exposes Experiences, Events, Gallery, FAQ, and Inquire on desktop and through a native keyboard-accessible disclosure menu on mobile. The mobile menu is server-rendered, uses logical source order, and does not depend on JavaScript to open.

## Validation Matrix

| Class | Reference viewport | Required composition |
| --- | --- | --- |
| Small mobile | 320 x 700 | Single column, priority-led |
| Standard mobile | 390 x 844 | Single column, priority-led |
| Large mobile | 430 x 932 | Single column, priority-led |
| Tablet portrait | 768 x 1024 | Four-to-eight-column transition |
| Tablet landscape | 1024 x 768 | Reduced desktop composition |
| Standard laptop | 1366 x 768 | Twelve-column, short-height aware |
| Large desktop | 1440 x 900 | Twelve-column editorial |
| Ultrawide | 2560 x 1440 | Capped content with selective media bleed |

High-density displays use responsive image source selection and correctly sized poster assets rather than enlarging one fixed-resolution source.

## Non-Negotiable Checks

- No horizontal page scrolling.
- Content remains usable at 200% zoom.
- Primary CTAs stay visible and do not depend on hover.
- Touch controls target at least 44 x 44 CSS pixels.
- Focus remains visible on links, buttons, summaries, and menu controls.
- Source order remains the reading and keyboard order.
- Important headings and body copy are not hidden at narrow widths.
- Decorative spacing is reduced before readable type.
- Short landscape layouts remain operable without clipping.
- Reduced-motion mode removes non-essential transitions.

## Gallery

The first meaningful gallery image is requested eagerly with high fetch priority. Later images use native lazy loading. Responsive `sizes` guidance lets the browser select an appropriate source for mobile, tablet, and desktop. Filters remain accessible buttons, do not create indexable URL states, and use a contained horizontal rail on small screens rather than overflowing the page.

## Approved Home Exception

The Home hero CTA links are present in server-rendered HTML from the first response but reveal visually with the approved intro sequence. A keyboard-accessible Skip intro control and reduced-motion/data-saving behavior make the final state available immediately. This is an animation treatment, not mobile content removal.
