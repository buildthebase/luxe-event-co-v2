import Link from "next/link";
import {
  eventHubEntries,
  eventLedPrinciples,
  eventsGalleryPreview,
} from "../events/content";

export function EventsHero({
  titleLines,
}: {
  titleLines: readonly string[];
}) {
  return (
    <header id="page-overview" className="events-hero">
      <div className="events-hero-copy">
        <p className="foundation-eyebrow">Luxe Events / Toronto &amp; the GTA</p>
        <h1 aria-label={titleLines.join(" ")}>
          {titleLines.map((line) => (
            <span aria-hidden="true" key={line}>
              {line}
            </span>
          ))}
        </h1>
        <p>
          Weddings, corporate events, brand activations, showers, birthdays,
          and private celebrations each ask for something different. Start with
          what you are planning, then find the Luxe experiences that belong
          within it.
        </p>
        <div className="events-hero-actions">
          <a href="#event-pathways" data-event-name="event_type_select">
            Find Your Event Experience <span aria-hidden="true">↓︎</span>
          </a>
          <Link href="/experiences">
            Explore Experiences <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </div>
      <div className="events-hero-composition" aria-hidden="true">
        <span className="events-hero-orbit events-hero-orbit-one" />
        <span className="events-hero-orbit events-hero-orbit-two" />
        <span className="events-hero-stage">
          <i />
          <i />
          <i />
        </span>
      </div>
    </header>
  );
}

export function EventsApproach() {
  return (
    <section
      id="event-led-approach"
      className="events-approach surface-chapter surface-chapter-dark"
      aria-labelledby="events-approach-title"
    >
      <div className="events-approach-intro">
        <p className="foundation-label">The Luxe event-led approach</p>
        <h2 id="events-approach-title">The event comes first.</h2>
        <p className="events-approach-lead">
          Luxe brings together coffee, dessert, seating, and event rentals
          according to what the occasion genuinely requires.
        </p>
      </div>
      <div className="events-approach-body">
        <p>
          Each experience can be booked independently or coordinated within one
          event plan. The venue, guest count, schedule, service needs, and
          desired atmosphere shape which services are included and how they work
          together.
        </p>
        <p>
          <Link href="/experiences/coffee-bar">Coffee Bar</Link> can support
          hospitality and conversation. <Link href="/experiences/sweet-cart">Sweet Cart</Link>{" "}
          can create a live guest moment. <Link href="/experiences/seating-rentals">Seating Rentals</Link>{" "}
          can shape comfort, movement, service areas, and the way the room is experienced.
        </p>
      </div>
      <p className="events-approach-closing">
        One Luxe Event Co. inquiry can coordinate the selected experiences while
        allowing each service to retain its own purpose and character.
      </p>
      <ol className="events-approach-principles">
        {eventLedPrinciples.map((principle) => (
          <li key={principle.number}>
            <strong>{principle.label}</strong>
            <p>{principle.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function EventsDirectory() {
  return (
    <section
      className="events-directory"
      id="event-pathways"
      aria-labelledby="events-directory-title"
    >
      <header>
        <p className="foundation-label">Explore by occasion</p>
        <h2 id="events-directory-title">Plan around the occasion.</h2>
        <p>
          Explore how Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals
          can be planned for weddings, corporate events, brand activations,
          showers, birthdays, and private celebrations across Toronto and the
          GTA.
        </p>
      </header>
      <div className="events-directory-list">
        {eventHubEntries.map((event) => (
          <article className={`events-directory-${event.slug}`} key={event.slug}>
            <div>
              <h3>{event.name}</h3>
            </div>
            <div>
              <strong>{event.statement}</strong>
              <p>{event.summary}</p>
            </div>
            <Link
              href={`/events/${event.slug}`}
              data-event-name="event_type_select"
              data-event-type={event.slug}
            >
              Explore {event.name} <span aria-hidden="true">↗︎</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventsGalleryPreview() {
  return (
    <section id="gallery" className="events-gallery" aria-labelledby="events-gallery-title">
      <header>
        <p className="foundation-label">Featured gallery</p>
        <h2 id="events-gallery-title">See the experience in the room.</h2>
      </header>
      <div
        className="events-gallery-grid"
        data-asset-status="awaiting-approved-photography"
      >
        {eventsGalleryPreview.map((item) => (
          <figure className={`events-gallery-${item.tone}`} key={item.id}>
            <div aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <figcaption>
              <strong>{item.label}</strong>
              <small>{item.context}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery" className="events-text-link">
        Explore the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}
