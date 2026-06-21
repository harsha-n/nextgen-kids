import type { SchoolConfig } from "@/data/school.config";
import { getJsonLd } from "@/lib/seo";

export function SEOJsonLd({ config }: { config: SchoolConfig }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(config)) }}
    />
  );
}
