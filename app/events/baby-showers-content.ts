import { imageAssets } from "../image-system";
import type { CombinedExperience, SignatureExperience } from "../signature-elements";

export const babyShowerExperiences = [
  {
    id: "coffee",
    number: "01",
    label: "Coffee and matcha",
    name: "Luxe Coffee Bar",
    description:
      "Mobile espresso, matcha, and specialty beverages can create a polished welcome for arrivals, conversation, and time around the table.",
    href: "/experiences/coffee-bar",
    image: imageAssets.experiences.coffeeBar,
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert",
    name: "Luxe Sweet Cart",
    description:
      "Fresh dessert prepared in the room creates an interactive focal point for guests to gather around and enjoy together.",
    href: "/experiences/sweet-cart",
    image: imageAssets.experiences.sweetCart,
  },
  {
    id: "seating",
    number: "03",
    label: "Seating and rentals",
    name: "Luxe Seating Rentals",
    description:
      "Chairs, tables, cocktail tables, tents, linens, and lighting can shape the room around gifts, photographs, conversation, and guest flow.",
    href: "/experiences/seating-rentals",
    image: imageAssets.experiences.seatingRentals,
  },
] satisfies readonly SignatureExperience[];

export const babyShowerCombinations = [
  {
    id: "baby-shower-welcome",
    occasion: "A welcoming start",
    title: "Coffee Bar + Seating",
    description:
      "A considered arrival experience with comfortable places for guests to settle, connect, and begin the celebration.",
    href: "/inquire",
    experienceIds: ["coffee", "seating"],
  },
  {
    id: "baby-shower-sweet-moment",
    occasion: "A shared focal point",
    title: "Coffee Bar + Sweet Cart",
    description:
      "Crafted drinks and fresh dessert create two complementary hospitality moments within the gathering.",
    href: "/inquire",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "baby-shower-complete",
    occasion: "The complete gathering",
    title: "Coffee + Dessert + Rentals",
    description:
      "Welcome, sweetness, and the room setting can be coordinated through one baby shower inquiry and one considered plan.",
    href: "/inquire",
    experienceIds: ["coffee", "dessert", "seating"],
  },
] satisfies readonly CombinedExperience[];

export const babyShowerStyling = [
  {
    number: "01",
    title: "Menus and drinks",
    description:
      "Signature beverages, matcha, seasonal selections, milk alternatives, and menu displays can be tailored around the season, guest preferences, and celebration.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Names, wording, cups, menu displays, cart details, and dessert presentation can carry the selected visual direction.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "Seating, tables, linens, lighting, and service placement can be planned around conversation, gifts, photographs, and guest flow.",
  },
] as const;

export const babyShowerSettings = [
  {
    number: "01",
    title: "Indoor baby showers",
    description:
      "Home, venue, restaurant, studio, and private-room celebrations can be planned around access, available space, utilities, guest flow, and venue requirements.",
  },
  {
    number: "02",
    title: "Outdoor baby showers",
    description:
      "Coffee, dessert, seating, tables, tents, linens, and lighting can be considered for outdoor settings when weather planning, surface conditions, access, utilities, and a suitable contingency plan are confirmed.",
  },
] as const;

export const babyShowerGallery = [
  {
    number: "01",
    label: "The welcome",
    note: "Coffee or matcha service within the arrival and gathering setting.",
    tone: "welcome",
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
    note: "Seating, tables, linens, signage, and atmosphere in context.",
    tone: "gathering",
  },
] as const;

export const babyShowerPlanning = [
  {
    number: "01",
    title: "Event details",
    description:
      "Share the date, venue, estimated guest count, schedule, and whether the gathering will be indoors or outdoors.",
  },
  {
    number: "02",
    title: "Experience preferences",
    description:
      "Identify whether coffee, matcha, live dessert, seating, event rentals, or a coordinated combination should support the celebration.",
  },
  {
    number: "03",
    title: "Venue and setup needs",
    description:
      "Provide any available information about access, service footprint, power or water, delivery timing, setup, teardown, and venue requirements.",
  },
] as const;

export const babyShowerFaqs = [
  {
    question: "What baby shower services does Luxe provide?",
    answer:
      "Luxe provides mobile coffee and matcha service, live dessert preparation, and event rentals including chairs, tables, cocktail tables, tents, linens, and lighting. The right selection depends on the venue, guest count, schedule, and desired atmosphere.",
  },
  {
    question: "Can the Coffee Bar, Sweet Cart, and rentals be booked separately?",
    answer:
      "Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can each be booked independently or coordinated within one baby shower plan.",
  },
  {
    question: "What desserts can be prepared at a baby shower?",
    answer:
      "Luxe Sweet Cart can prepare mini Dutch pancakes, Belgian waffles on a stick, or mini donuts on-site. Soft serve is an optional enhancement. Dessert choices, sauces, toppings, quantities, and service format are confirmed during planning.",
  },
  {
    question: "Can drinks, menus, signage, and cups be personalized?",
    answer:
      "Yes. Signature beverages, menu displays, cups, signage, cart details, dessert presentation, and selected room details can be discussed. Final possibilities depend on the approved direction, production requirements, timing, and selected experience.",
  },
  {
    question: "Can Luxe support an outdoor baby shower?",
    answer:
      "Yes. Outdoor service can be considered when weather planning, surface conditions, access, utilities, equipment protection, guest comfort, and a suitable contingency plan are confirmed.",
  },
  {
    question: "What venue requirements are needed for mobile coffee service?",
    answer:
      "Requirements depend on the selected coffee format, menu, venue, and whether the event is indoors or outdoors. Luxe confirms the service footprint and any required power or water access during planning.",
  },
  {
    question: "Does Luxe provide delivery, setup, and teardown?",
    answer:
      "Setup and takedown are included with confirmed Coffee Bar and Sweet Cart experiences. Rental delivery, setup, teardown, pickup responsibilities, access requirements, and applicable fees are confirmed for the venue and order.",
  },
  {
    question: "Does Luxe serve baby showers outside Toronto?",
    answer:
      "Yes. Luxe primarily serves Toronto and the Greater Toronto Area, with select events available throughout Southern Ontario. Travel or delivery fees may apply.",
  },
  {
    question: "How many guests can Luxe serve?",
    answer:
      "Luxe Coffee Bar can support events of up to 500 guests, while Luxe Sweet Cart can support events of up to 400 guests. The final service plan also depends on duration, menu complexity, staffing, equipment, venue access, and guest flow.",
  },
  {
    question: "How far in advance should a baby shower be booked?",
    answer:
      "Earlier inquiries provide more flexibility, especially for peak dates, personalized details, rentals, or coordinated services. Availability and production timing depend on the event date, selected experiences, staffing, inventory, and venue requirements.",
  },
] as const;
