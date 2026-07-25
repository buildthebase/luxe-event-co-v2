import assert from "node:assert/strict";
import test from "node:test";

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

const experienceChildren = routes.filter((route) =>
  route.startsWith("/experiences/"),
);
const eventChildren = routes.filter((route) => route.startsWith("/events/"));

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("site-structure", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

const environment = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const context = {
  waitUntil() {},
  passThroughOnException() {},
};

async function render(worker, path) {
  return worker.fetch(
    new Request(new URL(path, "http://localhost/"), {
      headers: { accept: "text/html" },
    }),
    environment,
    context,
  );
}

function internalRouteLinks(html) {
  return new Set(
    [...html.matchAll(/<a\b[^>]*\shref="(\/[^"#?]*)[^"]*"[^>]*>/gi)]
      .map((match) => match[1] || "/")
      .filter((href) => routes.includes(href)),
  );
}

test("all permanent routes form a crawlable, shallow link graph", async () => {
  const worker = await loadWorker();
  const graph = new Map();
  const inbound = new Map(routes.map((route) => [route, 0]));

  for (const route of routes) {
    const response = await render(worker, route);
    assert.equal(response.status, 200, route);
    const links = internalRouteLinks(await response.text());
    graph.set(route, links);

    for (const destination of links) {
      if (destination !== route) {
        inbound.set(destination, (inbound.get(destination) ?? 0) + 1);
      }
    }
  }

  for (const route of routes.filter((route) => route !== "/")) {
    assert.ok(inbound.get(route) > 0, `${route} must not be orphaned`);
  }

  const depths = new Map([["/", 0]]);
  const queue = ["/"];

  while (queue.length) {
    const current = queue.shift();
    const nextDepth = depths.get(current) + 1;

    for (const destination of graph.get(current) ?? []) {
      if (!depths.has(destination)) {
        depths.set(destination, nextDepth);
        queue.push(destination);
      }
    }
  }

  for (const route of routes) {
    assert.ok(depths.has(route), `${route} must be reachable from Home`);
    assert.ok(depths.get(route) <= 3, `${route} exceeds three meaningful link steps`);
  }
});

test("hubs and children link to one another through HTML anchors", async () => {
  const worker = await loadWorker();
  const experiencesHtml = await (await render(worker, "/experiences")).text();
  const eventsHtml = await (await render(worker, "/events")).text();

  for (const child of experienceChildren) {
    assert.match(experiencesHtml, new RegExp(`href="${child}"`), child);
    const childHtml = await (await render(worker, child)).text();
    assert.match(childHtml, /href="\/experiences"/, `${child} needs its hub link`);
  }

  for (const child of eventChildren) {
    assert.match(eventsHtml, new RegExp(`href="${child}"`), child);
    const childHtml = await (await render(worker, child)).text();
    assert.match(childHtml, /href="\/events"/, `${child} needs its hub link`);
  }
});

test("every non-home page renders a visible hierarchical breadcrumb", async () => {
  const worker = await loadWorker();

  for (const route of routes.filter((route) => route !== "/")) {
    const html = await (await render(worker, route)).text();
    const breadcrumb =
      html.match(/<nav\b[^>]*aria-label="Breadcrumb"[\s\S]*?<\/nav>/i)?.[0] ?? "";

    assert.ok(breadcrumb, `${route} needs a breadcrumb`);
    assert.match(breadcrumb, /href="\/"/, `${route} breadcrumb needs Home`);
    assert.match(breadcrumb, /aria-current="page"/, `${route} needs current-page state`);

    if (route.startsWith("/experiences/")) {
      assert.match(breadcrumb, /href="\/experiences"/, `${route} needs Experiences`);
    }

    if (route.startsWith("/events/")) {
      assert.match(breadcrumb, /href="\/events"/, `${route} needs Events`);
    }
  }
});
