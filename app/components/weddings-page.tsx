import Link from "next/link";
import {
  weddingCustomization,
  weddingFaqs,
  weddingGalleryPreview,
  weddingLogistics,
  weddingMoments,
} from "../events/weddings-content";
import { pageMetadata } from "../metadata-config";
import { weddingsSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
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
    <header className="wedding-hero" id="page-overview">
      <div className="wedding-hero-copy">
        <p className="foundation-eyebrow">Weddings / Toronto &amp; the GTA</p>
        <h1 aria-label="Wedding coffee, dessert, and rentals planned around the big day.">
          <span>Wedding coffee,</span>
          <span>dessert, and rentals</span>
          <span>planned around the big day.</span>
        </h1>
        <p>
          Mobile coffee service, live dessert, seating, and event rentals
          coordinated around the venue, schedule, guest flow, and atmosphere
          of the celebration.
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
        <p className="foundation-label">The wedding experience</p>
        <h2 id="wedding-overview-title">
          A coordinated guest experience, tailored to the most special day.
        </h2>
      </div>
      <div>
        <p>
          Luxe works with couples, planners, venues, and vendor teams to place
          each experience where it best supports the wedding.
        </p>
        <p>
          <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link>,{" "}
          <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link>, and{" "}
          <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>{" "}
          can be booked independently or coordinated through one inquiry. The
          venue, schedule, guest count, service requirements, and desired
          atmosphere shape the final plan.
        </p>
      </div>
    </section>
  );
}

function WeddingDay() {
  return (
    <section className="wedding-day" id="wedding-day" aria-labelledby="wedding-day-title">
      <header>
        <p className="foundation-label">Wedding-day possibilities</p>
        <h2 id="wedding-day-title">
          Where Luxe can fit into the wedding day.
        </h2>
        <p>
          Each wedding follows its own schedule. These are planning
          possibilities rather than a fixed sequence or package.
        </p>
      </header>
      <ol>
        {weddingMoments.map((moment) => (
          <li key={moment.number}>
            <div
              className={`wedding-day-symbol wedding-day-symbol-${moment.number}`}
              aria-hidden="true"
            >
              <span />
            </div>
            <div className="wedding-day-copy">
              <div className="wedding-day-kicker">
                <span>{moment.number}</span>
                <p className="wedding-day-phase">{moment.phase}</p>
              </div>
              <h3>{moment.title}</h3>
              <p>{moment.description}</p>
            </div>
            <aside className="wedding-day-fit">
              <small>{moment.fitLabel}</small>
              <strong>{moment.fit}</strong>
            </aside>
          </li>
        ))}
      </ol>
      <p className="wedding-day-note">
        * Final placement, timing, staffing, and service duration are confirmed
        around the wedding schedule and venue requirements.
      </p>
    </section>
  );
}

function WeddingCustomization() {
  return (
    <section className="wedding-customization" aria-labelledby="wedding-customization-title">
      <header>
        <p className="foundation-label">Made specific to the celebration</p>
        <h2 id="wedding-customization-title">
          Carry the wedding details through the experience.
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
        <p className="foundation-label">Planning and logistics</p>
        <h2 id="wedding-coordination-title">
          What Luxe coordinates before the wedding.
        </h2>
        <aside>
          <strong>$5 million liability insurance</strong>
          <p>
            Documentation can be provided to planners and venues where required.
          </p>
        </aside>
        <p>
          Access, timing, placement, utilities, setup, pickup, venue
          requirements, and travel are reviewed before the event so the
          confirmed services arrive prepared for the setting.
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
    </section>
  );
}

function WeddingGallery() {
  return (
    <section className="wedding-gallery" aria-labelledby="wedding-gallery-title">
      <header>
        <p className="foundation-label">Wedding gallery</p>
        <h2 id="wedding-gallery-title">See the experiences in real weddings.</h2>
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
        <h2 id="wedding-faq-title">Wedding planning questions, answered.</h2>
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
        <PageSectionNavigation items={weddingsSectionNavigation} />
        <WeddingHero />
        <WeddingOverview />
        <WeddingDay />
        <ExperienceSelector
          id="wedding-experiences"
          footer={
            <Link href="/inquire">
              Book one experience independently or coordinate several through
              one Luxe Event Co. wedding plan.
            </Link>
          }
          heading="Three experiences, each with a clear role."
          showDescription={false}
          variant="taupe"
        />
        <WeddingCustomization />
        <WeddingCoordination />
        <WeddingGallery />
        <WeddingFaq />
        <ContextualInquiryPanel id="wedding-inquiry" contextKey="weddings" />
      </main>
    </SiteShell>
  );
}
