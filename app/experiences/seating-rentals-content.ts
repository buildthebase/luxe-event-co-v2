import { approvedBusinessIdentity } from "../local-seo";

export const rentalCategories = [
  {
    id: "chairs",
    number: "01",
    name: "Event and wedding chair rentals",
    role: "Comfort, proportion, and placement",
    description:
      "Selected for ceremonies, reception dining, and lounge setups. Chair styles, quantities, finishes, and date availability are tailored to your guest count and design vision.",
  },
  {
    id: "tables",
    number: "02",
    name: "Dining and service table rentals",
    role: "The foundation for dining, service, and display",
    description:
      "Proportioned to fit your venue dimensions and floor plan. Available in custom shapes and sizes for seated dinners, grazing tables, bar stations, and feature displays.",
  },
  {
    id: "cocktail-tables",
    number: "03",
    name: "Cocktail and high-top table rentals",
    role: "Natural gathering points",
    description:
      "Dynamic high-top rentals designed to encourage guest mingling and smooth room flow. Ideal for cocktail receptions, corporate networking, and brand activations.",
  },
  {
    id: "tents",
    number: "04",
    name: "Outdoor event tent rentals",
    role: "Shelter tailored to your setting",
    description:
      "Sleek outdoor tenting options engineered for backyard celebrations, lawn weddings, and outdoor corporate events. Customized for site access, footprint, and weather contingency plans across Toronto and the GTA.",
  },
  {
    id: "linens",
    number: "05",
    name: "Event linen and fabric rentals",
    role: "Color, texture, and finish",
    description:
      "High-end table linens, runners, and napkins that unify your color palette across dining tables, high-tops, and bar setups. Available in premium textures and custom finishes.",
  },
  {
    id: "lighting",
    number: "06",
    name: "Venue and event lighting setup",
    role: "Atmosphere, visibility, and focus",
    description:
      "Ambient and accent lighting installations designed to highlight key focal points, seating lounges, and feature setups while setting the evening atmosphere.",
  },
] as const;

export const layoutStudies = [
  {
    number: "01",
    title: "Ceremony layout and seating design",
    lead: "A thoughtful ceremony setup keeps full attention on the moment.",
    description:
      "We calculate aisle widths, chair spacing, and speaker sightlines while ensuring smooth guest access and transitions into reception spaces.",
    tone: "ceremony",
  },
  {
    number: "02",
    title: "Reception flow and floor planning",
    lead: "Your reception layout should feel spacious even at full capacity.",
    description:
      "We balance table positioning with catering service paths, focal stage views, and dance floor access so guests dine and mingle effortlessly.",
    tone: "reception",
  },
  {
    number: "03",
    title: "Cocktail hour and social-space layouts",
    lead: "Social spaces and cocktail hours require intuitive room flow.",
    description:
      "Strategic placement of high-top tables, bar zones, and lounge seating encourages natural movement for guest arrivals and networking.",
    tone: "social",
  },
] as const;

export const rentalOperations = [
  {
    number: "01",
    title: "Delivery",
    status: "Planned for the venue",
    description:
      "Timed delivery scheduled around your venue loading dock access, event timeline, and order scope. All travel requirements and scheduling are confirmed in your rental proposal.",
  },
  {
    number: "02",
    title: "Setup",
    status: "Defined within the proposal",
    description:
      "On-site placement executed according to your approved floor plan. Our crew handles complete furniture arrangement to ensure your layout is event-ready on time.",
  },
  {
    number: "03",
    title: "Teardown and pickup",
    status: "Confirmed before the event",
    description:
      "Efficient post-event load-out scheduled around venue curfew. Pickup timing, after-hours access, and teardown responsibilities are fully verified ahead of time.",
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
    note: "A room-wide view of seating, circulation, and service zones.",
    tone: "room",
  },
  {
    number: "02",
    label: "The layout in use",
    note: "A guest-ready layout showing how the setting functions in use.",
    tone: "layout",
  },
  {
    number: "03",
    label: "Materials and finishing details",
    note: "A closer view of the finishes and details that complete the setting.",
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
      "Seating and table rental pricing is determined by your selected items, quantities, event date, venue location, delivery access, and setup scope. To ensure complete clarity, every Luxe proposal provides transparent, itemized pricing that accounts for all inventory and on-site logistics with no hidden fees.",
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
