import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/conversion-measurement.ts", import.meta.url), "utf8");

test("defines the required conversion event taxonomy", () => {
  for (const name of [
    "experience_select",
    "event_type_select",
    "service_page_view",
    "event_page_view",
    "combined_experience_select",
    "gallery_filter",
    "gallery_item_open",
    "inquiry_start",
    "inquiry_handoff",
    "phone_click",
    "email_click",
    "social_click",
  ]) assert.match(source, new RegExp(`name: "${name}"`), name);
});

test("documents triggers, pages, parameters, and interpretations", () => {
  assert.match(source, /trigger: /);
  assert.match(source, /pages: /);
  assert.match(source, /parameters: /);
  assert.match(source, /interpretation: /);
  assert.match(source, /source: "master-specification"|source: "client-intake"|source: "both"/);
});

test("protects privacy and keeps external outcomes distinct", () => {
  assert.match(source, /Do not send names, email addresses, phone numbers, event dates/);
  assert.match(source, /Keep inquiry_handoff and confirmation_return distinct/);
  assert.match(source, /Analytics provider and property are not yet selected/);
  assert.match(source, /production inquiry-platform URL and handoff method are not yet confirmed/);
});
