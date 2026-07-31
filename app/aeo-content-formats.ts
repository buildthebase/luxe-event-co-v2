export const approvedAnswerFormats = [
  "Concise answer paragraph",
  "Side-by-side decision cards",
  "Step-by-step process",
  "Planning checklist",
  "Cost-factor panel",
  "What is included list",
  "Best-suited-for links",
  "Capacity summary",
  "Logistics summary",
  "Timeline",
  "Real event example",
  "Contextual FAQ",
  "Meaningful image caption",
  "Related-service links",
] as const;

export const contentFormatAssignments = [
  {
    questionTheme: "What the service is and how it works",
    routes: [
      "/experiences",
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    format: "Concise answer paragraph",
    placement: "Visible service overview",
    rationale:
      "Definitions are easiest to extract and understand when stated directly in primary page copy.",
  },
  {
    questionTheme: "Which service format or dessert format fits the event",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    format: "Side-by-side decision cards",
    placement: "Visible selection section",
    rationale:
      "Two or three choices need contextual differences and mobile-friendly scanning more than a dense table.",
  },
  {
    questionTheme: "How the event or service is planned",
    routes: [
      "/events/weddings",
      "/events/corporate-events",
      "/events/brand-activations",
      "/events/private-events",
      "/experiences/seating-rentals",
    ],
    format: "Step-by-step process",
    placement: "Visible planning sequence",
    rationale:
      "Ordered stages make dependencies and handoffs clearer than an unstructured paragraph.",
  },
  {
    questionTheme: "What Luxe needs to prepare a rental proposal",
    routes: ["/experiences/seating-rentals"],
    format: "Planning checklist",
    placement: "Visible quote-preparation section",
    rationale:
      "A checklist lets the client gather concrete inputs before beginning an inquiry.",
  },
  {
    questionTheme: "How each service is priced",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    format: "Cost-factor panel",
    placement: "Visible operational section",
    rationale:
      "Commercially important answers remain visible and lead with the actual quote factors before inquiry.",
  },
  {
    questionTheme: "What is included",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    format: "What is included list",
    placement: "Visible service content",
    rationale:
      "Lists separate confirmed inclusions from event-specific rental responsibilities.",
  },
  {
    questionTheme: "Which events are a good fit",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
    ],
    format: "Best-suited-for links",
    placement: "Visible event pathways",
    rationale:
      "Event-specific links answer suitability briefly and continue to the definitive planning page.",
  },
  {
    questionTheme: "Capacity and simultaneous service",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
    ],
    format: "Capacity summary",
    placement: "Visible hero proof and operational summary",
    rationale:
      "Confirmed limits are prominent while variable throughput and staffing remain qualified.",
  },
  {
    questionTheme: "Venue, utility, access, weather, and service logistics",
    routes: [
      "/experiences/coffee-bar",
      "/experiences/sweet-cart",
      "/experiences/seating-rentals",
      "/events",
      "/events/weddings",
    ],
    format: "Logistics summary",
    placement: "Visible operational or coordination section",
    rationale:
      "Grouped constraints help planners evaluate feasibility without inventing universal specifications.",
  },
  {
    questionTheme: "When an experience can fit into an event",
    routes: ["/events/weddings"],
    format: "Timeline",
    placement: "Visible wedding-day sequence",
    rationale:
      "Chronological moments answer timing questions without turning them into fixed packages.",
  },
  {
    questionTheme: "Secondary booking and edge-case questions",
    routes: [
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
    format: "Contextual FAQ",
    placement: "Accordion after primary content",
    rationale:
      "Accordions contain secondary detail after priority definitions, comparisons, pricing, inclusions, and logistics remain visible.",
  },
  {
    questionTheme: "What the service looks like in context",
    routes: ["/gallery", "/events", "/experiences"],
    format: "Meaningful image caption",
    placement: "Visible gallery figures",
    rationale:
      "Captions should explain service, setting, or guest-use context rather than repeat filenames or decorative labels.",
  },
  {
    questionTheme: "Which complementary service or event page comes next",
    routes: ["/experiences", "/events"],
    format: "Related-service links",
    placement: "Visible contextual pathway",
    rationale:
      "Crawlable links continue the decision without repeating the complete answer.",
  },
] as const;

export const deferredAnswerFormats = [
  {
    format: "Comparison table",
    status: "Not selected for current priority comparisons",
    reason:
      "Current comparisons involve two or three nuanced options. Existing side-by-side cards retain decision context and recompose more cleanly on mobile.",
    reconsiderWhen:
      "A stable set of at least three options has several exact, repeated attributes that benefit from row-by-row comparison.",
  },
  {
    format: "Real event example",
    status: "First-party evidence required",
    reason:
      "No example should be written until Luxe has approved event facts, imagery, permissions, and a result or planning lesson that can be represented accurately.",
    reconsiderWhen:
      "A publishable event record includes the event context, selected service, operating details, approved media, and permission.",
  },
] as const;

export const contentFormatAudit = {
  priorityAnswersInsideAccordions: [] as string[],
  inventedRealEventExamples: [] as string[],
  newRoutes: [] as string[],
  duplicatedDefinitiveAnswers: [] as string[],
} as const;
