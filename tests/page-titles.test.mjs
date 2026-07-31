import assert from "node:assert/strict";
import test from "node:test";
import { loadWorker, render } from "./test-worker.mjs";

const pages = [
  ["/", "Luxury Event Experiences in Toronto | Luxe Event Co.", "Luxury events, gathered."],
  ["/experiences", "Coffee, Dessert & Seating Experiences | Luxe Event Co.", "Coffee, dessert, and seating. Distinct by design."],
  ["/experiences/coffee-bar", "Mobile Coffee Bar in Toronto | Luxe Coffee Bar", "A mobile coffee bar, made for the gathering."],
  ["/experiences/sweet-cart", "Dessert Cart Experiences in Toronto | Luxe Sweet Cart", "A dessert cart experience, made in the moment."],
  ["/experiences/seating-rentals", "Event & Seating Rentals in Toronto | Luxe Seating Rentals", "Event and seating rentals, shaped around the occasion."],
  ["/events", "Event Experiences by Occasion | Luxe Event Co.", "Event experiences, shaped by the occasion."],
  ["/events/weddings", "Wedding Coffee, Dessert & Rentals | Luxe Event Co.", "Wedding coffee, dessert, and rentals, woven through the day."],
  ["/events/corporate-events", "Corporate Coffee & Event Experiences | Luxe Event Co.", "Corporate coffee and event experiences, ready for business."],
  ["/events/brand-activations", "Branded Coffee Carts & Activations | Luxe Event Co.", "Branded coffee carts that make the brand tangible."],
  ["/events/baby-showers", "Baby Shower Coffee, Dessert & Rentals | Luxe Event Co.", "Baby shower experiences, thoughtfully gathered."],
  ["/events/bridal-showers", "Bridal Shower Coffee, Dessert & Rentals | Luxe Event Co.", "Bridal shower experiences with their own point of view."],
  ["/events/birthdays", "Birthday Dessert & Coffee Experiences | Luxe Event Co.", "Birthday dessert and coffee, made for the milestone."],
  ["/events/private-events", "Private Event Coffee, Dessert & Rentals | Luxe Event Co.", "Private event experiences without a standard format."],
  ["/gallery", "Event Experience Gallery | Luxe Event Co.", "Luxe event experiences, explored by the moments they can serve."],
  ["/faq", "Event Planning & Booking FAQs | Luxe Event Co.", "Event planning and booking answers, before the proposal begins."],
  ["/inquire", "Plan Your Event Experience | Luxe Event Co.", "Plan your Luxe event experience."],
];

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", "\"")
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'");
}

test("every approved page has one unique, descriptive, naturally branded title", async () => {
  const worker = await loadWorker();
  const renderedTitles = [];

  for (const [path, expectedTitle] of pages) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    const matches = [...html.matchAll(/<title>(.*?)<\/title>/gi)];

    assert.equal(matches.length, 1, `${path} must have exactly one title`);
    const title = decodeHtml(matches[0][1]);
    assert.equal(title, expectedTitle, path);
    assert.match(title, /\bLuxe(?: Event Co\.| Coffee Bar| Sweet Cart| Seating Rentals)/, path);
    assert.doesNotMatch(title, /^(Home|Services|Page)\b/i, path);
    renderedTitles.push(title.toLowerCase());
  }

  assert.equal(new Set(renderedTitles).size, pages.length);
});

test("each title and visible H1 reinforce the same primary page topic", async () => {
  const worker = await loadWorker();

  for (const [path, , expectedHeading] of pages) {
    const response = await render(worker, path);
    const html = await response.text();
    const matches = [...html.matchAll(/<h1\b[^>]*aria-label="([^"]+)"[^>]*>/gi)];

    assert.equal(matches.length, 1, `${path} must have exactly one primary H1`);
    assert.equal(decodeHtml(matches[0][1]), expectedHeading, path);
  }
});
