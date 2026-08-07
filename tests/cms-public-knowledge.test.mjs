import assert from "node:assert/strict";
import test from "node:test";
import {
  collectPublicPaths,
  extractPublicPageRecords,
  publicSnapshotRecords,
} from "../cms/public-knowledge.mjs";

test("public route registry includes metadata routes and published articles", () => {
  const routes = collectPublicPaths({
    metadataSource: `export const pageMetadata = {\n  "/": {},\n  "/experiences/coffee-bar": {},\n};`,
    staticPaths: ["/blog", "/preview"],
    publishedSlugs: ["coffee-planning-guide"],
  });
  assert.deepEqual(routes, ["/", "/blog", "/blog/coffee-planning-guide", "/experiences/coffee-bar"]);
});

test("knowledge extraction indexes visible main content and excludes implementation markup", () => {
  const html = `<!doctype html><html><head><style>.secret { color: red }</style></head><body>
    <nav>Menu</nav><main><h1>Luxe Coffee Bar</h1><p>Mobile coffee service for thoughtfully planned celebrations.</p>
    <script>window.__INTERNAL__ = "do not index source code";</script><ul><li>Espresso and specialty beverages</li></ul></main>
    <footer>Private implementation note</footer></body></html>`;
  const records = extractPublicPageRecords(html, "/experiences/coffee-bar");
  assert.deepEqual(records.map((record) => record.text), [
    "Luxe Coffee Bar",
    "Mobile coffee service for thoughtfully planned celebrations.",
    "Espresso and specialty beverages",
  ]);
  assert.ok(records.every((record) => record.origin === "public-page"));
  assert.ok(records.every((record) => record.source === "/experiences/coffee-bar"));
});

test("legacy code-derived snapshots are inaccessible", () => {
  const legacy = { records: [{ id: "site-internal", usage: "publishable" }] };
  const current = { sourcePolicy: "public-rendered-content-only", records: [
    { id: "public-1", origin: "public-page" },
    { id: "internal-1", origin: "source-file" },
  ] };
  assert.deepEqual(publicSnapshotRecords(legacy), []);
  assert.deepEqual(publicSnapshotRecords(current).map((record) => record.id), ["public-1"]);
});
