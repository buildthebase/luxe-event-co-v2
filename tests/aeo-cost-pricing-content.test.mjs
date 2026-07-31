import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [faq, coffee, sweet, rentals, activations, experiences, map] =
  await Promise.all([
    read("../app/faq/faq-content.ts"),
    read("../app/experiences/coffee-bar-content.ts"),
    read("../app/experiences/sweet-cart-content.ts"),
    read("../app/experiences/seating-rentals-content.ts"),
    read("../app/events/brand-activations-content.ts"),
    read("../app/components/experiences-hub.tsx"),
    read("../app/aeo-question-map.ts"),
  ]);

test("answers every Step 4B.8 commercial question before inquiry", () => {
  assert.match(coffee, /How much does mobile coffee catering cost/);
  assert.match(coffee, /Mobile coffee catering is priced from/);
  assert.match(coffee, /Guest count and duration both matter/);
  assert.match(sweet, /How much does Sweet Cart service cost\?/);
  assert.match(sweet, /Sweet Cart service is priced from guest count/);
  assert.match(rentals, /How are chairs and tables priced\?/);
  assert.match(rentals, /Is rental setup included\?/);
  assert.match(faq, /Are travel fees applicable\?/);
  assert.match(activations, /Does branding increase the price\?/);
  assert.match(experiences, /Combining\s+services can affect the overall quote/);
  assert.match(faq, /A 30% non-refundable retainer is required/);
});

test("states the complete determining-factor model without vague deflection", () => {
  for (const factor of [
    "guest count",
    "service duration",
    "location and travel",
    "staffing",
    "menu",
    "custom branding",
    "equipment",
    "setup requirements",
    "outdoor conditions",
    "rental quantities",
    "delivery access",
    "multi-day needs",
    "multiple service stations",
    "combined experiences",
  ]) {
    assert.match(faq, new RegExp(factor), factor);
  }

  assert.doesNotMatch(
    [faq, coffee, sweet, rentals, activations, experiences].join("\n"),
    /contact us for (?:more|pricing)|pricing varies[.!]\s*contact/i,
  );
});

test("withholds unapproved rates while publishing approved payment terms", () => {
  const publicPricing = [faq, coffee, sweet, rentals, activations, experiences].join(
    "\n",
  );

  assert.doesNotMatch(publicPricing, /\$\d+(?:,\d{3})?(?:\.\d{2})?\s*(?:per|starting)/i);
  assert.match(faq, /30% non-refundable retainer/);
  assert.match(faq, /remaining balance is due seven days before the event date/);
  assert.match(rentals, /does not publish one per-item amount/);
  assert.match(activations, /rather than applying one universal branding fee/);
  assert.match(experiences, /does not create an automatic discount or surcharge/);
});

test("records nine pricing owners without creating a pricing route", () => {
  for (const id of [
    "pricing-coffee-cost-method",
    "pricing-guest-count-duration",
    "pricing-dessert-cost-factors",
    "pricing-rental-items",
    "pricing-delivery-setup",
    "pricing-travel-fees",
    "pricing-branding",
    "pricing-combined-services",
    "pricing-retainer",
  ]) {
    assert.match(map, new RegExp(`id: "${id}"`), id);
  }

  assert.match(map, /newRoutes: \[\] as string\[\]/);
  assert.doesNotMatch(map, /primaryPage: "\/pricing/);
});
