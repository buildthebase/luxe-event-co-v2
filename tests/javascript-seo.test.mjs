import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import test from "node:test";
import { render } from "./test-worker.mjs";

const canonicalOrigin = "https://luxeeventco.ca";
const permanentRoutes = [
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

const appDirectory = new URL("../app/", import.meta.url);

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const url = new URL(entry.name, directory);
      if (entry.isDirectory()) {
        url.pathname += "/";
        return sourceFiles(url);
      }
      return /\.(?:ts|tsx)$/.test(entry.name) ? [url] : [];
    }),
  );
  return files.flat();
}

const [contract, robotsSource, workerSource, appSources] = await Promise.all([
  readFile(new URL("../app/javascript-seo.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
  readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  sourceFiles(appDirectory).then(async (files) =>
    Promise.all(files.map((file) => readFile(file, "utf8"))),
  ),
]);

test("records server rendering as the shared JavaScript SEO strategy", () => {
  assert.match(contract, /Use server rendering for every public route/);
  assert.match(contract, /without becoming the source of primary content/);
  assert.match(contract, /Do not serve crawler-specific HTML/);
  assert.match(contract, /never requires a click, filter, carousel, or video playback/);
  assert.match(contract, /Client JavaScript must not add, remove, or rewrite canonical or robots/);
});

test("emits index-critical signals and substantial content in initial HTML", async () => {
  for (const route of permanentRoutes) {
    const response = await render(`${canonicalOrigin}${route}`);
    const html = await response.text();
    const plainText = html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

    assert.equal(response.status, 200, route);
    assert.match(html, /<title>[^<]+<\/title>/i, route);
    assert.match(html, /<meta name="description" content="[^"]+"/i, route);
    assert.match(html, /<meta name="robots" content="index, follow/i, route);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/i, route);
    assert.equal(response.headers.get("x-robots-tag"), null, route);
    assert.match(
      html,
      new RegExp(
        `<link rel="canonical" href="${`${canonicalOrigin}${route}`.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`,
      ),
      route,
    );
    assert.match(html, /<h1(?:\s|>)/i, route);
    assert.match(html, /<script type="application\/ld\+json">/i, route);
    assert.ok(plainText.split(" ").length >= 120, route);
  }
});

test("publishes crawlable internal links instead of script-only navigation", async () => {
  for (const route of permanentRoutes) {
    const html = await (await render(`${canonicalOrigin}${route}`)).text();
    const anchors = [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/gi)].map(
      (match) => match[1],
    );

    assert.ok(anchors.length >= 8, route);
    assert.ok(anchors.some((href) => href === "/inquire"), route);
    for (const href of anchors) {
      assert.doesNotMatch(href, /^(?:javascript:|#\/)/i, `${route}: ${href}`);
    }
  }
});

test("does not use client JavaScript to reverse production indexing directives", () => {
  const combinedSources = appSources.join("\n");
  assert.doesNotMatch(
    combinedSources,
    /(?:createElement|querySelector|getElementsByName)[\s\S]{0,160}(?:canonical|robots)/i,
  );
  assert.doesNotMatch(
    combinedSources,
    /(?:canonical|robots)[\s\S]{0,160}(?:remove|removeChild|replaceWith|setAttribute)/i,
  );
});

test("leaves fingerprinted framework assets crawlable", async () => {
  const response = await render(`${canonicalOrigin}/`);
  const html = await response.text();
  const robots = await (await render(`${canonicalOrigin}/robots.txt`)).text();
  const assets = [...html.matchAll(/\bhref="(\/assets\/[^"]+\.(?:js|css))"/gi)].map(
    (match) => match[1],
  );

  assert.match(robotsSource, /allow: "\/"/);
  assert.doesNotMatch(robots, /Disallow:\s*\/(?:assets|_next|_vinext)/i);
  assert.ok(assets.some((asset) => /\.css$/i.test(asset)));
  assert.ok(assets.some((asset) => /\.js$/i.test(asset)));
  for (const asset of assets) {
    assert.match(asset, /-[A-Za-z0-9_-]{8,}\.(?:js|css)$/);
  }
});

test("keeps lazy images viewport-driven and discoverable in HTML", async () => {
  const html = await (await render(`${canonicalOrigin}/`)).text();
  const images = [...html.matchAll(/<img\b[^>]*>/gi)].map((match) => match[0]);
  const lazyImages = images.filter((image) => /\bloading="lazy"/i.test(image));

  assert.ok(images.length > 0);
  assert.ok(lazyImages.length > 0);
  for (const image of lazyImages) {
    assert.match(image, /\bsrc="[^"]+"/i);
    assert.match(image, /\bwidth="\d+"/i);
    assert.match(image, /\bheight="\d+"/i);
    assert.match(image, /\balt="[^"]*"/i);
    assert.doesNotMatch(image, /\bdata-src=/i);
  }
});

test("communicates non-200 states without requiring JavaScript", async () => {
  const response = await render(`${canonicalOrigin}/not-a-real-page`);
  const html = await response.text();

  assert.equal(response.status, 404);
  assert.match(response.headers.get("x-robots-tag") ?? "", /\bnoindex\b/i);
  assert.match(html, /404 \/ Page not found/i);
  assert.match(html, /<h1(?:\s|>)/i);
  assert.match(html, /href="\/"/i);
  assert.match(html, /href="\/experiences"/i);
  assert.doesNotMatch(html, /Enable JavaScript/i);

  assert.match(workerSource, /function internalServerErrorResponse/);
  assert.match(workerSource, /status: 500/);
  assert.match(workerSource, /Page temporarily unavailable/);
  assert.match(workerSource, /<main>/);
  assert.match(workerSource, /href="\/inquire"/);
});
