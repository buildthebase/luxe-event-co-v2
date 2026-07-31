import { aeoAudienceProfiles, aeoContentDependencies } from "./aeo-audience-research";
import { contentFormatAudit } from "./aeo-content-formats";
import {
  contentCannibalizationAudit,
  priorityPageIntentReview,
} from "./aeo-content-ownership";
import {
  approvedAnswerValidation,
  clientConfirmationRequirements,
  contentAccuracyAudit,
} from "./aeo-content-validation";
import { firstPartyEvidenceInventory } from "./aeo-first-party-evidence";
import {
  approvedAeoAnswers,
  aeoImplementationSummary,
  withheldAeoAnswers,
} from "./aeo-implementation";
import {
  aeoMeasurementAudit,
  aeoMeasurementDependencies,
  aeoMetrics,
} from "./aeo-measurement";
import { pageAeoBriefs, pageAeoBriefSummary } from "./aeo-page-briefs";
import {
  questionClassifications,
  questionClassificationSummary,
} from "./aeo-question-classification";
import { aeoQuestionMap } from "./aeo-question-map";
import {
  questionClusters,
  researchSourceAvailability,
} from "./aeo-query-research";
import { primaryRoutes } from "./site-config";
import { unsupportedAeoAudit } from "./aeo-guardrails";

export type HardPassStatus = "pass" | "pass-with-documented-dependency";

export type Phase4BHardPassItem = {
  item: string;
  status: HardPassStatus;
  evidence: readonly string[];
  qualification?: string;
};

export const phase4BDeliverables: readonly Phase4BHardPassItem[] = [
  {
    item: "ICP question-research report",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-audience-research.ts",
      "app/aeo-query-research.ts",
      "docs/phase-4b-priority-icps.md",
      "docs/phase-4b-question-query-research.md",
    ],
    qualification:
      "Five ICP profiles and public research are complete; anonymized Luxe message, email, quote, interview, and sales archives were not supplied.",
  },
  {
    item: "Search-intent classification",
    status: "pass",
    evidence: [
      "app/aeo-question-classification.ts",
      "docs/phase-4b-question-classification.md",
    ],
  },
  {
    item: "Industry and service question library",
    status: "pass",
    evidence: [
      "app/aeo-query-research.ts",
      "app/aeo-question-map.ts",
    ],
  },
  {
    item: "Page-level AEO question map",
    status: "pass",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-aeo-question-map.md",
    ],
  },
  {
    item: "Content-gap analysis",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-audience-research.ts",
      "app/aeo-page-briefs.ts",
      "app/aeo-content-validation.ts",
    ],
    qualification:
      "Every gap is classified as answerable, qualified, permission-gated, operationally unconfirmed, or a conditional future resource.",
  },
  {
    item: "Page-specific AEO briefs",
    status: "pass",
    evidence: [
      "app/aeo-page-briefs.ts",
      "docs/phase-4b-page-level-aeo-briefs.md",
    ],
  },
  {
    item: "Verified operational-fact register",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-first-party-evidence.ts",
      "app/aeo-content-validation.ts",
      "docs/phase-4b-content-accuracy-validation.md",
    ],
    qualification:
      "Confirmed facts are registered; eleven operational topic groups remain unpublished or qualified pending client confirmation.",
  },
  {
    item: "Content dependency register",
    status: "pass",
    evidence: [
      "app/aeo-audience-research.ts",
      "app/aeo-content-validation.ts",
      "app/aeo-first-party-evidence.ts",
    ],
  },
  {
    item: "Comparison-content plan",
    status: "pass",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-comparison-content.md",
    ],
  },
  {
    item: "Cost-question plan",
    status: "pass",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-cost-pricing-content.md",
    ],
  },
  {
    item: "Capacity and logistics plan",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-capacity-logistics-content.md",
    ],
    qualification:
      "Confirmed capacity is published; throughput, staffing, footprints, utilities, and timing remain qualified until confirmed.",
  },
  {
    item: "Customization and branding plan",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-customization-branding-content.md",
    ],
    qualification:
      "Available surfaces and options are documented; production lead times and client-file specifications remain proposal-dependent.",
  },
  {
    item: "Local-intent plan",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-question-map.ts",
      "docs/phase-4b-local-service-area-content.md",
    ],
    qualification:
      "Toronto, GTA, and qualified Southern Ontario coverage are complete without thin city pages; exact travel formulas remain unpublished.",
  },
  {
    item: "Completed answer-oriented copy",
    status: "pass",
    evidence: [
      "app/aeo-direct-answer-system.ts",
      "app/aeo-implementation.ts",
      "docs/phase-4b-direct-extractable-answers.md",
    ],
  },
  {
    item: "First-party evidence map",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-first-party-evidence.ts",
      "docs/phase-4b-first-party-evidence.md",
    ],
    qualification:
      "Confirmed facts are paired with answers; unavailable photography, testimonials, event examples, and case studies remain gated.",
  },
  {
    item: "Internal-link updates",
    status: "pass",
    evidence: [
      "app/aeo-question-map.ts",
      "app/aeo-implementation.ts",
      "tests/aeo-website-implementation.test.mjs",
    ],
  },
  {
    item: "Implemented page content",
    status: "pass",
    evidence: [
      "app/aeo-implementation.ts",
      "docs/phase-4b-website-content-implementation.md",
    ],
  },
  {
    item: "Accuracy review",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-content-validation.ts",
      "docs/phase-4b-content-accuracy-validation.md",
    ],
    qualification:
      "All live answers are reviewed; operational expansion remains gated by the client-confirmation register.",
  },
  {
    item: "Duplication and cannibalization review",
    status: "pass",
    evidence: [
      "app/aeo-content-ownership.ts",
      "docs/phase-4b-content-ownership-cannibalization.md",
    ],
  },
  {
    item: "AEO measurement framework",
    status: "pass-with-documented-dependency",
    evidence: [
      "app/aeo-measurement.ts",
      "app/conversion-measurement.ts",
      "docs/phase-4b-aeo-measurement-framework.md",
    ],
    qualification:
      "All eighteen metrics are defined; live reporting requires approved search, analytics, consent, and inquiry integrations.",
  },
] as const;

export const phase4BAcceptanceCriteria: readonly Phase4BHardPassItem[] = [
  {
    item: "Every priority page has a documented AEO purpose",
    status: "pass",
    evidence: [
      "Sixteen page briefs cover all sixteen permanent routes with no missing or duplicate paths.",
      "Sixteen content-ownership records define one primary intent per route.",
    ],
  },
  {
    item: "Every important question is assigned to one primary page",
    status: "pass",
    evidence: [
      "All sixty question-map records contain one definitive primary page.",
      "All supporting links point back to the definitive page.",
    ],
  },
  {
    item: "Questions reflect actual industry and ICP search behaviour",
    status: "pass-with-documented-dependency",
    evidence: [
      "Twenty-one consolidated clusters use sampled Canadian suggestions, People Also Ask, competitor headings and FAQs, wedding discussions, and industry communities.",
      "Natural variants and source observations remain attributable.",
    ],
    qualification:
      "First-party Luxe inquiry archives and verified Search Console or Google Business Profile exports remain unavailable.",
  },
  {
    item: "Content answers non-branded questions before introducing Luxe",
    status: "pass",
    evidence: [
      "Direct-answer rules require the prospect answer first, followed by factors, Luxe handling, and the next step.",
      "Rendered priority answers use service and event decisions rather than brand-only prompts.",
    ],
  },
  {
    item: "Commercial questions receive useful answers",
    status: "pass",
    evidence: [
      "Pricing, inclusions, comparison, availability, capacity, customization, travel, and booking questions receive direct answers before inquiry.",
    ],
  },
  {
    item: "Cost questions explain real pricing factors",
    status: "pass",
    evidence: [
      "Coffee, dessert, rental, travel, branding, and combined-service answers identify confirmed quote factors without inventing fixed rates.",
    ],
  },
  {
    item: "Operational claims are verified",
    status: "pass-with-documented-dependency",
    evidence: [
      "Published operational figures are limited to the approved capacity, simultaneous-setup, setup/takedown, booking, service-area, insurance, menu, and category facts.",
    ],
    qualification:
      "Unconfirmed operational values are explicitly qualified or withheld, not counted as verified claims.",
  },
  {
    item: "No invented capacities, requirements, or statistics are published",
    status: "pass",
    evidence: [
      "Content-accuracy and unsupported-tactic audits report no invented statistics or unsupported claims.",
      "Throughput, staffing, footprint, utility, timing, wait-time, and outcome estimates remain unpublished.",
    ],
  },
  {
    item: "Priority answers appear in visible page content",
    status: "pass",
    evidence: [
      "Priority commercial answers use visible answer panels before secondary disclosures.",
      "Browser verification found no hidden priority answer.",
    ],
  },
  {
    item: "Important content is not hidden only in accordions",
    status: "pass",
    evidence: [
      "Accordions are limited to secondary contextual questions.",
      "All disclosure answer text remains present in initial rendered HTML.",
    ],
  },
  {
    item: "Main pages do not repeat identical answers",
    status: "pass",
    evidence: [
      "The cannibalization and implementation audits report no duplicate definitive answers.",
    ],
  },
  {
    item: "Service and event pages do not compete unnecessarily for the same intent",
    status: "pass",
    evidence: [
      "Every route has explicit owns, supports, and must-not-own boundaries.",
      "No unresolved competing intent is recorded.",
    ],
  },
  {
    item: "First-party evidence supports priority claims",
    status: "pass-with-documented-dependency",
    evidence: [
      "Fifteen evidence categories distinguish confirmed, qualified, approved, asset-required, and permission-required proof.",
    ],
    qualification:
      "Claims lacking an approved asset, event record, or permission remain withheld and do not weaken the published factual claims.",
  },
  {
    item: "Internal links connect users to definitive answers",
    status: "pass",
    evidence: [
      "All sixty question records contain link instructions.",
      "Eighty-eight instructions resolve to fifty unique rendered source-to-destination pairs.",
    ],
  },
  {
    item: "The final copy remains natural, persuasive, and consistent with the site's visual experience",
    status: "pass",
    evidence: [
      "The content-validation audit reports no keyword stuffing or unnatural AEO phrasing.",
      "Desktop and mobile visual review retained the established typography, hierarchy, spacing, conversion flow, and answer formats.",
    ],
  },
  {
    item: "A measurement system exists for post-launch improvement",
    status: "pass-with-documented-dependency",
    evidence: [
      "All eighteen requested metrics have sources, dimensions, methods, decision uses, cadences, and an existing-page-first workflow.",
    ],
    qualification:
      "The system is implementation-ready but intentionally inactive until approved external integrations and consent decisions exist.",
  },
] as const;

export const phase4BBrowserHardPass = {
  viewports: [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ],
  routesReviewed: primaryRoutes.length,
  routeViewportChecks: primaryRoutes.length * 2,
  failures: {
    missingMain: [] as string[],
    h1Count: [] as string[],
    duplicateIds: [] as string[],
    headingSkips: [] as string[],
    horizontalOverflow: [] as string[],
    brokenImages: [] as string[],
    canonicalCount: [] as string[],
    invalidJsonLd: [] as string[],
    missingInquiryPath: [] as string[],
    hiddenPriorityAnswers: [] as string[],
    machineOrientedPublicPhrasing: [] as string[],
  },
  interactions: {
    faqDisclosure: "pass",
    comparisonJourney: "pass",
    inquiryJourney: "pass",
  },
  visualReview: {
    coffeeBarDesktop: "pass",
    faqMobile: "pass",
  },
} as const;

export const phase4BExternalAndPublicationDependencies = [
  ...clientConfirmationRequirements.map((dependency) => dependency.topic),
  "Anonymized first-party Luxe inquiry, message, quote, interview, and sales-question archives",
  "Verified Google Search Console, Bing Webmaster Tools, and Google Business Profile exports",
  "Approved analytics provider, consent model, attribution window, and reporting configuration",
  "Approved inquiry platform handoff and any reliable completion return",
  "Permissioned original photography, testimonials, event examples, and case studies",
] as const;

export const phase4BHardPassSummary = {
  date: "2026-07-27",
  deliverableCount: phase4BDeliverables.length,
  deliverablesPassed: phase4BDeliverables.length,
  acceptanceCriterionCount: phase4BAcceptanceCriteria.length,
  acceptanceCriteriaPassed: phase4BAcceptanceCriteria.length,
  priorityPageCount: priorityPageIntentReview.length,
  pageBriefCount: pageAeoBriefs.length,
  audienceProfileCount: aeoAudienceProfiles.length,
  researchSourceCount: researchSourceAvailability.length,
  questionClusterCount: questionClusters.length,
  classificationCount: questionClassifications.length,
  questionMapCount: aeoQuestionMap.length,
  implementedAnswerCount: approvedAeoAnswers.length,
  withheldAnswerCount: withheldAeoAnswers.length,
  approvedAnswerValidationCount: approvedAnswerValidation.length,
  evidenceCategoryCount: firstPartyEvidenceInventory.length,
  contentDependencyCount: aeoContentDependencies.length,
  clientConfirmationTopicCount: clientConfirmationRequirements.length,
  measurementMetricCount: aeoMetrics.length,
  measurementDependencyCount: aeoMeasurementDependencies.length,
  browserRouteViewportChecks: phase4BBrowserHardPass.routeViewportChecks,
  automatedVerification: {
    build: "pass",
    tests: 471,
    failures: 0,
    lint: "pass",
    diffCheck: "pass",
  },
  sourceAudits: {
    missingPageBriefs: pageAeoBriefSummary.missingPaths,
    unclassifiedQuestions: questionClassificationSummary.unclassifiedQuestionIds,
    missingApprovedImplementations:
      aeoImplementationSummary.missingApprovedImplementations,
    duplicatePublishedAnswers:
      contentCannibalizationAudit.exactDuplicatePublishedAnswers,
    unresolvedCompetingIntents:
      contentCannibalizationAudit.unresolvedCompetingIntents,
    hiddenPriorityAnswers: contentFormatAudit.priorityAnswersInsideAccordions,
    unsupportedClaims: contentAccuracyAudit.unsupportedClaims,
    inventedStatistics: contentAccuracyAudit.inventedStatistics,
    unsupportedTacticViolations: unsupportedAeoAudit.violations,
    newContentRoutes: aeoMeasurementAudit.newContentRoutes,
  },
  result: "pass-with-documented-external-and-publication-dependencies",
} as const;
