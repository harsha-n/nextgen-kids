import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { DailyRoutineSection } from "@/components/sections/DailyRoutineSection";
import { DaycareSection } from "@/components/sections/DaycareSection";
import { PageHeader } from "@/components/sections/PageHeader";
import { SafetySection } from "@/components/sections/SafetySection";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("daycare", config);
}

export default async function DaycarePage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader content={config.pageContent.daycare} />
      <DaycareSection daycare={config.daycare} />
      <SafetySection safety={config.safety} />
      <DailyRoutineSection dailyRoutine={config.dailyRoutine} />
      <AdmissionCTA cta={config.ctas.contact} />
    </>
  );
}
