# Luxe Journal content

Versioned JSON is the source of truth for Blog editorial content.

- `published/articles.json`: public, indexable articles.
- `drafts/articles.json`: CMS-only drafts; never imported by the public application.
- `archived/articles.json`: retained noindex pages or redirect records.
- `knowledge/`: approved website snapshot and supplemental grounding records.
- `voice.json`: enforceable Luxe editorial rules.
- `media/manifest.json`: approved image metadata and derivatives.
- `studio/jobs.json`: resumable Codex generation provenance and usage.

Local Trash, revisions, media originals, and CMS runtime state are intentionally ignored by Git.
