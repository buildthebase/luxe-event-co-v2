import Link from "next/link";
import type { ReactNode } from "react";

export function PriorityAnswer({
  label,
  question,
  answer,
  answerContent,
  href,
  linkLabel,
}: {
  label: string;
  question: string;
  answer: string;
  answerContent?: ReactNode;
  href: string;
  linkLabel: string;
}) {
  const needsServiceAreaSummary = linkLabel.toLowerCase().includes("rental");

  return (
    <>
      <article className="priority-answer" data-aeo-format="visible-cost-factors">
        <header>
          <p className="foundation-label">{label}</p>
          <h3>{question}</h3>
        </header>
        <div>
          {answerContent ?? <p>{answer}</p>}
          <Link href={href} data-event-name="inquiry_start">
            {linkLabel} <span aria-hidden="true">↗︎</span>
          </Link>
        </div>
      </article>
      {needsServiceAreaSummary ? (
        <aside className="priority-answer-service-area">
          <p>
            Based in Toronto, Luxe serves the GTA and considers select destination
            events throughout Southern Ontario. Travel and delivery fees may apply
            outside the standard service area.
          </p>
          <Link href="/faq">
            Review booking and logistics questions{" "}
            <span aria-hidden="true">↗︎</span>
          </Link>
        </aside>
      ) : null}
    </>
  );
}
