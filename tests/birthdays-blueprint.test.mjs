import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(new URL("../app/events/[slug]/page.tsx", import.meta.url), "utf8");
const componentSource = await readFile(new URL("../app/components/birthdays-page.tsx", import.meta.url), "utf8");
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../app/events/birthdays-content.ts", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("routes Birthdays to a complete page with unique metadata", () => {
  assert.match(routeSource, /slug === "birthdays"/);
  assert.match(routeSource, /<BirthdaysPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/birthdays"/);
  assert.match(metadataSource, /Birthday Dessert & Coffee Experiences \| Luxe Event Co\./);
});

test("implements every required Birthdays section", () => {
  for (const component of [
    "BirthdayHero", "BirthdayOverview", "BirthdayContexts", "BirthdayExperiences",
    "BirthdayPersonalization", "BirthdayCombinations", "BirthdayGallery",
    "BirthdayFaq", "ContextualInquiryPanel",
  ]) assert.match(componentSource, new RegExp(`<${component}`), component);
});

test("prioritizes milestones and adults while qualifying children's events", () => {
  for (const phrase of ["Milestone birthdays", "Adult celebrations", "Family events", "Children’s events"]) {
    assert.match(contentSource, new RegExp(phrase), phrase);
  }
  assert.match(contentSource, /without reframing the brand as a children’s-party service/);
});

test("covers menus, dessert, rentals, signage, and combinations", () => {
  for (const phrase of [
    "Coffee and non-coffee menus", "Live dessert", "Rentals and the room",
    "Custom signage", "Signature Coffee Bar + personalized menu",
    "Sweet Cart + custom signage", "Coffee + Dessert + Rentals",
  ]) assert.match(contentSource, new RegExp(phrase.replace(/[+]/g, "\\+")), phrase);
});

test("keeps the eyebrow in the hero and uses the exact CTA", () => {
  assert.match(componentSource, /Birthdays \/ Toronto &amp; the GTA/);
  assert.doesNotMatch(componentSource, /className="foundation-label"/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
  assert.match(componentSource, /Plan a Birthday Experience/);
});

test("uses factual, qualified service language", () => {
  assert.doesNotMatch(contentSource, /Is setup and takedown included/);
  assert.match(componentSource, /href="\/faq"/);
  assert.match(contentSource, /One premium non-coffee beverage is included/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /all children|guaranteed|unlimited/i);
});

test("implements Service, WebPage, and BreadcrumbList without Event schema", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(schemaSource, /"@type": "Service"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.doesNotMatch(componentSource, /"@type": "Event"/);
});

test("uses shared H1 and section-heading scales responsively", () => {
  assert.match(componentSource, /<span>Birthday dessert<\/span>/);
  assert.match(componentSource, /<span>and coffee, made<\/span>/);
  assert.match(componentSource, /<span>for the milestone\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.birthday-hero-copy h1/);
  assert.match(cssSource, /\.birthday-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1\)/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.birthday-overview h2,[\s\S]*?font-size: var\(--type-internal-page-h1-mobile\)/);
});
