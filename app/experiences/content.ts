export type ExperienceHubFeature = {
  id: "coffee" | "dessert" | "seating";
  number: string;
  eyebrow: string;
  name: string;
  statement: string;
  description: string;
  details: readonly string[];
  fact: string;
  factLabel: string;
  href: `/experiences/${string}`;
  cta: string;
};

export const experienceHubFeatures: readonly ExperienceHubFeature[] = [
  {
    id: "coffee",
    number: "01",
    eyebrow: "Craft and hospitality",
    name: "Luxe Coffee Bar",
    statement: "A café experience, composed for the event.",
    description:
      "Luxe Coffee Bar brings professional barista service, handcrafted beverages, and a refined café atmosphere into weddings, corporate gatherings, activations, and private celebrations.",
    details: [
      "Café Cart or Signature Coffee Bar",
      "Hot and iced espresso beverages",
      "Signature drinks and premium non-coffee options",
      "Menus, cups, signage, and branding possibilities",
    ],
    fact: "Up to 500",
    factLabel: "confirmed guest capacity",
    href: "/experiences/coffee-bar",
    cta: "Explore Luxe Coffee Bar",
  },
  {
    id: "dessert",
    number: "02",
    eyebrow: "Live preparation and presentation",
    name: "Luxe Sweet Cart",
    statement: "Dessert prepared in the room, not delivered to the edge of it.",
    description:
      "Luxe Sweet Cart pairs made-to-order desserts with interactive service and carts designed to become part of the event décor.",
    details: [
      "Mini Dutch pancakes",
      "Belgian waffles on a stick",
      "Mini donuts",
      "Sauces, toppings, signage, and styling",
    ],
    fact: "Up to 400",
    factLabel: "confirmed guest capacity",
    href: "/experiences/sweet-cart",
    cta: "Explore Luxe Sweet Cart",
  },
  {
    id: "seating",
    number: "03",
    eyebrow: "Structure and atmosphere",
    name: "Luxe Seating Rentals",
    statement: "The setting that gives the gathering its shape.",
    description:
      "Luxe Seating Rentals considers how guests arrive, gather, dine, and move through the event, with rental elements selected around the room rather than presented as an inventory catalogue.",
    details: [
      "Chairs and tables",
      "Cocktail tables",
      "Tents and linens",
      "Lighting and event setup considerations",
    ],
    fact: "Room first",
    factLabel: "layout-led rental planning",
    href: "/experiences/seating-rentals",
    cta: "Explore Luxe Seating Rentals",
  },
] as const;

export const experienceNeedComparison = [
  {
    need: "Create a warm arrival",
    atmosphere: "Crafted, welcoming, conversational",
    experience: "Luxe Coffee Bar",
    href: "/experiences/coffee-bar",
  },
  {
    need: "Build a live guest moment",
    atmosphere: "Interactive, indulgent, visually staged",
    experience: "Luxe Sweet Cart",
    href: "/experiences/sweet-cart",
  },
  {
    need: "Define the room and its flow",
    atmosphere: "Architectural, composed, functional",
    experience: "Luxe Seating Rentals",
    href: "/experiences/seating-rentals",
  },
  {
    need: "Carry one atmosphere through the event",
    atmosphere: "Coordinated across hospitality, dessert, and setting",
    experience: "A combined Luxe experience",
    href: "/inquire",
  },
] as const;

export const experienceGalleryPreview = [
  {
    id: "coffee-service",
    number: "01",
    label: "Coffee in service",
    context: "Craft, hospitality, and guest interaction",
    tone: "coffee",
  },
  {
    id: "dessert-preparation",
    number: "02",
    label: "Dessert in preparation",
    context: "Made-to-order finishing, toppings, and guest interaction",
    tone: "dessert",
  },
  {
    id: "completed-setting",
    number: "03",
    label: "The completed setting",
    context: "Structure, material, and the room in use",
    tone: "seating",
  },
] as const;
