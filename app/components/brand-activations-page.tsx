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
import { QuoteModalTrigger } from "./quote-modal-trigger";
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
        <h1 aria-label="Branded coffee cart and dessert activations for Toronto campaigns.">
          <span>Branded coffee cart</span>
          <span>and dessert activations</span>
          <span>for Toronto campaigns.</span>
        </h1>
        <p>
          Coffee, matcha, live dessert, and refined event details designed
          for agencies, marketers, experiential teams, retail brands, and
          campaign audiences.
        </p>
        <div className="activation-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Create a Branded Experience <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#activation-system">
            Explore Brand Possibilities <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="activation-hero-canvas" aria-hidden="true">
        <div>
          <span>Taste</span>
          <strong>Your<br />campaign,<br />served.</strong>
          <i />
        </div>
        <div>
          <span>Share</span>
          <i />
          <i />
          <i />
        </div>
        <div>
          <span>Remember</span>
          <b>Brand<br />moment</b>
        </div>
      </div>
      <dl className="activation-hero-proof">
        <div>
          <dt>Direct collaboration</dt>
          <dd>Agencies and internal teams</dd>
        </div>
        <div>
          <dt>Multi-day capable</dt>
          <dd>Subject to operating review</dd>
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
        A branded experience should do more than display a logo.
      </h2>
      <div>
        <p>
          Luxe creates guest-facing coffee, matcha, and live dessert experiences
          shaped around the campaign brief, audience, venue, and desired interaction.
        </p>
        <p>
          The experience can include approved brand assets, tailored menus, cups,
          signage, cart presentation, and room details. <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link>,{" "}
          <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link>, and{" "}
          <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link> can be
          booked independently or coordinated within one activation plan.
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
        <h2 id="activation-system-title">Carry the brand through the guest-facing details.</h2>
        <p>
          Approved brand assets can be applied across the parts of the experience
          guests see, use, order from, and photograph.
        </p>
      </header>
      <ol>
        {activationBrandTouchpoints.map((touchpoint) => (
          <li key={touchpoint.number}>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
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
        <h2 id="activation-contexts-title">
          Brand activation services for launches, retail, trade shows, and campaigns.
        </h2>
        <p>
          Mobile coffee, live dessert, and branded hospitality can be shaped around
          the audience, environment, and purpose of the campaign.
        </p>
      </header>
      <ol>
        {activationContexts.map((context) => (
          <li key={context.number}>
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
        <h2 id="activation-services-title">Choose the experience that fits the campaign.</h2>
        <p>
          Coffee, live dessert, and event rentals can each create a different
          kind of guest interaction.
        </p>
      </header>
      <div>
        {activationServiceMedia.map((service) => (
          <article key={service.number}>
            <div className="activation-service-intro">
              <Link href={service.href}>{service.name}</Link>
              <h3>{service.statement}</h3>
            </div>
            <div className="activation-service-details">
              <p>{service.description}</p>
              <Link href={service.href}>Explore {service.name}</Link>
            </div>
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
        <h2 id="activation-scale-title">
          Built for one-day activations, multi-day campaigns, and multiple locations.
        </h2>
        <p>
          Campaign scope can expand across setups, dates, and locations, with the
          operating plan confirmed around each brief.
        </p>
      </header>
      <div>
        {activationScaleCapabilities.map((capability) => (
          <article key={capability.number}>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
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
        <span>Frame</span>
      </div>
      <div>
        <h2 id="activation-content-title">Designed for the room and the camera.</h2>
        <p>
          Branded cups, menus, signage, cart presentation, live preparation, and
          guest interaction can create natural opportunities for event photography
          and campaign content.
        </p>
        <p>
          Photography access, usage, shot lists, clearances, and production activity
          remain the responsibility of the client, agency, venue, and content team
          unless specifically included in the approved scope.
        </p>
      </div>
    </section>
  );
}

function ActivationTrust() {
  return (
    <section className="activation-trust" aria-labelledby="activation-trust-title">
      <header>
        <h2 id="activation-trust-title">Trusted by corporate and institutional teams.</h2>
        <p>Selected organizations Luxe has served.</p>
      </header>
      <CredibilityStrip variant="hero" />
    </section>
  );
}

function ActivationGallery() {
  return (
    <section className="activation-gallery" aria-labelledby="activation-gallery-title">
      <header>
        <h2 id="activation-gallery-title">Brand activations, seen in context.</h2>
        <p>
          See how branded coffee, live dessert, signage, cart presentation, and event
          styling come together within the campaign environment.
        </p>
      </header>
      <div className="activation-gallery-grid" data-asset-status="awaiting-approved-activation-assets">
        {activationGalleryPreviews.map((item) => (
          <figure className={`activation-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">
        Explore the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

function ActivationPlanning() {
  const campaignInputs = activationPlanningRequirements.slice(0, 2);
  const productionPath = activationPlanningRequirements.slice(2);

  return (
    <section className="activation-planning" aria-labelledby="activation-planning-title">
      <header>
        <h2 id="activation-planning-title">From campaign brief to activation day.</h2>
        <p>
          Clear inputs and timely approvals help the branded experience move from concept into
          production.
        </p>
      </header>
      <div className="activation-planning-workflow">
        <div className="activation-planning-group activation-planning-inputs">
          <p className="activation-planning-group-label">Campaign inputs</p>
          <ol>
            {campaignInputs.map((requirement) => (
              <li key={requirement.number}>
                <h3>{requirement.title}</h3>
                <p>{requirement.description}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="activation-planning-group activation-planning-production">
          <p className="activation-planning-group-label">Production path</p>
          <ol start={3}>
            {productionPath.map((requirement) => (
              <li key={requirement.number}>
                <h3>{requirement.title}</h3>
                <p>{requirement.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
      <Link href="/events/corporate-events">Explore Corporate Event Capabilities</Link>
    </section>
  );
}

function ActivationFaq() {
  return (
    <section className="activation-faq" aria-labelledby="activation-faq-title">
      <header>
        <h2 id="activation-faq-title">Answers before the creative and operational review.</h2>
      </header>
      <FaqAccordion items={activationFaqs} showNumbers={false} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
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
        <ActivationContexts />
        <ActivationBrandSystem />
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
