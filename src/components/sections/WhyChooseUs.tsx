import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type WhyChooseUsProps = {
  data: SchoolConfig["whyChooseUs"];
};

export function WhyChooseUs({ data }: WhyChooseUsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          description={data.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item, index) => {
            const Icon = getIcon(item.icon);
            return (
              <AnimatedCard key={item.title} delay={index * 0.04}>
                <Card className="h-full border-mint-100 bg-mint-50/50 transition hover:-translate-y-1 hover:shadow-soft">
                  <CardContent className="p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-white text-mint-700 shadow-sm">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-xl font-extrabold text-slate-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
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
