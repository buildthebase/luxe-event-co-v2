import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  formatSystem,
  priorityAnswer,
  coffeePage,
  sweetPage,
  seatingPage,
  weddingsPage,
  documentation,
] = await Promise.all([
  read("../app/aeo-content-formats.ts"),
  read("../app/components/priority-answer.tsx"),
  read("../app/components/coffee-bar-page.tsx"),
  read("../app/components/sweet-cart-page.tsx"),
  read("../app/components/seating-rentals-page.tsx"),
  read("../app/components/weddings-page.tsx"),
  read("../docs/phase-4b-appropriate-content-formats.md"),
]);

test("maps priority questions to formats suited to the decision", () => {
  for (const format of [
    "Concise answer paragraph",
    "Side-by-side decision cards",
    "Step-by-step process",
    "Planning checklist",
    "Cost-factor panel",
    "What is included list",
    "Best-suited-for links",
    "Capacity summary",
    "Logistics summary",
    "Timeline",
    "Contextual FAQ",
    "Meaningful image caption",
    "Related-service links",
  ]) {
    assert.match(formatSystem, new RegExp(`"${format}"`), format);
  }
});

test("keeps service-pricing answers visible and outside accordions", () => {
  assert.match(priorityAnswer, /data-aeo-format="visible-cost-factors"/);
  assert.match(priorityAnswer, /<h3>\{question\}<\/h3>/);
  assert.match(priorityAnswer, /<p>\{answer\}<\/p>/);
  assert.match(priorityAnswer, /data-event-name="inquiry_start"/);

  for (const [source, answerName, contextualName] of [
    [coffeePage, "coffeePricingAnswer", "coffeeContextualFaqs"],
    [sweetPage, "sweetPricingAnswer", "sweetContextualFaqs"],
    [seatingPage, "rentalPricingAnswer", "rentalContextualFaqs"],
  ]) {
    assert.match(source, new RegExp(`question=\\{${answerName}\\.question\\}`));
    assert.match(source, new RegExp(`answer=\\{${answerName}\\.answer\\}`));
    assert.match(source, new RegExp(`<FaqAccordion items=\\{${contextualName}\\}`));
  }
});

test("retains visible timelines, checklists, inclusions, capacity, and logistics", () => {
  assert.match(weddingsPage, /<ol>[\s\S]*?weddingMoments\.map/);
  assert.match(coffeePage, /coffeeBookingIncludes\.map/);
  assert.match(coffeePage, /className="coffee-operation-grid"/);
  assert.match(sweetPage, /dessertBookingIncludes\.map/);
  assert.match(sweetPage, /className="sweet-operation-grid"/);
  assert.match(seatingPage, /rentalQuoteRequirements\.map/);
  assert.match(seatingPage, /className="seating-operation-grid"/);
});

test("reserves accordions for secondary questions after visible priority content", () => {
  for (const source of [coffeePage, sweetPage, seatingPage]) {
    assert.ok(source.indexOf("<PriorityAnswer") < source.indexOf("<FaqAccordion"));
  }
  assert.match(formatSystem, /priorityAnswersInsideAccordions: \[\]/);
});

test("records evidence-based deviations without creating content bloat", () => {
  assert.match(formatSystem, /format: "Comparison table"/);
  assert.match(formatSystem, /Existing side-by-side cards/);
  assert.match(formatSystem, /format: "Real event example"/);
  assert.match(formatSystem, /First-party evidence required/);
  assert.match(formatSystem, /newRoutes: \[\]/);
  assert.match(formatSystem, /inventedRealEventExamples: \[\]/);
  assert.match(documentation, /No event example was invented/);
  assert.match(documentation, /No new route, resource article/);
});
