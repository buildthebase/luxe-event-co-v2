import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [worker, viteConfig, nextConfig] = await Promise.all([
  readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  readFile(new URL("../next.config.ts", import.meta.url), "utf8"),
]);

test("provides local and production image bindings", () => {
  assert.match(viteConfig, /assets:\s*\{[\s\S]*binding: "ASSETS"/);
  assert.match(viteConfig, /images:\s*\{[\s\S]*binding: "IMAGES"/);
  assert.match(worker, /env\.ASSETS\?\.fetch\(assetRequest\) \?\? fetch\(assetRequest\)/);
  assert.match(worker, /\.\.\.\(env\.IMAGES/);
});

test("keeps worker image widths aligned with Next image output", () => {
  for (const width of [
    32, 48, 64, 96, 128, 256, 384,
    480, 640, 768, 1024, 1280, 1600, 1920, 2400,
  ]) {
    assert.match(worker, new RegExp(`\\b${width}\\b`));
  }

  for (const width of [480, 640, 768, 1024, 1280, 1600, 1920, 2400]) {
    assert.match(nextConfig, new RegExp(`\\b${width}\\b`));
  }
});
