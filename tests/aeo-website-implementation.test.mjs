import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [implementation, questionMap, classifications, documentation] =
  await Promise.all([
    read("../app/aeo-implementation.ts"),
    read("../app/aeo-question-map.ts"),
    read("../app/aeo-question-classification.ts"),
    read("../docs/phase-4b-website-content-implementation.md"),
  ]);

const routeAnswerSignals = new Map([
  ["/", "Coffee, dessert, and seating, together for your event."],
  ["/experiences", "Can coffee, dessert, and rentals be coordinated through one provider?"],
  ["/experiences/coffee-bar", "How many drinks can be served per hour?"],
  ["/experiences/sweet-cart", "Can toppings be customized?"],
  ["/experiences/seating-rentals", "Is rental setup included?"],
  ["/events", "What are you gathering for?"],
  ["/events/weddings", "When should coffee be served at a wedding?"],
  ["/events/corporate-events", "How should coffee catering be planned for a corporate event?"],
  ["/events/brand-activations", "A branded coffee-cart activation is a staffed mobile beverage experience"],
  ["/events/baby-showers", "What services work well for baby showers?"],
  ["/events/bridal-showers", "Which desserts work well for bridal showers?"],
  ["/events/birthdays", "Which birthday desserts are available?"],
  ["/events/private-events", "Which event rentals are required for outdoor events?"],
  ["/gallery", "One occasion, several Luxe experiences"],
  ["/faq", "What is required to reserve a date?"],
  ["/inquire", "What to have ready"],
]);

test("implements every approved answer and withholds unapproved answers", () => {
  assert.match(implementation, /answer\.publishingStatus === "live"/);
  assert.match(implementation, /answer\.publishingStatus === "live with dependency limits"/);
  assert.match(implementation, /implementationStatus: "implemented"/);
  assert.match(implementation, /implementationStatus: "withheld"/);
  assert.match(implementation, /missingApprovedImplementations: \[\]/);
  assert.match(questionMap, /publishingStatus: "planned"/);
  assert.match(questionMap, /publishingStatus: "blocked"/);
});

test("reviews every permanent route for hierarchy, conversion, proof, mobile, and duplication", () => {
  assert.match(implementation, /primaryRoutes\.map/);
  for (const field of [
    "conversionFlowPreserved",
    "headingHierarchyReviewed",
    "contextualLinksReviewed",
    "renderedHtmlReviewed",
    "mobileLayoutReviewed",
    "operationsConsistencyReviewed",
    "duplicationReview",
    "proofTreatment",
    "imageTreatment",
  ]) assert.match(implementation, new RegExp(`${field}:`), field);
});

test("keeps answer ownership synchronized between classification and question map", () => {
  for (const id of ["capacity-throughput-lines", "staffing-and-inclusions"]) {
    for (const source of [questionMap, classifications]) {
      assert.match(
        source,
        new RegExp(`${id}"[\\s\\S]*?(?:primaryPage|primaryPath): "/experiences"`),
        id,
      );
    }
  }
  assert.match(implementation, /An approved answer is implemented only on its definitive page/);
});

test("preserves user-first content formats and honest evidence boundaries", () => {
  assert.match(implementation, /Priority commercial answers remain visible outside accordions/);
  assert.match(implementation, /accessible native disclosures/);
  assert.match(implementation, /Missing first-party proof is shown as a dependency or withheld/);
  assert.match(implementation, /unsupportedOperationalClaims: \[\]/);
  assert.match(implementation, /duplicateCompleteAnswers: \[\]/);
  assert.match(implementation, /newRoutes: \[\]/);
});

test("documents the implementation without claiming a final hard pass", () => {
  assert.match(documentation, /No new public route was added/);
  assert.match(documentation, /Existing hero actions/);
  assert.match(documentation, /No new\s+event image, testimonial, venue claim, client outcome, or operational fact was\s+invented/);
  assert.match(documentation, /not the final Phase 4B hard pass/);
});

test("emits a definitive answer signal in initial HTML for every priority route", async () => {
  const worker = await loadWorker();

  for (const [path, signal] of routeAnswerSignals) {
    const response = await render(worker, path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    assert.ok(html.includes(signal), `${path}: ${signal}`);
    assert.equal((html.match(/<h1\b/gi) ?? []).length, 1, `${path}: one H1`);
    assert.match(html, /href="\/inquire"/, `${path}: inquiry path`);
  }
});

test("renders every mapped contextual link on its source page", async () => {
  const worker = await loadWorker();
  const pairs = [
    ...questionMap.matchAll(
      /fromPage: "([^"]+)",\s*toDefinitivePage: "([^"]+)"/g,
    ),
  ].map((match) => [match[1], match[2]]);
  const uniquePairs = [...new Map(pairs.map((pair) => [pair.join("=>"), pair])).values()];
  const renderedByPath = new Map();

  for (const [fromPage, definitivePage] of uniquePairs) {
    if (!renderedByPath.has(fromPage)) {
      const response = await render(worker, fromPage);
      assert.equal(response.status, 200, fromPage);
      renderedByPath.set(fromPage, await response.text());
    }
    const html = renderedByPath.get(fromPage);
    assert.match(
      html,
      new RegExp(`href="${definitivePage.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:["#?])`),
      `${fromPage} -> ${definitivePage}`,
    );
  }
});
