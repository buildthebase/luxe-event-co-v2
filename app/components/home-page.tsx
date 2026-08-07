import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
  HomeUnifiedExperience,
  HomeWorkingExperience,
} from "./home-sections";
import { HomeHero } from "./home-hero";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "./signature-elements";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { SiteShell } from "./site-shell";
import { homeSectionNavigation } from "../page-section-navigation";
import { pageMetadata } from "../metadata-config";
import { createHomePageSchema } from "../schema-builders";
import { HomeTestimonialCarousel } from "./home-testimonial-carousel";
import {
  signatureExperiences,
  type SignatureExperience,
} from "../signature-elements";

const homeSignatureExperiences: readonly SignatureExperience[] = [
  {
    ...signatureExperiences[0],
    name: "Luxe Coffee Bar: Mobile Espresso & Specialty Beverage Service",
    headingLead: "Luxe Coffee Bar:",
    headingDetail: "Mobile Espresso & Specialty Beverage Service",
    description:
      "Mobile espresso, matcha, and specialty beverage service for weddings, corporate arrivals, cocktail hours, and late-night hospitality across Toronto.",
    image: {
      ...signatureExperiences[0].image,
      alt: "Luxe mobile espresso and specialty beverage bar serving custom iced drinks at a Toronto event",
    },
  },
  {
    ...signatureExperiences[1],
    name: "Luxe Sweet Cart: Live Interactive Dessert Station",
    headingLead: "Luxe Sweet Cart:",
    headingDetail: "Live Interactive Dessert Station",
    description:
      "Live dessert preparation and interactive sweet cart experiences designed to create memorable moments for your guests.",
    image: {
      ...signatureExperiences[1].image,
      alt: "Luxe live interactive dessert cart station prepared for guests at a Toronto event",
    },
  },
  {
    ...signatureExperiences[2],
    name: "Luxe Seating Rentals: Wedding & Event Furniture Rentals",
    headingLead: "Luxe Seating Rentals:",
    headingDetail: "Wedding & Event Furniture Rentals",
    description:
      "High-quality chair rentals, dining tables, cocktail tables, event tents, linens, and venue lighting planned around your ceremony, reception, lounge, or outdoor setting.",
    image: {
      ...signatureExperiences[2].image,
      alt: "Luxe wedding chairs and event furniture rentals arranged for an outdoor Toronto reception",
    },
  },
];

const homePageSchema = createHomePageSchema({
  pageName: pageMetadata["/"].title,
  pageDescription: pageMetadata["/"].description,
});

export function HomePage() {
  return (
    <SiteShell>
      <main className="home-page">
        <JsonLd data={homePageSchema} />
        <PageSectionNavigation items={homeSectionNavigation} />
        <HomeHero />
        <HomePositioning />
        <div className="home-testimonial-placement">
          <HomeTestimonialCarousel />
        </div>
        <ExperienceSelector
          id="experience-selector"
          experiences={homeSignatureExperiences}
          heading="Our Core Event Experiences"
          showDescription={false}
        />
        <HomeUnifiedExperience />
        <HomeEventCategories />
        <CombinedExperienceFeature id="combinations" />
        <HomeSelectedImagery />
        <HomeTrust />
        <HomeWorkingExperience />
        <EventPlanningPathway id="planning-journey" showDescription={false} />
        <HomeServiceArea />
        <ContextualInquiryPanel id="event-planning" contextKey="home" />
      </main>
    </SiteShell>
  );
}
