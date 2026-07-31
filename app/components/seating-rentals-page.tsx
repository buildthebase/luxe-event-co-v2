import Link from "next/link";
import {
  layoutStudies,
  rentalCategories,
  rentalEventLinks,
  rentalGalleryPreview,
  rentalOperations,
  rentalQuoteRequirements,
  rentalServiceAreas,
  seatingRentalFaqs,
} from "../experiences/seating-rentals-content";
import { pageMetadata } from "../metadata-config";
import {
  createAreaServed,
  createServicePageSchema,
  divisionServiceIds,
} from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PriorityAnswer } from "./priority-answer";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const seatingRentalsPath = "/experiences/seating-rentals";
const [rentalPricingAnswer, ...rentalContextualFaqs] = seatingRentalFaqs;
const seatingRentalsSchema = createServicePageSchema({
  path: seatingRentalsPath,
  serviceId: divisionServiceIds.seating,
  serviceName: "Luxe Seating Rentals",
  serviceType: "Event seating and rental service",
  serviceDescription:
    "A refined event rental service connecting chairs, tables, cocktail tables, tents, linens, and lighting to event layout, comfort, and guest experience.",
  pageName: pageMetadata[seatingRentalsPath].title,
  pageDescription:
    "Explore confirmed Luxe Seating Rentals categories, indoor and outdoor applications, layout planning, service areas, quote requirements, and complementary event experiences.",
  areaServed: createAreaServed(rentalServiceAreas),
});

function SeatingHero() {
  return (
    <header className="seating-hero">
      <div className="seating-hero-copy">
        <p className="foundation-eyebrow">Luxe Seating Rentals / Toronto &amp; the GTA</p>
        <h1 aria-label="Event and seating rentals, shaped around the occasion.">
          <span>Event and seating</span>
          <span>rentals, shaped around the occasion.</span>
        </h1>
        <p>
          Seating and event rentals planned as part of the layout, atmosphere,
          comfort, and way guests move through the gathering.
        </p>
        <div className="seating-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Discuss Your Rental Requirements <span aria-hidden="true">↗︎</span>
          </Link>
          <a href="#rental-categories">
            Review Rental Categories <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="seating-hero-plan" aria-hidden="true">
        <span />
        <span />
        <i />
        <i />
        <b>Layout / comfort / flow</b>
      </div>
      <dl className="seating-hero-proof">
        <div><dt>06</dt><dd>Confirmed rental categories</dd></div>
        <div><dt>Inside + Out</dt><dd>Indoor and outdoor settings</dd></div>
        <div><dt>$5M</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function SeatingOverview() {
  return (
    <section className="seating-overview" aria-labelledby="seating-overview-title">
      <p className="foundation-label">The setting is part of the experience</p>
      <h2 id="seating-overview-title">
        Rentals should resolve the room, not simply occupy it.
      </h2>
      <div>
        <p>
          Luxe Seating Rentals is positioned around design, layout, comfort, and
          guest experience rather than a catalogue-first selection process.
        </p>
        <p>
          The starting point is the event: who is gathering, how the room will be
          used, where service happens, and which elements are needed to support it.
        </p>
      </div>
    </section>
  );
}

function RentalCategories() {
  return (
    <section
      className="seating-inventory"
      id="rental-categories"
      aria-labelledby="seating-inventory-title"
      data-evidence-status="confirmed-categories"
    >
      <header>
        <p className="foundation-label">Confirmed rental categories</p>
        <h2 id="seating-inventory-title">Six elements. One spatial conversation.</h2>
        <p>
          The categories below are confirmed. Specific pieces, dimensions,
          quantities, finishes, and availability remain dependent on the approved
          inventory schedule and event date.
        </p>
      </header>
      <div className="seating-inventory-grid">
        {rentalCategories.map((category) => (
          <article className={`seating-item-${category.id}`} key={category.id}>
            <div className="seating-item-plan" aria-hidden="true"><i /><i /><i /></div>
            <span>{category.number}</span>
            <h3>{category.name}</h3>
            <strong>{category.role}</strong>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
      <PriorityAnswer
        label="Cost factors"
        question={rentalPricingAnswer.question}
        answer={rentalPricingAnswer.answer}
        href="/inquire"
        linkLabel="Request a rental proposal"
      />
    </section>
  );
}

function AdditionalInventoryBoundary() {
  return (
    <section className="seating-additional" aria-labelledby="seating-additional-title">
      <div>
        <p className="foundation-label">Additional confirmed inventory</p>
        <h2 id="seating-additional-title">
          Inventory enters the page only when the details are ready.
        </h2>
      </div>
      <div>
        <p>
          The client intake references additional event equipment but does not yet
          identify approved item types, models, quantities, dimensions, finishes, or
          availability.
        </p>
        <p>
          This section is intentionally reserved for confirmed inventory. No generic
          rental products or assumed stock will be presented in its place.
        </p>
      </div>
      <span>Inventory schedule required before final production copy</span>
    </section>
  );
}

function LayoutInspiration() {
  return (
    <section className="seating-studies" aria-labelledby="seating-studies-title">
      <header>
        <p className="foundation-label">Styling and layout inspiration</p>
        <h2 id="seating-studies-title">Begin with how the gathering needs to work.</h2>
      </header>
      <div>
        {layoutStudies.map((study) => (
          <article className={`seating-study-${study.tone}`} key={study.number}>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
            <span>{study.number}</span>
            <h3>{study.title}</h3>
            <p>{study.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function RentalOperations() {
  return (
    <section
      className="seating-operations"
      aria-labelledby="seating-operations-title"
      data-evidence-status="confirmed-boundary-policy-pending"
    >
      <header>
        <p className="foundation-label">Delivery, setup, and teardown</p>
        <h2 id="seating-operations-title">The operational scope belongs in the proposal.</h2>
        <p>
          These services are not described as universally included until Luxe
          approves the rental logistics policy.
        </p>
      </header>
      <div className="seating-operation-grid">
        {rentalOperations.map((operation) => (
          <article key={operation.number}>
            <span>{operation.number}</span>
            <h3>{operation.title}</h3>
            <strong>{operation.status}</strong>
            <p>{operation.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function IndoorOutdoorApplications() {
  return (
    <section className="seating-applications" aria-labelledby="seating-applications-title">
      <header>
        <p className="foundation-label">Indoor and outdoor applications</p>
        <h2 id="seating-applications-title">
          The setting changes the rental plan.
        </h2>
      </header>
      <div>
        <article>
          <span>Interior</span>
          <h3>Work with the room that already exists.</h3>
          <p>
            Indoor planning considers room dimensions, entrances, elevators, loading
            access, floor protection, fire routes, accessibility, service zones, and
            the venue schedule.
          </p>
        </article>
        <article>
          <span>Exterior</span>
          <h3>Build around conditions that can change.</h3>
          <p>
            Outdoor planning requires review of surface, access, weather, wind, tent
            suitability, utilities, venue rules, and an appropriate contingency plan.
            Outdoor use is never confirmed from category alone.
          </p>
        </article>
      </div>
    </section>
  );
}

function RentalQuote() {
  return (
    <section className="seating-quote" aria-labelledby="seating-quote-title">
      <header>
        <p className="foundation-label">Prepare the rental conversation</p>
        <h2 id="seating-quote-title">The useful details come before the quantities.</h2>
        <p>
          These inputs allow Luxe to evaluate inventory, logistics, layout, and
          complementary service requirements without relying on a generic quote.
        </p>
      </header>
      <ol>
        {rentalQuoteRequirements.map((requirement, index) => (
          <li key={requirement}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{requirement}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function RentalEvents() {
  return (
    <section className="seating-events" aria-labelledby="seating-events-title">
      <header>
        <p className="foundation-label">Recommended by occasion</p>
        <h2 id="seating-events-title">Different events ask different things of the room.</h2>
      </header>
      <div>
        {rentalEventLinks.map((event, index) => (
          <Link href={event.href} key={event.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{event.label}</strong>
            <small>{event.context}</small>
            <b aria-hidden="true">↗︎</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function RentalGallery() {
  return (
    <section className="seating-gallery" aria-labelledby="seating-gallery-title">
      <header>
        <p className="foundation-label">Rental gallery</p>
        <h2 id="seating-gallery-title">Show the room, not an isolated product grid.</h2>
        <p>
          Wide room views, material detail, circulation, and guest use explain
          what each rental element contributes to the setting.
        </p>
      </header>
      <div className="seating-gallery-grid" data-asset-status="awaiting-approved-photography">
        {rentalGalleryPreview.map((item) => (
          <figure className={`seating-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <span>{item.number}</span>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function RentalCombinations() {
  return (
    <section className="seating-combinations" aria-labelledby="seating-combinations-title">
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="seating-combinations-title">The room can support the hospitality within it.</h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <span>Setting + Coffee</span>
          <strong>Plan the reception around the café moment.</strong>
          <p>
            Consider cocktail tables, guest circulation, seating, and service zones
            alongside a crafted Coffee Bar experience.
          </p>
          <b aria-hidden="true">Explore Luxe Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/sweet-cart">
          <span>Setting + Dessert</span>
          <strong>Give the live dessert experience room to gather.</strong>
          <p>
            Connect tables, seating, tents, linens, or lighting to the placement and
            guest flow around Luxe Sweet Cart.
          </p>
          <b aria-hidden="true">Explore Luxe Sweet Cart ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function RentalServiceArea() {
  return (
    <section className="seating-service-area" aria-labelledby="seating-service-area-title">
      <header>
        <p className="foundation-label">Service-area context</p>
        <h2 id="seating-service-area-title">Toronto, the GTA, and select travel beyond.</h2>
        <p>
          Travel fees may apply outside Luxe&apos;s standard service area. Rental
          delivery availability and fees remain subject to the final logistics policy.
        </p>
      </header>
      <ul>
        {rentalServiceAreas.map((area) => <li key={area}>{area}</li>)}
      </ul>
    </section>
  );
}

function RentalFaq() {
  return (
    <section className="seating-faq" aria-labelledby="seating-faq-title">
      <header>
        <p className="foundation-label">Rental questions</p>
        <h2 id="seating-faq-title">What is confirmed, and what the proposal must resolve.</h2>
      </header>
      <FaqAccordion items={rentalContextualFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function SeatingRentalsPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/seating-rentals">
      <main className="seating-page">
        <JsonLd data={seatingRentalsSchema} />
        <SeatingHero />
        <SeatingOverview />
        <RentalCategories />
        <AdditionalInventoryBoundary />
        <LayoutInspiration />
        <RentalOperations />
        <IndoorOutdoorApplications />
        <RentalQuote />
        <RentalEvents />
        <RentalGallery />
        <RentalCombinations />
        <RentalServiceArea />
        <RentalFaq />
        <ContextualInquiryPanel contextKey="seating-rentals" />
      </main>
    </SiteShell>
  );
}
