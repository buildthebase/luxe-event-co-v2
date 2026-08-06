export const bridalShowerExperiences = [
  {
    number: "01",
    label: "Café-style coffee service",
    href: "/experiences/coffee-bar",
    title: "A café moment made for the room.",
    description:
      "The Café Cart offers a focused welcome, while the Signature Coffee Bar creates a more prominent hospitality presence. Both include professional barista service, espresso classics, hot and iced beverages, and an intentional presentation.",
    tone: "cafe",
  },
  {
    number: "02",
    label: "Matcha and specialty beverages",
    href: "/experiences/coffee-bar",
    title: "Colour, craft, and a menu guests remember.",
    description:
      "Matcha, signature drinks, seasonal collections, premium non-coffee beverages, and milk alternatives can shape a focused menu around the shower and its guests.",
    tone: "matcha",
  },
  {
    number: "03",
    label: "Live dessert",
    href: "/experiences/sweet-cart",
    title: "Dessert becomes part of the scene.",
    description:
      "Mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve can be prepared on-site with confirmed sauces, toppings, signage, and presentation details.",
    tone: "dessert",
  },
  {
    number: "04",
    label: "Seating and rentals",
    href: "/experiences/seating-rentals",
    title: "The setting holds the gathering together.",
    description:
      "Chairs, tables, cocktail tables, tents, linens, and lighting can support dining, conversation, games, gifts, photographs, and indoor or outdoor requirements.",
    tone: "setting",
  },
] as const;

export const bridalShowerDetails = [
  {
    number: "01",
    label: "The menu",
    title: "Menus and drinks",
    description:
      "Signature beverages, matcha, seasonal selections, milk alternatives, and menu displays can be tailored around the season, guest preferences, and celebration.",
  },
  {
    number: "02",
    label: "The presentation",
    title: "Signage and presentation",
    description:
      "Names, dates, wording, cups, menu displays, cart details, and dessert presentation can carry the selected visual direction. Floral accents may be discussed where they form part of the approved presentation scope.",
  },
  {
    number: "03",
    label: "The room",
    title: "The room around the service",
    description:
      "Chair styles, tables, linens, lighting, and service placement can be planned around conversation, photographs, gifts, and movement through the room.",
  },
] as const;

export const bridalShowerCombinations = [
  {
    number: "01",
    title: "The café shower",
    experiences: "Café Cart + matcha and specialty drinks",
    description:
      "A tailored beverage menu creates an intimate café rhythm for arrivals, conversation, and time around the table.",
  },
  {
    number: "02",
    title: "The interactive centrepiece",
    experiences: "Signature Coffee Bar + Sweet Cart",
    description:
      "Crafted beverages and live dessert form two complementary guest moments while contributing movement and presentation to the room.",
  },
  {
    number: "03",
    title: "The complete setting",
    experiences: "Coffee + Dessert + Seating and rentals",
    description:
      "Hospitality, sweetness, and selected room requirements support a fully considered setting from arrival through dessert.",
  },
] as const;

export const bridalShowerGallery = [
  {
    number: "01",
    label: "The café welcome",
    note: "Coffee and matcha service within the arrival or gathering setting.",
    tone: "table",
  },
  {
    number: "02",
    label: "The sweet moment",
    note: "Fresh dessert preparation and guest interaction.",
    tone: "sweet",
  },
  {
    number: "03",
    label: "The room",
    note: "Seating, tables, signage, linens, and atmosphere in context.",
    tone: "room",
  },
] as const;

export const bridalShowerPlanning = [
  {
    number: "01",
    title: "The gathering",
    description:
      "Share the date, venue, estimated guest count, schedule, and whether the shower will take place indoors or outdoors.",
  },
  {
    number: "02",
    title: "The experiences",
    description:
      "Identify whether coffee, matcha, live dessert, seating, rentals, or a coordinated combination should support the shower.",
  },
  {
    number: "03",
    title: "The setting",
    description:
      "Provide any available details about venue access, service footprint, power or water, delivery timing, setup, teardown, and venue requirements.",
  },
  {
    number: "04",
    title: "The personal details",
    description:
      "Share any preferred colours, wording, menu ideas, signage, presentation details, or rental selections.",
  },
] as const;

export const bridalShowerFaqs = [
  {
    question: "Which coffee experience is best for a bridal shower?",
    answer:
      "The Café Cart is suited to a more intimate, focused café setup, while the Signature Coffee Bar creates a fuller service presence. Guest count, venue, service duration, menu, and the role coffee should play determine the better fit.",
  },
  {
    question: "Can matcha and specialty beverages be included?",
    answer:
      "Yes. Matcha, two signature coffee drinks, one premium non-coffee beverage, hot and iced service, dairy, and premium milk alternatives are part of the confirmed Coffee Bar offering. Seasonal and custom menu possibilities are reviewed around the event.",
  },
  {
    question: "Which desserts work well for bridal showers?",
    answer:
      "Mini Dutch pancakes, Belgian waffles on a stick, and mini donuts all work well when the host wants a freshly prepared, guest-facing dessert moment. Soft serve is an optional enhancement. The best choice depends on the shower schedule, guest count, desired presentation, menu around it, and the service flow confirmed in the proposal.",
  },
  {
    question: "Can coffee and dessert be booked together?",
    answer:
      "Yes. Luxe Coffee Bar and Luxe Sweet Cart can be selected together. Their menus, placement, timing, staffing, setup, and service flow are coordinated through one inquiry and proposal journey.",
  },
  {
    question: "Can seating and event rentals be included?",
    answer:
      "Yes. Chairs, tables, cocktail tables, tents, linens, and lighting can be planned alongside coffee or dessert. Inventory, quantities, delivery, setup, teardown, pickup, access, and fees must be confirmed for the venue and date.",
  },
  {
    question: "Can menus and signage be customized?",
    answer:
      "Yes. Signature drinks, menu displays, custom cups, event signage, cart details, dessert presentation, and approved event wording can be discussed. Final possibilities depend on direction, production requirements, timing, and the selected experience.",
  },
  {
    question: "Does Luxe provide floral or event styling?",
    answer:
      "Floral styling and event styling are available possibilities. The exact creative direction, floral scope, sourcing, installation, rental styling, production timing, and responsibilities must be confirmed during planning rather than assumed as a fixed package.",
  },
  {
    question: "Can Luxe work with the host, planner, venue, or decorator?",
    answer:
      "Yes. Luxe can coordinate access, placement, service timing, setup, presentation, utilities, guest flow, and other confirmed event requirements with hosts, planners, coordinators, venues, decorators, and relevant vendors.",
  },
] as const;
