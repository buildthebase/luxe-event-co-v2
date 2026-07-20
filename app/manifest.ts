import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Luxe Event Co.",
    short_name: "Luxe Event Co.",
    description:
      "Crafted coffee, elevated desserts, and elegant seating for memorable events in Toronto.",
    start_url: "/",
    display: "standalone",
    background_color: "#efebe3",
    theme_color: "#efebe3",
    icons: [
      {
        src: "/icon.png",
        sizes: "1254x1254",
        type: "image/png",
      },
    ],
  };
}
