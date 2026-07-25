export const birthdayContexts = [
  {
    number: "01",
    title: "Milestone birthdays",
    statement: "Give the year its own atmosphere.",
    description:
      "Significant birthdays can be shaped around a dinner, reception, open-house format, or full celebration with hospitality and room details considered together.",
  },
  {
    number: "02",
    title: "Adult celebrations",
    statement: "Designed beyond the standard party formula.",
    description:
      "Coffee, matcha, signature drinks, live dessert, and a composed setting can support cocktail-style gatherings, dinners, lounges, and late-evening celebrations.",
  },
  {
    number: "03",
    title: "Family events",
    statement: "Something considered for every generation.",
    description:
      "A balanced beverage and dessert direction can create clear choices for adults, younger guests, and families gathering around the same milestone.",
  },
  {
    number: "04",
    title: "Children’s events",
    statement: "Playful details, held to the Luxe standard.",
    description:
      "Where the event aligns with Luxe’s presentation-led service, non-coffee beverages, live dessert, toppings, signage, and selected rentals can be planned around younger guests without reframing the brand as a children’s-party service.",
  },
] as const;

export const birthdayExperienceMenu = [
  {
    number: "01",
    name: "Coffee and non-coffee menus",
    href: "/experiences/coffee-bar",
    description:
      "Espresso classics, two signature coffee drinks, matcha, tea, chai, hot chocolate, hot and iced service, milk alternatives, seasonal collections, and event-specific menu possibilities.",
    note:
      "The Café Cart or Signature Coffee Bar is selected around the venue, guest count, service duration, and intended role in the celebration.",
  },
  {
    number: "02",
    name: "Live dessert",
    href: "/experiences/sweet-cart",
    description:
      "Mini Dutch pancakes, Belgian waffles on a stick, or mini donuts prepared on-site with premium sauces, standard toppings, available premium toppings, and optional soft serve.",
    note:
      "Final selections, quantities, combinations, staffing, and service format are confirmed in the proposal.",
  },
  {
    number: "03",
    name: "Rentals and the room",
    href: "/experiences/seating-rentals",
    description:
      "Chairs, tables, cocktail tables, tents, linens, and lighting can support milestone dinners, standing celebrations, family gatherings, and outdoor events.",
    note:
      "Inventory, quantities, delivery, setup, teardown, access, and fees require event-specific confirmation.",
  },
] as const;

export const birthdayPersonalization = [
  {
    number: "01",
    title: "A menu with personality",
    description:
      "Signature drinks, seasonal beverages, non-coffee choices, dessert selections, sauces, and toppings can respond to the guest of honour and the celebration format.",
  },
  {
    number: "02",
    title: "Custom signage",
    description:
      "Approved names, milestone years, phrases, colours, menu language, and event details can be considered across signage, cups, menu displays, and cart presentation.",
  },
  {
    number: "03",
    title: "A setting that fits the scale",
    description:
      "Seating, tables, cocktail-height moments, tents, linens, lighting, cart placement, and guest flow can be reviewed around the room rather than selected in isolation.",
  },
] as const;

export const birthdayCombinations = [
  {
    number: "01",
    title: "The milestone café",
    experiences: "Signature Coffee Bar + personalized menu",
    description:
      "A prominent beverage experience can anchor arrivals, dinner, conversation, or a later part of an adult celebration.",
  },
  {
    number: "02",
    title: "The interactive sweet moment",
    experiences: "Sweet Cart + custom signage",
    description:
      "Live preparation, selected toppings, and event-specific presentation create a guest-facing focal point for family or milestone celebrations.",
  },
  {
    number: "03",
    title: "The complete birthday setting",
    experiences: "Coffee + Dessert + Rentals",
    description:
      "Beverage service, live dessert, and selected room requirements can be coordinated through one Luxe Event Co. inquiry and proposal journey.",
  },
] as const;

export const birthdayGallery = [
  { number: "01", label: "The arrival", note: "Coffee, matcha, menus, and guest hospitality", tone: "arrival" },
  { number: "02", label: "The centrepiece", note: "Live dessert, signage, toppings, and interaction", tone: "centre" },
  { number: "03", label: "The room in use", note: "Rental layout, lighting, and celebration atmosphere", tone: "room" },
] as const;

export const birthdayFaqs = [
  {
    question: "Does Luxe support milestone and adult birthday celebrations?",
    answer:
      "Yes. Milestone birthdays, adult celebrations, dinners, cocktail-style gatherings, and family events can be planned around the venue, guests, schedule, and selected Luxe experiences.",
  },
  {
    question: "Does Luxe provide service for children’s birthdays?",
    answer:
      "Children’s events can be considered where the occasion fits Luxe’s staffed, presentation-led service. Non-coffee beverages, live dessert, toppings, signage, and selected rentals can be planned around the age group, venue, guest count, and host’s expectations.",
  },
  {
    question: "Which non-coffee beverages are available?",
    answer:
      "The Coffee Bar offers premium non-coffee choices including ceremonial matcha latte, strawberry matcha, chai latte, and hot chocolate. One premium non-coffee beverage is included within the confirmed Coffee Bar experience, with final menu selections made for the event.",
  },
  {
    question: "Which birthday desserts are available?",
    answer:
      "Luxe Sweet Cart offers mini Dutch pancakes, Belgian waffles on a stick, and mini donuts prepared on-site. Soft serve is an optional enhancement. Sauces, standard toppings, premium toppings, quantities, and service format are confirmed in the proposal.",
  },
  {
    question: "Can coffee, dessert, and rentals be combined?",
    answer:
      "Yes. Any one division can be booked independently, and several can be coordinated through one Luxe Event Co. inquiry and proposal journey. Availability, timing, placement, staffing, rental scope, access, and venue requirements must be confirmed.",
  },
  {
    question: "Can birthday signage and menus be customized?",
    answer:
      "Yes. Signature drinks, menu displays, custom cups, event signage, milestone wording, cart details, dessert presentation, and other visual elements can be discussed. Final possibilities depend on the approved direction, timing, production requirements, and selected experiences.",
  },
  {
    question: "Is setup and takedown included?",
    answer:
      "Setup and takedown are included for confirmed Coffee Bar and Sweet Cart experiences. Rental delivery, setup, teardown, pickup, access, labour, and fees are defined in the proposal.",
  },
  {
    question: "What information is needed to plan a birthday experience?",
    answer:
      "Share the date, venue, guest estimate, age or milestone context, indoor or outdoor setting, schedule, selected experiences, dietary or menu considerations, rental needs, access details, and any signage or personalization direction.",
  },
] as const;
