import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
  ExperienceSelector,
} from "../components/signature-elements";
import {
  ExperienceFeatures,
  ExperienceNeedComparison,
  ExperiencesBookingClarity,
  ExperiencesEventTypes,
  ExperiencesGalleryPreview,
  ExperiencesHero,
} from "../components/experiences-hub";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import { createCollectionPageSchema } from "../schema-builders";
import { experiences } from "../site-config";

export const metadata = createPageMetadata("/experiences");

const experiencesSchema = createCollectionPageSchema({
  path: "/experiences",
  pageName: pageMetadata["/experiences"].title,
  pageDescription: pageMetadata["/experiences"].description,
  collectionName: "Luxe Event Co. experiences",
  items: experiences.map((experience) => ({
    name: experience.name,
    path: experience.landingPath,
  })),
});

export default function ExperiencesPage() {
  return (
    <SiteShell breadcrumbPath="/experiences">
      <main className="experiences-page">
        <JsonLd data={experiencesSchema} />
        <ExperiencesHero
          titleLines={["Coffee, dessert,", "and seating.", "Distinct by design."]}
        />
        <ExperienceSelector id="experience-selector" />
        <ExperiencesBookingClarity />
        <ExperienceFeatures />
        <ExperienceNeedComparison />
        <CombinedExperienceFeature />
        <ExperiencesEventTypes />
        <ExperiencesGalleryPreview />
        <EventPlanningPathway />
        <ContextualInquiryPanel contextKey="experiences" />
      </main>
    </SiteShell>
  );
}
