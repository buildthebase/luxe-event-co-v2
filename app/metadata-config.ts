import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import { getRouteSocialCard } from "./social-card-config";

const defaultSocialImageAsset = siteConfig.brandAssets.defaultSocialImage;

type PageMetadataDefinition = {
  title: string;
  description: string;
};

export const pageMetadata = {
  "/": {
    title: "Luxe Event Co. | Mobile Coffee Bar, Live Desserts & Event Rentals Toronto",
    description:
      "Luxe Event Co. provides mobile coffee bars, live dessert experiences, and wedding & event seating rentals across Toronto and the GTA. Elevate your wedding, corporate event, or brand activation.",
  },
  "/experiences": {
    title: "Coffee, Dessert & Event Rentals Toronto | Luxe Event Co.",
    description:
      "Compare mobile coffee bars, live dessert carts, seating and event rentals for weddings, corporate events and celebrations across Toronto and the GTA.",
  },
  "/experiences/coffee-bar": {
    title: "Mobile Coffee Bar in Toronto | Luxe Coffee Bar",
    description:
      "Bring a complete mobile caf\u00e9 to Toronto and GTA events with baristas, handcrafted coffee and matcha, two service formats, and tailored presentation.",
  },
  "/experiences/sweet-cart": {
    title: "Dessert Cart Experiences in Toronto | Luxe Sweet Cart",
    description:
      "Create a live dessert moment at Toronto and GTA events with mini pancakes, waffles, donuts, toppings, and a cart styled around the occasion.",
  },
  "/experiences/seating-rentals": {
    title: "Event & Seating Rentals in Toronto | Luxe Seating Rentals",
    description:
      "Explore chairs, tables, tents, linens, and lighting for Toronto and GTA events, with clear guidance on layouts, quote requirements, delivery, and setup.",
  },
  "/events": {
    title: "Event Experiences by Occasion | Luxe Event Co.",
    description:
      "Start with the occasion, then find the right mix of Luxe coffee, live dessert, and rentals for weddings, business events, showers, and private celebrations.",
  },
  "/events/weddings": {
    title: "Wedding Coffee, Dessert & Rentals | Luxe Event Co.",
    description:
      "See where coffee, live dessert, and refined rentals can support a Toronto or GTA wedding, from cocktail hour through the late-night celebration.",
  },
  "/events/corporate-events": {
    title: "Corporate Coffee & Event Experiences | Luxe Event Co.",
    description:
      "Plan scalable coffee, matcha, dessert, and rental support for Toronto and GTA office events, conferences, employee appreciation, and client hospitality.",
  },
  "/events/brand-activations": {
    title: "Branded Coffee Carts & Activations | Luxe Event Co.",
    description:
      "Turn coffee, matcha, dessert, cups, signage, and cart styling into a cohesive branded activation for launches and campaigns in Toronto and the GTA.",
  },
  "/events/baby-showers": {
    title: "Baby Shower Coffee, Dessert & Rentals | Luxe Event Co.",
    description:
      "Shape a Toronto or GTA baby shower with coffee, matcha, live dessert, signage, and refined rentals, with indoor and outdoor planning guidance.",
  },
  "/events/bridal-showers": {
    title: "Bridal Shower Coffee, Dessert & Rentals | Luxe Event Co.",
    description:
      "Create a polished Toronto or GTA bridal shower with caf\u00e9-style drinks, live dessert, signage, florals, and rentals planned as one cohesive setting.",
  },
  "/events/birthdays": {
    title: "Birthday Dessert & Coffee Experiences | Luxe Event Co.",
    description:
      "Plan a Toronto or GTA birthday with coffee, matcha, live dessert, seating, and event rentals for milestone, adult, family, or selected children’s celebrations.",
  },
  "/events/private-events": {
    title: "Private Event Coffee, Dessert & Rentals | Luxe Event Co.",
    description:
      "Explore coffee, live dessert, signage, and rentals for Toronto and GTA engagements, anniversaries, graduations, holidays, and other private events.",
  },
  "/gallery": {
    title: "Event Experience Gallery | Luxe Event Co.",
    description:
      "Explore Luxe Event Co. coffee, dessert, and rental experience directions for weddings, activations, celebrations, and different guest moments.",
  },
  "/faq": {
    title: "Event Planning & Booking FAQs | Luxe Event Co.",
    description:
      "Get clear answers about Luxe Event Co. pricing factors, booking terms, travel, setup, venue requirements, and cross-service customization before you inquire.",
  },
  "/inquire": {
    title: "Plan Your Event Experience | Luxe Event Co.",
    description:
      "Prepare a Luxe Event Co. inquiry with your date, venue, guest count, service needs, and event context before continuing to the booking platform.",
  },
} as const satisfies Record<string, PageMetadataDefinition>;

export type PagePath = keyof typeof pageMetadata;

export function createPageMetadata(path: PagePath): Metadata {
  const definition = pageMetadata[path];
  const socialCard = getRouteSocialCard(path, defaultSocialImageAsset);
  const socialImage = {
    url: socialCard.src,
    width: socialCard.width,
    height: socialCard.height,
    alt: socialCard.alt,
  };

  return {
    title: definition.title,
    description: definition.description,
    alternates: { canonical: path },
    openGraph: {
      title: definition.title,
      description: definition.description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.openGraphLocale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: definition.title,
      description: definition.description,
      images: [socialCard.src],
    },
  };
}
