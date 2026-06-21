import type { MetadataRoute } from "next";
import { schoolConfig } from "@/data/school.config";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: schoolConfig.schoolInfo.domain
  };
}
