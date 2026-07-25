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
    <header className="events-hero">
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
            Find Your Event Experience <span aria-hidden="true">↓</span>
          </a>
          <Link href="/experiences">
            Explore Experiences <span aria-hidden="true">↗</span>
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
        <ol>
          {eventHubEntries.map((event) => (
            <li key={event.slug}>{event.number}</li>
          ))}
        </ol>
      </div>
    </header>
  );
}

export function EventsApproach() {
  return (
    <section
      className="events-approach surface-chapter surface-chapter-dark"
      aria-labelledby="events-approach-title"
    >
      <div className="events-approach-copy">
        <p className="foundation-label">The Luxe event-led approach</p>
        <h2 id="events-approach-title">The event comes first.</h2>
        <p>
          Luxe does not begin by placing every client into the same package.
          The occasion, audience, venue, timing, and desired atmosphere
          determine whether the{" "}
          <Link href="/experiences/coffee-bar">Coffee Bar</Link>,{" "}
          <Link href="/experiences/sweet-cart">Sweet Cart</Link>,{" "}
          <Link href="/experiences/seating-rentals">Seating Rentals</Link>, or
          a combination makes sense.
        </p>
        <p>
          Each division remains a distinct experience. When more than one is
          selected, they can be considered through one parent-brand inquiry and
          proposal journey.
        </p>
      </div>
      <ol className="events-approach-principles">
        {eventLedPrinciples.map((principle) => (
          <li key={principle.number}>
            <span>{principle.number}</span>
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
        <h2 id="events-directory-title">What are you gathering for?</h2>
        <p>
          Choose the event context first. Each pathway leads to more specific
          applications and inquiry language.
        </p>
      </header>
      <div className="events-directory-list">
        {eventHubEntries.map((event) => (
          <article className={`events-directory-${event.slug}`} key={event.slug}>
            <span>{event.number}</span>
            <div>
              <p>{event.cue}</p>
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
              Explore {event.name} <span aria-hidden="true">↗</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

export function EventsGalleryPreview() {
  return (
    <section className="events-gallery" aria-labelledby="events-gallery-title">
      <header>
        <p className="foundation-label">Featured gallery</p>
        <h2 id="events-gallery-title">See the experience in the room.</h2>
        <p>
          Service, presentation, and setting work together differently for each
          kind of gathering.
        </p>
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
              <span>{item.number}</span>
              <strong>{item.label}</strong>
              <small>{item.context}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery" className="events-text-link">
        Explore the Luxe event gallery <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
