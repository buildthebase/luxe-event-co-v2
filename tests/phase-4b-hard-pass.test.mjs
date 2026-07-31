import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function read(path) {
  return readFile(new URL(path, import.meta.url), "utf8");
}

const [hardPass, documentation] = await Promise.all([
  read("../app/phase-4b-hard-pass.ts"),
  read("../docs/phase-4b-hard-pass.md"),
]);

test("hard-passes every Phase 4B deliverable", () => {
  for (const deliverable of [
    "ICP question-research report",
    "Search-intent classification",
    "Industry and service question library",
    "Page-level AEO question map",
    "Content-gap analysis",
    "Page-specific AEO briefs",
    "Verified operational-fact register",
    "Content dependency register",
    "Comparison-content plan",
    "Cost-question plan",
    "Capacity and logistics plan",
    "Customization and branding plan",
    "Local-intent plan",
    "Completed answer-oriented copy",
    "First-party evidence map",
    "Internal-link updates",
    "Implemented page content",
    "Accuracy review",
    "Duplication and cannibalization review",
    "AEO measurement framework",
  ]) {
    assert.match(hardPass, new RegExp(`item: "${deliverable.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), deliverable);
  }
  assert.match(hardPass, /deliverableCount: phase4BDeliverables\.length/);
  assert.match(hardPass, /deliverablesPassed: phase4BDeliverables\.length/);
  assert.match(documentation, /All 20 Phase 4B deliverables are present/);
});

test("hard-passes every acceptance criterion", () => {
  for (const criterion of [
    "Every priority page has a documented AEO purpose",
    "Every important question is assigned to one primary page",
    "Questions reflect actual industry and ICP search behaviour",
    "Content answers non-branded questions before introducing Luxe",
    "Commercial questions receive useful answers",
    "Cost questions explain real pricing factors",
    "Operational claims are verified",
    "No invented capacities, requirements, or statistics are published",
    "Priority answers appear in visible page content",
    "Important content is not hidden only in accordions",
    "Main pages do not repeat identical answers",
    "Service and event pages do not compete unnecessarily for the same intent",
    "First-party evidence supports priority claims",
    "Internal links connect users to definitive answers",
    "The final copy remains natural, persuasive, and consistent with the site's visual experience",
    "A measurement system exists for post-launch improvement",
  ]) {
    assert.match(hardPass, new RegExp(`item: "${criterion.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`), criterion);
  }
  assert.match(hardPass, /acceptanceCriteriaPassed: phase4BAcceptanceCriteria\.length/);
  assert.match(documentation, /all 16 acceptance criteria pass/);
});

test("records complete source and browser audit results", () => {
  assert.match(hardPass, /routeViewportChecks: primaryRoutes\.length \* 2/);
  assert.match(hardPass, /faqDisclosure: "pass"/);
  assert.match(hardPass, /comparisonJourney: "pass"/);
  assert.match(hardPass, /inquiryJourney: "pass"/);
  assert.match(hardPass, /coffeeBarDesktop: "pass"/);
  assert.match(hardPass, /faqMobile: "pass"/);
  assert.match(documentation, /32\s+route\/viewport checks/);
});

test("treats withheld answers and external evidence as dependencies rather than invented completions", () => {
  assert.match(documentation, /`guest-use-and-value` is planned/);
  assert.match(documentation, /`rental-risk-and-changes` is blocked/);
  assert.match(hardPass, /clientConfirmationRequirements\.map/);
  assert.match(hardPass, /Permissioned original photography, testimonials, event examples, and case studies/);
  assert.match(documentation, /does not automatically authorize another\s+route/);
});

test("requires clean source audits and no unsupported route growth", () => {
  for (const field of [
    "missingPageBriefs",
    "unclassifiedQuestions",
    "missingApprovedImplementations",
    "duplicatePublishedAnswers",
    "unresolvedCompetingIntents",
    "hiddenPriorityAnswers",
    "unsupportedClaims",
    "inventedStatistics",
    "unsupportedTacticViolations",
    "newContentRoutes",
  ]) {
    assert.match(hardPass, new RegExp(`${field}:`), field);
  }
  assert.match(documentation, /New AEO content routes: 0/);
});

test("documents the instructed exclusions and source-control boundary", () => {
  assert.match(documentation, /Step 4B\.21 was excluded as directed/);
  assert.match(documentation, /`llms\.txt` remains optional and isolated/);
  assert.match(documentation, /No commit, staging, push, or deployment was performed/);
});
