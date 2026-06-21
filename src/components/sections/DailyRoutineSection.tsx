import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type DailyRoutineSectionProps = {
  dailyRoutine: SchoolConfig["dailyRoutine"];
};

export function DailyRoutineSection({ dailyRoutine }: DailyRoutineSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={dailyRoutine.eyebrow}
          title={dailyRoutine.title}
          description={dailyRoutine.description}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dailyRoutine.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <AnimatedCard key={`${item.time}-${item.title}`} delay={index * 0.03}>
                <Card className="h-full border-sunshine-100 bg-sunshine-50/70">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-extrabold text-sunshine-700">{item.time}</span>
                      <Icon className="h-5 w-5 text-coral-500" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-extrabold text-slate-950">{item.title}</h3>
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
