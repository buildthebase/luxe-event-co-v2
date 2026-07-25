import Link from "next/link";
import {
  activationBrandTouchpoints,
  activationContexts,
  activationFaqs,
  activationGalleryPreviews,
  activationPlanningRequirements,
  activationScaleCapabilities,
  activationServiceMedia,
} from "../events/brand-activations-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel, CredibilityStrip } from "./signature-elements";
import { SiteShell } from "./site-shell";

const activationPath = "/events/brand-activations";
const activationSchema = createServicePageSchema({
  path: activationPath,
  serviceName: "Branded coffee cart and event activation experiences",
  serviceType: "Branded coffee, matcha, dessert, and event activation services",
  serviceDescription:
    "Custom-branded coffee, matcha, live dessert, signage, menus, cups, and event support for activations across Toronto and the GTA.",
  pageName: pageMetadata[activationPath].title,
  pageDescription:
    "Create branded coffee, matcha, dessert, and event experiences for launches, retail activations, campaigns, and agency-led events.",
});

function ActivationHero() {
  return (
    <header className="activation-hero">
      <div className="activation-hero-copy">
        <p className="foundation-eyebrow">Brand Activations / Toronto &amp; the GTA</p>
        <h1 aria-label="Branded coffee carts that make the brand tangible.">
          <span>Branded coffee</span>
          <span>carts that make</span>
          <span>the brand tangible.</span>
        </h1>
        <p>
          Coffee, matcha, live dessert, and considered event details designed
          for agencies, marketers, experiential teams, retail brands, and
          campaign audiences.
        </p>
        <div className="activation-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Create a Branded Experience <span aria-hidden="true">↗</span>
          </Link>
          <a href="#activation-system">
            Explore Brand Possibilities <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="activation-hero-canvas" aria-hidden="true">
        <div>
          <span>01 / Taste</span>
          <strong>Your<br />campaign,<br />served.</strong>
          <i />
        </div>
        <div>
          <span>02 / Share</span>
          <i />
          <i />
          <i />
        </div>
        <div>
          <span>03 / Remember</span>
          <b>Brand<br />moment</b>
        </div>
      </div>
      <dl className="activation-hero-proof">
        <div>
          <dt>Agency-ready</dt>
          <dd>Direct collaboration</dd>
        </div>
        <div>
          <dt>Multi-day</dt>
          <dd>Confirmed capability</dd>
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

function ActivationOverview() {
  return (
    <section className="activation-overview" aria-labelledby="activation-overview-title">
      <h2 id="activation-overview-title">
        A branded experience should do more than carry a logo.
      </h2>
      <div>
        <p>
          Luxe translates the brief into a tangible hospitality moment: what
          guests see, order, hold, taste, photograph, and remember.
        </p>
        <p>
          The activation can begin with <Link href="/experiences/coffee-bar">coffee and matcha</Link>,{" "}
          <Link href="/experiences/sweet-cart">live dessert</Link>, or{" "}
          <Link href="/experiences/seating-rentals">rental and styling support</Link>.
          Each division remains distinct while the parent company coordinates
          the complete event direction.
        </p>
      </div>
    </section>
  );
}

function ActivationBrandSystem() {
  return (
    <section
      className="activation-system"
      id="activation-system"
      aria-labelledby="activation-system-title"
    >
      <header>
        <h2 id="activation-system-title">Six surfaces for one recognizable campaign.</h2>
        <p>
          Every branded element remains subject to asset approval, production
          feasibility, timing, quantities, and the confirmed service format.
        </p>
      </header>
      <ol>
        {activationBrandTouchpoints.map((touchpoint) => (
          <li key={touchpoint.number}>
            <span>{touchpoint.number}</span>
            <div aria-hidden="true"><i /><i /><i /></div>
            <h3>{touchpoint.title}</h3>
            <p>{touchpoint.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ActivationContexts() {
  return (
    <section className="activation-contexts" aria-labelledby="activation-contexts-title">
      <header>
        <h2 id="activation-contexts-title">Built around where attention is already gathering.</h2>
      </header>
      <ol>
        {activationContexts.map((context) => (
          <li key={context.number}>
            <span>{context.number}</span>
            <h3>{context.title}</h3>
            <p>{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ActivationServices() {
  return (
    <section className="activation-services" aria-labelledby="activation-services-title">
      <header>
        <h2 id="activation-services-title">Choose the medium that carries the idea.</h2>
      </header>
      <div>
        {activationServiceMedia.map((service) => (
          <article key={service.number}>
            <span>{service.number}</span>
            <Link href={service.href}>{service.name}</Link>
            <h3>{service.statement}</h3>
            <p>{service.description}</p>
            <Link href={service.href}>
              Explore {service.name} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivationScale() {
  return (
    <section className="activation-scale" aria-labelledby="activation-scale-title">
      <header>
        <h2 id="activation-scale-title">One location, several days, or a brief with more moving parts.</h2>
      </header>
      <div>
        {activationScaleCapabilities.map((capability) => (
          <article key={capability.number}>
            <span>{capability.number}</span>
            <h3>{capability.title}</h3>
            <strong>{capability.fact}</strong>
            <p>{capability.qualification}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ActivationContentMoment() {
  return (
    <section className="activation-content" aria-labelledby="activation-content-title">
      <div className="activation-content-art" aria-hidden="true">
        <i /><i /><i />
        <span>Frame / 01</span>
      </div>
      <div>
        <h2 id="activation-content-title">Designed to work in the room and in the frame.</h2>
        <p>
          Branded cups, menus, signage, cart surfaces, live preparation, and
          guest interaction can create natural photography and content moments.
          Content access, usage, shot lists, clearances, and production activity
          must be coordinated with the agency, venue, and event team.
        </p>
      </div>
    </section>
  );
}

function ActivationTrust() {
  return (
    <section className="activation-trust" aria-labelledby="activation-trust-title">
      <header>
        <h2 id="activation-trust-title">Selected client proof, approved for display.</h2>
        <p>
          Organization names are approved. Specific activation details,
          campaign outcomes, quotations, and case studies require separate
          permission before publication.
        </p>
      </header>
      <CredibilityStrip variant="hero" />
    </section>
  );
}

function ActivationGallery() {
  return (
    <section className="activation-gallery" aria-labelledby="activation-gallery-title">
      <header>
        <h2 id="activation-gallery-title">The campaign belongs in context.</h2>
        <p>
          Menu, service, branded surfaces, and the surrounding environment work
          together to make the activation feel cohesive.
        </p>
      </header>
      <div className="activation-gallery-grid" data-asset-status="awaiting-approved-activation-assets">
        {activationGalleryPreviews.map((item) => (
          <figure className={`activation-gallery-${item.tone}`} key={item.number}>
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

function ActivationPlanning() {
  return (
    <section className="activation-planning" aria-labelledby="activation-planning-title">
      <header>
        <h2 id="activation-planning-title">Bring the brief, assets, and operating picture together early.</h2>
      </header>
      <ol>
        {activationPlanningRequirements.map((requirement) => (
          <li key={requirement.number}>
            <span>{requirement.number}</span>
            <h3>{requirement.title}</h3>
            <p>{requirement.description}</p>
          </li>
        ))}
      </ol>
      <Link href="/events/corporate-events">
        Explore corporate event capability <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

function ActivationFaq() {
  return (
    <section className="activation-faq" aria-labelledby="activation-faq-title">
      <header>
        <h2 id="activation-faq-title">Answers before the creative and operational review.</h2>
      </header>
      <FaqAccordion items={activationFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export function BrandActivationsPage() {
  return (
    <SiteShell breadcrumbPath="/events/brand-activations">
      <main className="activation-page">
        <JsonLd data={activationSchema} />
        <ActivationHero />
        <ActivationOverview />
        <ActivationBrandSystem />
        <ActivationContexts />
        <ActivationServices />
        <ActivationScale />
        <ActivationContentMoment />
        <ActivationTrust />
        <ActivationGallery />
        <ActivationPlanning />
        <ActivationFaq />
        <ContextualInquiryPanel contextKey="brand-activations" showEyebrow={false} />
      </main>
    </SiteShell>
  );
}
