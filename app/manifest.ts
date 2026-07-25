import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#efebe3",
    theme_color: "#efebe3",
    icons: [
      {
        src: siteConfig.brandAssets.favicon.src,
        sizes: `${siteConfig.brandAssets.favicon.width}x${siteConfig.brandAssets.favicon.height}`,
        type: "image/png",
      },
    ],
  };
}
