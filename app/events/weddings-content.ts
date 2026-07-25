export const weddingMoments = [
  {
    number: "01",
    phase: "Before the ceremony",
    title: "A considered welcome.",
    description:
      "A Café Cart can greet the wedding party or arriving guests with espresso, matcha, and specialty beverages before the ceremony begins.",
    note: "Best fit is confirmed around arrival flow, venue access, and timing.",
  },
  {
    number: "02",
    phase: "Cocktail hour",
    title: "Coffee becomes part of the transition.",
    description:
      "The Signature Coffee Bar can give guests a polished hospitality point between the ceremony and reception, with hot and iced service shaped around the season.",
    note: "Menu complexity, guest count, staffing, and service duration shape the plan.",
  },
  {
    number: "03",
    phase: "Reception",
    title: "A beverage experience within the room.",
    description:
      "Espresso classics, signature drinks, matcha, and premium non-coffee beverages can support dinner service, speeches, or the movement into the evening.",
    note: "Placement is coordinated with the venue, planner, caterer, and reception schedule.",
  },
  {
    number: "04",
    phase: "Dessert",
    title: "A live sweet moment.",
    description:
      "Mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve can be prepared on-site as an interactive part of the celebration.",
    note: "Dessert selections, sauces, toppings, and presentation are confirmed for the event.",
  },
  {
    number: "05",
    phase: "Late night",
    title: "A second wind, served beautifully.",
    description:
      "Coffee or freshly prepared dessert can create a late-night pause that feels intentional rather than added on after the reception.",
    note: "Extended service time and special logistics may affect the final scope.",
  },
  {
    number: "06",
    phase: "The morning after",
    title: "Hospitality can continue.",
    description:
      "Where the venue, schedule, and availability allow, a focused coffee experience can be considered for a farewell breakfast or next-day gathering.",
    note: "Morning-after service is planned as a separate event requirement, not assumed within the wedding-day booking.",
  },
] as const;

export const weddingExperienceRoles = [
  {
    number: "01",
    label: "Coffee",
    name: "Luxe Coffee Bar",
    href: "/experiences/coffee-bar",
    statement: "Arrival, transition, reception, or late-night hospitality.",
    description:
      "Choose between the intimate Café Cart and the more prominent Signature Coffee Bar based on the room, guest count, and role beverage service should play.",
  },
  {
    number: "02",
    label: "Dessert",
    name: "Luxe Sweet Cart",
    href: "/experiences/sweet-cart",
    statement: "Fresh preparation and a visual focal point.",
    description:
      "A live dessert experience can sit within cocktail hour, reception, or late-night service while contributing to the atmosphere around it.",
  },
  {
    number: "03",
    label: "Setting",
    name: "Luxe Seating Rentals",
    href: "/experiences/seating-rentals",
    statement: "Comfort, structure, and the shape of the room.",
    description:
      "Chairs, tables, cocktail tables, tents, linens, and lighting can be considered around ceremony, reception, lounge, or outdoor requirements.",
  },
] as const;

export const weddingCombinations = [
  {
    number: "01",
    title: "A composed cocktail hour",
    experiences: "Signature Coffee Bar + Sweet Cart",
    description:
      "Crafted beverages and live dessert create two complementary guest moments during the transition into the reception.",
  },
  {
    number: "02",
    title: "Hospitality through the evening",
    experiences: "Coffee Bar + Late-night dessert",
    description:
      "Coffee supports the reception while freshly prepared dessert gives the later hours their own distinct energy.",
  },
  {
    number: "03",
    title: "The setting and service together",
    experiences: "Coffee + Dessert + Rentals",
    description:
      "The beverage experience, sweet service, and room requirements are considered through one Luxe Event Co. inquiry and proposal journey.",
  },
] as const;

export const weddingCustomization = [
  {
    number: "01",
    title: "Drinks and menus",
    description:
      "Signature beverages, seasonal collections, matcha, premium non-coffee options, milk alternatives, and menu displays can be selected around the season and guest experience.",
  },
  {
    number: "02",
    title: "Cups and signage",
    description:
      "Custom cups, event signage, and menu displays can carry names, dates, wording, or visual direction approved for the celebration.",
  },
  {
    number: "03",
    title: "Cart and presentation",
    description:
      "Cart branding, dessert styling, floral direction, pastry-display possibilities, and presentation details can be discussed during discovery.",
  },
] as const;

export const weddingLogistics = [
  {
    number: "01",
    title: "Planner and venue coordination",
    description:
      "Luxe can coordinate service timing, access, placement, and event-day requirements with the couple, planner, coordinator, venue, and relevant vendor team.",
  },
  {
    number: "02",
    title: "Setup and takedown",
    description:
      "Setup and takedown are included for confirmed Coffee Bar and Sweet Cart experiences. Rental delivery, setup, teardown, and pickup responsibilities are defined in the proposal.",
  },
  {
    number: "03",
    title: "Venue requirements",
    description:
      "Footprint, power, water, access, indoor or outdoor conditions, and timing depend on the selected experiences and venue. Luxe confirms them after reviewing the event details.",
  },
  {
    number: "04",
    title: "Travel and destination planning",
    description:
      "Luxe serves Toronto and the GTA and considers select destination weddings throughout Southern Ontario. Applicable travel fees and logistics are confirmed in the proposal.",
  },
] as const;

export const weddingGalleryPreview = [
  {
    number: "01",
    label: "The welcome",
    note: "Coffee service within the arrival or cocktail-hour setting",
    tone: "welcome",
  },
  {
    number: "02",
    label: "The sweet moment",
    note: "On-site dessert preparation and guest interaction",
    tone: "dessert",
  },
  {
    number: "03",
    label: "The room",
    note: "Seating, tables, linens, lighting, and atmosphere in context",
    tone: "room",
  },
] as const;

export const weddingFaqs = [
  {
    question: "Can Luxe provide coffee service for weddings?",
    answer:
      "Yes. Luxe Coffee Bar provides professional barista service, espresso classics, signature drinks, matcha and premium non-coffee options, hot and iced service, milk alternatives, serving essentials, setup, and takedown. The Café Cart or Signature Coffee Bar is selected around the wedding format and guest experience.",
  },
  {
    question: "Which stages of a wedding can Luxe serve?",
    answer:
      "Coffee can be considered for pre-ceremony hospitality, guest arrival, cocktail hour, reception service, or a late-night moment. Dessert can support cocktail hour, reception, or late-night service. A separate morning-after coffee experience may also be considered where schedule, access, travel, and availability allow.",
  },
  {
    question: "Can coffee and dessert be booked together?",
    answer:
      "Yes. Luxe Coffee Bar and Luxe Sweet Cart can be selected together through one Luxe Event Co. inquiry and proposal journey. The service timeline, placement, menus, staffing, and setup requirements are coordinated around the wedding.",
  },
  {
    question: "Can seating and rentals be included?",
    answer:
      "Yes. Chairs, tables, cocktail tables, tents, linens, and lighting can be considered alongside Coffee Bar or Sweet Cart. Inventory, quantities, delivery, setup, teardown, access, and fees must be confirmed for the venue and date.",
  },
  {
    question: "Can wedding menus, cups, and signage be customized?",
    answer:
      "Yes. Signature beverages, seasonal selections, menu displays, custom cups, event signage, cart branding, dessert presentation, and other visual details can be discussed. Final possibilities depend on the approved direction, timeline, and production requirements.",
  },
  {
    question: "How early should couples book?",
    answer:
      "Luxe recommends booking early for weddings and peak-season dates, especially from April through October. No universal lead time is promised because availability depends on the date, requested experiences, staffing, travel, and logistics.",
  },
  {
    question: "Is a retainer required?",
    answer:
      "Yes. A 30% non-refundable retainer and signed contract are required to secure the booking. Availability is not guaranteed until both are received. The remaining balance is due seven days before the event.",
  },
  {
    question: "Does Luxe coordinate with wedding planners and venues?",
    answer:
      "Yes. Luxe can coordinate timing, access, placement, setup, service flow, and event-day requirements with couples, planners, coordinators, venues, and relevant vendors. Exact responsibilities are confirmed during planning.",
  },
  {
    question: "Does Luxe travel outside Toronto?",
    answer:
      "Yes. Luxe serves Toronto and the Greater Toronto Area and considers select destination weddings throughout Southern Ontario. Travel fees may apply outside the standard service area.",
  },
] as const;
