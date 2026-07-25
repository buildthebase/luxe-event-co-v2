import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/experiences/page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(
  new URL("../app/metadata-config.ts", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/experiences-hub.tsx", import.meta.url),
  "utf8",
);
const contentSource = await readFile(
  new URL("../app/experiences/content.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const schemaSource = await readFile(
  new URL("../app/schema-builders.ts", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/experiences-page-blueprint.md", import.meta.url),
  "utf8",
);

test("implements every required Experiences Hub section", () => {
  for (const component of [
    "ExperiencesHero",
    "ExperienceSelector",
    "ExperiencesBookingClarity",
    "ExperienceFeatures",
    "ExperienceNeedComparison",
    "CombinedExperienceFeature",
    "ExperiencesEventTypes",
    "ExperiencesGalleryPreview",
    "EventPlanningPathway",
    "ContextualInquiryPanel",
  ]) {
    assert.match(pageSource, new RegExp(`<${component}`), component);
  }
});

test("keeps each division operationally and visually differentiated", () => {
  assert.match(contentSource, /A café experience, composed for the event\./);
  assert.match(contentSource, /Café Cart or Signature Coffee Bar/);
  assert.match(contentSource, /fact: "Up to 500"/);
  assert.match(contentSource, /Dessert prepared in the room/);
  assert.match(contentSource, /Mini Dutch pancakes/);
  assert.match(contentSource, /fact: "Up to 400"/);
  assert.match(contentSource, /The setting that gives the gathering its shape\./);
  assert.match(contentSource, /Chairs and tables/);
  assert.match(contentSource, /fact: "Room first"/);
  assert.doesNotMatch(
    contentSource.match(/id: "seating"[\s\S]*?(?=\n  \},\n\] as const)/)?.[0] ?? "",
    /Up to \d+|guest capacity/,
  );

  for (const visual of [
    "experiences-feature-coffee",
    "experiences-feature-dessert",
    "experiences-feature-seating",
  ]) {
    assert.match(cssSource, new RegExp(`\\.${visual}`), visual);
  }
});

test("answers independent and combined booking questions in visible content", () => {
  assert.match(componentSource, /Can each experience be booked independently\?/);
  assert.match(componentSource, /Yes\. Coffee Bar, Sweet Cart, and Seating Rentals/);
  assert.match(componentSource, /Can multiple Luxe experiences be combined\?/);
  assert.match(componentSource, /Coffee and dessert are frequently booked together/);
});

test("provides the required search entities, links, and schema", () => {
  assert.match(pageSource, /createPageMetadata\("\/experiences"\)/);
  assert.match(metadataSource, /Coffee, Dessert & Seating Experiences/);
  assert.match(pageSource, /createCollectionPageSchema/);
  assert.match(schemaSource, /"@type": \["CollectionPage", "WebPage"\]/);
  assert.match(schemaSource, /"@type": "ItemList"/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.match(componentSource, /eventTypes\.map/);
  assert.match(componentSource, /href=\{`\/events\/\$\{event\.slug\}`\}/);
  assert.match(componentSource, /href="\/gallery"/);
  assert.match(pageSource, /ContextualInquiryPanel contextKey="experiences"/);
});

test("documents the governing facts, content boundary, and responsive treatment", () => {
  assert.match(documentation, /master specification/i);
  assert.match(documentation, /client-submitted Luxe Brands intake form/i);
  assert.match(documentation, /No unsupported capacity claim is made/);
  assert.match(documentation, /does not reproduce the complete inclusions/);
  assert.match(documentation, /Mobile recomposes every grid/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.experiences-feature/);
});
