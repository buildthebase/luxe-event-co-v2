import { approvedBusinessIdentity } from "../local-seo";

export const rentalCategories = [
  {
    id: "chairs",
    number: "01",
    name: "Chairs",
    role: "Comfort, proportion, and placement",
    description:
      "Chair selections are planned around the ceremony or dining format, guest count, floor plan, and visual direction. Styles, quantities, finishes, and availability are confirmed for the event date.",
  },
  {
    id: "tables",
    number: "02",
    name: "Tables",
    role: "Structure for dining, service, and display",
    description:
      "Dining, cocktail, display, and service tables are selected according to the guest count, room dimensions, service needs, and event flow. Sizes and quantities are confirmed within the final layout.",
  },
  {
    id: "cocktail-tables",
    number: "03",
    name: "Cocktail Tables",
    role: "Natural gathering points",
    description:
      "Cocktail tables create places for guests to gather and connect without interrupting movement through the room. They are well suited to receptions, networking events, brand activations, and transitional moments.",
  },
  {
    id: "tents",
    number: "04",
    name: "Tents",
    role: "Shelter planned for the setting",
    description:
      "Tent requirements are considered around the guest count, site access, ground conditions, event layout, weather planning, and venue requirements. Final specifications depend on the location and installation needs.",
  },
  {
    id: "linens",
    number: "05",
    name: "Linens",
    role: "Colour, texture, and finish",
    description:
      "Linens bring cohesion to dining tables, cocktail tables, and service areas. Available sizes, materials, colours, and quantities are confirmed with the final rental selection.",
  },
  {
    id: "lighting",
    number: "06",
    name: "Lighting",
    role: "Atmosphere, visibility, and focus",
    description:
      "Lighting helps shape the mood of the room while supporting visibility, service areas, and key focal points. Fixture options, power access, installation requirements, and availability are confirmed during planning.",
  },
] as const;

export const layoutStudies = [
  {
    number: "01",
    title: "Ceremony geometry",
    description:
      "Consider aisle width, chair alignment, sightlines, accessibility, and the transition from ceremony to the next part of the event.",
    tone: "ceremony",
  },
  {
    number: "02",
    title: "Reception flow",
    description:
      "Balance dining, service, speeches, entertainment, and circulation so the room remains composed when every seat is occupied.",
    tone: "reception",
  },
  {
    number: "03",
    title: "Standing social rhythm",
    description:
      "Use cocktail-height moments and open pathways to support arrivals, networking, brand activations, and informal guest movement.",
    tone: "social",
  },
] as const;

export const rentalOperations = [
  {
    number: "01",
    title: "Delivery",
    status: "Planned for the venue",
    description:
      "Delivery availability, timing, loading access, travel requirements, and applicable fees are confirmed for the venue and rental order.",
  },
  {
    number: "02",
    title: "Setup",
    status: "Defined within the proposal",
    description:
      "Where setup is included, the scope is planned around the rental items, quantities, floor plan, venue access, and event schedule.",
  },
  {
    number: "03",
    title: "Teardown and pickup",
    status: "Confirmed before the event",
    description:
      "Pickup timing, after-hours access, teardown responsibilities, and venue requirements are confirmed as part of the final rental plan.",
  },
] as const;

export const rentalEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Ceremony seating, reception layouts, cocktail moments, tents, linens, and lighting.",
  },
  {
    href: "/events/corporate-events",
    label: "Corporate Events",
    context: "Structured rooms for receptions, conferences, employee events, and client hospitality.",
  },
  {
    href: "/events/brand-activations",
    label: "Brand Activations",
    context: "Furniture and spatial planning that support guest flow, product focus, and branded service.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Comfortable seating and refined tables for intimate indoor or outdoor gatherings.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "A cohesive room shaped around dining, gifting, coffee, and dessert service.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "Flexible layouts for milestone dinners, standing celebrations, and outdoor events.",
  },
  {
    href: "/events/private-events",
    label: "Private Events",
    context: "Setting support for engagements, anniversaries, graduations, and family celebrations.",
  },
] as const;

export const rentalGalleryPreview = [
  {
    number: "01",
    label: "The room before guests arrive",
    note: "Approved room-transformation photography required",
    tone: "room",
  },
  {
    number: "02",
    label: "The layout in use",
    note: "Approved event photography required",
    tone: "layout",
  },
  {
    number: "03",
    label: "Materials and finishing details",
    note: "Approved inventory photography required",
    tone: "detail",
  },
] as const;

export const rentalServiceAreas = [
  "Greater Toronto Area",
  ...approvedBusinessIdentity.primaryServiceAreas,
  "Southern Ontario",
] as const;

export const seatingRentalFaqs = [
  {
    question: "How are chairs and tables priced?",
    answer:
      "Chairs and tables are priced from the confirmed item, quantity, event date, location, rental period, availability, delivery access, placement or setup requirements, teardown and pickup responsibilities, labour, and any outdoor or installation conditions. Luxe does not publish one per-item amount without a current inventory and logistics policy; the proposal must identify the selected inventory and every applicable service responsibility.",
  },
  {
    question: "What is included with an event-rental service?",
    answer:
      "Luxe begins with the confirmed rental categories: chairs, tables, cocktail tables, tents, linens, and lighting. The proposal then defines the selected inventory and any agreed delivery, placement, setup, takedown, or pickup responsibilities. Specific models, materials, colours, dimensions, quantities, availability, and operating scope are confirmed for the event rather than assumed to be universally included.",
  },
  {
    question: "Does Luxe deliver rentals?",
    answer:
      "Delivery may be available within Toronto, the approved GTA service area, and for qualified extended-travel requests, but the current approved intake does not define one universal rental-delivery boundary or policy. Luxe reviews the venue address, requested inventory and quantities, route and travel time, parking or loading access, stairs or elevators, delivery window, placement or setup responsibilities, pickup plan, labour, and fees before confirming delivery.",
  },
  {
    question: "Is rental setup included?",
    answer:
      "Delivery-only service transfers the confirmed inventory at the agreed place and time, leaving placement or installation to the responsible event team. Delivery with setup adds agreed placement or installation responsibilities and is more appropriate when the inventory, quantity, floor plan, access, or schedule requires managed execution. Setup is not universally included; the proposal must identify the selected model, responsibilities, labour, timing, and fees.",
  },
  {
    question: "Is rental teardown included?",
    answer:
      "Teardown and pickup responsibilities must be confirmed in the proposal. Timing, venue access, after-hours requirements, and the selected inventory can affect the final scope.",
  },
  {
    question: "Can rentals be combined with coffee or dessert?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be requested independently or planned together through one inquiry and proposal journey.",
  },
  {
    question: "Can rentals be styled to match the event?",
    answer:
      "Yes, within the confirmed inventory. Chair, table, cocktail-table, tent, linen, and lighting selections can be planned with the event palette, layout, and other Luxe experiences. Styling still has to support quantities, dimensions, availability, sightlines, accessibility, guest flow, venue rules, surface conditions, delivery access, and any agreed setup responsibilities; exact items and finishes are confirmed in the proposal.",
  },
  {
    question: "Which areas does Luxe serve?",
    answer:
      "Luxe serves Toronto and the Greater Toronto Area, including Scarborough, Etobicoke, North York, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, Mississauga, Brampton, Oakville, Burlington, Milton, Pickering, Ajax, Whitby, and Oshawa. Select larger events throughout Southern Ontario may also be available.",
  },
  {
    question: "Are travel or delivery fees applicable?",
    answer:
      "Travel fees may apply outside Luxe's standard service area, and rental delivery may carry event-specific transport, labour, access, setup, or pickup costs. Distance thresholds and the universal rental-delivery fee policy remain unapproved, so the proposal must state the available delivery model, responsibilities, and every applicable charge.",
  },
  {
    question: "Can Luxe rentals be used outdoors?",
    answer:
      "Outdoor applications can be planned, but suitability is event-specific. Surface, access, weather planning, wind, tent requirements, utilities, venue rules, and the selected inventory must be reviewed before confirmation.",
  },
  {
    question: "What information is required for a rental quote?",
    answer:
      "Share the event date, venue address, event type, guest count, indoor or outdoor setting, requested categories, estimated quantities, floor plan or dimensions where available, delivery access, timing, setup and teardown needs, and any Coffee Bar or Sweet Cart experiences being requested.",
  },
] as const;
