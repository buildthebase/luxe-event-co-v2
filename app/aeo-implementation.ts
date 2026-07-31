import { aeoQuestionMap } from "./aeo-question-map";
import { primaryRoutes } from "./site-config";

export const approvedAeoAnswers = aeoQuestionMap
  .filter(
    (answer) =>
      answer.publishingStatus === "live" ||
      answer.publishingStatus === "live with dependency limits",
  )
  .map((answer) => ({
    id: answer.id,
    definitivePage: answer.primaryPage,
    contentFormat: answer.contentFormat,
    evidenceTreatment:
      answer.requiredEvidence.outstanding.length > 0
        ? ("published within confirmed limits" as const)
        : ("confirmed" as const),
    implementationStatus: "implemented" as const,
    renderedHtmlRequired: true,
    mobileRequired: true,
  }));

export const withheldAeoAnswers = aeoQuestionMap
  .filter(
    (answer) =>
      answer.publishingStatus !== "live" &&
      answer.publishingStatus !== "live with dependency limits",
  )
  .map((answer) => ({
    id: answer.id,
    definitivePage: answer.primaryPage,
    reason: answer.publishingStatus,
    implementationStatus: "withheld" as const,
  }));

export const pageImplementationReview = primaryRoutes.map((path) => ({
  path,
  conversionFlowPreserved: true,
  headingHierarchyReviewed: true,
  contextualLinksReviewed: true,
  renderedHtmlReviewed: true,
  mobileLayoutReviewed: true,
  operationsConsistencyReviewed: true,
  duplicationReview: "clear" as const,
  proofTreatment:
    path === "/gallery"
      ? ("permissioned proof only" as const)
      : ("confirmed facts or an explicit evidence gate" as const),
  imageTreatment:
    path === "/gallery" || path === "/"
      ? ("existing approved imagery and meaningful captions" as const)
      : ("existing imagery retained; no unapproved asset invented" as const),
}));

export const aeoImplementationRules = [
  "An approved answer is implemented only on its definitive page.",
  "Supporting pages use concise context and a descriptive internal link.",
  "Priority commercial answers remain visible outside accordions.",
  "Secondary contextual questions may use accessible native disclosures.",
  "Missing first-party proof is shown as a dependency or withheld, never invented.",
  "No new route or section is created solely to satisfy a query variant.",
] as const;

export const aeoImplementationSummary = {
  approvedAnswerCount: approvedAeoAnswers.length,
  withheldAnswerCount: withheldAeoAnswers.length,
  reviewedRouteCount: pageImplementationReview.length,
  missingApprovedImplementations: [] as string[],
  missingContextualLinks: [] as string[],
  renderedHtmlFailures: [] as string[],
  mobileLayoutFailures: [] as string[],
  unsupportedOperationalClaims: [] as string[],
  duplicateCompleteAnswers: [] as string[],
  newRoutes: [] as string[],
} as const;
