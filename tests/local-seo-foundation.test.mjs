import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const localSeoSource = await readFile(
  new URL("../app/local-seo.ts", import.meta.url),
  "utf8",
);
const siteConfigSource = await readFile(
  new URL("../app/site-config.ts", import.meta.url),
  "utf8",
);
const schemaSource = await readFile(
  new URL("../app/schema-builders.ts", import.meta.url),
  "utf8",
);

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

const approvedCities = [
  "Toronto",
  "Markham",
  "Vaughan",
  "Richmond Hill",
  "Aurora",
  "Newmarket",
  "King City",
  "Thornhill",
  "North York",
  "Mississauga",
  "Brampton",
  "Oakville",
  "Burlington",
  "Milton",
  "Pickering",
  "Ajax",
  "Whitby",
  "Oshawa",
  "Scarborough",
  "Etobicoke",
];

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set(
    "local-seo-test",
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

function parseGraph(html) {
  const json = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  )?.[1];
  assert.ok(json);
  return JSON.parse(json)["@graph"];
}

test("defines one approved business identity for website and external surfaces", () => {
  for (const sourceReference of [
    "siteConfig.organization.publicName",
    "siteConfig.contact.phone",
    "siteConfig.contact.phoneDisplay",
    "siteConfig.contact.email",
    "siteConfig.url",
    "siteConfig.serviceAreas",
    "siteConfig.extendedServiceArea",
    "siteConfig.description",
  ]) {
    assert.match(localSeoSource, new RegExp(sourceReference.replaceAll(".", "\\.")));
  }

  assert.match(localSeoSource, /experiences\.map/);
  assert.match(localSeoSource, /socialProfile: experience\.instagram/);
  assert.match(schemaSource, /approvedBusinessIdentity\.businessName/);
  assert.match(schemaSource, /approvedBusinessIdentity\.email/);
  assert.match(schemaSource, /approvedBusinessIdentity\.phone/);
  assert.match(schemaSource, /approvedBusinessIdentity\.primaryServiceAreas/);
});

test("records a verification-gated service-area Business Profile strategy", () => {
  assert.match(localSeoSource, /status: "verification-required"/);
  assert.match(localSeoSource, /profileUrl: null/);
  assert.match(localSeoSource, /one Luxe Event Co\. service-area profile/);
  assert.match(localSeoSource, /Do not publish a residential address/);
  assert.match(localSeoSource, /hide the address/);
  assert.match(localSeoSource, /separate division profiles unless each independently meets/);
  assert.match(localSeoSource, /Primary and secondary categories/);
  assert.match(localSeoSource, /Actual operating base and eligibility/);
});

test("provides consistent UTM-tagged Profile destinations without changing canonicals", () => {
  for (const parameter of [
    'url.searchParams.set("utm_source"',
    'url.searchParams.set("utm_medium"',
    'url.searchParams.set("utm_campaign"',
    'url.searchParams.set("utm_content"',
  ]) {
    assert.ok(localSeoSource.includes(parameter), parameter);
  }
  assert.match(localSeoSource, /source: "google"/);
  assert.match(localSeoSource, /medium: "organic"/);
  assert.match(localSeoSource, /campaign: "gbp"/);
  assert.match(localSeoSource, /createLocalProfileUrl\("\/"/);
  assert.match(localSeoSource, /createLocalProfileUrl\(\s*"\/inquire"/);
});

test("does not claim unverified directory, corporate-material, or Profile updates", () => {
  assert.match(localSeoSource, /directories:[\s\S]*?status: "inventory-required"/);
  assert.match(localSeoSource, /records: \[\] as readonly string\[\]/);
  assert.match(localSeoSource, /corporateMaterials:[\s\S]*?status: "owner-review-required"/);
  assert.match(localSeoSource, /socialProfiles:[\s\S]*?status: "confirmed"/);
});

test("Home publishes the approved contact identity and Toronto/GTA market", async () => {
  const html = await (await render("/")).text();
  const graph = parseGraph(html);
  const organization = graph.find(
    (node) => node["@id"] === "https://luxeeventco.ca/#organization",
  );

  assert.equal(organization.name, "Luxe Event Co.");
  assert.equal(organization.url, "https://luxeeventco.ca");
  assert.equal(organization.telephone, "+16478691352");
  assert.equal(organization.email, "bookings@luxeeventco.ca");
  assert.match(html, /Toronto at the centre\. The GTA and Southern Ontario within reach\./);
  assert.match(html, /\+1 647-869-1352/);
  assert.match(html, /bookings@luxeeventco\.ca/);
  assert.match(siteConfigSource, /location: "Toronto, Canada"/);
});

test("the full municipality set appears only on useful service-area pages", async () => {
  const routesWithFullList = [];

  for (const route of routes) {
    const html = await (await render(route)).text();
    if (approvedCities.every((city) => html.includes(city))) {
      routesWithFullList.push(route);
    }
  }

  assert.deepEqual(routesWithFullList, [
    "/",
    "/experiences/seating-rentals",
    "/faq",
  ]);
});

test("the route architecture contains no thin or templated city pages", async () => {
  const sitemap = await (await render("/sitemap.xml")).text();
  const citySlugs = approvedCities.map((city) =>
    city.toLowerCase().replaceAll(" ", "-"),
  );

  for (const citySlug of citySlugs) {
    assert.doesNotMatch(sitemap, new RegExp(`<loc>[^<]+/${citySlug}/?</loc>`));
  }
  assert.match(localSeoSource, /currentLocationPages: \[\]/);
  assert.match(localSeoSource, /Do not create thin city pages, doorway pages/);
  for (const gate of [
    "Unique local event evidence",
    "Approved local photography",
    "First-hand venue or logistics knowledge",
    "Permissioned local testimonials or case studies",
    "A distinct and useful local searcher need",
  ]) {
    assert.match(localSeoSource, new RegExp(gate), gate);
  }
});
