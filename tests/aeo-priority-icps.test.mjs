import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(
  new URL("../app/aeo-audience-research.ts", import.meta.url),
  "utf8",
);

test("defines the five separate priority ICP research profiles", () => {
  for (const [slug, label] of [
    ["wedding-clients", "Wedding Clients"],
    ["corporate-clients", "Corporate Clients"],
    ["brand-agency-clients", "Brand and Agency Clients"],
    ["private-event-clients", "Private-Event Clients"],
    ["industry-partners", "Industry Partners"],
  ]) {
    assert.match(source, new RegExp(`slug: "${slug}"[\\s\\S]*?label: "${label}"`));
  }

  assert.match(source, /profileCount: aeoAudienceProfiles\.length/);
});

test("includes every required person in the appropriate profile", () => {
  for (const person of [
    "Couples",
    "Wedding planners",
    "Coordinators",
    "Venues",
    "Family members supporting the planning process",
    "Executive assistants",
    "Office managers",
    "HR teams",
    "Corporate event planners",
    "Procurement teams",
    "Conference organizers",
    "Institutions",
    "Universities",
    "Real estate developers",
    "Marketing agencies",
    "Experiential agencies",
    "Public relations agencies",
    "Campaign teams",
    "Retail brands",
    "Product-launch teams",
    "Luxury brands",
    "Baby shower hosts",
    "Bridal shower hosts",
    "Birthday hosts",
    "Engagement and anniversary hosts",
    "Families planning milestone occasions",
    "Event planners",
    "Decorators",
    "Florists",
    "Caterers",
    "Production companies",
    "Photographers",
  ]) {
    assert.match(source, new RegExp(`"${person}"`), person);
  }
});

test("documents informational, operational, commercial, and trust concerns", () => {
  for (const category of [
    "informational",
    "operational",
    "commercial",
    "trust",
  ]) {
    assert.equal(
      (source.match(new RegExp(`      ${category}: \\[`, "g")) ?? []).length,
      5,
      category,
    );
  }
});

test("records every Phase 4B operational dependency without estimating it", () => {
  for (const slug of [
    "guest-capacities",
    "drinks-served-per-hour",
    "staffing-levels",
    "setup-teardown-times",
    "space-requirements",
    "power-requirements",
    "water-requirements",
    "outdoor-event-limitations",
    "travel-policies",
    "service-minimums",
    "pricing-variables",
    "rental-inventory",
    "simultaneous-setup-capability",
    "multi-day-capability",
    "branding-lead-times",
    "insurance-availability",
    "venue-coordination-process",
  ]) {
    assert.match(source, new RegExp(`slug: "${slug}"`), slug);
  }

  assert.match(source, /Do not publish a throughput figure/);
  assert.match(source, /Do not publish a universal staffing formula/);
  assert.match(source, /Do not publish a universal footprint/);
  assert.match(source, /Do not publish amperage, outlet, circuit, or generator claims/);
});

test("maps research to existing routes and prevents audience-content bloat", () => {
  assert.match(source, /newRoutes: \[\] as string\[\]/);
  assert.match(source, /they are not public page sections/);
  assert.match(source, /Do not create one page per audience or one answer block per profile/);
  assert.match(source, /A question belongs on the narrowest existing page/);
  assert.match(source, /Industry Partners remain a cross-page decision lens/);
});
