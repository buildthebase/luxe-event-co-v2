import { imageAssets, type ResponsiveImageAsset } from "./image-system";

export type SignatureExperience = {
  id: "coffee" | "dessert" | "seating";
  number: string;
  label: string;
  name: string;
  description: string;
  href: string;
};

export type CombinedExperienceNode = SignatureExperience["id"] | "signage";

export type CombinedExperience = {
  id: string;
  occasion: string;
  title: string;
  description: string;
  href: string;
  experienceIds: CombinedExperienceNode[];
};

export const signatureExperiences: SignatureExperience[] = [
  {
    id: "coffee",
    number: "01",
    label: "Coffee",
    name: "Luxe Coffee Bar",
    description: "Crafted pours, warm hospitality, and a café atmosphere shaped around the occasion.",
    href: "/experiences/coffee-bar",
  },
  {
    id: "dessert",
    number: "02",
    label: "Dessert",
    name: "Luxe Sweet Cart",
    description: "Mini pancakes, waffles, and donuts prepared on-site, finished to order, and served from the cart.",
    href: "/experiences/sweet-cart",
  },
  {
    id: "seating",
    number: "03",
    label: "Seating",
    name: "Luxe Seating Rentals",
    description: "Refined structure, elevated materials, and intentional space planning for gatherings of every scale.",
    href: "/experiences/seating-rentals",
  },
];

export type EventPlanningStep = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export const eventPlanningPathway: readonly EventPlanningStep[] = [
  {
    number: "01",
    title: "Choose the occasion.",
    description: "Start with the gathering, audience, setting, and atmosphere you are planning.",
    href: "/events",
  },
  {
    number: "02",
    title: "Select the experiences.",
    description: "Explore coffee, dessert, and seating independently or as one coordinated event experience.",
    href: "/experiences",
  },
  {
    number: "03",
    title: "Personalize the details.",
    description: "Shape the menu, presentation, service format, signage, and event-specific requirements.",
    href: "/faq",
  },
  {
    number: "04",
    title: "Open the conversation.",
    description: "Share the event context Luxe needs to prepare the right next conversation.",
    href: "/inquire",
  },
];

export const combinedExperiences: CombinedExperience[] = [
  {
    id: "bridal-shower",
    occasion: "Bridal shower",
    title: "Coffee Bar + Sweet Cart",
    description: "A warm arrival, a live dessert moment, and one unified presentation.",
    href: "/events/bridal-showers",
    experienceIds: ["coffee", "dessert"],
  },
  {
    id: "corporate-reception",
    occasion: "Corporate reception",
    title: "Coffee Bar + Seating",
    description: "Polished hospitality supported by a welcoming room designed for conversation.",
    href: "/events/corporate-events",
    experienceIds: ["coffee", "seating"],
  },
  {
    id: "wedding",
    occasion: "Wedding",
    title: "Coffee + Dessert + Rentals",
    description: "Barista service, dessert prepared in the room, and rentals planned around the wedding setting.",
    href: "/events/weddings",
    experienceIds: ["coffee", "dessert", "seating"],
  },
  {
    id: "product-launch",
    occasion: "Product launch",
    title: "Branded drinks + Signage",
    description: "A tactile brand moment carried through the menu, vessels, cart, and presentation.",
    href: "/events/brand-activations",
    experienceIds: ["coffee", "signage"],
  },
];

export type CredibilityOrganization = {
  name: string;
  permission: "pending-written-confirmation" | "approved";
  logo: ResponsiveImageAsset | null;
};

export const credibilityOrganizations: CredibilityOrganization[] = [
  {
    name: "OPTrust",
    permission: "approved",
    logo: imageAssets.credibilityLogos.optrust,
  },
  {
    name: "CST Savings",
    permission: "approved",
    logo: imageAssets.credibilityLogos.cstSavings,
  },
  {
    name: "Convergint",
    permission: "approved",
    logo: imageAssets.credibilityLogos.convergint,
  },
  {
    name: "ICNA Canada",
    permission: "approved",
    logo: imageAssets.credibilityLogos.icnaCanada,
  },
  {
    name: "Waste Connections of Canada",
    permission: "approved",
    logo: imageAssets.credibilityLogos.wasteConnectionsCanada,
  },
];

export type InquiryContext = {
  eyebrow: string;
  heading: string;
  description: string;
  cta: string;
  href: "/inquire";
};

export const inquiryContexts: Record<string, InquiryContext> = {
  home: {
    eyebrow: "Your event, shaped in full",
    heading: "Plan your event with Luxe.",
    description:
      "Share the occasion, location, guest count, and the experiences you are considering. Luxe will use that context to guide the right next conversation.",
    cta: "Plan Your Event",
    href: "/inquire",
  },
  default: {
    eyebrow: "Your gathering, thoughtfully shaped",
    heading: "Plan an experience with Luxe.",
    description:
      "Tell us what you are planning and which details matter most. We will use that context to guide the right next conversation.",
    cta: "Begin your inquiry",
    href: "/inquire",
  },
  experiences: {
    eyebrow: "One coordinated point of view",
    heading: "Bring the experiences together.",
    description:
      "Begin with one service or describe the complete atmosphere. Luxe will help connect the presentation, hospitality, and setting.",
    cta: "Plan your Luxe experience",
    href: "/inquire",
  },
  events: {
    eyebrow: "Begin with what you are planning",
    heading: "Find your event experience.",
    description:
      "Share the occasion, location, guest count, timing, and the kind of atmosphere you want to create. Luxe will use that context to guide the right combination of experiences.",
    cta: "Find Your Event Experience",
    href: "/inquire",
  },
  "coffee-bar": {
    eyebrow: "Crafted for your event",
    heading: "Inquire about coffee service.",
    description:
      "Share your occasion, guest count, service timing, beverage direction, and any presentation or branding requirements.",
    cta: "Inquire About Coffee Service",
    href: "/inquire",
  },
  "sweet-cart": {
    eyebrow: "Dessert, made part of the moment",
    heading: "Plan your dessert experience.",
    description:
      "Tell us about the occasion, guest count, dessert direction, presentation, and details you would like personalized.",
    cta: "Inquire About a Dessert Experience",
    href: "/inquire",
  },
  "seating-rentals": {
    eyebrow: "Shape the room",
    heading: "Discuss your seating requirements.",
    description:
      "Share the venue, guest count, event format, desired atmosphere, and the rental elements needed to complete the setting.",
    cta: "Discuss Your Rental Requirements",
    href: "/inquire",
  },
  weddings: {
    eyebrow: "Made for the full celebration",
    heading: "Plan your wedding experience.",
    description:
      "Tell us where coffee, dessert, and intentional seating could support the flow, atmosphere, and hospitality of the day.",
    cta: "Begin a wedding inquiry",
    href: "/inquire",
  },
  "corporate-events": {
    eyebrow: "Hospitality with purpose",
    heading: "Discuss a corporate event.",
    description:
      "Share the audience, schedule, venue, service needs, and brand requirements so Luxe can prepare a polished event direction.",
    cta: "Discuss a Corporate Event",
    href: "/inquire",
  },
  "brand-activations": {
    eyebrow: "Turn the brief into an experience",
    heading: "Create a branded experience.",
    description:
      "Tell us about the campaign, audience, timing, service format, and branded details that need to carry through the moment.",
    cta: "Create a Branded Experience",
    href: "/inquire",
  },
  "baby-showers": {
    eyebrow: "A beautiful beginning",
    heading: "Plan a baby shower experience.",
    description:
      "Share the setting, guest count, preferred experiences, and the details that should feel personal to the celebration.",
    cta: "Plan a Baby Shower",
    href: "/inquire",
  },
  "bridal-showers": {
    eyebrow: "Before the next chapter",
    heading: "Plan a bridal shower experience.",
    description:
      "Tell us how coffee, dessert, and the setting can come together around the host, guests, and atmosphere.",
    cta: "Plan a Bridal Shower",
    href: "/inquire",
  },
  birthdays: {
    eyebrow: "A milestone, made personal",
    heading: "Plan a birthday experience.",
    description:
      "Share the guest count, setting, preferred experiences, and personal details that should shape the celebration.",
    cta: "Plan a Birthday Experience",
    href: "/inquire",
  },
  "private-events": {
    eyebrow: "Gather in your own way",
    heading: "Discuss your private event.",
    description:
      "Tell us what you are celebrating and how coffee, dessert, or refined rentals could support the occasion.",
    cta: "Discuss Your Event",
    href: "/inquire",
  },
};

export const signatureElementPlacements = {
  home: {
    path: "/",
    status: "implemented-in-full-home-blueprint",
    modules: [
      "experience-selector",
      "combined-experience-feature",
      "credibility-strip",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Home blueprint replaces the temporary compact coming-soon composition.",
  },
  experiences: {
    path: "/experiences",
    status: "implemented-in-complete-experiences-blueprint",
    modules: [
      "experience-selector",
      "independent-or-combined-clarity",
      "experience-differentiation-features",
      "event-need-comparison",
      "combined-experience-feature",
      "relevant-event-paths",
      "gallery-preview",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Experiences Hub distinguishes each experience while preserving its relationship to Luxe Event Co.",
  },
  events: {
    path: "/events",
    status: "implemented-in-complete-events-blueprint",
    modules: [
      "event-led-approach",
      "event-pathways",
      "combined-experience-feature",
      "gallery-preview",
      "event-planning-pathway",
      "contextual-inquiry-panel",
    ],
    note: "The complete Events Hub begins with the occasion and then connects visitors to relevant Luxe experiences.",
  },
  corporateEvents: {
    path: "/events/corporate-events",
    status: "implemented-in-complete-corporate-events-blueprint",
    modules: ["credibility-strip", "contextual-inquiry-panel"],
  },
  brandActivations: {
    path: "/events/brand-activations",
    status: "implemented-in-complete-brand-activations-blueprint",
    modules: ["credibility-strip", "contextual-inquiry-panel"],
  },
} as const;
