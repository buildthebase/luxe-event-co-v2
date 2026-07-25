import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(new URL("../app/events/[slug]/page.tsx", import.meta.url), "utf8");
const componentSource = await readFile(new URL("../app/components/bridal-showers-page.tsx", import.meta.url), "utf8");
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../app/events/bridal-showers-content.ts", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("routes Bridal Showers to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "bridal-showers"/);
  assert.match(routeSource, /<BridalShowersPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/bridal-showers"/);
  assert.match(metadataSource, /Bridal Shower Coffee, Dessert & Rentals \| Luxe Event Co\./);
});

test("implements every required Bridal Showers section", () => {
  for (const component of [
    "BridalHero",
    "BridalOverview",
    "BridalExperiences",
    "BridalDetails",
    "BridalCombinations",
    "BridalGallery",
    "BridalFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("keeps the only Bridal Showers eyebrow in the hero", () => {
  assert.match(componentSource, /Bridal Showers \/ Toronto &amp; the GTA/);
  assert.doesNotMatch(componentSource, /className="foundation-label"/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
});

test("covers café, matcha, dessert, rentals, signage, and floral styling", () => {
  for (const phrase of [
    "Café-style coffee service",
    "Matcha and specialty beverages",
    "Live dessert",
    "Seating and rentals",
    "Custom menus",
    "Event signage",
    "Floral styling",
    "Room styling",
  ]) {
    assert.match(contentSource, new RegExp(phrase), phrase);
  }
});

test("qualifies styling and rental scope rather than inventing packages", () => {
  assert.match(contentSource, /final direction, sourcing, installation, timing, and responsibilities/);
  assert.match(contentSource, /Inventory, quantities, delivery, setup, teardown, pickup/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /included floral package|unlimited florals|guaranteed/i);
});

test("implements required links and the exact primary CTA", () => {
  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/gallery",
    "/faq",
    "/inquire",
  ]) {
    assert.match(`${componentSource}\n${contentSource}`, new RegExp(`href:\\s*"${href}"|href="${href}"`), href);
  }
  assert.match(componentSource, /Plan a Bridal Shower/);
});

test("implements Service, WebPage, and BreadcrumbList without Event schema", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(schemaSource, /"@type": "Service"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(componentSource, /"@type": "Event"/);
  assert.doesNotMatch(componentSource, /"@type": "Product"/);
  assert.doesNotMatch(componentSource, /"@type": "Offer"/);
});

test("uses the shared hero-scale ceiling for H1 and primary section headings", () => {
  assert.match(componentSource, /<span>Bridal shower experiences<\/span>/);
  assert.match(componentSource, /<span>with their own point of view\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.bridal-hero-copy h1/);
  assert.match(cssSource, /\.bridal-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1\)/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.bridal-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1-mobile\)/);
});
