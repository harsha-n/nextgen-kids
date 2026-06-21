import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type TestimonialsSectionProps = {
  testimonials: SchoolConfig["testimonials"];
};

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          description={testimonials.description}
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.items.map((testimonial, index) => (
            <AnimatedCard key={testimonial.parentName} delay={index * 0.04}>
              <Card className="h-full border-coral-100 bg-coral-50/50">
                <CardContent className="p-6">
                  <div className="flex gap-1 text-sunshine-500" aria-label={`${testimonial.rating} star rating`}>
                    {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="mt-5 text-base font-semibold leading-7 text-slate-800">
                    &quot;{testimonial.quote}&quot;
                  </blockquote>
                  <div className="mt-6">
                    <p className="font-extrabold text-slate-950">{testimonial.parentName}</p>
                    <p className="text-sm text-slate-600">{testimonial.childInfo}</p>
                  </div>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
