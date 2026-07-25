export type ImageAssetStatus =
  | "approved"
  | "reserved"
  | "permission-required";

export type ResponsiveImageAsset = {
  id: string;
  src?: string | null;
  alt: string;
  caption?: string;
  width: number;
  height: number;
  sizes: string;
  priority?: boolean;
  unoptimized?: boolean;
  status: ImageAssetStatus;
  format: "png" | "jpeg" | "webp" | "avif";
};

export const imageAssets = {
  brand: {
    favicon: {
      id: "luxe-event-co-browser-icon",
      src: "/icon.png",
      alt: "Luxe Event Co.",
      width: 1254,
      height: 1254,
      sizes: "64px",
      priority: true,
      status: "approved",
      format: "png",
    },
    organizationLogo: {
      id: "luxe-event-co-search-identity",
      src: "/google-thumbnail.png",
      alt: "Luxe Event Co. logo",
      width: 1200,
      height: 1200,
      sizes: "1200px",
      priority: true,
      status: "approved",
      format: "png",
    },
    googleThumbnail: {
      id: "luxe-event-co-google-thumbnail",
      src: "/google-thumbnail.png",
      alt: "Luxe Event Co. - Coffee, Desserts and Seating",
      width: 1200,
      height: 1200,
      sizes: "1200px",
      priority: true,
      status: "approved",
      format: "png",
    },
    defaultSocialImage: {
      id: "luxe-event-co-social-share",
      src: "/og.png",
      alt: "Luxe Event Co. coffee, dessert, and seating experiences",
      width: 1731,
      height: 908,
      sizes: "1731px",
      priority: true,
      status: "approved",
      format: "png",
    },
  },
  credibilityLogos: {
    optrust: {
      id: "organization-logo-optrust",
      src: "/images/logo-optrust.png",
      alt: "",
      width: 315,
      height: 95,
      sizes: "(max-width: 700px) 42vw, 220px",
      unoptimized: true,
      status: "approved",
      format: "png",
    },
    cstSavings: {
      id: "organization-logo-cst-savings",
      src: "/images/logo-cst-savings.png",
      alt: "",
      width: 269,
      height: 102,
      sizes: "(max-width: 700px) 42vw, 220px",
      unoptimized: true,
      status: "approved",
      format: "png",
    },
    convergint: {
      id: "organization-logo-convergint",
      src: "/images/logo-convergint.png",
      alt: "",
      width: 319,
      height: 64,
      sizes: "(max-width: 700px) 42vw, 220px",
      unoptimized: true,
      status: "approved",
      format: "png",
    },
    icnaCanada: {
      id: "organization-logo-icna-canada",
      src: "/images/logo-icna-canada.png",
      alt: "",
      width: 240,
      height: 84,
      sizes: "(max-width: 700px) 42vw, 220px",
      unoptimized: true,
      status: "approved",
      format: "png",
    },
    wasteConnectionsCanada: {
      id: "organization-logo-waste-connections-canada",
      src: "/images/logo-waste-connections-canada.png",
      alt: "",
      width: 379,
      height: 106,
      sizes: "(max-width: 700px) 78vw, 260px",
      unoptimized: true,
      status: "approved",
      format: "png",
    },
  },
} as const satisfies {
  brand: Record<string, ResponsiveImageAsset>;
  credibilityLogos: Record<string, ResponsiveImageAsset>;
};

export const imageSystemRequirements = {
  sourcePreservation:
    "Retain the untouched high-resolution original outside the public delivery directory. Never overwrite the master when producing web derivatives.",
  deliveryFormats:
    "Use AVIF or WebP for photographic derivatives where visual review confirms acceptable quality. Preserve PNG for transparency, approved logos, and current social/search assets.",
  responsiveOutput:
    "Create only the widths a layout can use, normally 480, 768, 1200, 1600, and 2400 pixels, without upscaling beyond the approved source.",
  dimensions:
    "Every publishable image record requires intrinsic width and height. Fill layouts must also provide a stable parent aspect ratio or minimum block size.",
  loading:
    "The primary above-the-fold image uses eager loading and high fetch priority. Below-the-fold images use native lazy loading and become available on viewport approach without click or swipe.",
  urls:
    "Public filenames use lowercase descriptive words separated by hyphens. Once indexed or published, a URL remains stable unless a redirect and metadata migration are planned.",
  accessibility:
    "Meaningful images require factual alt text stored with the asset. Decorative images use an empty alt attribute and must not carry unique information.",
  context:
    "Meaningful images remain adjacent to relevant text. Captions identify the real service or event context only when that context is confirmed and approved.",
  fileWeight:
    "Do not publish untouched camera originals. Produce visually reviewed derivatives appropriate to the rendered dimensions and avoid files materially larger than the layout can display.",
  discovery:
    "Social-share and structured-data images use public crawlable URLs. Placeholder art is never emitted as ImageObject proof.",
  embeddedText:
    "Important service, location, and inquiry information must remain available as visible HTML text rather than existing only inside an image.",
  orientation:
    "Confirm source orientation metadata and visually verify every derivative before changing an asset record to approved.",
  originalPhotography:
    "Use only high-quality, permission-cleared original Luxe photography as service or event proof. Reserved records must not render until the selected file and its factual alt text are approved together.",
} as const;

export const imageSitemapPolicy = {
  required: false,
  rationale:
    "The current site is small, and every approved indexable image is directly crawlable from HTML or declared in page metadata and structured data. Reassess when the approved event gallery contains images that ordinary page crawling may not reliably discover.",
} as const;

export const imageIngestChecklist = [
  "Confirm ownership and written publication permission.",
  "Record the division, event type, location, and accurate event context.",
  "Preserve the original file and record its source filename.",
  "Choose a stable descriptive public filename before publication.",
  "Record intrinsic dimensions and do not upscale.",
  "Prepare responsive AVIF/WebP derivatives for photography where appropriate.",
  "Write factual alt text and an optional contextual caption.",
  "Mark one page image as primary only when it is genuinely above the fold.",
  "Verify crop behavior on mobile, tablet, desktop, and high-density displays.",
  "Add structured-data image references only after the public URL is approved.",
] as const;

export function isPublishableImage(
  asset: ResponsiveImageAsset,
): asset is ResponsiveImageAsset & { src: string; status: "approved" } {
  return asset.status === "approved" && Boolean(asset.src);
}
