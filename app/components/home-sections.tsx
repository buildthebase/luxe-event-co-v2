import Link from "next/link";
import { Fragment } from "react";
import { ResponsiveImage } from "./responsive-image";
import {
  featuredHomeEvents,
  homeEventImageGroups,
  homeImageSlots,
  homeProofPoints,
  homeServiceAreaGroups,
  homeWorkingImage,
  homeWorkingPrinciples,
} from "../home-content";

function HomeEditorialImage({
  slot,
  compact = false,
}: {
  slot: {
    id: string;
    label: string;
    context: string;
    tone: string;
    image: Parameters<typeof ResponsiveImage>[0]["asset"];
  };
  compact?: boolean;
}) {
  const fallback = (
    <div className="home-editorial-art" aria-hidden="true">
      <i />
      <i />
      <i />
    </div>
  );

  return (
    <figure
      className={`home-editorial-image home-image-slot-${slot.tone}${compact ? " home-editorial-image-compact" : ""}`}
      data-asset-status={slot.image.status}
    >
      <div className="home-editorial-frame">
        <ResponsiveImage asset={slot.image} fallback={fallback} fill />
      </div>
      <figcaption>
        <strong>{slot.label}</strong>
        <small>{slot.context}</small>
      </figcaption>
    </figure>
  );
}

export function HomePositioning() {
  return (
    <section id="luxe-family" className="home-positioning" aria-labelledby="home-positioning-title">
      <h2 id="home-positioning-title">
        Coffee, dessert, and seating, together for your event.
      </h2>
      <div>
        <p className="home-positioning-parent">
          <strong>Luxe Event Co.</strong>
          <span>is the parent company behind:</span>
        </p>
        <ul className="home-positioning-services">
          <li><Link href="#experience-selector-coffee">Luxe Coffee Bar</Link></li>
          <li><Link href="#experience-selector-dessert">Luxe Sweet Cart</Link></li>
          <li><Link href="#experience-selector-seating">Luxe Seating Rentals</Link></li>
        </ul>
      </div>
    </section>
  );
}

export function HomeUnifiedExperience() {
  return (
    <section id="unified-experience" className="home-unified" aria-labelledby="home-unified-title">
      <div className="home-unified-heading">
        <p className="foundation-label">The unified Luxe experience</p>
        <h2 id="home-unified-title">Begin with one. Consider the whole occasion.</h2>
      </div>
      <div className="home-unified-copy">
        <ul className="home-unified-event-list">
          <li>
            <span className="home-unified-event-mark home-unified-event-mark-private" aria-hidden="true" />
            <p>For a wedding, espresso may carry cocktail hour into the evening.</p>
          </li>
          <li>
            <span className="home-unified-event-mark home-unified-event-mark-corporate" aria-hidden="true" />
            <p>
              A corporate gathering may pair branded drinks with seating designed
              for conversation.
            </p>
          </li>
          <li>
            <span className="home-unified-event-mark home-unified-event-mark-wedding" aria-hidden="true" />
            <p>
              A private celebration may bring live dessert service into the setting
              itself.
            </p>
          </li>
        </ul>
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
    <section id="event-types" className="home-events" aria-labelledby="home-events-title">
      <header className="home-section-intro home-section-intro-single">
        <div>
          <h2 id="home-events-title">Different gatherings ask for different details.</h2>
        </div>
      </header>
      <div className="home-event-groups">
        {homeEventImageGroups.map((group, groupIndex) => (
          <Fragment key={group.id}>
            <div className="home-event-group">
              <HomeEditorialImage slot={group} />
              <div className="home-event-list">
                {group.eventSlugs.map((slug) => {
                  const event = featuredHomeEvents.find((item) => item.slug === slug)!;

                  return (
                    <Link href={`/events/${event.slug}`} key={event.slug}>
                      <strong>{event.name}</strong>
                      <small>{event.summary}</small>
                      <b aria-hidden="true">↗︎</b>
                    </Link>
                  );
                })}
              </div>
            </div>
            {groupIndex === 0 ? (
              <div className="home-event-breaker" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
      <Link href="/events" className="home-text-link">
        Explore every event pathway
      </Link>
    </section>
  );
}

export function HomeSelectedImagery() {
  return (
    <section id="contextual-imagery" className="home-imagery" aria-labelledby="home-imagery-title">
      <header className="home-section-intro">
        <div>
          <h2 id="home-imagery-title">The work should be seen in context.</h2>
        </div>
      </header>
      <div className="home-imagery-grid">
        {homeImageSlots.map((slot) => (
          <HomeEditorialImage compact slot={slot} key={slot.id} />
        ))}
      </div>
      <Link href="/gallery" className="home-text-link">
        Visit the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}

export function HomeTrust() {
  return (
    <section
      id="operational-proof"
      className="home-trust"
      aria-labelledby="home-trust-title"
      data-evidence-status="confirmed-first-party"
    >
      <header>
        <p className="foundation-label">Confirmed operating facts</p>
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
    <section id="working-with-luxe" className="home-working" aria-labelledby="home-working-title">
      <header className="home-section-intro home-section-intro-single">
        <div>
          <h2 id="home-working-title">What working with Luxe feels like</h2>
        </div>
      </header>
      <div className="home-working-layout">
        <div className="home-working-media">
          <HomeEditorialImage slot={homeWorkingImage} />
        </div>
        <div className="home-working-grid">
          {homeWorkingPrinciples.map((principle) => (
            <article key={principle.title}>
              <span aria-label={principle.markerLabel} role="img">
                {principle.marker}
              </span>
              <h3>{principle.title}</h3>
              <p>{principle.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomeServiceArea() {
  return (
    <section
      id="service-area"
      className="home-service-area"
      aria-labelledby="home-service-area-title"
      data-evidence-status="confirmed-first-party"
    >
      <div>
        <p className="foundation-label">Service area</p>
        <h2
          id="home-service-area-title"
          aria-label="Toronto, GTA, Southern Ontario."
        >
          <span className="home-service-area-title-desktop">
            Toronto at the centre. The GTA and Southern Ontario within reach.
          </span>
          <span className="home-service-area-title-mobile" aria-hidden="true">
            <span>Toronto,</span>
            <span>GTA,</span>
            <span>Southern Ontario.</span>
          </span>
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
    </section>
  );
}
