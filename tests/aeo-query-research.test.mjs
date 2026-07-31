import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/aeo-query-research.ts", import.meta.url),
  "utf8",
);

test("records every requested research surface and its availability", () => {
  for (const surface of [
    "existing-luxe-inquiries",
    "instagram-messages",
    "email-questions",
    "quote-conversations",
    "client-interviews",
    "planner-venue-questions",
    "google-search-console",
    "google-autocomplete",
    "google-related-searches",
    "people-also-ask",
    "bing-suggestions",
    "competitor-headings-faqs",
    "wedding-corporate-discussions",
    "industry-forums-communities",
    "google-business-profile",
    "sales-prospect-questions",
  ]) {
    assert.match(source, new RegExp(`source: "${surface}"`), surface);
  }

  assert.match(source, /no anonymized raw inquiry archive is present/);
  assert.match(source, /No anonymized Instagram message export was supplied/);
  assert.match(source, /Search Console is not yet verified/);
  assert.match(source, /No verified Google Business Profile/);
});

test("clusters natural questions across service, event, commercial, and trust decisions", () => {
  for (const id of [
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
  ]) {
    assert.match(source, new RegExp(`id: "${id}"`), id);
  }
});

test("preserves the language people use to frame decisions", () => {
  for (const phrase of [
    "Do I need coffee at my wedding?",
    "Coffee cart during cocktail hour or after reception?",
    "Are coffee bars worth the money?",
    "How much coffee do I need for 100 guests?",
    "How many drinks can be served per hour?",
    "How much does it cost to rent chairs for an event?",
    "Do you set up tables and chairs?",
    "Who does what?",
    "What happens if it rains?",
    "How far in advance should I book?",
  ]) {
    assert.match(source, new RegExp(phrase.replace(/[?]/g, "\\?")), phrase);
  }
});

test("keeps sources attributable and competitors out of Luxe operating claims", () => {
  for (const surface of [
    "first-party-summary",
    "google-autocomplete",
    "google-people-also-ask",
    "bing-suggestions",
    "competitor-heading",
    "competitor-faq",
    "wedding-community",
    "industry-community",
  ]) {
    assert.match(source, new RegExp(`surface: "${surface}"`), surface);
  }

  assert.match(source, /Competitor specifications may reveal a question but may never be copied/);
  assert.match(source, /First-party summaries, public search features, competitors, and communities remain distinct/);
});

test("prevents research findings from creating page or FAQ bloat", () => {
  assert.match(source, /newRoutes: \[\] as string\[\]/);
  assert.match(source, /not an instruction to publish an FAQ for every variant/);
  assert.match(source, /Prefer one complete answer on the narrowest responsible page/);
  assert.match(source, /Do not add a new route, long section, or schema type/);
});
