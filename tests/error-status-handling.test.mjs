import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  notFound,
  routeError,
  worker,
  viteConfig,
  gallery,
  handoff,
  system,
] = await Promise.all([
  read("app/not-found.tsx"),
  read("app/error.tsx"),
  read("worker/index.ts"),
  read("vite.config.ts"),
  read("app/components/gallery-collection.tsx"),
  read("app/components/inquiry-handoff-link.tsx"),
  read("app/error-status-system.ts"),
]);

test("provides branded, non-indexable 404 handling and route recovery", () => {
  assert.match(notFound, /Page Not Found \| Luxe Event Co\./);
  assert.match(notFound, /index: false/);
  assert.match(notFound, /Return Home/);
  assert.match(routeError, /Try Again/);
  assert.match(routeError, /Contact Luxe/);
});

test("uses direct permanent redirects without temporary or chained rules", () => {
  assert.match(worker, /Response\.redirect\(destination, 301\)/);
  assert.match(worker, /luxecoffeebar\.ca/);
  assert.match(worker, /luxesweetcart\.ca/);
  assert.match(worker, /luxeseatingrentals\.ca/);
  assert.doesNotMatch(worker, /Response\.redirect\([^)]*, (302|307|308)\)/);
  assert.match(system, /preventing chains and loops/);
});

test("provides controllable inquiry and gallery recovery states", () => {
  assert.match(handoff, /try \{/);
  assert.match(handoff, /email-fallback/);
  assert.match(gallery, /No gallery groups match this view\./);
  assert.match(gallery, /setActiveFilter\("all"\)/);
});

test("enables privacy-conscious production error reporting", () => {
  assert.match(viteConfig, /observability:\s*\{[\s\S]*?enabled: true/);
  assert.match(worker, /worker_request_error/);
  assert.doesNotMatch(worker, /url\.searchParams/);
  assert.match(system, /without query parameters or submitted visitor details/);
});
