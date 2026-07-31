import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [source, siteConfig, documentation] = await Promise.all([
  readFile(new URL("../app/aeo-page-briefs.ts", import.meta.url), "utf8"),
  readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
  readFile(new URL("../docs/phase-4b-page-level-aeo-briefs.md", import.meta.url), "utf8"),
]);

const requiredPaths = [
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

test("creates one brief for every permanent indexable page", () => {
  for (const path of requiredPaths) {
    const escapedPath = path.replaceAll("/", "\\/");
    const occurrences = source.match(new RegExp(`path: "${escapedPath}"`, "g"))?.length ?? 0;
    assert.equal(occurrences, 1, path);
  }

  assert.equal((source.match(/\n    path: "/g) ?? []).length, requiredPaths.length);
  assert.match(source, /missingPaths: primaryRoutes\.filter/);
  assert.match(source, /unknownPaths:/);
  assert.match(source, /duplicatePaths:/);
  assert.match(siteConfig, /export const primaryRoutes/);
});

test("materializes every required brief field", () => {
  for (const field of [
    "primaryIcps",
    "primaryQuestionThemes",
    "secondaryQuestionThemes",
    "searchIntents",
    "requiredAnswers",
    "requiredFirstPartyEvidence",
    "requiredInternalLinks",
    "recommendedContentFormats",
    "questionsNotToDuplicate",
    "questionsToMoveToFaq",
    "futureResources",
  ]) {
    assert.equal(
      (source.match(new RegExp(`\\n    ${field}:`, "g")) ?? []).length,
      requiredPaths.length,
      field,
    );
  }
});

test("makes every brief page-specific rather than copying a generic template", () => {
  for (const signal of [
    "parent company and the distinct Coffee Bar",
    "coordinated-provider",
    "mobile coffee discovery",
    "dessert-cart discovery",
    "delivery versus setup",
    "station-flow principles",
    "wedding-specific service timing",
    "procurement, insurance",
    "creative surfaces",
    "baby-shower service fit",
    "bridal-shower dessert selection",
    "milestone birthday service fit",
    "outdoor rental planning",
    "permissioned visual proof",
    "shared booking, pricing, service-area",
    "qualified prospect",
  ]) {
    assert.match(source, new RegExp(signal, "i"), signal);
  }
});

test("defines internal links, duplication boundaries, and FAQ moves", () => {
  assert.match(source, /href: "\/experiences"/);
  assert.match(source, /href: "\/events"/);
  assert.match(source, /href: "\/gallery"/);
  assert.match(source, /href: "\/faq"/);
  assert.match(source, /href: "\/inquire"/);
  assert.match(source, /definitivePage: "\/events\/brand-activations"/);
  assert.match(source, /definitivePage: "\/faq"/);
  assert.match(source, /Shared booking, pricing, service-area, travel, utility, access, weather, and policy answers belong on FAQ/);
  assert.match(source, /questionsToMoveToFaq: \[\],/);
});

test("gates future resources behind first-party evidence", () => {
  assert.match(source, /evidenceGate:/);
  assert.match(source, /permissioned cross-division event/);
  assert.match(source, /Approved throughput, staffing, footprint, power, water/);
  assert.match(source, /Approved styles, dimensions, finishes, quantities/);
  assert.match(source, /Approved recurring or multi-day operating model/);
  assert.match(source, /Client permission, campaign context/);
  assert.match(source, /Approved division-specific footprint, power, water/);
  assert.match(source, /A future resource is not authorized until its evidence gate is satisfied/);
});

test("extends the requested minimum without creating public content or routes", () => {
  for (const page of ["Events", "Gallery", "Inquire"]) {
    assert.match(documentation, new RegExp(`\\| ${page} \\|`), page);
  }
  assert.match(documentation, /cover all 16 permanent indexable pages/);
  assert.match(source, /publicPageChanges: \[\] as string\[\]/);
  assert.match(source, /newRoutes: \[\] as string\[\]/);
  assert.match(documentation, /adds no public copy/);
});
