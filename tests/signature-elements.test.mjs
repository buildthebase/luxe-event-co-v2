import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const dataSource = await readFile(
  new URL("../app/signature-elements.ts", import.meta.url),
  "utf8",
);
const componentSource = await readFile(
  new URL("../app/components/signature-elements.tsx", import.meta.url),
  "utf8",
);
const experiencesSource = await readFile(
  new URL("../app/experiences/page.tsx", import.meta.url),
  "utf8",
);
const homeSource = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
const eventsSource = await readFile(new URL("../app/events/page.tsx", import.meta.url), "utf8");
const detailSource = await readFile(
  new URL("../app/components/route-detail.tsx", import.meta.url),
  "utf8",
);
const documentation = await readFile(
  new URL("../docs/phase-2-signature-elements.md", import.meta.url),
  "utf8",
);

test("defines one connected selector with three distinct experience expressions", () => {
  for (const label of ["Coffee", "Dessert", "Seating"]) {
    assert.match(dataSource, new RegExp(`label: "${label}"`));
  }

  assert.match(dataSource, /\/experiences\/coffee-bar/);
  assert.match(dataSource, /\/experiences\/sweet-cart/);
  assert.match(dataSource, /\/experiences\/seating-rentals/);
  assert.match(componentSource, /signature-selector-world/);
  assert.match(componentSource, /signature-selector-\$\{experience\.id\}/);
});

test("defines the complete explanatory event-planning pathway", () => {
  for (const step of [
    "Choose the occasion.",
    "Select the experiences.",
    "Personalize the details.",
    "Begin the inquiry.",
  ]) {
    assert.match(dataSource, new RegExp(step.replace(".", "\\.")));
  }

  assert.match(documentation, /This is an explanatory interface, not an inquiry form/);
  assert.match(componentSource, /signature-pathway-list/);
});

test("uses curated event combinations instead of recommendation cards", () => {
  assert.match(dataSource, /Coffee Bar \+ Sweet Cart/);
  assert.match(dataSource, /Coffee Bar \+ Seating/);
  assert.match(dataSource, /Coffee \+ Dessert \+ Rentals/);
  assert.match(dataSource, /Branded drinks \+ Signage/);
  assert.match(
    dataSource,
    /id: "product-launch"[\s\S]*?experienceIds: \["coffee", "signage"\]/,
  );
  assert.match(documentation, /planning directions, not fixed packages/);
  assert.doesNotMatch(componentSource, /recommendation-card/);
});

test("renders only organization proof items with confirmed permission", () => {
  for (const organization of [
    "OPTrust",
    "CST Savings",
    "Convergint",
    "ICNA Canada",
    "Waste Connections of Canada",
  ]) {
    assert.match(dataSource, new RegExp(organization));
  }

  const credibilityRecords =
    dataSource.match(
      /export const credibilityOrganizations[\s\S]*?(?=export type InquiryContext)/,
    )?.[0] ?? "";
  assert.equal(
    (credibilityRecords.match(/permission: "approved"/g) ?? []).length,
    5,
  );
  assert.doesNotMatch(credibilityRecords, /permission: "pending-written-confirmation"/);
  assert.match(componentSource, /organization\.permission === "approved"/);
  assert.match(componentSource, /approvedOrganizations\.length === 0/);
});

test("defines contextual inquiry language for every division and event context", () => {
  for (const heading of [
    "Inquire about coffee service.",
    "Plan your dessert experience.",
    "Discuss your seating requirements.",
    "Plan your wedding experience.",
    "Discuss a corporate event.",
    "Create a branded experience.",
  ]) {
    assert.match(dataSource, new RegExp(heading.replace(".", "\\.")));
  }

  assert.match(detailSource, /ContextualInquiryPanel contextKey=\{experience\.slug\}/);
  assert.match(detailSource, /ContextualInquiryPanel contextKey=\{event\.slug\}/);
});

test("keeps signature modules implemented on the hubs while Home is gated", () => {
  assert.match(dataSource, /implemented-in-full-home-blueprint/);
  assert.doesNotMatch(homeSource, /<ExperienceSelector/);
  assert.doesNotMatch(homeSource, /<CombinedExperienceFeature/);
  assert.doesNotMatch(homeSource, /<EventPlanningPathway/);
  assert.doesNotMatch(homeSource, /<ContextualInquiryPanel/);
  assert.match(experiencesSource, /<ExperienceSelector id="experience-selector" \/>/);
  assert.match(experiencesSource, /<CombinedExperienceFeature \/>/);
  assert.match(experiencesSource, /<EventPlanningPathway \/>/);
  assert.match(eventsSource, /<CombinedExperienceFeature \/>/);
  assert.match(
    eventsSource,
    /<EventPlanningPathway(?: showDescription=\{false\})? \/>/,
  );
  assert.match(detailSource, /slug === "corporate-events" \|\| slug === "brand-activations"/);
});
