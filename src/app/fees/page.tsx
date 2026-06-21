import type { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, Info } from "lucide-react";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { PageHeader } from "@/components/sections/PageHeader";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("fees");

export default function FeesPage() {
  return (
    <>
      <PageHeader content={schoolConfig.pageContent.fees} />
      <section className="section-padding bg-white">
        <div className="container">
          <SectionHeading
            eyebrow={schoolConfig.fees.eyebrow}
            title={schoolConfig.fees.title}
            description={schoolConfig.fees.description}
          />

          <div className="mx-auto mt-12 max-w-5xl overflow-x-auto rounded-lg border bg-white shadow-sm">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gradient-to-r from-sunshine-500 to-coral-500 text-white">
                <tr>
                  <th className="px-5 py-4 font-extrabold">{schoolConfig.fees.tableHeaders.program}</th>
                  <th className="px-5 py-4 font-extrabold">{schoolConfig.fees.tableHeaders.age}</th>
                  <th className="px-5 py-4 font-extrabold">{schoolConfig.fees.tableHeaders.admissionFee}</th>
                  <th className="px-5 py-4 font-extrabold">{schoolConfig.fees.tableHeaders.monthlyFee}</th>
                  <th className="px-5 py-4 font-extrabold">{schoolConfig.fees.tableHeaders.includes}</th>
                </tr>
              </thead>
              <tbody>
                {schoolConfig.fees.items.map((fee, index) => {
                  const age = schoolConfig.admissions.ageCriteria.find(
                    (item) => item.program === fee.program
                  )?.age;
                  return (
                    <tr
                      key={fee.program}
                      className={index % 2 === 0 ? "bg-white" : "bg-sunshine-50/45"}
                    >
                      <td className="px-5 py-4 font-extrabold text-slate-900">{fee.program}</td>
                      <td className="px-5 py-4 font-semibold text-slate-600">{age}</td>
                      <td className="px-5 py-4 font-semibold text-slate-700">{fee.admissionFee}</td>
                      <td className="px-5 py-4 font-semibold text-coral-600">{fee.monthlyFee}</td>
                      <td className="px-5 py-4 text-slate-600">{fee.includes.join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mx-auto mt-6 flex max-w-5xl items-start gap-3 rounded-lg border border-skysoft-100 bg-skysoft-50 p-4">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-skysoft-700" aria-hidden="true" />
            <p className="text-sm font-semibold leading-6 text-skysoft-700">
              {schoolConfig.fees.note}
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-sunshine-50/55">
        <div className="container grid gap-6 md:grid-cols-2">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-coral-500" aria-hidden="true" />
                <h2 className="text-xl font-extrabold text-slate-950">
                  {schoolConfig.fees.paymentModesTitle}
                </h2>
              </div>
              <ul className="mt-5 space-y-3">
                {schoolConfig.fees.paymentModes.map((mode) => (
                  <li key={mode} className="flex gap-2 text-sm text-slate-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" aria-hidden="true" />
                    <span>{mode}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-coral-50">
            <CardContent className="p-6">
              <h2 className="text-xl font-extrabold text-slate-950">
                {schoolConfig.fees.scholarshipTitle}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {schoolConfig.fees.scholarshipInfo}
              </p>
              <Link
                href={schoolConfig.fees.contactCta.href}
                aria-label={schoolConfig.fees.contactCta.ariaLabel}
                className="mt-5 inline-flex rounded-md bg-coral-500 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-coral-600"
              >
                {schoolConfig.fees.contactCta.label}
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
      <AdmissionCTA cta={schoolConfig.ctas.admission} />
    </>
  );
}
