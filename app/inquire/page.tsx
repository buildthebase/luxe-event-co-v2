import Link from "next/link";
import { InquiryHandoffLink } from "../components/inquiry-handoff-link";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";

const inquireUrl = `${siteConfig.url}/inquire`;
const hasThirdPartyInquiry = Boolean(siteConfig.inquiry.url);

export const metadata = createPageMetadata("/inquire");

const inquirySchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["ContactPage", "WebPage"],
      "@id": pageEntityId("/inquire", "webpage"),
      url: inquireUrl,
      name: pageMetadata["/inquire"].title,
      description: pageMetadata["/inquire"].description,
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/inquire", "breadcrumb") },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbSchema("/inquire"),
  ],
};

function InquiryAction({
  className,
}: {
  className?: string;
}) {
  return (
    <InquiryHandoffLink
      className={className}
      context={{ sourcePath: "/inquire" }}
    >
      Begin Your Inquiry <span aria-hidden="true">↗︎</span>
    </InquiryHandoffLink>
  );
}

function InquireHero() {
  return (
    <header className="inquire-hero">
      <div className="inquire-hero-copy">
        <p className="foundation-eyebrow">Inquire / Plan the Next Step</p>
        <h1 aria-label="Plan your Luxe event experience.">
          <span>Plan your Luxe</span>
          <span>event experience.</span>
        </h1>
        <p>
          Begin with the date, place, people, and experiences under
          consideration. Luxe will use that context to prepare the right
          conversation and proposal path.
        </p>
        <div className="inquire-hero-actions">
          <InquiryAction />
          <a href="#prepare-your-brief">
            Prepare Your Details <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="inquire-hero-brief" aria-hidden="true">
        <div>
          <span>Event</span>
          <i />
        </div>
        <div>
          <span>Place</span>
          <i />
        </div>
        <div>
          <span>People</span>
          <i />
        </div>
        <strong>Begin with context.</strong>
      </div>
    </header>
  );
}

function InquiryPlanning() {
  return (
    <section
      className="inquire-planning"
      id="prepare-your-brief"
      aria-labelledby="inquire-planning-title"
    >
      <header>
        <p className="foundation-label">Before and after your inquiry</p>
        <h2 id="inquire-planning-title">
          A clear path from first details to a confirmed date.
        </h2>
        <p>
          Early estimates are welcome. Share what is known now; Luxe will clarify
          the operating details before preparing a personalized proposal.
        </p>
      </header>
      <div className="inquire-planning-grid">
        <article>
          <span>What to share</span>
          <h3>The event at a glance.</h3>
          <ul>
            <li>Date, venue, and estimated guest count</li>
            <li>Event type, service window, and indoor or outdoor setting</li>
            <li>Experiences, branding, dietary needs, and special requests</li>
          </ul>
        </article>
        <article>
          <span>What to expect</span>
          <h3>A considered response.</h3>
          <p>
            Luxe normally responds within 24 hours after reviewing fit and
            availability. Toronto and the GTA are the primary service area, with
            select Southern Ontario events available where scope permits.
          </p>
          <p>
            Most coffee bookings begin around 30 guests. Sweet Cart and Seating
            Rentals minimums depend on the selected experience and operating plan.
          </p>
        </article>
        <article>
          <span>What happens next</span>
          <h3>Review, proposal, confirmation.</h3>
          <ul>
            <li>Luxe clarifies timing, venue, selections, and quantities</li>
            <li>A personalized proposal outlines the confirmed scope</li>
            <li>A signed contract and 30% retainer secure the date</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

function InquiryHandoff() {
  return (
    <section
      className="inquire-handoff"
      id="begin-inquiry"
      aria-labelledby="inquire-handoff-title"
    >
      <div className="inquire-handoff-copy">
        <h2 id="inquire-handoff-title">
          Ready when the event has enough shape to share.
        </h2>
        <p>
          {hasThirdPartyInquiry
            ? "Continue to Luxe’s guided inquiry platform to submit the event brief."
            : "The guided inquiry platform is being connected. Until it opens, the same event brief can be sent directly to Luxe by email."}
        </p>
        <InquiryAction className="inquire-handoff-primary" />
      </div>
      <div className="inquire-contact">
        <h3>Contact Luxe directly</h3>
        <a
          href={`tel:${siteConfig.contact.phone}`}
          data-event-name="phone_click"
        >
          <span>Phone</span>
          {siteConfig.contact.phoneDisplay}
        </a>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          data-event-name="email_click"
        >
          <span>Email</span>
          {siteConfig.contact.email}
        </a>
        <Link href="/faq">
          <span>Before you inquire</span>
          Review frequently asked questions
        </Link>
      </div>
      <p className="inquire-privacy">
        This page does not collect or store event details. The inquiry action
        opens the approved handoff destination currently configured for Luxe.
        Share only the information needed to assess the event. Any future
        third-party form will be subject to its disclosed privacy and consent
        terms.
      </p>
    </section>
  );
}

export default function InquirePage() {
  return (
    <SiteShell breadcrumbPath="/inquire">
      <main className="inquire-page">
        <InquireHero />
        <InquiryPlanning />
        <InquiryHandoff />
      </main>
      <JsonLd data={inquirySchema} />
    </SiteShell>
  );
}
