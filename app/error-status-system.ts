export const errorStatusSystem = {
  notFound: {
    component: "app/not-found.tsx",
    status: 404,
    indexable: false,
    behavior: "Unknown static paths and invalid dynamic slugs render the branded not-found page.",
  },
  permanentRedirects: {
    status: 301,
    implementation: "worker/index.ts",
    rules: [
      "HTTP and www requests resolve directly to the HTTPS apex host.",
      "Approved division domains resolve directly to their canonical division page.",
      "Redirect destinations are terminal canonical URLs, preventing chains and loops.",
    ],
  },
  temporaryRedirects: {
    configured: false,
    rule: "Introduce 302 or 307 responses only for a confirmed temporary operational need.",
  },
  applicationErrors: {
    component: "app/error.tsx",
    status: 500,
    recovery: ["Retry the failed route", "Return home", "Contact Luxe"],
  },
  serverFailures: {
    implementation: "worker/index.ts",
    status: 500,
    behavior:
      "If application rendering fails before the route error boundary can respond, the worker returns a minimal server-rendered recovery document with no JavaScript dependency.",
    indexable: false,
  },
  inquiryHandoff: {
    behavior:
      "Missing, malformed, or unsupported third-party destinations fall back to the public Luxe email address.",
    limitation:
      "The Luxe site cannot reliably detect an outage after a visitor has navigated to an external platform.",
  },
  galleryEmptyState: {
    component: "app/components/gallery-collection.tsx",
    recovery: "Reset the active filter and restore all gallery groups.",
  },
  monitoring: {
    provider: "Cloudflare Worker observability",
    enabled: true,
    privacy:
      "Runtime logging records the request method, pathname, Cloudflare request ID, and error without query parameters or submitted visitor details.",
  },
} as const;
