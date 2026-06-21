"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { SchoolConfig } from "@/data/school.config";
import { getIcon } from "@/lib/icons";
import { AnimatedCard } from "./AnimatedCard";
import { SectionHeading } from "./SectionHeading";

type SafetySectionProps = {
  safety: SchoolConfig["safety"];
};

export function SafetySection({ safety }: SafetySectionProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const zoomImage = safety.zoomImage ?? safety.image;

  return (
    <section className="section-padding bg-skysoft-50/70">
      <div className="container grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <AnimatedCard>
          <button
            type="button"
            className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-white shadow-soft"
            onClick={() => setIsZoomOpen(true)}
            aria-label={safety.zoomLabel}
          >
            <Image
              src={safety.image.src}
              alt={safety.image.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-contain transition duration-500 group-hover:scale-[1.02]"
            />
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-slate-950/75 px-3 py-2 text-sm font-bold text-white backdrop-blur transition group-hover:bg-coral-500">
              <Maximize2 className="h-4 w-4" aria-hidden="true" />
              {safety.zoomLabel}
            </span>
          </button>
        </AnimatedCard>
        <div>
          <SectionHeading
            eyebrow={safety.eyebrow}
            title={safety.title}
            description={safety.description}
            align="left"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {safety.points.map((point, index) => {
              const Icon = getIcon(point.icon);
              return (
                <AnimatedCard key={point.title} delay={index * 0.03}>
                  <Card className="h-full border-white bg-white/90">
                    <CardContent className="p-5">
                      <Icon className="h-5 w-5 text-skysoft-700" aria-hidden="true" />
                      <h3 className="mt-4 font-extrabold text-slate-950">{point.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{point.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isZoomOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20"
              onClick={() => setIsZoomOpen(false)}
              aria-label="Close safety image"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
            <motion.figure
              className="w-full max-w-4xl"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-900">
                <Image
                  src={zoomImage.src}
                  alt={zoomImage.alt}
                  fill
                  sizes="100vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm font-semibold text-white/80">
                {zoomImage.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
