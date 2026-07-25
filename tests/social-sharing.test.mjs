import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

const strategicCards = new Map([
  ["/", "/images/social/luxe-event-co-home.png"],
  ["/experiences/coffee-bar", "/images/social/luxe-coffee-bar.png"],
  ["/experiences/sweet-cart", "/images/social/luxe-sweet-cart.png"],
  ["/experiences/seating-rentals", "/images/social/luxe-seating-rentals.png"],
  ["/events/weddings", "/images/social/luxe-wedding-experiences.png"],
  ["/events/corporate-events", "/images/social/luxe-corporate-events.png"],
  ["/events/brand-activations", "/images/social/luxe-brand-activations.png"],
]);

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("social-sharing", `${process.pid}-${Date.now()}`);
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

function render(worker, path) {
  return worker.fetch(
    new Request(`${canonicalOrigin}${path}`, {
      headers: { accept: "text/html" },
    }),
    environment,
    context,
  );
}

function head(html) {
  return html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
}

function metaContent(html, attribute, value) {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return html.match(
    new RegExp(`<meta ${attribute}="${escaped}" content="([^"]*)"`, "i"),
  )?.[1];
}

test("every important page emits complete page-level Open Graph and card metadata", async () => {
  const worker = await loadWorker();

  for (const route of routes) {
    const response = await render(worker, route);
    const initialHead = head(await response.text());
    const canonical = `${canonicalOrigin}${route}`;
    const expectedImage =
      strategicCards.get(route) ?? "/og.png";

    assert.equal(response.status, 200, route);
    assert.ok(metaContent(initialHead, "property", "og:title"), `${route} og:title`);
    assert.ok(metaContent(initialHead, "property", "og:description"), `${route} og:description`);
    assert.equal(metaContent(initialHead, "property", "og:type"), "website", route);
    assert.equal(metaContent(initialHead, "property", "og:url"), canonical, route);
    assert.equal(metaContent(initialHead, "property", "og:site_name"), "Luxe Event Co.", route);
    assert.equal(metaContent(initialHead, "property", "og:locale"), "en_CA", route);
    assert.equal(
      metaContent(initialHead, "property", "og:image"),
      `${canonicalOrigin}${expectedImage}`,
      route,
    );
    assert.ok(metaContent(initialHead, "property", "og:image:alt"), `${route} image alt`);

    assert.equal(metaContent(initialHead, "name", "twitter:card"), "summary_large_image", route);
    assert.ok(metaContent(initialHead, "name", "twitter:title"), `${route} twitter:title`);
    assert.ok(metaContent(initialHead, "name", "twitter:description"), `${route} twitter:description`);
    assert.equal(
      metaContent(initialHead, "name", "twitter:image"),
      `${canonicalOrigin}${expectedImage}`,
      route,
    );
  }
});

test("strategic route cards are distinct, descriptive 1200 by 630 PNG assets", async () => {
  const seenImages = new Set();

  for (const [route, imagePath] of strategicCards) {
    assert.match(imagePath, /^\/images\/social\/[a-z0-9]+(?:-[a-z0-9]+)*\.png$/);
    assert.equal(seenImages.has(imagePath), false, `${route} repeats ${imagePath}`);
    seenImages.add(imagePath);

    const file = await readFile(new URL(`../public${imagePath}`, import.meta.url));
    assert.equal(file.subarray(1, 4).toString("ascii"), "PNG", route);
    assert.equal(file.readUInt32BE(16), 1200, `${route} width`);
    assert.equal(file.readUInt32BE(20), 630, `${route} height`);
    assert.ok(file.byteLength < 1_000_000, `${route} card should remain compressed`);
  }
});

test("social metadata remains centralized in the Metadata API", async () => {
  const [metadataConfig, socialCardConfig] = await Promise.all([
    readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/social-card-config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(metadataConfig, /openGraph:\s*\{/);
  assert.match(metadataConfig, /twitter:\s*\{/);
  assert.match(metadataConfig, /getRouteSocialCard\(path/);
  assert.match(socialCardConfig, /routeSocialCards/);
  assert.doesNotMatch(metadataConfig, /<meta|dangerouslySetInnerHTML/);
});
