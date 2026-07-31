# Phase 4B.13 — Direct, Extractable Answers

Date: July 26, 2026  
Status: Implemented across visible question-led content

## Answer contract

When a visible section poses a question, the response follows this order:

1. answer the question in the first sentence;
2. identify the factors that can change the answer;
3. explain how Luxe reviews or confirms the requirement; and
4. provide a relevant crawlable next step within the item or question section.

If a fact is unverified, the first sentence states the limitation directly.
The answer then explains the determining factors and the confirmation process.
It does not estimate the missing number or hide the limitation after
promotional copy.

## Implementation decisions

- Main FAQ questions retain their contextual per-answer links.
- Service and event accordions use one section-level link rather than repeating
  the same link inside every answer.
- The Experiences coordination questions now lead directly to inquiry.
- The Events question-led directory already answers immediately and links each
  occasion to its definitive page.
- The final FAQ inquiry question already answers with the required inquiry
  details and links to Inquire.

## Pricing corrections

Three commercial answers were reordered:

- general event pricing now begins with the determining factors;
- mobile coffee pricing now begins with format, attendance, duration, location,
  staffing, menu, equipment, setup, conditions, branding, and station count;
  and
- Sweet Cart pricing now begins with the dessert-specific scope factors.

Each then explains how Luxe confirms the scope and why a single fixed total is
not published.

## Bloat controls

- No answer received a promotional lead-in.
- No repeated link was inserted into every service or event accordion item.
- No new public section, route, FAQ question, schema type, or resource article
  was created.
