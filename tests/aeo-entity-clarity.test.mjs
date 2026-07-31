import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  names,
  language,
  siteConfig,
  topicMap,
  schema,
  experiencesHub,
  activations,
  documentation,
] = await Promise.all([
  read("../app/entity-names.ts"),
  read("../app/entity-language.ts"),
  read("../app/site-config.ts"),
  read("../app/topic-entity-map.ts"),
  read("../app/schema-builders.ts"),
  read("../app/components/experiences-hub.tsx"),
  read("../app/components/brand-activations-page.tsx"),
  read("../docs/phase-4b-entity-clarity.md"),
]);

test("defines every canonical parent, division, service-format, and geography name", () => {
  for (const entity of [
    "Luxe Event Co.",
    "Luxe Coffee Bar",
    "Luxe Sweet Cart",
    "Luxe Seating Rentals",
    "Luxe Café Cart Experience",
    "Café Cart Experience",
    "Luxe Signature Coffee Bar Experience",
    "Signature Coffee Bar Experience",
    "Toronto",
    "Greater Toronto Area",
    "GTA",
    "Southern Ontario",
  ]) {
    assert.match(names, new RegExp(entity.replaceAll(".", "\\.")), entity);
  }
});

test("derives public contact, service areas, and event categories from site configuration", () => {
  assert.match(language, /email: siteConfig\.contact\.email/);
  assert.match(language, /phone: siteConfig\.contact\.phone/);
  assert.match(language, /phoneDisplay: siteConfig\.contact\.phoneDisplay/);
  assert.match(language, /website: siteConfig\.url/);
  assert.match(language, /approvedServiceAreas: siteConfig\.serviceAreas/);
  assert.match(language, /eventTypes\.map/);
});

test("states parent, division, and coffee-format relationships without a fixed-package claim", () => {
  assert.match(language, /Luxe Event Co\. is the parent organization behind Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals/);
  assert.match(language, /Each division can be requested independently/);
  assert.match(language, /without becoming a fixed package/);
  assert.match(language, /Café Cart Experience and Signature Coffee Bar Experience are service formats offered by Luxe Coffee Bar/);
  assert.match(topicMap, /Coordinated multi-service experiences/);
  assert.doesNotMatch(topicMap, /Multi-service packages/);
});

test("uses complete entity names when visible copy establishes relationships", () => {
  assert.match(
    experiencesHub,
    /Yes\. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals each/,
  );
  assert.match(
    experiencesHub,
    /Luxe Event Co\. is the parent company for all three divisions/,
  );
  assert.match(activations, /Luxe Event Co\. translates the brief/);
  assert.match(activations, /while Luxe Event Co\. coordinates/);
});

test("keeps prospect answers ahead of entity positioning", () => {
  assert.match(language, /Answer the prospect's industry, planning, commercial, or logistical question/);
  assert.match(language, /Name the factors that affect the answer/);
  assert.match(language, /Establish the relevant Luxe division or parent-brand relationship naturally/);
  assert.match(language, /Do not lead an industry-focused answer with a corporate relationship statement/);
  assert.match(language, /answerFirstViolations: \[\]/);
});

test("creates a controlled future parent-brand rename boundary", () => {
  assert.match(names, /nameStatus: "current-name-future-change-planned"/);
  assert.match(language, /status: "future-change-not-yet-approved"/);
  assert.match(language, /stableInternalKey: entityNames\.parentBrand\.stableKey/);
  assert.match(language, /canonical route structure/);
  assert.match(language, /organization schema fragment identifiers/);
  assert.match(language, /public organization name/);
  assert.match(language, /Google Business Profile, social, directory, and corporate-material references/);
  assert.match(language, /must not silently replace stable URLs or entity identifiers/);
});

test("preserves stable organization and division identifiers", () => {
  assert.ok(schema.includes('organizationId = `${siteConfig.url}/#organization`'));
  assert.ok(schema.includes('websiteId = `${siteConfig.url}/#website`'));
  assert.match(schema, /#coffee-bar-service/);
  assert.match(schema, /#sweet-cart-service/);
  assert.match(schema, /#seating-rentals-service/);
  assert.match(siteConfig, /organizationName = entityNames\.parentBrand\.currentName/);
});

test("documents the current-name decision and no-bloat boundary", () => {
  assert.match(documentation, /current name remains Luxe Event Co\./);
  assert.match(documentation, /No entity glossary or corporate-history section was added/);
  assert.match(documentation, /No new route or schema type was created/);
  assert.match(language, /newRoutes: \[\]/);
});
