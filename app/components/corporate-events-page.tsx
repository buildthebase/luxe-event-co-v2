import Link from "next/link";
import {
  corporateBrandingOptions,
  corporateEventApplications,
  corporateExperienceRoles,
  corporateFaqs,
  corporateGalleryPreviews,
  corporatePlanningSteps,
  corporateScaleCapabilities,
} from "../events/corporate-events-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel, CredibilityStrip } from "./signature-elements";
import { SiteShell } from "./site-shell";

const corporatePath = "/events/corporate-events";
const corporateSchema = createServicePageSchema({
  path: corporatePath,
  serviceName: "Corporate coffee, dessert, and event rental experiences",
  serviceType: "Corporate coffee catering and event experiences",
  serviceDescription:
    "Branded coffee, matcha, live dessert, and event rental support for corporate events across Toronto, the GTA, and select Southern Ontario destinations.",
  pageName: pageMetadata[corporatePath].title,
  pageDescription:
    "Plan branded coffee, matcha, live dessert, and rental support for corporate events across Toronto and the GTA.",
});

function CorporateHero() {
  return (
    <header className="corporate-hero">
      <div className="corporate-hero-copy">
        <p className="foundation-eyebrow">Corporate Events / Toronto &amp; the GTA</p>
        <h1 aria-label="Corporate coffee and event experiences, ready for business.">
          <span>Corporate coffee</span>
          <span>and event experiences,</span>
          <span>ready for business.</span>
        </h1>
        <p>
          Polished coffee, matcha, live dessert, and event support for teams,
          clients, conferences, workplaces, institutions, and brand environments.
        </p>
        <div className="corporate-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Discuss a Corporate Event <span aria-hidden="true">↗</span>
          </Link>
          <a href="#corporate-capabilities">
            Review Capabilities <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="corporate-hero-system" aria-hidden="true">
        <div className="corporate-hero-screen">
          <span>08:00</span>
          <span>Hospitality online</span>
          <i />
          <i />
          <i />
        </div>
        <ol>
          <li><span>01</span> Brief</li>
          <li><span>02</span> Brand</li>
          <li><span>03</span> Service</li>
          <li><span>04</span> Flow</li>
        </ol>
      </div>
      <dl className="corporate-hero-proof">
        <div>
          <dt>Up to 500</dt>
          <dd>Coffee guests</dd>
        </div>
        <div>
          <dt>Up to 400</dt>
          <dd>Dessert guests</dd>
        </div>
        <div>
          <dt>Up to 3 + 3</dt>
          <dd>Coffee and dessert setups</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function CorporateOverview() {
  return (
    <section className="corporate-overview" aria-labelledby="corporate-overview-title">
      <div>
        <h2 id="corporate-overview-title">
          The guest experience and the run of show have to work together.
        </h2>
      </div>
      <div>
        <p>
          Luxe Event Co. brings together three distinct divisions for
          professional events: <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link>,{" "}
          <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link>, and{" "}
          <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>.
        </p>
        <p>
          Each can be booked independently or coordinated as one event direction.
          Service is planned around the audience, schedule, venue, brand
          requirements, guest count, and operational realities rather than a
          generic corporate package.
        </p>
      </div>
    </section>
  );
}

function CorporateCapabilities() {
  return (
    <section
      className="corporate-capabilities"
      id="corporate-capabilities"
      aria-labelledby="corporate-capabilities-title"
    >
      <header>
        <h2 id="corporate-capabilities-title">
          Different business occasions. One prepared hospitality partner.
        </h2>
      </header>
      <ol>
        {corporateEventApplications.map((event) => (
          <li key={event.number}>
            <span>{event.number}</span>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CorporateExperiences() {
  return (
    <section className="corporate-experiences" aria-labelledby="corporate-experiences-title">
      <header>
        <h2 id="corporate-experiences-title">
          Select one experience, or coordinate the room around all three.
        </h2>
      </header>
      <div>
        {corporateExperienceRoles.map((experience) => (
          <article key={experience.number}>
            <span>{experience.number} / {experience.label}</span>
            <Link href={experience.href}>{experience.name}</Link>
            <h3>{experience.statement}</h3>
            <p>{experience.description}</p>
            <small>{experience.fact}</small>
            <Link href={experience.href}>
              Explore {experience.label} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function CorporateBranding() {
  return (
    <section className="corporate-branding" aria-labelledby="corporate-branding-title">
      <header>
        <h2 id="corporate-branding-title">Make the service recognizable as yours.</h2>
        <p>
          Branding is developed around approved assets, production requirements,
          and the event timeline. It can be subtle, campaign-led, or fully
          integrated into the guest-facing service.
        </p>
      </header>
      <div>
        {corporateBrandingOptions.map((option) => (
          <article key={option.number}>
            <span>{option.number}</span>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
          </article>
        ))}
      </div>
      <Link href="/events/brand-activations">
        Explore brand activation capabilities <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function CorporateScale() {
  return (
    <section className="corporate-scale" aria-labelledby="corporate-scale-title">
      <header>
        <h2 id="corporate-scale-title">
          Built for one important moment, or a program that keeps moving.
        </h2>
      </header>
      <div>
        {corporateScaleCapabilities.map((capability) => (
          <article key={capability.number}>
            <span>{capability.number}</span>
            <h3>{capability.title}</h3>
            <strong>{capability.fact}</strong>
            <p>{capability.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CorporateTrust() {
  return (
    <section className="corporate-trust" aria-labelledby="corporate-trust-title">
      <header>
        <h2 id="corporate-trust-title">Trusted in professional environments.</h2>
        <p>
          These organization names are approved for display. Individual event
          details, outcomes, quotations, and case studies remain subject to
          separate client approval.
        </p>
      </header>
      <CredibilityStrip variant="hero" />
      <aside>
        <strong>$5 million liability insurance</strong>
        <p>
          A meaningful layer of assurance for corporate teams, agencies,
          institutions, venues, procurement contacts, and event partners.
          Documentation can be provided where required during planning.
        </p>
      </aside>
    </section>
  );
}

function CorporateGallery() {
  return (
    <section className="corporate-gallery" aria-labelledby="corporate-gallery-title">
      <header>
        <h2 id="corporate-gallery-title">The operational proof should be visible.</h2>
        <p>
          Layout, branded details, service flow, and guest interaction show how
          the experience works beyond the first impression.
        </p>
      </header>
      <div className="corporate-gallery-grid" data-asset-status="awaiting-approved-corporate-assets">
        {corporateGalleryPreviews.map((item) => (
          <figure className={`corporate-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <span>{item.number}</span>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">
        Explore the Luxe event gallery <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function CorporatePlanning() {
  return (
    <section className="corporate-planning" aria-labelledby="corporate-planning-title">
      <header>
        <h2 id="corporate-planning-title">
          A clear route from the event brief to service day.
        </h2>
      </header>
      <ol>
        {corporatePlanningSteps.map((step) => (
          <li key={step.number}>
            <span>{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
      <Link className="corporate-planning-events-link" href="/events">
        Explore every Luxe event pathway <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function CorporateFaq() {
  return (
    <section className="corporate-faq" aria-labelledby="corporate-faq-title">
      <header>
        <h2 id="corporate-faq-title">Answers for teams preparing the brief.</h2>
      </header>
      <FaqAccordion items={corporateFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export function CorporateEventsPage() {
  return (
    <SiteShell breadcrumbPath="/events/corporate-events">
      <main className="corporate-page">
        <JsonLd data={corporateSchema} />
        <CorporateHero />
        <CorporateOverview />
        <CorporateCapabilities />
        <CorporateExperiences />
        <CorporateBranding />
        <CorporateScale />
        <CorporateTrust />
        <CorporateGallery />
        <CorporatePlanning />
        <CorporateFaq />
        <ContextualInquiryPanel contextKey="corporate-events" showEyebrow={false} />
      </main>
    </SiteShell>
  );
}
