import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type ActivitiesSectionProps = {
  activities: SchoolConfig["activities"];
};

export function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  const tones = [
    "bg-sunshine-100 text-sunshine-700 ring-sunshine-200",
    "bg-coral-100 text-coral-600 ring-coral-100",
    "bg-skysoft-100 text-skysoft-700 ring-skysoft-100",
    "bg-mint-100 text-mint-700 ring-mint-100"
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-coral-50/45 to-white">
      <div className="container">
        <SectionHeading
          eyebrow={activities.eyebrow}
          title={activities.title}
          description={activities.description}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {activities.items.map((activity, index) => {
            const Icon = getIcon(activity.icon);
            const tone = tones[index % tones.length];
            return (
              <AnimatedCard key={activity.title} delay={index * 0.03}>
                <Card className="h-full bg-white text-center transition hover:-translate-y-1 hover:shadow-soft">
                  <CardContent className="p-5">
                    <span className={`mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-md ring-2 ${tone}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-sm font-extrabold text-slate-950">{activity.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-slate-600">{activity.description}</p>
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
