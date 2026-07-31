import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  evidence,
  assets,
  testimonials,
  signatureData,
  signatureComponent,
  home,
  coffee,
  sweet,
  seating,
  faq,
  documentation,
] = await Promise.all([
  read("../app/aeo-first-party-evidence.ts"),
  read("../app/asset-content-requirements.ts"),
  read("../app/testimonial-system.ts"),
  read("../app/signature-elements.ts"),
  read("../app/components/signature-elements.tsx"),
  read("../app/components/home-sections.tsx"),
  read("../app/components/coffee-bar-page.tsx"),
  read("../app/components/sweet-cart-page.tsx"),
  read("../app/components/seating-rentals-page.tsx"),
  read("../app/faq/page.tsx"),
  read("../docs/phase-4b-first-party-evidence.md"),
]);

test("inventories every requested first-party evidence category", () => {
  for (const item of [
    "Original event photography",
    "Confirmed service inclusions",
    "Actual menus",
    "Confirmed capacities",
    "Confirmed setup information",
    "Actual event examples",
    "Customization photography",
    "Branded cup or signage examples",
    "Approved corporate names",
    "Genuine testimonials",
    "Wedding gallery evidence",
    "Corporate gallery evidence",
    "Multi-service event examples",
    "Actual booking policies",
    "Actual service-area policies",
  ]) {
    assert.match(evidence, new RegExp(`evidence: "${item}"`), item);
  }
});

test("pairs confirmed service answers with visible first-party facts", () => {
  assert.match(home, /data-evidence-status="confirmed-first-party"/);
  assert.match(home, /Confirmed operating facts/);

  assert.match(coffee, /Confirmed inclusions/);
  assert.match(coffee, /data-evidence-status="confirmed-menu-selections"/);
  assert.match(coffee, /Confirmed capacity and service planning/);

  assert.match(sweet, /Confirmed inclusions/);
  assert.match(sweet, /data-evidence-status="confirmed-menu-selections"/);
  assert.match(sweet, /Confirmed capacity and setup scope/);

  assert.match(seating, /data-evidence-status="confirmed-categories"/);
  assert.match(seating, /data-evidence-status="confirmed-boundary-policy-pending"/);
  assert.match(faq, /data-evidence-source="client-intake-and-approved-policy"/);
});

test("limits approved corporate proof to names and logos", () => {
  for (const organization of [
    "OPTrust",
    "CST Savings",
    "Convergint",
    "ICNA Canada",
    "Waste Connections of Canada",
  ]) {
    const start = signatureData.indexOf(`name: "${organization}"`);
    assert.notEqual(start, -1, organization);
    assert.match(signatureData.slice(start, start + 180), /permission: "approved"/);
  }

  assert.match(signatureComponent, /data-evidence-status="approved-organization-names"/);
  assert.match(
    signatureComponent,
    /data-evidence-boundary="no-testimonial-endorsement-or-case-study-inference"/,
  );
});

test("keeps unavailable visual and testimonial proof behind publication gates", () => {
  assert.match(assets, /slug: "coffee-photography"[\s\S]*?status: "needed"/);
  assert.match(assets, /slug: "branded-activation-proof"[\s\S]*?status: "permission-required"/);
  assert.match(assets, /slug: "wedding-proof"[\s\S]*?status: "permission-required"/);
  assert.match(testimonials, /status: "awaiting-approved-content"/);
  assert.match(evidence, /inventedEvents: \[\]/);
  assert.match(evidence, /inventedTestimonials: \[\]/);
  assert.match(evidence, /stockOrGeneratedProof: \[\]/);
});

test("records the confirmed booking, capacity, and service-area evidence", () => {
  assert.match(evidence, /Coffee capacity is up to 500 guests/);
  assert.match(evidence, /Sweet Cart capacity is up to 400 guests/);
  assert.match(evidence, /30% non-refundable retainer/);
  assert.match(evidence, /remaining balance due seven days before the event/);
  assert.match(evidence, /Toronto and the approved GTA cities form the primary service area/);
});

test("narrows menu dependencies without claiming unsupported permanence", () => {
  assert.match(
    assets,
    /asset: "Final menu availability, dietary notes, and version ownership"/,
  );
  assert.match(evidence, /Final availability, dietary notes, and version ownership remain content dependencies/);
  assert.match(documentation, /site does not present every selection as permanently available/);
});

test("documents the no-invention and no-bloat boundary", () => {
  assert.match(evidence, /newRoutes: \[\]/);
  assert.match(documentation, /No stock, generated, or representative photography/);
  assert.match(documentation, /No planning combination was relabelled as an actual completed event/);
  assert.match(documentation, /No new case-study, gallery, testimonial, or resource route/);
});
