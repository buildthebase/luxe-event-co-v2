import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { render } from "./test-worker.mjs";

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

const primaryCtas = {
  "/": "Plan Your Event",
  "/experiences": "Explore an Experience",
  "/experiences/coffee-bar": "Inquire About Coffee Service",
  "/experiences/sweet-cart": "Inquire About a Dessert Experience",
  "/experiences/seating-rentals": "Discuss Your Rental Requirements",
  "/events": "Find Your Event Experience",
  "/events/weddings": "Plan Your Wedding Experience",
  "/events/corporate-events": "Discuss a Corporate Event",
  "/events/brand-activations": "Create a Branded Experience",
  "/events/baby-showers": "Plan a Baby Shower",
  "/events/bridal-showers": "Plan a Bridal Shower",
  "/events/birthdays": "Plan a Birthday Experience",
  "/events/private-events": "Discuss Your Event",
  "/gallery": "Start Planning Your Event",
  "/faq": "Ask About Your Event",
  "/inquire": "Begin Your Inquiry",
};

async function renderPath(path) {
  const response = await render(path);

  assert.equal(response.status, 200, path);
  return response.text();
}

function mainMarkup(html) {
  return html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
}

function visibleText(markup) {
  return markup
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<(picture|video|svg|canvas)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[^;]+;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function headingOutline(markup) {
  return [...markup.matchAll(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)].map(
    (match) => ({
      level: Number(match[1]),
      attributes: match[2],
      text: visibleText(match[3]),
    }),
  );
}

test("Step 3.5 hierarchy rules remain centralized", () => {
  const source = fs.readFileSync("app/content-hierarchy.ts", "utf8");

  for (const rule of [
    "primaryHeading",
    "openingExplanation",
    "sectionHeadings",
    "visibleContent",
    "conversion",
    "discovery",
    "evidence",
  ]) {
    assert.match(source, new RegExp(`${rule}:`));
  }

  for (const route of routes) {
    assert.match(source, new RegExp(`"${route.replaceAll("/", "\\/")}"\\s*:`));
  }
});

for (const route of routes) {
  test(`${route} preserves the complete content hierarchy`, async () => {
    const markup = mainMarkup(await renderPath(route));
    const headings = headingOutline(markup);
    const h1s = headings.filter((heading) => heading.level === 1);

    assert.equal(h1s.length, 1, `${route}: exactly one H1`);
    assert.doesNotMatch(
      h1s[0].attributes,
      /\bhidden\b|aria-hidden\s*=\s*["']true["']/i,
      `${route}: H1 must be visible`,
    );

    for (let index = 1; index < headings.length; index += 1) {
      assert.ok(
        headings[index].level <= headings[index - 1].level + 1,
        `${route}: ${headings[index - 1].level} to ${headings[index].level} before "${headings[index].text}"`,
      );
    }

    const firstH2 = markup.search(/<h2\b/i);
    const openingMarkup = firstH2 === -1 ? markup : markup.slice(0, firstH2);
    assert.match(openingMarkup, /<p\b/i, `${route}: opening explanation`);

    const text = visibleText(markup);
    assert.ok(
      text.split(/\s+/).length >= 250,
      `${route}: meaningful server-rendered body copy`,
    );
    assert.ok(text.includes(primaryCtas[route]), `${route}: primary CTA`);

    const internalLinks = [
      ...markup.matchAll(/<a\b[^>]*href=["'](\/[^"'#?]*)["']/gi),
    ].map((match) => match[1]);
    assert.ok(internalLinks.length >= 3, `${route}: visible internal links`);
    assert.ok(
      internalLinks.some(
        (href) => href.startsWith("/experiences") || href.startsWith("/events"),
      ),
      `${route}: cross-service or event pathway`,
    );

    assert.match(
      text,
      /trusted|insurance|capacity|guests|real work|real events|permission-cleared|served|visible copy and schema/i,
      `${route}: relevant proof`,
    );
    assert.match(
      text,
      /setup|teardown|retainer|travel|service area|power|water|venue|guest count|response|event details/i,
      `${route}: logistics or qualification`,
    );

    if (route !== "/inquire") {
      const finalInquiryPosition = markup.lastIndexOf('href="/inquire"');
      assert.ok(finalInquiryPosition >= 0, `${route}: final inquiry link`);
      assert.ok(
        finalInquiryPosition / markup.length >= 0.75,
        `${route}: inquiry opportunity must return near the page conclusion`,
      );
    } else {
      assert.match(markup, /data-event-name="(?:inquiry_start|inquiry_handoff)"/);
      assert.match(markup, /href="mailto:/);
      assert.match(markup, /href="tel:/);
    }
  });
}
