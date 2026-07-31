import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/experiences/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/sweet-cart-page.tsx", import.meta.url),
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
  new URL("../app/experiences/sweet-cart-content.ts", import.meta.url),
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
  new URL("../docs/sweet-cart-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Sweet Cart to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "sweet-cart"/);
  assert.match(routeSource, /return <SweetCartPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/experiences\/sweet-cart"/);
  assert.match(metadataSource, /Dessert Cart Experiences in Toronto \| Luxe Sweet Cart/);
});

test("implements every required Sweet Cart content chapter", () => {
  for (const component of [
    "SweetHero",
    "SweetPositioning",
    "SweetCollections",
    "DessertExperiences",
    "SweetInclusions",
    "SweetPantry",
    "SweetCustomization",
    "SweetOperations",
    "SweetEvents",
    "SweetGallery",
    "SweetCombinations",
    "SweetFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("uses verified collections, desserts, inclusions, sauces, and toppings", () => {
  assert.match(contentSource, /The Classic Collection/);
  assert.match(contentSource, /Sleek\. Timeless\. Versatile\./);
  assert.match(contentSource, /The Signature Collection/);
  assert.match(contentSource, /Bold\. Elegant\. A statement piece\./);
  assert.match(contentSource, /Mini Dutch Pancakes/);
  assert.match(contentSource, /Belgian Waffles on a Stick/);
  assert.match(contentSource, /Mini Donuts/);
  assert.match(componentSource, /Soft Serve Ice Cream/);
  assert.match(contentSource, /Fresh desserts prepared on-site/);
  assert.match(contentSource, /Professional attendants/);
  assert.match(contentSource, /Belgian Milk Chocolate/);
  assert.match(contentSource, /Lotus Biscoff Cookies/);
  assert.match(contentSource, /Crushed Pistachios/);
  assert.match(componentSource, /Up to 400/);
  assert.match(componentSource, /Up to 3/);
  assert.match(componentSource, /\$5M/);
});

test("answers every required Sweet Cart AEO question visibly", () => {
  for (const answerSignal of [
    "Which desserts are available?",
    "Are desserts prepared on-site?",
    "What is the difference between a dessert cart and a dessert table?",
    "Which sauces and toppings are included?",
    "Are premium toppings available?",
    "Can multiple dessert types be combined?",
    "Is soft serve available?",
    "Can the Sweet Cart setup be branded?",
    "How many guests can Luxe Sweet Cart serve?",
    "Is setup and teardown included?",
    "Which events are best suited to Luxe Sweet Cart?",
  ]) {
    assert.match(contentSource, new RegExp(answerSignal.replaceAll("?", "\\?")));
  }
});

test("answers dessert-cart discovery questions in existing content surfaces", () => {
  assert.match(componentSource, /Dessert-cart catering is a staffed, mobile dessert service/);
  assert.match(componentSource, /Unlike a dessert table/);
  assert.match(componentSource, /prepares the selected dessert at the cart/);
  assert.match(componentSource, /one universal service rate/);
});

test("compares dessert service and dessert formats without another section", () => {
  assert.match(contentSource, /broad selection of pre-arranged sweets/);
  assert.match(contentSource, /hosted Sweet Cart/);
  assert.match(componentSource, /Mini pancakes suit a plated or bowl-style/);
  assert.match(componentSource, /waffles on a\s+stick make the dessert easier to carry/);
  assert.match(componentSource, /dessert\.decisionFit/);
});

test("answers dessert pricing directly without inventing a fixed rate", () => {
  assert.match(contentSource, /How much does Sweet Cart service cost\?/);
  assert.match(contentSource, /Sweet Cart service is priced from guest count/);
  assert.match(contentSource, /multiple stations/);
  assert.doesNotMatch(contentSource, /\$\d+.*(?:per guest|per hour|starting)/i);
});

test("does not invent unrestricted combinations or deferred venue specifications", () => {
  assert.match(contentSource, /every combination is not defined as a standard inclusion/);
  assert.match(contentSource, /confirms the available pairing, equipment, staffing, and service format/);
  assert.match(
    componentSource,
    /footprint, access, utilities, weather, and\s+preparation requirements/,
  );
  assert.doesNotMatch(contentSource, /servings per hour|amps|volts|gallons|square feet/i);
  assert.match(documentation, /does not define:[\s\S]*Every possible multi-dessert combination/);
});

test("implements required Sweet Cart schema and parent provider connection", () => {
  assert.match(componentSource, /createServicePageSchema/);
  assert.match(componentSource, /divisionServiceIds\.sweet/);
  assert.match(schemaSource, /provider: \{ "@id": organizationId \}/);
  assert.match(schemaSource, /"@type": "BreadcrumbList"/);
  assert.match(schemaSource, /"@type": "WebPage"/);
  assert.match(schemaSource, /"@type": "FAQPage"/);
  assert.match(componentSource, /faqs: sweetCartFaqs/);
  assert.match(documentation, /does not guarantee a Google FAQ rich result/);
});

test("keeps Sweet Cart distinct while linking to the Luxe family and event journeys", () => {
  assert.match(componentSource, /\/experiences\/coffee-bar/);
  assert.match(componentSource, /\/experiences\/seating-rentals/);
  assert.match(componentSource, /sweetEventLinks\.map/);
  assert.match(componentSource, /\/gallery/);
  assert.match(componentSource, /\/faq/);
  assert.match(componentSource, /contextKey="sweet-cart"/);
  assert.match(signatureSource, /Inquire About a Dessert Experience/);
  assert.match(cssSource, /\.sweet-collection-classic/);
  assert.match(cssSource, /\.sweet-collection-signature/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.sweet-page/);
});
