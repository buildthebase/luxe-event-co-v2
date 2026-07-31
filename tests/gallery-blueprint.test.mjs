import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const pageSource = await readFile(new URL("../app/gallery/page.tsx", import.meta.url), "utf8");
const metadataSource = await readFile(new URL("../app/metadata-config.ts", import.meta.url), "utf8");
const collectionSource = await readFile(new URL("../app/components/gallery-collection.tsx", import.meta.url), "utf8");
const contentSource = await readFile(new URL("../app/gallery/gallery-content.ts", import.meta.url), "utf8");
const responsiveImageSource = await readFile(new URL("../app/components/responsive-image.tsx", import.meta.url), "utf8");
const cssSource = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

test("implements the complete Gallery blueprint and exact primary CTA", () => {
  for (const component of ["GalleryHero", "GalleryCollection", "GalleryInquiry"]) {
    assert.match(pageSource, new RegExp(`<${component}`), component);
  }
  assert.match(pageSource, /Start Planning Your Event/);
  assert.match(pageSource, /Gallery \/ Experience Context/);
  assert.doesNotMatch(pageSource, /className="foundation-label"/);
});

test("defines every requested accessible filter without indexable filter URLs", () => {
  for (const label of [
    "All",
    "Coffee Bar",
    "Sweet Cart",
    "Seating Rentals",
    "Weddings",
    "Corporate",
    "Brand Activations",
    "Baby Showers",
    "Bridal Showers",
    "Birthdays",
    "Private Events",
  ]) assert.match(contentSource, new RegExp(`label: "${label}"`), label);

  assert.match(collectionSource, /aria-pressed=\{activeFilter === filter\.value\}/);
  assert.match(collectionSource, /aria-controls="gallery-groups"/);
  assert.match(collectionSource, /role="group"/);
  assert.match(collectionSource, /data-event-name="gallery_filter"/);
  assert.doesNotMatch(collectionSource, /URLSearchParams|useSearchParams|router\.push/);
  assert.match(pageSource, /createPageMetadata\("\/gallery"\)/);
  assert.match(metadataSource, /"\/gallery"/);
});

test("groups media by service and event context with descriptive captions and links", () => {
  for (const id of [
    "wedding-coffee-hospitality",
    "branded-corporate-hospitality",
    "shower-dessert-experience",
    "milestone-dessert-moment",
    "wedding-room-composition",
    "corporate-room-support",
    "complete-private-gathering",
  ]) assert.match(contentSource, new RegExp(`id: "${id}"`), id);

  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/events/weddings",
    "/events/corporate-events",
    "/events/brand-activations",
    "/events/baby-showers",
    "/events/bridal-showers",
    "/events/birthdays",
    "/events/private-events",
  ]) assert.match(contentSource, new RegExp(`href: "${href}"`), href);

  assert.match(collectionSource, /<figcaption>/);
  assert.match(collectionSource, /\{item\.caption\}/);
});

test("supports crawlable responsive images with correct loading priority", () => {
  assert.match(collectionSource, /<ResponsiveImage/);
  assert.match(responsiveImageSource, /from "next\/image"/);
  assert.match(responsiveImageSource, /loading=\{loading\}/);
  assert.match(responsiveImageSource, /fetchPriority=\{fetchPriority\}/);
  assert.match(responsiveImageSource, /sizes=\{asset\.sizes\}/);
  assert.match(contentSource, /priority: true/);
  assert.match(contentSource, /isPublishableImage/);
});

test("does not misrepresent pending assets as approved visual proof", () => {
  assert.match(collectionSource, /group\.media\.filter\(isPublishableImage\)/);
  assert.match(collectionSource, /publishableMedia\.length > 0/);
  assert.doesNotMatch(collectionSource, /Luxe event study/);
  assert.doesNotMatch(collectionSource, /fallback=/);
  assert.match(contentSource, /approvedGalleryImages/);
  assert.doesNotMatch(contentSource, /src: "\/images\/gallery\//);
});

test("implements CollectionPage, WebPage, BreadcrumbList, and conditional ImageObject schema", () => {
  assert.match(pageSource, /"@type": \["CollectionPage", "WebPage"\]/);
  assert.match(pageSource, /createBreadcrumbSchema\("\/gallery"\)/);
  assert.match(pageSource, /"@type": "ImageObject"/);
  assert.match(pageSource, /approvedGalleryImages\.map/);
  assert.match(pageSource, /contentUrl: `\$\{siteConfig\.url\}\$\{item\.src\}`/);
});

test("uses the shared internal H1 and section-heading scales", () => {
  assert.match(pageSource, /<span>Luxe event<\/span>/);
  assert.match(pageSource, /<span>experiences, explored<\/span>/);
  assert.match(pageSource, /<span>by the moments they can serve\.<\/span>/);
  assert.match(cssSource, /\.foundation-shell \.gallery-hero-copy h1/);
  assert.match(cssSource, /\.gallery-filter-panel h2[\s\S]*?font-size: var\(--type-internal-page-h1\)/);
  assert.match(cssSource, /@media \(max-width: 700px\)[\s\S]*?\.gallery-filter-panel h2,[\s\S]*?font-size: var\(--type-internal-page-h1-mobile\)/);
});
