import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");

test("site configuration covers every Step 3.2 responsibility", () => {
  const config = read("app/site-config.ts");

  for (const requiredField of [
    "organization:",
    "legalName:",
    "publicName:",
    "domain:",
    "canonicalBaseUrl",
    "contact:",
    "socialProfiles",
    "brandAssets:",
    "defaultSocialImage:",
    "serviceAreas:",
    "searchConsole:",
    "analytics:",
    "inquiry:",
  ]) {
    assert.match(config, new RegExp(requiredField));
  }

  assert.match(config, /googleVerificationToken: null/);
  assert.match(config, /measurementId: null/);
  assert.match(config, /url: null as string \| null/);
});

test("core production consumers derive stable facts from site configuration", () => {
  const files = [
    "app/layout.tsx",
    "app/manifest.ts",
    "app/metadata-config.ts",
    "app/robots.ts",
    "app/redirect-domain-plan.ts",
    "app/schema-architecture.ts",
    "app/components/site-shell.tsx",
    "app/inquire/page.tsx",
  ];

  for (const file of files) {
    const source = read(file);
    assert.match(source, /siteConfig/);
    assert.doesNotMatch(source, /bookings@luxeeventco\.ca/);
    assert.doesNotMatch(source, /\+1 647-869-1352/);
  }
});

test("external integrations remain disabled until approved values exist", () => {
  const config = read("app/site-config.ts");
  const layout = read("app/layout.tsx");
  const inquire = read("app/inquire/page.tsx");

  assert.match(config, /status: "not-configured"/);
  assert.match(config, /status: "awaiting-platform-selection"/);
  assert.match(layout, /googleVerificationToken/);
  assert.match(inquire, /<InquiryHandoffLink/);
});
