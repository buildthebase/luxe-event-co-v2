import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/page-contract.ts", import.meta.url), "utf8");

test("defines one purpose and primary CTA for every approved page", () => {
  assert.match(source, /export const pageContracts: PageContract\[\] = \[/);
  assert.equal((source.match(/primaryCta: "/g) ?? []).length, 16);
  assert.equal((source.match(/purpose: "/g) ?? []).length, 16);
  assert.equal((source.match(/indexable: true/g) ?? []).length, 16);
});

test("keeps page contracts aligned with the canonical route model", () => {
  assert.match(source, /missingRoutes: primaryRoutes\.filter/);
  assert.match(source, /primaryIntents: searchIntents\.map/);
  assert.match(source, /schemaPlan:/);
});
