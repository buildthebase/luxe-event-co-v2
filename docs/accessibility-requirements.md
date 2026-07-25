# Step 2.4 Accessibility Requirements

## Standard and scope

Luxe Event Co. is designed toward WCAG 2.2 Level AA across every permanent route and responsive composition. The master specification and the client intake remain the governing business references. Accessibility changes presentation and interaction where necessary, but not the approved page purpose, content, search intent, or parent-brand architecture.

## Global implementation

- The document language is `en-CA`.
- Every page uses a labelled primary navigation, one main content target, and a content-info footer.
- A first-focus “Skip to main content” link bypasses repeated navigation.
- Every page has one H1 and a logical heading hierarchy.
- Current navigation state is programmatically exposed and underlined, so it is not communicated by colour alone.
- Desktop and mobile navigation expose the same destinations.
- Keyboard focus remains visible on links, buttons, summaries, and other interactive controls.
- Functional targets are designed to reach at least 44 by 44 CSS pixels.
- Responsive visual reordering must preserve logical DOM, reading, and focus order.

## Colour and typography

The approved `#C8A97E` champagne gold and `#7A7A7A` warm grey remain part of the visual foundation. They are not used for small text on the ivory page field because they do not meet the 4.5:1 text contrast requirement.

- Primary text: `#1F1F1F`.
- Muted text: `#595754`, approximately 6.67:1 on ivory and 4.64:1 on soft taupe.
- Gold-toned text: `#695438`, approximately 6.65:1 on ivory and 4.63:1 on soft taupe.
- Gold-toned text on dark fields: `#DEC297`, approximately 5.08:1 on warm dark and 9.63:1 on matte black.
- Literal champagne gold remains available for decorative rules, large shapes, and non-text accents.
- Dark chapters locally use the lighter champagne tint and muted ivory because those combinations retain AA contrast.

Information and state must never depend on colour alone.

## Navigation, disclosures, and filters

- The mobile menu and FAQ accordions use native `details` and `summary` controls.
- Gallery filters use native buttons with `aria-pressed` and an `aria-controls` relationship to the gallery results.
- Gallery result totals use a polite live status so a filter change is announced.
- Link copy names its destination or action; generic link text is not used.
- Links that open Instagram in a new tab include that behavior in their accessible name.

## Images and video

- Meaningful images require concise alternative text based on the actual service, event, action, and setting shown.
- Decorative images use an empty alt attribute or are excluded from the accessibility tree.
- Captions may add event context but do not replace alternative text.
- Home hero films are muted, decorative atmosphere. The complete service meaning is present as adjacent server-rendered text.
- No media may autoplay audio.
- If a future film communicates information not available in page copy, publication requires synchronized captions and a transcript or equivalent adjacent alternative.
- Reduced-motion and data-saving modes resolve the cinematic hero to a stable state without withholding content or actions.

## Forms, errors, and status

The current website prepares visitors for an approved third-party inquiry handoff and does not contain native inquiry fields. If fields are introduced later:

- Every field requires a persistent visible label.
- Instructions, required state, and format requirements must be available before submission.
- Errors must be described in text, associated with their fields, and summarized at the top.
- Focus must move to the error summary after a failed submission.
- Success and error outcomes must be announced with appropriate status or alert semantics.
- Privacy and consent context must appear before submission where required.

## Verification gate

Before production approval:

1. Test every route with keyboard only.
2. Verify the skip link, navigation, disclosures, filters, and inquiry actions.
3. Verify semantic landmarks, heading hierarchy, accessible names, and states.
4. Check mobile layouts and 200 percent zoom for page-level horizontal overflow.
5. Check text, control, focus, and meaningful graphic contrast.
6. Check reduced-motion and missing-media fallback behavior.
7. Re-audit final photography, video, third-party embeds, and the production inquiry handoff.

Automated checks support this gate but do not replace keyboard, screen-reader, zoom, and visual review.
