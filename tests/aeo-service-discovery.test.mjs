import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const hub = await readFile(
  new URL("../app/components/experiences-hub.tsx", import.meta.url),
  "utf8",
);
const coffee = await readFile(
  new URL("../app/components/coffee-bar-page.tsx", import.meta.url),
  "utf8",
);
const sweet = await readFile(
  new URL("../app/components/sweet-cart-page.tsx", import.meta.url),
  "utf8",
);
const sweetContent = await readFile(
  new URL("../app/experiences/sweet-cart-content.ts", import.meta.url),
  "utf8",
);
const rentals = await readFile(
  new URL("../app/experiences/seating-rentals-content.ts", import.meta.url),
  "utf8",
);
const activations = await readFile(
  new URL("../app/components/brand-activations-page.tsx", import.meta.url),
  "utf8",
);
const questionMap = await readFile(
  new URL("../app/aeo-question-map.ts", import.meta.url),
  "utf8",
);

test("answers all nine service-discovery questions on their definitive pages", () => {
  assert.match(coffee, /A mobile coffee bar brings café equipment/);
  assert.match(coffee, /Mobile espresso catering begins with the event brief/);
  assert.match(coffee, /Mobile coffee catering can suit weddings/);

  assert.match(sweet, /Dessert-cart catering is a staffed, mobile dessert service/);
  assert.match(sweet, /Unlike a dessert table/);
  assert.match(sweet, /prepares the selected dessert at the cart/);
  assert.match(
    sweetContent,
    /What is the difference between a dessert cart and a dessert table\?/,
  );

  assert.match(
    rentals,
    /What is included with an event-rental service\?/,
  );
  assert.match(
    activations,
    /A branded coffee-cart activation is a staffed mobile beverage experience/,
  );
  assert.match(
    hub,
    /Can coffee, dessert, and rentals be coordinated through one provider\?/,
  );
});

test("assigns one definitive page to every discovery answer", () => {
  const assignments = [
    ["service-discovery-mobile-coffee-bar", "/experiences/coffee-bar"],
    ["service-discovery-mobile-espresso-catering", "/experiences/coffee-bar"],
    ["service-discovery-dessert-cart-catering", "/experiences/sweet-cart"],
    ["service-discovery-dessert-cart-vs-table", "/experiences/sweet-cart"],
    ["service-discovery-event-rental-inclusions", "/experiences/seating-rentals"],
    ["service-discovery-branded-coffee-activation", "/events/brand-activations"],
    ["service-discovery-one-provider", "/experiences"],
    ["service-discovery-coffee-event-fit", "/experiences/coffee-bar"],
    ["service-discovery-onsite-dessert-preparation", "/experiences/sweet-cart"],
  ];

  for (const [id, path] of assignments) {
    assert.match(
      questionMap,
      new RegExp(
        `id: "${id}"[\\s\\S]*?primaryPage: "${path.replaceAll("/", "\\/")}"`,
      ),
      id,
    );
  }
});

test("keeps discovery answers factual and dependency-safe", () => {
  assert.match(coffee, /staffing, equipment,\s+setup, and venue requirements/);
  assert.match(sweet, /rather than assumed from one universal service rate/);
  assert.match(rentals, /rather than assumed to be universally included/);
  assert.doesNotMatch(
    [hub, coffee, sweet, sweetContent, rentals, activations].join("\n"),
    /drinks per hour|servings per hour|amps|volts|gallons|square feet/i,
  );
});

test("uses existing surfaces instead of creating a discovery-content route", () => {
  assert.match(questionMap, /newRoutes: \[\] as string\[\]/);
  assert.doesNotMatch(questionMap, /primaryPage: "\/resources\//);
  assert.doesNotMatch(questionMap, /primaryPage: "\/learn\//);
});
