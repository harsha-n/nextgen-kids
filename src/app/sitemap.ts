import type { MetadataRoute } from "next";
import { getSchoolConfig } from "@/lib/runtime-config";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await getSchoolConfig();

  return Object.values(config.seo.pages).map((page) => ({
    url: absoluteUrl(page.path, config),
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : 0.8
  }));
}
