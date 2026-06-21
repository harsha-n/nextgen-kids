import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import type { Program } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type ProgramCardProps = {
  program: Program;
  className?: string;
  tone?: "sunshine" | "coral" | "sky" | "mint";
};

const toneStyles = {
  sunshine: {
    card: "border-sunshine-100 bg-sunshine-50/80",
    icon: "bg-sunshine-100 text-sunshine-700",
    badge: "sunshine" as const,
    button: "bg-sunshine-500 text-white hover:bg-sunshine-700"
  },
  coral: {
    card: "border-coral-100 bg-coral-50/70",
    icon: "bg-coral-100 text-coral-600",
    badge: "coral" as const,
    button: "bg-coral-500 text-white hover:bg-coral-600"
  },
  sky: {
    card: "border-skysoft-100 bg-skysoft-50/75",
    icon: "bg-skysoft-100 text-skysoft-700",
    badge: "secondary" as const,
    button: "bg-skysoft-500 text-white hover:bg-skysoft-700"
  },
  mint: {
    card: "border-mint-100 bg-mint-50/75",
    icon: "bg-mint-100 text-mint-700",
    badge: "mint" as const,
    button: "bg-mint-500 text-white hover:bg-mint-700"
  }
};

export function ProgramCard({ program, className, tone = "sunshine" }: ProgramCardProps) {
  const Icon = getIcon(program.icon);
  const styles = toneStyles[tone];

  return (
    <Card
      className={cn(
        "group h-full overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-soft",
        styles.card,
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={program.image.src}
          alt={program.image.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className={cn("flex h-11 w-11 items-center justify-center rounded-md", styles.icon)}>
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <Badge variant={styles.badge}>{program.ageGroup}</Badge>
        </div>
        <CardTitle>{program.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-[calc(100%-theme(spacing.6))] flex-col">
        <p className="text-sm leading-6 text-slate-600">{program.description}</p>
        <ul className="mt-5 space-y-2">
          {program.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2 text-sm text-slate-700">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-500" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
        <Link
          href={program.cta.href}
          aria-label={program.cta.ariaLabel}
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "mt-6 w-full border-transparent",
            styles.button
          )}
        >
          {program.cta.label}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}
