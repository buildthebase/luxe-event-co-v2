import Link from "next/link";
import {
  bridalShowerCombinations,
  bridalShowerDetails,
  bridalShowerExperiences,
  bridalShowerFaqs,
  bridalShowerGallery,
} from "../events/bridal-showers-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { ContextualInquiryPanel } from "./signature-elements";
import { SiteShell } from "./site-shell";

const bridalShowersPath = "/events/bridal-showers";
const bridalShowersSchema = createServicePageSchema({
  path: bridalShowersPath,
  serviceName: "Bridal shower coffee, dessert, and rental experiences",
  serviceType: "Bridal shower coffee bar, dessert cart, and event rental services",
  serviceDescription:
    "Caf\u00e9-style coffee, matcha, live dessert, rentals, signage, and styling for bridal showers in Toronto and the Greater Toronto Area.",
  pageName: pageMetadata[bridalShowersPath].title,
  pageDescription: pageMetadata[bridalShowersPath].description,
});

function BridalHero() {
  return (
    <header className="bridal-hero">
      <div className="bridal-hero-copy">
        <p className="foundation-eyebrow">Bridal Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Bridal shower experiences with their own point of view.">
          <span>Bridal shower experiences</span>
          <span>with their own point of view.</span>
        </h1>
        <p>
          Café-style coffee, matcha, live dessert, and a composed setting can
          turn the shower into a visual, guest-centred experience of its own.
        </p>
        <div className="bridal-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Plan a Bridal Shower <span aria-hidden="true">↗︎</span>
          </Link>
          <a href="#bridal-experiences">
            Explore the Composition <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="bridal-hero-art" aria-hidden="true">
        <div><span>01</span><b>Café</b></div>
        <div><span>02</span><b>Sweet</b></div>
        <div><span>03</span><b>Setting</b></div>
        <i /><i />
      </div>
      <dl className="bridal-hero-proof">
        <div><dt>Café-style</dt><dd>Coffee, matcha, and specialty drinks</dd></div>
        <div><dt>Made together</dt><dd>Dessert, rentals, signage, and styling</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function BridalOverview() {
  return (
    <section className="bridal-overview" aria-labelledby="bridal-overview-title">
      <h2 id="bridal-overview-title">The shower can feel as thoughtful as the celebration ahead.</h2>
      <div>
        <p>
          The experience can begin with the intimacy of a café, move through a
          live dessert moment, and use seating, tables, linens, lighting, or
          florals to give the gathering its visual rhythm.
        </p>
        <p>
          Hosts and planners can select one service or coordinate several
          through Luxe Event Co. Each remains recognizable while its timing,
          placement, and presentation are planned within the whole room.
        </p>
      </div>
    </section>
  );
}

function BridalExperiences() {
  return (
    <section className="bridal-experiences" id="bridal-experiences" aria-labelledby="bridal-experiences-title">
      <header><h2 id="bridal-experiences-title">Four expressions. One composed gathering.</h2></header>
      <div>
        {bridalShowerExperiences.map((experience) => (
          <article className={`bridal-experience-${experience.tone}`} key={experience.number}>
            <span>{experience.number}</span>
            <div aria-hidden="true"><i /><i /><i /></div>
            <p>{experience.label}</p>
            <h3>{experience.title}</h3>
            <p>{experience.description}</p>
            <Link href={experience.href}>Explore {experience.label} <span aria-hidden="true">↗︎</span></Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function BridalDetails() {
  return (
    <section className="bridal-details" aria-labelledby="bridal-details-title">
      <header>
        <h2 id="bridal-details-title">The visual language can move through every touchpoint.</h2>
        <p>
          Customization remains subject to the selected experience, approved
          direction, production feasibility, timing, quantities, and final proposal.
        </p>
      </header>
      <ol>
        {bridalShowerDetails.map((detail) => (
          <li key={detail.number}>
            <span>{detail.number}</span>
            <h3>{detail.title}</h3>
            <p>{detail.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BridalCombinations() {
  return (
    <section className="bridal-combinations" aria-labelledby="bridal-combinations-title">
      <header>
        <h2 id="bridal-combinations-title">Build around the way guests will move through the shower.</h2>
        <p>Planning directions rather than fixed packages.</p>
      </header>
      <div>
        {bridalShowerCombinations.map((combination) => (
          <article key={combination.number}>
            <span>{combination.number}</span>
            <p>{combination.title}</p>
            <h3>{combination.experiences}</h3>
            <p>{combination.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function BridalGallery() {
  return (
    <section className="bridal-gallery" aria-labelledby="bridal-gallery-title">
      <header>
        <h2 id="bridal-gallery-title">Details are strongest when seen in the full room.</h2>
        <p>Dessert, drinks, signage, florals, and seating can be planned as one welcoming composition.</p>
      </header>
      <div data-asset-status="awaiting-approved-bridal-shower-assets">
        {bridalShowerGallery.map((item) => (
          <figure className={`bridal-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><span>{item.number}</span><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BridalFaq() {
  return (
    <section className="bridal-faq" aria-labelledby="bridal-faq-title">
      <header><h2 id="bridal-faq-title">For hosts and planners.</h2></header>
      <FaqAccordion items={bridalShowerFaqs} indicatorElement="i" />
      <Link href="/faq">Review Luxe Booking FAQs <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

export function BridalShowersPage() {
  return (
    <SiteShell breadcrumbPath="/events/bridal-showers">
      <main className="bridal-page">
        <BridalHero />
        <BridalOverview />
        <BridalExperiences />
        <BridalDetails />
        <BridalCombinations />
        <BridalGallery />
        <BridalFaq />
        <ContextualInquiryPanel contextKey="bridal-showers" showEyebrow={false} />
      </main>
      <JsonLd data={bridalShowersSchema} />
    </SiteShell>
  );
}
