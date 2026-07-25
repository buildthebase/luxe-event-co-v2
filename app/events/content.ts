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
    statement: "Hospitality woven through the day.",
    summary:
      "Coffee, live dessert, and a considered setting can support the ceremony, cocktail hour, reception, or late-night flow without competing with the celebration.",
  },
  {
    slug: "corporate-events",
    number: "02",
    name: "Corporate Events",
    cue: "Purposeful hospitality",
    statement: "Professional in service. Designed around the room and schedule.",
    summary:
      "For conferences, office events, appreciation programs, and multi-day gatherings, Luxe can shape the service around the schedule, audience, and brand environment.",
  },
  {
    slug: "brand-activations",
    number: "03",
    name: "Brand Activations",
    cue: "The brief, made tangible",
    statement: "An experience people can see, taste, and remember.",
    summary:
      "Branded beverages, dessert presentation, signage, menus, and event styling can carry campaign details into a guest-facing moment.",
  },
  {
    slug: "baby-showers",
    number: "04",
    name: "Baby Showers",
    cue: "A beautiful beginning",
    statement: "Soft details with room for people to gather.",
    summary:
      "Coffee, freshly prepared dessert, and considered rentals can create an inviting setting for hosts, families, and guests.",
  },
  {
    slug: "bridal-showers",
    number: "05",
    name: "Bridal Showers",
    cue: "Before the next chapter",
    statement: "A little ceremony of its own.",
    summary:
      "The shower can move from welcome drinks to live dessert and a room designed around conversation, photographs, and the people closest to the couple.",
  },
  {
    slug: "birthdays",
    number: "06",
    name: "Birthdays",
    cue: "A milestone, made personal",
    statement: "Built around the person, not a standard party format.",
    summary:
      "Menus, dessert choices, presentation, and room details can respond to the guest of honour and the scale of the celebration.",
  },
  {
    slug: "private-events",
    number: "07",
    name: "Private Events",
    cue: "Gather in your own way",
    statement: "For occasions that deserve their own atmosphere.",
    summary:
      "Engagements, anniversaries, graduations, holiday gatherings, and other milestones can begin with one Luxe experience or bring several together.",
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
    label: "Audience",
    description: "Consider who is gathering and how hospitality should meet them.",
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
