import { imageAssets } from "../image-system";
import type { SignatureExperience } from "../signature-elements";

export const birthdayContexts = [
  {
    number: "01",
    title: "Milestone birthdays",
    description:
      "Significant birthdays can be planned around dinner, reception-style gatherings, open-house formats, or full celebrations with hospitality and room details shaped around the occasion.",
  },
  {
    number: "02",
    title: "Adult celebrations",
    description:
      "Coffee, matcha, signature drinks, live dessert, seating, and rentals can support daytime gatherings, cocktail-style events, dinners, lounges, and later-evening celebrations.",
  },
  {
    number: "03",
    title: "Family birthdays",
    description:
      "Balanced beverage and dessert options can support multigenerational gatherings where adults, younger guests, and families are celebrating together.",
  },
  {
    number: "04",
    title: "Select children’s birthdays",
    description:
      "For selected children’s celebrations, non-coffee drinks, live dessert, signage, and rentals can be planned around younger guests and accompanying adults.",
  },
] as const;

export const birthdayExperiences = [
  {
    id: "coffee",
    number: "01",
    label: "Coffee, matcha, and specialty beverages",
    name: "Luxe Coffee Bar",
    image: imageAssets.experiences.coffeeBar,
    href: "/experiences/coffee-bar",
    description:
      "Professional baristas prepare espresso classics, signature drinks, matcha, seasonal beverages, and premium non-coffee options for arrivals, conversation, dining, or later service.",
  },
  {
    id: "dessert",
    number: "02",
    label: "Live dessert prepared on-site",
    name: "Luxe Sweet Cart",
    image: imageAssets.experiences.sweetCart,
    href: "/experiences/sweet-cart",
    description:
      "Mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve create an interactive dessert experience for the guest of honour and their guests.",
  },
  {
    id: "seating",
    number: "03",
    label: "Seating and event rentals",
    name: "Luxe Seating Rentals",
    image: imageAssets.experiences.seatingRentals,
    href: "/experiences/seating-rentals",
    description:
      "Chairs, tables, cocktail tables, tents, linens, and lighting can support dining, standing celebrations, family gatherings, outdoor events, and the flow of the room.",
  },
] satisfies readonly SignatureExperience[];

export const birthdayPersonalization = [
  {
    number: "01",
    title: "Menus and flavours",
    description:
      "Signature drinks, matcha, seasonal beverages, non-coffee choices, dessert selections, sauces, and toppings can be tailored around the guest of honour and celebration.",
  },
  {
    number: "02",
    title: "Signage and presentation",
    description:
      "Names, milestone years, wording, cups, menu displays, cart details, and dessert presentation can carry the selected direction.",
  },
  {
    number: "03",
    title: "Seating and room details",
    description:
      "Seating, cocktail tables, linens, lighting, service placement, and guest flow can be planned around the venue and scale of the celebration.",
  },
] as const;

export const birthdayCombinations = [
  {
    number: "01",
    title: "The milestone café",
    experiences: "Signature Coffee Bar + beverage service",
    description:
      "A prominent beverage experience can anchor arrivals, dinner, conversation, or a later part of an adult celebration.",
  },
  {
    number: "02",
    title: "The interactive sweet moment",
    experiences: "Sweet Cart + live dessert service",
    description:
      "Live preparation creates a guest-facing focal point for family or milestone celebrations.",
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
  { number: "01", label: "The arrival", note: "Coffee, matcha, menus, and guest hospitality.", tone: "arrival" },
  { number: "02", label: "The sweet moment", note: "Live dessert, signage, toppings, and guest interaction.", tone: "centre" },
  { number: "03", label: "The room", note: "Seating, tables, lighting, and celebration atmosphere.", tone: "room" },
] as const;

export const birthdayPlanning = [
  {
    title: "The occasion",
    description:
      "Share the date, venue, age or milestone being celebrated, estimated guest count, schedule, and event format.",
  },
  {
    title: "The experiences",
    description:
      "Identify whether coffee, matcha, live dessert, seating, rentals, or a coordinated combination should support the celebration.",
  },
  {
    title: "The venue and service needs",
    description:
      "Provide available information about access, footprint, power or water, delivery timing, setup, teardown, and venue requirements.",
  },
  {
    title: "The personal direction",
    description:
      "Share preferred flavours, colours, wording, milestone details, signage, presentation ideas, or rental selections.",
  },
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
      "Children’s events can be planned where the occasion fits Luxe’s staffed, presentation-led service. Non-coffee beverages, live dessert, and selected rentals can be planned around the age group, venue, guest count, and host’s expectations.",
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
      "Yes. Any one service can be booked independently, and several can be coordinated through one Luxe Event Co. inquiry and proposal journey. Availability, timing, placement, staffing, rental scope, access, and venue requirements must be confirmed.",
  },
] as const;
