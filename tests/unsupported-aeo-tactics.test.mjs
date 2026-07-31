import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  guardrails,
  documentation,
  llms,
  navigation,
  sitemap,
  robots,
  schema,
  questionMap,
  formats,
  validation,
] = await Promise.all([
  read("../app/aeo-guardrails.ts"),
  read("../docs/phase-4b-unsupported-aeo-tactics.md"),
  read("../public/llms.txt"),
  read("../app/navigation-config.ts"),
  read("../app/sitemap.ts"),
  read("../app/robots.ts"),
  read("../app/schema-architecture.ts"),
  read("../app/aeo-question-map.ts"),
  read("../app/aeo-content-formats.ts"),
  read("../app/aeo-content-validation.ts"),
]);

test("prohibits every unsupported AEO tactic", () => {
  for (const tactic of [
    "Generic AI keywords",
    "Required llms.txt",
    "Machine-only content chunks",
    "Hundreds of long-tail pages",
    "Thin city pages",
    "Exact-match questions in every heading",
    "Every section converted to FAQ",
    "Major answers hidden behind interactions",
    "Schema overuse",
    "Unsupported statistics",
    "Fabricated examples, testimonials, or case studies",
    "Fake mentions",
    "Unnatural rewriting for AI systems",
  ]) {
    assert.match(guardrails, new RegExp(`tactic: "${tactic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), tactic);
  }
  assert.match(guardrails, /violations: \[\]/);
});

test("keeps llms.txt optional, factual, and isolated from required discovery systems", () => {
  assert.match(guardrails, /requiredForLaunch: false/);
  assert.match(guardrails, /rankingBenefitClaimed: false/);
  assert.match(guardrails, /substitutesForVisibleContent: false/);
  assert.doesNotMatch(navigation, /llms\.txt/);
  assert.doesNotMatch(sitemap, /llms\.txt/);
  assert.doesNotMatch(robots, /llms\.txt/);
  assert.doesNotMatch(schema, /llms\.txt/);
  assert.match(llms, /^# Luxe Event Co\./);
  assert.match(documentation, /carries no ranking,\s+indexing, citation, or AI-visibility promise/);
});

test("prevents question research from generating routes, FAQs, or schema entitlement", () => {
  assert.match(
    questionMap,
    /No question-map record creates a new route, FAQ entry, or structured-data entitlement/,
  );
  assert.match(guardrails, /A research query does not create a page, heading, FAQ entry, schema entitlement, statistic, or proof asset/);
  assert.match(guardrails, /canonical architecture remains limited to \$\{primaryRoutes\.length\} permanent routes/);
  assert.match(documentation, /architecture remains at 16 permanent routes/);
  assert.match(documentation, /No city-specific route exists/);
});

test("keeps priority answers visible and uses multiple user-appropriate formats", () => {
  assert.match(formats, /Commercially important answers remain visible/);
  assert.match(formats, /Accordion after primary content/);
  for (const format of [
    "Concise answer paragraph",
    "Side-by-side decision cards",
    "Step-by-step process",
    "Planning checklist",
    "Cost-factor panel",
    "Logistics summary",
  ]) {
    assert.match(formats, new RegExp(`"${format}"`), format);
  }
  assert.match(guardrails, /native disclosures may contain secondary answers only/);
});

test("retains narrow schema and evidence boundaries", () => {
  assert.match(schema, /Do not add AggregateRating or Review markup/);
  assert.match(schema, /Do not use Event schema for Weddings, Corporate Events, Brand Activations/);
  assert.match(schema, /Schema is a representation of visible, accurate content, not a place to add unsupported claims/);
  assert.match(validation, /unsupportedClaims: \[\]/);
  assert.match(validation, /inventedStatistics: \[\]/);
  assert.match(guardrails, /fabricatedProof: \[\]/);
  assert.match(guardrails, /unsupportedStatistics: \[\]/);
});

test("documents a no-bloat guardrail pass without claiming final verification", () => {
  assert.match(documentation, /No public content or route was added for this step/);
  assert.match(documentation, /No public warning or AEO-policy section was added/);
  assert.match(documentation, /not the final Phase 4B hard pass/);
});
