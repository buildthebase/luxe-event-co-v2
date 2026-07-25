import assert from "node:assert/strict";
import test from "node:test";

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

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("crawl-indexing", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

function fetchFromWorker(worker, url, userAgent = "LuxeTechnicalCrawler/1.0") {
  return worker.fetch(
    new Request(url, {
      headers: {
        accept: "text/html",
        "user-agent": userAgent,
      },
      redirect: "manual",
    }),
    environment,
    context,
  );
}

test("production robots permits crawling and references only the canonical sitemap", async () => {
  const worker = await loadWorker();
  const response = await fetchFromWorker(worker, `${canonicalOrigin}/robots.txt`);
  const robots = await response.text();

  assert.equal(response.status, 200);
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.doesNotMatch(robots, /Disallow:\s*\//i);
  assert.match(robots, /Sitemap: https:\/\/luxeeventco\.ca\/sitemap\.xml/i);
  assert.equal(response.headers.get("x-robots-tag"), null);
});

test("the sitemap contains only canonical, indexable 200 routes", async () => {
  const worker = await loadWorker();
  const response = await fetchFromWorker(worker, `${canonicalOrigin}/sitemap.xml`);
  const xml = await response.text();
  const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

  assert.equal(response.status, 200);
  assert.deepEqual(
    locations.sort(),
    routes.map((route) => `${canonicalOrigin}${route}`).sort(),
  );
  assert.equal(new Set(locations).size, locations.length);
  assert.doesNotMatch(xml, /<lastmod>/i);

  for (const location of locations) {
    assert.doesNotMatch(
      location,
      /chatgpt\.site|pages\.dev|localhost|luxecoffeebar|luxesweetcart|luxeseatingrentals|\?/i,
    );

    const pageResponse = await fetchFromWorker(worker, location);
    const html = await pageResponse.text();
    assert.equal(pageResponse.status, 200, location);
    assert.equal(pageResponse.headers.get("location"), null, location);
    assert.equal(pageResponse.headers.get("x-robots-tag"), null, location);
    assert.match(html, /<meta name="robots" content="index, follow/i, location);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, location);
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="${location.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      ),
      location,
    );
  }
});

test("representative legitimate search crawlers receive the production pages", async () => {
  const worker = await loadWorker();

  for (const userAgent of [
    "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
    "Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)",
  ]) {
    for (const route of ["/", "/experiences/coffee-bar", "/events/weddings", "/gallery"]) {
      const response = await fetchFromWorker(
        worker,
        `${canonicalOrigin}${route}`,
        userAgent,
      );
      assert.equal(response.status, 200, `${userAgent}: ${route}`);
      assert.equal(response.headers.get("x-robots-tag"), null, route);
    }
  }
});

test("non-production hosts receive layered indexing protection", async () => {
  const worker = await loadWorker();
  const previewOrigin = "https://luxe-event-co.preview-host.example";

  const pageResponse = await fetchFromWorker(worker, `${previewOrigin}/`);
  assert.equal(pageResponse.status, 200);
  assert.match(pageResponse.headers.get("x-robots-tag") ?? "", /\bnoindex\b/i);
  assert.match(pageResponse.headers.get("cache-control") ?? "", /\bno-store\b/i);

  const robotsResponse = await fetchFromWorker(worker, `${previewOrigin}/robots.txt`);
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /Disallow: \//i);
  assert.doesNotMatch(robots, /Sitemap:/i);
  assert.match(robotsResponse.headers.get("x-robots-tag") ?? "", /\bnoindex\b/i);
});
