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
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("about", config);
}

export default async function AboutPage() {
  const config = await getSchoolConfig();

  const visitCard = config.contact.contactCards.find((card) => card.icon === "mapPin");
  const callCard = config.contact.contactCards.find((card) => card.icon === "phone");
  const emailCard = config.contact.contactCards.find((card) => card.icon === "mail");

  return (
    <>
      <PageHeader content={config.pageContent.about} />
      <section className="section-padding bg-white">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <SectionHeading
              eyebrow={config.pageContent.about.eyebrow}
              title={config.pageContent.about.storyTitle ?? config.pageContent.about.title}
              description={
                config.pageContent.about.storyDescription ??
                config.pageContent.about.description
              }
            />
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {config.pageContent.about.primaryCta ? (
                <Link
                  href={config.pageContent.about.primaryCta.href}
                  aria-label={config.pageContent.about.primaryCta.ariaLabel}
                  className={cn(buttonVariants({ variant: "coral" }), "w-full sm:w-auto")}
                >
                  {config.pageContent.about.primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : null}
              {config.pageContent.about.secondaryCta ? (
                <Link
                  href={config.pageContent.about.secondaryCta.href}
                  aria-label={config.pageContent.about.secondaryCta.ariaLabel}
                  className={cn(buttonVariants({ variant: "outline" }), "w-full sm:w-auto")}
                >
                  {config.pageContent.about.secondaryCta.label}
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs data={config.whyChooseUs} />
      <section className="section-padding bg-skysoft-50/65">
        <div className="container">
          <SectionHeading
            eyebrow={config.contact.eyebrow}
            title={config.contact.mapTitle}
            description={config.contact.mapDescription}
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: visitCard?.title,
                description: config.schoolInfo.address,
                icon: MapPin
              },
              {
                title: callCard?.title,
                description: config.schoolInfo.phone,
                icon: Phone
              },
              {
                title: emailCard?.title,
                description: config.schoolInfo.email,
                icon: Mail
              },
              {
                title: config.stats.items[0]?.label,
                description: config.schoolInfo.timings,
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
            eyebrow={config.faculty.eyebrow}
            title={config.faculty.title}
            description={config.faculty.description}
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {config.faculty.teachers.map((teacher, index) => (
              <AnimatedCard key={teacher.name} delay={index * 0.04}>
                <FacultyCard teacher={teacher} />
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>
      <SafetySection safety={config.safety} />
      <AdmissionCTA cta={config.ctas.contact} />
    </>
  );
}
