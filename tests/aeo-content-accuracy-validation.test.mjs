import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [validation, implementation, questionMap, documentation, publicSources] =
  await Promise.all([
    read("../app/aeo-content-validation.ts"),
    read("../app/aeo-implementation.ts"),
    read("../app/aeo-question-map.ts"),
    read("../docs/phase-4b-content-accuracy-validation.md"),
    Promise.all([
      read("../app/experiences/coffee-bar-content.ts"),
      read("../app/experiences/sweet-cart-content.ts"),
      read("../app/experiences/seating-rentals-content.ts"),
      read("../app/events/weddings-content.ts"),
      read("../app/events/corporate-events-content.ts"),
      read("../app/events/brand-activations-content.ts"),
      read("../app/events/private-events-content.ts"),
      read("../app/faq/faq-content.ts"),
    ]).then((sources) => sources.join("\n")),
  ]);

test("reviews the complete approved answer set against every required dimension", () => {
  for (const dimension of [
    "Accuracy",
    "Usefulness",
    "Directness",
    "Industry relevance",
    "ICP relevance",
    "Search intent",
    "First-hand evidence",
    "Operational confirmation",
    "Appropriate level of detail",
    "Consistency across pages",
    "Unsupported-claim review",
    "Keyword-stuffing review",
    "Invented-statistic review",
    "Natural-language review",
  ]) {
    assert.match(validation, new RegExp(`"${dimension.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
  assert.match(validation, /approvedAeoAnswers/);
  assert.match(validation, /approvedAnswersReviewed: approvedAnswerValidation\.length/);
  assert.match(documentation, /All 58 answers marked `live` or `live with dependency limits`/);
});

test("distinguishes a validated dependency boundary from a confirmed fact", () => {
  assert.match(validation, /validated as a factual boundary; operational values remain unpublished/);
  assert.match(validation, /validated as a permission boundary; unapproved proof remains unpublished/);
  assert.match(questionMap, /id: "space-power-water"[\s\S]*?validationStatus: "pending first-party validation"/);
  assert.match(questionMap, /id: "comparable-proof"[\s\S]*?validationStatus: "pending permission validation"/);
  assert.match(documentation, /Neither boundary is counted as confirmation/);
});

test("records operational items that require client confirmation without estimating them", () => {
  for (const topic of [
    "Coffee throughput",
    "Staffing",
    "Footprint and utilities",
    "Setup, teardown, and service duration",
    "Outdoor operating limits",
    "Venue coordination",
    "Rental operations",
    "Multi-day and recurring service",
    "Branding production",
    "Travel and destination events",
    "Dietary and cross-contact policy",
  ]) {
    assert.match(validation, new RegExp(`topic: "${topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`));
  }
  assert.match(validation, /No universal drinks-per-hour or wait-time figure is published/);
  assert.match(validation, /no fee formula is invented/);
});

test("keeps the approved evidence boundaries free of known unsupported promises", () => {
  assert.doesNotMatch(
    publicSources,
    /\b(?:industry[- ]leading|market[- ]leading|number one|#1|unmatched|unparalleled|unlimited drinks|guaranteed wait|guaranteed return)\b/i,
  );
  assert.doesNotMatch(
    publicSources,
    /\b(?:as an AI|search engines?|keyword stuffing|query targeting|users searching for)\b/i,
  );
  assert.match(validation, /unsupportedClaims: \[\]/);
  assert.match(validation, /inventedStatistics: \[\]/);
  assert.match(validation, /keywordStuffing: \[\]/);
  assert.match(validation, /unnaturalAeoPhrasing: \[\]/);
});

test("retains confirmed facts and withholds unapproved operational precision", () => {
  for (const fact of [
    "Up to 500 guests",
    "Up to 400 guests",
    "30% non-refundable retainer",
    "seven days before the event",
    "$5 million",
  ]) {
    assert.match(validation, new RegExp(fact.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
  assert.doesNotMatch(publicSources, /\b\d+\s*(?:drinks?|beverages?)\s+per\s+hour\b/i);
  assert.doesNotMatch(publicSources, /\b\d+\s*(?:amp|amps|volt|volts|gallons?|litres?|square feet|sq\.?\s*ft)\b/i);
  assert.match(implementation, /Missing first-party proof is shown as a dependency or withheld/);
});

test("documents a no-bloat validation pass without claiming the final hard pass", () => {
  assert.match(documentation, /found no reason to add more copy/);
  assert.match(documentation, /No new FAQ, resource, city, or long-tail page was created/);
  assert.match(documentation, /not the final Phase 4B hard pass/);
});
