import Link from "next/link";
import type { ReactNode } from "react";
import { QuoteModalTrigger } from "./quote-modal-trigger";

export type ExperiencePositioningVariant = "coffee" | "sweet" | "seating";

type ExperiencePositioningConfig = {
  className: string;
  titleId: string;
  eyebrow?: string;
  titleLines: readonly string[];
  titleBreakBefore?: readonly number[];
  lead: ReactNode;
  body: readonly ReactNode[];
  handoff: ReactNode;
};

const experiencePositioningContent: Record<
  ExperiencePositioningVariant,
  ExperiencePositioningConfig
> = {
  coffee: {
    className: "coffee-overview",
    titleId: "coffee-overview-title",
    eyebrow: "A café experience, not simply a cart",
    titleLines: ["Coffee hospitality,", "shaped around the event."],
    lead: (
      <>
        Coffee is woven into the event as hospitality, atmosphere, and an
        experience guests can gather around.
      </>
    ),
    body: [
      <>
        A mobile coffee bar brings professional café equipment, skilled baristas,
        and a made-to-order beverage menu directly into the event setting. Luxe
        Coffee Bar provides mobile coffee catering for{" "}
        <Link href="/events/weddings">weddings</Link>,{" "}
        <Link href="/events/corporate-events">corporate events</Link>,{" "}
        <Link href="/events/brand-activations">brand activations</Link>, bridal
        showers, baby showers, birthdays, and{" "}
        <Link href="/events/private-events">private celebrations</Link> across
        Toronto and the GTA.
      </>,
      <>
        Each booking is planned around the occasion, guest count, venue, service
        window, and preferred menu. Drinks are prepared fresh on-site throughout
        the agreed service period, creating a polished and welcoming experience
        for guests.
      </>,
    ],
    handoff: (
      <>
        Luxe Coffee Bar can be booked independently or coordinated with{" "}
        <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> and{" "}
        <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>
        {" "}through one{" "}
        <QuoteModalTrigger className="experience-positioning-inquiry">
          Luxe Event Co. inquiry
        </QuoteModalTrigger>
        .
      </>
    ),
  },
  sweet: {
    className: "sweet-positioning",
    titleId: "sweet-positioning-title",
    titleLines: [
      "The cart becomes",
      "part of the room.",
      "Preparation becomes",
      "part of the moment.",
    ],
    titleBreakBefore: [2],
    lead: (
      <>
        Dessert is prepared in view, finished to order, and presented as part
        of the gathering.
      </>
    ),
    body: [
      <>
        Dessert-cart catering is a staffed mobile dessert service where mini
        pancakes, Belgian waffles, mini donuts, and other selected sweets are
        prepared, finished, and served for guests on-site. Luxe Sweet Cart
        provides luxury dessert cart catering for{" "}
        <Link href="/events/weddings">weddings</Link>,{" "}
        <Link href="/events/corporate-events">corporate events</Link>,{" "}
        <Link href="/events/brand-activations">brand activations</Link>, bridal
        showers, baby showers, birthdays, and{" "}
        <Link href="/events/private-events">private celebrations</Link>{" "}
        across Toronto and the GTA.
      </>,
      <>
        Unlike a dessert table, which typically presents pre-arranged sweets
        for self-service, the cart centres live preparation and attendant-led
        service. Each booking is planned around the cart style, dessert selection,
        guest count, venue, service window, footprint, power, access, and styling
        requirements.
      </>,
    ],
    handoff: (
      <>
        Luxe Sweet Cart can be booked independently or coordinated with{" "}
        <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
        <Link href="/experiences/seating-rentals">Luxe Seating Rentals</Link>{" "}
        through one{" "}
        <QuoteModalTrigger className="experience-positioning-inquiry">
          Luxe Event Co. inquiry
        </QuoteModalTrigger>
        .
      </>
    ),
  },
  seating: {
    className: "seating-overview",
    titleId: "seating-overview-title",
    titleLines: [
      "Seating should resolve the room.",
      "The layout should support the gathering.",
    ],
    titleBreakBefore: [1],
    lead: (
      <>
        Seating is planned around how guests gather, move through the space,
        and experience the event.
      </>
    ),
    body: [
      <>
        Event seating rentals bring the furniture, layout planning, and on-site
        setup needed to shape a functional and considered gathering. Luxe Seating
        Rentals provides seating solutions for{" "}
        <Link href="/events/weddings">weddings</Link>,{" "}
        <Link href="/events/corporate-events">corporate events</Link>,{" "}
        <Link href="/events/brand-activations">brand activations</Link>,{" "}
        <Link href="/events/bridal-showers">bridal showers</Link>,{" "}
        <Link href="/events/baby-showers">baby showers</Link>,{" "}
        <Link href="/events/birthdays">birthdays</Link>, and{" "}
        <Link href="/events/private-events">private celebrations</Link> across
        Toronto and the GTA.
      </>,
      <>
        Rather than beginning with a catalogue of individual pieces, each booking
        begins with the room and how it needs to work. The seating plan is shaped
        around the guest count, venue, event flow, service areas, visual direction,
        access, delivery, and setup requirements.
      </>,
    ],
    handoff: (
      <>
        Luxe Seating Rentals can be booked independently or coordinated with{" "}
        <Link href="/experiences/coffee-bar">Luxe Coffee Bar</Link> and{" "}
        <Link href="/experiences/sweet-cart">Luxe Sweet Cart</Link> through one{" "}
        <Link href="/inquire">Luxe Event Co. inquiry</Link>.
      </>
    ),
  },
};

export function ExperiencePositioningSection({
  variant,
}: {
  variant: ExperiencePositioningVariant;
}) {
  const config = experiencePositioningContent[variant];
  const titleBreakBefore = config.titleBreakBefore ?? [];

  return (
    <section
      className={`experience-positioning ${config.className}`}
      aria-labelledby={config.titleId}
      data-experience-positioning={variant}
    >
      <div className="experience-positioning-intro">
        <div className="experience-positioning-eyebrow-slot">
          {config.eyebrow ? (
            <p className="foundation-label experience-positioning-eyebrow">
              {config.eyebrow}
            </p>
          ) : null}
        </div>

        <h2 id={config.titleId}>
          {config.titleLines.map((line, index) => (
            <span
              className="experience-positioning-title-line"
              data-break-before={
                titleBreakBefore.includes(index) ? "true" : undefined
              }
              key={index}
            >
              {line}
            </span>
          ))}
        </h2>

        <div className="experience-positioning-art" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>

      <div className="experience-positioning-content">
        <p className="experience-positioning-lead">{config.lead}</p>

        <div className="experience-positioning-rule" aria-hidden="true" />

        <div className="experience-positioning-copy">
          {config.body.map((column, index) => (
            <p key={index}>{column}</p>
          ))}

          <p className="experience-positioning-handoff">{config.handoff}</p>
        </div>
      </div>
    </section>
  );
}
