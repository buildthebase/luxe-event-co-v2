import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(new URL("../app/events/[slug]/page.tsx", import.meta.url), "utf8");
const componentSource = await readFile(new URL("../app/components/private-events-page.tsx", import.meta.url), "utf8");
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../app/events/private-events-content.ts", import.meta.url), "utf8");
const signatureSource = await readFile(new URL("../app/signature-elements.ts", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("routes Private Events to a complete page with unique metadata", () => {
  assert.match(routeSource, /slug === "private-events"/);
  assert.match(routeSource, /<PrivateEventsPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/private-events"/);
  assert.match(metadataSource, /Private Event Coffee, Dessert & Rentals \| Luxe Event Co\./);
});

test("implements every required Private Events section", () => {
  for (const component of [
    "PrivateEventsHero",
    "PrivateEventsOverview",
    "PrivateEventContexts",
    "PrivateEventExperiences",
    "PrivateEventCombinations",
    "PrivateEventGallery",
    "PrivateEventPlanning",
    "PrivateEventFaq",
    "ContextualInquiryPanel",
  ]) assert.match(componentSource, new RegExp(`<${component}`), component);
});

test("covers every specified private-event context", () => {
  for (const phrase of [
    "Engagement parties",
    "Anniversaries",
    "Graduations",
    "Religious and cultural celebrations",
    "Holiday gatherings",
    "Family celebrations",
    "Other milestone events",
  ]) assert.match(contentSource, new RegExp(phrase), phrase);
});

test("covers coffee, dessert, rentals, combinations, and planning requirements", () => {
  for (const phrase of [
    "Coffee and non-coffee possibilities",
    "Live dessert possibilities",
    "Rental possibilities",
    "Coffee + Dessert + Rentals",
    "Date, venue, and attendance",
    "Access and operating conditions",
  ]) assert.match(contentSource, new RegExp(phrase.replace(/[+]/g, "\\+")), phrase);
});

test("keeps the eyebrow in the hero and uses the exact primary CTA", () => {
  assert.match(componentSource, /Private Events \/ Toronto &amp; the GTA/);
  assert.doesNotMatch(componentSource, /className="foundation-label"/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
  assert.match(componentSource, /Discuss Your Event/);
  assert.match(signatureSource, /"private-events":[\s\S]*?cta: "Discuss Your Event"/);
});

test("publishes trust facts and links shared policy without duplicating it", () => {
  assert.doesNotMatch(contentSource, /30% non-refundable retainer/);
  assert.match(componentSource, /href="\/faq"/);
  assert.match(componentSource, /\$5 million/);
  assert.match(contentSource, /select larger events elsewhere in Southern Ontario/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /unlimited|guaranteed capacity|all cultural/i);
});

test("implements Service, WebPage, and BreadcrumbList without Event schema", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(schemaSource, /"@type": "Service"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(componentSource, /"@type": "Event"/);
});

test("uses shared H1 and section-heading scales responsively", () => {
  assert.match(componentSource, /<span>Private event experiences<\/span>/);
  assert.match(componentSource, /<span>without a standard format\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.private-hero-copy h1/);
  assert.match(cssSource, /\.private-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1\)/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.private-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1-mobile\)/);
});
