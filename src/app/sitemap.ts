import type { MetadataRoute } from "next";
import { schoolConfig } from "@/data/school.config";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(schoolConfig.seo.pages).map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8
  }));
}
