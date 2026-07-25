import Link from "next/link";
import {
  coffeeBookingIncludes,
  coffeeCustomization,
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
import { createServicePageSchema, divisionServiceIds } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel, CredibilityStrip } from "./signature-elements";
import { SiteShell } from "./site-shell";

const coffeePath = "/experiences/coffee-bar";
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
    <header className="coffee-hero">
      <div className="coffee-hero-copy">
        <p className="foundation-eyebrow">Luxe Coffee Bar / Toronto &amp; the GTA</p>
        <h1 aria-label="A mobile coffee bar, made for the gathering.">
          <span>A mobile coffee bar,</span>
          <span>made for the gathering.</span>
        </h1>
        <p>
          A complete mobile café experience shaped around the event, with professional
          baristas, handcrafted beverages, considered presentation, and hospitality
          that becomes part of the room.
        </p>
        <div className="coffee-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Inquire About Coffee Service <span aria-hidden="true">↗</span>
          </Link>
          <a href="#coffee-formats">
            Compare Coffee Experiences <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="coffee-hero-art" aria-hidden="true">
        <span />
        <i />
        <i />
        <b>Crafted in the room</b>
      </div>
      <dl className="coffee-hero-proof">
        <div>
          <dt>Up to 500</dt>
          <dd>Guest capacity</dd>
        </div>
        <div>
          <dt>Up to 3</dt>
          <dd>Simultaneous setups</dd>
        </div>
        <div>
          <dt>$5M</dt>
          <dd>Liability insurance</dd>
        </div>
      </dl>
    </header>
  );
}

function CoffeeOverview() {
  return (
    <section className="coffee-overview" aria-labelledby="coffee-overview-title">
      <p className="foundation-label">A café experience, not simply a cart</p>
      <h2 id="coffee-overview-title">
        Coffee is treated as hospitality, atmosphere, and a live guest moment.
      </h2>
      <div>
        <p>
          Luxe Coffee Bar brings the craft and feeling of a refined café into
          weddings, corporate gatherings, brand activations, and private
          celebrations.
        </p>
        <p>
          The experience is built around quality coffee, efficient service, visual
          presentation, and a menu that can respond to the occasion. Clients can book
          Coffee Bar independently or coordinate it with Luxe Sweet Cart and Luxe
          Seating Rentals through one Luxe Event Co. inquiry.
        </p>
      </div>
    </section>
  );
}

function CoffeeFormats() {
  return (
    <section className="coffee-formats" id="coffee-formats" aria-labelledby="coffee-formats-title">
      <header>
        <p className="foundation-label">Two complete expressions</p>
        <h2 id="coffee-formats-title">Choose the presence coffee should have.</h2>
        <p>
          Neither format is a lesser tier. The right choice depends on the event,
          guest count, service duration, setting, and how visible the coffee
          experience should feel.
        </p>
      </header>
      <div className="coffee-format-pair">
        {coffeeFormats.map((format) => (
          <article className={`coffee-format-${format.id}`} key={format.id}>
            <div className="coffee-format-art" aria-hidden="true">
              <span>{format.number}</span>
              <i />
              <i />
            </div>
            <div className="coffee-format-copy">
              <p>{format.name}</p>
              <h3>{format.statement}</h3>
              <p>{format.description}</p>
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
    </section>
  );
}

function CoffeeInclusions() {
  return (
    <section className="coffee-inclusions" aria-labelledby="coffee-inclusions-title">
      <header>
        <p className="foundation-label">Included by design</p>
        <h2 id="coffee-inclusions-title">
          The details that make it a complete coffee experience.
        </h2>
        <p>
          Signature drinks, iced beverages, matcha options, and premium milk
          alternatives belong inside the experience rather than appearing as a list
          of individual paid upgrades.
        </p>
      </header>
      <ol>
        {coffeeBookingIncludes.map((inclusion, index) => (
          <li key={inclusion}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{inclusion}</strong>
          </li>
        ))}
      </ol>
    </section>
  );
}

function CoffeeMenu() {
  return (
    <section className="coffee-menu" aria-labelledby="coffee-menu-title">
      <header>
        <p className="foundation-label">The beverage language</p>
        <h2 id="coffee-menu-title">Classic at the foundation. Personal in expression.</h2>
        <p>
          Every menu begins with four espresso classics, then makes room for
          signature drinks, matcha, and a premium non-coffee selection. Hot and iced
          service and dairy and premium milk alternatives are included.
        </p>
      </header>
      <div className="coffee-menu-core">
        <article>
          <span>01</span>
          <h3>Espresso classics</h3>
          <ul>
            {espressoClassics.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article>
          <span>02</span>
          <h3>Signature coffee collection</h3>
          <ul>
            {signatureCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
        <article>
          <span>03</span>
          <h3>Matcha and non-coffee</h3>
          <ul>
            {nonCoffeeCollection.map((drink) => <li key={drink}>{drink}</li>)}
          </ul>
        </article>
      </div>
      <div className="coffee-seasonal">
        <div>
          <p className="foundation-label">Seasonal collections</p>
          <h3>A menu that can move with the calendar.</h3>
        </div>
        <div className="coffee-seasonal-grid">
          {seasonalCoffeeCollections.map((collection) => (
            <article key={collection.season}>
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

function CoffeeCustomization() {
  return (
    <section className="coffee-customization" aria-labelledby="coffee-customization-title">
      <header>
        <p className="foundation-label">Made specific to the occasion</p>
        <h2 id="coffee-customization-title">
          The menu and its presentation can carry the event identity.
        </h2>
      </header>
      <div>
        {coffeeCustomization.map((item) => (
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

function CoffeeOperations() {
  return (
    <section className="coffee-operations" aria-labelledby="coffee-operations-title">
      <header>
        <p className="foundation-label">Capacity and service planning</p>
        <h2 id="coffee-operations-title">
          The service plan follows the room, menu, and guest flow.
        </h2>
      </header>
      <div className="coffee-operation-grid">
        <article>
          <span>500</span>
          <h3>Guests</h3>
          <p>
            Confirmed capacity reaches up to 500 guests. Capacity does not imply one
            fixed service speed; menu complexity, duration, staffing, and event flow
            shape the plan.
          </p>
        </article>
        <article>
          <span>03</span>
          <h3>Simultaneous setups</h3>
          <p>
            Luxe can support up to three simultaneous setups for suitable multi-site,
            multi-day, or distributed event requirements.
          </p>
        </article>
        <article>
          <span>Included</span>
          <h3>Setup and takedown</h3>
          <p>
            Setup and takedown are included. Exact access and timing are coordinated
            with the venue and event schedule.
          </p>
        </article>
        <article>
          <span>Confirmed</span>
          <h3>Space, power, and water</h3>
          <p>
            Requirements vary by format, menu, venue, and indoor or outdoor setting.
            Luxe confirms the footprint and any utility access after reviewing the
            event details.
          </p>
        </article>
      </div>
      <aside>
        <p>
          Based in Toronto, Luxe serves the GTA and considers select destination
          events throughout Southern Ontario. Travel fees may apply outside the
          standard service area.
        </p>
        <Link href="/faq">Review booking and logistics questions <span aria-hidden="true">↗</span></Link>
      </aside>
    </section>
  );
}

function CoffeeEvents() {
  return (
    <section className="coffee-events" aria-labelledby="coffee-events-title">
      <header>
        <h2 id="coffee-events-title">Different occasions give the café a different role.</h2>
      </header>
      <div>
        {coffeeEventLinks.map((event, index) => (
          <Link href={event.href} key={event.href}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{event.label}</strong>
            <small>{event.context}</small>
            <b aria-hidden="true">↗</b>
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
        <h2 id="coffee-gallery-title">The craft should be seen in service.</h2>
        <p>
          Preparation, presentation, and guest interaction show how the coffee
          bar becomes part of the event.
        </p>
      </header>
      <div className="coffee-gallery-grid" data-asset-status="awaiting-approved-photography">
        {coffeeGalleryPreview.map((item) => (
          <figure className={`coffee-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /></div>
            <figcaption>
              <span>{item.number}</span>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe event gallery <span aria-hidden="true">↗</span></Link>
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
          <span>02 / Dessert</span>
          <strong>Luxe Sweet Cart</strong>
          <p>Pair crafted drinks with a live, made-to-order dessert experience.</p>
          <b aria-hidden="true">Explore Sweet Cart ↗</b>
        </Link>
        <Link href="/experiences/seating-rentals">
          <span>03 / Seating</span>
          <strong>Luxe Seating Rentals</strong>
          <p>Connect café hospitality with the structure and setting around it.</p>
          <b aria-hidden="true">Explore Seating Rentals ↗</b>
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
      <FaqAccordion items={coffeeFaqs} />
    </section>
  );
}

export function CoffeeBarPage() {
  return (
    <SiteShell breadcrumbPath="/experiences/coffee-bar">
      <main className="coffee-page">
        <JsonLd data={coffeeBarSchema} />
        <CoffeeHero />
        <CoffeeOverview />
        <CoffeeFormats />
        <CoffeeInclusions />
        <CoffeeMenu />
        <CoffeeCustomization />
        <CoffeeOperations />
        <CoffeeEvents />
        <CoffeeGallery />
        <CredibilityStrip />
        <CoffeeRelated />
        <CoffeeFaq />
        <ContextualInquiryPanel contextKey="coffee-bar" />
      </main>
    </SiteShell>
  );
}
