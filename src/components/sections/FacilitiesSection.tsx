import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type FacilitiesSectionProps = {
  facilities: SchoolConfig["facilities"];
};

export function FacilitiesSection({ facilities }: FacilitiesSectionProps) {
  return (
    <section className="section-padding bg-skysoft-50/60">
      <div className="container">
        <SectionHeading
          eyebrow={facilities.eyebrow}
          title={facilities.title}
          description={facilities.description}
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {facilities.items.map((facility, index) => {
            const Icon = getIcon(facility.icon);
            return (
              <AnimatedCard key={facility.title} delay={index * 0.03}>
                <Card className="h-full bg-white">
                  <CardContent className="p-5">
                    <Icon className="h-5 w-5 text-skysoft-700" aria-hidden="true" />
                    <h3 className="mt-4 font-extrabold text-slate-950">{facility.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{facility.description}</p>
                  </CardContent>
                </Card>
              </AnimatedCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
