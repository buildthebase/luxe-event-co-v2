import Link from "next/link";
import { FaqAccordion } from "../components/faq-accordion";
import { JsonLd } from "../components/json-ld";
import { SiteShell } from "../components/site-shell";
import { createPageMetadata, pageMetadata } from "../metadata-config";
import {
  createBreadcrumbSchema,
  organizationId,
  pageEntityId,
  websiteId,
} from "../schema-builders";
import { siteConfig } from "../site-config";
import { allFaqItems, faqCategories } from "./faq-content";

const faqUrl = `${siteConfig.url}/faq`;

export const metadata = createPageMetadata("/faq");

const faqSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["FAQPage", "WebPage"],
      "@id": pageEntityId("/faq", "webpage"),
      url: faqUrl,
      name: pageMetadata["/faq"].title,
      description: pageMetadata["/faq"].description,
      mainEntity: allFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
      isPartOf: { "@id": websiteId },
      about: { "@id": organizationId },
      breadcrumb: { "@id": pageEntityId("/faq", "breadcrumb") },
      inLanguage: siteConfig.language,
    },
    createBreadcrumbSchema("/faq"),
  ],
};

function FaqHero() {
  return (
    <header className="faq-hub-hero">
      <div className="faq-hub-hero-copy">
        <p className="foundation-eyebrow">FAQ / Before You Inquire</p>
        <h1 aria-label="Event planning and booking answers, before the proposal begins.">
          <span>Event planning</span>
          <span>and booking answers,</span>
          <span>before the proposal begins.</span>
        </h1>
        <p>
          Booking terms, service boundaries, menus, travel, venue requirements,
          rentals, and customization explained with the detail currently confirmed.
        </p>
        <div className="faq-hub-hero-actions">
          <Link href="/inquire" data-event-name="inquiry_start">
            Ask About Your Event <span aria-hidden="true">↗</span>
          </Link>
          <a href="#faq-categories">
            Find an Answer <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="faq-hub-hero-art" aria-hidden="true">
        <span>Q</span>
        <i />
        <span>A</span>
        <strong>Useful before<br />the quote.</strong>
      </div>
      <dl className="faq-hub-proof">
        <div><dt>47 answers</dt><dd>Grouped by planning concern</dd></div>
        <div><dt>One source</dt><dd>Visible copy and schema stay aligned</dd></div>
        <div><dt>$5 million</dt><dd>Liability insurance</dd></div>
      </dl>
    </header>
  );
}

function FaqCategoryNav() {
  return (
    <nav className="faq-hub-nav" aria-label="FAQ categories" id="faq-categories">
      <p>Choose a planning area</p>
      <ol>
        {faqCategories.map((category) => (
          <li key={category.id}>
            <a href={`#${category.id}`}>
              <span>{category.number}</span>
              {category.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function FaqCategory({
  category,
}: {
  category: (typeof faqCategories)[number];
}) {
  return (
    <section
      className="faq-hub-category"
      id={category.id}
      aria-labelledby={`${category.id}-title`}
    >
      <header>
        <span>{category.number}</span>
        <h2 id={`${category.id}-title`}>{category.title}</h2>
        <p>{category.description}</p>
      </header>
      <FaqAccordion items={category.items} indicatorElement="i" />
    </section>
  );
}

function FaqInquiry() {
  return (
    <section className="faq-hub-inquiry" aria-labelledby="faq-inquiry-title">
      <div>
        <h2 id="faq-inquiry-title">Still specific to your event? Ask us directly.</h2>
        <p>
          Share the date, venue, guest count, experiences under consideration,
          and the operating detail you need clarified.
        </p>
      </div>
      <Link href="/inquire" data-event-name="inquiry_start">
        Ask About Your Event <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}

export default function FAQPage() {
  return (
    <SiteShell breadcrumbPath="/faq">
      <main className="faq-hub-page">
        <FaqHero />
        <FaqCategoryNav />
        <div className="faq-hub-categories">
          {faqCategories.map((category) => (
            <FaqCategory category={category} key={category.id} />
          ))}
        </div>
        <FaqInquiry />
      </main>
      <JsonLd data={faqSchema} />
    </SiteShell>
  );
}
