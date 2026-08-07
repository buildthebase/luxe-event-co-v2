import Link from "next/link";
import {
  experienceGalleryPreview,
  experienceHubFeatures,
  type ExperienceHubFeature,
} from "../experiences/content";
import { eventTypes } from "../site-config";
import { QuoteModalTrigger } from "./quote-modal-trigger";

export function ExperiencesHero({
  titleLines,
}: {
  titleLines: readonly string[];
}) {
  return (
    <header id="page-overview" className="experiences-hero">
      <div className="experiences-hero-copy">
        <p className="foundation-eyebrow">Luxe Experiences / Toronto &amp; the GTA</p>
        <h1 aria-label={titleLines.join(" ")}>
          {titleLines.map((line) => (
            <span aria-hidden="true" key={line}>
              {line}{" "}
            </span>
          ))}
        </h1>
        <p>
          Luxe Event Co. provides mobile coffee bars, live dessert carts, seating,
          and event rentals for weddings, corporate events, brand activations, and
          private celebrations across Toronto and the GTA. Book Luxe Coffee Bar,
          Luxe Sweet Cart, or <span className="experiences-hero-seating-name">
            Luxe Seating Rentals
          </span>{" "}
          independently, or coordinate all three through one team.
        </p>
        <div className="experiences-hero-actions">
          <a href="#experience-coffee" data-event-name="experience_select">
            Build Your Experience <span aria-hidden="true">↓︎</span>
          </a>
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
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
      id="booking-approach"
      className="experiences-booking-clarity surface-chapter surface-chapter-dark"
      aria-labelledby="experiences-booking-title"
    >
      <header>
        <p className="foundation-label">Independent or combined</p>
        <h2 id="experiences-booking-title">Begin with what the event needs.</h2>
      </header>
      <dl>
        <div>
          <dt>Can each experience be booked independently?</dt>
          <dd>
            Yes. Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals each
            maintain their own identity, service direction, and dedicated inquiry
            path. Separate specialist vendors can also be appropriate when the client
            already has a coordination plan and wants to select every category
            independently.
          </dd>
        </div>
        <div>
          <dt>Can coffee, dessert, and rentals be coordinated through one provider?</dt>
          <dd className="experiences-booking-answer">
            <p>
              Yes. Luxe Event Co. is the parent company behind all three experiences, so
              Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be planned
              through one inquiry and proposal journey while each service keeps its
              own specialist scope. One coordinated provider is useful when timing,
              placement, presentation, access, and responsibilities need to be reviewed
              together.
            </p>
          </dd>
        </div>
      </dl>
      <ul
        className="experiences-booking-proof"
        aria-label="Luxe Event Co. operational credentials"
      >
        <li>
          <strong>$5 million{" "}</strong>
          <span>liability insurance</span>
        </li>
        <li>
          <strong>Up to 500{" "}</strong>
          <span>coffee-service guests</span>
        </li>
        <li>
          <strong>Up to 400{" "}</strong>
          <span>dessert-service guests</span>
        </li>
        <li>
          <strong>Three{" "}</strong>
          <span>simultaneous coffee and dessert setups</span>
        </li>
        <li>
          <strong>Southern Ontario{" "}</strong>
          <span>select destination events</span>
        </li>
      </ul>
      <aside
        className="experiences-booking-shared"
        aria-label="Shared booking and pricing guidance"
      >
        <p>
          The right model depends on the services required, who will manage vendor
          handoffs, and how much operational overlap the event contains. Combining
          services can affect the overall quote because staffing, equipment, delivery,
          setup, travel, timing, and shared logistics are scoped together; it does not
          create an automatic discount or surcharge.
        </p>
      </aside>
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
        <i />
        <i />
        <i />
      </div>
      <div className="experiences-feature-copy">
        <p className="foundation-label">{feature.eyebrow}</p>
        <h2>
          {feature.name}: {feature.searchDescriptor}
        </h2>
        <h3>{feature.statement}</h3>
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
            {feature.cta} <span aria-hidden="true">↗︎</span>
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
      id="experience-comparison"
      className="experiences-comparison experiences-comparison-cta surface-chapter surface-chapter-dark"
      aria-labelledby="experiences-comparison-title"
      data-measurement-section="comparison"
      data-section-id="experience-need-comparison"
    >
      <h2 id="experiences-comparison-title">
        Start with the atmosphere you want to create.
      </h2>
      <span className="experiences-comparison-cta-arrow" aria-hidden="true" />
      <div className="experiences-comparison-cta-copy">
        <p>
          <span>Begin with one experience, or bring them together.</span>
          <span>Create an event your guests will remember.</span>
        </p>
        <QuoteModalTrigger
          className="experiences-comparison-cta-link"
          data-event-name="inquiry_start"
        >
          Begin your proposal <span aria-hidden="true">↗︎</span>
        </QuoteModalTrigger>
      </div>
    </section>
  );
}

export function ExperiencesEventTypes() {
  return (
    <section id="event-types" className="experiences-events" aria-labelledby="experiences-events-title">
      <header>
        <p className="foundation-label">Explore by occasion</p>
        <h2 id="experiences-events-title">
          <span>Different occasion.</span> <span>Different experience.</span>
        </h2>
      </header>
      <div className="experiences-event-list">
        {eventTypes.map((event, index) => (
          <Link href={`/events/${event.slug}`} key={event.slug}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{event.name}</strong>
            <small>{event.summary}</small>
            <b aria-hidden="true">↗︎</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function ExperiencesGalleryPreview() {
  return (
    <section
      id="gallery"
      className="experiences-gallery surface-chapter surface-chapter-taupe"
      aria-labelledby="experiences-gallery-title"
    >
      <header>
        <p className="foundation-label">Seen in context</p>
        <h2 id="experiences-gallery-title">
Each experience, in its element.
        </h2>
<p>
  See how Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals take
  shape across real gatherings, then explore the full event gallery.
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
        Explore the Luxe event gallery <span aria-hidden="true">↗︎</span>
      </Link>
    </section>
  );
}
