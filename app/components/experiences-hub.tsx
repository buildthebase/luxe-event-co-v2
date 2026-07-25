import Link from "next/link";
import {
  experienceGalleryPreview,
  experienceHubFeatures,
  experienceNeedComparison,
  type ExperienceHubFeature,
} from "../experiences/content";
import { eventTypes } from "../site-config";

export function ExperiencesHero({
  titleLines,
}: {
  titleLines: readonly string[];
}) {
  return (
    <header className="experiences-hero">
      <div className="experiences-hero-copy">
        <p className="foundation-eyebrow">Luxe Experiences / Toronto &amp; the GTA</p>
        <h1 aria-label={titleLines.join(" ")}>
          {titleLines.map((line) => (
            <span aria-hidden="true" key={line}>
              {line}
            </span>
          ))}
        </h1>
        <p>
          Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals are three
          independent experiences within Luxe Event Co. Each has its own role,
          atmosphere, and expertise, with the option to bring them together for one
          event.
        </p>
        <div className="experiences-hero-actions">
          <a href="#experience-selector" data-event-name="experience_select">
            Explore an Experience <span aria-hidden="true">↓</span>
          </a>
          <Link href="/inquire" data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
      <div className="experiences-hero-world" aria-hidden="true">
        <span className="experiences-hero-plane experiences-hero-plane-coffee">
          <b>01</b>
        </span>
        <span className="experiences-hero-plane experiences-hero-plane-dessert">
          <b>02</b>
        </span>
        <span className="experiences-hero-plane experiences-hero-plane-seating">
          <b>03</b>
        </span>
        <i />
      </div>
    </header>
  );
}

export function ExperiencesBookingClarity() {
  return (
    <section
      className="experiences-booking-clarity surface-chapter surface-chapter-dark"
      aria-labelledby="experiences-booking-title"
    >
      <div>
        <p className="foundation-label">Independent or combined</p>
        <h2 id="experiences-booking-title">Begin with what the event needs.</h2>
      </div>
      <dl>
        <div>
          <dt>Can each experience be booked independently?</dt>
          <dd>
            Yes. Coffee Bar, Sweet Cart, and Seating Rentals each maintain their own
            identity, service direction, and dedicated inquiry path.
          </dd>
        </div>
        <div>
          <dt>Can multiple Luxe experiences be combined?</dt>
          <dd>
            Yes. Coffee and dessert are frequently booked together, and coffee,
            dessert, and rentals can be considered within one coordinated event
            inquiry.
          </dd>
        </div>
      </dl>
    </section>
  );
}

function ExperienceFeature({ feature }: { feature: ExperienceHubFeature }) {
  return (
    <article
      className={`experiences-feature experiences-feature-${feature.id}`}
      id={`experience-${feature.id}`}
    >
      <div className="experiences-feature-art" aria-hidden="true">
        <span>{feature.number}</span>
        <i />
        <i />
        <i />
      </div>
      <div className="experiences-feature-copy">
        <p className="foundation-label">{feature.eyebrow}</p>
        <h2>{feature.statement}</h2>
        <h3>{feature.name}</h3>
        <p>{feature.description}</p>
        <ul>
          {feature.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
        <div className="experiences-feature-footer">
          <p>
            <strong>{feature.fact}</strong>
            <span>{feature.factLabel}</span>
          </p>
          <Link
            href={feature.href}
            data-event-name="experience_select"
            data-experience={feature.id}
          >
            {feature.cta} <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function ExperienceFeatures() {
  return (
    <section className="experiences-features" aria-label="The three Luxe experiences">
      {experienceHubFeatures.map((feature) => (
        <ExperienceFeature feature={feature} key={feature.id} />
      ))}
    </section>
  );
}

export function ExperienceNeedComparison() {
  return (
    <section
      className="experiences-comparison surface-chapter surface-chapter-dark"
      aria-labelledby="experiences-comparison-title"
    >
      <header>
        <p className="foundation-label">Compare by event need</p>
        <h2 id="experiences-comparison-title">
          Start with the atmosphere you want to create.
        </h2>
      </header>
      <div className="experiences-comparison-list">
        {experienceNeedComparison.map((item, index) => (
          <Link href={item.href} key={item.need}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{item.need}</strong>
            <small>{item.atmosphere}</small>
            <b>{item.experience}</b>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ExperiencesEventTypes() {
  return (
    <section className="experiences-events" aria-labelledby="experiences-events-title">
      <header>
        <p className="foundation-label">Explore by occasion</p>
        <h2 id="experiences-events-title">
          Different events ask the experiences to play different roles.
        </h2>
      </header>
      <div className="experiences-event-list">
        {eventTypes.map((event, index) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{event.name}</strong>
            <small>{event.summary}</small>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ExperiencesGalleryPreview() {
  return (
    <section
      className="experiences-gallery surface-chapter surface-chapter-taupe"
      aria-labelledby="experiences-gallery-title"
    >
      <header>
        <p className="foundation-label">Seen in context</p>
        <h2 id="experiences-gallery-title">
          Three expressions. One record of the event.
        </h2>
        <p>
          Read each study through the experience and occasion it represents, then
          move into the full event collection.
        </p>
      </header>
      <div
        className="experiences-gallery-grid"
        data-asset-status="awaiting-approved-photography"
      >
        {experienceGalleryPreview.map((item) => (
          <figure className={`experiences-gallery-${item.tone}`} key={item.id}>
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
      <Link href="/gallery" className="experiences-text-link">
        Explore the Luxe event gallery <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
