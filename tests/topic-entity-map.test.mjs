import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/topic-entity-map.ts", import.meta.url), "utf8");
const siteConfigSource = await readFile(new URL("../app/site-config.ts", import.meta.url), "utf8");

function includesEntity(name) {
  return source.includes(`"${name}"`) || siteConfigSource.includes(`"${name}"`);
}

test("contains the complete parent brand and division model", () => {
  assert.equal(includesEntity("Luxe Event Co."), true);
  assert.equal(includesEntity("Luxe Coffee Bar"), true);
  assert.equal(includesEntity("Luxe Sweet Cart"), true);
  assert.equal(includesEntity("Luxe Seating Rentals"), true);
});

test("contains every required core service and geographic context", () => {
  for (const name of [
    "Café Cart Experience",
    "Signature Coffee Bar Experience",
    "Espresso service",
    "Matcha service",
    "Seasonal beverages",
    "Mini Dutch pancakes",
    "Belgian waffles on a stick",
    "Mini donuts",
    "Soft serve",
    "Chairs",
    "Tables",
    "Cocktail tables",
    "Tents",
    "Linens",
    "Lighting",
    "Event setup and teardown",
    "Custom branding",
    "Signage",
    "Multi-service packages",
    "Toronto",
    "Greater Toronto Area",
    "Southern Ontario",
  ]) assert.equal(includesEntity(name), true, name);
  assert.equal(includesEntity("Hamilton"), false, "Hamilton");
});

test("maps the parent to divisions and divisions to services", () => {
  assert.match(source, /from: parentEntity\.slug, relation: "contains"/);
  assert.match(source, /from: service\.parentSlug \?\? parentEntity\.slug, relation: "offers"/);
  assert.match(source, /\["coffee-bar", \["weddings"/);
  assert.match(source, /\["sweet-cart", \["weddings"/);
  assert.match(source, /\["seating-rentals", \["weddings"/);
});

test("declares every planned content use", () => {
  assert.deepEqual([...source.matchAll(/"([a-z-]+)"/g)].filter(([, value]) => [
    "page-copy",
    "internal-linking",
    "structured-data",
    "faq-content",
    "image-captions",
    "metadata",
    "future-resource-content",
    "local-search-expansion",
  ].includes(value)).map(([, value]) => value), [
    "page-copy",
    "internal-linking",
    "structured-data",
    "faq-content",
    "image-captions",
    "metadata",
    "future-resource-content",
    "local-search-expansion",
  ]);
});
