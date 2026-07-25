import type { ReactNode } from "react";
import { siteConfig } from "../site-config";

export type InquiryHandoffContext = {
  sourcePath: string;
  experienceSlug?: string;
  eventType?: string;
};

const contextValues = {
  source_path: (context: InquiryHandoffContext) => context.sourcePath,
  experience_slug: (context: InquiryHandoffContext) => context.experienceSlug,
  event_type: (context: InquiryHandoffContext) => context.eventType,
} as const;

function createEmailFallbackHref() {
  const subject = encodeURIComponent(`${siteConfig.name} Inquiry`);
  return `mailto:${siteConfig.contact.email}?subject=${subject}`;
}

function createThirdPartyHref(context: InquiryHandoffContext) {
  if (!siteConfig.inquiry.url) {
    return null;
  }

  let destination: URL;

  try {
    destination = new URL(siteConfig.inquiry.url);
  } catch {
    return null;
  }

  if (!["https:", "http:"].includes(destination.protocol)) {
    return null;
  }

  for (const parameter of siteConfig.inquiry.permittedContextParameters) {
    const value = contextValues[parameter](context);

    if (value) {
      destination.searchParams.set(parameter, value);
    }
  }

  return destination.toString();
}

export function InquiryHandoffLink({
  children,
  className,
  context,
}: {
  children: ReactNode;
  className?: string;
  context: InquiryHandoffContext;
}) {
  const thirdPartyHref = createThirdPartyHref(context);
  const isThirdParty = Boolean(thirdPartyHref);

  return (
    <a
      className={className}
      href={thirdPartyHref ?? createEmailFallbackHref()}
      data-event-name={isThirdParty ? "inquiry_handoff" : "inquiry_start"}
      data-handoff-status={isThirdParty ? "third-party-ready" : "email-fallback"}
      data-source-path={context.sourcePath}
      data-experience-slug={context.experienceSlug}
      data-event-type={context.eventType}
      {...(isThirdParty && siteConfig.inquiry.opensInNewTab
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      {children}
    </a>
  );
}
