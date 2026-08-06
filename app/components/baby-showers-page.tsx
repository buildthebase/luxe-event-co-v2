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
import {
  CombinedExperienceFeature,
  ContextualInquiryPanel,
  ExperienceSelector,
} from "./signature-elements";
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
        <h1 aria-label="Baby shower coffee, dessert, and event rentals, thoughtfully planned.">
          <span>Baby shower coffee,</span>
          <span>dessert, and event rentals,</span>
          <span>thoughtfully planned.</span>
        </h1>
        <p>
          Mobile coffee bars, matcha, live dessert, seating, and event rentals for
          baby showers across Toronto and the GTA, shaped around the venue, guest
          count, and atmosphere of the celebration.
        </p>
        <div className="baby-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            Plan a Baby Shower <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#baby-overview">
            Explore the Experience <span aria-hidden="true">↓︎</span>
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
    <section className="baby-overview" id="baby-overview" aria-labelledby="baby-overview-title">
      <header className="baby-overview-header">
        <h2 id="baby-overview-title">A baby shower can be shaped in three thoughtful parts.</h2>
        <p>
          Coffee and matcha can welcome guests, live dessert can create the focal
          moment, and seating and rentals can shape the room around conversation,
          gifts, and photographs.
        </p>
      </header>
      <div className="baby-overview-parts">
        <article className="baby-overview-welcome">
          <p>Welcome</p>
          <h3>A warm beginning.</h3>
          <p>
            Coffee and matcha can greet arriving guests with a calm service moment
            that feels polished, welcoming, and easy to host.
          </p>
        </article>
        <article className="baby-overview-dessert">
          <p>Dessert moment</p>
          <h3>Something guests can gather around.</h3>
          <p>
            Freshly prepared dessert can create an interactive centre for the
            celebration and a memorable moment for family and friends.
          </p>
        </article>
        <article className="baby-overview-setting">
          <p>The setting</p>
          <h3>Room for the celebration to unfold.</h3>
          <p>
            Seating, tables, linens, and room details can support conversation, gift
            opening, photographs, and movement through the gathering.
          </p>
        </article>
      </div>
    </section>
  );
}

function BabyShowerStyling() {
  return (
    <section className="baby-styling" aria-labelledby="baby-styling-title">
      <header>
        <h2 id="baby-styling-title">Carry the celebration through the details.</h2>
        <p>
          Menus, wording, presentation, and room details can reflect the host’s
          preferred colours, tone, and overall direction.
        </p>
      </header>
      <div>
        {[babyShowerStyling[1], babyShowerStyling[0], babyShowerStyling[2]].map((item) => (
          <article className={`baby-styling-item-${item.number}`} key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BabyShowerExperiences() {
  return (
    <ExperienceSelector
      description="Coffee, live dessert, and event rentals can each support a different part of the gathering. Choose one experience or coordinate all three around the room and schedule."
      experiences={babyShowerExperiences}
      heading="Three Luxe experiences for a thoughtfully hosted baby shower."
      id="baby-experiences"
      variant="taupe"
    />
  );
}

function BabyShowerSettings() {
  return (
    <section className="baby-settings" aria-labelledby="baby-settings-title">
      <header>
        <h2 id="baby-settings-title">Indoor or outdoor, the setting shapes the plan.</h2>
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

function BabyShowerGallery() {
  return (
    <section className="baby-gallery" aria-labelledby="baby-gallery-title">
      <header>
        <h2 id="baby-gallery-title">Baby shower experiences, seen in context.</h2>
        <p>
          See how mobile coffee, live dessert, signage, seating, and room details come
          together within the celebration.
        </p>
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

function BabyShowerCombinations() {
  return (
    <CombinedExperienceFeature
      combinations={babyShowerCombinations}
      description="These are planning possibilities rather than fixed packages. The right combination is shaped around the venue, guest count, timing, and atmosphere of the celebration."
      heading="Ways the experiences can come together."
      id="baby-combinations"
    />
  );
}

function BabyShowerPlanning() {
  return (
    <section className="baby-planning" aria-labelledby="baby-planning-title">
      <header>
        <h2 id="baby-planning-title">What to share when planning your baby shower.</h2>
        <p>
          A clear event picture helps Luxe recommend the right experiences, service
          format, and setup requirements.
        </p>
      </header>
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
      <header><h2 id="baby-faq-title">Baby shower planning questions, answered.</h2></header>
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
