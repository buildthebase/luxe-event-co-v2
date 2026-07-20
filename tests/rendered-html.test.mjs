import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

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

test("server-renders the Luxe Event Co. launch page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Luxe Event Co\. \| Coffee, Desserts &amp; Seating Rentals Toronto<\/title>/i,
  );
  assert.match(html, /rel="canonical" href="https:\/\/luxeeventco\.ca\/?"/);
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /https:\/\/luxeeventco\.ca\/#organization/);
  assert.match(
    html,
    /Crafted coffee, elevated desserts, and elegant seating for moments made to be remembered\./,
  );
  assert.match(html, /Luxe Coffee Bar/);
  assert.match(html, /Luxe Sweet Cart/);
  assert.match(html, /Luxe Seating Rentals/);
  assert.match(html, /Full website coming soon/);
  assert.match(html, /src="\/icon\.png"/);
  assert.doesNotMatch(
    html,
    /A new event language|Full experience in formation|One brand\. Every event need\.|For the host with an eye for the whole picture\./,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("includes each brand's Instagram destination", async () => {
  const html = await (await render()).text();

  assert.match(html, /https:\/\/www\.instagram\.com\/luxecoffeebar\.to\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxesweet\.cart\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxeseatingrentals/);
});

test("serves crawl discovery metadata", async () => {
  const robotsResponse = await render("/robots.txt");
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/luxeeventco\.ca\/sitemap\.xml/i);

  const sitemapResponse = await render("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemap, /<loc>https:\/\/luxeeventco\.ca<\/loc>/);

  const manifestResponse = await render("/manifest.webmanifest");
  const manifest = await manifestResponse.json();
  assert.equal(manifestResponse.status, 200);
  assert.equal(manifest.name, "Luxe Event Co.");
  assert.equal(manifest.start_url, "/");
});

test("publishes an LLM-readable brand summary", async () => {
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# Luxe Event Co\./);
  assert.match(llms, /https:\/\/luxeeventco\.ca/);
  assert.match(llms, /Luxe Coffee Bar/);
  assert.match(llms, /Luxe Sweet Cart/);
  assert.match(llms, /Luxe Seating Rentals/);
});
