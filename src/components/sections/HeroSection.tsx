"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

type HeroSectionProps = {
  hero: SchoolConfig["hero"];
  schoolInfo: SchoolConfig["schoolInfo"];
};

export function HeroSection({ hero, schoolInfo }: HeroSectionProps) {
  return (
    <section className="relative isolate flex min-h-[86svh] items-end overflow-hidden bg-slate-950 pb-10 pt-32 text-white md:min-h-[88vh]">
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-slate-950/90 to-transparent" />
      <div className="container w-full">
        <div className="max-w-3xl pb-4">
          <motion.div
            className="mb-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex rounded-md bg-white/12 px-3 py-1 text-sm font-bold text-sunshine-100 ring-1 ring-white/25 backdrop-blur">
              {hero.statusBadge}
            </span>
            <span className="inline-flex rounded-md bg-mint-500/20 px-3 py-1 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur">
              {hero.eyebrow}
            </span>
          </motion.div>
          <motion.h1
            className="text-4xl font-extrabold leading-tight tracking-normal md:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="mt-5 max-w-2xl text-base leading-7 text-white/90 md:text-xl md:leading-8"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {hero.subtitle}
          </motion.p>
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={hero.primaryCta.href}
                aria-label={hero.primaryCta.ariaLabel}
                className={cn(buttonVariants({ variant: "coral", size: "lg" }), "w-full sm:w-auto")}
              >
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={hero.secondaryCta.href}
                aria-label={hero.secondaryCta.ariaLabel}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "w-full border-white/50 bg-white/10 text-white backdrop-blur hover:bg-white/20 sm:w-auto"
                )}
              >
                {hero.secondaryCta.label}
              </Link>
            </motion.div>
          </motion.div>
          <motion.a
            href={`tel:${schoolInfo.phone.replace(/\s/g, "")}`}
            className="mt-5 inline-flex items-center gap-3 rounded-md bg-white/12 px-3 py-2 text-sm font-bold text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-sunshine-100 text-sunshine-700">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs text-white/70">{hero.phoneCtaLabel}</span>
              <span className="block">{schoolInfo.phone}</span>
            </span>
          </motion.a>
        </div>
        <motion.div
          className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          {hero.trustBadges.map((badge) => {
            const Icon = getIcon(badge.icon);
            return (
              <div
                key={badge.title}
                className="rounded-lg bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur"
              >
                <Icon className="mb-3 h-5 w-5 text-sunshine-100" aria-hidden="true" />
                <p className="font-extrabold">{badge.title}</p>
                <p className="mt-1 text-sm text-white/80">{badge.description}</p>
              </div>
            );
          })}
        </motion.div>
        <motion.div
          className="pointer-events-none absolute bottom-32 right-6 hidden max-w-xs gap-3 lg:grid"
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
        >
          {hero.floatingBadges.map((badge) => {
            const Icon = getIcon(badge.icon);
            return (
              <div
                key={badge.title}
                className="flex items-center gap-3 rounded-lg bg-white/90 p-4 text-slate-900 shadow-soft ring-1 ring-white/60 backdrop-blur"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sunshine-100 text-coral-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-extrabold">{badge.title}</span>
                  <span className="block text-xs font-semibold text-slate-500">{badge.description}</span>
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
