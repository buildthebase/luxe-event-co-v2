import { notFound, permanentRedirect } from "next/navigation";
import { BabyShowersPage } from "../../components/baby-showers-page";
import { BrandActivationsPage } from "../../components/brand-activations-page";
import { BridalShowersPage } from "../../components/bridal-showers-page";
import { BirthdaysPage } from "../../components/birthdays-page";
import { CorporateEventsPage } from "../../components/corporate-events-page";
import { EventDetail } from "../../components/route-detail";
import { PrivateEventsPage } from "../../components/private-events-page";
import { WeddingsPage } from "../../components/weddings-page";
import { createPageMetadata, type PagePath } from "../../metadata-config";
import { eventTypes, getEventType, type EventSlug } from "../../site-config";

export function generateStaticParams() { return eventTypes.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getEventType(slug);

  if (!item) return {};
  return createPageMetadata(`/events/${slug}` as PagePath);
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (slug === "wedding") permanentRedirect("/events/weddings");
  if (!getEventType(slug)) notFound();
  if (slug === "weddings") return <WeddingsPage />;
  if (slug === "corporate-events") return <CorporateEventsPage />;
  if (slug === "brand-activations") return <BrandActivationsPage />;
  if (slug === "baby-showers") return <BabyShowersPage />;
  if (slug === "bridal-showers") return <BridalShowersPage />;
  if (slug === "birthdays") return <BirthdaysPage />;
  if (slug === "private-events") return <PrivateEventsPage />;
  return <EventDetail slug={slug as EventSlug} />;
}
