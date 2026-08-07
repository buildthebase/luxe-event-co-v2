import assert from "node:assert/strict";
import test from "node:test";
import { buildLinkGraph, createEmptyArticle, parseInlineInternalLinks, searchArticles, validateArticle } from "../cms/core.mjs";

function article(overrides = {}) {
  return {
    ...createEmptyArticle(),
    slug: "example-article",
    title: "Example article",
    seoTitle: "Example article | Luxe Event Co.",
    description: "A useful and unique description for this example article.",
    excerpt: "A useful excerpt.",
    content: [
      { type: "quick-answer", title: "Quick answer", content: [{ text: "A concise answer." }] },
      { type: "heading", id: "planning", level: 2, text: "Planning guidance" },
      { type: "paragraph", content: [{ text: "Read the related guide.", href: "/blog/related-article" }] },
      { type: "key-takeaways", title: "Key takeaways", items: [[{ text: "One useful point." }]] },
    ],
    ...overrides,
  };
}

test("published-only inbound links clear orphan status", () => {
  const target = article({ slug: "related-article", status: "published", content: [] });
  const publishedSource = article({ slug: "published-source", status: "published" });
  const graph = buildLinkGraph([target, publishedSource], ["/blog"]);
  assert.equal(graph["related-article"].orphan, false);

  const draftSource = article({ slug: "draft-source", status: "draft" });
  const draftOnly = buildLinkGraph([target, draftSource], ["/blog"]);
  assert.equal(draftOnly["related-article"].orphan, true);
  assert.equal(draftOnly["related-article"].incoming.drafts.length, 1);
});

test("archive disposition prevents ambiguous archived URLs", () => {
  const archived = article({ status: "archived" });
  const issues = validateArticle(archived, [archived], { knownPaths: ["/blog"] });
  assert.ok(issues.some((entry) => entry.code === "archive-disposition" && entry.severity === "error"));
});

test("prohibited voice and unverified claims block publishing", () => {
  const candidate = article({
    status: "published",
    excerpt: "A game-changing article.",
    claims: [{ id: "claim-1", text: "Unsupported", status: "unverified", sourceIds: [] }],
  });
  const issues = validateArticle(candidate, [candidate], { voice: { excludedWords: ["game-changing"] }, knownPaths: ["/blog/related-article"] });
  assert.ok(issues.some((entry) => entry.code === "excluded-language"));
  assert.ok(issues.some((entry) => entry.code === "claim-status"));
});

test("CMS search includes body text", () => {
  const first = article({ slug: "coffee-guide", content: [{ type: "paragraph", content: [{ text: "Ceremonial matcha service" }] }] });
  const second = article({ slug: "seating-guide", content: [{ type: "paragraph", content: [{ text: "Lounge seating layouts" }] }] });
  assert.deepEqual(searchArticles([first, second], "matcha").map((entry) => entry.slug), ["coffee-guide"]);
});

test("generated Markdown-style internal links become structured article links", () => {
  assert.deepEqual(parseInlineInternalLinks("Explore [Luxe Coffee Bar](/experiences/coffee-bar) today."), [
    { text: "Explore " },
    { text: "Luxe Coffee Bar", href: "/experiences/coffee-bar" },
    { text: " today." },
  ]);
});

test("raw Markdown internal links block publication", () => {
  const candidate = article({
    content: [{ type: "paragraph", content: [{ text: "Explore [Luxe Coffee Bar](/experiences/coffee-bar)." }] }],
  });
  const issues = validateArticle(candidate, [candidate], { knownPaths: ["/experiences/coffee-bar"] });
  assert.ok(issues.some((entry) => entry.code === "inline-link-syntax" && entry.severity === "error"));
});
