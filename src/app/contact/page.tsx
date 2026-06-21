import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { AnimatedCard } from "@/components/sections/AnimatedCard";
import { PageHeader } from "@/components/sections/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { getIcon } from "@/lib/icons";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("contact", config);
}

export default async function ContactPage() {
  const config = await getSchoolConfig();

  return (
    <>
      <PageHeader content={config.pageContent.contact} />
      <section className="py-12 bg-white">
        <div className="container">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {config.contact.contactCards.map((card, index) => {
              const Icon = getIcon(card.icon);
              return (
                <AnimatedCard key={card.title} delay={index * 0.04}>
                  <Card className="h-full text-center transition hover:-translate-y-1 hover:shadow-soft">
                    <CardContent className="p-5">
                      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-sunshine-100 text-coral-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2 className="mt-4 text-sm font-extrabold uppercase tracking-[0.12em] text-slate-500">
                        {card.title}
                      </h2>
                      <p className="mt-2 break-words text-sm font-semibold leading-6 text-slate-800">
                        {card.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-skysoft-50/65">
        <div className="container grid gap-8 lg:grid-cols-2">
          <ContactForm
            contact={config.contact}
            programs={config.programs.items}
            schoolInfo={config.schoolInfo}
          />

          <div className="space-y-5">
            <Card className="overflow-hidden">
              <div className="aspect-video">
                <iframe
                  src={config.contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={config.contact.mapTitle}
                />
              </div>
            </Card>

            <Card className="bg-white">
              <CardContent className="p-6">
                <h2 className="text-xl font-extrabold text-slate-950">
                  {config.contact.mapTitle}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {config.contact.mapDescription}
                </p>
                <a
                  href={config.schoolInfo.googleMapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 flex w-full items-start gap-2 rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-extrabold leading-6 text-slate-900 shadow-sm transition hover:border-coral-200 hover:bg-sunshine-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral-400 focus-visible:ring-offset-2"
                >
                  <span className="min-w-0 flex-1 break-words">
                    {config.schoolInfo.address}
                  </span>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
