import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");

test("Step 3.4 records every required reusable component decision", () => {
  const source = read("app/component-system.ts");
  const expected = [
    "Parent-brand hero",
    "Experience-specific hero",
    "Event-specific hero",
    "Experience selector",
    "Event selector",
    "Experience comparison",
    "Included-features section",
    "Menu or offering section",
    "Customization section",
    "Process section",
    "Combined-experience section",
    "Trusted By section",
    "Testimonial section",
    "Gallery preview",
    "Full gallery and filters",
    "FAQ accordion",
    "Service-area section",
    "Contextual inquiry section",
    "Breadcrumb navigation",
    "Social-share image template",
    "Accessible modal or lightbox",
  ];

  for (const component of expected) {
    assert.match(source, new RegExp(`name: "${component}"`));
  }
});

test("shared content modules accept typed content rather than page wording", () => {
  const faqSource = read("app/components/faq-accordion.tsx");
  const breadcrumbSource = read("app/components/breadcrumb-navigation.tsx");

  assert.match(faqSource, /export type FaqAccordionItem/);
  assert.match(faqSource, /items: readonly FaqAccordionItem\[\]/);
  assert.match(breadcrumbSource, /export type BreadcrumbItem/);
  assert.match(breadcrumbSource, /items: readonly BreadcrumbItem\[\]/);
  assert.doesNotMatch(
    `${faqSource}${breadcrumbSource}`,
    /Luxe Coffee Bar|Luxe Sweet Cart|Luxe Seating Rentals/,
  );
});

test("the reusable system protects division differentiation", () => {
  const source = read("app/component-system.ts");

  assert.match(source, /three divisions intentionally retain different visual systems/);
  assert.match(source, /not positioned as a rental catalogue/);
  assert.match(source, /page wrappers retain division- or event-specific art direction/);
});
