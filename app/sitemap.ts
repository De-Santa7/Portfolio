import type { MetadataRoute } from "next";
import { projects, site } from "@/data/portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...projects
      .filter((p) => p.caseStudy)
      .map((p) => ({ url: `${site.url}/work/${p.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
