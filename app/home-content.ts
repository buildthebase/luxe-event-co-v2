import { eventTypes } from "./site-config";

const featuredEventSlugs = [
  "weddings",
  "corporate-events",
  "brand-activations",
  "private-events",
] as const;

export const featuredHomeEvents = featuredEventSlugs.map((slug, index) => {
  const event = eventTypes.find((item) => item.slug === slug)!;

  return {
    ...event,
    number: String(index + 1).padStart(2, "0"),
  };
});

export const homeProofPoints = [
  {
    value: "$5M",
    label: "liability insurance",
    detail: "A meaningful layer of assurance for venues, planners, and corporate teams.",
  },
  {
    value: "500",
    label: "guest coffee capacity",
    detail: "Coffee service can be planned for intimate gatherings through large-format events.",
  },
  {
    value: "03",
    label: "simultaneous setups",
    detail: "Confirmed coffee and dessert setup capacity supports multi-event and larger programs.",
  },
] as const;

export const homeWorkingPrinciples = [
  {
    number: "01",
    title: "The occasion comes first.",
    description:
      "Luxe begins with the event, audience, venue, and atmosphere before shaping the service around it.",
  },
  {
    number: "02",
    title: "The details stay connected.",
    description:
      "Menus, presentation, signage, service flow, and the physical setting are considered as one guest experience.",
  },
  {
    number: "03",
    title: "The execution feels composed.",
    description:
      "Professional service, setup, teardown, and event-day hospitality are built into the way Luxe works.",
  },
] as const;

export const homeImageSlots = [
  {
    id: "coffee-service",
    label: "Coffee in motion",
    context: "Barista service, crafted drinks, and guest interaction",
    tone: "coffee",
  },
  {
    id: "dessert-detail",
    label: "Dessert as a moment",
    context: "Fresh preparation, presentation, and cart styling",
    tone: "dessert",
  },
  {
    id: "room-setting",
    label: "The room around it",
    context: "Seating, structure, and considered event atmosphere",
    tone: "seating",
  },
] as const;

export const homeTestimonialSlots = [
  {
    context: "Wedding perspective",
    requirement: "Approved client quotation with event and venue context",
  },
  {
    context: "Corporate perspective",
    requirement: "Approved client quotation with organization and activation context",
  },
] as const;

export const homeServiceAreaGroups = [
  {
    label: "Toronto & districts",
    places: ["Toronto", "North York", "Scarborough", "Etobicoke"],
  },
  {
    label: "York & North GTA",
    places: [
      "Markham",
      "Vaughan",
      "Richmond Hill",
      "Aurora",
      "Newmarket",
      "King City",
      "Thornhill",
    ],
  },
  {
    label: "West GTA",
    places: ["Mississauga", "Brampton", "Oakville", "Burlington", "Milton"],
  },
  {
    label: "East GTA",
    places: ["Pickering", "Ajax", "Whitby", "Oshawa"],
  },
  {
    label: "Regional",
    places: [
      "Greater Toronto Area (GTA)",
      "Southern Ontario (for larger events)",
    ],
  },
] as const;
