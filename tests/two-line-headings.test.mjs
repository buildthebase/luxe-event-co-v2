import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const componentSource = await readFile(
  new URL("../app/components/site-shell.tsx", import.meta.url),
  "utf8",
);
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const visualSystemSource = await readFile(
  new URL("../app/design-system.ts", import.meta.url),
  "utf8",
);

const controlledPages = [
  "../app/experiences/page.tsx",
  "../app/events/page.tsx",
  "../app/inquire/page.tsx",
];

test("supports accessible art-directed two-line headings", () => {
  assert.match(componentSource, /titleLines\?: readonly \[string, string\]/);
  assert.match(componentSource, /foundation-title-controlled/);
  assert.match(componentSource, /foundation-title-line/);
  assert.match(componentSource, /aria-label=\{titleLines \? title : undefined\}/);
});

test("keeps each controlled foundation line intact while scaling fluidly on mobile", () => {
  assert.match(cssSource, /\.foundation-title-line \{[^}]*white-space: nowrap/);
  assert.match(
    cssSource,
    /--type-internal-page-h1-mobile: clamp\(1\.52rem, 7\.65vw, 3rem\)/,
  );
  assert.match(visualSystemSource, /never wrap to a fourth line/);
});

test("uses the Weddings H1 format across every internal page", () => {
  assert.match(
    cssSource,
    /--type-internal-page-h1: clamp\(2\.75rem, 4vw, 3\.9rem\)/,
  );
  for (const selector of [
    "events-hero-copy h1",
    "coffee-hero-copy h1",
    "sweet-hero-copy h1",
    "seating-hero-copy h1",
    "wedding-hero-copy h1",
    "corporate-hero-copy h1",
    "activation-hero-copy h1",
    "baby-hero-copy h1",
    "bridal-hero-copy h1",
    "birthday-hero-copy h1",
    "private-hero-copy h1",
    "gallery-hero-copy h1",
    "faq-hub-hero-copy h1",
    "inquire-hero-copy h1",
    "foundation-intro h1",
  ]) {
    assert.ok(cssSource.includes(`.${selector}`), selector);
  }
  assert.match(
    visualSystemSource,
    /Every internal-page H1 follows the Weddings scale/,
  );
});

test("defines intentional two- or three-line compositions for every signature hub heading", async () => {
  for (const path of controlledPages) {
    const source = await readFile(new URL(path, import.meta.url), "utf8");
    assert.ok(
      /titleLines=\{\["[^"]+", "[^"]+"(?:, "[^"]+")?\]\}/.test(source) ||
        /<h1 aria-label="[^"]+">[\s\S]*?<span>[^<]+<\/span>[\s\S]*?<span>[^<]+<\/span>[\s\S]*?<\/h1>/.test(
          source,
        ),
      path,
    );
  }
});
