import Link from "next/link";
import {
  birthdayCombinations,
  birthdayContexts,
  birthdayExperiences,
  birthdayFaqs,
  birthdayGallery,
  birthdayPersonalization,
  birthdayPlanning,
} from "../events/birthdays-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
import { SiteShell } from "./site-shell";

const birthdaysPath = "/events/birthdays";
const birthdaysSchema = createServicePageSchema({
  path: birthdaysPath,
  serviceName: "Birthday coffee, dessert, and rental experiences",
  serviceType: "Birthday coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Staffed coffee service, non-coffee beverages, live dessert, seating, and event rentals for birthdays in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[birthdaysPath].title,
  pageDescription: pageMetadata[birthdaysPath].description,
});

function BirthdayHero() {
  return (
    <header className="birthday-hero">
      <div className="birthday-hero-copy">
        <p className="foundation-eyebrow">Birthdays / Toronto &amp; the GTA</p>
        <h1 aria-label="Birthday coffee, live dessert, and event rentals, planned around the milestone.">
          <span>Birthday coffee, live</span>
          <span>dessert, and event</span>
          <span>rentals, planned</span>
          <span>around the milestone.</span>
        </h1>
        <p>
          Coffee, matcha, live dessert, seating, and event rentals for adult,
          milestone, family, and selected children’s celebrations.
        </p>
        <div className="birthday-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            PLAN A BIRTHDAY EXPERIENCE <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#birthday-contexts">EXPLORE THE OCCASION <span aria-hidden="true">↓︎</span></a>
        </div>
      </div>
      <div className="birthday-hero-art" aria-hidden="true">
        <i /><i /><i />
        <span>One person.<br />Their point of view.</span>
      </div>
      <dl className="birthday-hero-proof">
        <div><dt>One inquiry</dt><dd>COFFEE, DESSERT, AND RENTALS</dd></div>
        <div><dt>Milestone-led</dt><dd>PLANNED AROUND THE GUEST OF HONOUR</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BirthdayOverview() {
  return (
    <section className="birthday-overview" aria-labelledby="birthday-overview-title">
      <h2 id="birthday-overview-title">
        A birthday planned around the person, not a{" "}
        <span className="birthday-overview-title-tail">standard format.</span>
      </h2>

      <div className="birthday-overview-notes">
        <article>
          <h3>Built around the person</h3>
          <p>
            The guest of honour, age group, audience, and desired atmosphere
            guide the direction of the celebration.
          </p>
        </article>

        <article>
          <h3>One experience or several</h3>
          <p>
            Luxe Coffee Bar, Luxe Sweet Cart, and Luxe Seating Rentals can be
            booked independently or coordinated within one birthday plan.
          </p>
        </article>

        <article>
          <h3>Shaped by the occasion</h3>
          <p>
            The venue, schedule, guest count, service requirements, and selected
            experiences determine the final plan.
          </p>
        </article>
      </div>
    </section>
  );
}

function BirthdayContexts() {
  return (
    <section className="birthday-contexts" id="birthday-contexts" aria-labelledby="birthday-contexts-title">
      <header><h2 id="birthday-contexts-title">Birthday experiences for different ages and occasions.</h2></header>
      <ol>
        {birthdayContexts.map((context) => (
          <li key={context.number}>
            <h3>{context.title}</h3>
            <p>{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BirthdayExperiences() {
  return (
    <ExperienceSelector
      id="birthday-experiences"
      experiences={birthdayExperiences}
      heading="Choose one birthday experience or coordinate all three."
      showDescription={false}
      variant="birthday"
    />
  );
}

function BirthdayPersonalization() {
  return (
    <section className="birthday-personalization" aria-labelledby="birthday-personalization-title">
      <header>
        <h2 id="birthday-personalization-title">Let the milestone shape the details.</h2>
        <p>
          Menus, signage, presentation, and room details can reflect the person
          being celebrated without overwhelming the gathering.
        </p>
      </header>
      <div>
        {birthdayPersonalization.map((item) => (
          <article key={item.number}><h3>{item.title}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayCombinations() {
  return (
    <section className="birthday-combinations" aria-labelledby="birthday-combinations-title">
      <header>
        <h2 id="birthday-combinations-title">Compose the experience around the milestone.</h2>
        <p>Planning directions rather than fixed packages.</p>
      </header>
      <div>
        {birthdayCombinations.map((item) => (
          <article key={item.number}><p>{item.title}</p><h3>{item.experiences}</h3><p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayGallery() {
  return (
    <section className="birthday-gallery" aria-labelledby="birthday-gallery-title">
      <header>
        <h2 id="birthday-gallery-title">Birthday experiences, seen in context.</h2>
        <p>Coffee, live dessert, signage, seating, and room details shown within the celebrations they were planned for.</p>
      </header>
      <div data-asset-status="awaiting-approved-birthday-assets">
        {birthdayGallery.map((item) => (
          <figure className={`birthday-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BirthdayPlanning() {
  return (
    <section className="birthday-planning" aria-labelledby="birthday-planning-title">
      <header>
        <h2 id="birthday-planning-title">What to share when planning a birthday with Luxe.</h2>
        <p>
          A few clear details help shape the service, setting, and experience
          around the person being celebrated.
        </p>
      </header>
      <ol>
        {birthdayPlanning.map((item) => (
          <li key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BirthdayFaq() {
  return (
    <section className="birthday-faq" aria-labelledby="birthday-faq-title">
      <header><h2 id="birthday-faq-title">Birthday planning questions.</h2></header>
      <FaqAccordion items={birthdayFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function BirthdaysPage() {
  return (
    <SiteShell breadcrumbPath="/events/birthdays">
      <main className="birthday-page">
        <BirthdayHero />
        <BirthdayOverview />
        <BirthdayContexts />
        <BirthdayExperiences />
        <BirthdayPersonalization />
        <BirthdayCombinations />
        <BirthdayGallery />
        <BirthdayPlanning />
        <BirthdayFaq />
        <ContextualInquiryPanel contextKey="birthdays" showEyebrow={false} />
      </main>
      <JsonLd data={birthdaysSchema} />
    </SiteShell>
  );
}
