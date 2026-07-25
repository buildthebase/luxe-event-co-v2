import { permanentRoutes } from "./responsive-system";

export const javascriptSeoSystem = {
  status: "established",
  scope: permanentRoutes,
  rendering: {
    strategy:
      "Use server rendering for every public route. Hydration enhances navigation, the Home cinematic sequence, and gallery filtering without becoming the source of primary content.",
    initialHtml:
      "Titles, descriptions, robots directives, canonical links, headings, primary copy, crawlable links, and structured data are emitted before client JavaScript runs.",
    dynamicRendering:
      "Do not serve crawler-specific HTML. Visitors and crawlers receive the same server-rendered content.",
  },
  discovery: {
    links:
      "Internal navigation and contextual journeys use anchor elements with href attributes pointing to stable URLs.",
    criticalContent:
      "Primary service, event, location, proof, qualification, and inquiry information is present in initial HTML and never requires a click, filter, carousel, or video playback to exist.",
    disclosures:
      "FAQ answers may use native details elements for presentation because the complete question and answer text remains in initial HTML.",
  },
  directives: {
    production:
      "Indexable canonical pages must not emit noindex in initial HTML or an X-Robots-Tag response header.",
    errors:
      "Non-200 pages use meaningful HTTP status codes, visible server-rendered recovery content, and server-side noindex directives.",
    mutation:
      "Client JavaScript must not add, remove, or rewrite canonical or robots directives.",
  },
  resources: {
    frameworkAssets:
      "robots.txt allows the fingerprinted JavaScript and CSS assets required to render and hydrate public pages.",
    cacheIdentity:
      "Production framework assets use content-fingerprinted filenames so changed bundles receive new URLs.",
    lazyLoading:
      "Below-the-fold images use native loading=lazy with real src and intrinsic dimensions in HTML; loading is viewport-driven and never click-driven.",
  },
  validation: {
    local: [
      "Inspect initial HTTP HTML for metadata, canonical, robots, headings, content, links, and JSON-LD on every permanent route.",
      "Verify production routes return 200 and unknown routes return 404 with visible recovery content.",
      "Verify framework assets are discoverable, fingerprinted, and not blocked by robots.txt.",
      "Verify lazy images retain src, dimensions, alt, and loading attributes in initial HTML.",
    ],
    production: [
      "Use Search Console URL Inspection on representative Home, hub, service, event-type, gallery, FAQ, inquiry, and 404 URLs.",
      "Compare crawled and rendered HTML and confirm required framework resources loaded without errors.",
      "Re-test after framework, hosting, consent, analytics, inquiry, media, or routing changes.",
    ],
  },
} as const;

export type JavaScriptSeoSystem = typeof javascriptSeoSystem;
