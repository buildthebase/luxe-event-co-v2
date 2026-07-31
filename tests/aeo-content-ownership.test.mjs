import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  ownership,
  questionMap,
  faq,
  faqPage,
  weddings,
  babyShowers,
  birthdays,
  privateEvents,
  documentation,
] = await Promise.all([
  read("../app/aeo-content-ownership.ts"),
  read("../app/aeo-question-map.ts"),
  read("../app/faq/faq-content.ts"),
  read("../app/faq/page.tsx"),
  read("../app/events/weddings-content.ts"),
  read("../app/events/baby-showers-content.ts"),
  read("../app/events/birthdays-content.ts"),
  read("../app/events/private-events-content.ts"),
  read("../docs/phase-4b-content-ownership-cannibalization.md"),
]);

const priorityRoutes = [
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

test("assigns one reviewed primary intent to every priority route", () => {
  assert.equal((ownership.match(/competingIntentReview: "clear",/g) ?? []).length, priorityRoutes.length);
  for (const route of priorityRoutes) {
    assert.equal(
      (ownership.match(new RegExp(`path: "${route.replaceAll("/", "\\/")}"`, "g")) ?? []).length,
      1,
      route,
    );
  }
  assert.match(ownership, /unresolvedCompetingIntents: \[\]/);
});

test("defines the required page-level answer boundaries", () => {
  for (const rule of [
    "Keep service mechanics on the applicable service page.",
    "Keep occasion-specific planning on the applicable event page.",
    "Keep shared booking, travel, venue, and operating policies on the FAQ page.",
    "Keep broad service and provider comparisons on a hub",
  ]) assert.match(ownership, new RegExp(rule.replace(/[.]/g, "\\.")), rule);
});

test("keeps the main FAQ to shared policies and links to service owners", () => {
  assert.equal((faq.match(/question: "/g) ?? []).length, 26);
  for (const id of ["coffee-bar", "sweet-cart", "seating-rentals"]) {
    assert.doesNotMatch(faq, new RegExp(`id: "${id}"`));
    assert.match(faqPage, new RegExp(`href="/experiences/${id}"`));
  }
  assert.match(faq, /30% non-refundable retainer/);
  for (const id of ["capacity-throughput-lines", "staffing-and-inclusions"]) {
    assert.match(
      questionMap,
      new RegExp(`id: "${id}"[\\s\\S]*?primaryPage: "/experiences"`),
      id,
    );
  }
});

test("removes complete shared-policy answers from occasion pages", () => {
  assert.doesNotMatch(weddings, /30% non-refundable retainer/);
  assert.doesNotMatch(privateEvents, /30% non-refundable retainer/);
  assert.doesNotMatch(babyShowers, /Is setup and takedown included/);
  assert.doesNotMatch(birthdays, /Is setup and takedown included/);
  assert.doesNotMatch(privateEvents, /Is setup and teardown included/);
});

test("records no route bloat or duplicate-answer exceptions", () => {
  for (const emptyAudit of [
    "exactDuplicatePublishedAnswers",
    "unresolvedCompetingIntents",
    "thinLongTailRoutes",
    "cityNameVariants",
    "eventNameVariants",
    "newRoutes",
  ]) assert.match(ownership, new RegExp(`${emptyAudit}: \\[\\]`), emptyAudit);
  assert.match(questionMap, /duplicateCompleteAnswers: \[\]/);
  assert.match(questionMap, /newRoutes: \[\]/);
  assert.match(ownership, /One route per long-tail query/);
  assert.match(ownership, /City pages that change only the place name/);
});

test("documents the material FAQ deviation and future-resource evidence gate", () => {
  assert.match(documentation, /Those 21 service-mechanics answers were removed/);
  assert.match(documentation, /26-answer shared-policy resource/);
  assert.match(documentation, /No new route was created/);
  assert.match(ownership, /Enough first-party evidence for a useful and differentiated answer/);
});
