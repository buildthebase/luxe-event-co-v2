import { imageAssets } from "./image-system";

const organizationName = "Luxe Event Co.";
const alternateSiteNames = ["Luxe Event Co", "luxeeventco.ca"] as const;
const canonicalBaseUrl = "https://luxeeventco.ca";
const defaultDescription =
  "Luxe Event Co. brings together mobile coffee, live dessert, and event rentals for weddings, corporate events, activations, and private celebrations across Toronto and the GTA.";

export const socialProfiles = {
  coffeeBar: "https://www.instagram.com/luxecoffeebar.to/",
  sweetCart: "https://www.instagram.com/luxesweet.cart/",
  seatingRentals: "https://www.instagram.com/luxeseatingrentals",
} as const;

export const siteConfig = {
  organization: {
    legalName: organizationName,
    publicName: organizationName,
  },
  name: organizationName,
  alternateNames: alternateSiteNames,
  domain: {
    primary: "luxeeventco.ca",
    canonicalBaseUrl,
  },
  url: canonicalBaseUrl,
  language: "en-CA",
  openGraphLocale: "en_CA",
  location: "Toronto, Canada",
  description: defaultDescription,
  defaultMetadata: {
    title: `${organizationName} | Coffee, Desserts & Seating Rentals Toronto`,
    description: defaultDescription,
  },
  brandAssets: {
    favicon: imageAssets.brand.favicon,
    organizationLogo: imageAssets.brand.organizationLogo,
    googleThumbnail: imageAssets.brand.googleThumbnail,
    defaultSocialImage: imageAssets.brand.defaultSocialImage,
  },
  contact: {
    email: "bookings@luxeeventco.ca",
    phone: "+16478691352",
    phoneDisplay: "+1 647-869-1352",
  },
  socialProfiles,
  searchConsole: {
    googleVerificationToken: null as string | null,
    bingVerificationToken: null as string | null,
    status: "not-configured" as const,
  },
  indexNow: {
    endpoint: "https://api.indexnow.org/indexnow",
    keyEnvironmentVariable: "INDEXNOW_KEY",
    status: "optional-not-enabled" as const,
  },
  analytics: {
    provider: null as string | null,
    measurementId: null as string | null,
    status: "not-configured" as const,
  },
  inquiry: {
    platformName: null as string | null,
    url: null as string | null,
    opensInNewTab: true,
    permittedContextParameters: [] as (
      | "source_path"
      | "experience_slug"
      | "event_type"
    )[],
    returnUrl: null as string | null,
    privacyUrl: null as string | null,
    scriptStrategy: "none" as const,
    status: "awaiting-platform-selection" as const,
  },
  yearsOperating: 5,
  serviceAreas: [
    "Toronto",
    "Markham",
    "Vaughan",
    "Richmond Hill",
    "Aurora",
    "Newmarket",
    "King City",
    "Thornhill",
    "North York",
    "Mississauga",
    "Brampton",
    "Oakville",
    "Burlington",
    "Milton",
    "Pickering",
    "Ajax",
    "Whitby",
    "Oshawa",
    "Scarborough",
    "Etobicoke",
  ],
  extendedServiceArea: "Select destination events throughout Southern Ontario",
  insurance: "$5 million liability insurance",
  booking: {
    minimumCoffeeGuests: 30,
    typicalValue: "$900-$3,000+",
    recommendedNoticeDays: 4,
    peakSeason: "April-October, with November-December corporate and holiday demand",
    retainer: "30% non-refundable retainer",
    responseTimeHours: 24,
  },
};

export type Division = {
  slug: string;
  number: string;
  name: string;
  label: string;
  landingPath: string;
  summary: string;
  serviceDescription: string;
  accent: "coffee" | "sweet" | "seating";
  inclusions: string[];
  customization: string[];
  eventApplications: { slug: string; label: string }[];
  faqs: { question: string; answer: string }[];
  searchTarget: { primary: string; secondary: string[] };
  gallery: { id: string; src: string | null; alt: string }[];
  inquiryCta: string;
  complementarySlugs: string[];
  instagram: string;
  offerings: string[];
  capacity: number;
  simultaneousSetups: number;
};

export const experiences: Division[] = [
  {
    slug: "coffee-bar",
    number: "01",
    name: "Luxe Coffee Bar",
    label: "Coffee Bar",
    landingPath: "/experiences/coffee-bar",
    summary: "Crafted coffee, professional barista service, and warm hospitality for events.",
    serviceDescription: "A refined mobile coffee experience within the Luxe Event Co. event platform.",
    accent: "coffee",
    inclusions: [],
    customization: [],
    eventApplications: [],
    faqs: [],
    searchTarget: {
      primary: "Toronto mobile coffee bar for events",
      secondary: ["wedding coffee bar Toronto", "corporate coffee catering Toronto"],
    },
    gallery: [],
    inquiryCta: "Ask about Luxe Coffee Bar",
    complementarySlugs: ["sweet-cart", "seating-rentals"],
    instagram: socialProfiles.coffeeBar,
    offerings: [
      "Luxe Café Cart Experience",
      "Luxe Signature Coffee Bar Experience",
      "Espresso classics and signature drinks",
      "Matcha, tea, chai, and hot chocolate",
      "Seasonal drink collections",
      "Custom branded cups, signage, and menu displays",
    ],
    capacity: 500,
    simultaneousSetups: 3,
  },
  {
    slug: "sweet-cart",
    number: "02",
    name: "Luxe Sweet Cart",
    label: "Sweet Cart",
    landingPath: "/experiences/sweet-cart",
    summary: "Mini pancakes, waffles, and donuts prepared and finished on-site.",
    serviceDescription: "A live, made-to-order dessert experience within the Luxe Event Co. event platform.",
    accent: "sweet",
    inclusions: [],
    customization: [],
    eventApplications: [],
    faqs: [],
    searchTarget: {
      primary: "Toronto dessert cart for events",
      secondary: ["wedding dessert cart Toronto", "corporate dessert catering Toronto"],
    },
    gallery: [],
    inquiryCta: "Ask about Luxe Sweet Cart",
    complementarySlugs: ["coffee-bar", "seating-rentals"],
    instagram: socialProfiles.sweetCart,
    offerings: [
      "Mini Dutch pancakes",
      "Belgian waffles on a stick",
      "Mini donuts",
      "Soft serve ice cream add-on",
      "Premium sauces and toppings",
      "Custom signage, styling, and combination experiences",
    ],
    capacity: 400,
    simultaneousSetups: 3,
  },
  {
    slug: "seating-rentals",
    number: "03",
    name: "Luxe Seating Rentals",
    label: "Seating Rentals",
    landingPath: "/experiences/seating-rentals",
    summary: "Considered seating and structure for rooms made to gather.",
    serviceDescription: "A considered seating rental experience within the Luxe Event Co. event platform.",
    accent: "seating",
    inclusions: [],
    customization: [],
    eventApplications: [],
    faqs: [],
    searchTarget: {
      primary: "Toronto event seating rentals",
      secondary: ["wedding seating rentals Toronto", "corporate event furniture rentals Toronto"],
    },
    gallery: [],
    inquiryCta: "Ask about Luxe Seating Rentals",
    complementarySlugs: ["coffee-bar", "sweet-cart"],
    instagram: socialProfiles.seatingRentals,
    offerings: [
      "Chairs",
      "Tables",
      "Cocktail tables",
      "Tents",
      "Linens",
      "Lighting",
      "Combined rental experiences with coffee and dessert",
    ],
    capacity: 0,
    simultaneousSetups: 3,
  },
];

export const eventTypes = [
  { slug: "weddings", name: "Weddings", summary: "Coffee, dessert, and setting for the moments that become part of the story.", audienceSegments: ["wedding-clients"] },
  { slug: "corporate-events", name: "Corporate Events", summary: "Polished hospitality and considered spaces for teams, clients, and partners.", audienceSegments: ["corporate-clients", "brand-activation-clients"] },
  { slug: "brand-activations", name: "Brand Activations", summary: "Tactile service and atmosphere that make a brand experience tangible.", audienceSegments: ["brand-activation-clients", "corporate-clients"] },
  { slug: "baby-showers", name: "Baby Showers", summary: "Soft details and thoughtful hospitality for a beautiful beginning.", audienceSegments: ["premium-private-event-clients"] },
  { slug: "bridal-showers", name: "Bridal Showers", summary: "A little indulgence before the next chapter.", audienceSegments: ["wedding-clients", "premium-private-event-clients"] },
  { slug: "birthdays", name: "Birthdays", summary: "Personal, generous details for milestones worth celebrating.", audienceSegments: ["premium-private-event-clients"] },
  { slug: "private-events", name: "Private Events", summary: "A complete feeling for gatherings with their own atmosphere.", audienceSegments: ["premium-private-event-clients"] },
] as const;

export const primaryRoutes = [
  "/",
  "/experiences",
  ...experiences.map(({ slug }) => `/experiences/${slug}`),
  "/events",
  ...eventTypes.map(({ slug }) => `/events/${slug}`),
  "/gallery",
  "/faq",
  "/inquire",
] as const;

export type ExperienceSlug = (typeof experiences)[number]["slug"];
export type EventSlug = (typeof eventTypes)[number]["slug"];

export function getExperience(slug: string) {
  return experiences.find((experience) => experience.slug === slug);
}

export function getEventType(slug: string) {
  return eventTypes.find((event) => event.slug === slug);
}
