import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  system,
  faq,
  coffee,
  sweet,
  accordion,
  experiences,
  events,
  faqPage,
  coffeePage,
  sweetPage,
  seatingPage,
  documentation,
] = await Promise.all([
  read("../app/aeo-direct-answer-system.ts"),
  read("../app/faq/faq-content.ts"),
  read("../app/experiences/coffee-bar-content.ts"),
  read("../app/experiences/sweet-cart-content.ts"),
  read("../app/components/faq-accordion.tsx"),
  read("../app/components/experiences-hub.tsx"),
  read("../app/components/events-hub.tsx"),
  read("../app/faq/page.tsx"),
  read("../app/components/coffee-bar-page.tsx"),
  read("../app/components/sweet-cart-page.tsx"),
  read("../app/components/seating-rentals-page.tsx"),
  read("../docs/phase-4b-direct-extractable-answers.md"),
]);

test("defines the direct answer, factors, Luxe handling, and next-step sequence", () => {
  assert.match(system, /order: 1,[\s\S]*?element: "Immediate answer"/);
  assert.match(system, /order: 2,[\s\S]*?element: "Decision factors"/);
  assert.match(system, /order: 3,[\s\S]*?element: "Luxe handling"/);
  assert.match(system, /order: 4,[\s\S]*?element: "Relevant next step"/);
  assert.match(system, /without promotional setup/);
  assert.match(system, /self-contained enough to remain useful when extracted/);
});

test("commercial answers lead with the determining factors", () => {
  assert.match(faq, /Event pricing is calculated from the selected experience and format/);
  assert.match(coffee, /Mobile coffee catering is priced from the Café Cart or Signature Coffee Bar format/);
  assert.match(sweet, /Sweet Cart service is priced from guest count/);

  for (const [source, question] of [
    [faq, "How is pricing calculated?"],
    [coffee, "How much does mobile coffee catering cost, and how is it priced?"],
    [sweet, "How much does Sweet Cart service cost?"],
  ]) {
    const start = source.indexOf(`question: "${question}"`);
    const answer = source.slice(start, source.indexOf("},", start));
    assert.doesNotMatch(answer, /answer:\s*\n\s*"Luxe does not/i, question);
    assert.match(answer, /Luxe (?:reviews|uses)/, question);
    assert.match(answer, /proposal/, question);
  }
});

test("question renderers place the answer immediately after the visible question", () => {
  assert.match(
    accordion,
    /<summary>[\s\S]*?<h3>\{item\.question\}<\/h3>[\s\S]*?<\/summary>[\s\S]*?<p>\{item\.answer\}<\/p>/,
  );
  assert.match(experiences, /Can each experience be booked independently\?<\/dt>[\s\S]*?<dd>\s*Yes\./);
  assert.match(
    experiences,
    /Can coffee, dessert, and rentals be coordinated through one provider\?<\/dt>[\s\S]*?<dd>\s*Yes\./,
  );
  assert.match(
    events,
    /What are you gathering for\?<\/h2>[\s\S]*?<p>\s*Choose the event context first\./,
  );
  assert.match(
    faqPage,
    /Still specific to your event\? Ask us directly\.<\/h2>[\s\S]*?<p>\s*Share the date/,
  );
});

test("every question-led surface provides a relevant next step without per-item link repetition", () => {
  assert.match(faq, /links: \[\{ href:/);
  assert.match(experiences, /Plan one or more Luxe experiences/);
  assert.match(events, /Explore \{event\.name\}/);
  assert.match(faqPage, /Ask About Your Event/);

  for (const source of [coffeePage, sweetPage, seatingPage]) {
    assert.match(source, /<FaqAccordion/);
    assert.match(source, /Review all Luxe booking questions/);
    assert.match(source, /<ContextualInquiryPanel/);
  }

  assert.match(system, /A section-level next step is preferred over repeating the same link/);
  assert.match(system, /repeatedPerItemSectionLinks: \[\]/);
});

test("records the no-preamble and no-bloat implementation boundary", () => {
  assert.match(system, /promotionalPreamblesBeforeAnswers: \[\]/);
  assert.match(system, /newRoutes: \[\]/);
  assert.match(documentation, /No answer received a promotional lead-in/);
  assert.match(documentation, /No new public section, route, FAQ question, schema type/);
});
