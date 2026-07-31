import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [coffee, coffeePage, sweet, sweetPage, experiences, rentals, activations, map] =
  await Promise.all([
    read("../app/experiences/coffee-bar-content.ts"),
    read("../app/components/coffee-bar-page.tsx"),
    read("../app/experiences/sweet-cart-content.ts"),
    read("../app/components/sweet-cart-page.tsx"),
    read("../app/components/experiences-hub.tsx"),
    read("../app/experiences/seating-rentals-content.ts"),
    read("../app/events/brand-activations-content.ts"),
    read("../app/aeo-question-map.ts"),
  ]);

test("implements all nine comparisons on their definitive pages", () => {
  assert.match(coffee, /Café Cart is appropriate/);
  assert.match(coffee, /traditional coffee catering/i);
  assert.match(coffee, /venue coffee service/i);
  assert.match(sweet, /dessert cart and a dessert table/i);
  assert.match(sweet, /hosted Sweet Cart/);
  assert.match(sweetPage, /Mini pancakes suit a plated or bowl-style/);
  assert.match(experiences, /Separate\s+specialist vendors can also be appropriate/);
  assert.match(rentals, /Delivery-only service transfers/);
  assert.match(activations, /standard corporate catering compare with branded/);
});

test("treats alternatives neutrally and provides decision factors", () => {
  assert.match(coffee, /speed and simplicity matter most/);
  assert.match(coffee, /integrated with the venue's catering team/);
  assert.match(sweet, /quick, flexible access/);
  assert.match(experiences, /client\s+already has a coordination plan/);
  assert.match(rentals, /inventory, quantity, floor plan, access, or schedule/);
  assert.match(activations, /Neither is universally better/);
  assert.match(coffeePage, /guest count, service duration, setting, available space/);
});

test("connects comparisons to Luxe services without unsupported superiority claims", () => {
  assert.match(coffee, /staffed coffee cart prepares made-to-order/);
  assert.match(sweet, /Luxe Sweet Cart offers Mini Dutch Pancakes/);
  assert.match(experiences, /Luxe Event Co\. is the parent company/);
  assert.match(activations, /Luxe Coffee Bar and Sweet Cart can support/);

  const combined = [
    coffee,
    coffeePage,
    sweet,
    sweetPage,
    experiences,
    rentals,
    activations,
  ].join("\n");

  assert.doesNotMatch(
    combined,
    /always better|inferior|outperforms|best in every|guaranteed return/i,
  );
  assert.doesNotMatch(
    combined,
    /drinks per hour|servings per hour|amps|volts|gallons|square feet/i,
  );
});

test("records comparisons without creating a comparison-content route", () => {
  for (const id of [
    "comparison-cafe-cart-full-service-bar",
    "comparison-coffee-cart-traditional-catering",
    "comparison-mobile-bar-venue-service",
    "comparison-dessert-cart-table",
    "comparison-hosted-self-serve-dessert",
    "comparison-dessert-formats",
    "comparison-individual-coordinated-provider",
    "comparison-rental-delivery-setup",
    "comparison-standard-branded-corporate",
  ]) {
    assert.match(map, new RegExp(`id: "${id}"`), id);
  }

  assert.match(map, /newRoutes: \[\] as string\[\]/);
  assert.doesNotMatch(map, /primaryPage: "\/compare/);
});
