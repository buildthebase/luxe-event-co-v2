import assert from "node:assert/strict";
import test from "node:test";
import { loadWorker } from "./test-worker.mjs";

const canonicalOrigin = "https://luxeeventco.ca";
const routes = [
  "/",
  "/experiences",
  "/experiences/coffee-bar",
  "/experiences/sweet-cart",
  "/experiences/seating-rentals",
  "/events",
  "/events/weddings",
  "/events/corporate-events",
  "/events/brand-activations",
  "/events/baby-showers",
  "/events/bridal-showers",
  "/events/birthdays",
  "/events/private-events",
  "/gallery",
  "/faq",
  "/inquire",
];

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchFromWorker(worker, url) {
  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html" },
      redirect: "manual",
    }),
    environment,
    context,
  );
}

test("the confirmed URL map is lowercase, concise, and extension-free", () => {
  assert.equal(new Set(routes).size, routes.length);

  for (const route of routes) {
    assert.equal(route, route.toLowerCase(), route);
    assert.doesNotMatch(route, /_|\/index(?:\/|$)|\.html?$|\d{4}\/\d{2}|[?&=#]/, route);
    assert.match(route, /^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*\/?)*$/, route);
    assert.equal(route === "/" || !route.endsWith("/"), true, route);
  }
});

test("every permanent page has an exact self-referencing canonical", async () => {
  const worker = await loadWorker();

  for (const route of routes) {
    const response = await fetchFromWorker(worker, `http://localhost${route}`);
    assert.equal(response.status, 200, route);
    const html = await response.text();
    const expected = `${canonicalOrigin}${route}`;

    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="${expected.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s*\\/?\\s*>`,
      ),
      route,
    );
  }
});

test("the sitemap contains each canonical URL once and no alternate URLs", async () => {
  const worker = await loadWorker();
  const response = await fetchFromWorker(worker, "http://localhost/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  const expected = routes.map((route) => `${canonicalOrigin}${route}`);

  assert.deepEqual(locations.sort(), expected.sort());
  assert.equal(new Set(locations).size, locations.length);
  for (const location of locations) {
    assert.match(location, /^https:\/\/luxeeventco\.ca\//);
    assert.doesNotMatch(
      location,
      /www\.|luxecoffeebar|luxesweetcart|luxeseatingrentals|\?/,
    );
  }
});

test("protocol, hostname, case, and trailing-slash variants redirect in one hop", async () => {
  const worker = await loadWorker();
  const cases = [
    [
      "http://www.luxeeventco.ca/Events/Corporate-Events/?utm_source=test",
      "https://luxeeventco.ca/events/corporate-events",
    ],
    [
      "https://luxeeventco.ca/experiences//coffee-bar/",
      "https://luxeeventco.ca/experiences/coffee-bar",
    ],
    [
      "https://www.luxeeventco.ca/gallery/",
      "https://luxeeventco.ca/gallery",
    ],
    [
      "https://luxecoffeebar.ca/anything?utm_source=test",
      "https://luxeeventco.ca/experiences/coffee-bar",
    ],
    [
      "https://luxesweetcart.ca/",
      "https://luxeeventco.ca/experiences/sweet-cart",
    ],
    [
      "https://luxeseatingrentals.ca/",
      "https://luxeeventco.ca/experiences/seating-rentals",
    ],
  ];

  for (const [source, destination] of cases) {
    const response = await fetchFromWorker(worker, source);
    assert.equal(response.status, 301, source);
    assert.equal(response.headers.get("location"), destination, source);

    const terminal = await fetchFromWorker(worker, destination);
    assert.equal(terminal.status, 200, `${source} must terminate after one redirect`);
  }
});

test("retired-looking unconfirmed paths do not expose duplicate page content", async () => {
  const worker = await loadWorker();

  for (const path of [
    "/index",
    "/index.html",
    "/events.html",
    "/2026/07/events",
    "/page/123",
    "/events/not-a-confirmed-event",
  ]) {
    const response = await fetchFromWorker(worker, `http://localhost${path}`);
    assert.equal(response.status, 404, path);
  }
});

test("internal navigation does not generate parameterized or alternate route links", async () => {
  const worker = await loadWorker();

  for (const route of routes) {
    const html = await (await fetchFromWorker(worker, `http://localhost${route}`)).text();

    for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
      const href = match[1];
      if (!href.startsWith("/")) continue;

      assert.doesNotMatch(href, /[?#]|[A-Z_]|\.html?$/, `${route}: ${href}`);
      assert.equal(href === "/" || !href.endsWith("/"), true, `${route}: ${href}`);
    }
  }
});
