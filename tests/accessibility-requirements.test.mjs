import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
const shell = await readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8");
const navigation = await readFile(
  new URL("../app/components/site-navigation.tsx", import.meta.url),
  "utf8",
);
const gallery = await readFile(
  new URL("../app/components/gallery-collection.tsx", import.meta.url),
  "utf8",
);
const homeHero = await readFile(
  new URL("../app/components/home-hero.tsx", import.meta.url),
  "utf8",
);
const faq = await readFile(new URL("../app/faq/page.tsx", import.meta.url), "utf8");
const faqAccordion = await readFile(
  new URL("../app/components/faq-accordion.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const contract = await readFile(
  new URL("../app/accessibility-system.ts", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/accessibility-requirements.md", import.meta.url),
  "utf8",
);

test("establishes the WCAG 2.2 AA contract and semantic bypass path", () => {
  assert.match(contract, /WCAG 2\.2 Level AA/);
  assert.match(layout, /<html lang=\{siteConfig\.language\}/);
  assert.ok(
    shell.indexOf('className="foundation-skip-link"') <
      shell.indexOf('className="foundation-header"'),
  );
  assert.match(shell, /href="#main-content"/);
  assert.match(shell, /id="main-content" tabIndex=\{-1\}/);
  assert.match(shell, /<footer className="foundation-footer">/);
});

test("exposes navigation state and descriptive external-link behavior", () => {
  assert.match(navigation, /usePathname/);
  assert.match(navigation, /aria-current=\{currentState/);
  assert.match(navigation, /return "page"/);
  assert.match(navigation, /return "location"/);
  assert.match(shell, /aria-label="Luxe divisions on Instagram"/);
  assert.match(shell, /opens in a new tab/g);
  assert.match(css, /a\[aria-current\][\s\S]*text-decoration:\s*underline/);
});

test("uses accessible native disclosures, gallery states, and status messaging", () => {
  assert.match(shell, /<MobileNavigation \/>/);
  assert.match(navigation, /className="foundation-mobile-nav"/);
  assert.match(navigation, /<summary aria-expanded=\{isOpen\}>/);
  assert.match(faq, /<FaqAccordion/);
  assert.match(faqAccordion, /<details/);
  assert.match(faqAccordion, /<summary>/);
  assert.match(gallery, /role="group" aria-label="Filter gallery groups"/);
  assert.match(gallery, /aria-pressed=\{activeFilter === filter\.value\}/);
  assert.match(gallery, /aria-controls="gallery-groups"/);
  assert.match(gallery, /role="status" aria-live="polite" aria-atomic="true"/);
});

test("keeps motion and cinematic media from withholding accessible meaning", () => {
  assert.match(homeHero, /home-cinematic-media-alternative/);
  assert.match(homeHero, /muted/);
  assert.match(homeHero, /playsInline/);
  assert.match(homeHero, /aria-hidden="true"/);
  assert.doesNotMatch(homeHero, /autoPlay/);
  assert.match(homeHero, /prefers-reduced-motion: reduce/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(documentation, /No media may autoplay audio/);
  assert.match(documentation, /synchronized captions and a transcript/i);
});

test("uses AA text colours while retaining the approved decorative palette", () => {
  assert.match(css, /--color-luxe-gold:\s*#C8A97E/i);
  assert.match(css, /--color-luxe-grey:\s*#7A7A7A/i);
  assert.match(css, /--color-luxe-gold-ink:\s*#695438/i);
  assert.match(css, /--color-luxe-gold-on-dark:\s*#dec297/i);
  assert.match(css, /--color-text-muted:\s*#595754/i);
  assert.doesNotMatch(css, /(?<![-\w])color:\s*var\(--color-luxe-gold\);/);
  assert.doesNotMatch(css, /(?<![-\w])color:\s*var\(--color-luxe-grey\);/);
  assert.match(documentation, /approximately 6\.65:1/);
  assert.match(documentation, /approximately 6\.67:1/);
  assert.match(css, /--color-luxe-gold-ink:\s*var\(--color-luxe-gold-on-dark\)/);
  assert.match(css, /--color-text-muted:\s*var\(--surface-dark-copy-muted\)/);
});

test("documents focus, target-size, image, and future-form requirements", () => {
  assert.match(css, /\.foundation-skip-link:focus/);
  assert.match(css, /:focus-visible\s*\{/);
  assert.match(css, /min-height:\s*44px/);
  assert.match(contract, /persistent visible label/);
  assert.match(contract, /focus moves to an error summary/i);
  assert.match(contract, /meaningfulImages/);
  assert.match(contract, /decorativeImages/);
  assert.match(documentation, /current website.*does not contain native inquiry fields/is);
});
