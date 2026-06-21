import type { Metadata } from "next";
import { ActivitiesSection } from "@/components/sections/ActivitiesSection";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { DailyRoutineSection } from "@/components/sections/DailyRoutineSection";
import { DaycareSection } from "@/components/sections/DaycareSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SafetySection } from "@/components/sections/SafetySection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("home", config);
}

export default async function HomePage() {
  const config = await getSchoolConfig();

  return (
    <>
      <HeroSection hero={config.hero} schoolInfo={config.schoolInfo} />
      <StatsSection stats={config.stats} />
      <ProgramsSection programs={config.programs} />
      <WhyChooseUs data={config.whyChooseUs} />
      <SafetySection safety={config.safety} />
      <ActivitiesSection activities={config.activities} />
      <DaycareSection daycare={config.daycare} />
      <FacilitiesSection facilities={config.facilities} />
      <DailyRoutineSection dailyRoutine={config.dailyRoutine} />
      <GalleryGrid
        gallery={{
          eyebrow: config.gallery.eyebrow,
          title: config.gallery.previewTitle,
          description: config.gallery.previewDescription
        }}
        items={config.gallery.items.slice(0, 6)}
      />
      <TestimonialsSection testimonials={config.testimonials} />
      <FAQSection faqs={config.faqs} limit={5} />
      <AdmissionCTA cta={config.ctas.admission} />
    </>
  );
}
