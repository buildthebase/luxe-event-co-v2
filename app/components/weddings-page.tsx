import Link from "next/link";
import {
  weddingCombinations,
  weddingCustomization,
  weddingExperienceRoles,
  weddingFaqs,
  weddingGalleryPreview,
  weddingLogistics,
  weddingMoments,
} from "../events/weddings-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const weddingsPath = "/events/weddings";
const weddingsSchema = createServicePageSchema({
  path: weddingsPath,
  serviceName: "Luxe wedding coffee, dessert, and rental experiences",
  serviceType: "Wedding coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Wedding coffee, live dessert, and refined rental experiences from Luxe Event Co. for celebrations in Toronto, the GTA, and select Southern Ontario destinations.",
  pageName: pageMetadata[weddingsPath].title,
  pageDescription:
    "Plan coffee service, live dessert, and refined wedding rentals with Luxe Event Co. across Toronto and the GTA.",
});

function WeddingHero() {
  return (
    <header className="wedding-hero">
      <div className="wedding-hero-copy">
        <p className="foundation-eyebrow">Weddings / Toronto &amp; the GTA</p>
        <h1 aria-label="Wedding coffee, dessert, and rentals, woven through the day.">
          <span>Wedding coffee,</span>
          <span>dessert, and rentals,</span>
          <span>woven through the day.</span>
        </h1>
        <p>
          Coffee, live dessert, and an intentional setting can support the
          moments between ceremony and celebration without competing with the
          wedding itself.
        </p>
        <div className="wedding-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Wedding Experience <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#wedding-day">
            Explore the Wedding Day <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="wedding-hero-art" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <dl className="wedding-hero-proof">
        <div>
          <dt>One inquiry</dt>
          <dd>Coffee, dessert, and rentals</dd>
        </div>
        <div>
          <dt>Three experiences</dt>
          <dd>Coffee, dessert, and seating</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function WeddingOverview() {
  return (
    <section className="wedding-overview" aria-labelledby="wedding-overview-title">
      <div>
        <p className="foundation-label">The full celebration in view</p>
        <h2 id="wedding-overview-title">
          Begin with the wedding flow, then place each experience where it belongs.
        </h2>
      </div>
      <div>
        <p>
          Luxe supports couples, planners, coordinators, venues, and families
          with guest-facing experiences that can move through different stages
          of the day.
        </p>
        <p>
          The <Link href="/experiences/coffee-bar">Coffee Bar</Link>,{" "}
          <Link href="/experiences/sweet-cart">Sweet Cart</Link>, and{" "}
          <Link href="/experiences/seating-rentals">Seating Rentals</Link> can
          be booked independently or planned together through one Luxe Event
          Co. inquiry and proposal journey.
        </p>
      </div>
    </section>
  );
}

function WeddingDay() {
  return (
    <section className="wedding-day" id="wedding-day" aria-labelledby="wedding-day-title">
      <header>
        <p className="foundation-label">Across the wedding day</p>
        <h2 id="wedding-day-title">
          Six moments.
          <br />
          Each with its own rhythm.
        </h2>
        <p>
          These are planning possibilities rather than fixed packages. The
          venue, schedule, guest count, selected experiences, and service
          requirements determine the final direction.
        </p>
      </header>
      <ol>
        {weddingMoments.map((moment) => (
          <li key={moment.number}>
            <p>{moment.phase}</p>
            <div>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
              <small>{moment.note}</small>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function WeddingExperiences() {
  return (
    <section className="wedding-experiences" aria-labelledby="wedding-experiences-title">
      <header>
        <p className="foundation-label">Three distinct roles</p>
        <h2 id="wedding-experiences-title">
          Service, sweetness, and the setting around them.
        </h2>
      </header>
      <div>
        {weddingExperienceRoles.map((experience) => (
          <Link href={experience.href} key={experience.number}>
            <span>{experience.label}</span>
            <strong>{experience.name}</strong>
            <h3>{experience.statement}</h3>
            <p>{experience.description}</p>
            <b>Explore {experience.label} <span aria-hidden="true">↗︎</span></b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function WeddingCombinations() {
  return (
    <section className="wedding-combinations" aria-labelledby="wedding-combinations-title">
      <header>
        <p className="foundation-label">Suggested wedding combinations</p>
        <h2 id="wedding-combinations-title">Consider the handoff between moments.</h2>
        <p>
          Each composition remains customizable and confirmation-dependent. It
          is not a fixed package or a promise of identical requirements for
          every venue.
        </p>
      </header>
      <div>
        {weddingCombinations.map((combination) => (
          <article key={combination.number}>
            <p>{combination.title}</p>
            <h3>{combination.experiences}</h3>
            <p>{combination.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeddingCustomization() {
  return (
    <section className="wedding-customization" aria-labelledby="wedding-customization-title">
      <header>
        <p className="foundation-label">Made specific to the celebration</p>
        <h2 id="wedding-customization-title">
          Personal details can move through the menu and presentation.
        </h2>
      </header>
      <div>
        {weddingCustomization.map((item) => (
          <article key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeddingCoordination() {
  return (
    <section
      className="wedding-coordination"
      aria-labelledby="wedding-coordination-title"
      data-measurement-section="logistics"
      data-section-id="wedding-coordination"
    >
      <header>
        <p className="foundation-label">Coordination and logistics</p>
        <h2 id="wedding-coordination-title">
          The experience should arrive prepared for the room.
        </h2>
        <p>
          Luxe reviews the event schedule and operational details before
          confirming the service plan. No universal footprint, utility, outdoor,
          or rental-delivery requirement is assumed.
        </p>
      </header>
      <ol>
        {weddingLogistics.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <aside>
        <strong>$5 million liability insurance</strong>
        <p>
          A meaningful layer of assurance for couples, planners, venues, and
          vendor teams. Documentation can be provided where required during
          planning.
        </p>
      </aside>
    </section>
  );
}

function WeddingGallery() {
  return (
    <section className="wedding-gallery" aria-labelledby="wedding-gallery-title">
      <header>
        <p className="foundation-label">Wedding gallery</p>
        <h2 id="wedding-gallery-title">The proof belongs in real celebrations.</h2>
        <p>Follow the service through the day, from the room and menu to the moments shared with guests.</p>
      </header>
      <div className="wedding-gallery-grid" data-asset-status="awaiting-approved-photography">
        {weddingGalleryPreview.map((item) => (
          <figure className={`wedding-gallery-${item.tone}`} key={item.number}>
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

function WeddingFaq() {
  return (
    <section className="wedding-faq" aria-labelledby="wedding-faq-title">
      <header>
        <p className="foundation-label">Wedding planning questions</p>
        <h2 id="wedding-faq-title">Useful answers before the inquiry.</h2>
      </header>
      <FaqAccordion items={weddingFaqs} showNumbers={false} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function WeddingsPage() {
  return (
    <SiteShell breadcrumbPath="/events/weddings">
      <main className="wedding-page">
        <JsonLd data={weddingsSchema} />
        <WeddingHero />
        <WeddingOverview />
        <WeddingDay />
        <WeddingExperiences />
        <WeddingCombinations />
        <WeddingCustomization />
        <WeddingCoordination />
        <WeddingGallery />
        <WeddingFaq />
        <ContextualInquiryPanel contextKey="weddings" />
      </main>
    </SiteShell>
  );
}
