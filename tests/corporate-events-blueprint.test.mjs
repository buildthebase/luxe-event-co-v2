import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/events/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/corporate-events-page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(
  new URL("../app/events/corporate-events-content.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/corporate-events-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Corporate Events to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "corporate-events"/);
  assert.match(routeSource, /<CorporateEventsPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/corporate-events"/);
  assert.match(metadataSource, /Corporate Coffee & Event Experiences \| Luxe Event Co\./);
});

test("implements every required Corporate Events content chapter", () => {
  for (const component of [
    "CorporateHero",
    "CorporateOverview",
    "CorporateCapabilities",
    "CorporateExperiences",
    "CorporateBranding",
    "CorporateScale",
    "CorporateTrust",
    "CorporateGallery",
    "CorporatePlanning",
    "CorporateFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("keeps section eyebrows exclusive to the Corporate hero", () => {
  for (const removedEyebrow of [
    "Corporate hospitality, planned around the room",
    "Where Luxe can work",
    "Three operational roles",
    "Brand capability",
    "Scale without losing the details",
    "Confirmed corporate proof",
    "Corporate work in context",
    "Operational planning",
    "Corporate planning questions",
  ]) {
    assert.doesNotMatch(componentSource, new RegExp(removedEyebrow), removedEyebrow);
  }
  assert.match(componentSource, /Corporate Events \/ Toronto &amp; the GTA/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
});

test("covers every required corporate event application and all three divisions", () => {
  for (const phrase of [
    "Employee appreciation",
    "Client appreciation",
    "Conferences and trade shows",
    "Office pop-up cafés",
    "Networking events",
    "Grand openings",
    "Holiday events",
    "Real estate and developer events",
    "Institutional and university events",
    "Luxe Coffee Bar",
    "Luxe Sweet Cart",
    "Luxe Seating Rentals",
  ]) {
    assert.match(contentSource, new RegExp(phrase), phrase);
  }
});

test("answers every required Corporate Events AEO question visibly", () => {
  for (const question of [
    "Which corporate events does Luxe support?",
    "Can a corporate event be branded?",
    "Can Luxe support multiple setups?",
    "Can Luxe support multi-day corporate events?",
    "Can Luxe support recurring corporate programs?",
    "What guest capacities can Luxe handle?",
    "Can coffee, dessert, and rentals be combined?",
    "How should coffee catering be planned for a corporate event?",
    "Which organizations has Luxe served?",
  ]) {
    assert.match(contentSource, new RegExp(question.replace(/[?]/g, "\\?")), question);
  }
});

test("uses confirmed corporate operating facts with appropriate qualification", () => {
  assert.match(contentSource, /up to 500 guests/i);
  assert.match(contentSource, /up to 400 guests/i);
  assert.match(contentSource, /up to three simultaneous Coffee Bar setups/i);
  assert.match(contentSource, /up to three simultaneous Sweet Cart setups/i);
  assert.match(contentSource, /Multi-day requests require operating confirmation/);
  assert.match(contentSource, /Recurring programs require operating confirmation/);
  assert.doesNotMatch(contentSource, /Multi-day work is supported|support recurring events/);
  assert.match(componentSource, /\$5 million liability insurance/);
  assert.match(contentSource, /subject to date availability/i);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /unlimited|guaranteed capacity|guaranteed availability/i);
});

test("renders every approved organization while permission-gating case studies", () => {
  for (const organization of [
    "OPTrust",
    "CST Savings",
    "Convergint",
    "ICNA Canada",
    "Waste Connections of Canada",
  ]) {
    assert.match(contentSource, new RegExp(organization), organization);
  }
  assert.match(componentSource, /awaiting-approved-corporate-assets/);
  assert.match(componentSource, /subject to\s+separate client approval/);
});

test("implements required internal links and the corporate CTA", () => {
  for (const href of [
    "/events",
    "/events/brand-activations",
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/gallery",
    "/faq",
    "/inquire",
  ]) {
    assert.match(componentSource, new RegExp(`href="${href}"`), href);
  }
  assert.match(componentSource, /Discuss a Corporate Event/);
});

test("implements Service, WebPage, and BreadcrumbList without inappropriate schema", () => {
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
    /\.corporate-page > :where\([\s\S]*?width: min\(calc\(100% - \(2 \* var\(--space-page-inline\)\)\), var\(--layout-max\)\)/,
  );
  assert.match(cssSource, /@media \(max-width: 1100px\)[\s\S]*?\.corporate-capabilities ol/);
  assert.match(cssSource, /@media \(max-width: 840px\)[\s\S]*?\.corporate-hero/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.corporate-planning ol/);
  assert.match(documentation, /master specification/i);
  assert.match(documentation, /client-submitted Luxe Event Co\. intake/i);
});
