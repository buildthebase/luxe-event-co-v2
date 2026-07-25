import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const qualitySource = await readFile(
  new URL("../app/content-quality.ts", import.meta.url),
  "utf8",
);

const routeSignals = new Map([
  ["/", ["500 guest coffee capacity", "$5M", "simultaneous setups"]],
  ["/experiences", ["Café Cart or Signature Coffee Bar", "Up to 500", "Up to 400"]],
  [
    "/experiences/coffee-bar",
    ["four espresso classics", "Up to 500", "setup and takedown"],
  ],
  [
    "/experiences/sweet-cart",
    ["Mini Dutch Pancakes", "Belgian milk chocolate", "Up to 400"],
  ],
  [
    "/experiences/seating-rentals",
    ["Cocktail Tables", "Delivery", "Floor plan"],
  ],
  ["/events", ["Weddings", "Corporate Events", "Brand Activations"]],
  ["/events/weddings", ["Cocktail hour", "30% non-refundable retainer", "$5 million"]],
  [
    "/events/corporate-events",
    ["up to three coffee setups", "multi-day corporate events", "recurring corporate programs"],
  ],
  [
    "/events/brand-activations",
    ["Custom-branded cups", "Retail activations", "Multiple-location campaigns"],
  ],
  ["/events/baby-showers", ["Coffee and matcha", "Live dessert", "Outdoor gatherings"]],
  ["/events/bridal-showers", ["Café-style coffee service", "Floral styling", "For hosts and planners"]],
  ["/events/birthdays", ["Milestone birthdays", "Mini Dutch pancakes", "Custom signage"]],
  [
    "/events/private-events",
    ["Engagement parties", "Religious and cultural celebrations", "Holiday gatherings"],
  ],
  ["/gallery", ["Coffee through the wedding day", "A brand guests can taste", "Luxe event study"]],
  ["/faq", ["47 answers", "$5 million in liability insurance", "30% non-refundable retainer"]],
  ["/inquire", ["What to have ready", "Within 24 hours", "bookings@luxeeventco.ca"]],
]);

const searchPhrases = new Map([
  ["/", "luxury event experiences"],
  ["/experiences", "event experiences Toronto"],
  ["/experiences/coffee-bar", "mobile coffee bar"],
  ["/experiences/sweet-cart", "dessert cart"],
  ["/experiences/seating-rentals", "event rentals Toronto"],
  ["/events", "event services Toronto"],
  ["/events/weddings", "wedding coffee bar"],
  ["/events/corporate-events", "corporate coffee catering"],
  ["/events/brand-activations", "branded coffee cart"],
  ["/events/baby-showers", "baby shower dessert cart"],
  ["/events/bridal-showers", "bridal shower coffee cart"],
  ["/events/birthdays", "birthday dessert catering"],
  ["/events/private-events", "private event catering"],
]);

const routes = [...routeSignals.keys()];

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "helpful-content-quality",
    `${process.pid}-${Date.now()}`,
  );
  return (await import(workerUrl.href)).default;
}

async function render(worker, path) {
  return worker.fetch(
    new Request(new URL(path, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&apos;", "'")
    .replaceAll("&nbsp;", " ");
}

function visibleText(fragment) {
  return decodeHtml(
    fragment
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  );
}

function mainText(html) {
  return visibleText(
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "",
  );
}

function countPhrase(text, phrase) {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return (text.match(new RegExp(escaped, "gi")) ?? []).length;
}

function meaningfulWordSet(text) {
  const stopWords = new Set([
    "about", "after", "also", "and", "are", "around", "before", "can", "for",
    "from", "have", "into", "its", "luxe", "more", "not", "one", "only",
    "our", "that", "the", "their", "then", "this", "through", "to", "with",
    "your",
  ]);

  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3 && !stopWords.has(word)),
  );
}

function jaccard(left, right) {
  const intersection = [...left].filter((word) => right.has(word)).length;
  const union = new Set([...left, ...right]).size;
  return union === 0 ? 0 : intersection / union;
}

test("records a completed quality review and honest evidence gate for every route", () => {
  for (const path of routes) {
    assert.match(
      qualitySource,
      new RegExp(`path: "${path.replaceAll("/", "\\/")}"`),
      path,
    );
  }

  for (const standard of [
    "originality",
    "accuracy",
    "usefulness",
    "completeness",
    "ownership",
    "firstHandExperience",
    "depth",
    "filler",
    "unsupportedClaims",
    "keywordUse",
    "positioningLanguage",
    "differentiation",
    "nextStep",
    "operations",
  ]) {
    assert.match(qualitySource, new RegExp(`${standard}:`), standard);
  }

  assert.match(qualitySource, /status: "reviewed-with-evidence-gates"/);
  assert.match(qualitySource, /ownerReviewRequired: true/);
  assert.match(qualitySource, /AI-assisted implementation cannot independently verify/);
  assert.match(
    qualitySource,
    /path: "\/gallery"[\s\S]*?firstHandStatus: "awaiting-approved-first-party-media"/,
  );
});

test("every page proves its purpose with concrete decision-supporting detail", async () => {
  const worker = await loadWorker();

  for (const [path, signals] of routeSignals) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const text = mainText(await response.text());

    assert.ok(text.split(/\s+/).length >= 450, `${path} has appropriate depth`);
    for (const signal of signals) {
      assert.ok(
        text.toLowerCase().includes(signal.toLowerCase()),
        `${path} concrete signal: ${signal}`,
      );
    }
  }
});

test("ownership and a relevant next step remain clear on every page", async () => {
  const worker = await loadWorker();

  for (const path of routes) {
    const html = await (await render(worker, path)).text();
    assert.match(html, /Luxe Event Co\./, `${path} owner`);
    assert.match(html, /bookings@luxeeventco\.ca/, `${path} owner email`);
    assert.match(html, /\+1 647-869-1352/, `${path} owner phone`);

    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
    if (path === "/inquire") {
      assert.match(main, /href="(?:mailto:|tel:)/, `${path} contact action`);
    } else {
      assert.match(main, /href="\/inquire"/, `${path} inquiry action`);
    }
  }
});

test("positioning adjectives stay selective and are outweighed by concrete copy", async () => {
  const worker = await loadWorker();
  const prohibitedFiller = [
    "exceptional",
    "unforgettable",
    "one-of-a-kind",
    "best-in-class",
    "world-class",
    "second to none",
    "bring your vision to life",
  ];

  for (const path of routes) {
    const text = mainText(await (await render(worker, path)).text());
    const lower = text.toLowerCase();
    const wordCount = text.split(/\s+/).length;
    const premiumCount = countPhrase(text, "premium");
    const selectivePositioningCount = ["luxury", "elevated", "memorable"]
      .reduce((total, word) => total + countPhrase(text, word), 0);

    for (const phrase of prohibitedFiller) {
      assert.equal(countPhrase(text, phrase), 0, `${path}: ${phrase}`);
    }
    assert.ok(
      premiumCount / wordCount <= 0.011,
      `${path} premium density is ${premiumCount}/${wordCount}`,
    );
    assert.ok(
      selectivePositioningCount <= 2,
      `${path} repeats selective positioning language`,
    );
    assert.ok(
      lower.includes("coffee") ||
        lower.includes("dessert") ||
        lower.includes("rental") ||
        path === "/faq" ||
        path === "/inquire",
      `${path} contains concrete service context`,
    );
  }
});

test("strategic phrases are used naturally rather than stuffed", async () => {
  const worker = await loadWorker();

  for (const [path, phrase] of searchPhrases) {
    const text = mainText(await (await render(worker, path)).text());
    assert.ok(
      countPhrase(text, phrase) <= 2,
      `${path} repeats "${phrase}" too often`,
    );
  }
});

test("page vocabularies remain differentiated instead of templated", async () => {
  const worker = await loadWorker();
  const wordSets = new Map();

  for (const path of routes) {
    wordSets.set(path, meaningfulWordSet(mainText(await (await render(worker, path)).text())));
  }

  for (let leftIndex = 0; leftIndex < routes.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < routes.length; rightIndex += 1) {
      const leftPath = routes[leftIndex];
      const rightPath = routes[rightIndex];
      const similarity = jaccard(wordSets.get(leftPath), wordSets.get(rightPath));
      assert.ok(
        similarity < 0.72,
        `${leftPath} and ${rightPath} are too similar: ${similarity.toFixed(3)}`,
      );
    }
  }
});
