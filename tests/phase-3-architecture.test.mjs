import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");

test("Phase 3 architecture centralizes core technical concerns", () => {
  const siteConfig = read("app/site-config.ts");
  const metadata = read("app/metadata-config.ts");
  const schemaBuilders = read("app/schema-builders.ts");
  const jsonLd = read("app/components/json-ld.tsx");

  assert.match(siteConfig, /export const primaryRoutes/);
  assert.match(metadata, /satisfies Record<string, PageMetadataDefinition>/);
  assert.match(metadata, /export function createPageMetadata/);
  assert.match(schemaBuilders, /export function createServicePageSchema/);
  assert.match(schemaBuilders, /export function createBreadcrumbSchema/);
  assert.match(jsonLd, /JSON\.stringify\(data\)\.replace/);
});

test("all permanent routes have centralized metadata definitions", () => {
  const metadata = read("app/metadata-config.ts");
  const expectedPaths = [
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

  for (const path of expectedPaths) {
    assert.match(metadata, new RegExp(`"${path.replaceAll("/", "\\/")}"\\s*:`));
  }
});

test("the application provides a branded not-found route", () => {
  const notFound = read("app/not-found.tsx");
  assert.match(notFound, /Page not found/);
  assert.match(notFound, /Return Home/);
  assert.match(notFound, /Explore Experiences/);
});
