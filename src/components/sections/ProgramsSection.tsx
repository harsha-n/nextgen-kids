import type { SchoolConfig } from "@/data/school.config";
import { AnimatedCard } from "./AnimatedCard";
import { ProgramCard } from "./ProgramCard";
import { SectionHeading } from "./SectionHeading";

type ProgramsSectionProps = {
  programs: SchoolConfig["programs"];
};

export function ProgramsSection({ programs }: ProgramsSectionProps) {
  const tones = ["sunshine", "coral", "sky", "mint"] as const;

  return (
    <section className="section-padding bg-sunshine-50/70">
      <div className="container">
        <SectionHeading
          eyebrow={programs.eyebrow}
          title={programs.title}
          description={programs.description}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.items.map((program, index) => (
            <AnimatedCard key={program.title} delay={index * 0.04}>
              <ProgramCard program={program} tone={tones[index % tones.length]} />
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
