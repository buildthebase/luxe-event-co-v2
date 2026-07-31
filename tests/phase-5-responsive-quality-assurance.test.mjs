import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const sweetCart = await readFile(
  new URL("../app/components/sweet-cart-page.tsx", import.meta.url),
  "utf8",
);
const seating = await readFile(
  new URL("../app/components/seating-rentals-page.tsx", import.meta.url),
  "utf8",
);
const audit = await readFile(
  new URL("./phase-3-browser-audit.mjs", import.meta.url),
  "utf8",
);
const report = await readFile(
  new URL("../docs/phase-5-responsive-quality-assurance.md", import.meta.url),
  "utf8",
);

test("documents the complete Step 5.3 route and viewport matrix", () => {
  assert.match(report, /all 16 public routes/i);
  assert.match(report, /128 route-and-viewport states/i);

  for (const profile of [
    "320 × 568",
    "390 × 844",
    "430 × 932",
    "768 × 1024",
    "1024 × 768",
    "1280 × 720",
    "1440 × 900",
    "1920 × 1080",
  ]) {
    assert.match(report, new RegExp(profile));
  }
});

test("keeps editorial and operational grids assigned to their intended content", () => {
  assert.match(
    sweetCart,
    /function SweetPositioning\(\)[\s\S]*?<div>\s*<p>[\s\S]*?function SweetCollections/,
  );
  assert.match(
    sweetCart,
    /function SweetOperations\(\)[\s\S]*?<div className="sweet-operation-grid">/,
  );
  assert.match(
    seating,
    /function SeatingOverview\(\)[\s\S]*?<div>\s*<p>[\s\S]*?function RentalCategories/,
  );
  assert.match(
    seating,
    /function RentalOperations\(\)[\s\S]*?<div className="seating-operation-grid">/,
  );
});

test("implements tap-target and device safe-area safeguards", () => {
  assert.match(
    css,
    /@media \(max-width: 760px\), \(hover: none\), \(pointer: coarse\)[\s\S]*?min-height:\s*44px/,
  );
  assert.match(css, /env\(safe-area-inset-left\)/);
  assert.match(css, /env\(safe-area-inset-right\)/);
  assert.match(css, /env\(safe-area-inset-bottom\)/);
});

test("responsive browser audit covers the Step 5.3 failure modes", () => {
  for (const check of [
    "overflow",
    "clippedText",
    "overlappingSections",
    "narrowTextColumns",
    "oversizedHeading",
    "undersizedTapTargets",
    "ctaVisible",
    "contentHash",
    "linkHash",
    "maxCls",
  ]) {
    assert.match(audit, new RegExp(check));
  }
});

test("records the physical-device boundary without overstating coverage", () => {
  assert.match(report, /physical iOS and\s+Android/i);
  assert.match(report, /does not claim.*physical-device or Safari-engine test/is);
});
