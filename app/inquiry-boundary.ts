export const websiteInquiryResponsibilities = [
  "Explain the inquiry process.",
  "Prepare visitors before handoff.",
  "Explain the information visitors should have available.",
  "Provide clear contextual inquiry CTAs.",
  "Allow visitors to indicate one or multiple experiences when supported.",
  "Send visitors to the approved third-party inquiry platform.",
  "Preserve Luxe visual identity around the handoff where technically possible.",
  "Track inquiry starts and third-party handoffs.",
  "Support a return or confirmation page if the platform permits one.",
  "Provide fallback phone and email contact methods.",
] as const;

export const thirdPartyInquiryResponsibilities = [
  "Form construction and conditional questions.",
  "Submission collection and lead storage.",
  "Automatic confirmation emails.",
  "Quote or proposal creation.",
  "Package and enhancement selection.",
  "Agreement signing.",
  "Deposit collection and payment processing.",
  "Automated reminders.",
  "CRM functionality.",
  "Post-event follow-up and review-request automation.",
  "Internal team notifications.",
] as const;

export const inquiryBoundaryRules = [
  "Do not duplicate third-party form, quote, contract, payment, CRM, reminder, or review functionality in the website without explicit later scope approval.",
  "Do not publish or hard-code an inquiry platform URL until the client confirms the production platform and return behavior.",
  "Do not send private inquiry content into analytics parameters.",
  "Do not pass page context through query parameters until the selected platform documents and permits the exact parameter names.",
  "Treat an outbound handoff as a start, not a completed inquiry; only a reliable approved return URL may record confirmation.",
  "Do not add a third-party script when a normal secure link can complete the handoff.",
] as const;

export const inquiryHandoffReadiness = {
  platform: "pending",
  contextParameters: "disabled-until-platform-approved",
  returnUrl: "pending-platform-support",
  privacyReview: "required-before-production-connection",
  scripts: "none-approved",
  fallback: "public-email-phone-and-faq",
} as const;
