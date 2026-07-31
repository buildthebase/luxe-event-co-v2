import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  weddings,
  corporate,
  bridalShowers,
  babyShowers,
  privateEvents,
  eventsHub,
  questionMap,
] = await Promise.all([
  read("../app/events/weddings-content.ts"),
  read("../app/events/corporate-events-content.ts"),
  read("../app/events/bridal-showers-content.ts"),
  read("../app/events/baby-showers-content.ts"),
  read("../app/events/private-events-content.ts"),
  read("../app/components/events-hub.tsx"),
  read("../app/aeo-question-map.ts"),
]);

test("answers all nine planning questions on their definitive event pages", () => {
  assert.match(weddings, /When should coffee be served at a wedding\?/);
  assert.match(weddings, /Is a coffee bar appropriate for cocktail hour\?/);
  assert.match(bridalShowers, /Which desserts work well for bridal showers\?/);
  assert.match(
    corporate,
    /How should coffee catering be planned for a corporate event\?/,
  );
  assert.match(corporate, /For employee appreciation/);
  assert.match(babyShowers, /What services work well for baby showers\?/);
  assert.match(
    privateEvents,
    /Which event rentals are required for outdoor events\?/,
  );
  assert.match(eventsHub, /Guest flow around a coffee or dessert station/);
  assert.match(eventsHub, /selected for a complete event setup/);
});

test("keeps event-planning answers qualified where operating facts vary", () => {
  assert.match(weddings, /The best window depends/);
  assert.match(corporate, /Luxe then reviews the menu, service window/);
  assert.match(privateEvents, /There is no universal outdoor-rental list/);
  assert.match(eventsHub, /reviews placement against expected/);
  assert.doesNotMatch(
    [weddings, corporate, bridalShowers, babyShowers, privateEvents, eventsHub].join(
      "\n",
    ),
    /drinks per hour|servings per hour|amps|volts|gallons|square feet/i,
  );
});

test("records the planning answers without creating a content route", () => {
  for (const id of [
    "event-planning-wedding-coffee-timing",
    "event-planning-cocktail-hour-coffee",
    "event-planning-bridal-shower-desserts",
    "event-planning-corporate-coffee",
    "event-planning-employee-appreciation",
    "event-planning-baby-shower-services",
    "event-planning-outdoor-rentals",
    "event-planning-station-flow",
    "event-planning-complete-setup",
  ]) {
    assert.match(questionMap, new RegExp(`id: "${id}"`), id);
  }

  assert.match(questionMap, /newRoutes: \[\] as string\[\]/);
});
