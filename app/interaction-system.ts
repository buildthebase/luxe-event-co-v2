import { permanentRoutes } from "./responsive-system";

export type InteractionContract = {
  control: string;
  appliesTo: readonly string[];
  keyboard: string;
  hover: string;
  focus: string;
  loading: string;
  reducedMotion: string;
};

export const interactionContracts: InteractionContract[] = [
  {
    control: "Primary and footer navigation links",
    appliesTo: permanentRoutes,
    keyboard: "Native links follow document order and activate with Enter.",
    hover: "Text and rule treatment strengthen without moving surrounding layout.",
    focus: "A persistent two-pixel focus outline remains visible on every surface.",
    loading:
      "Navigation remains available during route transitions; no artificial loading overlay replaces the current page.",
    reducedMotion: "Colour and rule state remain, while transition duration is removed.",
  },
  {
    control: "Mobile navigation disclosure",
    appliesTo: permanentRoutes,
    keyboard:
      "The native summary toggles with Enter or Space; links remain in logical order.",
    hover: "The menu label and indicator receive the same restrained emphasis as navigation links.",
    focus: "The summary and every disclosed link receive an independent visible outline.",
    loading: "Not asynchronous; open and closed states are immediate and require no spinner.",
    reducedMotion: "The disclosure opens without animated translation.",
  },
  {
    control: "Experience selector and combined-experience links",
    appliesTo: ["/", "/experiences", "/events"],
    keyboard: "Every destination is a native link with a descriptive accessible name.",
    hover: "Local art, rule, and copy respond together without hiding adjacent choices.",
    focus: "Focus reproduces the hover emphasis and adds a visible outline.",
    loading:
      "All copy and destinations are server rendered; decorative art never becomes a loading gate.",
    reducedMotion: "Transforms and transitions are removed while the complete composition remains visible.",
  },
  {
    control: "Home cinematic hero",
    appliesTo: ["/"],
    keyboard: "Skip intro is keyboard operable and primary actions remain native links.",
    hover: "Only controls respond; decorative media does not require pointer interaction.",
    focus: "Skip intro and both actions receive visible focus treatment.",
    loading:
      "Intrinsic media frames reserve space. Missing media, autoplay rejection, or source failure retains the branded poster and advances to the final state.",
    reducedMotion:
      "The sequence resolves immediately to the cohesive poster with supporting copy and actions exposed.",
  },
  {
    control: "Gallery filters",
    appliesTo: ["/gallery"],
    keyboard: "Native buttons activate with Enter or Space and preserve source order.",
    hover: "The prospective filter receives a bounded contrast treatment.",
    focus: "A visible outline is paired with the same bounded treatment.",
    loading:
      "Filtering is synchronous client state, so no false spinner is shown; the updated result count is announced through a polite live status.",
    reducedMotion: "Results update without animated reordering.",
  },
  {
    control: "FAQ disclosures",
    appliesTo: ["/faq", "/experiences/coffee-bar", "/experiences/sweet-cart", "/experiences/seating-rentals", "/events/weddings", "/events/corporate-events", "/events/brand-activations", "/events/baby-showers", "/events/bridal-showers", "/events/birthdays", "/events/private-events"],
    keyboard: "Native summary controls toggle with Enter or Space.",
    hover: "The question and indicator strengthen together without changing document flow.",
    focus: "Each summary receives a visible outline independent of its open state.",
    loading: "Answers are present in HTML; opening a disclosure is immediate and never fetch-gated.",
    reducedMotion: "Answers open without animated height or scrolling.",
  },
  {
    control: "Contextual inquiry actions",
    appliesTo: permanentRoutes,
    keyboard: "Native links activate with Enter and use page-specific action language.",
    hover: "Border, arrow, and text receive one coordinated emphasis.",
    focus: "A high-contrast outline remains visible on light and dark inquiry panels.",
    loading:
      "The website keeps the visitor on the explanatory Inquire page until an approved third-party destination exists; a handoff must expose a clear pending or failure status when introduced.",
    reducedMotion: "The action remains immediately visible and uses no required reveal.",
  },
  {
    control: "Responsive imagery and reserved proof",
    appliesTo: permanentRoutes,
    keyboard: "Non-interactive images do not enter the tab order; linked image groups use descriptive links.",
    hover: "No information is revealed only by hovering an image.",
    focus: "Linked image groups expose focus on their associated destination.",
    loading:
      "The first meaningful gallery image is eager and prioritized; later images lazy load with reserved dimensions. Unsupplied or unapproved proof remains an explicit editorial placeholder.",
    reducedMotion: "Image movement and reveal transitions are removed.",
  },
];

export const interactionSystemRules = [
  "Do not invent loading indicators for synchronous controls.",
  "A loading state may never replace the accessible name, current value, or escape path of a control.",
  "Hover and focus communicate the same available action; hover-only meaning is prohibited.",
  "Focus styling must remain visible against ivory, taupe, dark, and photographic surfaces.",
  "Disabled states are used only for truly unavailable actions and must include adjacent explanatory text.",
  "Reduced motion changes choreography, never content, control availability, or route meaning.",
  "Do not obscure primary content with automatic overlays, promotional gates, or unnecessary full-screen interstitials.",
  "Do not disguise links or actions, manufacture urgency, or make a control perform an action its label does not describe.",
  "Do not trap, rewrite, or interfere with browser Back navigation.",
] as const;
