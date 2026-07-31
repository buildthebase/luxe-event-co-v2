import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [faq, rentals, localSeo, siteConfig, map, classification, documentation] =
  await Promise.all([
    read("../app/faq/faq-content.ts"),
    read("../app/experiences/seating-rentals-content.ts"),
    read("../app/local-seo.ts"),
    read("../app/site-config.ts"),
    read("../app/aeo-question-map.ts"),
    read("../app/aeo-question-classification.ts"),
    read("../docs/phase-4b-local-service-area-content.md"),
  ]);

test("answers Toronto, GTA, Southern Ontario, and destination availability", () => {
  assert.match(faq, /available for events in Toronto and throughout the approved Greater Toronto Area/);
  assert.match(faq, /Select larger events elsewhere in Southern Ontario may be available/);
  assert.match(faq, /extended-travel or destination requests/);
  assert.match(faq, /Are destination events available\?/);

  for (const city of [
    "Toronto",
    "Scarborough",
    "Etobicoke",
    "North York",
    "Markham",
    "Vaughan",
    "Richmond Hill",
    "Aurora",
    "Newmarket",
    "King City",
    "Thornhill",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Burlington",
    "Milton",
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
  ]) {
    assert.match(faq, new RegExp(city), city);
  }
});

test("explains how distance and location affect minimums, price, and logistics", () => {
  assert.match(faq, /no universal distance threshold or fee formula is published/);
  assert.match(faq, /minimum booking review/);
  assert.match(faq, /staffing and travel time/);
  assert.match(faq, /equipment or rental transport/);
  assert.match(faq, /parking and loading requirements/);
  assert.match(faq, /setup and takedown windows/);
  assert.match(faq, /accommodations are required/);
  assert.match(classification, /distance-based minimums/);
});

test("qualifies rental delivery areas and venue setup feasibility", () => {
  assert.match(rentals, /within Toronto, the approved GTA service area/);
  assert.match(rentals, /does not define one universal rental-delivery boundary or policy/);
  assert.match(rentals, /route and travel time, parking or loading access/);
  assert.match(rentals, /placement or setup responsibilities, pickup plan/);
  assert.match(faq, /Venue location does not determine feasibility by itself/);
  assert.match(faq, /loading dock or entrance, stairs or elevators/);
});

test("keeps unverified travel formulas and boundaries out of public claims", () => {
  assert.match(map, /Approved distance-based minimum requirements/);
  assert.match(map, /Approved universal rental-delivery area and policy/);
  assert.doesNotMatch(faq, /\$\d+(?:\.\d+)?\s*(?:per|\/)\s*(?:km|kilometre)/i);
  assert.doesNotMatch(faq, /\b\d+\s*(?:km|kilometres?|miles?)\b/i);
  assert.doesNotMatch(rentals, /\bdelivery radius\b/i);
});

test("preserves the local-page evidence gate and unchanged route strategy", () => {
  assert.match(localSeo, /currentLocationPages: \[\]/);
  assert.match(localSeo, /Do not create thin city pages, doorway pages/);
  for (const gate of [
    "Unique local event evidence",
    "Approved local photography",
    "First-hand venue or logistics knowledge",
    "Permissioned local testimonials or case studies",
    "A distinct and useful local searcher need",
  ]) {
    assert.match(localSeo, new RegExp(gate), gate);
  }
  assert.match(map, /newRoutes: \[\] as string\[\]/);
  assert.match(documentation, /AEO map remains at 60 records/);
  assert.match(siteConfig, /extendedServiceArea: "Select destination events throughout Southern Ontario"/);
});

test("documents all ten local and service-area topics", () => {
  for (const topic of [
    "Availability in Toronto",
    "Availability throughout the GTA",
    "Extended travel areas",
    "Southern Ontario events",
    "Travel fees",
    "Minimums affected by distance",
    "Destination-event availability",
    "Delivery areas",
    "Setup feasibility by venue location",
    "Location effects on pricing and logistics",
  ]) {
    assert.match(documentation, new RegExp(`\\| ${topic} \\|`), topic);
  }
});
