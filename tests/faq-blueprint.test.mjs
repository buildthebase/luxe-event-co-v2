import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../app/faq/faq-content.ts", import.meta.url), "utf8");
const faqAccordionSource = await readFile(
  new URL("../app/components/faq-accordion.tsx", import.meta.url),
  "utf8",
);
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("implements the complete FAQ blueprint and exact primary CTA", () => {
  for (const component of ["FaqHero", "FaqCategoryNav", "FaqCategory", "FaqInquiry"]) {
    assert.match(pageSource, new RegExp(`<${component}`), component);
  }
  assert.match(pageSource, /Ask About Your Event/);
  assert.match(pageSource, /FAQ \/ Before You Inquire/);
  assert.doesNotMatch(pageSource, /className="foundation-label"/);
});

test("keeps the FAQ focused on four shared-policy categories", () => {
  for (const category of [
    "General Booking",
    "Travel and Service Area",
    "Setup and Logistics",
    "Customization",
  ]) assert.match(contentSource, new RegExp(`title: "${category}"`), category);
  for (const serviceCategory of ["coffee-bar", "sweet-cart", "seating-rentals"]) {
    assert.doesNotMatch(contentSource, new RegExp(`id: "${serviceCategory}"`));
  }
});

test("answers 26 shared questions without republishing service mechanics", () => {
  assert.equal((contentSource.match(/question: "/g) ?? []).length, 26);
  for (const question of [
    "What packages are available?",
    "Which payment methods are accepted?",
    "Is Luxe insured?",
    "Does Luxe travel outside the GTA?",
    "Can Luxe operate without direct access to power?",
    "Can corporate branding be incorporated?",
  ]) assert.ok(contentSource.includes(`question: "${question}"`), question);
  for (const serviceQuestion of [
    "How many drinks can be served per hour?",
    "How many baristas are included?",
    "Can pancakes, waffles, and donuts be combined?",
    "Which rental items are available?",
  ]) assert.ok(!contentSource.includes(`question: "${serviceQuestion}"`), serviceQuestion);
});

test("uses confirmed policies while clearly qualifying deferred operational details", () => {
  for (const phrase of [
    "30% non-refundable retainer",
    "seven days before the event date",
    "$5 million in liability insurance",
    "Luxe has not approved a public list of payment methods",
    "Luxe has not approved one public floor-space figure",
  ]) assert.match(contentSource, new RegExp(phrase.replace("$", "\\$")), phrase);
  assert.doesNotMatch(contentSource, /Hamilton/);
});

test("includes every approved service-area location", () => {
  for (const location of [
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
    "Southern Ontario",
  ]) assert.match(contentSource, new RegExp(location), location);
});

test("links answers to relevant pages instead of using generic link text", () => {
  for (const href of [
    "/experiences",
    "/events",
    "/events/brand-activations",
    "/inquire",
  ]) assert.match(contentSource, new RegExp(`href: "${href}"`), href);
  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
  ]) assert.match(pageSource, new RegExp(`href="${href}"`), href);
  assert.doesNotMatch(contentSource, /label: "Click here"/i);
});

test("implements matching FAQPage, WebPage, and BreadcrumbList schema", () => {
  assert.match(pageSource, /"@type": \["FAQPage", "WebPage"\]/);
  assert.match(pageSource, /"@type": "Question"/);
  assert.match(pageSource, /"@type": "Answer"/);
  assert.match(pageSource, /name: item\.question/);
  assert.match(pageSource, /text: item\.answer/);
  assert.match(pageSource, /createBreadcrumbSchema\("\/faq"\)/);
});

test("uses accessible native disclosures and category navigation", () => {
  assert.match(pageSource, /<FaqAccordion items=\{category\.items\}/);
  assert.match(faqAccordionSource, /<details id=\{item\.id\}/);
  assert.match(faqAccordionSource, /<summary>/);
  assert.match(pageSource, /aria-label="FAQ categories"/);
  assert.match(pageSource, /aria-labelledby=\{`\$\{category\.id\}-title`\}/);
});

test("uses shared H1 and restrained responsive category scales", () => {
  assert.match(pageSource, /<span>Event planning<\/span>/);
  assert.match(pageSource, /<span>and booking answers,<\/span>/);
  assert.match(pageSource, /<span>before the proposal begins\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.faq-hub-hero-copy h1/);
  assert.match(cssSource, /\.faq-hub-category h2[\s\S]*?font-size: clamp\(2\.5rem, 4vw, 4\.6rem\)/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.faq-hub-category h2 \{ font-size: var\(--type-internal-page-h1-mobile\)/);
});
