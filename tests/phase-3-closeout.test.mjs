import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

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

function createEnvironment() {
  return {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
}

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

function visibleText(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

test("all 16 permanent pages return complete, unique, server-rendered HTML", async () => {
  const worker = await loadWorker();
  const mainHashes = new Map();
  const titles = new Set();

  for (const route of routes) {
    const response = await render(worker, route);
    assert.equal(response.status, 200, route);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i, route);

    const html = await response.text();
    const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
    const title = html.match(/<title>(.*?)<\/title>/i)?.[1] ?? "";

    assert.ok(main.length > 1_000, `${route} should render substantial main content`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${route} H1 count`);
    assert.ok((html.match(/<h2\b/gi) ?? []).length >= 1, `${route} needs H2 sections`);
    assert.match(html, /href="\/inquire"/, `${route} needs an inquiry path`);
    assert.match(html, /bookings@luxeeventco\.ca/, `${route} needs global contact`);
    assert.match(html, /\+1 647-869-1352/, `${route} needs global telephone`);
    assert.doesNotMatch(
      visibleText(html),
      /\[Speak on|Lorem ipsum|\bTODO\b|\bFIXME\b|Future content for this|Approved client quotation|Final imagery will|The complete gallery will|Asset and publication permission pending|Approved event media reserved|Reserved for permission-cleared/i,
      `${route} contains unfinished copy`,
    );

    const hash = createHash("sha256").update(main).digest("hex");
    assert.equal(mainHashes.has(hash), false, `${route} duplicates ${mainHashes.get(hash)}`);
    mainHashes.set(hash, route);

    assert.ok(title, `${route} needs a title`);
    assert.equal(titles.has(title), false, `${route} duplicates title ${title}`);
    titles.add(title);

    for (const image of html.match(/<img\b[^>]*>/gi) ?? []) {
      assert.match(image, /\salt=(?:"[^"]*"|'[^']*')/i, `${route} image needs alt treatment`);
    }
  }
});

test("every crawlable internal destination resolves without duplicate aliases", async () => {
  const worker = await loadWorker();
  const discovered = new Set();

  for (const route of routes) {
    const html = await (await render(worker, route)).text();

    for (const match of html.matchAll(/\shref="(\/[^"]*)"/g)) {
      const path = match[1].split("#")[0].split("?")[0] || "/";
      if (
        !path.startsWith("/_") &&
        !path.startsWith("/assets/") &&
        !path.startsWith("/images/")
      ) {
        discovered.add(path);
      }
    }
  }

  for (const path of discovered) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, `broken internal destination: ${path}`);
  }

  assert.deepEqual([...discovered].sort(), [...routes].sort());
});

test("404 and canonical host redirects return terminal HTTP statuses", async () => {
  const worker = await loadWorker();
  const missing = await render(worker, "/not-a-luxe-route");
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /Page not found/i);

  const redirectCases = [
    ["http://www.luxeeventco.ca/events/weddings?source=test", "https://luxeeventco.ca/events/weddings"],
    ["https://luxecoffeebar.ca/anything?source=test", "https://luxeeventco.ca/experiences/coffee-bar"],
    ["https://luxesweetcart.ca/", "https://luxeeventco.ca/experiences/sweet-cart"],
    ["https://luxeseatingrentals.ca/", "https://luxeeventco.ca/experiences/seating-rentals"],
  ];

  for (const [source, destination] of redirectCases) {
    const response = await worker.fetch(
      new Request(source, { redirect: "manual" }),
      createEnvironment(),
      context,
    );
    assert.equal(response.status, 301, source);
    assert.equal(response.headers.get("location"), destination, source);
  }
});

test("gallery, inquiry, and analytics hooks remain usable without approved third parties", async () => {
  const worker = await loadWorker();
  const gallery = await (await render(worker, "/gallery")).text();
  const inquiry = await (await render(worker, "/inquire")).text();

  assert.match(gallery, /role="group" aria-label="Filter gallery groups"/);
  assert.match(gallery, /data-event-name="gallery_filter"/);
  assert.match(gallery, /data-event-name="gallery_item_open"/);
  assert.match(inquiry, /data-handoff-status="email-fallback"/);
  assert.match(inquiry, /href="mailto:bookings@luxeeventco\.ca\?subject=/);
  assert.doesNotMatch(inquiry, /<script[^>]+(?:honeybook|flashquotes|qwilr)/i);
});
