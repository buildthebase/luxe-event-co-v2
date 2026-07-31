import Link from "next/link";
import {
  babyShowerCombinations,
  babyShowerExperiences,
  babyShowerFaqs,
  babyShowerGallery,
  babyShowerPlanning,
  babyShowerSettings,
  babyShowerStyling,
} from "../events/baby-showers-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const babyShowersPath = "/events/baby-showers";
const babyShowersSchema = createServicePageSchema({
  path: babyShowersPath,
  serviceName: "Baby shower coffee, dessert, and rental experiences",
  serviceType: "Baby shower coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Coffee, matcha, live dessert, and refined rental experiences for baby showers in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[babyShowersPath].title,
  pageDescription: pageMetadata[babyShowersPath].description,
});

function BabyShowerHero() {
  return (
    <header className="baby-hero">
      <div className="baby-hero-copy">
        <p className="foundation-eyebrow">Baby Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Baby shower experiences, thoughtfully gathered.">
          <span>Baby shower</span>
          <span>experiences,</span>
          <span>thoughtfully gathered.</span>
        </h1>
        <p>
          Coffee, matcha, freshly prepared dessert, and an intentional setting
          can create a warm, cohesive celebration for hosts, families, and guests.
        </p>
        <div className="baby-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan a Baby Shower <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#baby-experiences">
            Explore the Possibilities <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="baby-hero-art" aria-hidden="true">
        <i />
        <i />
        <i />
        <div><span>Welcome</span><span>Sweetness</span><span>Setting</span></div>
      </div>
      <dl className="baby-hero-proof">
        <div><dt>One inquiry</dt><dd>Three distinct experiences</dd></div>
        <div><dt>Indoor or outdoor</dt><dd>Planned around the setting</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BabyShowerOverview() {
  return (
    <section className="baby-overview" aria-labelledby="baby-overview-title">
      <h2 id="baby-overview-title">Soft in feeling. Clear in how it comes together.</h2>
      <div>
        <p>
          A baby shower may begin with a focused coffee and matcha welcome,
          centre on an interactive dessert moment, or use rentals to shape the
          room around conversation, gifts, and photographs.
        </p>
        <p>
          Each service can be booked independently. When several are selected,
          Luxe Event Co. considers their timing, placement, presentation, and
          operational requirements through one inquiry and proposal journey.
        </p>
      </div>
    </section>
  );
}

function BabyShowerExperiences() {
  return (
    <section className="baby-experiences" id="baby-experiences" aria-labelledby="baby-experiences-title">
      <header>
        <h2 id="baby-experiences-title">Three ways to shape the gathering.</h2>
      </header>
      <div>
        {babyShowerExperiences.map((experience) => (
          <article className={`baby-experience-${experience.tone}`} key={experience.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <Link href={experience.href}>{experience.name}</Link>
            <h3>{experience.statement}</h3>
            <p>{experience.description}</p>
            <small>{experience.detail}</small>
            <Link href={experience.href}>Explore {experience.name} <span aria-hidden="true">↗︎</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerStyling() {
  return (
    <section className="baby-styling" aria-labelledby="baby-styling-title">
      <header>
        <h2 id="baby-styling-title">Personal details, carried with restraint.</h2>
      </header>
      <div>
        {babyShowerStyling.map((item) => (
          <article key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerSettings() {
  return (
    <section className="baby-settings" aria-labelledby="baby-settings-title">
      <header>
        <h2 id="baby-settings-title">At home in an intimate room or under an open sky.</h2>
      </header>
      <div>
        {babyShowerSettings.map((setting) => (
          <article key={setting.number}>
            <div aria-hidden="true"><i /><i /></div>
            <h3>{setting.title}</h3>
            <p>{setting.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerCombinations() {
  return (
    <section className="baby-combinations" aria-labelledby="baby-combinations-title">
      <header>
        <h2 id="baby-combinations-title">Consider how one moment leads into the next.</h2>
        <p>
          These are planning directions, not fixed packages. The final
          combination depends on the event details and confirmed service requirements.
        </p>
      </header>
      <div>
        {babyShowerCombinations.map((combination) => (
          <article key={combination.number}>
            <p>{combination.title}</p>
            <h3>{combination.experiences}</h3>
            <p>{combination.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerGallery() {
  return (
    <section className="baby-gallery" aria-labelledby="baby-gallery-title">
      <header>
        <h2 id="baby-gallery-title">A celebration seen in its details.</h2>
        <p>Fresh preparation, soft styling, signage, and the surrounding room create a complete guest experience.</p>
      </header>
      <div className="baby-gallery-grid" data-asset-status="awaiting-approved-baby-shower-assets">
        {babyShowerGallery.map((item) => (
          <figure className={`baby-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BabyShowerPlanning() {
  return (
    <section className="baby-planning" aria-labelledby="baby-planning-title">
      <header><h2 id="baby-planning-title">What helps the plan take shape.</h2></header>
      <ol>
        {babyShowerPlanning.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BabyShowerFaq() {
  return (
    <section className="baby-faq" aria-labelledby="baby-faq-title">
      <header><h2 id="baby-faq-title">Baby shower planning questions.</h2></header>
      <FaqAccordion items={babyShowerFaqs} indicatorElement="i" showNumbers={false} />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function BabyShowersPage() {
  return (
    <SiteShell breadcrumbPath="/events/baby-showers">
      <main className="baby-page">
        <BabyShowerHero />
        <BabyShowerOverview />
        <BabyShowerExperiences />
        <BabyShowerStyling />
        <BabyShowerSettings />
        <BabyShowerCombinations />
        <BabyShowerGallery />
        <BabyShowerPlanning />
        <BabyShowerFaq />
        <ContextualInquiryPanel contextKey="baby-showers" showEyebrow={false} />
      </main>
      <JsonLd data={babyShowersSchema} />
    </SiteShell>
  );
}
