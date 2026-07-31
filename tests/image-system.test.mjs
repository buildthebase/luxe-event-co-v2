import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path) =>
  readFile(new URL(`../${path}`, import.meta.url), "utf8");

const [
  imageSystem,
  responsiveImage,
  galleryContent,
  galleryCollection,
  credibilityComponent,
  nextConfig,
  siteConfig,
] = await Promise.all([
  read("app/image-system.ts"),
  read("app/components/responsive-image.tsx"),
  read("app/gallery/gallery-content.ts"),
  read("app/components/gallery-collection.tsx"),
  read("app/components/signature-elements.tsx"),
  read("next.config.ts"),
  read("app/site-config.ts"),
]);

test("defines an enforceable asset record and intake checklist", () => {
  for (const field of [
    "src?: string | null",
    "alt: string",
    "width: number",
    "height: number",
    "sizes: string",
    "priority?: boolean",
    "status: ImageAssetStatus",
    "format:",
  ]) {
    assert.match(imageSystem, new RegExp(field.replace(/[?+|()[\]{}]/g, "\\$&")));
  }

  for (const requirement of [
    "sourcePreservation",
    "deliveryFormats",
    "responsiveOutput",
    "dimensions",
    "loading",
    "urls",
    "accessibility",
    "context",
    "fileWeight",
    "discovery",
    "embeddedText",
    "orientation",
    "originalPhotography",
  ]) {
    assert.match(imageSystem, new RegExp(`${requirement}:`));
  }

  assert.match(imageSystem, /Confirm ownership and written publication permission/);
  assert.match(imageSystem, /Record intrinsic dimensions and do not upscale/);
  assert.match(imageSystem, /Write factual alt text and an optional contextual caption/);
  assert.match(imageSystem, /imageSitemapPolicy = \{[\s\S]*?required: false/);
  assert.match(imageSystem, /Reassess when the approved event gallery/);
});

test("centralizes approved brand and credibility image metadata", () => {
  for (const asset of [
    "favicon",
    "organizationLogo",
    "googleThumbnail",
    "defaultSocialImage",
    "optrust",
    "cstSavings",
    "convergint",
    "icnaCanada",
    "wasteConnectionsCanada",
  ]) {
    assert.match(imageSystem, new RegExp(`${asset}:`));
  }

  assert.match(siteConfig, /favicon: imageAssets\.brand\.favicon/);
  assert.match(siteConfig, /defaultSocialImage: imageAssets\.brand\.defaultSocialImage/);
  assert.match(credibilityComponent, /<ResponsiveImage asset=\{organization\.logo\}/);
  assert.doesNotMatch(credibilityComponent, /<img/);
});

test("uses responsive image delivery with stable geometry and deliberate loading", () => {
  assert.match(responsiveImage, /from "next\/image"/);
  assert.match(responsiveImage, /if \(!isPublishableImage\(asset\)\)/);
  assert.match(responsiveImage, /asset\.priority \? "eager" : "lazy"/);
  assert.match(responsiveImage, /asset\.priority \? "high" : "auto"/);
  assert.match(responsiveImage, /height=\{asset\.height\}/);
  assert.match(responsiveImage, /width=\{asset\.width\}/);
  assert.match(responsiveImage, /sizes=\{asset\.sizes\}/);
  assert.match(responsiveImage, /position: "absolute"/);

  assert.match(nextConfig, /"image\/avif"/);
  assert.match(nextConfig, /"image\/webp"/);
  assert.match(nextConfig, /deviceSizes:/);
  assert.match(nextConfig, /imageSizes:/);
});

test("gallery placeholders retain complete future-image metadata", () => {
  const imageRecords = galleryContent.match(/id: "(?:wedding|activation|shower|milestone|corporate|combined)[^"]*"[\s\S]*?format: "avif"/g) ?? [];
  assert.equal(imageRecords.length, 11);

  for (const record of imageRecords) {
    assert.match(record, /alt: "[^"]+"/);
    assert.match(record, /caption: "[^"]+"/);
    assert.match(record, /width: \d+/);
    assert.match(record, /height: \d+/);
    assert.match(record, /sizes: "[^"]+"/);
    assert.match(record, /status: "reserved"/);
  }

  assert.match(galleryContent, /priority: true/);
  assert.match(galleryCollection, /group\.media\.filter\(isPublishableImage\)/);
  assert.doesNotMatch(galleryCollection, /fallback=/);
  assert.doesNotMatch(galleryCollection, /Luxe event study/);
});

test("reserved gallery alt text is concise, factual, and distinct from its caption", () => {
  const records = galleryContent.match(
    /id: "(?:wedding|activation|shower|milestone|corporate|combined)[^"]*"[\s\S]*?format: "avif"/g,
  ) ?? [];

  for (const record of records) {
    const alt = record.match(/alt: "([^"]+)"/)?.[1] ?? "";
    const caption = record.match(/caption: "([^"]+)"/)?.[1] ?? "";

    assert.ok(alt.length > 0 && alt.length <= 125, alt);
    assert.doesNotMatch(alt, /\b(?:image|photo|picture) of\b/i, alt);
    assert.notEqual(alt.toLowerCase(), caption.toLowerCase(), alt);
    assert.doesNotMatch(alt, /\b(\w+)(?:\s+\1){2,}\b/i, alt);
  }
});

test("only approved public images can become gallery structured-data proof", () => {
  assert.match(imageSystem, /asset\.status === "approved" && Boolean\(asset\.src\)/);
  assert.match(galleryContent, /\.filter\(isPublishableImage\)/);
  assert.doesNotMatch(galleryContent, /src: "\/images\/gallery\//);
});
