import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { DailyRoutineSection } from "@/components/sections/DailyRoutineSection";
import { DaycareSection } from "@/components/sections/DaycareSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { SafetySection } from "@/components/sections/SafetySection";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("daycare");

export default function DaycarePage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.daycare} />
      <DaycareSection daycare={schoolConfig.daycare} />
      <SafetySection safety={schoolConfig.safety} />
      <DailyRoutineSection dailyRoutine={schoolConfig.dailyRoutine} />
      <AdmissionCTA cta={schoolConfig.ctas.contact} />
    </>
  );
}
