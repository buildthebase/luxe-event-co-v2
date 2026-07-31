import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

const [documentation, css, navigation, gallery, faq, routeError] =
  await Promise.all([
    read("../docs/phase-5-visual-quality-assurance.md"),
    read("../app/globals.css"),
    read("../app/components/site-navigation.tsx"),
    read("../app/components/gallery-collection.tsx"),
    read("../app/components/faq-accordion.tsx"),
    read("../app/error.tsx"),
  ]);

test("records every requested visual QA area without claiming unavailable media", () => {
  for (const area of [
    "Typography",
    "Spacing",
    "Image quality",
    "Image crops",
    "Section alignment",
    "Colour contrast",
    "Navigation states",
    "Hover states",
    "Focus states",
    "Mobile menu",
    "Gallery filters",
    "Lightbox behaviour",
    "Accordions",
    "CTA consistency",
    "Footer",
    "Social icons",
    "Browser zoom",
    "Reduced-motion mode",
    "Loading states",
    "Empty states",
    "Error states",
  ]) {
    assert.match(documentation, new RegExp(`\\| ${area} \\|`), area);
  }
  assert.match(documentation, /final event media remains unsupplied/i);
  assert.match(documentation, /no lightbox or approved gallery media currently exists/i);
});

test("locks the two visual corrections found by the rendered-browser sweep", () => {
  assert.match(
    css,
    /@media \(max-width:\s*1100px\)[\s\S]*?\.foundation-footer\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1\.15fr\)\s*minmax\(12rem,\s*\.85fr\)/s,
  );
  assert.match(css, /\.faq-hub-inquiry p a\s*\{[^}]*min-height:\s*24px/s);
  assert.match(
    css,
    /@media \(hover: none\), \(pointer: coarse\)[\s\S]*?\.faq-hub-inquiry p a\s*\{[^}]*min-height:\s*44px/s,
  );
});

test("retains the interaction and recovery controls exercised in Step 5.2", () => {
  assert.match(navigation, /closeMobileMenu\(true\)/);
  assert.match(navigation, /document\.body\.style\.overflow = "hidden"/);
  assert.match(gallery, /aria-pressed=\{activeFilter === filter\.value\}/);
  assert.match(gallery, /role="status" aria-live="polite"/);
  assert.match(gallery, /No gallery groups match this view/);
  assert.match(faq, /<details/);
  assert.match(faq, /<summary>/);
  assert.match(routeError, /Try Again/);
  assert.match(routeError, /Contact Luxe/);
});

test("keeps the browser matrix honest and preserves final launch dependencies", () => {
  assert.match(documentation, /Chrome 150 on macOS \| Pass/);
  assert.match(documentation, /Android Chrome profile \| Simulated pass/);
  assert.match(documentation, /Safari 26\.5 on macOS \| Blocked/);
  assert.match(documentation, /Firefox \| Not locally available/);
  assert.match(documentation, /Edge \| Not locally available/);
  assert.match(documentation, /iOS Safari \| Physical-device check required/);
  assert.match(
    documentation,
    /not represented as physical-device or alternate-engine\s+passes/i,
  );
});
