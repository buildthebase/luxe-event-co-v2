import {
  imageAssets,
  type ResponsiveImageAsset,
} from "../image-system";

export type BlogArticleStatus = "draft" | "published";

export type BlogArticleAuthor = {
  name: string;
  type: "Organization" | "Person";
  url?: string;
};

export type BlogArticleText = {
  text: string;
  href?: string;
  emphasis?: "strong" | "emphasis";
};

export type BlogArticleContentBlock =
  | {
      type: "paragraph";
      content: readonly BlogArticleText[];
    }
  | {
      type: "heading";
      id: string;
      level: 2 | 3;
      text: string;
    }
  | {
      type: "list";
      style: "ordered" | "unordered";
      items: readonly (readonly BlogArticleText[])[];
    }
  | {
      type: "quote";
      quote: string;
      attribution?: string;
    }
  | {
      type: "image";
      image: ResponsiveImageAsset;
      alt: string;
      caption?: string;
    }
  | {
      type: "callout";
      title?: string;
      content: readonly BlogArticleText[];
    }
  | {
      type: "table";
      caption?: string;
      headers: readonly string[];
      rows: readonly (readonly string[])[];
    };

export type BlogArticle = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  category: string;
  publishDate: string;
  modifiedDate: string;
  author: BlogArticleAuthor;
  heroImage: ResponsiveImageAsset | null;
  heroAlt: string;
  content: readonly BlogArticleContentBlock[];
  relatedArticleSlugs: readonly string[];
  status: BlogArticleStatus;
};

const luxeJournalAuthor = {
  name: "Luxe Event Co.",
  type: "Organization",
  url: "https://luxeeventco.ca",
} as const satisfies BlogArticleAuthor;

const paragraph = (text: string): BlogArticleContentBlock => ({
  type: "paragraph",
  content: [{ text }],
});

const heading = (id: string, text: string): BlogArticleContentBlock => ({
  type: "heading",
  id,
  level: 2,
  text,
});

const articleImage = (image: ResponsiveImageAsset): ResponsiveImageAsset => ({
  ...image,
  sizes: "(max-width: 700px) 100vw, 100vw",
});

// Articles remain local and typed until the project has a demonstrated need for a CMS.
// Draft and future-dated records stay out of public routes, metadata, schema, and sitemaps.
const blogArticlePreviews = [
  {
    slug: "what-to-share-before-requesting-an-event-proposal",
    title: "What to share before requesting an event proposal",
    seoTitle: "What to Share Before Requesting an Event Proposal",
    description:
      "A practical guide to the event details that help Luxe Event Co. shape coffee, dessert, and rental recommendations across Toronto and the GTA.",
    excerpt:
      "A clear brief helps align the guest count, venue, timing, service mix, and operating details before a tailored proposal takes shape.",
    category: "Event Planning",
    publishDate: "2026-08-04T09:00:00-04:00",
    modifiedDate: "2026-08-04T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.coffeeBar),
    heroAlt: imageAssets.experiences.coffeeBar.alt,
    content: [
      paragraph(
        "A useful event brief does not need to be elaborate. It simply needs to establish the practical conditions that shape service: where the gathering is happening, how many guests are expected, when key moments occur, and which Luxe experiences are being considered.",
      ),
      heading("begin-with-the-event", "Begin with the event itself"),
      paragraph(
        "Share the occasion, event date, venue location, estimated guest count, and the broad schedule. These details help establish whether coffee, live dessert, seating rentals, or a coordinated combination best supports the way guests will arrive, gather, and move through the space.",
      ),
      heading("describe-the-setting", "Describe the setting and access"),
      paragraph(
        "Indoor or outdoor placement, available floor space, electrical access, loading windows, and venue rules all influence the service footprint. Early visibility into these conditions allows the proposal to reflect the actual room rather than an abstract package.",
      ),
      heading("share-the-priorities", "Share the priorities, then refine"),
      paragraph(
        "Let us know which experiences matter most and whether there are menu, signage, presentation, or timing considerations already in mind. The remaining details can be refined together as the event plan develops.",
      ),
    ],
    relatedArticleSlugs: [
      "how-to-plan-mobile-coffee-catering",
      "event-rentals-and-guest-flow",
    ],
    status: "published",
  },
  {
    slug: "how-to-plan-mobile-coffee-catering",
    title: "How to plan mobile coffee catering for an event",
    seoTitle: "How to Plan Mobile Coffee Catering for an Event",
    description:
      "Plan mobile coffee catering around guest count, timing, menu choices, venue access, and event flow in Toronto and the GTA.",
    excerpt:
      "The strongest coffee service plans connect the beverage menu, station footprint, staffing, and service timing to the rhythm of the gathering.",
    category: "Coffee Catering",
    publishDate: "2026-07-31T09:00:00-04:00",
    modifiedDate: "2026-07-31T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.coffeeBar),
    heroAlt: imageAssets.experiences.coffeeBar.alt,
    content: [
      paragraph(
        "Mobile coffee catering works best when it is planned as part of the event flow. The menu matters, but so do placement, access, timing, and the way guests are expected to move around the station.",
      ),
      heading("choose-the-service-moment", "Choose the service moment"),
      paragraph(
        "A coffee bar can welcome guests, support a conference break, accompany dessert, or extend hospitality later in the celebration. Defining that moment helps determine the pace of service and the menu that will feel most natural.",
      ),
      heading("match-menu-and-guest-count", "Match the menu to the guest count"),
      paragraph(
        "Espresso drinks, ceremonial matcha, teas, hot chocolate, dairy alternatives, and seasonal beverages can be considered together. A focused menu can keep service clear while still offering guests a thoughtful range of choices.",
      ),
      heading("confirm-the-footprint", "Confirm the operating footprint"),
      paragraph(
        "Venue access, electrical requirements, available floor space, loading timing, and nearby guest circulation should be confirmed before service day. The goal is a station that feels integrated into the event rather than added at the last minute.",
      ),
    ],
    relatedArticleSlugs: [
      "what-to-share-before-requesting-an-event-proposal",
      "coffee-and-dessert-in-a-wedding-timeline",
    ],
    status: "published",
  },
  {
    slug: "planning-a-live-dessert-experience",
    title: "What to consider when planning a live dessert experience",
    seoTitle: "Planning a Live Dessert Catering Experience",
    description:
      "Plan a live dessert cart around menu, timing, guest interaction, venue placement, and service flow for events in Toronto and the GTA.",
    excerpt:
      "Live dessert becomes part of the occasion when preparation, presentation, and guest interaction are considered as one experience.",
    category: "Dessert Catering",
    publishDate: "2026-07-27T09:00:00-04:00",
    modifiedDate: "2026-07-27T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.sweetCart),
    heroAlt: imageAssets.experiences.sweetCart.alt,
    content: [
      paragraph(
        "A live dessert station is both a service point and a visual moment. Guests see items prepared on site, choose toppings or finishes, and gather around the experience as it unfolds.",
      ),
      heading("plan-the-menu", "Plan a menu that suits the occasion"),
      paragraph(
        "Warm mini Dutch pancakes, Belgian waffle pops, and mini donuts each create a different rhythm. Menu selection should reflect the occasion, service window, expected guest count, and the other food or beverage moments already planned.",
      ),
      heading("give-the-cart-room", "Give the cart room to work"),
      paragraph(
        "The station needs enough space for preparation, service, and a natural guest queue without interrupting entrances, dining areas, or important sightlines. The right placement makes the cart feel like an intentional focal point.",
      ),
      heading("connect-presentation", "Connect presentation to the event"),
      paragraph(
        "Menu displays, cart details, toppings, and selected visual elements can be discussed around the gathering. Consistency across these details helps the dessert experience feel connected to the wider event plan.",
      ),
    ],
    relatedArticleSlugs: [
      "coffee-and-dessert-in-a-wedding-timeline",
      "thoughtfully-hosted-private-events",
    ],
    status: "published",
  },
  {
    slug: "event-rentals-and-guest-flow",
    title: "How event rentals can support guest flow",
    seoTitle: "How Event Rentals Can Support Guest Flow",
    description:
      "Use lounge seating, cocktail tables, dining layouts, linens, tents, and lighting to support guest comfort and movement at an event.",
    excerpt:
      "Seating and room details work best when they are planned around how people will arrive, gather, converse, and move through the venue.",
    category: "Event Rentals",
    publishDate: "2026-07-23T09:00:00-04:00",
    modifiedDate: "2026-07-23T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.seatingRentals),
    heroAlt: imageAssets.experiences.seatingRentals.alt,
    content: [
      paragraph(
        "Event rentals do more than fill a room. The placement of lounge seating, high-top cocktail tables, dining setups, linens, tents, and ambient lighting can give guests a clear sense of where to settle and how to move through the occasion.",
      ),
      heading("start-with-movement", "Start with movement through the space"),
      paragraph(
        "Consider entrances, service stations, photo areas, dining zones, and transitions between event moments. Furniture should support those paths while creating comfortable places for guests to pause and connect.",
      ),
      heading("design-for-the-setting", "Design for the setting"),
      paragraph(
        "Indoor and outdoor spaces bring different constraints. Doorway clearances, floor conditions, weather planning, available power, and venue rules can all affect the practical layout.",
      ),
      heading("coordinate-logistics", "Coordinate delivery and setup logistics"),
      paragraph(
        "Inventory, delivery access, load-in timing, setup, and teardown should be aligned with the venue schedule. Addressing these details early protects the design intent and helps service day proceed smoothly.",
      ),
    ],
    relatedArticleSlugs: [
      "what-to-share-before-requesting-an-event-proposal",
      "thoughtfully-hosted-private-events",
    ],
    status: "published",
  },
  {
    slug: "coffee-and-dessert-in-a-wedding-timeline",
    title: "Where coffee and live dessert fit into a wedding timeline",
    seoTitle: "Coffee and Live Dessert in a Wedding Timeline",
    description:
      "Ideas for placing mobile coffee and live dessert within a wedding timeline, from guest arrival through the evening celebration.",
    excerpt:
      "Coffee and live dessert can support distinct wedding moments when each service is coordinated with the venue, schedule, and guest experience.",
    category: "Weddings",
    publishDate: "2026-07-18T09:00:00-04:00",
    modifiedDate: "2026-07-18T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.seatingRentals),
    heroAlt: imageAssets.experiences.seatingRentals.alt,
    content: [
      paragraph(
        "A wedding timeline creates several natural opportunities for hospitality. Mobile coffee and live dessert can welcome guests, bridge transitions, accompany evening service, or create an interactive moment of their own.",
      ),
      heading("welcome-and-transition", "Use service to welcome and transition"),
      paragraph(
        "A coffee or matcha service can support arrivals and conversation before the next formal moment begins. The station placement and opening time should align with guest access and the wider venue schedule.",
      ),
      heading("create-a-dessert-moment", "Create an interactive dessert moment"),
      paragraph(
        "A live dessert cart can become a focal point after dinner or later in the reception. Allowing sufficient time and space for preparation and guest interaction helps the experience feel relaxed rather than rushed.",
      ),
      heading("coordinate-the-whole-plan", "Coordinate the whole service plan"),
      paragraph(
        "Couples, planners, venues, and vendor teams should share timing, access, electrical requirements, and floor plans. Coordinating these details keeps each service connected to the wedding rather than competing with it.",
      ),
    ],
    relatedArticleSlugs: [
      "how-to-plan-mobile-coffee-catering",
      "planning-a-live-dessert-experience",
    ],
    status: "published",
  },
  {
    slug: "corporate-event-hospitality-planning",
    title: "Planning hospitality for corporate events and conferences",
    seoTitle: "Corporate Event and Conference Hospitality Planning",
    description:
      "Plan coffee, dessert, and event rentals for corporate events, conferences, multi-day programs, and recurring workplace hospitality.",
    excerpt:
      "Corporate hospitality becomes more effective when service timing, capacity, venue operations, and the purpose of each event moment are planned together.",
    category: "Corporate Events",
    publishDate: "2026-07-14T09:00:00-04:00",
    modifiedDate: "2026-07-14T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.coffeeBar),
    heroAlt: imageAssets.experiences.coffeeBar.alt,
    content: [
      paragraph(
        "Corporate events often need hospitality to work within a precise schedule. Conferences, brand meetings, office gatherings, and multi-day programs each benefit from a service plan tied to expected attendance and operational realities.",
      ),
      heading("map-the-peak-moments", "Map the peak service moments"),
      paragraph(
        "Arrival windows, scheduled breaks, program transitions, and closing receptions can concentrate demand. Identifying these periods helps shape station quantity, placement, staffing, and menu focus.",
      ),
      heading("plan-for-scale", "Plan for scale and repetition"),
      paragraph(
        "Larger venues or multi-day programs may need coordinated stations, daily restocking, storage planning, and consistent staffing. Recurring workplace events benefit from a repeatable operating plan that can still adapt to each date.",
      ),
      heading("align-with-the-venue", "Align with the venue and production team"),
      paragraph(
        "Loading access, electrical draw, floor footprint, setup windows, and event production schedules should be confirmed with the venue. Clear coordination protects both guest flow and the wider program timeline.",
      ),
    ],
    relatedArticleSlugs: [
      "what-to-share-before-requesting-an-event-proposal",
      "branded-hospitality-for-brand-activations",
    ],
    status: "published",
  },
  {
    slug: "branded-hospitality-for-brand-activations",
    title: "How branded hospitality supports an event activation",
    seoTitle: "How Branded Hospitality Supports Event Activations",
    description:
      "Explore how coffee, matcha, live dessert, custom cups, signage, and presentation can support a brand activation or campaign event.",
    excerpt:
      "A hospitality touchpoint can encourage conversation and guest participation while carrying the campaign through menus, cups, signage, and presentation.",
    category: "Brand Activations",
    publishDate: "2026-07-10T09:00:00-04:00",
    modifiedDate: "2026-07-10T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.coffeeBar),
    heroAlt: imageAssets.experiences.coffeeBar.alt,
    content: [
      paragraph(
        "Branded hospitality gives guests something to experience, not simply observe. A drink or live dessert station can become a useful point of interaction within a launch, campaign environment, client event, or public activation.",
      ),
      heading("choose-the-guest-action", "Choose the guest action first"),
      paragraph(
        "Consider what the activation should invite guests to do: arrive and settle, start a conversation, spend time in a campaign space, or share a visual moment. The service format should support that action.",
      ),
      heading("carry-the-visual-system", "Carry the visual system with restraint"),
      paragraph(
        "Custom cups, menu displays, cart signage, beverage colours, and selected presentation details can reflect the campaign. A focused set of brand cues often feels more considered than applying every visual element everywhere.",
      ),
      heading("build-for-the-environment", "Build for the activation environment"),
      paragraph(
        "Guest count, dwell time, queue placement, service speed, venue access, and production schedules determine how the experience operates. Creative presentation and practical planning need to be developed together.",
      ),
    ],
    relatedArticleSlugs: [
      "corporate-event-hospitality-planning",
      "how-to-plan-mobile-coffee-catering",
    ],
    status: "published",
  },
  {
    slug: "thoughtfully-hosted-private-events",
    title: "How to make a private celebration feel thoughtfully hosted",
    seoTitle: "How to Thoughtfully Host a Private Event",
    description:
      "Practical hospitality ideas for engagements, graduations, holidays, birthdays, milestones, and other private events.",
    excerpt:
      "A private celebration feels considered when its welcome, menu, shared moments, seating, and service rhythm all support the occasion.",
    category: "Private Events",
    publishDate: "2026-07-07T09:00:00-04:00",
    modifiedDate: "2026-07-07T09:00:00-04:00",
    author: luxeJournalAuthor,
    heroImage: articleImage(imageAssets.experiences.seatingRentals),
    heroAlt: imageAssets.experiences.seatingRentals.alt,
    content: [
      paragraph(
        "Engagements, graduations, holidays, birthdays, and milestones may differ in tone, but thoughtful private events share a clear sense of welcome. The services, room layout, and schedule should all help guests understand how to enjoy the gathering.",
      ),
      heading("shape-the-welcome", "Shape the welcome"),
      paragraph(
        "A coffee, matcha, or seasonal beverage service can give arrivals a natural focus. It offers guests something to gather around while setting the pace and character of the celebration.",
      ),
      heading("create-one-focal-moment", "Create one focal moment"),
      paragraph(
        "Live dessert can add interaction without requiring an elaborate program. When timing and placement are clear, the station becomes a shared moment that works across different ages and event styles.",
      ),
      heading("make-room-for-connection", "Make room for connection"),
      paragraph(
        "Seating, tables, linens, and ambient details should support conversation and the important moments of the occasion. A strong layout makes the event feel generous while keeping guest movement comfortable.",
      ),
    ],
    relatedArticleSlugs: [
      "planning-a-live-dessert-experience",
      "event-rentals-and-guest-flow",
    ],
    status: "published",
  },
] satisfies readonly BlogArticle[];

const placeholderArticleContent: readonly BlogArticleContentBlock[] = [
  paragraph(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  ),
  heading("lorem-ipsum", "Lorem ipsum dolor sit amet"),
  paragraph(
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.",
  ),
  heading("consectetur-adipiscing", "Consectetur adipiscing elit"),
  paragraph(
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus.",
  ),
  heading("sed-do-eiusmod", "Sed do eiusmod tempor incididunt"),
  paragraph(
    "Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.",
  ),
];

export const blogArticles: readonly BlogArticle[] = blogArticlePreviews.map(
  (article) => ({
    ...article,
    content: placeholderArticleContent,
    heroImage: null,
    heroAlt: "",
  }),
);

const cleanBlogSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function assertUniqueBlogMetadata(articles: readonly BlogArticle[]) {
  const fields = ["slug", "seoTitle", "description"] as const;

  fields.forEach((field) => {
    const seen = new Map<string, string>();

    articles.forEach((article) => {
      const value = article[field].trim().toLocaleLowerCase("en-CA");
      const existingSlug = seen.get(value);

      if (existingSlug) {
        throw new Error(
          `Blog articles “${existingSlug}” and “${article.slug}” share the same ${field}.`,
        );
      }

      seen.set(value, article.slug);
    });
  });
}

assertUniqueBlogMetadata(blogArticles);

export function isPublicBlogArticle(
  article: BlogArticle,
  now = new Date(),
): boolean {
  const publishTime = Date.parse(article.publishDate);

  return (
    article.status === "published" &&
    cleanBlogSlugPattern.test(article.slug) &&
    Number.isFinite(publishTime) &&
    publishTime <= now.getTime()
  );
}

export function getPublishedBlogArticles(now = new Date()) {
  return blogArticles
    .filter((article) => isPublicBlogArticle(article, now))
    .sort(
      (left, right) =>
        Date.parse(right.publishDate) - Date.parse(left.publishDate),
    );
}

export function getPublishedBlogArticle(slug: string, now = new Date()) {
  return getPublishedBlogArticles(now).find((article) => article.slug === slug);
}

export function getRelatedPublishedBlogArticles(article: BlogArticle) {
  const publishedBySlug = new Map(
    getPublishedBlogArticles().map((candidate) => [candidate.slug, candidate]),
  );

  return article.relatedArticleSlugs.flatMap((slug) => {
    const related = publishedBySlug.get(slug);
    return related ? [related] : [];
  });
}
