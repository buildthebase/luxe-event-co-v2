# Luxe Journal content

Versioned JSON is the source of truth for Blog editorial content.

- `published/articles.json`: public, indexable articles.
- `drafts/articles.json`: CMS-only drafts; never imported by the public application.
- `archived/articles.json`: retained noindex pages or redirect records.
- `knowledge/`: approved website snapshot and supplemental grounding records.
- `voice.json`: enforceable Luxe editorial rules.
- `media/manifest.json`: approved image metadata and derivatives.
- `studio/jobs.json`: resumable Codex generation provenance and usage.
- `calendar/items.json`: manually approved editorial ideas and scheduled work.
- `calendar/config.json`: cadence, workflow, category mix, blackout dates, and campaigns.
- `calendar/proposals.json`: Codex calendar proposals and their approval state.

Local Trash, revisions, media originals, CMS Help conversations, and runtime state are intentionally ignored by Git. CMS Help keeps Codex read-only: repairs are returned as reviewable proposals, and the CMS applies only an explicitly accepted proposal through validation and recoverable revisions. Calendar proposals do not become planned items until explicitly approved.
