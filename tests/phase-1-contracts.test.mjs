import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const redirectSource = await readFile(new URL("../app/redirect-domain-plan.ts", import.meta.url), "utf8");
const boundarySource = await readFile(new URL("../app/inquiry-boundary.ts", import.meta.url), "utf8");
const assetsSource = await readFile(new URL("../app/asset-content-requirements.ts", import.meta.url), "utf8");
const schemaSource = await readFile(new URL("../app/schema-architecture.ts", import.meta.url), "utf8");

test("confirms every service-domain redirect destination", () => {
  assert.match(redirectSource, /luxecoffeebar\.ca/);
  assert.match(redirectSource, /canonicalHost\}\/experiences\/coffee-bar/);
  assert.match(redirectSource, /luxesweetcart\.ca/);
  assert.match(redirectSource, /canonicalHost\}\/experiences\/sweet-cart/);
  assert.match(redirectSource, /luxeseatingrentals\.ca/);
  assert.match(redirectSource, /canonicalHost\}\/experiences\/seating-rentals/);
  assert.equal((redirectSource.match(/redirectType: "301",/g) ?? []).length, 5);
});

test("keeps the third-party inquiry boundary explicit", () => {
  assert.match(boundarySource, /websiteInquiryResponsibilities/);
  assert.match(boundarySource, /thirdPartyInquiryResponsibilities/);
  assert.match(boundarySource, /Do not duplicate third-party form, quote, contract, payment/);
  assert.match(boundarySource, /Do not publish or hard-code an inquiry platform URL/);
});

test("identifies proof, content, permission, and operational assets", () => {
  assert.match(assetsSource, /coffee-photography/);
  assert.match(assetsSource, /sweet-photography/);
  assert.match(assetsSource, /seating-photography/);
  assert.match(assetsSource, /corporate-proof/);
  assert.match(assetsSource, /permission-required/);
  assert.match(assetsSource, /operational-proof/);
});

test("defines the parent schema graph and page schema rules", () => {
  assert.match(schemaSource, /import \{ experiences, siteConfig \}/);
  assert.match(schemaSource, /name: siteConfig\.organization\.publicName/);
  assert.match(schemaSource, /divisions: experiences\.map/);
  assert.match(schemaSource, /services: experiences\.map/);
  assert.match(schemaSource, /Do not use Event schema/);
  assert.match(schemaSource, /FAQPage is conditional/);
  assert.match(schemaSource, /#\$\{experience\.slug\}-division/);
  assert.match(schemaSource, /#\$\{experience\.slug\}-service/);
  assert.match(schemaSource, /primaryTypes: \["Service", "BreadcrumbList", "WebPage"\]/);
});
