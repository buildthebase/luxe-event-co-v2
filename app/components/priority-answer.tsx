import Link from "next/link";

export function PriorityAnswer({
  label,
  question,
  answer,
  href,
  linkLabel,
}: {
  label: string;
  question: string;
  answer: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <article className="priority-answer" data-aeo-format="visible-cost-factors">
      <header>
        <p className="foundation-label">{label}</p>
        <h3>{question}</h3>
      </header>
      <div>
        <p>{answer}</p>
        <Link href={href} data-event-name="inquiry_start">
          {linkLabel} <span aria-hidden="true">↗︎</span>
        </Link>
      </div>
    </article>
  );
}
