import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const routeSource = await readFile(
  new URL("../app/events/[slug]/page.tsx", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/brand-activations-page.tsx", import.meta.url),
  "utf8",
);
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-builders.ts", import.meta.url), "utf8");
const contentSource = await readFile(
  new URL("../app/events/brand-activations-content.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/brand-activations-page-blueprint.md", import.meta.url),
  "utf8",
);

test("routes Brand Activations to its complete blueprint with unique metadata", () => {
  assert.match(routeSource, /slug === "brand-activations"/);
  assert.match(routeSource, /<BrandActivationsPage \/>/);
  assert.match(routeSource, /createPageMetadata/);
  assert.match(metadataSource, /"\/events\/brand-activations"/);
  assert.match(metadataSource, /Branded Coffee Carts & Activations \| Luxe Event Co\./);
});

test("implements every required Brand Activations chapter", () => {
  for (const component of [
    "ActivationHero",
    "ActivationOverview",
    "ActivationBrandSystem",
    "ActivationContexts",
    "ActivationServices",
    "ActivationScale",
    "ActivationContentMoment",
    "ActivationTrust",
    "ActivationGallery",
    "ActivationPlanning",
    "ActivationFaq",
    "ContextualInquiryPanel",
  ]) {
    assert.match(componentSource, new RegExp(`<${component}`), component);
  }
});

test("keeps eyebrows exclusive to the Brand Activations hero", () => {
  assert.match(componentSource, /Brand Activations \/ Toronto &amp; the GTA/);
  assert.doesNotMatch(componentSource, /className="foundation-label"/);
  assert.match(componentSource, /showEyebrow=\{false\}/);
  assert.match(cssSource, /\.foundation-shell main \.foundation-label\s*\{\s*display: none/);
});

test("covers every required branding surface and activation context", () => {
  for (const phrase of [
    "Custom-branded cups",
    "Custom signage",
    "Cart branding",
    "Custom drink names",
    "Brand-colour alignment",
    "Tailored beverage menus",
    "Product launches",
    "Retail activations",
    "Grand openings",
    "Trade shows",
    "Conferences",
    "Campaign events",
  ]) {
    assert.match(contentSource, new RegExp(phrase), phrase);
  }
});

test("answers every required Brand Activations AEO question visibly", () => {
  for (const question of [
    "Can the Coffee Bar or Sweet Cart be branded?",
    "Can cups, signage, and menus include a logo?",
    "Can custom drinks be created for a campaign?",
    "Can Luxe work directly with agencies and experiential teams?",
    "Can Luxe support multi-day or multiple-location campaigns?",
    "Which assets are required from the client?",
    "How far in advance should a brand activation be planned?",
  ]) {
    assert.match(contentSource, new RegExp(question.replace(/[?]/g, "\\?")), question);
  }
});

test("defines a branded coffee-cart activation directly", () => {
  assert.match(
    componentSource,
    /A branded coffee-cart activation is a staffed mobile beverage experience/,
  );
  assert.match(componentSource, /menu, cups, signage, cart presentation/);
});

test("compares standard catering with experiential service neutrally", () => {
  assert.match(contentSource, /standard corporate catering compare with branded/);
  assert.match(contentSource, /Standard corporate catering is appropriate/);
  assert.match(contentSource, /Neither is universally better/);
  assert.match(contentSource, /Luxe Coffee Bar and Sweet Cart can support/);
});

test("explains how branding can affect the quote", () => {
  assert.match(contentSource, /Does branding increase the price\?/);
  assert.match(contentSource, /Branding can increase the quote/);
  assert.match(contentSource, /rather than applying one universal branding fee/);
});

test("uses confirmed scale claims while qualifying multiple-location work and lead time", () => {
  assert.match(contentSource, /up to three Coffee Bar setups/i);
  assert.match(contentSource, /up to three Sweet Cart setups/i);
  assert.match(contentSource, /Multi-day campaign requests require operating confirmation/);
  assert.match(contentSource, /neither is a universally confirmed capability/);
  assert.match(contentSource, /No universal lead time is published/);
  assert.doesNotMatch(contentSource, /Hamilton/);
  assert.doesNotMatch(contentSource, /guaranteed|unlimited locations/i);
});

test("renders approved proof while permission-gating activation material", () => {
  assert.match(componentSource, /CredibilityStrip variant="hero"/);
  assert.match(componentSource, /awaiting-approved-activation-assets/);
  assert.match(componentSource, /require separate\s+permission/);
});

test("implements required links and the exact primary CTA", () => {
  for (const href of [
    "/events/corporate-events",
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/gallery",
    "/faq",
    "/inquire",
  ]) {
    assert.match(componentSource, new RegExp(`href="${href}"`), href);
  }
  assert.match(componentSource, /Create a Branded Experience/);
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

test("preserves containment and responsive recomposition", () => {
  assert.match(
    cssSource,
    /\.activation-page > :where\([\s\S]*?width: min\(calc\(100% - \(2 \* var\(--space-page-inline\)\)\), var\(--layout-max\)\)/,
  );
  assert.match(cssSource, /@media \(max-width: 1100px\)[\s\S]*?\.activation-system ol/);
  assert.match(cssSource, /@media \(max-width: 840px\)[\s\S]*?\.activation-hero/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.activation-planning ol/);
  assert.match(documentation, /master specification/i);
  assert.match(documentation, /client-submitted Luxe Event Co\. intake/i);
});
