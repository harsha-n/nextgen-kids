import type { MetadataRoute } from "next";
import { getSchoolConfig } from "@/lib/runtime-config";
import { absoluteUrl } from "@/lib/seo";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSchoolConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml", config),
    host: config.schoolInfo.domain
  };
}
