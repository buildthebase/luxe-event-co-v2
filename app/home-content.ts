import { eventTypes } from "./site-config";

const featuredEventSlugs = [
  "weddings",
  "private-events",
  "corporate-events",
  "brand-activations",
] as const;

export const featuredHomeEvents = featuredEventSlugs.map((slug, index) => {
  const event = eventTypes.find((item) => item.slug === slug)!;

  return {
    ...event,
    number: String(index + 1).padStart(2, "0"),
  };
});

export const homeEventImageGroups = [
  {
    id: "personal-gatherings",
    eventSlugs: ["weddings", "private-events"],
    tone: "dessert",
    label: "Personal celebrations",
    context: "Weddings and private gatherings shaped around their hosts",
    image: {
      id: "home-personal-gatherings",
      src: "/images/home/personal-celebrations.webp",
      alt: "A white coffee cart prepared for a personal celebration beneath greenery",
      width: 1220,
      height: 1340,
      sizes:
        "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 38vw",
      status: "approved",
      format: "webp",
    },
  },
  {
    id: "professional-gatherings",
    eventSlugs: ["corporate-events", "brand-activations"],
    tone: "coffee",
    label: "Professional occasions",
    context: "Corporate hospitality and brand experiences in context",
    image: {
      id: "home-professional-gatherings",
      src: "/images/home/professional-occasions.webp",
      alt: "Guests gathered in a bright reception space with lounge seating and floral tables",
      width: 788,
      height: 874,
      sizes:
        "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 38vw",
      status: "approved",
      format: "webp",
    },
  },
] as const;

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
    marker: "1st",
    markerLabel: "First",
    title: "The occasion comes first.",
    description:
      "Luxe begins with the event, audience, venue, and atmosphere before shaping the service around it.",
  },
  {
    marker: "∞",
    markerLabel: "Continuously connected",
    title: "The details stay connected.",
    description:
      "Menus, presentation, signage, service flow, and the physical setting are shaped as one cohesive guest experience.",
  },
  {
    marker: "⧉",
    markerLabel: "Composed layers",
    title: "The experience feels thoughtful.",
    description:
      "Professional service, setup, teardown, and event-day hospitality are built into the way Luxe works.",
  },
] as const;

export const homeTestimonialPlaceholders = [
  {
    quote:
      "The service felt cohesive from the first planning conversation through the final guest interaction.",
    context: "Wedding client",
  },
  {
    quote:
      "Every detail felt connected—the presentation, the hospitality, and the way the room came together.",
    context: "Corporate event partner",
  },
  {
    quote:
      "Luxe made several moving pieces feel like one calm, cohesive experience.",
    context: "Private event host",
  },
  {
    quote:
      "The team understood the room immediately and shaped the service around how our guests would move through it.",
    context: "Venue partner",
  },
  {
    quote:
      "From the first pour to the final detail, the experience felt polished, personal, and easy for our team.",
    context: "Brand activation client",
  },
  {
    quote:
      "Coffee, dessert, and the setting each had their own moment, yet everything still felt beautifully connected.",
    context: "Celebration host",
  },
] as const;

export const homeImageSlots = [
  {
    id: "occasion-in-context",
    label: "The whole occasion",
    context: "Hospitality, presentation, and the surrounding space brought together as one experience.",
    tone: "seating",
    image: {
      id: "home-occasion-in-context",
      src: "/images/home/work-in-context.webp",
      alt: "A Luxe coffee bar arranged with branded cups and pastries in an arched room",
      width: 2400,
      height: 1351,
      sizes: "(max-width: 700px) calc(100vw - 40px), 88vw",
      status: "approved",
      format: "webp",
    },
  },
] as const;

export const homeWorkingImage = {
  id: "cohesive-service",
  label: "Connected from beginning to end",
  context: "The details remain aligned through planning, service, and delivery.",
  tone: "combined",
  image: {
    id: "home-cohesive-service",
    src: "/images/home/working-with-luxe.webp",
    alt: "A rabbit character presenting a personalized iced drink at a themed event",
    width: 768,
    height: 1064,
    sizes:
      "(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 42vw",
    status: "approved",
    format: "webp",
  },
} as const;

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
