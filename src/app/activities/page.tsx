import type { Metadata } from "next";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("activities");

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.activities} />
      <ActivitiesSection activities={schoolConfig.activities} />
      <GalleryGrid
        gallery={{
          eyebrow: schoolConfig.gallery.eyebrow,
          title: schoolConfig.gallery.previewTitle,
          description: schoolConfig.gallery.previewDescription
        }}
        items={schoolConfig.gallery.items.slice(0, 6)}
      />
      <AdmissionCTA cta={schoolConfig.ctas.admission} />
    </>
  );
}
