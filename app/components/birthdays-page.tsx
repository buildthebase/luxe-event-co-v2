import Link from "next/link";
import {
  birthdayCombinations,
  birthdayContexts,
  birthdayExperienceMenu,
  birthdayFaqs,
  birthdayGallery,
  birthdayPersonalization,
} from "../events/birthdays-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const birthdaysPath = "/events/birthdays";
const birthdaysSchema = createServicePageSchema({
  path: birthdaysPath,
  serviceName: "Birthday coffee, dessert, and rental experiences",
  serviceType: "Birthday coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Staffed coffee service, non-coffee beverages, live dessert, signage, and event rentals for birthdays in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[birthdaysPath].title,
  pageDescription: pageMetadata[birthdaysPath].description,
});

function BirthdayHero() {
  return (
    <header className="birthday-hero">
      <div className="birthday-hero-copy">
        <p className="foundation-eyebrow">Birthdays / Toronto &amp; the GTA</p>
        <h1 aria-label="Birthday dessert and coffee, made for the milestone.">
          <span>Birthday dessert</span>
          <span>and coffee, made</span>
          <span>for the milestone.</span>
        </h1>
        <p>
          Personalized drinks, live dessert, custom signage, and a considered
          setting for adult, milestone, family, and selected children’s celebrations.
        </p>
        <div className="birthday-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Plan a Birthday Experience <span aria-hidden="true">↗</span>
          </Link>
          <a href="#birthday-contexts">Explore the Occasion <span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="birthday-hero-art" aria-hidden="true">
        <strong>0</strong><strong>1</strong><strong>+</strong>
        <i /><i /><i />
        <span>One person.<br />Their point of view.</span>
      </div>
      <dl className="birthday-hero-proof">
        <div><dt>Milestone-led</dt><dd>Built around the guest of honour</dd></div>
        <div><dt>One or several</dt><dd>Coffee, dessert, and rentals</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BirthdayOverview() {
  return (
    <section className="birthday-overview" aria-labelledby="birthday-overview-title">
      <h2 id="birthday-overview-title">Not a standard party format. A celebration with a point of view.</h2>
      <div>
        <p>
          The birthday can be intimate or expansive, daytime or late evening,
          centred on a meal, a room in motion, or a guest-facing hospitality moment.
        </p>
        <p>
          Luxe begins with the person, audience, venue, and flow before deciding
          where coffee, non-coffee drinks, live dessert, signage, or rentals belong.
        </p>
      </div>
    </section>
  );
}

function BirthdayContexts() {
  return (
    <section className="birthday-contexts" id="birthday-contexts" aria-labelledby="birthday-contexts-title">
      <header><h2 id="birthday-contexts-title">Different ages. Different rooms. Different energy.</h2></header>
      <ol>
        {birthdayContexts.map((context) => (
          <li key={context.number}>
            <span>{context.number}</span>
            <p>{context.title}</p>
            <h3>{context.statement}</h3>
            <p>{context.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BirthdayExperiences() {
  return (
    <section className="birthday-experiences" aria-labelledby="birthday-experiences-title">
      <header><h2 id="birthday-experiences-title">Choose what guests will taste, hold, and gather around.</h2></header>
      <div>
        {birthdayExperienceMenu.map((experience) => (
          <article key={experience.number}>
            <span>{experience.number}</span>
            <h3>{experience.name}</h3>
            <p>{experience.description}</p>
            <small>{experience.note}</small>
            <Link href={experience.href}>Explore {experience.name} <span aria-hidden="true">↗</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function BirthdayPersonalization() {
  return (
    <section className="birthday-personalization" aria-labelledby="birthday-personalization-title">
      <header><h2 id="birthday-personalization-title">Make the details recognizable.</h2></header>
      <div>
        {birthdayPersonalization.map((item) => (
          <article key={item.number}>
            <span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
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
          <article key={item.number}>
            <span>{item.number}</span><p>{item.title}</p><h3>{item.experiences}</h3><p>{item.description}</p>
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
        <h2 id="birthday-gallery-title">The milestone, seen in context.</h2>
        <p>Personalized flavours, presentation, and the room around the service give the milestone its own character.</p>
      </header>
      <div data-asset-status="awaiting-approved-birthday-assets">
        {birthdayGallery.map((item) => (
          <figure className={`birthday-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><span>{item.number}</span><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗</span></Link>
    </section>
  );
}

function BirthdayFaq() {
  return (
    <section className="birthday-faq" aria-labelledby="birthday-faq-title">
      <header><h2 id="birthday-faq-title">Birthday planning questions.</h2></header>
      <FaqAccordion items={birthdayFaqs} indicatorElement="i" />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗</span></Link>
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
        <BirthdayFaq />
        <ContextualInquiryPanel contextKey="birthdays" showEyebrow={false} />
      </main>
      <JsonLd data={birthdaysSchema} />
    </SiteShell>
  );
}
