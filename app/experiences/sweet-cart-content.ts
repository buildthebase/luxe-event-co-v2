export const sweetCartCollections = [
  {
    id: "classic",
    number: "01",
    name: "The Classic Collection",
    character: "Sleek. Timeless. Versatile.",
    description:
      "A refined cart expression designed to sit quietly within the event styling while the live dessert preparation draws guests in.",
  },
  {
    id: "signature",
    number: "02",
    name: "The Signature Collection",
    character: "Bold. Elegant. A statement piece.",
    description:
      "A more prominent cart expression for events where the dessert setup is intended to become a visible part of the décor.",
  },
] as const;

export const dessertExperiences = [
  {
    id: "pancakes",
    number: "01",
    name: "Mini Dutch Pancakes",
    description:
      "Freshly prepared mini pancakes finished with selected sauces and toppings while guests watch.",
  },
  {
    id: "waffles",
    number: "02",
    name: "Belgian Waffles on a Stick",
    description:
      "A handheld Belgian waffle experience designed for live finishing and easy guest interaction.",
  },
  {
    id: "donuts",
    number: "03",
    name: "Mini Donuts",
    description:
      "Warm mini donuts prepared on-site, finished to order, and served while guests gather around the cart.",
  },
] as const;

export const dessertBookingIncludes = [
  "Choice of Classic or Signature dessert cart",
  "Fresh desserts prepared on-site",
  "Premium sauces",
  "Selection of standard toppings",
  "Styled cart presentation",
  "Professional attendants",
  "Setup and takedown",
  "Serving supplies",
  "Elegant menu display",
] as const;

export const dessertSauces = [
  "Belgian Milk Chocolate",
  "Belgian White Chocolate",
  "Nutella",
  "Caramel",
  "Strawberry",
  "Pure Maple Syrup",
] as const;

export const standardToppings = [
  "Milk Chocolate Chips",
  "White Chocolate Chips",
  "Crushed Oreos",
  "Brownies",
  "Chocolate Curls",
  "Sliced Bananas",
  "Rainbow Sprinkles",
  "M&M's",
  "Shredded Coconut",
  "Sliced Almonds",
  "Lotus Biscoff Cookies",
] as const;

export const premiumToppings = [
  "Freshly Sliced Strawberries",
  "Fresh Blueberries",
  "KitKat Bites",
  "Kinder Bueno",
  "Crushed Pistachios",
  "Crushed Pecans",
] as const;

export const sweetCustomization = [
  {
    number: "01",
    title: "Choose the dessert direction",
    description:
      "Select the dessert experience, sauces, standard toppings, premium toppings, and optional soft serve around the event.",
  },
  {
    number: "02",
    title: "Shape the presentation",
    description:
      "Choose the cart collection and coordinate the menu display, signage, styling, and visual details.",
  },
  {
    number: "03",
    title: "Carry the brand or occasion",
    description:
      "Custom signage and branding can connect the cart to a wedding aesthetic, celebration theme, or corporate identity.",
  },
] as const;

export const sweetEventLinks = [
  {
    href: "/events/weddings",
    label: "Weddings",
    context: "Cocktail hour, late-night sweets, and an interactive reception moment.",
  },
  {
    href: "/events/bridal-showers",
    label: "Bridal Showers",
    context: "Live dessert preparation, cart styling, and guest-facing service for an intimate celebration.",
  },
  {
    href: "/events/baby-showers",
    label: "Baby Showers",
    context: "Soft presentation, live preparation, and a menu guests can gather around.",
  },
  {
    href: "/events/birthdays",
    label: "Birthdays",
    context: "Made-to-order desserts personalized for milestone celebrations.",
  },
  {
    href: "/events/corporate-events",
    label: "Corporate Events",
    context: "Employee appreciation, office events, conferences, and client hospitality.",
  },
  {
    href: "/events/brand-activations",
    label: "Brand Activations",
    context: "A tactile branded moment with signage, styling, and live guest interaction.",
  },
  {
    href: "/events/private-events",
    label: "Private Events",
    context: "Engagements, anniversaries, graduations, and personal celebrations.",
  },
] as const;

export const sweetGalleryPreview = [
  {
    number: "01",
    label: "The cart as décor",
    note: "Approved event photography required",
    tone: "cart",
  },
  {
    number: "02",
    label: "Prepared in the moment",
    note: "Approved preparation photography required",
    tone: "preparation",
  },
  {
    number: "03",
    label: "Finished for the guest",
    note: "Approved dessert photography required",
    tone: "finish",
  },
] as const;

export const sweetCartFaqs = [
  {
    question: "Which desserts are available?",
    answer:
      "Luxe Sweet Cart offers Mini Dutch Pancakes, Belgian Waffles on a Stick, and Mini Donuts. Soft Serve Ice Cream is available as an optional enhancement.",
  },
  {
    question: "Are desserts prepared on-site?",
    answer:
      "Yes. The core dessert experiences are freshly prepared on-site and finished for guests with the selected sauces and toppings.",
  },
  {
    question: "Which sauces and toppings are included?",
    answer:
      "Every dessert experience includes premium sauces and a selection of standard toppings. The available sauce collection includes Belgian milk chocolate, Belgian white chocolate, Nutella, caramel, strawberry, and pure maple syrup. The final included selection is confirmed for the event.",
  },
  {
    question: "Are premium toppings available?",
    answer:
      "Yes. Premium toppings such as fresh strawberries, blueberries, KitKat Bites, Kinder Bueno, crushed pistachios, and crushed pecans are available as enhancements.",
  },
  {
    question: "Can multiple dessert types be combined?",
    answer:
      "Multiple dessert types can be requested. Because every combination is not defined as a standard inclusion, Luxe confirms the available pairing, equipment, staffing, and service format in the event proposal.",
  },
  {
    question: "Is soft serve available?",
    answer:
      "Yes. Soft Serve Ice Cream is available as an optional add-on to a Sweet Cart experience.",
  },
  {
    question: "Can the Sweet Cart setup be branded?",
    answer:
      "Yes. Custom signage and branding can be considered alongside the selected cart, menu display, dessert direction, and event styling.",
  },
  {
    question: "How many guests can Luxe Sweet Cart serve?",
    answer:
      "Luxe Sweet Cart supports events of up to 400 guests and can support up to three simultaneous setups. Dessert selection, service duration, staffing, venue access, and event flow are reviewed before the service plan is confirmed.",
  },
  {
    question: "Is setup and teardown included?",
    answer:
      "Yes. Setup and takedown are included with the confirmed dessert experience. Exact access and timing requirements are coordinated around the venue and event schedule.",
  },
  {
    question: "Which events are best suited to Luxe Sweet Cart?",
    answer:
      "Sweet Cart is suited to weddings, bridal and baby showers, birthdays, corporate events, brand activations, and private celebrations where live preparation and a visually considered dessert moment add to the atmosphere.",
  },
] as const;
