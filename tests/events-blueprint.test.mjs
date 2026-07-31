import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/events/page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(
  new URL("../app/metadata-config.ts", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/events-hub.tsx", import.meta.url),
  "utf8",
);
const contentSource = await readFile(
  new URL("../app/events/content.ts", import.meta.url),
  "utf8",
);
const signatureSource = await readFile(
  new URL("../app/signature-elements.ts", import.meta.url),
  "utf8",
);
const schemaSource = await readFile(
  new URL("../app/schema-builders.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/events-page-blueprint.md", import.meta.url),
  "utf8",
);

test("implements every required Events Hub chapter", () => {
  for (const component of [
    "EventsHero",
    "EventsApproach",
    "EventsDirectory",
    "CombinedExperienceFeature",
    "EventsGalleryPreview",
    "EventPlanningPathway",
    "ContextualInquiryPanel",
  ]) {
    assert.match(pageSource, new RegExp(`<${component}`), component);
  }
});

test("publishes all seven event-led pathways", () => {
  for (const event of [
    "Weddings",
    "Corporate Events",
    "Brand Activations",
    "Baby Showers",
    "Bridal Showers",
    "Birthdays",
    "Private Events",
  ]) {
    assert.match(contentSource, new RegExp(`name: "${event}"`), event);
  }
  assert.match(contentSource, /eventHubEntries: EventHubEntry\[\]/);
});

test("keeps the Events Hub concise without the redundant recommendation chapter", () => {
  assert.doesNotMatch(pageSource, /EventRecommendations/);
  assert.doesNotMatch(componentSource, /Recommended by occasion/);
  assert.doesNotMatch(componentSource, /The same experiences play different roles/);
  assert.doesNotMatch(contentSource, /recommendations:/);
  assert.doesNotMatch(contentSource, /\$\d|guaranteed availability/i);
});

test("answers cross-event flow and complete-setup planning questions", () => {
  assert.match(componentSource, /selected for a complete event setup/);
  assert.match(componentSource, /without turning\s+them into a fixed package/);
  assert.match(componentSource, /Guest flow around a coffee or dessert station/);
  assert.match(
    componentSource,
    /clear approach,\s+ordering point, waiting area, and exit/,
  );
});

test("implements event-specific metadata, schema, links, and conversion language", () => {
  assert.match(pageSource, /createPageMetadata\("\/events"\)/);
  assert.match(metadataSource, /Event Experiences by Occasion \| Luxe Event Co\./);
  assert.match(pageSource, /createCollectionPageSchema/);
  assert.match(schemaSource, /"@type": \["CollectionPage", "WebPage"\]/);
  assert.match(schemaSource, /"@type": "ItemList"/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.match(pageSource, /ContextualInquiryPanel id="event-planning" contextKey="events"/);
  assert.match(signatureSource, /heading: "Find your event experience\."/);
  assert.match(componentSource, /href="\/experiences"/);
  assert.match(componentSource, /href="\/gallery"/);
  assert.match(componentSource, /href=\{`\/events\/\$\{event\.slug\}`\}/);
});

test("preserves the visual system, contrast rhythm, and responsive recomposition", () => {
  assert.match(
    cssSource,
    /\.events-page > :where\([\s\S]*?width: min\(calc\(100% - \(2 \* var\(--space-page-inline\)\)\), var\(--layout-max\)\)/,
  );
  assert.match(cssSource, /\.events-approach/);
  assert.doesNotMatch(cssSource, /\.events-recommendations/);
  assert.match(cssSource, /@media \(max-width: 1050px\)[\s\S]*?\.events-directory-list article/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.events-hero/);
  assert.match(documentation, /master specification/i);
  assert.match(documentation, /client-submitted Luxe Event Co\. intake/i);
  assert.match(documentation, /No `Event` schema is used/);
});
