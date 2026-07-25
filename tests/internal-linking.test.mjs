import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const source = await readFile(new URL("../app/internal-linking.ts", import.meta.url), "utf8");

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

test("defines a link plan for every approved route", () => {
  for (const route of routes.filter((item) => !item.startsWith("/experiences/") && !item.startsWith("/events/"))) {
    assert.match(source, new RegExp(`path: "${route.replaceAll("/", "\\/")}"`), route);
  }
  assert.match(source, /export const experienceLinkPlans: PageLinkPlan\[\] = experiences\.map/);
  assert.match(source, /path: experience\.landingPath/);
  assert.match(source, /export const eventLinkPlans: PageLinkPlan\[\] = eventTypes\.map/);
  assert.match(source, /path: `\/events\/\$\{event\.slug\}`/);
  assert.match(source, /missingRoutes: primaryRoutes\.filter/);
});

test("defines required hub and conversion destinations", () => {
  for (const href of [
    'href: "/experiences"',
    'href: "/events"',
    'href: "/gallery"',
    'href: "/inquire"',
    'href: "/faq"',
  ]) assert.match(source, new RegExp(href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), href);
  assert.match(source, /label: "complementary experience destinations", count: 2/);
  assert.match(source, /label: "relevant event destinations", count: 4/);
});

test("uses contextual anchor rules instead of generic link language", () => {
  assert.match(source, /concise, descriptive anchor text/);
  assert.match(source, /Avoid generic anchors such as click here, read more, learn more, or website/);
  assert.match(source, /Use crawlable HTML anchor elements with resolvable href values/);
  assert.doesNotMatch(source, /anchor: "Click here"|anchor: "Learn more"|anchor: "Read more"/i);
});

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("internal-linking", `${process.pid}-${Date.now()}`);
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

function region(html, element) {
  return html.match(new RegExp(`<${element}\\b[^>]*>([\\s\\S]*?)<\\/${element}>`, "i"))?.[1] ?? "";
}

function anchorText(value) {
  return value
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replace(/[↗↓→]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function anchors(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi)].map(
    ([, href, content]) => ({ href, text: anchorText(content) }),
  );
}

test("rendered contextual links use clear anchors and valid crawlable destinations", async () => {
  const worker = await loadWorker();
  const knownRoutes = new Set(routes);
  const genericAnchors = new Set([
    "click here",
    "read more",
    "learn more",
    "more",
    "details",
    "explore",
    "view",
    "explore the experience",
    "explore this experience",
    "explore the gallery",
    "review all booking questions",
  ]);

  for (const path of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const main = region(html, "main");

    for (const anchor of anchors(main)) {
      assert.ok(anchor.text, `${path} has an unlabelled link to ${anchor.href}`);
      assert.ok(
        !genericAnchors.has(anchor.text.toLowerCase()),
        `${path} uses the ambiguous anchor "${anchor.text}"`,
      );

      if (anchor.href.startsWith("/")) {
        assert.doesNotMatch(anchor.href, /\?/, `${path} has an unnecessary link parameter`);
        const destination = anchor.href.split("#")[0] || path;
        assert.ok(knownRoutes.has(destination), `${path} links to unknown route ${destination}`);

        if (anchor.href.includes("#") && destination === path) {
          const fragment = anchor.href.split("#")[1];
          assert.match(html, new RegExp(`\\bid="${fragment}"`), `${path} missing #${fragment}`);
        }
      }
    }
  }
});

test("hubs, event pages, experiences, FAQs, and gallery form the intended contextual graph", async () => {
  const worker = await loadWorker();
  const graph = new Map();

  for (const path of routes) {
    const html = await (await render(worker, path)).text();
    const mainLinks = new Set(
      anchors(region(html, "main"))
        .map(({ href }) => href.split("#")[0])
        .filter((href) => routes.includes(href)),
    );
    graph.set(path, mainLinks);

    const footerLinks = anchors(region(html, "footer")).filter(({ href }) =>
      href.startsWith("/"),
    );
    assert.ok(footerLinks.length <= 2, `${path} has excessive repetitive footer links`);
  }

  for (const hub of ["/", "/experiences", "/events"]) {
    assert.ok(graph.get(hub).has("/inquire"), `${hub} must link to inquiry`);
  }

  const experienceRoutes = routes.filter((path) => path.startsWith("/experiences/"));
  const eventRoutes = routes.filter((path) => path.startsWith("/events/"));

  for (const path of eventRoutes) {
    for (const experience of experienceRoutes) {
      assert.ok(graph.get(path).has(experience), `${path} must recommend ${experience}`);
    }
  }

  for (const path of experienceRoutes) {
    assert.ok(
      eventRoutes.filter((event) => graph.get(path).has(event)).length >= 3,
      `${path} needs relevant event use cases`,
    );
  }

  for (const experience of experienceRoutes) {
    assert.ok(graph.get("/faq").has(experience), `/faq must link to ${experience}`);
    assert.ok(graph.get("/gallery").has(experience), `/gallery must link to ${experience}`);
  }

  for (const event of eventRoutes) {
    assert.ok(graph.get("/gallery").has(event), `/gallery must link to ${event}`);
  }

  const inbound = new Map(routes.map((path) => [path, 0]));
  for (const [sourcePath, destinations] of graph) {
    for (const destination of destinations) {
      if (destination !== sourcePath) {
        inbound.set(destination, inbound.get(destination) + 1);
      }
    }
  }

  for (const path of routes.filter((route) => route !== "/")) {
    assert.ok(inbound.get(path) > 0, `${path} has no contextual inbound link`);
  }
});
