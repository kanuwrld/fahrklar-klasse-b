import type { MetadataRoute } from "next";

const siteUrl = "https://fahrklar-klasse-b.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
