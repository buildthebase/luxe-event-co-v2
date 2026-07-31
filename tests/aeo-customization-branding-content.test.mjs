import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [faq, coffee, sweet, activation, rentals, experiences, map, documentation] =
  await Promise.all([
    read("../app/faq/faq-content.ts"),
    read("../app/experiences/coffee-bar-content.ts"),
    read("../app/experiences/sweet-cart-content.ts"),
    read("../app/events/brand-activations-content.ts"),
    read("../app/experiences/seating-rentals-content.ts"),
    read("../app/components/experiences-hub.tsx"),
    read("../app/aeo-question-map.ts"),
    read("../docs/phase-4b-customization-branding-content.md"),
  ]);

test("covers the complete beverage-customization scope with confirmed options", () => {
  for (const signal of [
    "signature beverages",
    "seasonal selections",
    "matcha",
    "tea",
    "chai",
    "hot chocolate",
    "dairy-free milk alternatives",
  ]) {
    assert.match(faq, new RegExp(signal, "i"), signal);
  }

  assert.match(coffee, /two signature coffee drinks/i);
  assert.match(coffee, /drink names/);
  assert.match(coffee, /ingredient availability, equipment, service speed, guest flow/);
});

test("covers every requested visual branding surface and production dependency", () => {
  for (const signal of [
    "Custom-branded cups",
    "Custom signage",
    "Cart branding",
    "Custom drink names",
    "Brand-colour alignment",
    "Tailored beverage menus",
    "production lead time",
    "logos",
    "brand guidelines",
    "colour references",
    "campaign copy",
    "usage permissions",
    "approval contact",
  ]) {
    assert.match(activation, new RegExp(signal, "i"), signal);
  }

  assert.match(activation, /No universal lead time is published/);
  assert.match(activation, /Final file formats and production specifications are confirmed during planning/);
  assert.doesNotMatch(faq, /production-ready assets/);
});

test("connects visual customization to service execution and guest experience", () => {
  assert.match(faq, /menu clarity, an orderly service point, practical guest movement/);
  assert.match(faq, /equipment, ingredients, service speed, and guest flow/);
  assert.match(activation, /guests choose, order, and move through the experience/);
  assert.match(activation, /working surfaces, or guest access/);
  assert.match(activation, /contrast, legibility, or service function/);
  assert.match(activation, /guest ordering clarity/);
});

test("covers dessert, topping, rental, and combined-service customization without new routes", () => {
  assert.match(sweet, /dessert experience, sauces, standard toppings, premium toppings/);
  assert.match(sweet, /practical for on-site preparation, clear guest choices, service speed/);
  assert.match(sweet, /Can toppings be customized\?/);
  assert.match(rentals, /Can rentals be styled to match the event\?/);
  assert.match(rentals, /sightlines, accessibility, guest flow, venue rules/);
  assert.match(
    experiences,
    /Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be planned\s+through one/,
  );
  assert.match(map, /id: "customization-rental-styling"/);
  assert.match(map, /customizationQuestionCount/);
  assert.match(map, /newRoutes: \[\] as string\[\]/);
});

test("documents all 18 topics and the no-bloat ownership decision", () => {
  for (const topic of [
    "Custom drink menus",
    "Signature beverages",
    "Seasonal menus",
    "Matcha",
    "Non-coffee beverages",
    "Dairy-free milk",
    "Branded cups",
    "Branded menus",
    "Branded carts",
    "Custom signage",
    "Campaign drink names",
    "Event-colour alignment",
    "Dessert customization",
    "Topping customization",
    "Rental styling",
    "Combining services",
    "Branding production timelines",
    "Client files and assets",
  ]) {
    assert.match(documentation, new RegExp(`\\| ${topic} \\|`), topic);
  }

  assert.match(documentation, /Seventeen topics reuse existing definitive answers/);
  assert.match(documentation, /No customization route/);
});
