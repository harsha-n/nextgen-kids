import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("gallery", config);
}

export default async function GalleryPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader content={config.pageContent.gallery} />
      <GalleryGrid gallery={config.gallery} items={config.gallery.items} />
      <AdmissionCTA cta={config.ctas.contact} />
    </>
  );
}
