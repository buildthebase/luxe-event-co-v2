import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/aeo-question-classification.ts", import.meta.url),
  "utf8",
);

const researchSource = await readFile(
  new URL("../app/aeo-query-research.ts", import.meta.url),
  "utf8",
);

const questionIds = [
  "experience-fit",
  "wedding-service-timing",
  "guest-use-and-value",
  "capacity-throughput-lines",
  "staffing-and-inclusions",
  "menu-and-dietary-fit",
  "branding-and-creative-approval",
  "space-power-water",
  "venue-access-and-timing",
  "outdoor-and-weather",
  "pricing-minimums-and-scope",
  "booking-lead-time-and-availability",
  "travel-and-service-area",
  "dessert-quantity-and-flow",
  "rental-inventory-layout",
  "rental-delivery-setup-responsibility",
  "rental-risk-and-changes",
  "corporate-scale-and-repetition",
  "procurement-insurance-and-compliance",
  "coordination-and-role-boundaries",
  "comparable-proof",
];

test("classifies every canonical research cluster exactly once", () => {
  for (const id of questionIds) {
    assert.match(researchSource, new RegExp(`id: "${id}"`), `research: ${id}`);

    const occurrences = source.match(
      new RegExp(`questionId: "${id}"`, "g"),
    )?.length;
    assert.equal(occurrences, 1, `classification: ${id}`);
  }

  assert.match(source, /unclassifiedQuestionIds/);
  assert.match(source, /unknownClassificationIds/);
});

test("uses the required funnel stages and search-intent vocabulary", () => {
  for (const stage of [
    "Discovery",
    "Understanding",
    "Planning",
    "Comparison",
    "Cost investigation",
    "Vendor evaluation",
    "Booking preparation",
  ]) {
    assert.match(source, new RegExp(`"${stage}"`), stage);
  }

  for (const intent of [
    "Informational",
    "Commercial investigation",
    "Transactional",
    "Local",
    "Comparison",
    "Logistical",
    "Troubleshooting",
    "Inspirational",
  ]) {
    assert.match(source, new RegExp(`"${intent}"`), intent);
  }
});

test("records all requested classification dimensions", () => {
  for (const field of [
    "icps",
    "services",
    "eventTypes",
    "searchIntents",
    "funnelStages",
    "geographicIntent",
    "commercialImportance",
    "operationalImportance",
    "firstPartyEvidence",
    "destination",
    "recommendedFormat",
    "answerStatus",
    "placement",
    "futureResourcePotential",
  ]) {
    assert.match(source, new RegExp(`${field}:`), field);
  }
});

test("separates existing answers from the evidence available to expand them", () => {
  assert.match(
    source,
    /An answered status means a responsible answer exists; it does not authorize a universal number/,
  );
  assert.match(
    source,
    /questionId: "corporate-scale-and-repetition"[\s\S]*?status: "partial"/,
  );
  assert.match(source, /Multi-day and recurring operating models remain unverified/);
  assert.match(source, /questionId: "space-power-water"[\s\S]*?answerStatus: "dependency blocked"/);
  assert.match(source, /questionId: "rental-risk-and-changes"[\s\S]*?answerStatus: "dependency blocked"/);
});

test("prevents the classification from creating content and location bloat", () => {
  assert.match(source, /newRoutes: \[\] as string\[\]/);
  assert.match(source, /futureResourceRecommendations: \[\] as string\[\]/);
  assert.match(source, /Each natural-language variant inherits the classification/);
  assert.match(source, /Future-resource potential is a conditional evidence threshold/);
  assert.match(source, /Do not create city pages from geographic-intent labels/);
  assert.match(source, /Keep conversion-page answers concise/);
});
