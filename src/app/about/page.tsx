import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Mail, MapPin, Phone } from "lucide-react";
import { AdmissionCTA } from "@/components/sections/AdmissionCTA";
import { AnimatedCard } from "@/components/sections/AnimatedCard";
import { FacultyCard } from "@/components/sections/FacultyCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { SafetySection } from "@/components/sections/SafetySection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = generatePageMetadata("about");

export default function AboutPage() {
  const visitCard = schoolConfig.contact.contactCards.find((card) => card.icon === "mapPin");
  const callCard = schoolConfig.contact.contactCards.find((card) => card.icon === "phone");
  const emailCard = schoolConfig.contact.contactCards.find((card) => card.icon === "mail");

  return (
    <>
      <PageHeader content={schoolConfig.pageContent.about} />
      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              eyebrow={schoolConfig.pageContent.about.eyebrow}
              title={schoolConfig.pageContent.about.storyTitle ?? schoolConfig.pageContent.about.title}
              description={
                schoolConfig.pageContent.about.storyDescription ??
                schoolConfig.pageContent.about.description
              }
            />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {schoolConfig.pageContent.about.primaryCta ? (
                <Link
                  href={schoolConfig.pageContent.about.primaryCta.href}
                  aria-label={schoolConfig.pageContent.about.primaryCta.ariaLabel}
                  className={cn(buttonVariants({ variant: "coral" }), "w-full sm:w-auto")}
                >
                  {schoolConfig.pageContent.about.primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
              {schoolConfig.pageContent.about.secondaryCta ? (
                <Link
                  href={schoolConfig.pageContent.about.secondaryCta.href}
                  aria-label={schoolConfig.pageContent.about.secondaryCta.ariaLabel}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
                >
                  {schoolConfig.pageContent.about.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs data={schoolConfig.whyChooseUs} />
      <section className="section-padding bg-skysoft-50/65">
        <div className="container">
          <SectionHeading
            eyebrow={schoolConfig.contact.eyebrow}
            title={schoolConfig.contact.mapTitle}
            description={schoolConfig.contact.mapDescription}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: visitCard?.title,
                description: schoolConfig.schoolInfo.address,
                icon: MapPin
              },
              {
                title: callCard?.title,
                description: schoolConfig.schoolInfo.phone,
                icon: Phone
              },
              {
                title: emailCard?.title,
                description: schoolConfig.schoolInfo.email,
                icon: Mail
              },
              {
                title: schoolConfig.stats.items[0]?.label,
                description: schoolConfig.schoolInfo.timings,
                icon: Calendar
              }
            ].map(({ title, description, icon: Icon }) => (
              <Card key={`${title}-${description}`} className="h-full bg-white text-center">
                <CardContent className="p-5">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-sunshine-100 text-coral-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    {title}
                  </h2>
                  <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">
                    {description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding bg-sunshine-50/70">
        <div className="container">
          <SectionHeading
            eyebrow={schoolConfig.faculty.eyebrow}
            title={schoolConfig.faculty.title}
            description={schoolConfig.faculty.description}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {schoolConfig.faculty.teachers.map((teacher, index) => (
              <AnimatedCard key={teacher.name} delay={index * 0.04}>
                <FacultyCard teacher={teacher} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <SafetySection safety={schoolConfig.safety} />
      <AdmissionCTA cta={schoolConfig.ctas.contact} />
    </>
  );
}
