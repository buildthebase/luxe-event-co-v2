import Link from "next/link";
import {
  coffeeBookingIncludes,
  coffeeEventLinks,
  coffeeFaqs,
  coffeeFormats,
  coffeeGalleryPreview,
  espressoClassics,
  nonCoffeeCollection,
  seasonalCoffeeCollections,
  signatureCoffeeCollection,
} from "../experiences/coffee-bar-content";
import { pageMetadata } from "../metadata-config";
import { coffeeBarSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { ExperienceContextSection } from "./experience-context-section";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const coffeePath = "/experiences/coffee-bar";
const [coffeePricingAnswer, ...coffeeContextualFaqs] = coffeeFaqs;
const coffeeInclusionGroups = [
  {
    title: "Service",
    items: [
      coffeeBookingIncludes[0],
      coffeeBookingIncludes[1],
      coffeeBookingIncludes[2],
      coffeeBookingIncludes[10],
    ],
  },
  {
    title: "Menu",
    items: [
      coffeeBookingIncludes[3],
      coffeeBookingIncludes[4],
      coffeeBookingIncludes[5],
      coffeeBookingIncludes[6],
    ],
  },
  {
    title: "Presentation",
    items: [
      coffeeBookingIncludes[7],
      coffeeBookingIncludes[8],
      coffeeBookingIncludes[9],
      coffeeBookingIncludes[11],
    ],
  },
];
const coffeeBarSchema = createServicePageSchema({
  path: coffeePath,
  serviceId: divisionServiceIds.coffee,
  serviceName: "Luxe Coffee Bar",
  serviceType: "Mobile coffee bar and espresso catering",
  serviceDescription:
    "A complete mobile caf\u00e9 and beverage experience for weddings, corporate events, brand activations, and private events in Toronto and the GTA.",
  pageName: pageMetadata[coffeePath].title,
  pageDescription:
    "Explore the Luxe Caf\u00e9 Cart and Signature Coffee Bar, included drinks, customization, capacity, and event applications.",
  faqs: coffeeFaqs,
});

function CoffeeHero() {
  return (
    <header className="coffee-hero" id="page-overview">
      <div className="coffee-hero-copy">
        <p className="foundation-eyebrow">Luxe Coffee Bar / Toronto &amp; the GTA</p>
        <h1 aria-label="A mobile coffee bar, made for the gathering.">
          <span>A mobile coffee bar,</span>
          <span>made for the gathering.</span>
        </h1>
        <p>
          A complete mobile café experience shaped around the event, with professional
          baristas, handcrafted beverages, intentional presentation, and hospitality
          that becomes part of the room.
        </p>
        <div className="coffee-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Coffee Bar <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#coffee-formats">
            Compare Coffee Experiences <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="coffee-hero-art" aria-hidden="true">
        <span />
        <i />
        <i />
        <b>Crafted in the room</b>
      </div>
      <div className="coffee-hero-proof-heading">
        <p className="foundation-label">Confirmed capacity and service planning</p>
        <h2 id="coffee-hero-proof-title">
          The service plan follows the room, menu, and guest flow.
        </h2>
      </div>
      <dl className="coffee-hero-proof" aria-labelledby="coffee-hero-proof-title">
        <div>
          <dt>Up to 500</dt>
          <dd>
            <strong>Guest capacity</strong>
            <span>
              Confirmed capacity reaches up to 500 guests. Menu complexity,
              duration, staffing, and event flow shape the service plan.
            </span>
          </dd>
        </div>
        <div>
          <dt>Up to 3</dt>
          <dd>
            <strong>Simultaneous setups</strong>
            <span>
              Up to three simultaneous setups may support suitable multi-site,
              multi-station, or distributed events, subject to availability and scope.
            </span>
          </dd>
        </div>
        <div>
          <dt>$5M</dt>
          <dd>
            <strong>Liability insurance</strong>
            <span>
              Luxe maintains $5 million in liability insurance for venue,
              planner, and procurement requirements.
            </span>
          </dd>
        </div>
        <div>
          <dt>Included</dt>
          <dd>
            <strong>Setup and takedown</strong>
            <span>
              Setup and takedown are included. Exact access and timing are
              coordinated with the venue and event schedule.
            </span>
          </dd>
        </div>
        <div>
          <dt>Confirmed</dt>
          <dd>
            <strong>Space, power, &amp; water</strong>
            <span>
              Requirements vary by format, menu, venue, and setting. Luxe confirms
              the footprint and utility access after reviewing the event details.
            </span>
          </dd>
        </div>
      </dl>
    </header>
  );
}

function CoffeeOverview() {
  return (
    <ExperienceContextSection
      id="coffee-overview"
      ariaLabelledBy="coffee-overview-title"
      legacyClassName="coffee-overview"
      artClassName="coffee-overview-media"
      title={
        <>
          <span>Coffee hospitality,</span>
          <span>shaped around the event.</span>
        </>
      }
      lead={<>Coffee is woven into the event as hospitality, atmosphere, and an experience guests can gather around.</>}
      copy={
        <>
          <p>
            A mobile coffee bar brings professional café equipment, skilled baristas,
            and a made-to-order beverage menu directly into the event setting. Luxe
            Coffee Bar provides mobile coffee catering for{" "}
            <Link href="/events/weddings">weddings</Link>,{" "}
            <Link href="/events/corporate-events">corporate events</Link>,{" "}
            <Link href="/events/brand-activations">brand activations</Link>, bridal
            showers, baby showers, birthdays, and{" "}
            <Link href="/events/private-events">private celebrations</Link> across
            Toronto and the GTA.
          </p>
          <p>
            Each booking is planned around the occasion, guest count, venue, service
            window, and preferred menu. Drinks are prepared fresh on-site throughout
            the agreed service period, creating a polished and welcoming experience
            for guests.
          </p>
          <p className="coffee-overview-handoff">
            Luxe Coffee Bar can be booked independently or coordinated with{" "}
            <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> and{" "}
            <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>{" "}
            through one{" "}
            <QuoteModalTrigger className="coffee-overview-inquiry">
              Luxe Event Co. inquiry
            </QuoteModalTrigger>
            .
          </p>
        </>
      }
    >
      <span className="coffee-overview-media-label">Coffee service photography</span>
      <span className="coffee-overview-mark" />
    </ExperienceContextSection>
  );
}

function CoffeeFormats() {
  return (
    <section className="coffee-formats" id="coffee-formats" aria-labelledby="coffee-formats-title">
      <header>
        <p className="foundation-label">Two complete expressions</p>
        <h2 id="coffee-formats-title">Choose the presence coffee should have.</h2>
      </header>
      <div className="coffee-format-pair">
        {coffeeFormats.map((format) => (
          <article className={`coffee-format-${format.id}`} key={format.id}>
            <div className="coffee-format-art" aria-hidden="true">
              <i />
              <i />
            </div>
            <div className="coffee-format-copy">
              <h3>{format.name}</h3>
              <p className="coffee-format-description">
                {format.statement} {format.description}
              </p>
              <dl>
                <div>
                  <dt>Event fit</dt>
                  <dd>{format.eventFit}</dd>
                </div>
                <div>
                  <dt>Presence</dt>
                  <dd>{format.presence}</dd>
                </div>
                <div>
                  <dt>Confirmed during inquiry</dt>
                  <dd>Service duration, footprint, staffing, menu, and venue logistics.</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
      <div className="coffee-format-cta">
        <p>Choose the coffee experience that belongs in your room.</p>
        <QuoteModalTrigger data-event-name="inquiry_start">
          Plan Your Coffee Bar <span aria-hidden="true">↗︎</span>
        </QuoteModalTrigger>
      </div>
    </section>
  );
}

function CoffeeInclusions() {
  return (
    <section
      className="coffee-inclusions"
      aria-labelledby="coffee-inclusions-title"
      data-evidence-status="confirmed-first-party"
    >
      <header>
        <p className="foundation-label">Confirmed inclusions</p>
        <h2 id="coffee-inclusions-title">
          <span>Everything needed for a</span>
          <span>complete coffee service.</span>
        </h2>
        <p>
          Each booking brings together the format, menu, equipment, service, and
          finishing details required to create a polished guest experience. Signature
          drinks, iced beverages, premium milk alternatives, and non-coffee options
          are thoughtfully included within the service rather than presented as a
          series of individual upgrades.
        </p>
      </header>
      <div className="coffee-inclusions-folio">
        <p className="coffee-inclusions-list-label">Included with your booking:</p>
        <div className="coffee-inclusions-groups">
          {coffeeInclusionGroups.map((group) => (
            <article key={group.title} tabIndex={0}>
              <span className={`coffee-inclusion-icon coffee-inclusion-icon-${group.title.toLowerCase()}`} aria-hidden="true"><i /></span>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((inclusion) => (
                  <li key={inclusion}>
                    <strong>{inclusion}</strong>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeMenu() {
  return (
    <section
      className="coffee-menu"
      aria-labelledby="coffee-menu-title"
      data-evidence-status="confirmed-menu-selections"
    >
      <header>
        <p className="foundation-label">The beverage language</p>
        <h2 id="coffee-menu-title">
          <span>Classic at the foundation.</span>
          <span>Personal in expression.</span>
        </h2>
        <p>
          Every menu begins with four espresso classics, then makes room for
          signature drinks, matcha, and a premium non-coffee selection. Hot and iced
          service and dairy and premium milk alternatives are included.
        </p>
      </header>
      <div className="coffee-menu-core">
        <article data-category="espresso" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-bean" aria-hidden="true"><i /></span>
          <h3>Espresso classics</h3>
          <ul>
            {espressoClassics.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article data-category="signature" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-signature" aria-hidden="true"><i /></span>
          <h3>Signature coffee collection</h3>
          <ul>
            {signatureCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article data-category="matcha" tabIndex={0}>
          <span className="coffee-menu-icon coffee-menu-icon-leaf" aria-hidden="true"><i /></span>
          <h3>Matcha and non-coffee</h3>
          <ul>
            {nonCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
      </div>
      <div className="coffee-seasonal">
        <div>
          <p className="foundation-label">Seasonal collections</p>
<h3>
  A menu that can move
  <br />
  with the calendar.
</h3>
        </div>
        <div className="coffee-seasonal-grid">
          {seasonalCoffeeCollections.map((collection) => (
            <article data-season={collection.season.toLowerCase()} key={collection.season} tabIndex={0}>
              <span className={`coffee-seasonal-icon coffee-seasonal-icon-${collection.season.toLowerCase()}`} aria-hidden="true"><i /></span>
              <h4>{collection.season}</h4>
              <ul>
                {collection.drinks.map((drink) => <li key={drink}>{drink}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoffeeOperations() {
  return (
    <section
      className="coffee-operations coffee-operations-compact"
      aria-label="Coffee service pricing and service area"
      data-evidence-status="confirmed-with-event-specific-dependencies"
      data-measurement-section="logistics"
      data-section-id="coffee-service-planning"
    >
      <PriorityAnswer
        label="Cost factors"
        question={coffeePricingAnswer.question}
        answer={coffeePricingAnswer.answer}
        href="/inquire"
        linkLabel="Request a coffee-service proposal"
      />
      <aside>
        <p>
          Based in Toronto, Luxe serves the GTA and considers select destination
          events throughout Southern Ontario. Travel fees may apply outside the
          standard service area.
        </p>
        <Link href="/faq">Review booking and logistics questions <span aria-hidden="true">↗︎</span></Link>
      </aside>
    </section>
  );
}

function CoffeeEvents() {
  return (
    <section className="coffee-events" aria-labelledby="coffee-events-title">
      <header>
        <h2 id="coffee-events-title">
          <span>Different occasions give the café</span>
          <span>a different role.</span>
        </h2>
        <p>
          Mobile coffee catering can suit weddings, office and corporate events,
          conferences, brand activations, showers, birthdays, and private
          celebrations when a staffed beverage experience supports the schedule and
          guest flow.
        </p>
      </header>
      <div>
        {coffeeEventLinks.map((event, index) => (
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

function CoffeeGallery() {
  return (
    <section className="coffee-gallery" aria-labelledby="coffee-gallery-title">
<header>
  <h2 id="coffee-gallery-title">
    Mobile coffee bar service, crafted live at your event.
  </h2>
</header>

      <div
        className="coffee-gallery-grid"
        data-asset-status="awaiting-approved-photography"
      >
        {coffeeGalleryPreview.map((item) => (
          <figure className={`coffee-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true">
              <i />
              <i />
            </div>

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

function CoffeeRelated() {
  return (
    <section className="coffee-related" aria-labelledby="coffee-related-title">
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="coffee-related-title">Coffee can stand alone or meet the rest of the room.</h2>
      </header>
      <div>
        <Link href="/experiences/sweet-cart">
          <strong>Luxe Sweet Cart</strong>
          <p>Pair crafted drinks with a live, made-to-order dessert experience.</p>
          <b aria-hidden="true">Explore Sweet Cart ↗︎</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <strong>Luxe Seating Rentals</strong>
          <p>Connect café hospitality with the structure and setting around it.</p>
          <b aria-hidden="true">Explore Seating Rentals ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function CoffeeFaq() {
  return (
    <section className="coffee-faq" aria-labelledby="coffee-faq-title">
      <header>
        <p className="foundation-label">Coffee Bar questions</p>
        <h2 id="coffee-faq-title">The practical details, answered directly.</h2>
      </header>
      <FaqAccordion items={coffeeContextualFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function CoffeeBarPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/coffee-bar">
      <main className="coffee-page">
        <JsonLd data={coffeeBarSchema} />
        <PageSectionNavigation items={coffeeBarSectionNavigation} />
        <CoffeeHero />
        <CoffeeOverview />
        <CoffeeFormats />
        <CoffeeInclusions />
        <CoffeeMenu />
        <CoffeeOperations />
        <CoffeeEvents />
        <CoffeeGallery />
        <CoffeeRelated />
        <CoffeeFaq />
        <ContextualInquiryPanel contextKey="coffee-bar" />
      </main>
    </SiteShell>
  );
}
