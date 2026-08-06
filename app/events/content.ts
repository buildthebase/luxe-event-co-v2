export type EventHubEntry = {
  slug:
    | "weddings"
    | "corporate-events"
    | "brand-activations"
    | "baby-showers"
    | "bridal-showers"
    | "birthdays"
    | "private-events";
  number: string;
  name: string;
  cue: string;
  statement: string;
  summary: string;
};

export const eventHubEntries: EventHubEntry[] = [
  {
    slug: "weddings",
    number: "01",
    name: "Weddings",
    cue: "The full celebration",
    statement: "Hospitality carried through the celebration.",
    summary:
      "Coffee, live dessert, seating, and event rentals can be planned around the ceremony, cocktail hour, reception, and late-night service.",
  },
  {
    slug: "corporate-events",
    number: "02",
    name: "Corporate Events",
    cue: "Purposeful hospitality",
    statement: "Service shaped around the schedule.",
    summary:
      "For conferences, office gatherings, appreciation events, and other business occasions, Luxe can coordinate the experience around the audience, venue, timing, and brand environment.",
  },
  {
    slug: "brand-activations",
    number: "03",
    name: "Brand Activations",
    cue: "The brief, made tangible",
    statement: "An experience guests can see, taste, and remember.",
    summary:
      "Branded beverages, live dessert, presentation, signage, and event styling can translate campaign details into a guest-facing experience.",
  },
  {
    slug: "baby-showers",
    number: "04",
    name: "Baby Showers",
    cue: "A beautiful beginning",
    statement: "A welcoming setting for family and friends.",
    summary:
      "Coffee, freshly prepared dessert, seating, and rentals can create a comfortable setting shaped around the host, venue, and guest experience.",
  },
  {
    slug: "bridal-showers",
    number: "05",
    name: "Bridal Showers",
    cue: "Before the next chapter",
    statement: "A considered setting for the people closest to the couple.",
    summary:
      "Welcome drinks, live dessert, seating, and room details can be planned around conversation, photographs, and the flow of the gathering.",
  },
  {
    slug: "birthdays",
    number: "06",
    name: "Birthdays",
    cue: "A milestone, made personal",
    statement: "Built around the guest of honour.",
    summary:
      "Menus, dessert selections, presentation, seating, and event details can reflect the person being celebrated and the scale of the occasion.",
  },
  {
    slug: "private-events",
    number: "07",
    name: "Private Events",
    cue: "Gather in your own way",
    statement: "A complete experience for personal milestones.",
    summary:
      "Engagements, anniversaries, graduations, holiday gatherings, and other celebrations can combine one Luxe experience or bring several together.",
  },
];

export const eventLedPrinciples = [
  {
    number: "01",
    label: "Occasion",
    description: "Start with what is being celebrated, hosted, launched, or shared.",
  },
  {
    number: "02",
    label: "Guests",
    description: "Consider who is attending and how they will gather, move, and be served.",
  },
  {
    number: "03",
    label: "Flow",
    description: "Place each experience where it can support the rhythm of the event.",
  },
] as const;

export const eventsGalleryPreview = [
  {
    id: "wedding-hospitality",
    number: "01",
    label: "Wedding hospitality",
    context: "Coffee, dessert, and the setting in use",
    tone: "wedding",
  },
  {
    id: "corporate-service",
    number: "02",
    label: "Corporate service",
    context: "Guest interaction and branded presentation",
    tone: "corporate",
  },
  {
    id: "private-gathering",
    number: "03",
    label: "Private gathering",
    context: "Atmosphere, details, and room composition",
    tone: "private",
  },
] as const;
