import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  framework,
  conversion,
  documentation,
  experiences,
  coffee,
  sweet,
  weddings,
  faq,
] = await Promise.all([
  read("../app/aeo-measurement.ts"),
  read("../app/conversion-measurement.ts"),
  read("../docs/phase-4b-aeo-measurement-framework.md"),
  read("../app/components/experiences-hub.tsx"),
  read("../app/components/coffee-bar-page.tsx"),
  read("../app/components/sweet-cart-page.tsx"),
  read("../app/components/weddings-page.tsx"),
  read("../app/faq/page.tsx"),
]);

test("defines every requested AEO measurement", () => {
  for (const metric of [
    "Non-branded search impressions",
    "Question-form queries",
    "Commercial investigation queries",
    "Local-intent queries",
    "Comparison queries",
    "Long-tail query growth",
    "Landing-page clicks",
    "Search click-through rate",
    "Search visibility by service",
    "Search visibility by event type",
    "Image-search performance",
    "Engagement with comparison sections",
    "Engagement with logistics sections",
    "Inquiry starts by landing page",
    "Inquiry handoffs by landing page",
    "New questions appearing in sales inquiries",
    "AI-search referrals where identifiable",
    "Changes in branded search demand",
  ]) {
    assert.match(framework, new RegExp(`metric: "${metric.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), metric);
  }
  assert.match(framework, /requestedMetricCount: 18/);
  assert.match(framework, /configuredMetricCount: aeoMetrics\.length/);
});

test("assigns sources, dimensions, methods, and decision uses without pretending integrations are active", () => {
  for (const field of ["sources:", "dimensions:", "method:", "decisionUse:", "availability:"]) {
    assert.match(framework, new RegExp(field));
  }
  assert.match(framework, /analyticsStatus: siteConfig\.analytics\.status/);
  assert.match(framework, /searchConsoleStatus: siteConfig\.searchConsole\.status/);
  assert.match(framework, /speculativeTrackersInstalled: \[\]/);
  assert.match(documentation, /It does not install an analytics script/);
});

test("extends the event contract for comparison and logistics engagement", () => {
  for (const eventName of [
    "comparison_section_engagement",
    "logistics_section_engagement",
  ]) {
    assert.match(conversion, new RegExp(`name: "${eventName}"`));
  }
  assert.match(conversion, /record link or disclosure actions separately from passive visibility/);
  assert.match(conversion, /Attribute inquiry starts and handoffs to the landing page/);
});

test("places stable inert hooks on comparison and logistics sections", () => {
  assert.match(experiences, /data-measurement-section="comparison"/);
  assert.match(experiences, /data-section-id="experience-need-comparison"/);
  assert.match(experiences, /data-event-name="comparison_section_engagement"/);
  assert.match(coffee, /data-measurement-section="logistics"/);
  assert.match(coffee, /data-section-id="coffee-service-planning"/);
  assert.match(sweet, /data-section-id="sweet-cart-operations"/);
  assert.match(weddings, /data-section-id="wedding-coordination"/);
  assert.match(faq, /category\.id === "setup-logistics"/);
  assert.match(faq, /"data-section-id": "shared-setup-logistics"/);
});

test("protects attribution and privacy boundaries", () => {
  assert.match(framework, /classify direct or stripped-referrer traffic as unknown rather than AI/);
  assert.match(framework, /never copy personal details or free-text inquiry content into analytics/);
  assert.match(framework, /do not join search queries to identifiable inquiry records/);
  assert.match(documentation, /Direct visits and stripped referrers remain\s+unknown/);
});

test("requires existing-page improvement before page creation", () => {
  assert.match(framework, /Assign the finding to the definitive existing page/);
  assert.match(framework, /Improve the smallest useful element/);
  assert.match(framework, /Create a new page only when the intent is materially distinct/);
  assert.match(documentation, /This prevents query reports from becoming a route-generation system/);
  assert.match(framework, /newContentRoutes: \[\]/);
  assert.match(documentation, /not the final Phase 4B hard\s+pass/);
});
