import Link from "next/link";
import {
  combinedExperiences,
  credibilityOrganizations,
  eventPlanningPathway,
  inquiryContexts,
  signatureExperiences,
  type CombinedExperience,
  type CredibilityOrganization,
  type EventPlanningStep,
  type InquiryContext,
  type SignatureExperience,
} from "../signature-elements";
import { ResponsiveImage } from "./responsive-image";

export function ExperienceSelector({
  experiences = signatureExperiences,
  heading = "Choose where the experience begins.",
  description = "Each division has its own atmosphere and purpose. Together, they create one considered event language.",
  id,
  showDescription = true,
}: {
  experiences?: readonly SignatureExperience[];
  heading?: string;
  description?: string;
  id?: string;
  showDescription?: boolean;
} = {}) {
  return (
    <section
      className="signature-selector"
      id={id}
      aria-labelledby="signature-selector-title"
    >
      <header className="signature-section-heading">
        <h2 id="signature-selector-title">{heading}</h2>
        {showDescription ? (
          <p>{description}</p>
        ) : null}
      </header>
      <div className="signature-selector-world">
        <div className="signature-selector-line" aria-hidden="true" />
        {experiences.map((experience) => (
          <Link
            className={`signature-selector-choice signature-selector-${experience.id}`}
            href={experience.href}
            key={experience.id}
          >
            <span className="signature-selector-number">{experience.number}</span>
            <span className="signature-selector-art" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="signature-selector-copy">
              <span className="signature-selector-label">{experience.label}</span>
              <strong>{experience.name}</strong>
              <span>{experience.description}</span>
              <b aria-hidden="true">Explore ↗</b>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function EventPlanningPathway({
  steps = eventPlanningPathway,
  heading = "How the planning journey takes shape",
  description = "This sequence explains the planning path. The operational inquiry remains a separate, focused handoff.",
  showDescription = true,
}: {
  steps?: readonly EventPlanningStep[];
  heading?: string;
  description?: string;
  showDescription?: boolean;
} = {}) {
  return (
    <section className="signature-pathway" aria-labelledby="signature-pathway-title">
      <header className="signature-section-heading signature-section-heading-compact">
        <h2 id="signature-pathway-title">{heading}</h2>
        {showDescription ? (
          <p>{description}</p>
        ) : null}
      </header>
      <ol className="signature-pathway-list">
        {steps.map((step) => (
          <li key={step.number}>
            <Link href={step.href}>
              <span>{step.number}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
              <b aria-hidden="true">↗</b>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function CombinedExperienceFeature({
  combinations = combinedExperiences,
  heading = "More than one way to shape the room.",
  description = "Each composition starts with the occasion, bringing together only the coffee, dessert, and seating experiences that meaningfully support it.",
}: {
  combinations?: readonly CombinedExperience[];
  heading?: string;
  description?: string;
} = {}) {
  return (
    <section className="signature-combinations" aria-labelledby="signature-combinations-title">
      <div className="signature-combinations-intro">
        <h2 id="signature-combinations-title">{heading}</h2>
        <p>{description}</p>
      </div>
      <div className="signature-combinations-list">
        {combinations.map((combination, index) => (
          <Link href={combination.href} key={combination.id}>
            <span className="signature-combination-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="signature-combination-main">
              <small>{combination.occasion}</small>
              <strong>{combination.title}</strong>
              <span>{combination.description}</span>
            </span>
            <span className="signature-combination-orbit" aria-hidden="true">
              {combination.experienceIds.map((experienceId) => (
                <i className={`signature-node-${experienceId}`} key={experienceId} />
              ))}
            </span>
            <b aria-hidden="true">↗</b>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CredibilityStrip({
  organizations = credibilityOrganizations,
  variant = "default",
}: {
  organizations?: readonly CredibilityOrganization[];
  variant?: "default" | "hero";
}) {
  const approvedOrganizations = organizations.filter(
    (organization) => organization.permission === "approved",
  );

  if (approvedOrganizations.length === 0) {
    return null;
  }

  return (
    <section
      className={`signature-credibility signature-credibility-${variant}`}
      aria-labelledby={`signature-credibility-title-${variant}`}
    >
      <p id={`signature-credibility-title-${variant}`}>
        {variant === "hero"
          ? "Trusted by"
          : "Selected organizations Luxe has served"}
      </p>
      <ul>
        {approvedOrganizations.map((organization) => (
          <li
            className={`signature-organization-${organization.name
              .toLowerCase()
              .replaceAll(/[^a-z0-9]+/g, "-")
              .replaceAll(/(^-|-$)/g, "")}`}
            key={organization.name}
          >
            {variant === "hero" ? (
              <>
                <span className="signature-organization-logo" aria-hidden="true">
                  {organization.logo ? (
                    <ResponsiveImage asset={organization.logo} />
                  ) : null}
                </span>
                <span className="signature-organization-name">{organization.name}</span>
              </>
            ) : (
              organization.name
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ContextualInquiryPanel({
  context,
  contextKey = "default",
  showEyebrow = true,
}: {
  context?: InquiryContext;
  contextKey?: string;
  showEyebrow?: boolean;
}) {
  const resolvedContext =
    context ?? inquiryContexts[contextKey] ?? inquiryContexts.default;

  return (
    <section className="signature-inquiry" aria-labelledby={`signature-inquiry-${contextKey}`}>
      <div className="signature-inquiry-mark" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="signature-inquiry-copy">
        {showEyebrow ? (
          <p className="foundation-label">{resolvedContext.eyebrow}</p>
        ) : null}
        <h2 id={`signature-inquiry-${contextKey}`}>{resolvedContext.heading}</h2>
        <p>{resolvedContext.description}</p>
      </div>
      <Link href={resolvedContext.href}>
        {resolvedContext.cta}
        <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
