"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  titleHighlight,
  description,
  align = "center",
  className
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <Badge variant="sunshine" className="mb-4">
        {eyebrow}
      </Badge>
      <h2 className="text-3xl font-extrabold tracking-normal text-slate-950 md:text-4xl">
        {title}
        {titleHighlight ? <span className="text-coral-500"> {titleHighlight}</span> : null}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-7 text-slate-600 md:text-lg",
            align === "center" ? "mx-auto" : "mx-0"
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
