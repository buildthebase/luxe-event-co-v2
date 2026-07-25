import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const blueprints = await readFile(
  new URL("../app/phase-2-blueprints.ts", import.meta.url),
  "utf8",
);
const interactions = await readFile(
  new URL("../app/interaction-system.ts", import.meta.url),
  "utf8",
);
const testimonials = await readFile(
  new URL("../app/testimonial-system.ts", import.meta.url),
  "utf8",
);
const assets = await readFile(
  new URL("../app/asset-content-requirements.ts", import.meta.url),
  "utf8",
);
const closeout = await readFile(
  new URL("../docs/phase-2-closeout.md", import.meta.url),
  "utf8",
);
const pageDocumentation = await readFile(
  new URL("../docs/phase-2-page-blueprints.md", import.meta.url),
  "utf8",
);

const permanentRoutes = [
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
];

test("defines a distinct responsive blueprint for every permanent page", () => {
  assert.equal((blueprints.match(/path: "\//g) ?? []).length, 16);

  for (const route of permanentRoutes) {
    assert.match(blueprints, new RegExp(`path: "${route === "/" ? "\\/" : route}"`), route);
  }

  for (const field of [
    "hierarchy:",
    "surfaceSequence:",
    "desktopComposition:",
    "mobileComposition:",
    "differentiator:",
    "dependencies:",
  ]) {
    assert.equal(
      (blueprints.match(new RegExp(`\\n    ${field}`, "g")) ?? []).length,
      16,
      field,
    );
  }
});

test("defines every critical template and responsive content-parity boundary", () => {
  for (const template of [
    "Home",
    "Hub",
    "Experience detail",
    "Event detail",
    "Gallery",
    "FAQ",
    "Contact",
  ]) {
    assert.match(blueprints, new RegExp(`template: "${template}"`));
  }

  assert.match(pageDocumentation, /Desktop and mobile use the same server-rendered content/i);
  assert.match(pageDocumentation, /Important text may not be removed/i);
});

test("defines keyboard, hover, focus, loading, and reduced-motion behavior", () => {
  assert.equal((interactions.match(/control: "/g) ?? []).length, 8);

  for (const field of ["keyboard:", "hover:", "focus:", "loading:", "reducedMotion:"]) {
    assert.equal(
      (interactions.match(new RegExp(`\\n    ${field}`, "g")) ?? []).length,
      8,
      field,
    );
  }

  assert.match(interactions, /Do not invent loading indicators for synchronous controls/);
  assert.match(interactions, /Hover and focus communicate the same available action/);
});

test("keeps testimonials factual, contextual, and permission-gated", () => {
  assert.match(testimonials, /awaiting-approved-content/);
  assert.match(testimonials, /Approved quotation/);
  assert.match(testimonials, /Approved attribution/);
  assert.match(testimonials, /Permission to publish/);
  assert.match(testimonials, /Named-organization permission does not imply testimonial/);
  assert.doesNotMatch(testimonials, /quote:\s*"/);
});

test("records production dependencies without reversing approved logo permission", () => {
  assert.match(assets, /corporate-organization-logos/);
  assert.match(assets, /status: "confirmed-available"/);
  assert.match(assets, /home-hero-media/);
  assert.match(assets, /inquiry-platform/);
  assert.match(closeout, /The five approved organization logos may be displayed/);
  assert.match(closeout, /does not grant permission for a quotation, case study/);
});

test("closes every named Phase 2 deliverable and acceptance criterion", () => {
  for (const deliverable of [
    "Approved creative direction",
    "Design-token system",
    "Typography system",
    "Colour system",
    "Spacing system",
    "Motion guidelines",
    "Responsive navigation",
    "Footer design",
    "Signature experience selector",
    "Event-planning pathway",
    "Combined-experience module",
    "Credibility module",
    "Testimonial module",
    "Gallery system",
    "Contextual inquiry modules",
    "Wireframes for all 16 pages",
    "Desktop and mobile critical-template designs",
    "Page-by-page content briefs",
    "Accessibility design review",
  ]) {
    assert.match(closeout, new RegExp(deliverable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }

  assert.match(closeout, /Every page has an approved content hierarchy/);
  assert.match(closeout, /Every page has a clear primary CTA/);
  assert.match(closeout, /The three divisions feel distinct but related/);
  assert.match(closeout, /Wedding and corporate journeys are fully represented/);
});
