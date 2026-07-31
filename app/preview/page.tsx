import type { Metadata } from "next";
import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
  HomeUnifiedExperience,
  HomeWorkingExperience,
} from "../components/home-sections";
import { HomeHero } from "../components/home-hero";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "../components/signature-elements";
import { JsonLd } from "../components/json-ld";
import { PageSectionNavigation } from "../components/page-section-navigation";
import { SiteShell } from "../components/site-shell";
import { pageMetadata } from "../metadata-config";
import { homeSectionNavigation } from "../page-section-navigation";
import { createHomePageSchema } from "../schema-builders";
import { HomeTestimonialCarousel } from "../components/home-testimonial-carousel";

export const metadata: Metadata = {
  title: `Website Preview | ${pageMetadata["/"].title}`,
  description: pageMetadata["/"].description,
  robots: {
    index: false,
    follow: false,
  },
};

const homePageSchema = createHomePageSchema({
  pageName: pageMetadata["/"].title,
  pageDescription: pageMetadata["/"].description,
});

export default function HomePreview() {
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
        <ExperienceSelector id="experience-selector" showDescription={false} />
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
