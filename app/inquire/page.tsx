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

const inquiryDetails = [
  {
    number: "01",
    title: "Event date",
    detail: "Your preferred date, plus an alternate date when flexibility is possible.",
  },
  {
    number: "02",
    title: "Location",
    detail: "The venue, city, or best-known location at this stage of planning.",
  },
  {
    number: "03",
    title: "Guest count",
    detail: "An estimated attendance range is useful before the final count is known.",
  },
  {
    number: "04",
    title: "Event type",
    detail: "Wedding, corporate event, activation, shower, birthday, or another occasion.",
  },
  {
    number: "05",
    title: "Service duration",
    detail: "The preferred service window or the part of the event Luxe should support.",
  },
  {
    number: "06",
    title: "Setting",
    detail: "Whether service will be indoors or outdoors, with venue access details if known.",
  },
  {
    number: "07",
    title: "Experience selection",
    detail: "Coffee Bar, Sweet Cart, Seating Rentals, or a combination of experiences.",
  },
  {
    number: "08",
    title: "Branding",
    detail: "Any custom cups, signage, menus, colour direction, or campaign requirements.",
  },
  {
    number: "09",
    title: "Special requests",
    detail: "Dietary considerations, rental needs, timing, access, or other event context.",
  },
] as const;

const experienceOptions = [
  {
    number: "01",
    title: "Luxe Coffee Bar",
    detail:
      "Café Cart or Signature Coffee Bar service, espresso, matcha, seasonal drinks, and branded presentation.",
    href: "/experiences/coffee-bar",
  },
  {
    number: "02",
    title: "Luxe Sweet Cart",
    detail:
      "Live mini pancakes, waffles on a stick, mini donuts, toppings, and optional soft serve.",
    href: "/experiences/sweet-cart",
  },
  {
    number: "03",
    title: "Luxe Seating Rentals",
    detail:
      "Confirmed chairs, tables, cocktail tables, tents, linens, and lighting shaped around the setting.",
    href: "/experiences/seating-rentals",
  },
] as const;

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
      <dl className="inquire-hero-proof">
        <div>
          <dt>One inquiry</dt>
          <dd>One or several experiences</dd>
        </div>
        <div>
          <dt>Within 24 hours</dt>
          <dd>Normal response expectation</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function ExperienceScope() {
  return (
    <section className="inquire-scope" aria-labelledby="inquire-scope-title">
      <header>
        <h2 id="inquire-scope-title">
          One experience, or a connected composition.
        </h2>
        <p>
          Coffee, dessert, and rentals can each be requested independently.
          They can also be coordinated through one Luxe inquiry when the event
          calls for more than one service.
        </p>
        <nav
          className="inquire-context-links"
          aria-label="Explore Luxe before inquiring"
        >
          <Link href="/experiences">Compare all experiences</Link>
          <Link href="/events">Browse by occasion</Link>
        </nav>
      </header>
      <div>
        {experienceOptions.map((experience) => (
          <article key={experience.number}>
            <span>{experience.number}</span>
            <h3>{experience.title}</h3>
            <p>{experience.detail}</p>
            <Link href={experience.href}>
              Explore {experience.title} <span aria-hidden="true">↗︎</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function EventBrief() {
  return (
    <section
      className="inquire-brief"
      id="prepare-your-brief"
      aria-labelledby="inquire-brief-title"
    >
      <header>
        <h2 id="inquire-brief-title">What to have ready.</h2>
        <p>
          Early estimates are welcome. These details help Luxe assess fit,
          availability, service scope, and the information needed for a
          personalized proposal.
        </p>
      </header>
      <ol>
        {inquiryDetails.map((item) => (
          <li key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.detail}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PlanningGuidance() {
  return (
    <section
      className="inquire-guidance"
      aria-labelledby="inquire-guidance-title"
    >
      <header>
        <h2 id="inquire-guidance-title">
          Useful expectations before you reach out.
        </h2>
      </header>
      <div className="inquire-guidance-grid">
        <article>
          <span>Response</span>
          <h3>Normally within 24 hours.</h3>
          <p>
            Luxe reviews the submitted event context before responding with
            the appropriate next step. Peak dates and complex requests may
            require additional review.
          </p>
        </article>
        <article>
          <span>Service area</span>
          <h3>Toronto, the GTA, and select larger events beyond.</h3>
          <p>
            Toronto and the Greater Toronto Area are Luxe&apos;s primary market,
            including events in communities such as Markham, Vaughan, Mississauga,
            Oakville, Pickering, and surrounding municipalities. Select larger
            events may be available throughout Southern Ontario, with travel fees
            where applicable.
          </p>
        </article>
        <article>
          <span>Minimums</span>
          <h3>Set by the experience and operating context.</h3>
          <p>
            Most coffee bookings begin at approximately 30 guests. Sweet Cart
            and Seating Rentals have their own package minimums, while travel,
            duration, staffing, and logistics may affect the minimum booking
            requirement.
          </p>
        </article>
      </div>
    </section>
  );
}

function AfterInquiry() {
  const steps = [
    {
      number: "01",
      title: "Your context reaches Luxe.",
      detail:
        "The event details provide the basis for an initial fit and availability review.",
    },
    {
      number: "02",
      title: "The scope is clarified.",
      detail:
        "Luxe may follow up about the venue, timing, selected experiences, quantities, or customization.",
    },
    {
      number: "03",
      title: "A personalized proposal follows.",
      detail:
        "The approved quoting platform will present the relevant experience, inclusions, and applicable enhancements.",
    },
    {
      number: "04",
      title: "The date is secured.",
      detail:
        "A signed contract and 30% non-refundable retainer are required before availability is confirmed.",
    },
  ] as const;

  return (
    <section className="inquire-after" aria-labelledby="inquire-after-title">
      <header>
        <h2 id="inquire-after-title">What happens after submission.</h2>
        <p>
          The website prepares the handoff. The selected third-party platform
          will manage the operational form, confirmation, proposal, agreement,
          and payment journey once its production connection is approved.
        </p>
      </header>
      <ol>
        {steps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </li>
        ))}
      </ol>
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
        <ExperienceScope />
        <EventBrief />
        <PlanningGuidance />
        <AfterInquiry />
        <InquiryHandoff />
      </main>
      <JsonLd data={inquirySchema} />
    </SiteShell>
  );
}
