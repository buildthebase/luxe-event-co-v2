export type TestimonialPlacement = {
  id: string;
  path: string;
  context: string;
  status: "awaiting-approved-content" | "approved";
  requirement: string;
  publicationGate: string[];
};

const publicationGate = [
  "Approved quotation",
  "Approved attribution",
  "Confirmed event and service context",
  "Permission to publish",
] as const;

export const testimonialPlacements: TestimonialPlacement[] = [
  {
    id: "home-wedding-perspective",
    path: "/",
    context: "Wedding perspective",
    status: "awaiting-approved-content",
    requirement: "A concise wedding quotation connected to the services Luxe provided.",
    publicationGate: [...publicationGate],
  },
  {
    id: "home-corporate-perspective",
    path: "/",
    context: "Corporate perspective",
    status: "awaiting-approved-content",
    requirement: "A concise corporate quotation connected to the event or program delivered.",
    publicationGate: [...publicationGate],
  },
  {
    id: "weddings-client-perspective",
    path: "/events/weddings",
    context: "Wedding client perspective",
    status: "awaiting-approved-content",
    requirement: "Wedding feedback with enough context to identify the relevant Luxe experiences.",
    publicationGate: [...publicationGate],
  },
  {
    id: "corporate-client-perspective",
    path: "/events/corporate-events",
    context: "Corporate client perspective",
    status: "awaiting-approved-content",
    requirement: "Operationally specific feedback suitable for a corporate decision-maker.",
    publicationGate: [...publicationGate],
  },
];

export const testimonialRules = [
  "Never create, paraphrase, shorten, or improve a client quotation without approval.",
  "Named-organization permission does not imply testimonial or case-study permission.",
  "A testimonial must remain adjacent to the service, event, or proof context that makes it credible.",
  "If approved content is unavailable, retain the documented editorial slot rather than publishing generic praise.",
  "Only track testimonial interaction when the final presentation contains a genuine interactive control.",
] as const;

