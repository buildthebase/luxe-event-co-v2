# Luxe Journal CMS

The Luxe Journal CMS is a local-only editorial workspace. Start it with:

```bash
npm run cms
```

Open `http://127.0.0.1:4317`. The server refuses non-loopback clients, validates request origins, and requires an in-memory mutation token for writes. It is not part of the public Vinext application or Sites deployment.

## Content workflow

- Drafts are private and excluded from the public build.
- Published articles are indexable and feed the Blog, metadata, schema, and sitemap.
- Archived articles must retain a `noindex, follow` URL or use a same-site permanent redirect.
- Trash and recoverable revisions are local and ignored by Git.
- `npm run cms:check` runs automatically before every production build.

## Article Studio safeguard

Article Studio uses the official Codex SDK and saved local Codex authentication. It removes API-key variables, disables network access, and gives Codex read-only repository access. Before generation unlocks, confirm in Codex Settings → Usage that paid credits and auto top-up are disabled. The SDK does not expose an account credit-balance API, so the CMS cannot verify that account-level setting itself.

Generation follows mandatory brief and outline approvals. Codex returns structured data; only the CMS writes a review-only draft. Publication always remains manual.

## Media

Original uploads are stored under `content/blog/media/originals` and ignored by Git. Approved responsive WebP derivatives and social crops are written to `public/images/blog` and recorded in the versioned media manifest.
