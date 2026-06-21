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
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("home");

export default function HomePage() {
  return (
    <>
      <HeroSection hero={schoolConfig.hero} schoolInfo={schoolConfig.schoolInfo} />
      <StatsSection stats={schoolConfig.stats} />
      <ProgramsSection programs={schoolConfig.programs} />
      <WhyChooseUs data={schoolConfig.whyChooseUs} />
      <SafetySection safety={schoolConfig.safety} />
      <ActivitiesSection activities={schoolConfig.activities} />
      <DaycareSection daycare={schoolConfig.daycare} />
      <FacilitiesSection facilities={schoolConfig.facilities} />
      <DailyRoutineSection dailyRoutine={schoolConfig.dailyRoutine} />
      <GalleryGrid
        gallery={{
          eyebrow: schoolConfig.gallery.eyebrow,
          title: schoolConfig.gallery.previewTitle,
          description: schoolConfig.gallery.previewDescription
        }}
        items={schoolConfig.gallery.items.slice(0, 6)}
      />
      <TestimonialsSection testimonials={schoolConfig.testimonials} />
      <FAQSection faqs={schoolConfig.faqs} limit={5} />
      <AdmissionCTA cta={schoolConfig.ctas.admission} />
    </>
  );
}
