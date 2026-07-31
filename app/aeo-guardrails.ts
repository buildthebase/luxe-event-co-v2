import { primaryRoutes, siteConfig } from "./site-config";

export type UnsupportedAeoTactic = {
  tactic: string;
  status: "prohibited" | "optional-isolated";
  enforcement: string;
  evidence: string;
};

export const unsupportedAeoTactics: readonly UnsupportedAeoTactic[] = [
  {
    tactic: "Generic AI keywords",
    status: "prohibited",
    enforcement:
      "Research and copy must use prospect language, service facts, event decisions, and verified operating concerns.",
    evidence:
      "The question map classifies audience, intent, funnel stage, evidence, and one definitive destination; it does not define an AI-keyword vocabulary.",
  },
  {
    tactic: "Required llms.txt",
    status: "optional-isolated",
    enforcement:
      "The optional file may summarize already-public facts, but no page, crawl path, canonical, schema entity, answer, or measurement depends on it.",
    evidence:
      "The permanent route map, navigation, robots policy, sitemap, structured data, and page briefs do not require llms.txt.",
  },
  {
    tactic: "Machine-only content chunks",
    status: "prohibited",
    enforcement:
      "Every public answer must improve the visible user journey and remain available in initial rendered HTML.",
    evidence:
      "Priority answers use visible page sections, while structured data is derived only from matching visible content.",
  },
  {
    tactic: "Hundreds of long-tail pages",
    status: "prohibited",
    enforcement:
      "Long-tail findings improve the definitive existing page unless a materially distinct, repeatedly evidenced resource passes the new-page gate.",
    evidence: `The canonical architecture remains limited to ${primaryRoutes.length} permanent routes.`,
  },
  {
    tactic: "Thin city pages",
    status: "prohibited",
    enforcement:
      "Service-area context belongs on existing service, event, FAQ, and inquiry pages; a city page requires unique local evidence and useful local substance.",
    evidence:
      "No city-specific public route exists, and Toronto/GTA coverage is represented through shared approved service-area data.",
  },
  {
    tactic: "Exact-match questions in every heading",
    status: "prohibited",
    enforcement:
      "Use a question heading only when the section genuinely answers that question; retain descriptive editorial headings elsewhere.",
    evidence:
      "The page-level briefs choose formats by decision need, and the implementation retains descriptive heroes, comparisons, timelines, checklists, and proof sections.",
  },
  {
    tactic: "Every section converted to FAQ",
    status: "prohibited",
    enforcement:
      "FAQ formatting is reserved for contextual or shared questions; priority answers, comparisons, inclusions, processes, logistics, and timelines use the format best suited to the task.",
    evidence:
      "The content-format registry assigns multiple visible formats and limits accordions to secondary questions.",
  },
  {
    tactic: "Major answers hidden behind interactions",
    status: "prohibited",
    enforcement:
      "Priority commercial and planning answers remain visible; native disclosures may contain secondary answers only, with their text present in initial HTML.",
    evidence:
      "Pricing-factor answers are visible before service FAQ accordions, and JavaScript SEO rules require disclosure content in rendered HTML.",
  },
  {
    tactic: "Schema overuse",
    status: "prohibited",
    enforcement:
      "Schema must match visible approved content, use the narrowest justified page/entity types, and confer no assumed rich-result entitlement.",
    evidence:
      "The schema architecture excludes Event on event-service pages, self-serving rating markup, hidden FAQ answers, invented offers, and duplicate organization entities.",
  },
  {
    tactic: "Unsupported statistics",
    status: "prohibited",
    enforcement:
      "Publish only confirmed first-party figures and qualify their scope; throughput, staffing, timing, utility, wait-time, and outcome figures remain unpublished until confirmed.",
    evidence:
      "The content-validation registry separates confirmed capacities, setup counts, insurance, and booking terms from operational dependencies.",
  },
  {
    tactic: "Fabricated examples, testimonials, or case studies",
    status: "prohibited",
    enforcement:
      "An example becomes proof only with an accurate event record, permission, context, attribution, and approved asset.",
    evidence:
      "Unavailable event photography, testimonials, campaign details, outcomes, and case studies remain gated in the first-party evidence registry.",
  },
  {
    tactic: "Fake mentions",
    status: "prohibited",
    enforcement:
      "Do not create, purchase, simulate, or imply independent mentions, endorsements, citations, reviews, or partnerships.",
    evidence:
      "Approved organization names are presented only as organizations served and never as endorsements, testimonials, or case-study approval.",
  },
  {
    tactic: "Unnatural rewriting for AI systems",
    status: "prohibited",
    enforcement:
      "Answer the prospect directly in natural language, then explain relevant factors, Luxe handling, and the next useful step.",
    evidence:
      "The direct-answer and content-validation systems reject AI-oriented phrasing, keyword stuffing, filler, and repeated complete answers.",
  },
] as const;

export const llmsTxtPolicy = {
  path: "/llms.txt",
  status: "optional-isolated",
  requiredForLaunch: false,
  rankingBenefitClaimed: false,
  listedInNavigation: false,
  listedInSitemap: false,
  referencedByStructuredData: false,
  referencedByRobotsPolicy: false,
  substitutesForVisibleContent: false,
  contentRule:
    "If retained, it may only summarize facts and canonical links already supported by the visible website.",
} as const;

export const unsupportedAeoEnforcementRules = [
  "A research query does not create a page, heading, FAQ entry, schema entitlement, statistic, or proof asset.",
  "Visible usefulness and accurate first-party evidence take priority over machine-oriented formatting.",
  "No unsupported tactic may be introduced to compensate for weak evidence, limited data, or an unverified integration.",
  "Measurement findings improve existing definitive pages before any new route is planned.",
  `The public organization name remains ${siteConfig.name} until an approved entity migration is completed.`,
] as const;

export const unsupportedAeoAudit = {
  reviewedTacticCount: unsupportedAeoTactics.length,
  violations: [] as string[],
  artificialContentRoutes: [] as string[],
  thinLocationRoutes: [] as string[],
  fabricatedProof: [] as string[],
  unsupportedStatistics: [] as string[],
  machineOnlyAnswerDependencies: [] as string[],
} as const;
