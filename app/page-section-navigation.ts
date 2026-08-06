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
  { id: "booking-approach", label: "Booking approach" },
  { id: "experience-coffee", label: "Coffee Bar" },
  { id: "experience-dessert", label: "Sweet Cart" },
  { id: "experience-seating", label: "Seating Rentals" },
  { id: "experience-comparison", label: "Plan your event" },
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

export const coffeeBarSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "coffee-overview-title", label: "The experience" },
  { id: "coffee-formats", label: "Coffee experiences" },
  { id: "coffee-inclusions-title", label: "What is included" },
  { id: "coffee-menu-title", label: "Coffee menu" },
  { id: "coffee-pricing", label: "Pricing" },
  { id: "coffee-events-title", label: "Event types" },
  { id: "coffee-gallery-title", label: "Gallery" },
  { id: "coffee-related-title", label: "Pair experiences" },
  { id: "coffee-faq-title", label: "Questions" },
] as const;

export const sweetCartSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "sweet-positioning-title", label: "The experience" },
  { id: "sweet-collections-title", label: "Cart styles" },
  { id: "dessert-experiences", label: "Dessert menu" },
  { id: "sweet-inclusions-title", label: "What is included" },
  { id: "sweet-pantry-title", label: "Sauces and toppings" },
  { id: "sweet-customization-title", label: "Customization" },
  { id: "sweet-operations-title", label: "Pricing" },
  { id: "sweet-events-title", label: "Event types" },
  { id: "sweet-gallery-title", label: "Gallery" },
  { id: "sweet-combinations-title", label: "Pair experiences" },
  { id: "sweet-faq-title", label: "Questions" },
] as const;

export const seatingRentalsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "seating-overview-title", label: "The experience" },
  { id: "rental-categories", label: "Rental categories" },
  { id: "seating-studies-title", label: "Layout planning" },
  { id: "seating-applications-title", label: "Indoor and outdoor" },
  { id: "seating-operations-title", label: "Operations" },
  { id: "seating-events-title", label: "Event types" },
  { id: "seating-pricing-title", label: "Pricing" },
  { id: "seating-gallery-title", label: "Gallery" },
  { id: "seating-combinations-title", label: "Pair experiences" },
  { id: "seating-faq-title", label: "Questions" },
] as const;

export const weddingsSectionNavigation: readonly PageSectionNavigationItem[] = [
  { id: "page-overview", label: "Back to top" },
  { id: "wedding-overview-title", label: "The wedding experience" },
  { id: "wedding-day-title", label: "Wedding-day possibilities" },
  { id: "wedding-experiences", label: "Three experiences" },
  { id: "wedding-customization-title", label: "Personalization" },
  { id: "wedding-coordination-title", label: "Planning and logistics" },
  { id: "wedding-gallery-title", label: "Gallery" },
  { id: "wedding-faq-title", label: "Questions" },
  { id: "wedding-inquiry", label: "Plan your wedding" },
] as const;
