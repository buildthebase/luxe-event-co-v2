import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const navigationSource = await readFile(
  new URL("../app/page-section-navigation.ts", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/page-section-navigation.tsx", import.meta.url),
  "utf8",
);

const expectedSections = {
  homeSectionNavigation: [
    "page-overview",
    "luxe-family",
    "experience-selector",
    "unified-experience",
    "event-types",
    "combinations",
    "contextual-imagery",
    "operational-proof",
    "working-with-luxe",
    "planning-journey",
    "service-area",
    "event-planning",
  ],
  experiencesSectionNavigation: [
    "page-overview",
    "experience-selector",
    "booking-approach",
    "experience-coffee",
    "experience-dessert",
    "experience-seating",
    "experience-comparison",
    "combinations",
    "event-types",
    "gallery",
    "planning-journey",
    "event-planning",
  ],
  eventsSectionNavigation: [
    "page-overview",
    "event-led-approach",
    "event-pathways",
    "combinations",
    "gallery",
    "planning-journey",
    "event-planning",
  ],
};

test("defines explicit, ordered, unique section navigation for each supported page", () => {
  for (const [arrayName, ids] of Object.entries(expectedSections)) {
    assert.match(navigationSource, new RegExp(`export const ${arrayName}`));
    assert.equal(new Set(ids).size, ids.length);

    let previousIndex = -1;
    for (const id of ids) {
      const index = navigationSource.indexOf(`id: "${id}"`, previousIndex + 1);
      assert.ok(index > previousIndex, `${id} should appear in ${arrayName} order`);
      previousIndex = index;
    }
  }
});

test("supports accessible dismissal, scroll tracking, deep links, and reduced motion", () => {
  assert.match(componentSource, /aria-expanded=\{isOpen\}/);
  assert.match(componentSource, /aria-controls="page-section-navigation-panel"/);
  assert.match(componentSource, /event\.key === "Escape"/);
  assert.match(componentSource, /pointerdown/);
  assert.match(componentSource, /aria-current=\{item\.id === activeId \? "location"/);
  assert.match(componentSource, /window\.history\.replaceState/);
  assert.match(componentSource, /prefers-reduced-motion: reduce/);
  assert.match(componentSource, /scrollIntoView/);
});
