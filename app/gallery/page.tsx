import Link from "next/link";
import { GalleryCollection } from "../components/gallery-collection";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { approvedGalleryImages } from "./gallery-content";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";

const galleryUrl = `${siteConfig.url}/gallery`;

export const metadata = createPageMetadata("/gallery");

const gallerySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["CollectionPage", "WebPage"],
      "@id": pageEntityId("/gallery", "webpage"),
      url: galleryUrl,
      name: pageMetadata["/gallery"].title,
      description: pageMetadata["/gallery"].description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/gallery", "breadcrumb") },
      inLanguage: siteConfig.language,
      ...(approvedGalleryImages.length > 0
        ? {
            associatedMedia: approvedGalleryImages.map((item) => ({
              "@id": pageEntityId("/gallery", `image-${item.id}`),
            })),
          }
        : {}),
    },
    createBreadcrumbSchema("/gallery"),
    ...approvedGalleryImages.map((item) => ({
      "@type": "ImageObject",
      "@id": pageEntityId("/gallery", `image-${item.id}`),
      contentUrl: `${siteConfig.url}${item.src}`,
      caption: item.caption,
      description: item.alt,
      width: item.width,
      height: item.height,
      representativeOfPage: Boolean(item.priority),
      isPartOf: { "@id": pageEntityId("/gallery", "webpage") },
    })),
  ],
};

function GalleryHero() {
  return (
    <header className="gallery-hero">
      <div className="gallery-hero-copy">
        <p className="foundation-eyebrow">Gallery / Real Luxe Events</p>
        <h1 aria-label="Luxe event experiences, grouped by the moments they served.">
          <span>Luxe event</span>
          <span>experiences, grouped</span>
          <span>by the moments they served.</span>
        </h1>
        <p>
          Coffee, dessert, rentals, and complete event compositions organized by
          the experience and occasion they belonged to, never separated from context.
        </p>
        <div className="gallery-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Start Planning Your Event <span aria-hidden="true">↗</span>
          </Link>
          <a href="#gallery-groups">
            Browse Gallery by Experience <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="gallery-hero-media" aria-label="Luxe event composition study">
        <div aria-hidden="true"><i /><i /><i /></div>
        <strong>Real work.<br />Real context.</strong>
        <span>Coffee · Dessert · Seating<br />Seen in the room.</span>
      </div>
    </header>
  );
}

function GalleryInquiry() {
  return (
    <section className="gallery-inquiry" aria-labelledby="gallery-inquiry-title">
      <div>
        <h2 id="gallery-inquiry-title">Imagine the experience in your own room.</h2>
        <p>
          Share the occasion, setting, guest count, and the Luxe experiences you
          are considering. Luxe serves Toronto and the Greater Toronto Area, and
          will begin with the event rather than a fixed package.
        </p>
      </div>
      <Link href="/inquire" data-event-name="inquiry_start">
        Start Planning Your Event <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export default function GalleryPage() {
  return (
    <SiteShell breadcrumbPath="/gallery">
      <main className="gallery-page">
        <GalleryHero />
        <GalleryCollection />
        <GalleryInquiry />
      </main>
      <JsonLd data={gallerySchema} />
    </SiteShell>
  );
}
