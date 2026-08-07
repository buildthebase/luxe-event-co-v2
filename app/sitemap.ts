import type { MetadataRoute } from "next";
import { getPublishedBlogArticles } from "./blog/content";
import { primaryRoutes, siteConfig } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...primaryRoutes.map((path, index) => ({
      url: `${siteConfig.url}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : index < 2 ? 0.9 : 0.7,
    })),
    ...getPublishedBlogArticles().map((article) => ({
      url: `${siteConfig.url}/blog/${article.slug}`,
      lastModified: article.modifiedDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
