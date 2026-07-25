import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const shell = await readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8");
const navigation = await readFile(
  new URL("../app/components/site-navigation.tsx", import.meta.url),
  "utf8",
);
const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");
const gallery = await readFile(
  new URL("../app/components/gallery-collection.tsx", import.meta.url),
  "utf8",
);
const weddings = await readFile(
  new URL("../app/components/weddings-page.tsx", import.meta.url),
  "utf8",
);
const galleryContent = await readFile(
  new URL("../app/gallery/gallery-content.ts", import.meta.url),
  "utf8",
);
const responsiveImage = await readFile(
  new URL("../app/components/responsive-image.tsx", import.meta.url),
  "utf8",
);
const contract = await readFile(new URL("../app/responsive-system.ts", import.meta.url), "utf8");
const documentation = await readFile(
  new URL("../docs/responsive-behaviour.md", import.meta.url),
  "utf8",
);

test("defines the complete Step 2.3 viewport matrix and parity contract", () => {
  for (const viewport of [
    "320x700",
    "390x844",
    "430x932",
    "768x1024",
    "1024x768",
    "1366x768",
    "1440x900",
    "2560x1440",
  ]) {
    assert.match(contract, new RegExp(viewport.replace("x", "x")));
  }

  assert.match(contract, /same primary content, headings, links, metadata, and structured data/i);
  assert.match(contract, /44 by 44 CSS pixels/i);
  assert.match(contract, /do not create horizontal viewport overflow/i);
  assert.match(documentation, /Responsive behavior changes composition, not meaning/i);
});

test("keeps every primary destination in an accessible mobile navigation", () => {
  assert.match(shell, /<MobileNavigation \/>/);
  assert.match(navigation, /className="foundation-mobile-nav"/);
  assert.match(navigation, /<summary aria-expanded=\{isOpen\}>/);
  assert.match(navigation, /Mobile primary navigation/);

  assert.match(navigation, /navigationItems\.map/);
  assert.match(navigation, /item\.children\.map/);

  assert.doesNotMatch(css, /foundation-header nav a:nth-child/);
  assert.match(css, /\.foundation-mobile-nav summary\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.foundation-mobile-nav-list > li > a\s*\{[^}]*min-height:\s*54px/s);
});

test("uses readable shared shell type and touch-sized functional links", () => {
  assert.match(css, /\.foundation-desktop-nav\s*\{[^}]*font-size:\s*\.875rem/s);
  assert.match(css, /\.foundation-footer\s*\{[^}]*font-size:\s*\.875rem/s);
  assert.match(css, /\.foundation-footer a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(
    css,
    /\.foundation-shell main :where\(a, button, summary\)\s*\{[^}]*min-height:\s*44px[^}]*font-size:\s*max\(\.875rem, 1em\)/s,
  );
  assert.match(css, /\.gallery-group > nav a\s*\{[^}]*min-height:\s*44px/s);
  assert.match(css, /\.faq-hub-category details nav a\s*\{[^}]*min-height:\s*44px/s);
});

test("keeps long editorial heroes and their actions inside narrow mobile viewports", () => {
  assert.match(
    css,
    /\.foundation-shell :where\(\s*\.wedding-hero,\s*\.corporate-hero,[\s\S]*?\.faq-hub-hero\s*\)\s*\{\s*grid-template-columns:\s*minmax\(0,\s*1fr\)/s,
  );
  assert.match(
    css,
    /\.foundation-shell :where\(\s*\.wedding-hero-copy,[\s\S]*?\.faq-hub-hero-copy\s*\)\s*h1 span\s*\{[^}]*white-space:\s*normal/s,
  );
  assert.match(
    css,
    /\.foundation-shell :where\(\s*\.wedding-hero-actions,[\s\S]*?\.faq-hub-hero-actions\s*\)\s*a\s*\{[^}]*width:\s*100%[^}]*font-size:\s*\.72rem/s,
  );
});

test("groups the footer content into aligned identity, contact, social, and inquiry regions", () => {
  assert.match(shell, /foundation-footer-wordmark/);
  assert.match(shell, /foundation-footer-label">Contact/);
  assert.match(shell, /foundation-footer-label">Follow/);
  assert.match(shell, /className="foundation-footer-cta"/);
  assert.match(css, /\.foundation-footer\s*\{[^}]*grid-template-columns:[^}]*background:\s*var\(--color-luxe-black\)/s);
  assert.match(css, /\.foundation-footer\s*\{\s*margin-top:\s*clamp\(2rem,\s*5vw,\s*5rem\)/s);
});

test("uses the Weddings heading scale for every non-Home page", () => {
  assert.match(
    css,
    /--type-internal-page-h1:\s*clamp\(2\.75rem,\s*4vw,\s*3\.9rem\)/,
  );
  assert.doesNotMatch(
    css,
    /\.foundation-shell \.faq-hub-hero-copy h1\s*\{\s*font-size:/s,
  );
  assert.match(
    css,
    /@media \(min-width:\s*1101px\)[\s\S]*?\.experiences-hero-copy,[\s\S]*?\.inquire-hero-copy[\s\S]*?\) h1 span\s*\{[^}]*display:\s*block[^}]*white-space:\s*nowrap/s,
  );
});

test("uses one contained natural-wrap contract for every internal hero title", () => {
  for (const heroCopy of [
    "experiences",
    "events",
    "coffee",
    "sweet",
    "seating",
    "wedding",
    "corporate",
    "activation",
    "baby",
    "bridal",
    "birthday",
    "private",
    "gallery",
    "faq-hub",
    "inquire",
  ]) {
    assert.match(css, new RegExp(`\\.${heroCopy}-hero-copy`));
  }

  assert.match(css, /Site-wide internal hero title flow/);
  assert.match(css, /\) h1\s*\{[^}]*max-width:\s*100%[^}]*text-wrap:\s*pretty/s);
  assert.match(css, /\) h1 span\s*\{[^}]*display:\s*inline[^}]*white-space:\s*normal/s);
});

test("keeps the desktop Weddings title in a three-line ascending composition", () => {
  assert.match(
    weddings,
    /<span>Wedding coffee,<\/span>\s*<span>dessert, and rentals,<\/span>\s*<span>woven through the day\.<\/span>/s,
  );
  assert.match(
    css,
    /@media \(min-width:\s*1101px\)[\s\S]*?\.wedding-hero-copy,[\s\S]*?\) h1 span\s*\{[^}]*display:\s*block[^}]*white-space:\s*nowrap/s,
  );
});

test("moves desktop event heroes upward while retaining bottom breathing room", () => {
  assert.match(
    css,
    /@media \(min-width:\s*901px\)[\s\S]*?\.events-hero,[\s\S]*?\.private-hero[\s\S]*?min-height:\s*0[\s\S]*?padding-block:\s*clamp\(2rem,\s*4vh,\s*3\.25rem\)\s*clamp\(4rem,\s*8vh,\s*6\.5rem\)/s,
  );
  assert.match(
    css,
    /\.events-hero-composition,[\s\S]*?\.private-hero-art[\s\S]*?min-height:\s*clamp\(29rem,\s*min\(47vw,\s*calc\(100svh - 12rem\)\),\s*44rem\)/s,
  );
});

test("keeps gallery media responsive, prioritized, and lazy below the fold", () => {
  assert.match(gallery, /<ResponsiveImage/);
  assert.match(galleryContent, /sizes: "\(max-width: 700px\) 100vw, \(max-width: 1100px\) 50vw, 38vw"/);
  assert.match(responsiveImage, /asset\.priority \? "eager" : "lazy"/);
  assert.match(responsiveImage, /asset\.priority \? "high" : "auto"/);
  assert.match(css, /\.gallery-filters\s*\{[\s\S]*?overflow-x:\s*auto/s);
});

test("retains reduced-motion support and an ultrawide content cap", () => {
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /\.foundation-header[^}]*max-width:\s*1400px/);
  assert.match(css, /\.foundation-page,\s*\.foundation-detail[^}]*max-width:\s*1400px/);
});
