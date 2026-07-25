import type { MetadataRoute } from "next";
import { primaryRoutes, siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return primaryRoutes.map((path, index) => ({
    url: `${siteConfig.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : index < 2 ? 0.9 : 0.7,
  }));
}
