export type RedirectPlan = {
  source: string;
  destination: string;
  status:
    | "confirmed-destination"
    | "implemented-locally-needs-domain-access";
  redirectType: "301";
  indexing: "do-not-index-source";
  notes: string;
};

export const canonicalHost = siteConfig.url;

export const redirectDomainPlan: RedirectPlan[] = [
  {
    source: "luxecoffeebar.ca",
    destination: `${canonicalHost}/experiences/coffee-bar`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: "luxesweetcart.ca",
    destination: `${canonicalHost}/experiences/sweet-cart`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: "luxeseatingrentals.ca",
    destination: `${canonicalHost}/experiences/seating-rentals`,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Service-specific domain should never host a duplicate website.",
  },
  {
    source: "http://luxeeventco.ca and http://www.luxeeventco.ca",
    destination: canonicalHost,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Preferred host is HTTPS apex; hosting and DNS configuration must enforce one canonical host without chains.",
  },
  {
    source: "https://www.luxeeventco.ca",
    destination: canonicalHost,
    status: "implemented-locally-needs-domain-access",
    redirectType: "301",
    indexing: "do-not-index-source",
    notes: "Preferred host is HTTPS apex; certificate and DNS access remain deployment dependencies.",
  },
];

export const redirectRules = [
  "Use server-level or edge-level 301 redirects.",
  "Do not include redirect sources in the primary XML sitemap.",
  "Do not canonicalize primary pages to redirect domains.",
  "Avoid redirect chains and loops.",
  "Redirect to the clean canonical URL without carrying query or tracking parameters.",
  "Keep permanent redirects active long-term.",
  "Confirm SSL works on every redirect domain before launch.",
] as const;
import { siteConfig } from "./site-config";
