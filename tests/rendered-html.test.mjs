import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
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
  assert.match(html, /<title>Luxe Event Co\. \| Elevated Event Experiences<\/title>/i);
  assert.match(html, /A new event language/);
  assert.match(html, /Luxe Coffee Bar/);
  assert.match(html, /Luxe Sweet Cart/);
  assert.match(html, /Luxe Seating Rentals/);
  assert.match(html, /Full experience in formation/);
  assert.match(html, /One brand\. Every event need\./);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("includes each brand's Instagram destination", async () => {
  const html = await (await render()).text();

  assert.match(html, /https:\/\/www\.instagram\.com\/luxecoffeebar\.to\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxesweet\.cart\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxeseatingrentals/);
});
