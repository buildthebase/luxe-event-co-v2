export const coffeeFormats = [
  {
    id: "cafe-cart",
    number: "01",
    name: "Luxe Café Cart Experience",
    shortName: "Café Cart",
    statement: "An intimate café point, brought into the gathering.",
    description:
      "A focused mobile café setup for occasions that call for warm hospitality without making the service feel oversized for the room.",
    eventFit: "Intimate gatherings, showers, private celebrations, and focused hospitality moments.",
    presence: "Compact, personal, and designed to sit naturally within the event.",
  },
  {
    id: "signature-bar",
    number: "02",
    name: "Luxe Signature Coffee Bar Experience",
    shortName: "Signature Coffee Bar",
    statement: "A full-service coffee bar with a stronger presence in the room.",
    description:
      "An expanded bar setup for weddings, corporate events, and activations where beverage service is intended to become a visible part of the room.",
    eventFit: "Weddings, corporate events, brand activations, and larger-format celebrations.",
    presence: "Expanded, high-impact, and shaped for a more prominent service moment.",
  },
] as const;

export const coffeeBookingIncludes = [
  "Choice of Café Cart Experience or Signature Coffee Bar",
  "Professional barista service",
  "Premium espresso equipment",
  "Four handcrafted espresso classics",
  "Hot and iced beverages",
  "Two signature coffee drinks",
  "One premium non-coffee beverage",
  "Dairy and premium milk alternatives",
  "Premium syrups and sauces",
  "Luxury menu display",
  "Setup and takedown",
  "Cups, lids, and serving essentials",
] as const;

export const espressoClassics = [
  "Espresso",
  "Americano",
  "Cappuccino",
  "Café Latte",
] as const;

export const signatureCoffeeCollection = [
  "Luxe Spanish Latte",
  "Brown Sugar Latte",
  "Vanilla Bean Latte",
  "White Mocha Velvet",
  "Tiramisu Latte",
  "Honey Lavender Latte",
] as const;

export const nonCoffeeCollection = [
  "Ceremonial Matcha Latte",
  "Strawberry Matcha",
  "Chai Latte",
  "Hot Chocolate",
] as const;

export const seasonalCoffeeCollections = [
  {
    season: "Spring",
    drinks: ["Lavender Honey Latte", "Rose Vanilla Latte", "Strawberry Matcha"],
  },
  {
    season: "Summer",
    drinks: [
      "Coconut Vanilla Latte",
      "Brown Sugar Shaken Latte",
      "Iced Spanish Latte",
      "Peach Matcha",
      "Espresso Tonic",
    ],
  },
  {
    season: "Autumn",
    drinks: [
      "Pumpkin Spice Latte",
      "Maple Cinnamon Latte",
      "Salted Caramel Latte",
      "Apple Crisp Latte",
    ],
  },
  {
    season: "Holiday",
    drinks: [
      "Peppermint Mocha",
      "Gingerbread Latte",
      "Toasted Marshmallow Latte",
      "White Chocolate Peppermint",
    ],
  },
] as const;

export const coffeeCustomization = [
  {
    number: "01",
    title: "Build the menu",
    description:
      "Select signature drinks, seasonal collections, matcha, and premium non-coffee beverages around the event and its guests.",
  },
  {
    number: "02",
    title: "Carry the identity",
    description:
      "Custom cups, event signage, cart branding, and menu displays can extend a wedding aesthetic, company identity, or campaign direction.",
  },
  {
    number: "03",
    title: "Style the service",
    description:
      "Floral styling and pastry-display possibilities can be considered as part of the presentation.",
  },
] as const;

export const coffeeEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Ceremony arrivals, cocktail hour, late-night coffee, and guest hospitality.",
  },
  {
    href: "/events/corporate-events",
    label: "Corporate Events",
    context: "Office cafés, conferences, employee appreciation, and client hosting.",
  },
  {
    href: "/events/brand-activations",
    label: "Brand Activations",
    context: "Branded drinks, launches, retail moments, and campaign experiences.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "A polished café moment for an intimate pre-wedding gathering.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Coffee, matcha, and specialty drinks presented around the celebration.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "A personalized beverage experience for milestone celebrations.",
  },
  {
    href: "/events/private-events",
    label: "Private Events",
    context: "Engagements, anniversaries, graduations, and gatherings of many kinds.",
  },
] as const;

export const coffeeGalleryPreview = [
  {
    number: "01",
    label: "The cart in context",
    note: "Approved event photography required",
    tone: "cart",
  },
  {
    number: "02",
    label: "Craft in service",
    note: "Approved barista photography required",
    tone: "service",
  },
  {
    number: "03",
    label: "The finished drink",
    note: "Approved beverage photography required",
    tone: "drink",
  },
] as const;

export const coffeeFaqs = [
  {
    question: "What is included with a Luxe Coffee Bar booking?",
    answer:
      "Every coffee booking includes the selected Café Cart or Signature Coffee Bar format, professional barista service, premium espresso equipment, four espresso classics, hot and iced service, two signature coffee drinks, one premium non-coffee beverage, dairy and premium milk alternatives, syrups and sauces, a menu display, serving essentials, setup, and takedown.",
  },
  {
    question: "What is the difference between the two coffee experiences?",
    answer:
      "The Café Cart is an intimate, focused café setup, while the Signature Coffee Bar creates a fuller and more prominent service presence. Both are complete Luxe experiences. Guest count, service duration, setting, and the role coffee should play in the event determine the better fit.",
  },
  {
    question: "Are iced drinks included?",
    answer:
      "Yes. Hot and iced beverages are included within the Luxe Coffee Bar experience rather than treated as separate service categories.",
  },
  {
    question: "Is matcha available?",
    answer:
      "Yes. Matcha is available within the premium non-coffee selection, including options such as a Ceremonial Matcha Latte and Strawberry Matcha. One premium non-coffee beverage is included and the menu is selected for the event.",
  },
  {
    question: "Are milk alternatives available?",
    answer:
      "Yes. Dairy and premium milk alternatives are included as part of the coffee experience.",
  },
  {
    question: "Can the menu, cups, and signage be customized?",
    answer:
      "Yes. Clients can personalize signature drinks, seasonal selections, menu displays, custom cups, event signage, and cart branding. Final possibilities are confirmed around the event direction and production requirements.",
  },
  {
    question: "Can pastries be added to the presentation?",
    answer:
      "Pastry-display possibilities can be considered as part of the coffee presentation. Availability and display details are confirmed during planning.",
  },
  {
    question: "How many guests can Luxe Coffee Bar serve?",
    answer:
      "Luxe Coffee Bar supports events of up to 500 guests and can support up to three simultaneous setups. Service duration, staffing, venue access, menu complexity, and event flow are considered before confirming the service plan.",
  },
  {
    question: "Is setup and teardown included?",
    answer:
      "Yes. Setup and takedown are included with the confirmed coffee experience. Exact access and timing requirements are coordinated for the venue and event schedule.",
  },
  {
    question: "Does Luxe Coffee Bar travel outside Toronto?",
    answer:
      "Yes. Luxe primarily serves Toronto and the Greater Toronto Area, with select destination events considered throughout Southern Ontario. Travel fees may apply.",
  },
  {
    question: "What space, power, or water access is required?",
    answer:
      "Requirements depend on the selected coffee format, menu, venue, and whether the event is indoors or outdoors. Luxe confirms the footprint and any required power or water access during planning; no universal utility or space specification should be assumed before the event details are reviewed.",
  },
] as const;
