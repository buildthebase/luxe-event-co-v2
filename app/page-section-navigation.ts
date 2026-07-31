export type PageSectionNavigationItem = {
  id: string;
  label: string;
};

export const homeSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "luxe-family", label: "Luxe family" },
  { id: "reviews", label: "Reviews" },
  { id: "experience-selector", label: "The experience" },
  { id: "unified-experience", label: "Tailored events" },
  { id: "event-types", label: "Event types" },
  { id: "combinations", label: "Combinations" },
  { id: "contextual-imagery", label: "See Luxe in action" },
  { id: "operational-proof", label: "Our capabilities" },
  { id: "working-with-luxe", label: "Working with Luxe" },
  { id: "planning-journey", label: "Planning process" },
  { id: "service-area", label: "Service areas" },
  { id: "event-planning", label: "Plan your event" },
] as const;

export const experiencesSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "experience-selector", label: "Choose an experience" },
  { id: "booking-approach", label: "Booking approach" },
  { id: "experience-coffee", label: "Coffee Bar" },
  { id: "experience-dessert", label: "Sweet Cart" },
  { id: "experience-seating", label: "Seating Rentals" },
  { id: "experience-comparison", label: "Compare experiences" },
  { id: "combinations", label: "Combinations" },
  { id: "event-types", label: "Explore by event" },
  { id: "gallery", label: "See Luxe in action" },
  { id: "planning-journey", label: "Planning process" },
  { id: "event-planning", label: "Plan your event" },
] as const;

export const eventsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "event-led-approach", label: "The event-led approach" },
  { id: "event-pathways", label: "Event pathways" },
  { id: "combinations", label: "Combinations" },
  { id: "gallery", label: "See Luxe in action" },
  { id: "planning-journey", label: "Planning process" },
  { id: "event-planning", label: "Plan your event" },
] as const;
