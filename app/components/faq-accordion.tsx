import Link from "next/link";

export type FaqAccordionLink = {
  href: string;
  label: string;
};

export type FaqAccordionItem = {
  id?: string;
  question: string;
  answer: string;
  links?: readonly FaqAccordionLink[];
};

export function FaqAccordion({
  items,
  indicatorElement = "b",
  showNumbers = true,
}: {
  items: readonly FaqAccordionItem[];
  indicatorElement?: "b" | "i";
  showNumbers?: boolean;
}) {
  const Indicator = indicatorElement;

  return (
    <div className={showNumbers ? undefined : "faq-accordion-numberless"}>
      {items.map((item, index) => (
        <details id={item.id} key={item.id ?? item.question}>
          <summary>
            {showNumbers ? <span>{String(index + 1).padStart(2, "0")}</span> : null}
            <h3>{item.question}</h3>
            <Indicator aria-hidden="true">+</Indicator>
          </summary>
          {item.links?.length ? (
            <div>
              <p>{item.answer}</p>
              <nav aria-label={`Related information for ${item.question}`}>
                {item.links.map((link) => (
                  <Link href={link.href} key={link.href}>
                    {link.label} <span aria-hidden="true">↗︎</span>
                  </Link>
                ))}
              </nav>
            </div>
          ) : (
            <p>{item.answer}</p>
          )}
        </details>
      ))}
    </div>
  );
}
