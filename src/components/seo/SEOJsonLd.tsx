import { getJsonLd } from "@/lib/seo";

export function SEOJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd()) }}
    />
  );
}
