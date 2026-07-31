export const directAnswerSequence = [
  {
    order: 1,
    element: "Immediate answer",
    requirement:
      "The first sentence answers the visible question or states the verified limitation without promotional setup.",
  },
  {
    order: 2,
    element: "Decision factors",
    requirement:
      "The answer identifies the event, service, commercial, or operational factors that can change the result.",
  },
  {
    order: 3,
    element: "Luxe handling",
    requirement:
      "The answer explains how Luxe reviews, confirms, coordinates, scopes, or records the requirement.",
  },
  {
    order: 4,
    element: "Relevant next step",
    requirement:
      "The question-led item or its containing question section provides a crawlable link to the definitive detail, shared FAQ, or inquiry step.",
  },
] as const;

export const directAnswerSurfaceRules = [
  {
    surface: "Main FAQ",
    implementation:
      "Each visible question opens directly onto its answer and carries one or more contextual links where a deeper service, event, or inquiry step is useful.",
  },
  {
    surface: "Service-page FAQ",
    implementation:
      "Each answer begins directly; the question section links to the shared FAQ, and the following contextual inquiry panel provides the conversion step.",
  },
  {
    surface: "Event-page FAQ",
    implementation:
      "Each answer begins directly; the question section links to shared booking FAQs, and the following contextual inquiry panel continues the event journey.",
  },
  {
    surface: "Question-led hub section",
    implementation:
      "The answer follows the heading or term immediately, with the next-step link inside the same section.",
  },
] as const;

export const extractableAnswerRules = [
  "Do not place a brand claim, scene-setting paragraph, or promotional preamble between a visible question and its answer.",
  "Use the first sentence for the direct answer, not for a restatement of the question.",
  "Where a fixed number or policy is unavailable, state that limitation immediately and name the factors Luxe reviews.",
  "Keep the answer self-contained enough to remain useful when extracted without the surrounding page.",
  "Use the answer's existing definitive page rather than linking to a duplicate explanation.",
  "A section-level next step is preferred over repeating the same link inside every accordion item.",
] as const;

export const directAnswerAudit = {
  questionLedStaticSections: [
    "/experiences",
    "/events",
    "/faq",
  ],
  faqContentOwners: [
    "/faq",
    "/experiences/coffee-bar",
    "/experiences/sweet-cart",
    "/experiences/seating-rentals",
    "/events/weddings",
    "/events/corporate-events",
    "/events/brand-activations",
    "/events/baby-showers",
    "/events/bridal-showers",
    "/events/birthdays",
    "/events/private-events",
  ],
  promotionalPreamblesBeforeAnswers: [] as string[],
  repeatedPerItemSectionLinks: [] as string[],
  newRoutes: [] as string[],
} as const;
