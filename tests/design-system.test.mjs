import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const systemSource = await readFile(new URL("../app/design-system.ts", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const documentation = await readFile(
  new URL("../docs/phase-2-visual-system.md", import.meta.url),
  "utf8",
);

test("defines the exact approved colour foundation and gold usage rule", () => {
  for (const colour of ["#F8F6F2", "#C8A97E", "#1F1F1F", "#D8CEC3", "#7A7A7A"]) {
    assert.match(systemSource, new RegExp(colour));
    assert.match(cssSource.toUpperCase(), new RegExp(colour));
  }

  assert.match(systemSource, /Champagne gold is an accent, never a dominant background or paragraph colour/);
  assert.match(systemSource, /goldInk/);
  assert.match(documentation, /2\.06:1/);
  assert.match(documentation, /6\.65:1/);
});

test("establishes differentiated display, body, and wordmark typography", () => {
  assert.doesNotMatch(systemSource, /Newsreader/);
  assert.doesNotMatch(systemSource, /Instrument Serif/);
  assert.match(systemSource, /Manrope/);
  assert.match(systemSource, /unified family keeps the parent identity/);
  assert.match(systemSource, /wordmark/);
  assert.match(systemSource, /displayXl/);
  assert.match(systemSource, /bodyLead/);
  assert.match(systemSource, /displayHeading: "14ch"/);
  assert.match(systemSource, /body: "66ch"/);
  assert.match(cssSource, /--font-display/);
  assert.match(cssSource, /--type-display-xl/);
  assert.match(cssSource, /--font-display: var\(--font-sans\)/);
  assert.match(cssSource, /--type-display-xl: clamp\(3\.6rem, 9vw, 9\.5rem\)/);
  assert.match(cssSource, /--tracking-display-xl: -0\.055em/);
  assert.match(cssSource, /letter-spacing: var\(--tracking-display-xl\)/);
  assert.match(cssSource, /--measure-body: 66ch/);
});

test("defines editorial layout, photography, and responsive recomposition rules", () => {
  assert.match(systemSource, /12-column editorial grid/);
  assert.match(systemSource, /8-column editorial grid/);
  assert.match(systemSource, /4-column compositional grid/);
  assert.match(systemSource, /Photography leads service and event storytelling/);
  assert.match(systemSource, /Cards are reserved for true peer choices/);
  assert.match(systemSource, /Desktop compositions do not simply shrink/);
  assert.match(systemSource, /Mobile reorders content according to decision priority/);
  assert.match(documentation, /Product-only cutouts and inventory grids cannot become the dominant language/);
});

test("establishes a site-wide contrast rhythm without forcing identical page layouts", () => {
  assert.match(systemSource, /surfaceRhythm/);
  assert.match(systemSource, /canvas: "Ivory grid field/);
  assert.match(systemSource, /narrative:/);
  assert.match(systemSource, /emphasis:/);
  assert.match(systemSource, /Surface changes create meaningful chapters/);
  assert.match(systemSource, /Each page blueprint must name its intended surface sequence/);
  assert.match(systemSource, /siteContinuity/);
  assert.match(systemSource, /requiredAcrossPages/);
  assert.match(systemSource, /contextualizePerPage/);
  assert.match(systemSource, /copying the Home page section order onto another page/);

  for (const token of [
    "--surface-chapter-canvas",
    "--surface-chapter-taupe",
    "--surface-chapter-soft",
    "--surface-chapter-dark",
    "--surface-dark-copy-muted",
    "--surface-dark-rule",
  ]) {
    assert.match(cssSource, new RegExp(token));
    assert.match(documentation, new RegExp(token));
  }

  assert.match(cssSource, /\.surface-chapter-dark/);
  assert.match(documentation, /Contrast and Surface Rhythm/);
  assert.match(documentation, /Site-Wide Continuity/);
  assert.match(documentation, /must not alternate dark and light mechanically/);
});

test("keeps motion optional, crawlable, stable, and reduced-motion safe", () => {
  assert.match(systemSource, /Content is present in server-rendered HTML and never gated by motion/);
  assert.match(systemSource, /opacity and transform rather than layout-changing properties/);
  assert.match(systemSource, /No animation delays reading, navigation, or conversion actions/);
  assert.match(systemSource, /prefers-reduced-motion removes non-essential movement/);
  assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(cssSource, /animation-duration: 0\.01ms !important/);
  assert.match(cssSource, /opacity: var\(--fade-opacity, 1\) !important/);
});

test("documents the approved Phase 2 visual-system foundation", () => {
  assert.match(documentation, /Editorial Event Portfolio/);
  assert.match(documentation, /Approved as the Phase 2 creative and design-system foundation/);
  assert.match(documentation, /Luxe Coffee Bar/);
  assert.match(documentation, /Luxe Sweet Cart/);
  assert.match(documentation, /Luxe Seating Rentals/);
  assert.match(documentation, /WCAG 2\.2 Level AA/);
  assert.match(documentation, /Production\s+release still requires final assets/);
});
