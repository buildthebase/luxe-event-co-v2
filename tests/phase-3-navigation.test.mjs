import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (path) => fs.readFileSync(path, "utf8");
const config = read("app/navigation-config.ts");
const navigation = read("app/components/site-navigation.tsx");
const css = read("app/globals.css");

test("global navigation exposes the complete approved hierarchy", () => {
  for (const destination of [
    'href: "/"',
    'href: "/experiences"',
    'href: "/events"',
    'href: "/gallery"',
    'href: "/faq"',
    'href: "/inquire"',
  ]) {
    assert.match(config, new RegExp(destination.replaceAll("/", "\\/")));
  }

  assert.match(config, /experiences\.map/);
  assert.match(config, /eventTypes\.map/);
  assert.match(navigation, /item\.children\.map/);
  assert.match(navigation, /<Link/);
});

test("desktop disclosures support keyboard and pointer dismissal", () => {
  assert.match(navigation, /variant === "desktop"/);
  assert.match(navigation, /event\.key !== "Escape"/);
  assert.match(navigation, /closeDisclosure\(disclosure, true\)/);
  assert.match(navigation, /pointerdown/);
  assert.match(navigation, /onToggle=\{handleDesktopToggle\}/);
  assert.match(css, /\.foundation-nav-panel/);
});

test("mobile navigation manages scrolling, focus, and touch-safe hierarchy", () => {
  assert.match(navigation, /document\.body\.style\.overflow = "hidden"/);
  assert.match(navigation, /closeMobileMenu\(true\)/);
  assert.match(navigation, /onNavigate=\{\(\) => closeMobileMenu\(\)\}/);
  assert.match(navigation, /aria-expanded=\{isOpen\}/);
  assert.match(css, /overflow-y:\s*auto/);
  assert.match(css, /overscroll-behavior:\s*contain/);
  assert.match(css, /min-height:\s*44px/);
});

test("current pages and inquiry emphasis remain programmatically visible", () => {
  assert.match(navigation, /return "page"/);
  assert.match(navigation, /return "location"/);
  assert.match(navigation, /aria-current=\{currentState/);
  assert.match(
    navigation,
    /pathname === item\.href \|\| pathname\.startsWith/,
  );
  assert.match(config, /emphasis: "inquiry"/);
  assert.match(css, /\.foundation-nav-cta/);
});
