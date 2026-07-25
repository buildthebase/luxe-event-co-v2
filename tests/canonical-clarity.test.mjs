import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
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
  workerUrl.searchParams.set("canonical-clarity", `${process.pid}-${Date.now()}`);
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

function render(worker, url) {
  return worker.fetch(
    new Request(url, {
      headers: { accept: "text/html" },
      redirect: "manual",
    }),
    environment,
    context,
  );
}

function head(html) {
  return html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
}

function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

test("every indexable route emits one matching canonical and Open Graph URL in initial HTML", async () => {
  const worker = await loadWorker();

  for (const route of routes) {
    const canonical = `${canonicalOrigin}${route}`;
    const response = await render(worker, canonical);
    const initialHead = head(await response.text());

    assert.equal(response.status, 200, route);
    assert.equal((initialHead.match(/rel="canonical"/gi) ?? []).length, 1, route);
    assert.equal((initialHead.match(/property="og:url"/gi) ?? []).length, 1, route);
    assert.match(
      initialHead,
      new RegExp(`<link rel="canonical" href="${escaped(canonical)}"`),
      route,
    );
    assert.match(
      initialHead,
      new RegExp(`<meta property="og:url" content="${escaped(canonical)}"`),
      route,
    );
  }
});

test("parameterized views consolidate to the clean page canonical", async () => {
  const worker = await loadWorker();
  const cases = [
    ["/?utm_source=campaign&utm_medium=email", "/"],
    ["/events/weddings?gclid=tracking-id", "/events/weddings"],
    ["/gallery?filter=weddings", "/gallery"],
    ["/inquire?return_url=https%3A%2F%2Fbooking.example%2Fcomplete", "/inquire"],
  ];

  for (const [variant, canonicalPath] of cases) {
    const canonical = `${canonicalOrigin}${canonicalPath}`;
    const response = await render(worker, `${canonicalOrigin}${variant}`);
    const initialHead = head(await response.text());

    assert.equal(response.status, 200, variant);
    assert.match(
      initialHead,
      new RegExp(`<link rel="canonical" href="${escaped(canonical)}"`),
      variant,
    );
    assert.match(
      initialHead,
      new RegExp(`<meta property="og:url" content="${escaped(canonical)}"`),
      variant,
    );
  }
});

test("alternate hosts and path variants redirect directly to clean canonical URLs", async () => {
  const worker = await loadWorker();
  const cases = [
    [
      "http://www.luxeeventco.ca/Events/Weddings/?utm_source=campaign",
      "https://luxeeventco.ca/events/weddings",
    ],
    [
      "https://luxeeventco.ca/experiences//coffee-bar/?gclid=tracking-id",
      "https://luxeeventco.ca/experiences/coffee-bar",
    ],
    [
      "https://luxecoffeebar.ca/old-page?return_url=external",
      "https://luxeeventco.ca/experiences/coffee-bar",
    ],
    [
      "https://luxesweetcart.ca/?utm_medium=email",
      "https://luxeeventco.ca/experiences/sweet-cart",
    ],
    [
      "https://luxeseatingrentals.ca/catalogue?filter=chairs",
      "https://luxeeventco.ca/experiences/seating-rentals",
    ],
  ];

  for (const [variant, canonical] of cases) {
    const response = await render(worker, variant);
    assert.equal(response.status, 301, variant);
    assert.equal(response.headers.get("location"), canonical, variant);

    const terminal = await render(worker, canonical);
    assert.equal(terminal.status, 200, variant);
  }
});

test("sitemap and internal links use only the canonical route set", async () => {
  const worker = await loadWorker();
  const sitemap = await (await render(worker, `${canonicalOrigin}/sitemap.xml`)).text();
  const sitemapUrls = new Set(
    [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]),
  );

  assert.deepEqual(
    sitemapUrls,
    new Set(routes.map((route) => `${canonicalOrigin}${route}`)),
  );

  for (const route of routes) {
    const html = await (await render(worker, `${canonicalOrigin}${route}`)).text();

    for (const match of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      const href = match[1];
      if (!href.startsWith("/")) continue;

      const path = href.split("#")[0] || route;
      assert.ok(routes.includes(path), `${route} links to noncanonical ${href}`);
      assert.doesNotMatch(href, /\?|[A-Z_]|\.html?$/, `${route}: ${href}`);
    }
  }
});

test("application JavaScript does not create or mutate canonical elements", async () => {
  const appDirectory = new URL("../app/", import.meta.url);
  const entries = await readdir(appDirectory, {
    recursive: true,
    withFileTypes: true,
  });

  for (const entry of entries) {
    if (!entry.isFile() || !/\.(?:ts|tsx|js|jsx)$/.test(entry.name)) continue;
    const source = await readFile(join(entry.parentPath, entry.name), "utf8");

    assert.doesNotMatch(
      source,
      /document\.(?:head|querySelector)[\s\S]{0,160}(?:rel\s*=\s*["']canonical|rel=["']canonical|canonical)/i,
      entry.name,
    );
  }
});
