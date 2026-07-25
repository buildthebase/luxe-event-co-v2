import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(
  new URL("../app/inquire/page.tsx", import.meta.url),
  "utf8",
);
const cssSource = await readFile(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);
const blueprintSource = await readFile(
  new URL("../docs/inquire-page-blueprint.md", import.meta.url),
  "utf8",
);
const siteConfigSource = await readFile(
  new URL("../app/site-config.ts", import.meta.url),
  "utf8",
);
const handoffSource = await readFile(
  new URL("../app/components/inquiry-handoff-link.tsx", import.meta.url),
  "utf8",
);

test("implements the complete Inquire blueprint and exact primary CTA", () => {
  for (const component of [
    "InquireHero",
    "ExperienceScope",
    "EventBrief",
    "PlanningGuidance",
    "AfterInquiry",
    "InquiryHandoff",
  ]) {
    assert.match(pageSource, new RegExp(`<${component}`), component);
  }
  assert.match(pageSource, /Begin Your Inquiry/);
  assert.match(pageSource, /Inquire \/ Plan the Next Step/);
  assert.doesNotMatch(pageSource, /className="foundation-label"/);
});

test("supports one or multiple Luxe experiences", () => {
  for (const phrase of [
    "Luxe Coffee Bar",
    "Luxe Sweet Cart",
    "Luxe Seating Rentals",
    "each be requested independently",
    "coordinated through one Luxe inquiry",
  ]) {
    assert.match(pageSource, new RegExp(phrase), phrase);
  }
});

test("covers every required event-brief detail", () => {
  const inquiryDetailsSource = pageSource
    .split("const inquiryDetails = [")[1]
    .split("] as const;")[0];

  for (const title of [
    "Event date",
    "Location",
    "Guest count",
    "Event type",
    "Service duration",
    "Setting",
    "Experience selection",
    "Branding",
    "Special requests",
  ]) {
    assert.match(pageSource, new RegExp(`title: "${title}"`), title);
  }
  assert.equal((inquiryDetailsSource.match(/number: "0[1-9]"/g) ?? []).length, 9);
});

test("publishes confirmed contact, response, insurance, and minimum facts", () => {
  for (const phrase of [
    "bookings@luxeeventco.ca",
    "+1 647-869-1352",
  ]) {
    assert.match(
      siteConfigSource,
      new RegExp(phrase.replace(/[+$]/g, "\\$&")),
      phrase,
    );
  }

  for (const phrase of [
    "Within 24 hours",
    "$5 million",
    "approximately 30 guests",
    "30% non-refundable retainer",
  ]) {
    assert.match(
      pageSource,
      new RegExp(phrase.replace(/[+$]/g, "\\$&")),
      phrase,
    );
  }
});

test("uses representative service-area references without repeating the full city list", () => {
  for (const location of [
    "Toronto",
    "Markham",
    "Vaughan",
    "Mississauga",
    "Oakville",
    "Pickering",
    "Greater Toronto Area",
    "Southern Ontario",
  ]) {
    assert.match(pageSource, new RegExp(location), location);
  }
  for (const intentionallyOmittedLocation of [
    "Scarborough",
    "Newmarket",
    "Brampton",
    "Oshawa",
  ]) {
    assert.doesNotMatch(pageSource, new RegExp(intentionallyOmittedLocation));
  }
  assert.doesNotMatch(pageSource, /Hamilton/);
});

test("preserves the third-party boundary and transparent fallback", () => {
  assert.match(pageSource, /<InquiryHandoffLink/);
  assert.match(handoffSource, /siteConfig\.inquiry\.url/);
  assert.match(handoffSource, /inquiry_handoff/);
  assert.match(handoffSource, /inquiry_start/);
  assert.match(handoffSource, /mailto:/);
  assert.match(handoffSource, /noopener noreferrer/);
  assert.match(pageSource, /guided inquiry platform is being connected/);
  assert.match(pageSource, /does not collect or store event details/);
  assert.match(blueprintSource, /does not embed or invent a form destination/);
});

test("provides contact methods, FAQ, and conversion measurement hooks", () => {
  assert.match(pageSource, /data-event-name="phone_click"/);
  assert.match(pageSource, /data-event-name="email_click"/);
  assert.match(pageSource, /href="\/experiences"/);
  assert.match(pageSource, /href="\/events"/);
  assert.match(pageSource, /href="\/faq"/);
  assert.match(pageSource, /Privacy|privacy/);
});

test("implements one ContactPage/WebPage entity and references the stable organization", () => {
  assert.match(pageSource, /"@type": \["ContactPage", "WebPage"\]/);
  assert.match(pageSource, /createBreadcrumbSchema\("\/inquire"\)/);
  assert.match(pageSource, /about: \{ "@id": organizationId \}/);
  assert.doesNotMatch(pageSource, /"@type": "Organization"/);
  assert.doesNotMatch(pageSource, /"@type": "ContactPoint"/);
  assert.doesNotMatch(pageSource, /"@type": "Offer"/);
});

test("uses the shared internal H1 and responsive inquiry composition", () => {
  assert.match(
    cssSource,
    /\.foundation-shell \.inquire-hero-copy h1,[\s\S]*?font-size: var\(--type-internal-page-h1\)/,
  );
  assert.match(
    cssSource,
    /@media \(max-width: 760px\)[\s\S]*?\.inquire-hero-copy h1[\s\S]*?var\(--type-internal-page-h1-mobile\)/,
  );
  assert.match(cssSource, /\.inquire-brief ol/);
  assert.match(cssSource, /\.inquire-guidance-grid/);
}
);
