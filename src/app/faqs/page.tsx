import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { FAQSection } from "@/components/sections/FAQSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("faqs");

export default function FAQsPage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.faqs} />
      <FAQSection faqs={schoolConfig.faqs} />
      <AdmissionCTA cta={schoolConfig.ctas.contact} />
    </>
  );
}
