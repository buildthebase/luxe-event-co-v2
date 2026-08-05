import Link from "next/link";
import {
  dessertBookingIncludes,
  dessertExperiences,
  dessertSauces,
  premiumToppings,
  standardToppings,
  sweetCartCollections,
  sweetCartFaqs,
  sweetEventLinks,
  sweetGalleryPreview,
} from "../experiences/sweet-cart-content";
import { pageMetadata } from "../metadata-config";
import { sweetCartSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const sweetCartPath = "/experiences/sweet-cart";
const [sweetPricingAnswer, ...sweetContextualFaqs] = sweetCartFaqs;
const sweetInclusionGroups = [
  {
    title: "Cart & service",
    items: dessertBookingIncludes.slice(0, 3),
  },
  {
    title: "Dessert & finishing",
    items: dessertBookingIncludes.slice(3, 6),
  },
  {
    title: "Presentation",
    items: dessertBookingIncludes.slice(6),
  },
];
const sweetCartSchema = createServicePageSchema({
  path: sweetCartPath,
  serviceId: divisionServiceIds.sweet,
  serviceName: "Luxe Sweet Cart",
  serviceType: "Interactive dessert cart catering",
  serviceDescription:
    "A live, interactive dessert cart experience with on-site preparation for weddings, corporate events, showers, activations, and private events.",
  pageName: pageMetadata[sweetCartPath].title,
  pageDescription:
    "Explore freshly prepared mini pancakes, waffles, mini donuts, cart collections, sauces, toppings, customization, and event applications.",
  faqs: sweetCartFaqs,
});

function SweetHero() {
  return (
    <header className="sweet-hero" id="page-overview">
      <div className="sweet-hero-copy">
        <p className="foundation-eyebrow">Luxe Sweet Cart / Toronto &amp; the GTA</p>
        <h1 aria-label="A dessert cart experience, made in the moment.">
          <span>A dessert</span>
          <span>cart experience,</span>
          <span>made in the moment.</span>
        </h1>
        <p>
          A live, made-to-order dessert experience where the cart, preparation, and
          final presentation become part of the event atmosphere.
        </p>
        <div className="sweet-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Inquire About a Dessert Experience <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#dessert-experiences">
            Explore the Dessert Menu <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="sweet-hero-art" aria-hidden="true">
        <span />
        <i />
        <i />
        <b>Prepared on-site</b>
      </div>
<div className="sweet-hero-proof-heading">
        <p className="foundation-label">Confirmed capacity and dessert-service planning</p>
<h2
  id="sweet-hero-proof-title"
  className="foundation-wide-heading"
>
  Planned for the room, timing, and guest flow.
</h2>
      </div>
<dl className="sweet-hero-proof" aria-labelledby="sweet-hero-proof-title">
        <div>
          <dt>Up to 400</dt>
          <dd><strong>Guest capacity</strong></dd>
        </div>
        <div>
          <dt>Up to 3</dt>
          <dd><strong>Simultaneous setups</strong></dd>
        </div>
        <div>
          <dt>$5M</dt>
          <dd><strong>Liability insurance</strong></dd>
        </div>
        <div>
          <dt>Included</dt>
          <dd><strong>Setup and takedown</strong></dd>
        </div>
        <div>
          <dt>Confirmed</dt>
          <dd><strong>Space, power &amp; access</strong></dd>
        </div>
      </dl>
    </header>
  );
}

function SweetPositioning() {
  return (
    <section
      className="sweet-positioning"
      aria-labelledby="sweet-positioning-title"
    >
      <div className="sweet-positioning-intro">
<h2 id="sweet-positioning-title">
  <span>The cart becomes</span>
  <span>part of the room.</span>
  <span>Preparation becomes</span>
  <span>part of the moment.</span>
</h2>

        <div className="sweet-positioning-art" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="sweet-positioning-content">
        <p className="sweet-positioning-lead">
          Dessert is prepared in view, finished to order, and presented as part
          of the gathering.
        </p>

        <div className="sweet-positioning-rule" aria-hidden="true" />

<div className="sweet-positioning-copy">
  <p>
    Dessert-cart catering is a staffed mobile dessert service where mini
    pancakes, Belgian waffles, mini donuts, and other selected sweets are
    prepared, finished, and served for guests on-site. Luxe Sweet Cart
    provides luxury dessert cart catering for{" "}
    <Link href="/events/weddings">weddings</Link>,{" "}
    <Link href="/events/corporate-events">corporate events</Link>,{" "}
    <Link href="/events/brand-activations">brand activations</Link>,
    bridal showers, baby showers, birthdays, and{" "}
    <Link href="/events/private-events">private celebrations</Link>{" "}
    across Toronto and the GTA.
  </p>

  <p>
    Unlike a dessert table, which typically presents pre-arranged sweets
    for self-service, the cart centres live preparation and
    attendant-led service. Each booking is planned around the cart
    style, dessert selection, guest count, venue, service window,
    footprint, power, access, and styling requirements.
  </p>

  <p className="sweet-positioning-handoff">
    Luxe Sweet Cart can be booked independently or coordinated with{" "}
    <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
    <Link href="/experiences/seating-rentals">
      Luxe Seating Rentals
    </Link>{" "}
    through one{" "}
    <QuoteModalTrigger className="sweet-positioning-inquiry">
      Luxe Event Co. inquiry
    </QuoteModalTrigger>
    .
  </p>
</div>
      </div>
    </section>
  );
}

function SweetCollections() {
  return (
    <section className="sweet-collections" aria-labelledby="sweet-collections-title">
      <header>
        <p className="foundation-label">Two cart expressions</p>
        <h2 id="sweet-collections-title">Choose how the cart belongs in the room.</h2>
      </header>
      <div>
        {sweetCartCollections.map((collection) => (
          <article className={`sweet-collection-${collection.id}`} key={collection.id}>
            <div className="sweet-collection-art" aria-hidden="true">
              <i /><i /><i />
            </div>
            <div className="sweet-collection-copy">
              <h3>{collection.name}</h3>
              <p><strong>{collection.character}</strong> {collection.description}</p>
            </div>
            
          </article>
        ))}
      </div>
      <p className="sweet-collections-note">
  *Cart availability, dessert service, styling, footprint, and venue access
  are confirmed during inquiry.
</p>
    </section>
  );
}

function DessertExperiences() {
  return (
    <section
      className="sweet-desserts"
      id="dessert-experiences"
      aria-labelledby="sweet-desserts-title"
    >
      <header>
        <p className="foundation-label">Freshly prepared on-site</p>
        <h2 id="sweet-desserts-title">Three ways to create the live dessert moment.</h2>
      </header>
      <div className="sweet-dessert-list">
        {dessertExperiences.map((dessert) => (
          <article className={`sweet-dessert-${dessert.id}`} key={dessert.id}>
            <div aria-hidden="true"><i /><i /></div>
            <h3>{dessert.name}</h3>
            <p>{dessert.description}</p>
            <small>{dessert.decisionFit}</small>
          </article>
        ))}
      </div>
      <aside className="sweet-soft-serve">
        <div aria-hidden="true"><i /><i /><i /></div>
        <div className="sweet-soft-serve-copy">
          <p className="foundation-label">Optional enhancement</p>
          <h3>Soft Serve Ice Cream</h3>
          <p>
            Add soft serve to your Sweet Cart experience when it feels right for the menu and the way your event comes together.
          </p>
        </div>
      </aside>
    </section>
  );
}

function SweetInclusions() {
  return (
    <section
      className="sweet-inclusions"
      aria-labelledby="sweet-inclusions-title"
      data-evidence-status="confirmed-first-party"
    >
      <header>
        <h2 id="sweet-inclusions-title">
          A complete dessert service, from setup through finishing.
        </h2>

        <p>
          Each booking brings together the selected cart, professional
          attendants, fresh on-site preparation, sauces and standard toppings,
          serving essentials, menu display, setup, and takedown. Dessert
          selection, quantities, service timing, footprint, power, and access
          are confirmed for the event.
        </p>
      </header>

      <div className="sweet-inclusion-panel">
        <p className="sweet-inclusion-panel-label">
          Included with your booking
        </p>

        <div className="sweet-inclusion-folio">
          {sweetInclusionGroups.map((group) => (
            <article key={group.title}>
              <h3>{group.title}</h3>

              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SweetPantry() {
  return (
    <section
      className="sweet-pantry"
      aria-labelledby="sweet-pantry-title"
      data-evidence-status="confirmed-menu-selections"
    >
      <header>
        <p className="foundation-label">Sauces and toppings</p>
        <h2 id="sweet-pantry-title">Every serving, finished your way.</h2>
      </header>
      <div className="sweet-pantry-grid">
        <article>
          <h3>Premium sauces</h3>
          <ul>{dessertSauces.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Standard toppings</h3>
          <ul>{standardToppings.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <h3>Premium toppings</h3>
          <ul>{premiumToppings.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}

function SweetOperations() {
  return (
    <section
      className="sweet-operations"
      aria-labelledby="sweet-operations-title"
      data-evidence-status="confirmed-with-event-specific-dependencies"
      data-measurement-section="logistics"
      data-section-id="sweet-cart-operations"
    >
      <header>
        <p className="foundation-label">Pricing and service area</p>
        <h2 id="sweet-operations-title">How is a Sweet Cart experience priced?</h2>
      </header>
      <PriorityAnswer
        label="Cost factors"
        question={sweetPricingAnswer.question}
        answer={sweetPricingAnswer.answer}
        href="/inquire"
        linkLabel="Request a dessert-service proposal"
      />
      <aside>
        <p>
          Luxe serves Toronto and the GTA, with select destination events available
          throughout Southern Ontario. Travel fees may apply.
        </p>
        <Link href="/faq">Review booking and logistics questions <span aria-hidden="true">↗︎</span></Link>
      </aside>
    </section>
  );
}

function SweetEvents() {
  return (
    <section className="sweet-events" aria-labelledby="sweet-events-title">
      <header>
        <p className="foundation-label">Where Sweet Cart belongs</p>
        <h2 id="sweet-events-title">Made for events where guests should gather around the moment.</h2>
      </header>
      <div>
        {sweetEventLinks.map((event, index) => (
          <Link href={event.href} key={event.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{event.label}</strong><small>{event.context}</small><b aria-hidden="true">↗︎</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

function SweetGallery() {
  return (
    <section className="sweet-gallery" aria-labelledby="sweet-gallery-title">
      <header>
        <p className="foundation-label">The experience in motion</p>
        <h2 id="sweet-gallery-title">The cart, the preparation, and the finished detail.</h2>
        <p>
          Live preparation, finishing details, styling, and guest interaction are
          the moments that give the dessert experience its character.
        </p>
      </header>
      <div className="sweet-gallery-grid" data-asset-status="awaiting-approved-photography">
        {sweetGalleryPreview.map((item) => (
          <figure className={`sweet-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <span>{item.number}</span><strong>{item.label}</strong><small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function SweetCombinations() {
  return (
    <section
      className="sweet-combinations related-experiences"
      aria-labelledby="sweet-combinations-title"
    >
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="sweet-combinations-title">Dessert can meet the arrival and the room around it.</h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <strong>Luxe Coffee Bar</strong>
          <p>Pair crafted beverages with live dessert preparation through one coordinated inquiry.</p>
          <b aria-hidden="true">Explore Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <strong>Luxe Seating Rentals</strong>
          <p>Connect the dessert moment with seating, tables, tents, linens, or lighting.</p>
          <b aria-hidden="true">Explore Seating Rentals ↗︎</b>
        </Link>
      </div>
    </section>
  );
}

function SweetFaq() {
  return (
    <section className="sweet-faq" aria-labelledby="sweet-faq-title">
      <header>
        <p className="foundation-label">Sweet Cart questions</p>
        <h2 id="sweet-faq-title">The menu and service details, answered directly.</h2>
      </header>
      <FaqAccordion items={sweetContextualFaqs} />
      <Link href="/faq">
        Review all Luxe booking questions <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function SweetCartPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/sweet-cart">
      <main className="sweet-page">
        <JsonLd data={sweetCartSchema} />
        <PageSectionNavigation items={sweetCartSectionNavigation} />
        <SweetHero />
        <SweetPositioning />
        <SweetCollections />
        <DessertExperiences />
        <SweetInclusions />
        <SweetPantry />
        <SweetOperations />
        <SweetEvents />
        <SweetGallery />
        <SweetCombinations />
        <SweetFaq />
        <ContextualInquiryPanel contextKey="sweet-cart" />
      </main>
    </SiteShell>
  );
}