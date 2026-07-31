import assert from "node:assert/strict";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

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

function stripTags(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

test("every page exposes one descriptive H1 inside main content only", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const pageHeadings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    const mainHeadings = [...main.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];

    assert.equal(pageHeadings.length, 1, `${path} total H1 count`);
    assert.equal(mainHeadings.length, 1, `${path} main H1 count`);

    const h1 = pageHeadings[0][0];
    const accessibleName =
      h1.match(/\baria-label="([^"]+)"/i)?.[1] ?? stripTags(pageHeadings[0][1]);
    assert.ok(accessibleName.length >= 10, `${path} descriptive H1`);

    const beforeMain = html.split(/<main\b/i, 1)[0];
    assert.doesNotMatch(beforeMain, /<h1\b/i, `${path} navigation must not repeat H1`);
  }
});

test("H2 and H3 elements form a readable hierarchy without empty or skipped headings", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const headings = [...main.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(
      (match) => ({
        level: Number(match[1]),
        text: stripTags(match[2]),
      }),
    );

    assert.equal(headings[0]?.level, 1, `${path} begins with H1`);
    assert.ok(headings.some((heading) => heading.level === 2), `${path} major sections`);

    for (const heading of headings) {
      assert.ok(heading.text.length > 0, `${path} empty H${heading.level}`);
    }

    for (let index = 1; index < headings.length; index += 1) {
      assert.ok(
        headings[index].level <= headings[index - 1].level + 1,
        `${path} skips from H${headings[index - 1].level} to H${headings[index].level}`,
      );
    }
  }
});

test("hero eyebrows remain supporting text and responsive layouts share one heading tree", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";

    assert.doesNotMatch(
      main,
      /<h[1-6]\b[^>]*class="[^"]*(?:eyebrow|foundation-label)[^"]*"/i,
      `${path} eyebrow semantics`,
    );
    assert.equal((main.match(/<h1\b/gi) ?? []).length, 1, `${path} responsive H1 parity`);
  }
});

test("accordion questions use H3 headings beneath their H2 sections", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const response = await render(worker, path);
    const html = await response.text();
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    const disclosures = [...main.matchAll(/<details\b[^>]*>([\s\S]*?)<\/details>/gi)]
      .map((match) => match[1])
      .filter((details) => /<summary>[\s\S]*\?/i.test(details));

    for (const disclosure of disclosures) {
      assert.match(
        disclosure,
        /<summary>[\s\S]*?<h3>[^<]*\?<\/h3>[\s\S]*?<\/summary>/i,
        `${path} accordion question heading`,
      );
      assert.match(disclosure, /<\/summary>[\s\S]*?<p\b/i, `${path} accordion answer`);
    }
  }

  const faqResponse = await render(worker, "/faq");
  const faqHtml = await faqResponse.text();
  assert.ok((faqHtml.match(/<summary>[\s\S]*?<h3>/gi) ?? []).length >= 26);
});
