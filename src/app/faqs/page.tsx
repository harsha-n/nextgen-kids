import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata, getFaqJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("faqs", config);
}

export default async function FAQsPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(config)) }}
      />
      <PageHeader content={config.pageContent.faqs} />
      <FAQSection faqs={config.faqs} />
      <AdmissionCTA cta={config.ctas.contact} />
    </>
  );
}
