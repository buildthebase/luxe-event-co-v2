import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  EventPlanningPathway,
} from "../components/signature-elements";
import {
  EventsApproach,
  EventsDirectory,
  EventsGalleryPreview,
  EventsHero,
} from "../components/events-hub";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { eventHubEntries } from "./content";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import { createCollectionPageSchema } from "../schema-builders";

export const metadata = createPageMetadata("/events");

const eventsSchema = createCollectionPageSchema({
  path: "/events",
  pageName: pageMetadata["/events"].title,
  pageDescription: pageMetadata["/events"].description,
  collectionName: "Luxe Event Co. event pathways",
  items: eventHubEntries.map((event) => ({
    name: event.name,
    path: `/events/${event.slug}`,
  })),
});

export default function EventsPage() {
  return (
    <SiteShell breadcrumbPath="/events">
      <main className="events-page">
        <JsonLd data={eventsSchema} />
        <EventsHero titleLines={["Event experiences,", "shaped by the occasion."]} />
        <EventsApproach />
        <EventsDirectory />
        <CombinedExperienceFeature />
        <EventsGalleryPreview />
        <EventPlanningPathway showDescription={false} />
        <ContextualInquiryPanel contextKey="events" />
      </main>
    </SiteShell>
  );
}
