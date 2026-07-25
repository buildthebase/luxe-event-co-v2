export type ComponentSystemStatus =
  | "complete"
  | "complete-specialized"
  | "shared-primitive"
  | "content-pending"
  | "not-required";

export type ComponentSystemEntry = {
  name: string;
  status: ComponentSystemStatus;
  implementation: string;
  contentSource: string;
  decision: string;
};

export const componentSystem: readonly ComponentSystemEntry[] = [
  {
    name: "Parent-brand hero",
    status: "complete-specialized",
    implementation: "app/components/home-hero.tsx",
    contentSource: "app/home-hero-media.ts and visible server-rendered Home content",
    decision:
      "The cinematic Home sequence remains purpose-built because its timing and media choreography do not belong on internal pages.",
  },
  {
    name: "Experience-specific hero",
    status: "complete-specialized",
    implementation:
      "CoffeeBarPage, SweetCartPage, and SeatingRentalsPage hero compositions",
    contentSource: "Typed division content modules and confirmed intake facts",
    decision:
      "The three divisions intentionally retain different visual systems. Shared action and proof patterns may be extracted later without creating one generic hero.",
  },
  {
    name: "Event-specific hero",
    status: "complete-specialized",
    implementation: "Event page components selected by app/components/route-detail.tsx",
    contentSource: "Typed event content modules",
    decision:
      "Event heroes share responsive rules and H1 scale while retaining occasion-specific art direction.",
  },
  {
    name: "Experience selector",
    status: "complete",
    implementation: "app/components/signature-elements.tsx",
    contentSource: "app/signature-elements.ts",
    decision: "One shared composition presents the three distinct divisions.",
  },
  {
    name: "Event selector",
    status: "complete",
    implementation: "app/components/events-hub.tsx",
    contentSource: "app/events/content.ts",
    decision: "The Events directory provides crawlable, event-led selection.",
  },
  {
    name: "Experience comparison",
    status: "complete",
    implementation: "app/components/experiences-hub.tsx",
    contentSource: "app/experiences/content.ts",
    decision: "Comparison is organized by event need and atmosphere.",
  },
  {
    name: "Included-features section",
    status: "complete-specialized",
    implementation: "Division page inclusion sections",
    contentSource: "Division-specific content modules",
    decision:
      "Coffee, dessert, and rentals do not share identical inclusion semantics, so their data remains separate.",
  },
  {
    name: "Menu or offering section",
    status: "complete-specialized",
    implementation: "Coffee, Sweet Cart, and Seating offering sections",
    contentSource: "Division-specific content modules",
    decision:
      "A shared catalogue component is intentionally avoided because Luxe is not positioned as a rental catalogue.",
  },
  {
    name: "Customization section",
    status: "complete-specialized",
    implementation: "Experience and activation customization sections",
    contentSource: "Division and event content modules",
    decision: "The visible structure follows the type of customization being explained.",
  },
  {
    name: "Process section",
    status: "complete",
    implementation: "EventPlanningPathway and page-specific operational sequences",
    contentSource: "app/signature-elements.ts and event content modules",
    decision:
      "The global explanatory pathway remains separate from operational inquiry requirements.",
  },
  {
    name: "Combined-experience section",
    status: "complete",
    implementation: "app/components/signature-elements.tsx",
    contentSource: "app/signature-elements.ts",
    decision: "Curated combinations remain event-led rather than generic packages.",
  },
  {
    name: "Trusted By section",
    status: "complete",
    implementation: "CredibilityStrip in app/components/signature-elements.tsx",
    contentSource: "Permission-gated organizations in app/signature-elements.ts",
    decision: "Only approved organization names and source logos are rendered.",
  },
  {
    name: "Testimonial section",
    status: "content-pending",
    implementation: "Reserved Home and Weddings testimonial placements",
    contentSource: "app/testimonial-system.ts",
    decision:
      "The reusable presentation remains permission-gated until quotations and attribution are approved.",
  },
  {
    name: "Gallery preview",
    status: "complete-specialized",
    implementation: "Page-specific, permission-gated gallery previews",
    contentSource: "Typed experience and event gallery arrays",
    decision:
      "Preview compositions remain art-directed to the page while all assets share the same approval boundary.",
  },
  {
    name: "Full gallery and filters",
    status: "complete",
    implementation: "app/components/gallery-collection.tsx",
    contentSource: "app/gallery/gallery-content.ts",
    decision: "Accessible client-side filters retain one canonical crawlable Gallery URL.",
  },
  {
    name: "FAQ accordion",
    status: "shared-primitive",
    implementation: "FaqAccordion in app/components/faq-accordion.tsx",
    contentSource: "Typed FAQ arrays for each page",
    decision:
      "One semantic details/summary primitive now owns repeated accordion behavior while page wrappers retain their visual identity.",
  },
  {
    name: "Service-area section",
    status: "complete-specialized",
    implementation: "Home and service-specific location sections",
    contentSource: "Central service areas in app/site-config.ts",
    decision:
      "The central location source is reused, with page copy limited to relevant service context.",
  },
  {
    name: "Contextual inquiry section",
    status: "complete",
    implementation: "ContextualInquiryPanel in app/components/signature-elements.tsx",
    contentSource: "inquiryContexts in app/signature-elements.ts",
    decision: "CTA language changes by visitor context and page purpose.",
  },
  {
    name: "Breadcrumb navigation",
    status: "shared-primitive",
    implementation:
      "BreadcrumbNavigation in app/components/breadcrumb-navigation.tsx and breadcrumb schema builders",
    contentSource: "Route-level breadcrumb definitions",
    decision:
      "The visual primitive is available for intentional placement; structured breadcrumbs remain centralized and complete.",
  },
  {
    name: "Social-share image template",
    status: "complete",
    implementation: "Central metadata helpers and approved public social images",
    contentSource: "app/site-config.ts and app/metadata-config.ts",
    decision:
      "All pages currently share the approved parent-brand image. A dynamic route template is unnecessary until page-specific approved imagery exists.",
  },
  {
    name: "Accessible modal or lightbox",
    status: "not-required",
    implementation: "None",
    contentSource: "Not applicable",
    decision:
      "No modal or lightbox is currently used. One should only be introduced when approved gallery media creates a real viewing need.",
  },
] as const;

export const reusableComponentRules = [
  "Reusable components receive typed visible content through props or centralized content records.",
  "Server Components remain the default; client boundaries are limited to interaction such as navigation, hero timing, and gallery filtering.",
  "Shared primitives own semantics and behavior, while page wrappers retain division- or event-specific art direction.",
  "No abstraction may turn the experience pages into interchangeable cards or a rental catalogue.",
  "Unapproved testimonials, case studies, photographs, inventory, prices, or operational claims remain visibly permission-gated.",
] as const;
