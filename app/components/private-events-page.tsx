import Link from "next/link";
import {
  privateEventCombinations,
  privateEventContexts,
  privateEventExperiences,
  privateEventFaqs,
  privateEventGallery,
  privateEventPlanningRequirements,
} from "../events/private-events-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const privateEventsPath = "/events/private-events";
const privateEventsSchema = createServicePageSchema({
  path: privateEventsPath,
  serviceName: "Private event coffee, dessert, and rental experiences",
  serviceType: "Private event coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Staffed coffee service, non-coffee beverages, live dessert, signage, and event rentals for private celebrations in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[privateEventsPath].title,
  pageDescription: pageMetadata[privateEventsPath].description,
  faqs: privateEventFaqs,
});

function PrivateEventsHero() {
  return (
    <header className="private-hero">
      <div className="private-hero-copy">
        <p className="foundation-eyebrow">Private Events / Toronto &amp; the GTA</p>
        <h1 aria-label="Private Event Coffee, Dessert & Rentals in Toronto">
          <span>Private Event Coffee,</span>
          <span>Dessert &amp; Rentals in Toronto</span>
        </h1>
        <p>
          Elevate engagements, anniversaries, graduations, holiday parties, and
          intimate gatherings with custom mobile coffee bars, live dessert
          stations, and boutique rentals tailored to your vision.
        </p>
        <div className="private-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Discuss Your Event <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#private-occasions">
            Explore the Occasions <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="private-hero-art" aria-hidden="true">
        <div><i /><i /><i /></div>
        <strong>Yours,<br />by design.</strong>
        <span>One occasion.<br />Its own composition.</span>
      </div>
      <dl className="private-hero-proof">
        <div>
          <dt>One or several</dt>
          <dd>Book coffee bars, live dessert carts, or seating rentals individually or seamlessly bundled.</dd>
        </div>
        <div>
          <dt>Personalized</dt>
          <dd>Tailor custom drink menus, branded cart decals, signage, and seating layouts to your theme.</dd>
        </div>
        <div>
          <dt>$5 million</dt>
          <dd>Full commercial liability coverage for complete peace of mind at any venue.</dd>
        </div>
      </dl>
    </header>
  );
}

function PrivateEventsOverview() {
  return (
    <section className="private-overview" aria-labelledby="private-overview-title">
      <h2 id="private-overview-title">Private event experiences for every kind of gathering</h2>
      <div>
        <p>
          Every private celebration carries its own unique energy, guest flow,
          and timing. We design our hospitality around how you want your guests
          to feel from the moment they arrive.
        </p>
        <p>
          From morning engagement brunches to late-night anniversary dessert
          bars, we align our espresso catering, live sweets, and seating rentals
          to perfectly match your event format.
        </p>
      </div>
    </section>
  );
}

function PrivateEventContexts() {
  return (
    <section className="private-contexts" id="private-occasions" aria-labelledby="private-contexts-title">
      <header>
        <h2 id="private-contexts-title">
          <span>Private events for engagements, graduations,</span>
          <span>holidays, and milestones</span>
        </h2>
        <p>
          From intimate family celebrations to major cultural gatherings, we
          customize our service flow to match your occasion.
        </p>
      </header>
      <ol>
        {privateEventContexts.map((context) => (
          <li key={context.number}>
            <p className="private-context-eyebrow">{context.statement}</p>
            <h3 className="private-context-title">{context.title}</h3>
            <p className="private-context-description">{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PrivateEventExperiences() {
  return (
    <section className="private-experiences" aria-labelledby="private-experiences-title">
      <header>
        <h2 id="private-experiences-title">
          <span>Coffee bars, live desserts,</span>
          <span>and rentals for private events</span>
        </h2>
        <p>
          Explore our core service pillars tailored for private celebrations
          across Toronto and the GTA.
        </p>
      </header>
      <div>
        {privateEventExperiences.map((experience) => (
          <article key={experience.number}>
            <h3>{experience.name}</h3>
            <p>{experience.description}</p>
            <small>{experience.note}</small>
            <Link href={experience.href}>
              Explore {experience.name} <span aria-hidden="true">↗︎</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrivateEventCombinations() {
  return (
    <section className="private-combinations" aria-labelledby="private-combinations-title">
      <header>
        <h2 id="private-combinations-title">Custom private event service combinations</h2>
        <p>Curated service combinations designed around your event format, timeline, and guest preferences.</p>
      </header>
      <div>
        {privateEventCombinations.map((item) => (
          <article key={item.number}>
            <p>{item.occasion}</p>
            <h3>{item.experiences}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrivateEventGallery() {
  return (
    <section className="private-gallery" aria-labelledby="private-gallery-title">
      <header>
        <h2 id="private-gallery-title">Private event gallery.</h2>
        <p>Hospitality, dessert, and setting should reflect the scale, mood, and rhythm of the gathering.</p>
      </header>
      <div data-asset-status="awaiting-approved-private-event-assets">
        {privateEventGallery.map((item) => (
          <figure className={`private-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption>
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function PrivateEventPlanning() {
  return (
    <section className="private-planning" aria-labelledby="private-planning-title">
      <header>
        <h2 id="private-planning-title">What we need to plan your private event</h2>
        <p>
          Sharing a few preliminary event details helps us design a personalized
          proposal tailored to your vision and venue setup.
        </p>
      </header>
      <ol>
        {privateEventPlanningRequirements.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
      <p>
        <strong>Booking Policy:</strong> A signed contract and a 30% non-refundable
        deposit secure your event date. Dates remain open until both are received.
      </p>
    </section>
  );
}

function PrivateEventFaq() {
  return (
    <section className="private-faq" aria-labelledby="private-faq-title">
      <header><h2 id="private-faq-title">Private event FAQs.</h2></header>
      <FaqAccordion items={privateEventFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function PrivateEventsPage() {
  return (
    <SiteShell breadcrumbPath="/events/private-events">
      <main className="private-page">
        <PrivateEventsHero />
        <PrivateEventsOverview />
        <PrivateEventContexts />
        <PrivateEventExperiences />
        <PrivateEventCombinations />
        <PrivateEventGallery />
        <PrivateEventPlanning />
        <PrivateEventFaq />
        <ContextualInquiryPanel contextKey="private-events" showEyebrow={false} />
      </main>
      <JsonLd data={privateEventsSchema} />
    </SiteShell>
  );
}
