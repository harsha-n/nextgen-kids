import type { Metadata } from "next";
import { Check, Phone } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedCard } from "@/components/sections/AnimatedCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { schoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("admissions");

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.admissions} />
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeading
            eyebrow={schoolConfig.admissions.eyebrow}
            title={schoolConfig.admissions.title}
            description={schoolConfig.admissions.description}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {schoolConfig.admissions.steps.map((step, index) => {
              const Icon = getIcon(step.icon);
              return (
                <AnimatedCard key={step.title} delay={index * 0.04}>
                  <Card className="h-full bg-gradient-to-b from-sunshine-50 to-white">
                    <CardContent className="p-5 text-center">
                      <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-coral-500 text-lg font-extrabold text-white">
                        {index + 1}
                      </span>
                      <Icon className="mx-auto mt-5 h-5 w-5 text-coral-600" aria-hidden="true" />
                      <h2 className="mt-4 text-lg font-extrabold text-slate-950">{step.title}</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-sunshine-50/55">
        <div className="container grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <ContactForm
              contact={schoolConfig.contact}
              programs={schoolConfig.programs.items}
              schoolInfo={schoolConfig.schoolInfo}
            />
          </div>
          <div className="space-y-5">
            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-extrabold text-slate-950">
                  {schoolConfig.admissions.requiredDocumentsTitle}
                </h2>
                <ul className="mt-5 space-y-3">
                  {schoolConfig.admissions.requiredDocuments.map((document) => (
                    <li key={document} className="flex gap-2 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" aria-hidden="true" />
                      <span>{document}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-extrabold text-slate-950">
                  {schoolConfig.admissions.ageCriteriaTitle}
                </h2>
                <div className="mt-4 divide-y">
                  {schoolConfig.admissions.ageCriteria.map((item) => (
                    <div key={item.program} className="flex items-center justify-between gap-4 py-3 text-sm">
                      <span className="font-extrabold text-slate-800">{item.program}</span>
                      <span className="text-right font-semibold text-slate-600">{item.age}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  {schoolConfig.admissions.tableNote}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-coral-500 to-sunshine-500 text-white">
              <CardContent className="p-6">
                <Phone className="h-5 w-5" aria-hidden="true" />
                <h2 className="mt-4 text-xl font-extrabold">{schoolConfig.admissions.helpTitle}</h2>
                <p className="mt-2 text-sm leading-6 text-white/90">
                  {schoolConfig.admissions.helpDescription}
                </p>
                <a
                  href={`tel:${schoolConfig.schoolInfo.phone.replace(/\s/g, "")}`}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-white px-4 py-3 text-sm font-extrabold text-coral-600 transition hover:bg-white/90"
                >
                  {schoolConfig.schoolInfo.phone}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
