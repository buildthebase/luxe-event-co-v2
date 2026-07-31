import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const heroSource = await readFile(
  new URL("../app/components/home-hero.tsx", import.meta.url),
  "utf8",
);
const contentSource = await readFile(new URL("../app/home-content.ts", import.meta.url), "utf8");
const schemaSource = await readFile(
  new URL("../app/schema-builders.ts", import.meta.url),
  "utf8",
);
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("keeps the public Home route on the coming-soon experience", () => {
  assert.match(pageSource, /Full website/);
  assert.match(pageSource, /coming soon/);
  assert.match(pageSource, /className="constellation"/);
  assert.match(pageSource, /Crafted coffee, elevated desserts, and elegant seating/);
  assert.doesNotMatch(pageSource, /<HomeHero/);
});

test("withholds testimonial placements until publishable quotations exist", () => {
  assert.doesNotMatch(pageSource, /<HomeTestimonials/);
});

test("keeps the Home hero focused on one primary CTA", () => {
  assert.match(heroSource, /Plan Your Event/);
  assert.doesNotMatch(heroSource, /Explore Experiences/);
  assert.match(heroSource, /<dialog/);
  assert.match(heroSource, /Flashquotes quote form/);
  assert.equal((heroSource.match(/home-hero-actions/g) ?? []).length, 1);
});

test("keeps removed explanatory copy and duplicate credibility language off Home", () => {
  assert.doesNotMatch(pageSource, /<ExperienceSelector/);
  assert.doesNotMatch(pageSource, /<EventPlanningPathway/);
  assert.doesNotMatch(heroSource, /The complete Luxe Event Co\. experience/);
  assert.equal((heroSource.match(/<CredibilityStrip variant="hero" \/>/g) ?? []).length, 1);
});

test("covers the four primary event contexts and verified operational proof", () => {
  for (const slug of [
    "weddings",
    "corporate-events",
    "brand-activations",
    "private-events",
  ]) {
    assert.match(contentSource, new RegExp(`"${slug}"`));
  }

  assert.match(contentSource, /\$5M/);
  assert.match(contentSource, /guest coffee capacity/);
  assert.match(contentSource, /simultaneous setups/);
});

test("publishes the complete approved Home service area", () => {
  for (const place of [
    "Markham",
    "Toronto",
    "Vaughan",
    "Richmond Hill",
    "Aurora",
    "Newmarket",
    "King City",
    "Thornhill",
    "North York",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Burlington",
    "Milton",
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
    "Scarborough",
    "Etobicoke",
    "Greater Toronto Area \\(GTA\\)",
    "Southern Ontario \\(for larger events\\)",
  ]) {
    assert.match(contentSource, new RegExp(`"${place}"`), place);
  }

  assert.doesNotMatch(contentSource, /"Hamilton"/);
});

test("models the parent, connected divisions, services, logo, and social profiles", () => {
  assert.match(pageSource, /createHomePageSchema/);
  assert.match(schemaSource, /department: experiences\.map/);
  assert.match(schemaSource, /parentOrganization: \{ "@id": organizationId \}/);
  assert.match(schemaSource, /brand: \{ "@id": divisionIds\[experience\.slug\] \}/);
  assert.match(schemaSource, /logo: \{ "@id": organizationLogoId \}/);
  assert.match(schemaSource, /sameAs: \[experience\.instagram\]/);
});

test("recomposes unified-experience notes before desktop columns become cramped", () => {
  assert.match(
    cssSource,
    /\.home-unified-notes\s*\{[\s\S]*?grid-template-columns: repeat\(3, minmax\(0, 1fr\)\)/,
  );
  assert.match(
    cssSource,
    /\.home-unified-notes li\s*\{[\s\S]*?grid-template-columns: 2\.5rem minmax\(0, 1fr\)[\s\S]*?font-size: clamp\(1\.4rem, 1\.8vw, 1\.75rem\)/,
  );
  assert.match(
    cssSource,
    /@media \(max-width: 960px\)[\s\S]*?\.home-unified-notes\s*\{[\s\S]*?grid-template-columns: 1fr/,
  );
});
