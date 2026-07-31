import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/experiences/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/coffee-bar-page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(
  new URL("../app/metadata-config.ts", import.meta.url),
  "utf8",
);
const schemaSource = await readFile(
  new URL("../app/schema-builders.ts", import.meta.url),
  "utf8",
);
const contentSource = await readFile(
  new URL("../app/experiences/coffee-bar-content.ts", import.meta.url),
  "utf8",
);
const entityNamesSource = await readFile(
  new URL("../app/entity-names.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/coffee-bar-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Coffee Bar to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "coffee-bar"/);
  assert.match(routeSource, /return <CoffeeBarPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/experiences\/coffee-bar"/);
  assert.match(metadataSource, /Mobile Coffee Bar in Toronto \| Luxe Coffee Bar/);
});

test("implements every required Coffee Bar content chapter", () => {
  for (const component of [
    "CoffeeHero",
    "CoffeeOverview",
    "CoffeeFormats",
    "CoffeeInclusions",
    "CoffeeMenu",
    "CoffeeCustomization",
    "CoffeeOperations",
    "CoffeeEvents",
    "CoffeeGallery",
    "CredibilityStrip",
    "CoffeeRelated",
    "CoffeeFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("uses verified coffee formats, inclusions, menus, and capacity", () => {
  assert.match(entityNamesSource, /Luxe Café Cart Experience/);
  assert.match(entityNamesSource, /Luxe Signature Coffee Bar Experience/);
  assert.match(contentSource, /Professional barista service/);
  assert.match(contentSource, /Hot and iced beverages/);
  assert.match(contentSource, /Dairy and premium milk alternatives/);
  assert.match(contentSource, /Luxe Spanish Latte/);
  assert.match(contentSource, /Ceremonial Matcha Latte/);
  assert.match(contentSource, /Iced Spanish Latte/);
  assert.match(componentSource, /Up to 500/);
  assert.match(componentSource, /up to three simultaneous setups/);
  assert.match(componentSource, /\$5M/);
});

test("answers every required Coffee Bar AEO question visibly", () => {
  for (const answerSignal of [
    "What is included with a Luxe Coffee Bar booking?",
    "What is the difference between the two coffee experiences?",
    "Are iced drinks included?",
    "Is matcha available?",
    "Are milk alternatives available?",
    "Can the menu, cups, and signage be customized?",
    "How many guests can Luxe Coffee Bar serve?",
    "Is setup and teardown included?",
    "Does Luxe Coffee Bar travel outside Toronto?",
    "What space, power, or water access is required?",
  ]) {
    assert.match(contentSource, new RegExp(answerSignal.replaceAll("?", "\\?")));
  }
});

test("answers priority mobile coffee discovery questions without another section", () => {
  assert.match(componentSource, /A mobile coffee bar brings café equipment/);
  assert.match(componentSource, /Mobile espresso catering begins with the event brief/);
  assert.match(componentSource, /Baristas prepare drinks on-site/);
  assert.match(componentSource, /Mobile coffee catering can suit weddings/);
  assert.match(componentSource, /conferences, brand activations, showers, birthdays/);
});

test("compares coffee service options neutrally on existing surfaces", () => {
  assert.match(contentSource, /traditional coffee catering/);
  assert.match(contentSource, /venue coffee service/);
  assert.match(contentSource, /speed and simplicity matter most/);
  assert.match(contentSource, /integrated with the venue's catering team/);
  assert.match(componentSource, /available space, menu/);
});

test("answers coffee pricing directly without inventing a fixed rate", () => {
  assert.match(contentSource, /How much does mobile coffee catering cost/);
  assert.match(contentSource, /Mobile coffee catering is priced from/);
  assert.match(contentSource, /Guest count and duration both matter/);
  assert.doesNotMatch(contentSource, /\$\d+.*(?:per guest|per hour|starting)/i);
});

test("does not invent deferred utility or service-rate specifications", () => {
  assert.match(contentSource, /Requirements depend on the selected coffee format/);
  assert.match(contentSource, /no universal utility or space specification should be assumed/);
  assert.doesNotMatch(contentSource, /drinks per hour|amps|volts|gallons|square feet/i);
  assert.match(documentation, /does not yet confirm one universal footprint/);
});

test("implements required Coffee Bar schema and parent provider connection", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(componentSource, /divisionServiceIds\.coffee/);
  assert.match(schemaSource, /provider: \{ "@id": organizationId \}/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.match(schemaSource, /"@type": "FAQPage"/);
  assert.match(componentSource, /faqs: coffeeFaqs/);
  assert.match(documentation, /does not guarantee a Google FAQ rich result/);
});

test("keeps Coffee distinct while linking to the Luxe family and event journeys", () => {
  assert.match(componentSource, /\/experiences\/sweet-cart/);
  assert.match(componentSource, /\/experiences\/seating-rentals/);
  assert.match(componentSource, /coffeeEventLinks\.map/);
  assert.match(componentSource, /\/gallery/);
  assert.match(componentSource, /\/faq/);
  assert.match(componentSource, /contextKey="coffee-bar"/);
  assert.match(cssSource, /\.coffee-format-cafe-cart/);
  assert.match(cssSource, /\.coffee-format-signature-bar/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.coffee-page/);
});
