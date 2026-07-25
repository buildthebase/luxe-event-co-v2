import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const [policy, workerSource, script, siteConfig, packageJson] = await Promise.all([
  readFile(new URL("../app/indexnow.ts", import.meta.url), "utf8"),
  readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../scripts/submit-indexnow.mjs", import.meta.url), "utf8"),
  readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
  readFile(new URL("../package.json", import.meta.url), "utf8"),
]);

test("keeps IndexNow optional and inactive by default", () => {
  assert.match(siteConfig, /status: "optional-not-enabled"/);
  assert.match(policy, /Bing Webmaster Tools/);
  assert.match(policy, /XML sitemap remains required/);
  assert.match(policy, /inert unless --send is explicitly provided/);
  assert.match(packageJson, /"indexnow:submit": "node scripts\/submit-indexnow\.mjs"/);

  const result = spawnSync(process.execPath, ["scripts/submit-indexnow.mjs"], {
    cwd: new URL("..", import.meta.url),
    encoding: "utf8",
    env: {},
  });
  assert.equal(result.status, 0);
  assert.match(result.stdout, /IndexNow is inactive/);
});

test("validates ownership and canonical submission scope without a committed key", () => {
  assert.match(workerSource, /INDEXNOW_KEY\?: string/);
  assert.match(workerSource, /indexNowKeyPattern/);
  assert.match(workerSource, /url\.pathname === `\/\$\{indexNowKey\}\.txt`/);
  assert.match(script, /process\.env\.INDEXNOW_KEY/);
  assert.match(script, /https:\/\/api\.indexnow\.org\/indexnow/);
  assert.match(script, /url\.protocol !== "https:"/);
  assert.match(script, /url\.hostname !== canonicalHost/);
  assert.match(script, /urlList\.length > 10_000/);
  assert.doesNotMatch(script, /[A-Fa-f0-9]{32}/);
});

test("serves the configured root key only on the canonical HTTPS host", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("indexnow", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const key = "LuxeIndexNowKey-2026";
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const canonicalResponse = await worker.fetch(
    new Request(`https://luxeeventco.ca/${key}.txt`),
    { INDEXNOW_KEY: key },
    context,
  );
  assert.equal(canonicalResponse.status, 200);
  assert.equal(await canonicalResponse.text(), key);
  assert.match(canonicalResponse.headers.get("content-type") ?? "", /text\/plain/);
  assert.match(canonicalResponse.headers.get("x-robots-tag") ?? "", /noindex/);

  const unknownResponse = await worker.fetch(
    new Request("https://luxeeventco.ca/not-the-key.txt"),
    { INDEXNOW_KEY: key },
    context,
  );
  assert.equal(unknownResponse.status, 404);
});
