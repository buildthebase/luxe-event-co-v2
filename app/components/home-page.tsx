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
          heading="Three experiences, each with a clear role."
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
