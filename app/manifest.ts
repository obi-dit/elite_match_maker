import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elite International Match Maker",
    short_name: "Elite Match Maker",
    description: "Premium dating and matchmaking services",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#8B5CF6",
    orientation: "portrait",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["dating", "lifestyle", "social"],
    lang: "en",
    scope: "/",
  };
}
