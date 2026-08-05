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
import { seatingRentalsSectionNavigation } from "../page-section-navigation";
import {
  createAreaServed,
  createServicePageSchema,
  divisionServiceIds,
} from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const seatingRentalsPath = "/experiences/seating-rentals";
const [rentalPricingAnswer, ...rentalContextualFaqs] = seatingRentalFaqs;
const rentalRequirementGroups = [
  {
    title: "Event context",
    items: rentalQuoteRequirements.slice(0, 3),
  },
  {
    title: "Inventory and layout",
    items: rentalQuoteRequirements.slice(3, 6),
  },
  {
    title: "Access and service",
    items: rentalQuoteRequirements.slice(6),
  },
];
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
          <QuoteModalTrigger data-event-name="inquiry_start">
            Discuss Your Rental Requirements <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
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
      <div className="coffee-hero-proof-heading">
        <p className="foundation-label">Confirmed categories and rental planning</p>
        <h2 id="seating-hero-proof-title">
          The rental plan follows the room, event, and guest flow.
        </h2>
      </div>
      <dl className="coffee-hero-proof" aria-labelledby="seating-hero-proof-title">
        <div><dt>Six</dt><dd><strong>Rental categories</strong><span>Six confirmed rental categories can be planned together. Final items, quantities, finishes, and availability are resolved for the event.</span></dd></div>
        <div><dt>Inside + Out</dt><dd><strong>Flexible settings</strong><span>Indoor and outdoor plans respond to venue dimensions, access, surface conditions, weather, and the way guests move through the setting.</span></dd></div>
        <div><dt>$5M</dt><dd><strong>Liability insurance</strong><span>Luxe maintains $5 million in liability insurance for venue, planner, and procurement requirements.</span></dd></div>
        <div><dt>Planned</dt><dd><strong>Layout and quantities</strong><span>Selections respond to guest count, floor plan, sightlines, accessibility, service zones, and the intended flow of the event.</span></dd></div>
        <div><dt>Confirmed</dt><dd><strong>Delivery and access</strong><span>Delivery timing, loading access, placement, setup, teardown, and pickup responsibilities are confirmed in the proposal.</span></dd></div>
      </dl>
    </header>
  );
}

function SeatingOverview() {
  return (
    <section className="seating-overview" aria-labelledby="seating-overview-title">
      <div className="seating-overview-intro">
        <h2 id="seating-overview-title">
          <span>Seating should resolve the room.</span>
          <span>The layout should support the gathering.</span>
        </h2>
        <div className="seating-overview-art" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="seating-overview-content">
        <p className="seating-overview-lead">
          Seating is planned around how guests gather, move through the space,
          and experience the event.
        </p>

        <div className="seating-overview-rule" aria-hidden="true" />

        <div className="seating-overview-copy">
          <p>
            Event seating rentals bring the furniture, layout planning, and on-site
            setup needed to shape a functional and considered gathering. Luxe Seating
            Rentals provides seating solutions for{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/corporate-events">corporate events</Link>,{" "}
            <Link href="/events/brand-activations">brand activations</Link>,{" "}
            <Link href="/events/bridal-showers">bridal showers</Link>,{" "}
            <Link href="/events/baby-showers">baby showers</Link>,{" "}
            <Link href="/events/birthdays">birthdays</Link>, and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>

          <p>
            Rather than beginning with a catalogue of individual pieces, each booking
            begins with the room and how it needs to work. The seating plan is shaped
            around the guest count, venue, event flow, service areas, visual direction,
            access, delivery, and setup requirements.
          </p>

          <p className="seating-overview-handoff">
            Luxe Seating Rentals can be booked independently or coordinated with{" "}
            <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
            <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> through one{" "}
            <Link href="/inquire">Luxe Event Co. inquiry</Link>.
          </p>
        </div>
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
        <h2 id="seating-studies-title">Begin with how the gathering needs to work.</h2>
      </header>
      <div>
        {layoutStudies.map((study) => (
          <article className={`seating-study-${study.tone}`} key={study.number}>
            <div aria-hidden="true"><i /><i /><i /><i /></div>
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
      <div className="seating-quote-folio">
        {rentalRequirementGroups.map((group) => (
          <article key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
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

function RentalPricing() {
  return (
    <section className="seating-pricing" aria-labelledby="seating-pricing-title">
      <header>
        <p className="foundation-label">Pricing and service area</p>
        <h2 id="seating-pricing-title">How are event rentals priced?</h2>
      </header>
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

function RentalCombinations() {
  return (
    <section
      className="seating-combinations related-experiences"
      aria-labelledby="seating-combinations-title"
    >
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="seating-combinations-title">The room can support the hospitality within it.</h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <strong>Luxe Coffee Bar</strong>
          <p>
            Consider cocktail tables, guest circulation, seating, and service zones
            alongside a crafted Coffee Bar experience.
          </p>
          <b aria-hidden="true">Explore Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/sweet-cart">
          <strong>Luxe Sweet Cart</strong>
          <p>
            Connect tables, seating, tents, linens, or lighting to the placement and
            guest flow around Luxe Sweet Cart.
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
        <PageSectionNavigation items={seatingRentalsSectionNavigation} />
        <SeatingHero />
        <SeatingOverview />
        <RentalCategories />
        <LayoutInspiration />
        <IndoorOutdoorApplications />
        <RentalOperations />
        <RentalEvents />
        <RentalPricing />
        <RentalQuote />
        <RentalGallery />
        <RentalCombinations />
        <RentalFaq />
        <ContextualInquiryPanel contextKey="seating-rentals" />
      </main>
    </SiteShell>
  );
}