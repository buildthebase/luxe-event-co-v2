import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [
  qa,
  documentation,
  siteConfig,
  signatureElements,
  faqContent,
  galleryPage,
  galleryCollection,
] = await Promise.all([
    read("../app/phase-5-content-qa.ts"),
    read("../docs/phase-5-content-quality-assurance.md"),
    read("../app/site-config.ts"),
    read("../app/signature-elements.ts"),
    read("../app/faq/faq-content.ts"),
    read("../app/gallery/page.tsx"),
    read("../app/components/gallery-collection.tsx"),
  ]);

const routes = [
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

function visibleText(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replace(/\s+/g, " ")
    .trim();
}

test("covers every requested content QA dimension on every permanent route", () => {
  for (const check of [
    "Accuracy",
    "Grammar",
    "Consistent Canadian English",
    "Correct business names",
    "Correct contact information",
    "Correct social handles",
    "Correct service information",
    "Correct booking policies",
    "Correct capacities",
    "Correct client names",
    "Correct event types",
    "Consistent terminology",
    "No placeholder copy",
    "No duplicated sections",
    "No unsupported claims",
    "No contradictory package information",
    "No excessive repetition",
    "No irrelevant keyword insertion",
    "Correct inquiry CTAs",
    "Correct service-area information",
  ]) {
    assert.match(qa, new RegExp(`"${check}"`), check);
  }
  assert.match(qa, /primaryRoutes\.map/);
  assert.match(qa, /missingRoutes: primaryRoutes\.filter/);
  assert.match(documentation, /Every permanent page was reviewed/);
});

test("uses one canonical record for names, contacts, social profiles, clients, services, and events", () => {
  for (const signal of [
    "Luxe Event Co.",
    "Luxe Coffee Bar",
    "Luxe Sweet Cart",
    "Luxe Seating Rentals",
    "bookings@luxeeventco.ca",
    "+1 647-869-1352",
    "https://www.instagram.com/luxecoffeebar.to/",
    "https://www.instagram.com/luxesweet.cart/",
    "https://www.instagram.com/luxeseatingrentals",
    "OPTrust",
    "CST Savings",
    "Convergint",
    "ICNA Canada",
    "Waste Connections of Canada",
  ]) {
    assert.ok(
      qa.includes(signal) ||
        siteConfig.includes(signal) ||
        signatureElements.includes(signal),
      signal,
    );
  }
  assert.match(qa, /eventTypes: eventTypes\.map/);
  assert.match(qa, /coffeeGuests: 500/);
  assert.match(qa, /sweetCartGuests: 400/);
});

test("retains correct booking, package, and service-area policy", () => {
  assert.match(qa, /30% non-refundable retainer/);
  assert.match(qa, /seven days before the event/);
  assert.match(faqContent, /Luxe does not use one universal event package/);
  assert.match(qa, /Select destination events may be available throughout Southern Ontario/);
  assert.doesNotMatch(documentation, /destination events are available throughout Southern Ontario/i);
});

test("uses Canadian English without rewriting accepted Canadian variants", () => {
  assert.match(qa, /languageTag: siteConfig\.language/);
  assert.match(qa, /"centre"/);
  assert.match(qa, /"colour"/);
  assert.match(qa, /"labour"/);
  for (const accepted of ["organization", "customization", "personalized", "program"]) {
    assert.match(qa, new RegExp(`"${accepted}"`), accepted);
  }
  assert.match(documentation, /Canadian usage accepts/);
});

test("does not render reserved Gallery assets or unsupported real-work claims", async () => {
  assert.match(galleryCollection, /group\.media\.filter\(isPublishableImage\)/);
  assert.match(galleryCollection, /publishableMedia\.length > 0/);
  assert.doesNotMatch(galleryCollection, /fallback=/);
  assert.doesNotMatch(galleryPage, /Gallery \/ Real Luxe Events/);
  assert.doesNotMatch(galleryPage, /Real work\./);

  const worker = await loadWorker();
  const html = await (await render(worker, "/gallery")).text();
  assert.doesNotMatch(html, /Luxe event study/);
  assert.doesNotMatch(html, /class="gallery-group-media"/);
  assert.doesNotMatch(html, /real work/i);
  assert.match(html, /Experience Context/);
});

test("renders clean factual ownership and inquiry paths on every page", async () => {
  const worker = await loadWorker();
  const forbidden = /\b(?:lorem ipsum|coming soon|placeholder copy|sample text|TBD|TODO|FIXME|Luxe event study)\b/i;
  const americanOnly = /\b(?:favorite|favorites|behavior|labor|traveling|canceled)\b/i;

  for (const path of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const text = visibleText(html);
    assert.doesNotMatch(text, forbidden, `${path}: placeholder`);
    assert.doesNotMatch(text, americanOnly, `${path}: Canadian English`);
    assert.match(html, /Luxe Event Co\./, `${path}: business name`);
    assert.match(html, /bookings@luxeeventco\.ca/, `${path}: email`);
    assert.match(html, /\+1 647-869-1352/, `${path}: telephone`);
    assert.match(html, /luxecoffeebar\.to/, `${path}: Coffee Instagram`);
    assert.match(html, /luxesweet\.cart/, `${path}: Sweet Instagram`);
    assert.match(html, /luxeseatingrentals/, `${path}: Seating Instagram`);
    if (path === "/inquire") {
      assert.match(html, /href="(?:mailto:|tel:)/, `${path}: direct inquiry action`);
    } else {
      assert.match(html, /href="\/inquire"/, `${path}: inquiry CTA`);
    }
  }
});

test("keeps the FAQ count and structured answer source aligned", async () => {
  const worker = await loadWorker();
  const html = await (await render(worker, "/faq")).text();
  const text = visibleText(html);
  assert.match(text, /26 answers/);
  assert.doesNotMatch(text, /47 answers/);
  const jsonLd = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  )?.[1];
  assert.ok(jsonLd);
  const page = JSON.parse(jsonLd)["@graph"].find((node) =>
    Array.isArray(node["@type"]) && node["@type"].includes("FAQPage"),
  );
  assert.equal(page.mainEntity.length, 26);
});

test("records resolved findings and leaves no internal QA failure", () => {
  for (const finding of [
    "Legacy FAQ count",
    "Extended service-area certainty",
    "Package terminology",
    "Unapproved Gallery proof",
    "Gallery search description",
  ]) {
    assert.match(qa, new RegExp(`issue: "${finding}"`), finding);
  }
  for (const field of [
    "placeholderCopy",
    "contradictoryPackages",
    "incorrectCanadianEnglish",
    "incorrectNamesOrContacts",
    "incorrectSocialProfiles",
    "incorrectInquiryCtas",
    "incorrectServiceAreaClaims",
  ]) {
    assert.match(qa, new RegExp(`${field}: \\[\\]`), field);
  }
  assert.match(documentation, /No commit, staging, push, deployment, or broader Phase 5 hard pass was\s+performed/);
});
