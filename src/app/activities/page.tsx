import type { Metadata } from "next";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("activities", config);
}

export default async function ActivitiesPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader content={config.pageContent.activities} />
      <ActivitiesSection activities={config.activities} />
      <GalleryGrid
        gallery={{
          eyebrow: config.gallery.eyebrow,
          title: config.gallery.previewTitle,
          description: config.gallery.previewDescription
        }}
        items={config.gallery.items.slice(0, 6)}
      />
      <AdmissionCTA cta={config.ctas.admission} />
    </>
  );
}
