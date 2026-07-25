import {
  HomeEventCategories,
  HomePositioning,
  HomeSelectedImagery,
  HomeServiceArea,
  HomeTrust,
  HomeUnifiedExperience,
  HomeWorkingExperience,
} from "./components/home-sections";
import { HomeHero } from "./components/home-hero";
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "./components/signature-elements";
import { JsonLd } from "./components/json-ld";
import { SiteShell } from "./components/site-shell";
import { createPageMetadata, pageMetadata } from "./metadata-config";
import { createHomePageSchema } from "./schema-builders";

export const metadata = createPageMetadata("/");

const homePageSchema = createHomePageSchema({
  pageName: pageMetadata["/"].title,
  pageDescription: pageMetadata["/"].description,
});

export default function Home() {
  return (
    <SiteShell>
      <main className="home-page">
        <JsonLd data={homePageSchema} />
        <HomeHero />
        <HomePositioning />
        <ExperienceSelector showDescription={false} />
        <HomeUnifiedExperience />
        <HomeEventCategories />
        <CombinedExperienceFeature />
        <HomeSelectedImagery />
        <HomeTrust />
        <HomeWorkingExperience />
        <EventPlanningPathway showDescription={false} />
        <HomeServiceArea />
        <ContextualInquiryPanel contextKey="home" />
      </main>
    </SiteShell>
  );
}
