import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [faq, coffee, sweet, corporate, activations, coffeePage, sweetPage, rentals, events, map] =
  await Promise.all([
    read("../app/faq/faq-content.ts"),
    read("../app/experiences/coffee-bar-content.ts"),
    read("../app/experiences/sweet-cart-content.ts"),
    read("../app/events/corporate-events-content.ts"),
    read("../app/events/brand-activations-content.ts"),
    read("../app/components/coffee-bar-page.tsx"),
    read("../app/components/sweet-cart-page.tsx"),
    read("../app/experiences/seating-rentals-content.ts"),
    read("../app/components/events-hub.tsx"),
    read("../app/aeo-question-map.ts"),
  ]);

test("publishes confirmed capacity and simultaneous-setup limits", () => {
  assert.match(coffee, /events of up to 500 guests/);
  assert.match(corporate, /up to 500 guests/i);
  assert.match(corporate, /up to 400 guests/i);
  assert.match(corporate, /up to three simultaneous Coffee Bar setups/i);
  assert.match(corporate, /up to three simultaneous Sweet Cart setups/i);
  assert.match(coffeePage, /up to three simultaneous setups/);
  assert.match(sweetPage, /Up to three simultaneous setups/);
});

test("answers staffing, duration, space, utility, access, and weather questions safely", () => {
  assert.match(coffee, /has not approved a public drinks-per-hour figure/);
  assert.match(coffee, /has not approved one public or universally included headcount/);
  assert.match(sweet, /How many attendants are included\?/);
  assert.match(sweet, /How long does dessert service last\?/);
  assert.match(faq, /has not approved one public floor-space figure/);
  assert.match(faq, /universal outlet, circuit, load, or generator specification/);
  assert.match(faq, /universal supply, drainage, or self-contained-operation claim/);
  assert.match(faq, /Indoor service is supported/);
  assert.match(faq, /no universal outdoor limit is approved/);
  assert.match(faq, /loading dock or entrance, stairs or elevators/);
  assert.match(faq, /client, planner, or venue/);
});

test("keeps rental and guest-flow responsibilities on their existing owners", () => {
  assert.match(rentals, /Delivery-only service transfers/);
  assert.match(rentals, /Setup is not universally included/);
  assert.match(events, /clear approach,\s+ordering point, waiting area, and exit/);
});

test("removes unsupported multi-day and recurring promises", () => {
  const capabilityPages = [corporate, activations, coffeePage, sweetPage].join("\n");

  assert.match(corporate, /Multi-day requests require operating confirmation/);
  assert.match(corporate, /Recurring programs require operating confirmation/);
  assert.match(activations, /Multi-day campaign requests require operating confirmation/);
  assert.doesNotMatch(
    capabilityPages,
    /Luxe can support multi-day|Multi-day events are a confirmed capability|Luxe can support recurring/i,
  );
});

test("does not estimate unverified operational specifications", () => {
  const operational = [faq, coffee, sweet, corporate, activations, rentals, events].join("\n");

  assert.doesNotMatch(operational, /\b\d+\s*(?:drinks|servings)\s+per hour\b/i);
  assert.doesNotMatch(operational, /\b\d+\s*(?:baristas?|attendants?)\b/i);
  assert.doesNotMatch(operational, /\b\d+\s*(?:square feet|sq\.?\s*ft|amps?|volts?|gallons?)\b/i);
  assert.doesNotMatch(operational, /\bsetup (?:takes|time is)\s+\d+/i);
});

test("adds only the two materially distinct logistics questions to the map", () => {
  assert.match(map, /id: "logistics-dessert-attendants"/);
  assert.match(map, /id: "logistics-dessert-service-duration"/);
  assert.match(map, /logisticsQuestionCount/);
  assert.match(map, /newRoutes: \[\] as string\[\]/);
});
