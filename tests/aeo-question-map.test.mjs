import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/aeo-question-map.ts", import.meta.url),
  "utf8",
);

const classifications = await readFile(
  new URL("../app/aeo-question-classification.ts", import.meta.url),
  "utf8",
);

const ids = [
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

test("creates one answer plan for every canonical question", () => {
  for (const id of ids) {
    const occurrences = source.match(new RegExp(`id: "${id}"`, "g"))?.length;
    assert.equal(occurrences, 1, id);
  }

  assert.match(source, /missingQuestionPlans/);
  assert.match(source, /unknownQuestionPlans/);
  assert.match(source, /duplicateQuestionPlans/);
});

test("materializes every requested field in the structured question map", () => {
  for (const field of [
    "question",
    "normalizedQueryTopic",
    "primaryPage",
    "secondarySupportingPage",
    "icp",
    "funnelStage",
    "searchIntent",
    "proposedAnswer",
    "requiredEvidence",
    "internalLinks",
    "contentFormat",
    "publishingStatus",
    "validationStatus",
  ]) {
    assert.match(source, new RegExp(`${field}:`), field);
  }
});

test("makes every supporting link target the one definitive page", () => {
  assert.match(source, /invalidInternalLinkTargets/);
  assert.match(
    source,
    /link\.toDefinitivePage !== record\.primaryPage/,
  );
  assert.match(
    source,
    /The primary page is the only page that may contain the complete answer/,
  );
  assert.match(
    source,
    /A secondary or other supporting page may include only the context needed/,
  );
  assert.match(source, /duplicateCompleteAnswers: \[\] as string\[\]/);
});

test("keeps blocked facts and corrected dependency boundaries visible", () => {
  assert.match(
    source,
    /id: "rental-risk-and-changes"[\s\S]*?publishingStatus: "blocked"/,
  );
  assert.match(
    source,
    /id: "corporate-scale-and-repetition"[\s\S]*?publishingStatus: "live with dependency limits"/,
  );
  assert.match(source, /neither operating model is confirmed and neither may be promised/);
});

test("records the five anti-duplication destination refinements", () => {
  for (const id of [
    "menu-and-dietary-fit",
    "travel-and-service-area",
  ]) {
    assert.match(
      classifications,
      new RegExp(
        `questionId: "${id}"[\\s\\S]*?destination: \\{\\n      primaryPath: "/faq"`,
      ),
      id,
    );
  }

  for (const id of ["capacity-throughput-lines", "staffing-and-inclusions"]) {
    assert.match(
      classifications,
      new RegExp(
        `questionId: "${id}"[\\s\\S]*?destination: \\{\\n      primaryPath: "/experiences"`,
      ),
      id,
    );
  }

  assert.match(
    classifications,
    /questionId: "guest-use-and-value"[\s\S]*?destination: \{\n      primaryPath: "\/events"/,
  );
});

test("does not treat the map as approval for page or schema bloat", () => {
  assert.match(source, /newRoutes: \[\] as string\[\]/);
  assert.match(source, /Natural-language variants inherit/);
  assert.match(source, /No question-map record creates a new route, FAQ entry, or structured-data entitlement/);
  assert.match(source, /Internal-link instructions describe content ownership; they do not assert that every link is already implemented/);
});

test("promotes the nine Step 4B.5 discovery answers into the same map", () => {
  for (const id of [
    "service-discovery-mobile-coffee-bar",
    "service-discovery-mobile-espresso-catering",
    "service-discovery-dessert-cart-catering",
    "service-discovery-dessert-cart-vs-table",
    "service-discovery-event-rental-inclusions",
    "service-discovery-branded-coffee-activation",
    "service-discovery-one-provider",
    "service-discovery-coffee-event-fit",
    "service-discovery-onsite-dessert-preparation",
  ]) {
    assert.match(source, new RegExp(`id: "${id}"`), id);
  }

  assert.match(source, /serviceDiscoveryQuestionCount/);
  assert.match(source, /materially distinct question into this map/);
});

test("assigns the nine Step 4B.6 planning answers to definitive event pages", () => {
  const assignments = [
    ["event-planning-wedding-coffee-timing", "/events/weddings"],
    ["event-planning-cocktail-hour-coffee", "/events/weddings"],
    ["event-planning-bridal-shower-desserts", "/events/bridal-showers"],
    ["event-planning-corporate-coffee", "/events/corporate-events"],
    ["event-planning-employee-appreciation", "/events/corporate-events"],
    ["event-planning-baby-shower-services", "/events/baby-showers"],
    ["event-planning-outdoor-rentals", "/events/private-events"],
    ["event-planning-station-flow", "/events"],
    ["event-planning-complete-setup", "/events"],
  ];

  for (const [id, path] of assignments) {
    assert.match(
      source,
      new RegExp(
        `id: "${id}"[\\s\\S]*?primaryPage: "${path.replaceAll("/", "\\/")}"`,
      ),
      id,
    );
  }

  assert.match(source, /eventPlanningQuestionCount/);
});

test("assigns the nine Step 4B.7 comparisons to one definitive page", () => {
  const assignments = [
    ["comparison-cafe-cart-full-service-bar", "/experiences/coffee-bar"],
    ["comparison-coffee-cart-traditional-catering", "/experiences/coffee-bar"],
    ["comparison-mobile-bar-venue-service", "/experiences/coffee-bar"],
    ["comparison-dessert-cart-table", "/experiences/sweet-cart"],
    ["comparison-hosted-self-serve-dessert", "/experiences/sweet-cart"],
    ["comparison-dessert-formats", "/experiences/sweet-cart"],
    ["comparison-individual-coordinated-provider", "/experiences"],
    ["comparison-rental-delivery-setup", "/experiences/seating-rentals"],
    ["comparison-standard-branded-corporate", "/events/brand-activations"],
  ];

  for (const [id, path] of assignments) {
    assert.match(
      source,
      new RegExp(
        `id: "${id}"[\\s\\S]*?primaryPage: "${path.replaceAll("/", "\\/")}"`,
      ),
      id,
    );
  }

  assert.match(source, /comparisonQuestionCount/);
});

test("consolidates Step 4B.8 cost prompts into nine definitive pricing answers", () => {
  const assignments = [
    ["pricing-coffee-cost-method", "/experiences/coffee-bar"],
    ["pricing-guest-count-duration", "/faq"],
    ["pricing-dessert-cost-factors", "/experiences/sweet-cart"],
    ["pricing-rental-items", "/experiences/seating-rentals"],
    ["pricing-delivery-setup", "/experiences/seating-rentals"],
    ["pricing-travel-fees", "/faq"],
    ["pricing-branding", "/events/brand-activations"],
    ["pricing-combined-services", "/experiences"],
    ["pricing-retainer", "/faq"],
  ];

  for (const [id, path] of assignments) {
    assert.match(
      source,
      new RegExp(
        `id: "${id}"[\\s\\S]*?primaryPage: "${path.replaceAll("/", "\\/")}"`,
      ),
      id,
    );
  }

  assert.match(source, /pricingQuestionCount/);
});

test("reuses operational owners and adds only two Step 4B.9 logistics records", () => {
  const assignments = [
    ["logistics-dessert-attendants", "/experiences/sweet-cart"],
    ["logistics-dessert-service-duration", "/experiences/sweet-cart"],
  ];

  for (const [id, path] of assignments) {
    assert.match(
      source,
      new RegExp(
        `id: "${id}"[\\s\\S]*?primaryPage: "${path.replaceAll("/", "\\/")}"`,
      ),
      id,
    );
  }

  assert.match(source, /logisticsQuestionCount/);
});

test("reuses established owners and adds only the missing Step 4B.10 rental-styling record", () => {
  assert.match(
    source,
    /id: "customization-rental-styling"[\s\S]*?primaryPage: "\/experiences\/seating-rentals"/,
  );
  assert.match(source, /customizationQuestionCount/);
  assert.match(source, /newRoutes: \[\] as string\[\]/);
});

test("consolidates Step 4B.11 local questions without adding records or city routes", () => {
  assert.match(
    source,
    /id: "travel-and-service-area"[\s\S]*?available in Toronto and throughout the approved GTA service area/,
  );
  assert.match(source, /no universal distance threshold, delivery boundary, or fee formula/);
  assert.match(source, /Approved distance-based minimum requirements/);
  assert.match(source, /Approved universal rental-delivery area and policy/);
  assert.match(source, /customizationQuestionCount/);
  assert.match(source, /newRoutes: \[\] as string\[\]/);
});
