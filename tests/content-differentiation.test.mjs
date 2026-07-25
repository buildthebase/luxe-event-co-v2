import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/content-differentiation.ts", import.meta.url), "utf8");

test("defines differentiated content for all approved routes", () => {
  for (const path of [
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
  ]) assert.match(source, new RegExp(`path: "${path.replaceAll("/", "\\/")}"`), path);
});

test("records confirmed and deferred operational requirements", () => {
  assert.match(source, /slug: "typical-capacities"[\s\S]*?status: "confirmed"/);
  assert.match(source, /slug: "simultaneous-setups"[\s\S]*?status: "confirmed"/);
  assert.match(source, /slug: "liability-insurance"[\s\S]*?\$5 million liability insurance/);
  assert.match(source, /slug: "power-water"[\s\S]*?status: "deferred"/);
  assert.match(source, /slug: "rental-delivery-setup"[\s\S]*?status: "deferred"/);
});

test("preserves the no-invention and structured-data rules", () => {
  assert.match(source, /must be traceable to the master specification, client intake, or approved first-party proof/);
  assert.match(source, /Structured data, metadata, image captions, and visible page copy must agree/);
  assert.match(source, /AI-assisted drafting may organize approved facts/);
});
