import Link from "next/link";
import { experiences, eventTypes, type EventSlug, type ExperienceSlug } from "../site-config";
import { ContextualInquiryPanel, CredibilityStrip } from "./signature-elements";
import { FoundationIntro, FoundationLabel, SiteShell } from "./site-shell";

export function ExperienceDetail({ slug }: { slug: ExperienceSlug }) {
  const experience = experiences.find((item) => item.slug === slug)!;
  const complementary = experiences.filter((item) => item.slug !== slug);

  return (
    <SiteShell>
      <main className={`foundation-detail foundation-detail-${experience.accent}`}>
        <FoundationIntro eyebrow={`${experience.number} / Luxe experiences`} title={experience.name} description={experience.summary} />
        <section className="foundation-detail-section">
          <div><FoundationLabel>Experience direction</FoundationLabel><h2>A distinct expression within one coordinated event experience.</h2></div>
          <div className="foundation-detail-panel"><p>Every Luxe service can be booked independently and remains easy to combine with complementary experiences when the occasion calls for a coordinated approach.</p><Link href="/contact">Ask about this experience <span aria-hidden="true">↗︎</span></Link></div>
        </section>
        <section className="foundation-related"><FoundationLabel>Discover the other Luxe experiences</FoundationLabel><div className="foundation-related-links">{complementary.map((item) => <Link href={`/experiences/${item.slug}`} key={item.slug}>{item.name}<span aria-hidden="true">↗︎</span></Link>)}</div></section>
        <section className="foundation-detail-section foundation-detail-events"><div><FoundationLabel>Journey continuation</FoundationLabel><h2>See where this experience belongs in the wider event.</h2></div><div className="foundation-detail-panel"><div className="foundation-mini-links">{eventTypes.slice(0, 3).map((event) => <Link href={`/events/${event.slug}`} key={event.slug}>{event.name}<span aria-hidden="true">↗︎</span></Link>)}</div></div></section>
        <ContextualInquiryPanel contextKey={experience.slug} />
      </main>
    </SiteShell>
  );
}

export function EventDetail({ slug }: { slug: EventSlug }) {
  const event = eventTypes.find((item) => item.slug === slug)!;
  const showCredibility = slug === "corporate-events" || slug === "brand-activations";

  return (
    <SiteShell>
      <main className="foundation-detail foundation-event-detail">
        <FoundationIntro eyebrow={`Events / ${event.name}`} title={event.name} description={event.summary} />
        <section className="foundation-detail-section"><div><FoundationLabel>Event-led journey</FoundationLabel><h2>Start with the occasion, then shape the right combination.</h2></div><div className="foundation-detail-panel"><p>Coffee, dessert, and rentals can play different roles in the same gathering. The event context determines which experiences belong and how they should work together.</p><Link href="/contact">Plan this kind of event <span aria-hidden="true">↗︎</span></Link></div></section>
        <section className="foundation-related"><FoundationLabel>Experiences to consider</FoundationLabel><div className="foundation-related-links">{experiences.map((item) => <Link href={`/experiences/${item.slug}`} key={item.slug}>{item.name}<span aria-hidden="true">↗︎</span></Link>)}</div></section>
        {showCredibility ? <CredibilityStrip /> : null}
        <ContextualInquiryPanel contextKey={event.slug} />
      </main>
    </SiteShell>
  );
}
