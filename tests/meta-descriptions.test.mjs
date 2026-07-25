import assert from "node:assert/strict";
import test from "node:test";

const pages = [
  ["/", "Discover how Luxe Event Co. combines mobile coffee, live dessert, and considered rentals for weddings, corporate events, and celebrations across Toronto and the GTA."],
  ["/experiences", "Compare Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals, then choose one experience or coordinate all three for an event in Toronto and the GTA."],
  ["/experiences/coffee-bar", "Bring a complete mobile café to Toronto and GTA events with baristas, handcrafted coffee and matcha, two service formats, and tailored presentation."],
  ["/experiences/sweet-cart", "Create a live dessert moment at Toronto and GTA events with mini pancakes, waffles, donuts, toppings, and a cart styled around the occasion."],
  ["/experiences/seating-rentals", "Explore chairs, tables, tents, linens, and lighting for Toronto and GTA events, with clear guidance on layouts, quote requirements, delivery, and setup."],
  ["/events", "Start with the occasion, then find the right mix of Luxe coffee, live dessert, and rentals for weddings, business events, showers, and private celebrations."],
  ["/events/weddings", "See where coffee, live dessert, and considered rentals can support a Toronto or GTA wedding, from cocktail hour through the late-night celebration."],
  ["/events/corporate-events", "Plan scalable coffee, matcha, dessert, and rental support for Toronto and GTA office events, conferences, client hospitality, and recurring programs."],
  ["/events/brand-activations", "Turn coffee, matcha, dessert, cups, signage, and cart styling into a cohesive branded activation for launches and campaigns in Toronto and the GTA."],
  ["/events/baby-showers", "Shape a Toronto or GTA baby shower with coffee, matcha, live dessert, signage, and considered rentals, with indoor and outdoor planning guidance."],
  ["/events/bridal-showers", "Create a polished Toronto or GTA bridal shower with café-style drinks, live dessert, signage, florals, and rentals planned as one cohesive setting."],
  ["/events/birthdays", "Plan a personalized Toronto or GTA birthday with coffee, non-coffee drinks, live dessert, custom signage, and rentals for milestone or family celebrations."],
  ["/events/private-events", "Explore coffee, live dessert, signage, and rentals for Toronto and GTA engagements, anniversaries, graduations, holidays, and other private events."],
  ["/gallery", "View Luxe Event Co. coffee, dessert, and rental work, grouped by the weddings, activations, celebrations, and guest moments each experience served."],
  ["/faq", "Get clear answers about Luxe Event Co. booking, retainers, travel, setup, menus, customization, service capacity, and rental planning before you inquire."],
  ["/inquire", "Prepare a Luxe Event Co. inquiry with your date, venue, guest count, service needs, and event context before continuing to the booking platform."],
];

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("meta-descriptions", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, path) {
  return worker.fetch(
    new Request(new URL(path, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("every indexable page renders one accurate, unique meta description", async () => {
  const worker = await loadWorker();
  const renderedDescriptions = [];

  for (const [path, expectedDescription] of pages) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const matches = [
      ...html.matchAll(/<meta name="description" content="([^"]*)"\s*\/?>/gi),
    ];

    assert.equal(matches.length, 1, `${path} must have exactly one meta description`);
    const description = decodeHtml(matches[0][1]);
    assert.equal(description, expectedDescription, path);
    assert.doesNotMatch(
      description,
      /\b(best|leading|premier|number one|#1|unmatched|unparalleled)\b/i,
      path,
    );
    renderedDescriptions.push(description.toLowerCase());
  }

  assert.equal(new Set(renderedDescriptions).size, pages.length);
});

test("descriptions preserve relevant service, event, location, or inquiry context", async () => {
  const worker = await loadWorker();

  for (const [path] of pages) {
    const response = await render(worker, path);
    const html = await response.text();
    const description = decodeHtml(
      html.match(/<meta name="description" content="([^"]*)"\s*\/?>/i)?.[1] ?? "",
    );

    assert.match(
      description,
      /Toronto|GTA|coffee|dessert|rental|wedding|event|activation|shower|birthday|booking|inquiry/i,
      path,
    );
  }
});
