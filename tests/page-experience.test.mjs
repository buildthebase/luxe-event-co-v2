import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { render } from "./test-worker.mjs";

const canonicalOrigin = "https://luxeeventco.ca";
const permanentRoutes = [
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

const [performanceSystem, interactionSystem, navigation, shell, styles, workerSource] =
  await Promise.all([
    readFile(new URL("../app/performance-system.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/interaction-system.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-navigation.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site-shell.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
  ]);

test("records a complete, visitor-first page-experience policy", () => {
  assert.match(performanceSystem, /passing diagnostics does not guarantee rankings/i);
  assert.match(performanceSystem, /No automatic modal/);
  assert.match(performanceSystem, /may not trap, rewrite, or interfere with browser Back/i);
  assert.match(performanceSystem, /opens only after a visitor activates Menu/);
  assert.match(interactionSystem, /Do not disguise links or actions/);
  assert.match(interactionSystem, /Do not trap, rewrite, or interfere with browser Back/);
});

test("keeps overlays user-invoked and leaves browser history alone", () => {
  const clientSources = `${navigation}\n${interactionSystem}`;

  assert.match(navigation, /<details/);
  assert.match(navigation, /<summary aria-expanded=\{isOpen\}>/);
  assert.doesNotMatch(navigation, /<details[^>]*\sopen(?:\s|=|>)/);
  assert.doesNotMatch(clientSources, /\b(?:pushState|replaceState|popstate|beforeunload)\b/);
  assert.doesNotMatch(clientSources, /\bwindow\.open\s*\(/);
  assert.doesNotMatch(shell, /\b(?:dialog|aria-modal)\b/i);
});

test("preserves readable text, stable viewport layout, and reduced motion", () => {
  assert.match(styles, /scrollbar-gutter:\s*stable/);
  assert.match(styles, /-webkit-text-size-adjust:\s*100%/);
  assert.match(styles, /text-size-adjust:\s*100%/);
  assert.match(styles, /font-size:\s*var\(--type-body\)/);
  assert.match(styles, /line-height:\s*1\.6/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /min-height:\s*100svh/);
});

test("serves every permanent route with distinct navigation and main-content landmarks", async () => {
  for (const route of permanentRoutes) {
    const response = await render(`${canonicalOrigin}${route}`);
    const html = await response.text();

    assert.equal(response.status, 200, route);
    assert.match(html, /href="#main-content"[^>]*>Skip to main content</, route);
    assert.match(html, /<nav[^>]+aria-label="Primary navigation"/, route);
    assert.match(html, /<div[^>]+id="main-content"[^>]+tabindex="-1"/, route);
    assert.match(html, /<main(?:\s|>)/, route);
    assert.match(html, /<footer(?:\s|>)/, route);
    assert.ok(html.indexOf("<main") > html.indexOf("<header"), route);
    assert.ok(html.indexOf("<footer") > html.indexOf("<main"), route);
    assert.doesNotMatch(html, /\b(?:aria-modal="true"|role="dialog")\b/i, route);
  }
});

test("enforces canonical HTTPS and security headers without claiming live delivery", async () => {
  assert.match(workerSource, /Strict-Transport-Security/);
  assert.match(workerSource, /X-Content-Type-Options/);
  assert.match(workerSource, /Referrer-Policy/);

  const secureResponse = await render(`${canonicalOrigin}/`);
  assert.equal(
    secureResponse.headers.get("strict-transport-security"),
    "max-age=31536000",
  );
  assert.equal(secureResponse.headers.get("x-content-type-options"), "nosniff");
  assert.equal(
    secureResponse.headers.get("referrer-policy"),
    "strict-origin-when-cross-origin",
  );

  const insecureResponse = await render("http://luxeeventco.ca/events/weddings");
  assert.equal(insecureResponse.status, 301);
  assert.equal(
    insecureResponse.headers.get("location"),
    `${canonicalOrigin}/events/weddings`,
  );
});
