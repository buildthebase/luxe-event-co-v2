import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/experiences/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/seating-rentals-page.tsx", import.meta.url),
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
  new URL("../app/experiences/seating-rentals-content.ts", import.meta.url),
  "utf8",
);
const localSeoSource = await readFile(
  new URL("../app/local-seo.ts", import.meta.url),
  "utf8",
);
const siteConfigSource = await readFile(
  new URL("../app/site-config.ts", import.meta.url),
  "utf8",
);
const signatureSource = await readFile(
  new URL("../app/signature-elements.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/seating-rentals-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Seating Rentals to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "seating-rentals"/);
  assert.match(routeSource, /return <SeatingRentalsPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/experiences\/seating-rentals"/);
  assert.match(metadataSource, /Event & Seating Rentals in Toronto \| Luxe Seating Rentals/);
});

test("implements every required Seating Rentals content chapter", () => {
  for (const component of [
    "SeatingHero",
    "SeatingOverview",
    "RentalCategories",
    "AdditionalInventoryBoundary",
    "LayoutInspiration",
    "RentalOperations",
    "IndoorOutdoorApplications",
    "RentalQuote",
    "RentalEvents",
    "RentalGallery",
    "RentalCombinations",
    "RentalServiceArea",
    "RentalFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("publishes only the six confirmed rental categories", () => {
  for (const category of [
    "Chairs",
    "Tables",
    "Cocktail Tables",
    "Tents",
    "Linens",
    "Lighting",
  ]) {
    assert.match(contentSource, new RegExp(`name: "${category}"`), category);
  }

  assert.match(componentSource, /06/);
  assert.match(componentSource, /Confirmed rental categories/);
  assert.match(componentSource, /\$5M/);
  assert.match(documentation, /Only the six confirmed rental categories/);
});

test("answers every required Seating Rentals AEO question visibly", () => {
  for (const answerSignal of [
    "Which rental items are available?",
    "Does Luxe deliver rentals?",
    "Is rental setup included?",
    "Is rental teardown included?",
    "Can rentals be combined with coffee or dessert?",
    "Which areas does Luxe serve?",
    "Are travel or delivery fees applicable?",
    "Can Luxe rentals be used outdoors?",
    "What information is required for a rental quote?",
  ]) {
    assert.match(contentSource, new RegExp(answerSignal.replaceAll("?", "\\?")));
  }
});

test("preserves all approved geographic references", () => {
  assert.match(contentSource, /approvedBusinessIdentity\.primaryServiceAreas/);
  for (const area of [
    "Toronto",
    "Scarborough",
    "Etobicoke",
    "North York",
    "Markham",
    "Vaughan",
    "Richmond Hill",
    "Aurora",
    "Newmarket",
    "King City",
    "Thornhill",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Burlington",
    "Milton",
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
  ]) {
    assert.match(siteConfigSource, new RegExp(`"${area}"`), area);
  }
  assert.match(contentSource, /"Greater Toronto Area"/);
  assert.match(contentSource, /"Southern Ontario"/);
  assert.match(localSeoSource, /primaryServiceAreas: siteConfig\.serviceAreas/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(siteConfigSource, /"Hamilton"/);
});

test("does not invent inventory quantities or universal rental logistics", () => {
  assert.match(contentSource, /does not define one universal delivery policy/);
  assert.match(contentSource, /not presented as universally included/);
  assert.match(
    componentSource,
    /does not yet\s+identify approved item types, models, quantities/,
  );
  assert.match(documentation, /Accurate inventory quantities/);
  assert.match(documentation, /Damage, loss, replacement, cancellation/);
  assert.doesNotMatch(contentSource, /\b\d+\s+(chairs|tables|tents|linens)\b/i);
  assert.doesNotMatch(contentSource, /\$\d+|per chair|per table|delivery included/i);
});

test("implements Service, WebPage, and BreadcrumbList without product commerce schema", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(componentSource, /divisionServiceIds\.seating/);
  assert.match(schemaSource, /provider: \{ "@id": organizationId \}/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.doesNotMatch(componentSource, /"@type": "Product"/);
  assert.doesNotMatch(componentSource, /"@type": "Offer"/);
  assert.doesNotMatch(componentSource, /"@type": "FAQPage"/);
  assert.match(documentation, /does not implement:[\s\S]*`Product`/);
});

test("keeps Seating distinct while linking to the Luxe family and event journeys", () => {
  assert.match(componentSource, /\/experiences\/coffee-bar/);
  assert.match(componentSource, /\/experiences\/sweet-cart/);
  assert.match(componentSource, /rentalEventLinks\.map/);
  assert.match(componentSource, /\/gallery/);
  assert.match(componentSource, /contextKey="seating-rentals"/);
  assert.match(signatureSource, /Discuss Your Rental Requirements/);
  assert.match(cssSource, /\.seating-hero-plan/);
  assert.match(cssSource, /\.seating-inventory-grid/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.seating-page/);
});
