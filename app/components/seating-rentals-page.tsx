import Link from "next/link";
import {
  layoutStudies,
  rentalCategories,
  rentalEventLinks,
  rentalGalleryPreview,
  rentalOperations,
  rentalServiceAreas,
  seatingRentalFaqs,
} from "../experiences/seating-rentals-content";
import { pageMetadata } from "../metadata-config";
import { seatingRentalsSectionNavigation } from "../page-section-navigation";
import {
  createAreaServed,
  createServicePageSchema,
  divisionServiceIds,
} from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { ExperienceContextSection } from "./experience-context-section";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
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
    <header className="seating-hero" id="page-overview">
      <div className="seating-hero-copy">
        <p className="foundation-eyebrow">EVENT SEATING RENTALS IN TORONTO &amp; THE GTA</p>
        <h1 aria-label="Luxury event seating rentals, designed around the room.">
          <span>Luxury event seating rentals,</span>
          <span>designed around the room.</span>
        </h1>
        <p>
          Elevated seating solutions designed around venue footprint, event flow, and
          guest comfort for weddings, corporate functions, brand activations, and
          private celebrations across Toronto.
        </p>
        <div className="seating-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            PLAN YOUR SEATING RENTALS <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#rental-categories">
            EXPLORE SEATING OPTIONS <span aria-hidden="true">↓︎</span>
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
      <div className="coffee-hero-proof-heading">
        <h2 id="seating-hero-proof-title">
          Every rental plan is shaped around the venue, guest count, and event flow.
        </h2>
      </div>
      <dl
        className="sweet-hero-proof seating-hero-proof"
        aria-labelledby="seating-hero-proof-title"
      >
        <div><dt>6</dt><dd><strong>Rental categories</strong></dd></div>
        <div><dt>Indoor + outdoor</dt><dd><strong>Flexible settings</strong></dd></div>
        <div><dt>$5M</dt><dd><strong>Liability coverage</strong></dd></div>
        <div><dt>Guest-led</dt><dd><strong>Layout planning</strong></dd></div>
        <div><dt>Coordinated</dt><dd><strong>Delivery and setup</strong></dd></div>
      </dl>
    </header>
  );
}

function SeatingOverview() {
  return (
    <ExperienceContextSection
      id="seating-overview"
      ariaLabelledBy="seating-overview-title"
      legacyClassName="seating-overview"
      title={<>Premium Lounge &amp; Event Furniture Rentals</>}
      lead={<>Seating is planned around how guests gather, move through the space, and experience the event.</>}
      copy={
        <>
          <p>
            Luxe Seating Rentals provides curated furniture collections, custom spatial
            layouts, and white-glove on-site setup to elevate{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/corporate-events">corporate events</Link>,{" "}
            <Link href="/events/brand-activations">brand activations</Link>,{" "}
            showers, and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>
          <p>
            Every setup begins with understanding your venue layout and guest flow.
            Factors like venue access, delivery schedules, service zones, and design
            aesthetic directly shape your tailored furniture plan.
          </p>
          <p className="seating-overview-handoff">
            Luxe Seating Rentals can be booked independently or coordinated with{" "}
            <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
            <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> through one{" "}
            <Link href="/contact">Luxe Event Co. inquiry</Link>.
          </p>
        </>
      }
    >
      <i />
      <i />
      <i />
    </ExperienceContextSection>
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
        <h2 id="seating-inventory-title">Event Seating &amp; Rental Options</h2>
        <p className="seating-inventory-subtitle">Six elements. One spatial conversation.</p>
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
            <h3>{category.name}</h3>
            <strong>{category.role}</strong>
            <p>{category.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LayoutInspiration() {
  return (
    <section className="seating-studies" aria-labelledby="seating-studies-title">
      <header>
        <p className="foundation-label">Styling and layout inspiration</p>
        <h2 id="seating-studies-title">Event Seating Layouts &amp; Floor Planning</h2>
      </header>
      <div>
        {layoutStudies.map((study) => (
          <article className={`seating-study-${study.tone}`} key={study.number}>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
            <h3>{study.title}</h3>
            <p>
              <strong>{study.lead}</strong> {study.description}
            </p>
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
        <h2 id="seating-operations-title">Furniture Rental Delivery &amp; Event Logistics</h2>
        <p className="seating-operations-subtitle">
          Delivery, setup, and teardown are confirmed for each event.
        </p>
        <p>
          The rental proposal clearly outlines the services, timing, access
          requirements, responsibilities, and applicable fees included with the booking.
        </p>
      </header>
      <div className="seating-operation-grid">
        {rentalOperations.map((operation) => (
          <article data-step={operation.number} key={operation.number}>
            <span className="seating-operation-number" aria-hidden="true">
              {operation.number}
            </span>
            <h3>{operation.title}</h3>
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
        <h2 id="seating-applications-title">Venue Logistics &amp; Event Planning</h2>
        <p className="seating-applications-subtitle">
          Every setting calls for a different approach.
        </p>
      </header>
      <div>
        <article>
          <span>Interior</span>
          <h3>Indoor venue planning and site logistics</h3>
          <p>
            Indoor setups prioritize seamless venue integration. We review room
            dimensions, loading dock access, elevator clearances, floor protection
            requirements, fire routes, and load-in schedules prior to confirming your
            layout.
          </p>
        </article>
        <article>
          <span>Exterior</span>
          <h3>Outdoor event planning and weather contingency</h3>
          <p>
            Outdoor setups require custom environmental planning. We evaluate ground
            surface conditions, site delivery access, wind exposure, tenting
            compatibility, and rain contingency options before confirming your layout.
          </p>
        </article>
      </div>
    </section>
  );
}

function RentalEvents() {
  return (
    <section className="seating-events" aria-labelledby="seating-events-title">
      <header>
        <p className="foundation-label">Recommended by occasion</p>
        <h2 id="seating-events-title">
          <span>Every event calls for a different</span>
          <span>seating and rental plan.</span>
        </h2>
      </header>
      <div>
        {rentalEventLinks.map((event, index) => (
          <Link href={event.href} key={event.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{event.label}</h3>
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
        <h2 id="seating-gallery-title">Event seating and rentals, seen as part of the room.</h2>
        <p>
          Full-room views, guest flow, and material details show how each selection
          contributes to the setting as a whole.
        </p>
      </header>
      <div className="seating-gallery-grid" data-asset-status="awaiting-approved-photography">
        {rentalGalleryPreview.map((item) => (
          <figure className={`seating-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <span>{item.number}</span>
              <h3>{item.label}</h3>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function RentalPricing() {
  return (
    <section className="seating-pricing" aria-labelledby="seating-pricing-title">
      <header>
        <p className="foundation-label">Pricing and service area</p>
        <h2 id="seating-pricing-title">How are event seating and table rentals priced?</h2>
      </header>
      <PriorityAnswer
        label="Cost factors"
        question={rentalPricingAnswer.question}
        answer={rentalPricingAnswer.answer}
        href="/contact"
        linkLabel="Request a rental proposal"
      />
    </section>
  );
}

function RentalCombinations() {
  return (
    <section
      className="seating-combinations related-experiences"
      aria-labelledby="seating-combinations-title"
    >
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="seating-combinations-title">Seating can bring the full event together.</h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <h3>Luxe Coffee Bar</h3>
          <p>
            Coordinate seating, cocktail tables, and guest flow around the coffee
            service so the bar feels integrated into the event space.
          </p>
          <b aria-hidden="true">Explore Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/sweet-cart">
          <h3>Luxe Sweet Cart</h3>
          <p>
            Plan seating and circulation around the Sweet Cart so guests can gather,
            queue, and move comfortably through the room.
          </p>
          <b aria-hidden="true">Explore Sweet Cart ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function RentalFaq() {
  return (
    <section className="seating-faq" aria-labelledby="seating-faq-title">
      <header>
        <p className="foundation-label">Rental questions</p>
        <h2 id="seating-faq-title">What to know before planning your rentals.</h2>
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
        <PageSectionNavigation items={seatingRentalsSectionNavigation} />
        <SeatingHero />
        <SeatingOverview />
        <RentalCategories />
        <LayoutInspiration />
        <IndoorOutdoorApplications />
        <RentalOperations />
        <RentalEvents />
        <RentalPricing />
        <RentalGallery />
        <RentalCombinations />
        <RentalFaq />
        <ContextualInquiryPanel contextKey="seating-rentals" />
      </main>
    </SiteShell>
  );
}
