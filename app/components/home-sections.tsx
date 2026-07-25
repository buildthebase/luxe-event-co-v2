import Link from "next/link";
import {
  featuredHomeEvents,
  homeImageSlots,
  homeProofPoints,
  homeServiceAreaGroups,
  homeWorkingPrinciples,
} from "../home-content";
import { siteConfig } from "../site-config";

export function HomePositioning() {
  return (
    <section className="home-positioning" aria-labelledby="home-positioning-title">
      <h2 id="home-positioning-title">
        Coffee, dessert, and seating, together for your event.
      </h2>
      <div>
        <p>
          Luxe Event Co. is the parent company behind Luxe Coffee Bar, Luxe
          Sweet Cart, and Luxe Seating Rentals. Each division can be booked
          independently or coordinated through one inquiry, while retaining
          its own service identity and role in the event.
        </p>
      </div>
    </section>
  );
}

export function HomeUnifiedExperience() {
  return (
    <section className="home-unified" aria-labelledby="home-unified-title">
      <div className="home-unified-heading">
        <p className="foundation-label">The unified Luxe experience</p>
        <h2 id="home-unified-title">Begin with one. Consider the whole occasion.</h2>
      </div>
      <div className="home-unified-copy">
        <p>
          For a wedding, espresso may carry cocktail hour into the evening. A
          corporate gathering may pair branded drinks with seating shaped for
          conversation. A private celebration may bring live dessert into the
          setting itself.
        </p>
        <p>
          Each experience remains distinct. Luxe Event Co. coordinates the details
          as one considered event, with the character and expertise of every
          division intact.
        </p>
      </div>
      <ol className="home-unified-notes">
        <li><span>01</span>Book an experience independently.</li>
        <li><span>02</span>Combine complementary services.</li>
        <li><span>03</span>Personalize the presentation and flow.</li>
      </ol>
    </section>
  );
}

export function HomeEventCategories() {
  return (
    <section className="home-events" aria-labelledby="home-events-title">
      <header className="home-section-intro home-section-intro-single">
        <div>
          <h2 id="home-events-title">Different gatherings ask for different details.</h2>
        </div>
      </header>
      <div className="home-event-list">
        {featuredHomeEvents.map((event) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <span>{event.number}</span>
            <strong>{event.name}</strong>
            <small>{event.summary}</small>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
      <Link href="/events" className="home-text-link">
        Explore every event pathway <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export function HomeSelectedImagery() {
  return (
    <section className="home-imagery" aria-labelledby="home-imagery-title">
      <header className="home-section-intro">
        <div>
          <h2 id="home-imagery-title">The work should be seen in context.</h2>
        </div>
        <p>
          Guest interaction, fresh preparation, and the room itself reveal how
          each Luxe experience contributes to the occasion.
        </p>
      </header>
      <div className="home-imagery-grid" data-asset-status="awaiting-approved-photography">
        {homeImageSlots.map((slot, index) => (
          <figure className={`home-image-slot home-image-slot-${slot.tone}`} key={slot.id}>
            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <figcaption>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{slot.label}</strong>
              <small>{slot.context}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery" className="home-text-link">
        Visit the Luxe event gallery <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export function HomeTrust() {
  return (
    <section className="home-trust" aria-labelledby="home-trust-title">
      <header>
        <p className="foundation-label">Operational assurance</p>
        <h2 id="home-trust-title">Prepared for rooms where details matter.</h2>
        <p>
          Luxe supports private hosts, wedding professionals, venues, corporate
          teams, and brand partners across a wide range of event formats.
        </p>
      </header>
      <div className="home-proof-grid">
        {homeProofPoints.map((proof) => (
          <article key={proof.label}>
            <strong>{proof.value}</strong>
            <span>{proof.label}</span>
            <p>{proof.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeWorkingExperience() {
  return (
    <section className="home-working" aria-labelledby="home-working-title">
      <header className="home-section-intro home-section-intro-single">
        <div>
          <h2 id="home-working-title">What working with Luxe feels like</h2>
        </div>
      </header>
      <div className="home-working-grid">
        {homeWorkingPrinciples.map((principle) => (
          <article key={principle.number}>
            <span>{principle.number}</span>
            <h3>{principle.title}</h3>
            <p>{principle.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function HomeServiceArea() {
  return (
    <section className="home-service-area" aria-labelledby="home-service-area-title">
      <div>
        <p className="foundation-label">Service area</p>
        <h2 id="home-service-area-title">
          Toronto at the centre. The GTA and Southern Ontario within reach.
        </h2>
        <p>
          Luxe Event Co. serves weddings, corporate events, brand activations, and
          private celebrations across Toronto and the Greater Toronto Area, with
          select destination events available throughout Southern Ontario.
        </p>
      </div>
      <dl>
        {homeServiceAreaGroups.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.places.join(" · ")}</dd>
          </div>
        ))}
      </dl>
      <a href={`mailto:${siteConfig.contact.email}`} className="home-text-link" data-event-name="email_click">
        {siteConfig.contact.email} <span aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
