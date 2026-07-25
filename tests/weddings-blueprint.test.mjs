import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/events/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/weddings-page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(
  new URL("../app/events/weddings-content.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/weddings-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Weddings to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "weddings"/);
  assert.match(routeSource, /<WeddingsPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/weddings"/);
  assert.match(metadataSource, /Wedding Coffee, Dessert & Rentals \| Luxe Event Co\./);
});

test("implements every required Weddings content chapter", () => {
  for (const component of [
    "WeddingHero",
    "WeddingOverview",
    "WeddingDay",
    "WeddingExperiences",
    "WeddingCombinations",
    "WeddingCustomization",
    "WeddingCoordination",
    "WeddingGallery",
    "WeddingFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("withholds wedding testimonials until publishable quotations exist", () => {
  assert.doesNotMatch(componentSource, /WeddingTestimonials|awaiting-approved-wedding-testimonials/);
});

test("covers the complete wedding timeline and all three Luxe divisions", () => {
  for (const phrase of [
    "Before the ceremony",
    "Cocktail hour",
    "Reception",
    "Dessert",
    "Late night",
    "The morning after",
    "Luxe Coffee Bar",
    "Luxe Sweet Cart",
    "Luxe Seating Rentals",
  ]) {
    assert.match(contentSource, new RegExp(phrase), phrase);
  }
});

test("answers every required Weddings AEO question visibly", () => {
  for (const question of [
    "Can Luxe provide coffee service for weddings?",
    "Which stages of a wedding can Luxe serve?",
    "Can coffee and dessert be booked together?",
    "Can seating and rentals be included?",
    "Can wedding menus, cups, and signage be customized?",
    "How early should couples book?",
    "Is a retainer required?",
    "Does Luxe coordinate with wedding planners and venues?",
    "Does Luxe travel outside Toronto?",
  ]) {
    assert.match(contentSource, new RegExp(question.replace(/[?]/g, "\\?")), question);
  }
});

test("uses confirmed policy and trust facts without inventing deferred details", () => {
  assert.match(contentSource, /30% non-refundable retainer/);
  assert.match(contentSource, /remaining balance is due seven days before the event/);
  assert.match(componentSource, /Three divisions/);
  assert.match(componentSource, /\$5 million liability insurance/);
  assert.match(contentSource, /select destination weddings throughout Southern Ontario/);
  assert.match(contentSource, /No universal lead time is promised/);
  assert.match(componentSource, /No universal footprint, utility, outdoor/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /guaranteed availability|\$\d{3,}/i);
});

test("keeps unapproved wedding media gated and testimonials unpublished", () => {
  assert.match(componentSource, /awaiting-approved-photography/);
  assert.doesNotMatch(componentSource, /awaiting-approved-wedding-testimonials/);
  assert.doesNotMatch(componentSource, /No quotation, couple name, venue, or\s+rating/);
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

test("preserves page containment and responsive recomposition", () => {
  assert.match(
    cssSource,
    /\.wedding-page > :where\([\s\S]*?width: min\(calc\(100% - \(2 \* var\(--space-page-inline\)\)\), var\(--layout-max\)\)/,
  );
  assert.match(cssSource, /@media \(max-width: 1100px\)[\s\S]*?\.wedding-experiences > div/);
  assert.match(cssSource, /@media \(max-width: 780px\)[\s\S]*?\.wedding-hero/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.wedding-day li/);
  assert.match(documentation, /master specification/i);
  assert.match(documentation, /client-submitted Luxe Event Co\. intake/i);
});
