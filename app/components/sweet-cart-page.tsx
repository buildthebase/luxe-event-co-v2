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
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const sweetCartPath = "/experiences/sweet-cart";
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
    <header className="sweet-hero">
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
          <Link href="/inquire" data-event-name="inquiry_start">
            Inquire About a Dessert Experience <span aria-hidden="true">↗</span>
          </Link>
          <a href="#dessert-experiences">
            Explore the Dessert Menu <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="sweet-hero-art" aria-hidden="true">
        <span />
        <i />
        <i />
        <b>Prepared on-site</b>
      </div>
      <dl className="sweet-hero-proof">
        <div><dt>Up to 400</dt><dd>Guest capacity</dd></div>
        <div><dt>Up to 3</dt><dd>Simultaneous setups</dd></div>
        <div><dt>$5M</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function SweetPositioning() {
  return (
    <section className="sweet-positioning" aria-labelledby="sweet-positioning-title">
      <p className="foundation-label">More than a place to serve dessert</p>
      <h2 id="sweet-positioning-title">
        The cart is part of the décor. The preparation is part of the experience.
      </h2>
      <div>
        <p>
          Luxe Sweet Cart combines two cart styles, professional attendants,
          desserts prepared on-site, and guest-facing finishing in one setup.
        </p>
        <p>
          It is designed to complement weddings, corporate events, showers,
          activations, birthdays, and private celebrations without feeling like a
          separate concession placed at the edge of the room.
        </p>
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
        <p>
          Classic and Signature describe visual character, not lesser and greater
          packages. Dessert, event styling, and the desired presence guide the
          collection choice.
        </p>
      </header>
      <div>
        {sweetCartCollections.map((collection) => (
          <article className={`sweet-collection-${collection.id}`} key={collection.id}>
            <div className="sweet-collection-art" aria-hidden="true">
              <span>{collection.number}</span><i /><i /><i />
            </div>
            <div className="sweet-collection-copy">
              <p>{collection.name}</p>
              <h3>{collection.character}</h3>
              <p>{collection.description}</p>
              <small>
                Cart availability, dessert service, styling, footprint, and venue
                access are confirmed during inquiry.
              </small>
            </div>
          </article>
        ))}
      </div>
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
            <span>{dessert.number}</span>
            <div aria-hidden="true"><i /><i /></div>
            <h3>{dessert.name}</h3>
            <p>{dessert.description}</p>
          </article>
        ))}
      </div>
      <aside className="sweet-soft-serve">
        <div aria-hidden="true"><i /><i /><i /></div>
        <p className="foundation-label">Optional enhancement</p>
        <h3>Soft Serve Ice Cream</h3>
        <p>
          Soft serve can be added to a Sweet Cart experience when it suits the menu,
          event format, and service plan.
        </p>
      </aside>
    </section>
  );
}

function SweetInclusions() {
  return (
    <section className="sweet-inclusions" aria-labelledby="sweet-inclusions-title">
      <header>
        <p className="foundation-label">Included by design</p>
        <h2 id="sweet-inclusions-title">A complete dessert experience from setup to service.</h2>
        <p>
          Each booking brings together the selected cart, live preparation,
          presentation, attendants, and the details guests need to enjoy the moment.
        </p>
      </header>
      <ol>
        {dessertBookingIncludes.map((item, index) => (
          <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></li>
        ))}
      </ol>
    </section>
  );
}

function SweetPantry() {
  return (
    <section className="sweet-pantry" aria-labelledby="sweet-pantry-title">
      <header>
        <p className="foundation-label">Sauces and toppings</p>
        <h2 id="sweet-pantry-title">The finishing details make each serving personal.</h2>
        <p>
          Premium sauces and a selection of standard toppings are included. Premium
          toppings can extend the menu as enhancements.
        </p>
      </header>
      <div className="sweet-pantry-grid">
        <article>
          <span>01 / Included category</span>
          <h3>Premium sauces</h3>
          <ul>{dessertSauces.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>02 / Included selection</span>
          <h3>Standard toppings</h3>
          <ul>{standardToppings.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article>
          <span>03 / Enhancements</span>
          <h3>Premium toppings</h3>
          <ul>{premiumToppings.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
      </div>
    </section>
  );
}

function SweetCustomization() {
  return (
    <section className="sweet-customization" aria-labelledby="sweet-customization-title">
      <header>
        <p className="foundation-label">Personalized around the event</p>
        <h2 id="sweet-customization-title">
          Dessert, presentation, and identity can be considered together.
        </h2>
      </header>
      <div>
        {sweetCustomization.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SweetOperations() {
  return (
    <section className="sweet-operations" aria-labelledby="sweet-operations-title">
      <header>
        <p className="foundation-label">Capacity and setup</p>
        <h2 id="sweet-operations-title">Live preparation is planned around guest flow.</h2>
      </header>
      <div>
        <article>
          <span>400</span><h3>Guests</h3>
          <p>
            Confirmed capacity reaches up to 400 guests. Dessert choice, service
            duration, staffing, and event flow shape the final plan.
          </p>
        </article>
        <article>
          <span>03</span><h3>Simultaneous setups</h3>
          <p>
            Up to three simultaneous setups can support suitable multi-site,
            multi-day, or distributed event requirements.
          </p>
        </article>
        <article>
          <span>Included</span><h3>Setup and takedown</h3>
          <p>
            Setup and takedown are included, with access and timing coordinated
            around the venue and event schedule.
          </p>
        </article>
        <article>
          <span>Reviewed</span><h3>Venue conditions</h3>
          <p>
            Indoor or outdoor setting, footprint, access, utilities, weather, and
            preparation requirements are confirmed for the selected experience.
          </p>
        </article>
      </div>
      <aside>
        <p>
          Luxe serves Toronto and the GTA, with select destination events considered
          throughout Southern Ontario. Travel fees may apply.
        </p>
        <Link href="/faq">Review booking and logistics questions <span aria-hidden="true">↗</span></Link>
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
            <strong>{event.label}</strong><small>{event.context}</small><b aria-hidden="true">↗</b>
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
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

function SweetCombinations() {
  return (
    <section className="sweet-combinations" aria-labelledby="sweet-combinations-title">
      <header>
        <p className="foundation-label">Within the Luxe family</p>
        <h2 id="sweet-combinations-title">Dessert can meet the arrival and the room around it.</h2>
      </header>
      <div>
        <Link href="/experiences/coffee-bar">
          <span>Coffee + Dessert</span>
          <strong>A café and dessert experience</strong>
          <p>Pair crafted beverages with live dessert preparation through one coordinated inquiry.</p>
          <b aria-hidden="true">Explore Luxe Coffee Bar ↗</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <span>Dessert + Setting</span>
          <strong>A cart considered with the room</strong>
          <p>Connect the dessert moment with seating, tables, tents, linens, or lighting.</p>
          <b aria-hidden="true">Explore Seating Rentals ↗</b>
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
      <FaqAccordion items={sweetCartFaqs} />
    </section>
  );
}

export function SweetCartPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/sweet-cart">
      <main className="sweet-page">
        <JsonLd data={sweetCartSchema} />
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
