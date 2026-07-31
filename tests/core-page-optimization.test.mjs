import assert from "node:assert/strict";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

const canonicalOrigin = "https://luxeeventco.ca";
const routes = [
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

const primaryTopicSignals = new Map([
  ["/", /Luxe Event Co[\s\S]*Luxe Coffee Bar[\s\S]*Luxe Sweet Cart[\s\S]*Luxe Seating Rentals/i],
  ["/experiences", /Coffee, dessert, and seating/i],
  ["/experiences/coffee-bar", /mobile coffee bar/i],
  ["/experiences/sweet-cart", /dessert cart experience/i],
  ["/experiences/seating-rentals", /event and seating rentals/i],
  ["/events", /Event experiences,[\s\S]*occasion/i],
  ["/events/weddings", /Wedding coffee, dessert, and rentals/i],
  ["/events/corporate-events", /Corporate coffee and event experiences/i],
  ["/events/brand-activations", /Branded coffee carts/i],
  ["/events/baby-showers", /Baby shower experiences/i],
  ["/events/bridal-showers", /Bridal shower experiences/i],
  ["/events/birthdays", /Birthday dessert and coffee/i],
  ["/events/private-events", /Private event experiences/i],
  ["/gallery", /Luxe event experiences/i],
  ["/faq", /Event planning and booking answers/i],
  ["/inquire", /Plan your Luxe[\s\S]*event experience/i],
]);

const decisionSupportSignals = new Map([
  ["/", /How the planning journey takes shape|What working with Luxe feels like/i],
  ["/experiences", /Can each experience be booked independently\?/i],
  ["/events", /What are you gathering for\?/i],
  ["/gallery", /Explore service directions by experience or occasion/i],
  ["/inquire", /What to have ready|What happens next/i],
]);

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

function mainText(html) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  return decodeHtml(
    main
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

test("all approved pages render complete indexable search foundations", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const canonical = `${canonicalOrigin}${path}`;

    assert.equal((html.match(/<title>/gi) ?? []).length, 1, path);
    assert.equal((html.match(/<meta name="description"/gi) ?? []).length, 1, path);
    assert.match(html, new RegExp(`rel="canonical" href="${canonical.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), path);
    assert.match(html, /<meta name="robots" content="index, follow"/i, path);
    assert.match(html, /<meta property="og:title" content="[^"]+"/i, path);
    assert.match(html, /<meta property="og:description" content="[^"]+"/i, path);
    assert.match(html, /<meta property="og:url" content="https:\/\/luxeeventco\.ca/i, path);
    assert.match(html, /<meta property="og:image" content="https:\/\/luxeeventco\.ca\//i, path);
    assert.match(html, /application\/ld\+json/i, path);
    assert.match(html, /"@type"(?:\s*):(?:\s*)"WebPage"|"@type"(?:\s*):(?:\s*)\[[^\]]*"WebPage"/i, path);

    if (path === "/") {
      assert.doesNotMatch(html, /aria-label="Breadcrumb"/i, path);
    } else {
      assert.match(html, /aria-label="Breadcrumb"/i, path);
    }
  }
});

test("every page has one clear H1, logical sections, useful text, and a next step", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const text = mainText(html);
    const headings = [...main.matchAll(/<h([1-3])\b/gi)].map((match) => Number(match[1]));

    assert.equal(headings.filter((level) => level === 1).length, 1, path);
    assert.ok(headings.filter((level) => level === 2).length >= 1, path);
    assert.equal(headings[0], 1, path);
    for (let index = 1; index < headings.length; index += 1) {
      assert.ok(headings[index] <= headings[index - 1] + 1, `${path} heading level jump`);
    }

    const minimumWords = path === "/gallery" ? 250 : 450;
    assert.ok(
      text.split(/\s+/).length >= minimumWords,
      `${path} must not be a thin visual page`,
    );
    assert.match(main, /<h1\b[\s\S]*?<\/h1>[\s\S]{0,500}<p\b/i, `${path} needs a clear introduction`);
    assert.match(text, primaryTopicSignals.get(path), `${path} primary topic`);
    assert.match(text, /Toronto|Greater Toronto Area|GTA|Southern Ontario/i, `${path} service area`);
    if (path === "/inquire") {
      assert.match(main, /<a\b[^>]*href="(?:mailto:|tel:)/i, `${path} contact path`);
    } else {
      assert.match(main, /<a\b[^>]*href="\/inquire"/i, `${path} inquiry path`);
    }

    const internalLinks = [...main.matchAll(/<a\b[^>]*href="(\/[^"#?]*)"/gi)].map(
      (match) => match[1],
    );
    assert.ok(new Set(internalLinks).size >= 3, `${path} contextual internal links`);
  }
});

test("supporting answers, proof controls, and image text remain page-appropriate", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const questionCount = (main.match(/\?/g) ?? []).length;
    const fallbackSignal = decisionSupportSignals.get(path);

    assert.ok(
      questionCount > 0 || (fallbackSignal && fallbackSignal.test(mainText(html))),
      `${path} needs visible decision-supporting answers`,
    );

    for (const image of main.match(/<img\b[^>]*>/gi) ?? []) {
      assert.match(image, /\balt="[^"]*"/i, `${path} image alt`);
    }
  }

  const galleryResponse = await render(worker, "/gallery");
  const galleryHtml = await galleryResponse.text();
  assert.doesNotMatch(galleryHtml, /data-asset-status="reserved"/i);
  assert.doesNotMatch(galleryHtml, /"@type":"ImageObject"[\s\S]*?#image-/i);
});
