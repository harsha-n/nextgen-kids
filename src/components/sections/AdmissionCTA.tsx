import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import type { SchoolConfig } from "@/data/school.config";
import { cn } from "@/lib/utils";

type AdmissionCTAProps = {
  cta: SchoolConfig["ctas"]["admission"] | SchoolConfig["ctas"]["contact"];
};

export function AdmissionCTA({ cta }: AdmissionCTAProps) {
  return (
    <section className="bg-gradient-to-r from-sunshine-500 via-coral-500 to-pink-400 py-16 text-white">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center">
          <div>
            <p className="inline-flex rounded-md bg-white/20 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-white">
              {cta.eyebrow}
            </p>
            <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-normal md:text-5xl">
              {cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/90 md:text-lg">
              {cta.description}
            </p>
          </div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={cta.primary.href}
              aria-label={cta.primary.ariaLabel}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-white bg-white text-coral-600 shadow-lg hover:bg-white/90 sm:w-auto"
              )}
            >
              {cta.primary.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href={cta.secondary.href}
              aria-label={cta.secondary.ariaLabel}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-white/50 bg-white/20 text-white hover:bg-white/25 sm:w-auto"
              )}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {cta.secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
