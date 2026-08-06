import Link from "next/link";
import {
  bridalShowerDetails,
  bridalShowerFaqs,
  bridalShowerGallery,
  bridalShowerPlanning,
} from "../events/bridal-showers-content";
import { pageMetadata } from "../metadata-config";
import { createServicePageSchema } from "../schema-builders";
import { signatureExperiences, type SignatureExperience } from "../signature-elements";
import { FaqAccordion } from "./faq-accordion";
import { JsonLd } from "./json-ld";
import { QuoteModalTrigger } from "./quote-modal-trigger";
import { ContextualInquiryPanel, ExperienceSelector } from "./signature-elements";
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

const bridalShowerServices: readonly SignatureExperience[] = signatureExperiences.map(
  (experience) => {
    if (experience.id === "coffee") {
      return {
        ...experience,
        tagline: "A café-style welcome",
        description:
          "Professional baristas prepare espresso classics, signature beverages, matcha, seasonal drinks, and premium non-coffee options for arrivals, conversation, and the main gathering.",
      };
    }

    if (experience.id === "dessert") {
      return {
        ...experience,
        tagline: "A live sweet moment",
        description:
          "Mini Dutch pancakes, Belgian waffles on a stick, mini donuts, and optional soft serve are prepared on-site as an interactive part of the bridal shower.",
      };
    }

    return {
      ...experience,
      tagline: "A composed setting",
      description:
        "Chairs, tables, cocktail tables, linens, lighting, and selected rental elements can support conversation, gift opening, photographs, dining, and guest flow.",
    };
  },
);

function BridalHero() {
  return (
    <header className="bridal-hero">
      <div className="bridal-hero-copy">
        <p className="foundation-eyebrow">Bridal Showers / Toronto &amp; the GTA</p>
        <h1 aria-label="Bridal shower coffee, dessert, and event rentals, planned around the celebration.">
          <span>Bridal shower coffee, dessert,</span>
          <span>and event rentals, planned around the celebration.</span>
        </h1>
        <p>
          Café-style coffee, matcha, live dessert, and a composed setting can
          turn the shower into a visual, guest-centred experience of its own.
        </p>
        <div className="bridal-hero-actions">
          <QuoteModalTrigger data-event-name="inquiry_start">
            PLAN A BRIDAL SHOWER <span aria-hidden="true">↗︎</span>
          </QuoteModalTrigger>
          <a href="#bridal-experiences">
            EXPLORE THE EXPERIENCE <span aria-hidden="true">↓︎</span>
          </a>
        </div>
      </div>
      <div className="bridal-hero-art" aria-hidden="true">
        <div><b>Café</b></div>
        <div><b>Sweet</b></div>
        <div><b>Setting</b></div>
        <i /><i />
      </div>
      <dl className="bridal-hero-proof">
        <div><dt>One inquiry</dt><dd>COFFEE, DESSERT, AND RENTALS</dd></div>
        <div><dt>Indoor or outdoor</dt><dd>PLANNED AROUND THE SETTING</dd></div>
        <div><dt>$5 million</dt><dd>LIABILITY INSURANCE</dd></div>
      </dl>
    </header>
  );
}

function BridalOverview() {
  return (
    <section className="bridal-host-overview" aria-labelledby="bridal-overview-title">
      <h2 id="bridal-overview-title">A bridal shower planned around how guests will gather.</h2>
      <div className="bridal-host-overview-notes">
        <article>
          <h3>Booked independently or together</h3>
          <p>
            Coffee Bar, Sweet Cart, and Seating Rentals can each be booked on
            their own or coordinated within one bridal shower plan.
          </p>
        </article>
        <article>
          <h3>Planned around the gathering</h3>
          <p>
            Coffee and matcha can welcome guests, live dessert can create the
            central moment, and seating can shape conversation, gifts,
            photographs, and movement.
          </p>
        </article>
        <article>
          <h3>Shaped by the setting</h3>
          <p>
            The venue, schedule, guest count, and selected experiences guide
            the final plan.
          </p>
        </article>
      </div>
    </section>
  );
}

function BridalMoments() {
  return (
    <section className="bridal-moments" aria-labelledby="bridal-moments-title">
      <header>
        <p className="foundation-label">Where Luxe can fit into the bridal shower</p>
        <h2 id="bridal-moments-title">
          A bridal shower can unfold through a few thoughtful moments.
        </h2>
        <p>
          The welcome, main gathering, dessert service, and room details can
          each play a different role in how guests experience the shower.
        </p>
      </header>
      <div className="bridal-moment-band">
        <article>
          <p>Guest arrival</p>
          <h3>A café-style welcome.</h3>
          <p>
            Coffee, matcha, and specialty beverages can greet guests as they
            arrive and create a natural place to begin gathering.
          </p>
        </article>
        <article>
          <p>Around the table</p>
          <h3>Space for conversation and connection.</h3>
          <p>
            Seating, tables, linens, and service placement can support
            conversation, photographs, gifts, and the rhythm of the main
            gathering.
          </p>
        </article>
      </div>
      <div className="bridal-moment-band bridal-moment-band-feature">
        <article className="bridal-moment-feature">
          <p>The sweet moment</p>
          <h3>Dessert becomes part of the celebration.</h3>
          <p>
            Freshly prepared mini pancakes, waffles on a stick, mini donuts, or
            optional soft serve can create an interactive focal point for
            guests.
          </p>
        </article>
        <article>
          <p>Presentation throughout</p>
          <h3>The details carry through the room.</h3>
          <p>
            Menus, signage, cups, cart presentation, and selected room details
            can reflect the host’s preferred wording, colours, and visual
            direction.
          </p>
        </article>
      </div>
    </section>
  );
}

function BridalDetails() {
  return (
    <section
      className="bridal-details bridal-personalization"
      aria-labelledby="bridal-details-title"
    >
      <header>
        <h2 id="bridal-details-title">Carry the bridal shower through the details.</h2>
        <p>
          Menus, signage, dessert presentation, and selected room details can
          carry the host’s preferred tone, wording, and visual direction
          through the gathering.
        </p>
      </header>
      <ol>
        {bridalShowerDetails.map((detail) => (
          <li key={detail.number}>
            <span>{detail.label}</span>
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
    <ExperienceSelector
      id="bridal-experiences"
      experiences={bridalShowerServices}
      heading="Choose one bridal shower experience or coordinate all three."
      showDescription={false}
      variant="bridal"
    />
  );
}

function BridalGallery() {
  return (
    <section className="bridal-gallery" aria-labelledby="bridal-gallery-title">
      <header>
        <h2 id="bridal-gallery-title">Bridal shower experiences, seen in context.</h2>
        <p>
          Coffee, live dessert, signage, seating, and room details shown within
          the celebrations they were planned for.
        </p>
      </header>
      <div data-asset-status="awaiting-approved-bridal-shower-assets">
        {bridalShowerGallery.map((item) => (
          <figure className={`bridal-gallery-${item.tone}`} key={item.number}>
            <div aria-hidden="true"><i /><i /><i /></div>
            <figcaption><strong>{item.label}</strong><small>{item.note}</small></figcaption>
          </figure>
        ))}
      </div>
      <Link href="/gallery">Explore the Luxe Event Gallery <span aria-hidden="true">↗︎</span></Link>
    </section>
  );
}

function BridalPlanning() {
  return (
    <section
      className="bridal-details bridal-planning"
      aria-labelledby="bridal-planning-title"
    >
      <header>
        <h2 id="bridal-planning-title">
          What helps the bridal shower take shape.
        </h2>
        <p>
          A few planning details help shape the right experience, setting, and
          flow for the gathering.
        </p>
      </header>
      <ol>
        {bridalShowerPlanning.map((item) => (
          <li key={item.number}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function BridalFaq() {
  return (
    <section className="bridal-faq" aria-labelledby="bridal-faq-title">
      <header><h2 id="bridal-faq-title">For hosts and planners.</h2></header>
      <FaqAccordion items={bridalShowerFaqs} indicatorElement="i" showNumbers={false} />
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
        <BridalMoments />
        <BridalCombinations />
        <BridalDetails />
        <BridalGallery />
        <BridalPlanning />
        <BridalFaq />
        <ContextualInquiryPanel contextKey="bridal-showers" showEyebrow={false} />
      </main>
      <JsonLd data={bridalShowersSchema} />
    </SiteShell>
  );
}
