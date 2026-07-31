import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const mediaSource = await readFile(
  new URL("../app/home-hero-media.ts", import.meta.url),
  "utf8",
);
const heroSource = await readFile(
  new URL("../app/components/home-hero.tsx", import.meta.url),
  "utf8",
);
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("defines the approved four-stage Home hero timeline", () => {
  assert.match(mediaSource, /clipDurationMs: 3000/);
  assert.match(mediaSource, /finalClipDurationMs: 7000/);
  assert.match(mediaSource, /crossfadeMs: 500/);
  assert.match(mediaSource, /phaseStartsMs: \[0, 2500, 5000, 7500\]/);
  assert.match(mediaSource, /finalPhaseIndex: 3/);

  for (const [id, placement, word] of [
    ["coffee", "left", "Sip,"],
    ["dessert", "center", "Indulge,"],
    ["seating", "right", "Gather."],
    ["together", "full", null],
  ]) {
    assert.match(mediaSource, new RegExp(`id: "${id}"`));
    assert.match(mediaSource, new RegExp(`placement: "${placement}"`));
    assert.match(mediaSource, new RegExp(`word: ${word === null ? "null" : `"${word.replace(".", "\\.")}"`}`));
  }
});

test("keeps essential hero content rendered while controlling its visual reveal", () => {
  assert.doesNotMatch(heroSource, /Luxe Event Co\. \/ Toronto &amp; the GTA/);
  assert.match(heroSource, /aria-label="Sip, Indulge, Gather\."/);
  assert.match(heroSource, /Mobile coffee, live dessert, and event rentals brought together/);
  assert.match(heroSource, /Plan Your Event/);
  assert.doesNotMatch(heroSource, /Explore Experiences/);
  assert.doesNotMatch(heroSource, /href="\/inquire"/);
  assert.match(heroSource, /aria-haspopup="dialog"/);
  assert.match(heroSource, /Quote form integration placeholder/);
  assert.match(heroSource, /dialog\.showModal\(\)/);
  assert.match(heroSource, /<CredibilityStrip variant="hero" \/>/);
  assert.match(heroSource, /tabIndex=\{finalState \? 0 : -1\}/);
});

test("supports skipping, reduced motion, data saving, and resilient video playback", () => {
  assert.match(heroSource, /prefers-reduced-motion: reduce/);
  assert.match(heroSource, /connection\?\.saveData/);
  assert.match(heroSource, /Skip intro/);
  assert.match(heroSource, /muted/);
  assert.match(heroSource, /loop/);
  assert.match(heroSource, /playsInline/);
  assert.match(heroSource, /onError=\{\(\) => markMediaFailed/);
  assert.match(heroSource, /video\.play\(\)\.catch/);
});

test("recomposes the sequence for mobile and exposes a reduced-motion final state", () => {
  assert.match(cssSource, /\.home-cinematic-media-grid\s*\{[\s\S]*grid-template-columns: repeat\(3/);
  assert.match(
    cssSource,
    /\.home-cinematic-stage\s*\{[\s\S]*width: 100vw;[\s\S]*margin-inline: calc\(50% - 50vw\)/,
  );
  assert.match(cssSource, /@media \(max-width: 820px\)[\s\S]*\.home-cinematic-media-grid\s*\{[\s\S]*display: block/);
  assert.match(
    cssSource,
    /@media \(max-width: 700px\)[\s\S]*\.home-cinematic-stage\s*\{[\s\S]*min-height: max\(36rem, 100svh\)/,
  );
  assert.match(cssSource, /@media \(prefers-reduced-motion: reduce\)[\s\S]*\.home-cinematic-panel-together/);
  assert.match(cssSource, /\.home-cinematic-actions\.is-visible/);
  assert.match(cssSource, /home-mobile-carousel-coffee 21s linear infinite/);
  assert.match(cssSource, /home-mobile-carousel-dessert 21s linear infinite/);
  assert.match(cssSource, /home-mobile-carousel-seating 21s linear infinite/);
  assert.match(cssSource, /transition: opacity 500ms/);
});
