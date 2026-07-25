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
          "Luxe Coffee Bar offers the Café Cart Experience and Signature Coffee Bar Experience. Luxe Sweet Cart offers Classic and Signature cart collections with mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve. Seating Rentals is quoted from confirmed inventory and event requirements. Any division may be considered independently or combined through Luxe Event Co.",
        links: [{ href: "/experiences", label: "Compare Luxe experiences" }],
      },
      {
        id: "pricing-calculation",
        question: "How is pricing calculated?",
        answer:
          "Pricing is calculated from the selected experience, guest count, service duration, travel, staffing and logistics, rental scope, and approved enhancements or customization. Luxe prepares a personalized proposal after reviewing the event details rather than publishing one price for materially different events.",
        links: [{ href: "/inquire", label: "Request a personalized proposal" }],
      },
      {
        id: "guest-count-or-hours",
        question: "Is pricing based on guest count or hours?",
        answer:
          "Both can affect the quote. Guest count informs quantities, equipment, service planning, and minimums; service duration affects staffing and operating time. Travel, rental requirements, access, and selected enhancements may also change the final price.",
        links: [{ href: "/inquire", label: "Share your event details" }],
      },
      {
        id: "booking-lead-time",
        question: "How far in advance should clients book?",
        answer:
          "Book as early as possible for weddings, spring-to-fall dates, holiday events, and other peak periods. Luxe has not approved one universal lead time because availability depends on the date, division, guest count, staffing, travel, and production requirements.",
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
          "Luxe primarily serves Toronto and the Greater Toronto Area, including Scarborough, Etobicoke, North York, Markham, Vaughan, Richmond Hill, Aurora, Newmarket, King City, Thornhill, Mississauga, Brampton, Oakville, Burlington, Milton, Pickering, Ajax, Whitby, and Oshawa.",
        links: [{ href: "/inquire", label: "Confirm service for your location" }],
      },
      {
        id: "outside-gta",
        question: "Does Luxe travel outside the GTA?",
        answer:
          "Yes. Select larger events elsewhere in Southern Ontario may be considered. Availability, minimum booking requirements, travel time, staffing, and logistics must be reviewed for the location.",
        links: [{ href: "/inquire", label: "Discuss an extended-service event" }],
      },
      {
        id: "travel-fees",
        question: "Are travel fees applicable?",
        answer:
          "Travel fees may apply outside Luxe’s standard service area. The proposal identifies any applicable travel charge after the venue, selected experiences, timing, and required team movement are confirmed.",
        links: [{ href: "/inquire", label: "Request a location-specific quote" }],
      },
      {
        id: "destination-events",
        question: "Are destination events available?",
        answer:
          "Select destination events in Southern Ontario may be considered, particularly for larger event scopes. Luxe confirms feasibility, minimums, travel fees, accommodations if required, transport, and service logistics before issuing a proposal.",
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
          "There is no one published footprint for every booking. Required space depends on the Café Cart or Signature Coffee Bar, Sweet Cart selection, equipment, menu, staffing, guest flow, rental scope, and venue access. Luxe confirms the operating footprint before the event.",
        links: [{ href: "/inquire", label: "Review your venue setup" }],
      },
      {
        id: "power-required",
        question: "Is power required?",
        answer:
          "Power requirements depend on the selected experience and equipment. Clients should not assume a setup can operate without power; Luxe confirms outlet, circuit, placement, and load requirements with the venue during planning.",
        links: [{ href: "/experiences", label: "Explore the experiences" }],
      },
      {
        id: "water-required",
        question: "Is water required?",
        answer:
          "Water-access requirements vary by beverage or dessert setup and venue conditions. Luxe confirms whether potable water access, a direct connection, or another approved arrangement is required after the menu and equipment are selected.",
        links: [{ href: "/inquire", label: "Confirm venue requirements" }],
      },
      {
        id: "setup-duration",
        question: "How long does setup take?",
        answer:
          "Setup time is event-specific. It depends on access, loading distance, elevators, parking, experience type, branding, rental scope, weather protection, and the venue’s setup window. The confirmed arrival and setup schedule is provided before event day.",
        links: [{ href: "/inquire", label: "Share venue access details" }],
      },
      {
        id: "teardown-duration",
        question: "How long does teardown take?",
        answer:
          "Teardown timing depends on the selected services, rental pickup plan, venue rules, loading access, and event schedule. Luxe confirms the takedown or pickup window in the event plan rather than applying one duration to every setup.",
        links: [{ href: "/inquire", label: "Discuss the event schedule" }],
      },
      {
        id: "outdoor-service",
        question: "Can services operate outdoors?",
        answer:
          "Outdoor service can be considered. Ground conditions, weather protection, tenting, temperature, wind, power or water access, equipment placement, and a practical backup plan must be approved for the selected experience.",
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
    id: "coffee-bar",
    number: "04",
    title: "Coffee Bar",
    description: "Included beverages, menu choices, customization, throughput, and staffing.",
    items: [
      {
        id: "coffee-drinks-included",
        question: "Which drinks are included?",
        answer:
          "A confirmed coffee experience includes four espresso classics: espresso, Americano, cappuccino, and café latte; two signature coffee drinks; and one premium non-coffee beverage selected from matcha, tea, chai, or hot chocolate. The final menu appears in the proposal.",
        links: [{ href: "/experiences/coffee-bar", label: "View the Coffee Bar experience" }],
      },
      {
        id: "iced-drinks",
        question: "Are iced drinks included?",
        answer:
          "Yes. Hot and iced beverages are included within the confirmed Coffee Bar experience. The final hot-and-iced menu is selected around the event, season, and service plan.",
        links: [{ href: "/experiences/coffee-bar", label: "Explore hot and iced service" }],
      },
      {
        id: "matcha-included",
        question: "Is matcha included?",
        answer:
          "Matcha is available as a premium non-coffee selection. One premium non-coffee beverage is included in the confirmed Coffee Bar experience; the client may select matcha, tea, chai, or hot chocolate for that inclusion.",
        links: [{ href: "/experiences/coffee-bar", label: "Explore matcha service" }],
      },
      {
        id: "tea-available",
        question: "Is tea available?",
        answer:
          "Yes. A premium tea selection is available and may be selected as the included premium non-coffee beverage or discussed as part of the wider menu.",
        links: [{ href: "/experiences/coffee-bar", label: "Review non-coffee options" }],
      },
      {
        id: "milk-alternatives",
        question: "Are dairy-free milk alternatives available?",
        answer:
          "Yes. Dairy and premium milk alternatives are included. The specific alternatives and any allergy or cross-contact considerations should be confirmed during menu planning.",
        links: [{ href: "/inquire", label: "Share dietary requirements" }],
      },
      {
        id: "coffee-menu-customization",
        question: "Can the menu be customized?",
        answer:
          "Yes. Clients can discuss signature drinks, seasonal collections, matcha and non-coffee choices, menu displays, milk alternatives, and event-specific naming or presentation. Final selections depend on the chosen experience and production timeline.",
        links: [{ href: "/experiences/coffee-bar", label: "Explore Coffee Bar customization" }],
      },
      {
        id: "seasonal-drinks",
        question: "Are seasonal drinks available?",
        answer:
          "Yes. Luxe maintains spring, summer, autumn, and holiday beverage collections. Availability and the final seasonal menu are confirmed for the event date.",
        links: [{ href: "/experiences/coffee-bar", label: "View seasonal beverage possibilities" }],
      },
      {
        id: "branded-cups",
        question: "Can cups be branded?",
        answer:
          "Yes. Custom-branded cups can be discussed for corporate events, brand activations, weddings, and private celebrations. Artwork, quantities, print requirements, approvals, lead time, and pricing are confirmed before production.",
        links: [{ href: "/events/brand-activations", label: "Explore branded experiences" }],
      },
      {
        id: "pastries",
        question: "Can pastries be added?",
        answer:
          "Pastry-display possibilities are available as a customization option. Selection, quantities, presentation, dietary information, sourcing, and pricing must be confirmed in the proposal.",
        links: [{ href: "/experiences/coffee-bar", label: "Explore Coffee Bar enhancements" }],
      },
      {
        id: "drinks-per-hour",
        question: "How many drinks can be served per hour?",
        answer:
          "Luxe does not publish one hourly rate because throughput changes with the menu, hot-to-iced mix, equipment, service format, guest arrival pattern, and staffing plan. Coffee service can be planned for events of up to 500 guests, with event-specific capacity confirmed in the proposal.",
        links: [{ href: "/inquire", label: "Plan for your guest count" }],
      },
      {
        id: "baristas-included",
        question: "How many baristas are included?",
        answer:
          "Professional barista service is included. The number of baristas is assigned according to guest count, menu complexity, service duration, event flow, equipment, and venue conditions, then stated in the proposal.",
        links: [{ href: "/inquire", label: "Discuss staffing requirements" }],
      },
    ],
  },
  {
    id: "sweet-cart",
    number: "05",
    title: "Sweet Cart",
    description: "Dessert formats, sauces, toppings, enhancements, and combination limits.",
    items: [
      {
        id: "desserts-available",
        question: "Which desserts are available?",
        answer:
          "Luxe Sweet Cart offers mini Dutch pancakes, Belgian waffles on a stick, and mini donuts prepared on-site. Soft serve is available as an optional add-on.",
        links: [{ href: "/experiences/sweet-cart", label: "View the Sweet Cart experience" }],
      },
      {
        id: "standard-toppings",
        question: "Which toppings are included?",
        answer:
          "A confirmed dessert experience includes premium sauces and a selected assortment of standard toppings. Standard options include milk and white chocolate chips, crushed Oreos, brownies, chocolate curls, sliced bananas, rainbow sprinkles, M&M’s, shredded coconut, sliced almonds, and Lotus Biscoff cookies. Final selections appear in the proposal.",
        links: [{ href: "/experiences/sweet-cart", label: "Explore sauces and toppings" }],
      },
      {
        id: "premium-toppings",
        question: "Are premium toppings available?",
        answer:
          "Yes. Premium topping options include freshly sliced strawberries, fresh blueberries, KitKat bites, Kinder Bueno, crushed pistachios, and crushed pecans. Availability, quantities, dietary information, and pricing are confirmed for the event.",
        links: [{ href: "/experiences/sweet-cart", label: "Review dessert enhancements" }],
      },
      {
        id: "custom-toppings",
        question: "Can toppings be customized?",
        answer:
          "Yes. Sauces, standard toppings, and available premium toppings can be selected around the dessert format and event. Requests outside the confirmed menu require review for sourcing, preparation, allergies, service speed, and presentation.",
        links: [{ href: "/inquire", label: "Build a dessert direction" }],
      },
      {
        id: "soft-serve",
        question: "Can soft serve be added?",
        answer:
          "Yes. Soft serve is an optional enhancement. Availability, flavour, equipment, venue conditions, power, service format, and pricing must be confirmed for the event.",
        links: [{ href: "/experiences/sweet-cart", label: "Explore soft-serve possibilities" }],
      },
      {
        id: "combine-dessert-types",
        question: "Can pancakes, waffles, and donuts be combined?",
        answer:
          "Multiple dessert types may be discussed, but all three are not automatically included in one cart booking. Feasibility depends on the cart collection, guest count, preparation workflow, equipment, staffing, service duration, and venue conditions.",
        links: [{ href: "/inquire", label: "Discuss a combined dessert experience" }],
      },
    ],
  },
  {
    id: "seating-rentals",
    number: "06",
    title: "Seating Rentals",
    description: "Available categories, multi-service bookings, delivery, setup, and teardown.",
    items: [
      {
        id: "bundle-rentals",
        question: "Can rentals be bundled with coffee or dessert?",
        answer:
          "Yes. Seating Rentals can be coordinated with Luxe Coffee Bar, Luxe Sweet Cart, or both through one Luxe Event Co. inquiry. Inventory, quantities, delivery, service timing, access, and setup responsibilities are confirmed in the proposal.",
        links: [{ href: "/experiences", label: "Compare all Luxe experiences" }],
      },
      {
        id: "rental-setup-teardown",
        question: "Is setup and teardown included?",
        answer:
          "Coffee Bar and Sweet Cart bookings include setup and takedown. Rental delivery, setup, teardown, pickup, labour, access requirements, and fees are event-specific and must be stated in the rental proposal.",
        links: [{ href: "/experiences/seating-rentals", label: "Review rental planning" }],
      },
      {
        id: "rental-delivery",
        question: "Is delivery available?",
        answer:
          "Rental delivery may be available for a confirmed event scope. Luxe must review the venue, delivery area, inventory, quantities, loading access, timing, pickup plan, labour, and applicable fees before confirming delivery.",
        links: [{ href: "/inquire", label: "Request a rental quote" }],
      },
      {
        id: "rental-items",
        question: "Which rental items are available?",
        answer:
          "Confirmed rental categories include chairs, tables, cocktail tables, tents, linens, and lighting. Exact styles, dimensions, quantities, condition, and availability require the current inventory schedule and event date.",
        links: [{ href: "/experiences/seating-rentals", label: "Explore Seating Rentals" }],
      },
    ],
  },
  {
    id: "customization",
    number: "07",
    title: "Customization",
    description: "Themes, signage, menus, combined experiences, and corporate branding.",
    items: [
      {
        id: "event-theme",
        question: "Can experiences be matched to an event theme?",
        answer:
          "Yes. Luxe can discuss colour direction, menu language, beverage or dessert selections, signage, cups, cart presentation, florals where applicable, and selected rental elements. Final possibilities depend on the division, approved design, production timeline, and event conditions.",
        links: [{ href: "/experiences", label: "Explore experience customization" }],
      },
      {
        id: "signage",
        question: "Can signage be added?",
        answer:
          "Yes. Custom event signage and menu displays can be added. Wording, dimensions, materials, artwork, placement, production lead time, approvals, and pricing are confirmed before production.",
        links: [{ href: "/inquire", label: "Discuss custom signage" }],
      },
      {
        id: "custom-menus",
        question: "Can menus be customized?",
        answer:
          "Yes. Coffee, non-coffee, seasonal beverage, dessert, sauce, topping, and event-specific menu directions can be discussed. The final menu must remain operationally appropriate for the selected experience, guest count, and service plan.",
        links: [{ href: "/experiences", label: "Explore menu possibilities" }],
      },
      {
        id: "multiple-experiences",
        question: "Can multiple experiences be booked together?",
        answer:
          "Yes. Coffee, dessert, and rentals may be booked independently or combined. Luxe coordinates the selected divisions through one inquiry and proposal journey while confirming each experience’s timing, staffing, setup, and logistics.",
        links: [{ href: "/experiences", label: "Explore combined experiences" }],
      },
      {
        id: "corporate-branding",
        question: "Can corporate branding be incorporated?",
        answer:
          "Yes. Approved logos, branded cups, cart treatment, custom signage, tailored drink names, menu displays, and brand-colour direction can be discussed. The client must provide production-ready assets and approvals within the confirmed timeline.",
        links: [{ href: "/events/brand-activations", label: "Create a branded experience" }],
      },
    ],
  },
] as const;

export const allFaqItems = faqCategories.flatMap((category) =>
  category.items.map((item) => ({ ...item, category })),
);
