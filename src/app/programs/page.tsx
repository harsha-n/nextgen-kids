import type { Metadata } from "next";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProgramsSection } from "@/components/sections/ProgramsSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("programs", config);
}

export default async function ProgramsPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader content={config.pageContent.programs} />
      <ProgramsSection programs={config.programs} />
      <section className="section-padding bg-skysoft-50/65">
        <div className="container">
          <SectionHeading
            eyebrow={config.admissions.eyebrow}
            title={config.admissions.ageCriteriaTitle}
            description={config.admissions.tableNote}
          />
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-lg border bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gradient-to-r from-sunshine-500 to-coral-500 text-white">
                <tr>
                  <th className="px-5 py-4 font-extrabold">{config.programs.eyebrow}</th>
                  <th className="px-5 py-4 font-extrabold">{config.admissions.ageCriteriaTitle}</th>
                </tr>
              </thead>
              <tbody>
                {config.admissions.ageCriteria.map((row, index) => (
                  <tr
                    key={row.program}
                    className={index % 2 === 0 ? "bg-white" : "bg-sunshine-50/45"}
                  >
                    <td className="px-5 py-4 font-extrabold text-slate-900">{row.program}</td>
                    <td className="px-5 py-4 font-semibold text-slate-600">{row.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <AdmissionCTA cta={config.ctas.admission} />
    </>
  );
}
