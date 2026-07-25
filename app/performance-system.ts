export const coreWebVitalsTargets = {
  percentile: 75,
  mobileAndDesktop: true,
  lcpMilliseconds: 2500,
  inpMilliseconds: 200,
  cls: 0.1,
} as const;

export const diagnosticTargets = {
  performance: 90,
  accessibility: 95,
  bestPractices: 95,
  seo: 100,
  interpretation:
    "Diagnostic thresholds support quality control; they are not ranking guarantees or substitutes for field Core Web Vitals.",
} as const;

export const performanceControls = {
  rendering:
    "Pages remain server-rendered. Client components are limited to navigation, the cinematic Home hero, and gallery filtering.",
  javascript:
    "Use platform APIs, CSS transitions, and lightweight React state instead of animation or interaction libraries.",
  images:
    "Reserve intrinsic dimensions, prioritize only the primary image, and lazy-load responsive below-the-fold media.",
  heroVideo:
    "Approved hero videos require matching posters, optimized MP4/WebM outputs, metadata-only or deferred preload, muted playback, and a fallback state.",
  constrainedConnections:
    "Reduced-motion, Save-Data, slow-2g, and 2g visitors bypass cinematic autoplay and receive the stable final state.",
  fonts:
    "Use the Latin subset of the self-hosted Next.js font with swap behavior; preload only the site’s critical font resources.",
  thirdParties:
    "No analytics, inquiry, or marketing script loads until the provider, consent behavior, and performance cost are approved.",
  layoutStability:
    "Media frames, navigation, credibility marks, and interactive panels reserve space before deferred assets become available.",
  hydration:
    "Do not convert server components to client components unless interaction requires browser state or browser APIs.",
} as const;

export const pageExperienceControls = {
  secureDelivery:
    "The canonical origin is HTTPS. Production requests normalize to that origin, and canonical HTTPS responses send a long-lived HSTS policy.",
  mobile:
    "Every permanent route keeps the same primary content and actions at supported mobile, tablet, desktop, zoom, and orientation states.",
  navigation:
    "Primary navigation uses labelled native landmarks and controls, remains keyboard accessible, and never depends on hover or motion.",
  mainContent:
    "A skip link targets the page content, while header, navigation, main, and footer landmarks keep navigation separate from the primary content.",
  typography:
    "Responsive type tokens preserve readable body sizing and line height; mobile browsers may not silently shrink page text.",
  overlays:
    "No automatic modal, advertising overlay, newsletter gate, consent wall, or full-screen interstitial may obscure primary content.",
  mobileMenu:
    "The full-height mobile navigation is an intentional exception: it opens only after a visitor activates Menu, closes with Escape or a selected link, and is not a promotional interstitial.",
  interactions:
    "Controls must describe the action they perform, provide visible state and focus, and may not use disguised links, false urgency, or other deceptive interaction.",
  browserHistory:
    "The website may not trap, rewrite, or interfere with browser Back navigation. History changes require a genuine future product need and a dedicated review.",
  rankingContext:
    "Core Web Vitals and page-experience work serves visitors first; passing diagnostics does not guarantee rankings.",
} as const;

export const performanceBudgets = {
  heroVideo: {
    desktopPerIntroClipMegabytes: 2,
    mobilePerIntroClipMegabytes: 1,
    posterKilobytes: 180,
    rule: "Budgets are maximum review thresholds, not automatic approval. Final encoding must be visually inspected.",
  },
  fonts: {
    families: 1,
    subsets: ["latin"],
    weights: [400, 500, 600],
  },
  thirdPartyScripts: 0,
} as const;

export const performanceValidationPlan = {
  currentStage:
    "Architecture and source-level prevention controls are implemented; final media and production field data are not yet available, and live delivery evidence remains a production closeout item.",
  releaseGate: [
    "Run a production build and the complete route-level quality suite.",
    "Confirm the canonical host redirects HTTP and www requests to HTTPS without redirect chains.",
    "Confirm canonical HTTPS HTML and image responses retain the production security policy.",
    "Check representative routes at supported mobile, tablet, desktop, zoom, reduced-motion, and constrained-connection states.",
  ],
  phaseCloseout: [
    "Run throttled mobile and desktop Lighthouse diagnostics on representative production builds.",
    "Inspect the network waterfall, main-thread work, hydration, unused JavaScript, font transfer, image selection, and media transfer.",
    "Verify layout shifts during navigation, font swap, media loading, and interactive reveal.",
    "Record representative mobile and desktop LCP elements and interaction traces.",
  ],
  postLaunch: [
    "Monitor 75th-percentile mobile and desktop Core Web Vitals by evaluating LCP, INP, and CLS independently in field data.",
    "Use Search Console and PageSpeed Insights when the origin has enough Chrome UX Report data.",
    "Add consent-compatible real-user monitoring only after its provider, endpoint, retention, and performance cost are approved.",
    "Investigate page-template regressions rather than relying on one aggregate score.",
    "Re-test after approved photography, video, analytics, or inquiry-platform integrations are introduced.",
  ],
} as const;
