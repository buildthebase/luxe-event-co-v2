import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { render } from "./test-worker.mjs";

test("server-renders the Luxe Event Co. coming-soon Home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Luxury Event Experiences in Toronto \| Luxe Event Co\.<\/title>/i,
  );
  assert.match(html, /rel="canonical" href="https:\/\/luxeeventco\.ca\/?"/);
  assert.match(html, /name="robots" content="index, follow"/);
  assert.match(html, /Full website/);
  assert.match(html, /coming soon/);
  assert.match(html, /Toronto, Canada/);
  assert.match(html, /Crafted coffee, elevated desserts, and elegant seating/);
  assert.match(html, /Luxe Coffee Bar/);
  assert.match(html, /Luxe Sweet Cart/);
  assert.match(html, /Luxe Seating Rentals/);
  assert.doesNotMatch(html, /Plan Your Event/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("coming-soon Home links only to the three public Instagram destinations", async () => {
  const html = await (await render()).text();

  for (const href of [
    "https://www.instagram.com/luxecoffeebar.to/",
    "https://www.instagram.com/luxesweet.cart/",
    "https://www.instagram.com/luxeseatingrentals",
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }

  assert.doesNotMatch(html, /href="\/experiences"/);
  assert.doesNotMatch(html, /href="\/events"/);
});

test("coming-soon Home withholds in-progress proof and testimonials", async () => {
  const html = await (await render()).text();

  assert.doesNotMatch(html, /Approved client quotation|Final quotations will be published/);
  assert.doesNotMatch(html, /OPTrust|CST Savings|Convergint|ICNA Canada|Waste Connections of Canada/);
});

test("includes each brand's Instagram destination", async () => {
  const html = await (await render()).text();

  assert.match(html, /https:\/\/www\.instagram\.com\/luxecoffeebar\.to\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxesweet\.cart\//);
  assert.match(html, /https:\/\/www\.instagram\.com\/luxeseatingrentals/);
});

test("serves crawl discovery metadata", async () => {
  const robotsResponse = await render("/robots.txt");
  const robots = await robotsResponse.text();
  assert.equal(robotsResponse.status, 200);
  assert.match(robots, /User-Agent: \*/i);
  assert.match(robots, /Allow: \//i);
  assert.match(robots, /Sitemap: https:\/\/luxeeventco\.ca\/sitemap\.xml/i);

  const sitemapResponse = await render("/sitemap.xml");
  const sitemap = await sitemapResponse.text();
  assert.equal(sitemapResponse.status, 200);
  assert.match(sitemap, /<loc>https:\/\/luxeeventco\.ca\/<\/loc>/);

  const manifestResponse = await render("/manifest.webmanifest");
  const manifest = await manifestResponse.json();
  assert.equal(manifestResponse.status, 200);
  assert.equal(manifest.name, "Luxe Event Co.");
  assert.equal(manifest.start_url, "/");
});

test("serves every permanent route from the overview", async () => {
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

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, route);
  }
});

test("server-renders the Phase 2 signature modules without unapproved proof", async () => {
  const experiencesHtml = await (await render("/experiences")).text();
  assert.match(experiencesHtml, /Choose where the experience begins\./);
  assert.match(experiencesHtml, /Coffee Bar \+ Sweet Cart/);
  assert.match(experiencesHtml, /Choose the occasion\./);
  assert.match(experiencesHtml, /Bring the experiences together\./);
  assert.match(experiencesHtml, /href="\/experiences\/coffee-bar"/);
  assert.match(experiencesHtml, /href="\/events\/bridal-showers"/);

  const corporateHtml = await (await render("/events/corporate-events")).text();
  assert.match(corporateHtml, /Discuss a corporate event\./);
  assert.match(corporateHtml, /OPTrust|CST Savings|Convergint|ICNA Canada|Waste Connections/);

  const activationHtml = await (await render("/events/brand-activations")).text();
  assert.match(activationHtml, /Create a branded experience\./);
  assert.match(activationHtml, /OPTrust|CST Savings|Convergint|ICNA Canada|Waste Connections/);
});

test("keeps customer-facing pages free of internal division terminology", async () => {
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

  for (const route of routes) {
    const html = await (await render(route)).text();
    const main = html.match(/<main\b[\s\S]*?<\/main>/i)?.[0] ?? "";
    const visibleMain = main.replace(/<script\b[\s\S]*?<\/script>/gi, "");

    assert.doesNotMatch(visibleMain, /\bdivisions?\b/i, route);
  }
});

test("server-renders the complete Events Hub blueprint and structured list", async () => {
  const response = await render("/events");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Event Experiences by Occasion \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Event experiences, shaped by the occasion\./);
  assert.match(html, /The event comes first\./);
  assert.match(html, /Find Your Event Experience/);
  assert.doesNotMatch(html, /Recommended by occasion/);
  assert.doesNotMatch(html, /These are planning directions, not fixed packages/);

  for (const event of [
    "Weddings",
    "Corporate Events",
    "Brand Activations",
    "Baby Showers",
    "Bridal Showers",
    "Birthdays",
    "Private Events",
  ]) {
    assert.match(html, new RegExp(`>${event}<`), event);
  }

  for (const href of [
    "/events/weddings",
    "/events/corporate-events",
    "/events/brand-activations",
    "/events/baby-showers",
    "/events/bridal-showers",
    "/events/birthdays",
    "/events/private-events",
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/gallery",
    "/faq",
    "/inquire",
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }

  assert.match(html, /"CollectionPage"/);
  assert.match(html, /"WebPage"/);
  assert.match(html, /"ItemList"/);
  assert.match(html, /"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
});

test("server-renders the complete Weddings blueprint without Event schema", async () => {
  const response = await render("/events/weddings");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Wedding Coffee, Dessert &amp; Rentals \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Wedding coffee, dessert, and rentals, woven through the day\./);
  assert.match(html, /Plan Your Wedding Experience/);
  assert.match(html, /Cocktail hour/);
  assert.match(html, /The morning after/);
  assert.doesNotMatch(html, /30% non-refundable retainer/);
  assert.match(html, /href="\/faq"/);
  assert.match(html, /\$5 million liability insurance/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
});

test("server-renders the complete Corporate Events blueprint and approved proof", async () => {
  const response = await render("/events/corporate-events");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Corporate Coffee &amp; Event Experiences \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Corporate coffee and event experiences, ready for business\./);
  assert.match(html, /Discuss a Corporate Event/);
  assert.match(html, /Office pop-up cafés/);
  assert.match(html, /Real estate and developer events/);
  assert.match(html, /Institutional and university events/);
  assert.match(html, /Up to three coffee setups and up to three dessert setups/);
  assert.match(html, /Multi-day requests require operating confirmation/);
  assert.match(html, /Recurring programs require operating confirmation/);
  assert.match(html, /Coffee can typically support up to 500 guests and dessert up to 400 guests/);
  assert.match(html, /\$5 million liability insurance/);

  for (const organization of [
    "OPTrust",
    "CST Savings",
    "Convergint",
    "ICNA Canada",
    "Waste Connections of Canada",
  ]) {
    assert.match(html, new RegExp(organization), organization);
  }

  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the complete Brand Activations blueprint with qualified scale claims", async () => {
  const response = await render("/events/brand-activations");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Branded Coffee Carts &amp; Activations \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Branded coffee carts that make the brand tangible\./);
  assert.match(html, /Create a Branded Experience/);
  assert.match(html, /Custom-branded cups/);
  assert.match(html, /Brand-colour alignment/);
  assert.match(html, /Retail activations/);
  assert.match(html, /Designed to work in the room and in the frame/);
  assert.match(html, /Multi-day campaign requests require operating confirmation/);
  assert.match(html, /Multi-day and multiple-location campaigns can be reviewed/);
  assert.match(html, /No universal lead time is published/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the complete Baby Showers blueprint without Event schema", async () => {
  const response = await render("/events/baby-showers");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Baby Shower Coffee, Dessert &amp; Rentals \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Baby shower experiences,/);
  assert.match(html, /thoughtfully gathered\./);
  assert.match(html, /Plan a Baby Shower/);
  assert.match(html, /Coffee and matcha/);
  assert.match(html, /Live dessert/);
  assert.match(html, /Seating and rentals/);
  assert.match(html, /Indoor gatherings/);
  assert.match(html, /Outdoor gatherings/);
  assert.match(html, /Can Luxe support an outdoor baby shower\?/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the complete Bridal Showers blueprint without Event schema", async () => {
  const response = await render("/events/bridal-showers");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Bridal Shower Coffee, Dessert &amp; Rentals \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Bridal shower experiences/);
  assert.match(html, /with their own point of view\./);
  assert.match(html, /Plan a Bridal Shower/);
  assert.match(html, /Café-style coffee service/);
  assert.match(html, /Matcha and specialty beverages/);
  assert.match(html, /Floral styling/);
  assert.match(html, /For hosts and planners\./);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the complete Birthdays blueprint without Event schema", async () => {
  const response = await render("/events/birthdays");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Birthday Dessert &amp; Coffee Experiences \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Birthday dessert and coffee,/);
  assert.match(html, /made for the milestone\./);
  assert.match(html, /Plan a Birthday Experience/);
  assert.match(html, /Milestone birthdays/);
  assert.match(html, /Adult celebrations/);
  assert.match(html, /Children’s events/);
  assert.match(html, /Coffee and non-coffee menus/);
  assert.match(html, /Custom signage/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the complete Private Events blueprint without Event schema", async () => {
  const response = await render("/events/private-events");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Private Event Coffee, Dessert &amp; Rentals \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Private event experiences/);
  assert.match(html, /without a standard format\./);
  assert.match(html, /Discuss Your Event/);
  assert.match(html, /Engagement parties/);
  assert.match(html, /Religious and cultural celebrations/);
  assert.match(html, /Holiday gatherings/);
  assert.match(html, /Coffee and non-coffee possibilities/);
  assert.match(html, /Private-event planning questions\./);
  assert.match(html, /\$5 million/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.doesNotMatch(html, /"@type":"Event"/);
  assert.doesNotMatch(html, /Hamilton/);
});

test("server-renders the grouped Gallery blueprint with canonical-safe filters", async () => {
  const response = await render("/gallery");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Event Experience Gallery \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Luxe event experiences,/);
  assert.match(html, /explored by the moments they can serve\./);
  assert.match(html, /Start Planning Your Event/);
  assert.match(html, /Coffee through the wedding day/);
  assert.match(html, /A brand guests can taste/);
  assert.match(html, /Dessert as part of the setting/);
  assert.match(html, /The room before guests arrive/);
  assert.match(html, /One occasion, several Luxe experiences/);
  assert.doesNotMatch(html, /Luxe event study/);
  assert.doesNotMatch(html, /class="gallery-group-media"/);
  assert.match(html, /aria-label="Filter gallery groups"/);
  assert.match(html, /"@type":\["CollectionPage","WebPage"\]/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  const galleryJsonLd = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  )?.[1];
  assert.ok(galleryJsonLd);
  assert.doesNotMatch(galleryJsonLd, /"@type":"ImageObject"/);
  assert.doesNotMatch(html, /[?&]filter=/);
});

test("server-renders the complete factual FAQ and matching FAQPage schema", async () => {
  const response = await render("/faq");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Event Planning &amp; Booking FAQs \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Event planning and booking answers,/);
  assert.match(html, /before the proposal begins\./);
  assert.match(html, /Ask About Your Event/);
  assert.match(html, /General Booking/);
  assert.match(html, /Travel and Service Area/);
  assert.match(html, /Setup and Logistics/);
  assert.match(html, /Which payment methods are accepted\?/);
  assert.doesNotMatch(html, /How many drinks can be served per hour\?/);
  assert.match(html, /26(?:<!-- -->)? answers/);
  assert.match(html, /\$5 million in liability insurance/);
  assert.doesNotMatch(html, /Hamilton/);

  const faqJsonLd = html.match(
    /<script type="application\/ld\+json">([^<]+)<\/script>/,
  )?.[1];
  assert.ok(faqJsonLd);
  const faqGraph = JSON.parse(faqJsonLd);
  const faqPage = faqGraph["@graph"].find(
    (item) => Array.isArray(item["@type"]) && item["@type"].includes("FAQPage"),
  );
  assert.ok(faqPage);
  assert.equal(faqPage.mainEntity.length, 26);
  assert.equal(faqPage.mainEntity[0].name, "What packages are available?");
  assert.match(faqPage.mainEntity[0].acceptedAnswer.text, /Café Cart Experience/);
  assert.ok(
    faqGraph["@graph"].some(
      (item) => Array.isArray(item["@type"]) && item["@type"].includes("WebPage"),
    ),
  );
  assert.ok(faqGraph["@graph"].some((item) => item["@type"] === "BreadcrumbList"));
});

test("server-renders the complete inquiry preparation and contact handoff", async () => {
  const response = await render("/inquire");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Plan Your Event Experience \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Plan your Luxe/);
  assert.match(html, /event experience\./);
  assert.match(html, /Begin Your Inquiry/);
  assert.match(html, /One experience, or a connected composition\./);
  assert.match(html, /What to have ready\./);
  assert.match(html, /Normally within 24 hours\./);
  assert.match(html, /approximately 30 guests/);
  assert.match(html, /bookings@luxeeventco\.ca/);
  assert.match(html, /\+1 647-869-1352/);
  assert.match(html, /does not collect or store event details/);
  assert.doesNotMatch(html, /Hamilton/);
  assert.match(html, /"@type":\["ContactPage","WebPage"\]/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"about":\{"@id":"https:\/\/luxeeventco\.ca\/#organization"\}/);
  assert.doesNotMatch(html, /"@type":"Organization"/);
  assert.doesNotMatch(html, /"@type":"ContactPoint"/);
  assert.doesNotMatch(html, /"@type":"Offer"/);
});

test("server-renders the complete Experiences Hub blueprint and structured list", async () => {
  const response = await render("/experiences");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Coffee, Dessert &amp; Seating Experiences \| Luxe Event Co\.<\/title>/i);
  assert.match(html, /Coffee, dessert, and seating\./);
  assert.match(html, /Distinct by design\./);
  assert.match(html, /Explore an Experience/);
  assert.match(html, /Can each experience be booked independently\?/);
  assert.match(
    html,
    /Can coffee, dessert, and rentals be coordinated through one provider\?/,
  );
  assert.match(html, /A café experience, composed for the event\./);
  assert.match(html, /Dessert prepared in the room, not delivered to the edge of it\./);
  assert.match(html, /The setting that gives the gathering its shape\./);
  assert.match(html, /Up to 500/);
  assert.match(html, /Up to 400/);
  assert.match(html, /Room first/);
  assert.match(html, /"CollectionPage"/);
  assert.match(html, /"WebPage"/);
  assert.match(html, /"ItemList"/);
  assert.match(html, /"BreadcrumbList"/);

  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
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
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }
});

test("server-renders the complete Coffee Bar blueprint and visible FAQ schema", async () => {
  const response = await render("/experiences/coffee-bar");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Mobile Coffee Bar in Toronto \| Luxe Coffee Bar<\/title>/i);
  assert.match(html, /A mobile coffee bar, made for the gathering\./);
  assert.match(html, /Inquire About Coffee Service/);
  assert.match(html, /Luxe Café Cart Experience/);
  assert.match(html, /Luxe Signature Coffee Bar Experience/);
  assert.match(html, /Professional barista service/);
  assert.match(html, /Hot and iced beverages/);
  assert.match(html, /Ceremonial Matcha Latte/);
  assert.match(html, /Dairy and premium milk alternatives/);
  assert.match(html, /Up to 500/);
  assert.match(html, /\$5M/);
  assert.match(html, /What space, power, or water access is required\?/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"provider":\{"@id":"https:\/\/luxeeventco\.ca\/#organization"\}/);

  for (const href of [
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
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
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }

  assert.doesNotMatch(html, /Future content for this division/);
});

test("server-renders the complete Sweet Cart blueprint and visible FAQ schema", async () => {
  const response = await render("/experiences/sweet-cart");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Dessert Cart Experiences in Toronto \| Luxe Sweet Cart<\/title>/i);
  assert.match(html, /A dessert cart experience,/);
  assert.match(html, /in the moment\./);
  assert.match(html, /Inquire About a Dessert Experience/);
  assert.match(html, /The Classic Collection/);
  assert.match(html, /The Signature Collection/);
  assert.match(html, /Mini Dutch Pancakes/);
  assert.match(html, /Belgian Waffles on a Stick/);
  assert.match(html, /Mini Donuts/);
  assert.match(html, /Soft Serve Ice Cream/);
  assert.match(html, /Fresh desserts prepared on-site/);
  assert.match(html, /Belgian Milk Chocolate/);
  assert.match(html, /Lotus Biscoff Cookies/);
  assert.match(html, /Crushed Pistachios/);
  assert.match(html, /Up to 400/);
  assert.match(html, /\$5M/);
  assert.match(html, /Can multiple dessert types be combined\?/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /"provider":\{"@id":"https:\/\/luxeeventco\.ca\/#organization"\}/);

  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/seating-rentals",
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
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }

  assert.doesNotMatch(html, /Future content for this division/);
});

test("server-renders the complete Seating Rentals blueprint without commerce schema", async () => {
  const response = await render("/experiences/seating-rentals");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /<title>Event &amp; Seating Rentals in Toronto \| Luxe Seating Rentals<\/title>/i);
  assert.match(html, /Event and seating rentals,/);
  assert.match(html, /shaped around the occasion\./);
  assert.match(html, /Discuss Your Rental Requirements/);
  assert.match(html, /Chairs/);
  assert.match(html, /Tables/);
  assert.match(html, /Cocktail Tables/);
  assert.match(html, /Tents/);
  assert.match(html, /Linens/);
  assert.match(html, /Lighting/);
  assert.match(html, /Inventory schedule required before final production copy/);
  assert.match(html, /Delivery, setup, and teardown/);
  assert.match(html, /Indoor and outdoor applications/);
  assert.match(html, /Can rentals be combined with coffee or dessert\?/);
  assert.match(html, /What information is required for a rental quote\?/);
  assert.match(html, /\$5M/);
  assert.match(html, /"@type":"Service"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"@type":"BreadcrumbList"/);
  assert.match(html, /"provider":\{"@id":"https:\/\/luxeeventco\.ca\/#organization"\}/);
  assert.doesNotMatch(html, /"@type":"Product"/);
  assert.doesNotMatch(html, /"@type":"Offer"/);
  assert.doesNotMatch(html, /"@type":"FAQPage"/);

  for (const href of [
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/events/weddings",
    "/events/corporate-events",
    "/events/brand-activations",
    "/events/baby-showers",
    "/events/bridal-showers",
    "/events/birthdays",
    "/events/private-events",
    "/gallery",
    "/inquire",
  ]) {
    assert.match(html, new RegExp(`href="${href}"`), href);
  }

  assert.doesNotMatch(html, /Future content for this division/);
});

test("keeps the optional llms.txt summary factual and nonessential", async () => {
  const llms = await readFile(new URL("../public/llms.txt", import.meta.url), "utf8");
  assert.match(llms, /^# Luxe Event Co\./);
  assert.match(llms, /https:\/\/luxeeventco\.ca/);
  assert.match(llms, /Luxe Coffee Bar/);
  assert.match(llms, /Luxe Sweet Cart/);
  assert.match(llms, /Luxe Seating Rentals/);
  assert.match(llms, /https:\/\/luxeeventco\.ca\/inquire/);
  assert.match(llms, /\$5 million in liability insurance/);
  assert.doesNotMatch(llms, /coming soon/i);
});
