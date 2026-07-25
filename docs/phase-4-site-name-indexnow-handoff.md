# Steps 4.18–4.20 — Domain, Brand Identity, and IndexNow Handoff

## Step 4.18 local status

The redirect implementation already existed locally:

- HTTP apex, HTTP `www`, and HTTPS `www` normalize directly to `https://luxeeventco.ca` with HTTP 301.
- Meaningful canonical primary-domain paths are preserved; query parameters are removed.
- Unknown primary-domain paths remain genuine 404 responses and are not redirected to Home.
- Each service domain redirects every path directly to its designated experience page with HTTP 301 and does not preserve meaningless paths.
- Redirect sources are absent from the primary sitemap and primary pages self-canonicalize only to `luxeeventco.ca`.

The local redirect plan now records these mappings as implemented locally but still requiring domain access. DNS attachment, apex and `www` certificate coverage, service-domain certificates, and live edge testing cannot be completed until the domains are connected to the production deployment.

## Step 4.19 outcome

- The preferred site name is `Luxe Event Co.`.
- Ordered alternate names are `Luxe Event Co` and `luxeeventco.ca`. `Luxe` was deliberately excluded because it is too generic.
- Home emits one `WebSite` entity at `https://luxeeventco.ca/#website` with the preferred name, alternate names, and canonical Home URL.
- Application name, Open Graph site name, manifest name, page-title conventions, Organization name, and visible public identity derive from the shared site configuration.
- Home remains crawlable, indexable, server rendered, and self-canonicalizing.
- The icon set now contains:
  - a multi-resolution `/favicon.ico`;
  - the existing 1254 by 1254 transparent `/icon.png`;
  - a 180 by 180 `/apple-icon.png`.
- The Organization graph references the existing 1200 by 1200 public logo through the stable `#logo` identifier.

These signals express a preference. They do not guarantee which site name or favicon Google displays.

## Step 4.20 outcome

IndexNow is implemented as an optional, inactive capability:

- No key was generated or committed.
- No URL was submitted.
- A valid hosted `INDEXNOW_KEY` enables the canonical root verification file at `/{key}.txt`.
- `npm run indexnow:submit` is inert by default.
- Submission requires the explicit `--send` flag and at least one changed canonical URL.
- The command validates the key format, requires canonical HTTPS URLs, removes fragments, deduplicates URLs, and enforces the 10,000-URL protocol limit.
- Submissions use the global `https://api.indexnow.org/indexnow` endpoint and include the canonical root key location.
- The submission response is treated only as receipt, never as an indexing guarantee.

## Required external activation

1. Verify `https://luxeeventco.ca` in Bing Webmaster Tools.
2. Submit and monitor `https://luxeeventco.ca/sitemap.xml` in Bing Webmaster Tools.
3. Decide whether the site's publishing frequency justifies activating IndexNow.
4. If approved, generate a compliant IndexNow key and configure `INDEXNOW_KEY` in the hosted production environment.
5. Deploy and verify `https://luxeeventco.ca/{key}.txt`.
6. Submit only URLs added, updated, deleted, or redirected after activation.
7. Monitor the IndexNow report in Bing Webmaster Tools while retaining normal sitemap submission.

## Deliberate deviations

1. IndexNow was not activated merely because the protocol exists. The current 16-page site changes infrequently, so the XML sitemap remains sufficient as the baseline.
2. The key is not stored in source control or a local example file.
3. IndexNow is not called during builds or deployments automatically. An approved publishing workflow must explicitly identify changed URLs.
4. Redirect-domain URLs are not submitted through the canonical host key. Those domains require their own verified ownership context if IndexNow notifications are ever needed for them.
5. No Bing or Google webmaster account action is claimed complete; those require verified external access.

