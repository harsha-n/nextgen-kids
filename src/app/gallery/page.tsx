import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHeader } from "@/components/sections/PageHeader";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("gallery");

export default function GalleryPage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.gallery} />
      <GalleryGrid gallery={schoolConfig.gallery} items={schoolConfig.gallery.items} />
      <AdmissionCTA cta={schoolConfig.ctas.contact} />
    </>
  );
}
