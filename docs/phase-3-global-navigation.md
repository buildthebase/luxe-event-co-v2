# Phase 3.3 Global Navigation

## Architecture

`app/navigation-config.ts` is the route hierarchy for global navigation. It
derives division and event children from the typed site configuration so page
URLs and menu URLs cannot drift.

Desktop and mobile render the same destinations:

- Home.
- Experiences and all three division pages.
- Events and all seven event pages.
- Gallery.
- FAQ.
- Inquire.

## Interaction Contract

- Every destination is a normal server-rendered HTML link.
- Desktop experience and event groups use native `details` disclosures.
- Opening one desktop disclosure closes its sibling.
- Escape closes the active disclosure and returns focus to its trigger.
- Pointer interaction outside the desktop navigation dismisses open menus.
- Mobile presents the complete hierarchy in a scrollable navigation surface.
- Opening mobile navigation locks body scrolling without removing menu scroll.
- Escape closes mobile navigation and returns focus to its trigger.
- Selecting a mobile destination closes the menu.
- Exact pages use `aria-current="page"`; parent hubs use
  `aria-current="location"` while a child page is active.
- Focus remains visible, touch targets meet the shared minimum, and Inquire
  retains a distinct restrained treatment.

No menu relies on hover, JavaScript-generated URLs, or client-only route data
for discovery.
