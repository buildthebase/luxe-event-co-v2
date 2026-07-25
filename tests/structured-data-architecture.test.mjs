import assert from "node:assert/strict";
import test from "node:test";

const siteUrl = "https://luxeeventco.ca";

const breadcrumbLabels = {
  "/experiences": ["Home", "Experiences"],
  "/experiences/coffee-bar": ["Home", "Experiences", "Coffee Bar"],
  "/experiences/sweet-cart": ["Home", "Experiences", "Sweet Cart"],
  "/experiences/seating-rentals": ["Home", "Experiences", "Seating Rentals"],
  "/events": ["Home", "Events"],
  "/events/weddings": ["Home", "Events", "Weddings"],
  "/events/corporate-events": ["Home", "Events", "Corporate Events"],
  "/events/brand-activations": ["Home", "Events", "Brand Activations"],
  "/events/baby-showers": ["Home", "Events", "Baby Showers"],
  "/events/bridal-showers": ["Home", "Events", "Bridal Showers"],
  "/events/birthdays": ["Home", "Events", "Birthdays"],
  "/events/private-events": ["Home", "Events", "Private Events"],
  "/gallery": ["Home", "Gallery"],
  "/faq": ["Home", "FAQ"],
  "/inquire": ["Home", "Inquire"],
};

const routes = ["/", ...Object.keys(breadcrumbLabels)];
const experienceRoutes = [
  "/experiences/coffee-bar",
  "/experiences/sweet-cart",
  "/experiences/seating-rentals",
];
const eventRoutes = [
  "/events/weddings",
  "/events/corporate-events",
  "/events/brand-activations",
  "/events/baby-showers",
  "/events/bridal-showers",
  "/events/birthdays",
  "/events/private-events",
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "schema-test",
    `${process.pid}-${Date.now()}-${encodeURIComponent(path)}`,
  );
  const { default: worker } = await import(workerUrl.href);

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

function parseJsonLd(html) {
  return [...html.matchAll(
    /<script type="application\/ld\+json">([^<]+)<\/script>/g,
  )].map((match) => JSON.parse(match[1]));
}

function hasType(node, type) {
  return node?.["@type"] === type ||
    (Array.isArray(node?.["@type"]) && node["@type"].includes(type));
}

function graphFor(html) {
  const documents = parseJsonLd(html);
  assert.equal(documents.length, 1, "each template should emit one JSON-LD document");
  assert.equal(documents[0]["@context"], "https://schema.org");
  assert.ok(Array.isArray(documents[0]["@graph"]));
  return documents[0]["@graph"];
}

function visibleBreadcrumbLabels(html) {
  const nav = html.match(
    /<nav aria-label="Breadcrumb" class="page-breadcrumbs">([\s\S]*?)<\/nav>/,
  )?.[1];
  assert.ok(nav, "visible breadcrumb is present");

  return [...nav.matchAll(/<li>([\s\S]*?)<\/li>/g)].map((match) =>
    match[1]
      .replace(/<[^>]+>/g, "")
      .replaceAll("&amp;", "&")
      .replaceAll("&#x27;", "'")
      .trim()
  );
}

function assertNoUnsupportedClaims(graph, route) {
  const serialized = JSON.stringify(graph);
  for (const type of [
    "LocalBusiness",
    "Event",
    "Offer",
    "Product",
    "AggregateRating",
    "Review",
  ]) {
    assert.ok(
      !graph.some((node) => hasType(node, type)),
      `${route} must not use ${type}`,
    );
  }
  for (const property of [
    '"address":',
    '"openingHours":',
    '"openingHoursSpecification":',
    '"priceRange":',
    '"aggregateRating":',
    '"review":',
  ]) {
    assert.ok(!serialized.includes(property), `${route} must not emit ${property}`);
  }
  assert.ok(!serialized.includes("localhost"), `${route} uses only production URLs`);
}

test("every rendered page has valid, unique, claim-safe JSON-LD identifiers", async () => {
  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
    const graph = graphFor(await response.text());
    const ids = graph.map((node) => node["@id"]).filter(Boolean);

    assert.equal(new Set(ids).size, ids.length, `${route} has duplicate @id values`);
    for (const id of ids) {
      assert.ok(id.startsWith(siteUrl), `${route} has a non-canonical @id: ${id}`);
    }
    assertNoUnsupportedClaims(graph, route);
  }
});

test("Home owns the complete stable identity graph without overclaiming LocalBusiness", async () => {
  const graph = graphFor(await (await render("/")).text());
  const byId = new Map(graph.map((node) => [node["@id"], node]));
  const organization = byId.get(`${siteUrl}/#organization`);

  assert.ok(hasType(organization, "Organization"));
  assert.equal(organization.url, siteUrl);
  assert.equal(organization.email, "bookings@luxeeventco.ca");
  assert.equal(organization.telephone, "+16478691352");
  assert.equal(organization.sameAs, undefined);
  assert.equal(organization.department.length, 3);
  assert.ok(byId.has(`${siteUrl}/#website`));
  assert.ok(byId.has(`${siteUrl}/#logo`));
  assert.ok(byId.has(`${siteUrl}/#coffee-bar-service`));
  assert.ok(byId.has(`${siteUrl}/#sweet-cart-service`));
  assert.ok(byId.has(`${siteUrl}/#seating-rentals-service`));

  const divisions = [
    ["coffee-bar", "https://www.instagram.com/luxecoffeebar.to/"],
    ["sweet-cart", "https://www.instagram.com/luxesweet.cart/"],
    ["seating-rentals", "https://www.instagram.com/luxeseatingrentals"],
  ];
  for (const [slug, profile] of divisions) {
    const division = byId.get(`${siteUrl}/#${slug}-division`);
    assert.ok(hasType(division, "Organization"), slug);
    assert.deepEqual(division.sameAs, [profile], slug);
    assert.equal(division.parentOrganization["@id"], `${siteUrl}/#organization`);
  }
});

test("visible and JSON-LD breadcrumbs match on every non-home route", async () => {
  for (const [route, expectedLabels] of Object.entries(breadcrumbLabels)) {
    const html = await (await render(route)).text();
    const graph = graphFor(html);
    const breadcrumb = graph.find((node) => hasType(node, "BreadcrumbList"));

    assert.ok(breadcrumb, route);
    const schemaLabels = breadcrumb.itemListElement.map((item) => item.name);
    const schemaPositions = breadcrumb.itemListElement.map((item) => item.position);
    const schemaUrls = breadcrumb.itemListElement.map((item) => item.item);

    assert.deepEqual(schemaLabels, expectedLabels, `${route} schema labels`);
    assert.deepEqual(visibleBreadcrumbLabels(html), expectedLabels, `${route} visible labels`);
    assert.deepEqual(
      schemaPositions,
      expectedLabels.map((_, index) => index + 1),
      `${route} positions`,
    );
    assert.ok(schemaUrls.every((url) => url.startsWith(siteUrl)), route);
  }
});

test("hub, service, event-type, gallery, FAQ, and inquiry templates use intended types", async () => {
  for (const route of ["/experiences", "/events"]) {
    const graph = graphFor(await (await render(route)).text());
    assert.ok(
      graph.some(
        (node) => hasType(node, "CollectionPage") && hasType(node, "WebPage"),
      ),
      route,
    );
    assert.ok(graph.some((node) => hasType(node, "ItemList")), route);
  }

  for (const route of [...experienceRoutes, ...eventRoutes]) {
    const graph = graphFor(await (await render(route)).text());
    const service = graph.find((node) => hasType(node, "Service"));
    assert.ok(service, route);
    assert.equal(service.provider["@id"], `${siteUrl}/#organization`, route);
    assert.equal(service.image, undefined, `${route} has no unapproved service image`);
    assert.ok(graph.some((node) => hasType(node, "WebPage")), route);
  }

  const galleryGraph = graphFor(await (await render("/gallery")).text());
  assert.ok(
    galleryGraph.some(
      (node) => hasType(node, "CollectionPage") && hasType(node, "WebPage"),
    ),
  );

  const faqHtml = await (await render("/faq")).text();
  const faqGraph = graphFor(faqHtml);
  const faqPage = faqGraph.find(
    (node) => hasType(node, "FAQPage") && hasType(node, "WebPage"),
  );
  assert.equal(faqPage.mainEntity.length, 47);
  for (const question of faqPage.mainEntity) {
    assert.ok(faqHtml.includes(question.name), question.name);
    assert.equal(question.acceptedAnswer["@type"], "Answer");
  }

  const inquireGraph = graphFor(await (await render("/inquire")).text());
  assert.ok(
    inquireGraph.some(
      (node) => hasType(node, "ContactPage") && hasType(node, "WebPage"),
    ),
  );
  assert.ok(!inquireGraph.some((node) => hasType(node, "Organization")));
});
