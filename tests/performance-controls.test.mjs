import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [contract, layout, hero, clientComponents] = await Promise.all([
  readFile(new URL("../app/performance-system.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
  readFile(new URL("../app/components/home-hero.tsx", import.meta.url), "utf8"),
  Promise.all(
    [
      "../app/components/site-navigation.tsx",
      "../app/components/home-hero.tsx",
      "../app/components/gallery-collection.tsx",
    ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
  ),
]);

test("records current Core Web Vitals and diagnostic targets without guarantees", () => {
  assert.match(contract, /lcpMilliseconds: 2500/);
  assert.match(contract, /inpMilliseconds: 200/);
  assert.match(contract, /cls: 0\.1/);
  assert.match(contract, /percentile: 75/);
  assert.match(contract, /performance: 90/);
  assert.match(contract, /accessibility: 95/);
  assert.match(contract, /bestPractices: 95/);
  assert.match(contract, /seo: 100/);
  assert.match(contract, /not ranking guarantees/);
});

test("keeps fonts and cinematic media deliberately constrained", () => {
  assert.match(layout, /subsets: \["latin"\]/);
  assert.match(layout, /display: "swap"/);
  assert.match(layout, /preload: true/);
  assert.match(hero, /effectiveType === "slow-2g"/);
  assert.match(hero, /effectiveType === "2g"/);
  assert.match(hero, /preload=\{index === 0 \? "metadata" : "none"\}/);
  assert.match(hero, /poster=\{media\.poster \?\? undefined\}/);
});

test("limits hydration to the three currently interactive systems", () => {
  for (const source of clientComponents) {
    assert.match(source, /^"use client";/);
  }
  assert.match(contract, /navigation, the cinematic Home hero, and gallery filtering/);
});

test("defers field and throttled validation to the appropriate checkpoints", () => {
  assert.match(contract, /final media and production field data are not yet available/);
  assert.match(contract, /throttled mobile and desktop Lighthouse/);
  assert.match(contract, /75th-percentile mobile and desktop Core Web Vitals/);
});
