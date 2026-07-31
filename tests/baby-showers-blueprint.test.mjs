import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/events/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/baby-showers-page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(
  new URL("../app/events/baby-showers-content.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);

test("routes Baby Showers to a complete page with unique metadata", () => {
  assert.match(routeSource, /slug === "baby-showers"/);
  assert.match(routeSource, /<BabyShowersPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/baby-showers"/);
  assert.match(metadataSource, /Baby Shower Coffee, Dessert & Rentals \| Luxe Event Co\./);
});

test("implements every required Baby Showers section", () => {
  for (const component of [
    "BabyShowerHero",
    "BabyShowerOverview",
    "BabyShowerExperiences",
    "BabyShowerStyling",
    "BabyShowerSettings",
    "BabyShowerCombinations",
    "BabyShowerGallery",
    "BabyShowerPlanning",
    "BabyShowerFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("keeps the only Baby Showers eyebrow in the hero", () => {
  assert.match(componentSource, /Baby Showers \/ Toronto &amp; the GTA/);
  assert.doesNotMatch(componentSource, /className="foundation-label"/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
});

test("covers the three divisions, customization, and indoor-outdoor planning", () => {
  for (const phrase of [
    "Coffee and matcha",
    "Live dessert",
    "Seating and rentals",
    "Menus and drink details",
    "Signage and presentation",
    "Indoor gatherings",
    "Outdoor gatherings",
    "Café Cart + Sweet Cart",
    "Coffee + Dessert + Rentals",
  ]) {
    assert.match(contentSource, new RegExp(phrase.replace(/[+]/g, "\\+")), phrase);
  }
});

test("keeps operational statements factual and qualified", () => {
  assert.doesNotMatch(contentSource, /Is setup and takedown included/);
  assert.match(componentSource, /href="\/faq"/);
  assert.match(contentSource, /weather exposure, ground conditions, shelter, utilities/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /guaranteed|all-weather/i);
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
  assert.match(componentSource, /Plan a Baby Shower/);
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

test("uses the shared internal H1 contract and responsive recomposition", () => {
  assert.match(componentSource, /<span>Baby shower<\/span>/);
  assert.match(componentSource, /<span>experiences,<\/span>/);
  assert.match(componentSource, /<span>thoughtfully gathered\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.baby-hero-copy h1/);
  assert.match(cssSource, /@media \(max-width: 840px\)[\s\S]*?\.baby-hero/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.baby-hero-proof/);
});

test("keeps primary section headings at or below the internal hero scale", () => {
  assert.match(
    cssSource,
    /\.baby-overview h2,[\s\S]*?\.baby-faq h2\s*\{[\s\S]*?font-size: var\(--type-internal-page-h1\);[\s\S]*?line-height: 0\.88/,
  );
  assert.doesNotMatch(
    cssSource,
    /\.baby-overview h2,[\s\S]*?\.baby-faq h2\s*\{[\s\S]*?font-size: clamp\(3rem, 6\.5vw, 7rem\)/,
  );
});
