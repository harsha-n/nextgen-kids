"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { GalleryItem, SchoolConfig } from "@/data/school.config";
import { SectionHeading } from "./SectionHeading";

type GalleryGridProps = {
  gallery: Pick<SchoolConfig["gallery"], "eyebrow" | "title" | "description">;
  items: GalleryItem[];
};

export function GalleryGrid({ gallery, items }: GalleryGridProps) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((item) => item.category)))],
    [items]
  );
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const showFilters = items.length > 6 && categories.length > 2;
  const filteredItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <section className="section-padding bg-sunshine-50/70">
      <div className="container">
        <SectionHeading
          eyebrow={gallery.eyebrow}
          title={gallery.title}
          description={gallery.description}
        />

        {showFilters ? (
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-md px-4 py-2 text-sm font-bold capitalize transition ${
                  activeCategory === category
                    ? "bg-coral-500 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-coral-50 hover:text-coral-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        ) : null}

        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.figure
                key={`${item.src}-${item.category}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                className="group overflow-hidden rounded-lg border bg-white shadow-sm transition hover:shadow-soft"
              >
                <button
                  type="button"
                  className="relative block aspect-square w-full overflow-hidden text-left"
                  onClick={() => setLightboxImage(item)}
                  aria-label={item.alt}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-slate-950/0 px-3 text-center text-sm font-bold text-white opacity-0 transition group-hover:bg-slate-950/35 group-hover:opacity-100">
                    {item.alt}
                  </span>
                </button>
                <figcaption className="flex items-center justify-between gap-2 p-3">
                  <span className="line-clamp-2 text-xs font-bold leading-5 text-slate-700">{item.alt}</span>
                  <Badge variant="secondary" className="shrink-0">
                    {item.category}
                  </Badge>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage ? (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-md bg-white/10 text-white transition hover:bg-white/20"
              onClick={() => setLightboxImage(null)}
              aria-label="Close gallery image"
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
              <div className="relative aspect-video overflow-hidden rounded-lg bg-slate-900">
                <Image
                  src={lightboxImage.src}
                  alt={lightboxImage.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm font-semibold text-white/80">
                {lightboxImage.alt}
              </figcaption>
            </motion.figure>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
