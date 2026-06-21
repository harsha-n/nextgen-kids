import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type DaycareSectionProps = {
  daycare: SchoolConfig["daycare"];
};

export function DaycareSection({ daycare }: DaycareSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AnimatedCard>
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft">
              <Image
                src={daycare.image.src}
                alt={daycare.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 right-5 max-w-[calc(100%-2.5rem)] rounded-lg bg-gradient-to-br from-sunshine-500 to-coral-500 p-4 text-white shadow-soft">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/80">
                {daycare.eyebrow}
              </p>
              <p className="mt-1 text-sm font-extrabold">{daycare.timings}</p>
            </div>
          </div>
        </AnimatedCard>
        <div>
          <SectionHeading
            eyebrow={daycare.eyebrow}
            title={daycare.title}
            description={daycare.description}
            align="left"
          />
          <Badge variant="coral" className="mt-6 lg:hidden">
            {daycare.timings}
          </Badge>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {daycare.benefits.map((benefit, index) => {
              const Icon = getIcon(benefit.icon);
              return (
                <AnimatedCard key={benefit.title} delay={index * 0.04}>
                  <Card className="h-full border-coral-100 bg-coral-50/50">
                    <CardContent className="p-5">
                      <Icon className="h-5 w-5 text-coral-600" aria-hidden="true" />
                      <h3 className="mt-4 font-extrabold text-slate-950">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
          <ul className="mt-7 grid gap-2 sm:grid-cols-2">
            {daycare.safetyPoints.map((point) => (
              <li key={point} className="flex gap-2 text-sm font-semibold text-slate-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" aria-hidden="true" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <Link
            href={daycare.cta.href}
            aria-label={daycare.cta.ariaLabel}
            className={cn(buttonVariants({ variant: "dark", size: "lg" }), "mt-8")}
          >
            {daycare.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
