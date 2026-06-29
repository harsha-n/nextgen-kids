"use client";

import { usePathname } from "next/navigation";
import type { SchoolConfig } from "@/data/school.config";
import { getJsonLd, getBreadcrumbJsonLd } from "@/lib/seo";

export function SEOJsonLd({ config }: { config: SchoolConfig }) {
  const pathname = usePathname();

  const pageKeyMap: Record<string, string> = {
    "/": "home",
    "/about": "about",
    "/programs": "programs",
    "/admissions": "admissions",
    "/daycare": "daycare",
    "/activities": "activities",
    "/gallery": "gallery",
    "/contact": "contact",
    "/fees": "fees",
    "/faqs": "faqs"
  };

  const pageKey = pageKeyMap[pathname || "/"] || "home";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(config)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbJsonLd(pageKey, config)) }}
      />
    </>
  );
}
