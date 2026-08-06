import Link from "next/link";
import {
  dessertBookingIncludes,
  dessertExperiences,
  dessertSauces,
  premiumToppings,
  standardToppings,
  sweetCartCollections,
  sweetCartFaqs,
  sweetCustomization,
  sweetEventLinks,
  sweetGalleryPreview,
} from "../experiences/sweet-cart-content";
import { pageMetadata } from "../metadata-config";
import { sweetCartSectionNavigation } from "../page-section-navigation";
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { ExperienceContextSection } from "./experience-context-section";
import { JsonLd } from "./json-ld";
import { PageSectionNavigation } from "./page-section-navigation";
import { PriorityAnswer } from "./priority-answer";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const sweetCartPath = "/experiences/sweet-cart";
const [sweetPricingAnswer, ...sweetContextualFaqs] = sweetCartFaqs;
const sweetPricingParagraphs = sweetPricingAnswer.answer.match(/[^.!?]+[.!?]+/g) ?? [
  sweetPricingAnswer.answer,
];
const sweetInclusionGroups = [
  {
    title: "Cart & presentation",
    items: [
      dessertBookingIncludes[0],
      dessertBookingIncludes[4],
      dessertBookingIncludes[8],
    ],
  },
  {
    title: "Dessert & finishing",
    items: [
      dessertBookingIncludes[1],
      dessertBookingIncludes[2],
      dessertBookingIncludes[3],
    ],
  },
  {
    title: "Service & setup",
    items: [
      dessertBookingIncludes[5],
      dessertBookingIncludes[6],
      dessertBookingIncludes[7],
    ],
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
        <h1 aria-label="Toronto dessert cart catering, made in the moment.">
          <span>Toronto dessert</span>
          <span>cart catering,</span>
          <span>made in the moment.</span>
        </h1>
        <p>
          A live, made-to-order dessert experience where interactive preparation,
          warm cart styling, and final presentation become a memorable part of your
          event atmosphere.
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
  Dessert cart capacity and event requirements.
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
    <ExperienceContextSection
      id="sweet-positioning"
      ariaLabelledBy="sweet-positioning-title"
      legacyClassName="sweet-positioning"
      title={
        <>
          <span>Live dessert cart catering</span>
          <span>for Toronto and GTA events.</span>
        </>
      }
      lead={<>Dessert is prepared in view, finished to order, and presented as part of your event.</>}
      copy={
        <>
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
            Unlike a stationary dessert table, which typically presents
            pre-arranged sweets for self-service, the cart centers on live
            preparation and attendant-led service. Every booking is planned around
            cart style, dessert selection, guest count, venue logistics, service
            window, power, access, and styling details.
          </p>
          <p className="sweet-positioning-handoff">
            Luxe Sweet Cart can be booked independently or coordinated with{" "}
            <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
            <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>{" "}
            through one{" "}
            <QuoteModalTrigger className="sweet-positioning-inquiry">
              Luxe Event Co. inquiry
            </QuoteModalTrigger>
            .
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

function SweetCollections() {
  return (
    <section className="sweet-collections" aria-labelledby="sweet-collections-title">
      <header>
        <p className="foundation-label">Two cart expressions</p>
        <h2 id="sweet-collections-title">Choose your dessert cart style.</h2>
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
        <h2 id="sweet-desserts-title">Made-to-order dessert cart menu.</h2>
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
          <h3>Soft Serve Ice Cream Cart</h3>
          <p>
            Incorporate a premium soft serve ice cream cart into your Sweet Cart menu to
            create an elevated, nostalgic treat for summer weddings, outdoor
            activations, and private parties.
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
          <span>What is included</span>
          <span>with Luxe Sweet Cart?</span>
        </h2>

        <div className="sweet-inclusions-intro">
          <p>
            Every booking includes your choice of cart, professional attendant
            service, fresh live preparation, artisanal sauces, classic toppings,
            luxury menu signage, serving essentials, complete setup, and takedown.
          </p>
          <p>
            Menu selections, guest quantities, service duration, footprint logistics,
            power, and venue access are verified during the planning stage to
            guarantee smooth execution.
          </p>
        </div>
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
        <h2 id="sweet-pantry-title">Dessert cart sauces and toppings.</h2>
        <p>
          Customize your menu with gourmet drizzles, fresh fruits, and premium
          crunches.
        </p>
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

function SweetCustomization() {
  return (
    <section
      className="sweet-customization"
      aria-labelledby="sweet-customization-title"
    >
      <header>
        <p className="foundation-label">Personalized for the occasion</p>
        <h2 className="foundation-wide-heading" id="sweet-customization-title">
          <span>Customize the dessert menu,</span>
          <span>cart, and presentation.</span>
        </h2>
      </header>
      <div>
        {sweetCustomization.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
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
        <h2 id="sweet-operations-title">How much does the Luxe Sweet Cart cost?</h2>
      </header>
      <PriorityAnswer
        label="Cost factors"
        question="What affects dessert cart pricing?"
        answer={sweetPricingAnswer.answer}
        answerContent={
          <>
            {sweetPricingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph.trim()}</p>
            ))}
          </>
        }
        href="/contact"
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
        <h2 className="foundation-wide-heading" id="sweet-events-title">
          <span>Dessert cart catering for weddings,</span>
          <span>corporate events, and celebrations.</span>
        </h2>
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
        <h2 className="foundation-wide-heading" id="sweet-gallery-title">
          <span>Live dessert cart preparation</span>
          <span>and presentation.</span>
        </h2>
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
        <h2 id="sweet-combinations-title">
          <span className="sweet-combinations-title">
            Bring coffee, dessert,<br className="sweet-combinations-title-break" />
            and seating together.
          </span>
        </h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <h3>Luxe Coffee Bar</h3>
          <p>Pair crafted beverages with live dessert preparation through one coordinated inquiry.</p>
          <b aria-hidden="true">Explore Coffee Bar ↗︎</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <h3>Luxe Seating Rentals</h3>
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
        <h2 id="sweet-faq-title">Luxe Sweet Cart menu and service FAQs.</h2>
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
        <SweetCustomization />
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
