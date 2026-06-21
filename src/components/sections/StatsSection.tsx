import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type StatsSectionProps = {
  stats: SchoolConfig["stats"];
};

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="bg-white py-12">
      <div className="container">
        <SectionHeading eyebrow={stats.eyebrow} title={stats.title} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <AnimatedCard key={item.label} delay={index * 0.04}>
                <Card className="h-full border-skysoft-100 bg-skysoft-50/60">
                  <CardContent className="p-5">
                    <Icon className="h-6 w-6 text-skysoft-700" aria-hidden="true" />
                    <p className="mt-4 text-3xl font-extrabold text-slate-950">{item.value}</p>
                    <p className="mt-1 font-bold text-slate-800">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
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
