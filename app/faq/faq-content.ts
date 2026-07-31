export type FaqLink = {
  href: string;
  label: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  links: readonly FaqLink[];
};

export type FaqCategory = {
  id: string;
  number: string;
  title: string;
  description: string;
  items: readonly FaqItem[];
};

export const faqCategories: readonly FaqCategory[] = [
  {
    id: "general-booking",
    number: "01",
    title: "General Booking",
    description: "Experience formats, pricing inputs, reservation terms, and insurance.",
    items: [
      {
        id: "available-packages",
        question: "What packages are available?",
        answer:
          "Luxe does not use one universal event package. Luxe Coffee Bar offers the Café Cart Experience and Signature Coffee Bar Experience. Luxe Sweet Cart offers Classic and Signature cart collections with mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve. Seating Rentals is quoted from confirmed inventory and event requirements. Any service may be available independently or combined through Luxe Event Co.",
        links: [{ href: "/experiences", label: "Compare Luxe experiences" }],
      },
      {
        id: "pricing-calculation",
        question: "How is pricing calculated?",
        answer:
          "Event pricing is calculated from the selected experience and format, guest count, service duration, location and travel, staffing, menu, custom branding, equipment, setup requirements, outdoor conditions, rental quantities, delivery access, multi-day needs, multiple service stations, combined experiences, and approved enhancements. Luxe reviews the actual event requirements and itemizes the confirmed scope in the proposal rather than applying one total to materially different events.",
        links: [{ href: "/inquire", label: "Request a personalized proposal" }],
      },
      {
        id: "guest-count-or-hours",
        question: "Is pricing based on guest count or hours?",
        answer:
          "Both can affect the quote, but neither works alone. Guest count informs quantities, equipment, service planning, staffing, and minimums; service duration affects operating time, staffing coverage, replenishment, and venue scheduling. Menu, location, travel, access, branding, rentals, setup, and the number of stations can also change the final price.",
        links: [{ href: "/inquire", label: "Share your event details" }],
      },
      {
        id: "booking-lead-time",
        question: "How far in advance should clients book?",
        answer:
          "Book as early as possible for weddings, spring-to-fall dates, holiday events, and other peak periods. Luxe has not approved one universal lead time because availability depends on the date, selected service, guest count, staffing, travel, and production requirements.",
        links: [{ href: "/inquire", label: "Check your date" }],
      },
      {
        id: "reserve-a-date",
        question: "What is required to reserve a date?",
        answer:
          "A signed contract and the required 30% non-refundable retainer reserve the date. Availability is not guaranteed until Luxe has received both.",
        links: [{ href: "/inquire", label: "Begin an inquiry" }],
      },
      {
        id: "retainer-required",
        question: "Is a retainer required?",
        answer:
          "Yes. A 30% non-refundable retainer is required to secure a confirmed booking.",
        links: [{ href: "/inquire", label: "Ask about your event" }],
      },
      {
        id: "balance-due",
        question: "When is the balance due?",
        answer:
          "The remaining balance is due seven days before the event date. The contract and proposal provide the applicable payment schedule for the booking.",
        links: [{ href: "/inquire", label: "Discuss booking terms" }],
      },
      {
        id: "payment-methods",
        question: "Which payment methods are accepted?",
        answer:
          "Accepted payment methods are provided with the proposal and contract. Luxe has not approved a public list of payment methods, so clients should follow the payment instructions issued for their confirmed booking.",
        links: [{ href: "/inquire", label: "Confirm payment options" }],
      },
      {
        id: "luxe-insured",
        question: "Is Luxe insured?",
        answer:
          "Yes. Luxe carries $5 million in liability insurance, supporting venue, planner, corporate, and private-event requirements where proof of coverage is requested.",
        links: [{ href: "/inquire", label: "Request event-specific documentation" }],
      },
    ],
  },
  {
    id: "travel-service-area",
    number: "02",
    title: "Travel and Service Area",
    description: "Primary coverage, extended travel, and location-based quote considerations.",
    items: [
      {
        id: "areas-served",
        question: "Which areas are served?",
        answer:
          "Yes, Luxe is available for events in Toronto and throughout the approved Greater Toronto Area service area, including Scarborough, Etobicoke, North York, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, Mississauga, Brampton, Oakville, Burlington, Milton, Pickering, Ajax, Whitby, and Oshawa.",
        links: [{ href: "/inquire", label: "Confirm service for your location" }],
      },
      {
        id: "outside-gta",
        question: "Does Luxe travel outside the GTA?",
        answer:
          "Select larger events elsewhere in Southern Ontario may be available as extended-travel or destination requests. Availability is not automatic outside the primary service area: Luxe reviews the event scope, date, distance and travel time, staffing, equipment or inventory movement, venue access, service schedule, and any applicable minimum requirements before confirming feasibility.",
        links: [{ href: "/inquire", label: "Discuss an extended-service event" }],
      },
      {
        id: "travel-fees",
        question: "Are travel fees applicable?",
        answer:
          "Travel fees may apply outside Luxe’s standard service area, but no universal distance threshold or fee formula is published. Location can also affect the feasible service scope, minimum booking review, staffing and travel time, equipment or rental transport, parking and loading requirements, setup and takedown windows, and whether accommodations are required. The proposal identifies the confirmed scope and any location-related charge after these factors are reviewed.",
        links: [{ href: "/inquire", label: "Request a location-specific quote" }],
      },
      {
        id: "destination-events",
        question: "Are destination events available?",
        answer:
          "Select destination events in Southern Ontario may be available, particularly for larger event scopes. Luxe confirms the venue location, date, selected services, minimum requirements, travel fees, transport, staffing, accommodations if required, load-in access, utilities, setup and takedown windows, and pickup or return plan before issuing a proposal.",
        links: [{ href: "/inquire", label: "Discuss a destination event" }],
      },
    ],
  },
  {
    id: "setup-logistics",
    number: "03",
    title: "Setup and Logistics",
    description: "Space, utilities, timing, weather, access, and outdoor operating conditions.",
    items: [
      {
        id: "space-required",
        question: "How much space is required?",
        answer:
          "Luxe has not approved one public floor-space figure. Required space depends on the Café Cart or Signature Coffee Bar, Sweet Cart selection, equipment, menu, staffing, guest flow, rental scope, and venue access. The exact operating footprint and clearance must be confirmed for the proposed setup.",
        links: [{ href: "/inquire", label: "Review your venue setup" }],
      },
      {
        id: "power-required",
        question: "Is power required?",
        answer:
          "Power requirements depend on the selected experience and equipment. Clients should not assume a setup can operate without electricity or from any available outlet. Luxe has not approved a universal outlet, circuit, load, or generator specification; the exact requirement must be confirmed with the venue for the proposed setup.",
        links: [{ href: "/experiences", label: "Explore the experiences" }],
      },
      {
        id: "water-required",
        question: "Is water required?",
        answer:
          "Water-access requirements vary by beverage or dessert setup, equipment, menu, and venue conditions. Luxe has not approved a universal supply, drainage, or self-contained-operation claim. The required potable-water and wastewater arrangement must be confirmed after the service plan is selected.",
        links: [{ href: "/inquire", label: "Confirm venue requirements" }],
      },
      {
        id: "setup-duration",
        question: "How long does setup take?",
        answer:
          "Luxe has not approved one public setup duration. Venue location does not determine feasibility by itself: timing depends on travel, the loading window, parking, loading dock or entrance, stairs or elevators, travel distance inside the venue, placement, utilities, experience type, branding, rental scope, weather protection, and the venue’s setup window. Luxe can coordinate these inputs with the client, planner, or venue, but the responsible contacts and load-in details must be confirmed before the arrival and setup schedule is issued.",
        links: [{ href: "/inquire", label: "Share venue access details" }],
      },
      {
        id: "teardown-duration",
        question: "How long does teardown take?",
        answer:
          "Luxe has not approved one public teardown duration. Timing depends on the selected services, equipment, rental pickup plan, venue rules, loading access, after-hours requirements, and event schedule. The takedown or pickup window must be confirmed for the booking.",
        links: [{ href: "/inquire", label: "Discuss the event schedule" }],
      },
      {
        id: "outdoor-service",
        question: "Can services operate outdoors?",
        answer:
          "Indoor service is supported when the venue can meet the confirmed access, space, utility, and operating requirements. Outdoor service can be planned, but no universal outdoor limit is approved. Ground conditions, shelter or tenting, temperature, wind, precipitation, power or water access, equipment protection, venue rules, and a practical indoor or protected backup plan must be reviewed for the selected experience.",
        links: [{ href: "/events", label: "Explore event applications" }],
      },
      {
        id: "rain-plan",
        question: "What happens if it rains?",
        answer:
          "The host and venue must provide an approved weather plan before an outdoor event. Depending on the forecast and setup, this may require suitable tenting, protected operating space, relocation indoors, or another agreed adjustment. Luxe does not operate equipment in unsafe conditions.",
        links: [{ href: "/inquire", label: "Plan an outdoor event" }],
      },
      {
        id: "without-direct-power",
        question: "Can Luxe operate without direct access to power?",
        answer:
          "Do not assume so. Feasibility depends on the selected cart, equipment, menu, event duration, venue rules, and any approved alternative power arrangement. Luxe must review and confirm the plan before booking.",
        links: [{ href: "/inquire", label: "Review an off-grid setup" }],
      },
    ],
  },
  {
    id: "customization",
    number: "04",
    title: "Customization",
    description: "Themes, signage, menus, combined experiences, and corporate branding.",
    items: [
      {
        id: "event-theme",
        question: "Can experiences be matched to an event theme?",
        answer:
          "Yes. Luxe can discuss colour direction, menu language, beverage or dessert selections, signage, cups, cart presentation, florals where applicable, and selected rental elements. The visual direction must still preserve menu clarity, an orderly service point, practical guest movement, and the operating needs of each experience. Final possibilities depend on the chosen service, approved design, production timeline, and event conditions.",
        links: [{ href: "/experiences", label: "Explore experience customization" }],
      },
      {
        id: "signage",
        question: "Can signage be added?",
        answer:
          "Yes. Custom event signage and menu displays can be added. Wording, dimensions, materials, artwork, placement, production lead time, approvals, and pricing are confirmed before production. The finished sign must remain legible and useful where guests order, choose, or move through the service area.",
        links: [{ href: "/inquire", label: "Discuss custom signage" }],
      },
      {
        id: "custom-menus",
        question: "Can menus be customized?",
        answer:
          "Yes. Coffee menus can combine the confirmed espresso classics with signature beverages, seasonal selections, matcha, tea, chai, hot chocolate, and dairy-free milk alternatives. Dessert directions can use the approved desserts, sauces, standard toppings, premium toppings, and optional soft serve. Names and presentation can respond to the event, but the final menu must remain workable for the selected experience, guest count, equipment, ingredients, service speed, and guest flow.",
        links: [{ href: "/experiences", label: "Explore menu possibilities" }],
      },
      {
        id: "multiple-experiences",
        question: "Can multiple experiences be booked together?",
        answer:
          "Yes. Coffee, dessert, and rentals may be booked independently or combined. Luxe coordinates the selected services through one inquiry and proposal journey while confirming each experience’s timing, staffing, setup, and logistics.",
        links: [{ href: "/experiences", label: "Explore combined experiences" }],
      },
      {
        id: "corporate-branding",
        question: "Can corporate branding be incorporated?",
        answer:
          "Yes. Approved logos, branded cups, cart treatment, custom signage, campaign drink names, menu displays, and brand-colour direction can be discussed. Clients should provide approved logos, brand guidelines, colour references, campaign copy or naming direction, usage permissions, and an approval contact. Exact file formats, print specifications, quantities, and deadlines are confirmed after the branding surfaces and service plan are scoped.",
        links: [{ href: "/events/brand-activations", label: "Create a branded experience" }],
      },
    ],
  },
] as const;

export const allFaqItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category })),
);
