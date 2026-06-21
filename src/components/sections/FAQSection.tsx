"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { SchoolConfig } from "@/data/school.config";
import { SectionHeading } from "./SectionHeading";

type FAQSectionProps = {
  faqs: SchoolConfig["faqs"];
  limit?: number;
};

export function FAQSection({ faqs, limit }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);
  const items = typeof limit === "number" ? faqs.items.slice(0, limit) : faqs.items;

  return (
    <section className="section-padding bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={faqs.eyebrow}
          title={faqs.title}
          description={faqs.description}
        />
        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {items.map((faq, index) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              className="overflow-hidden rounded-lg border bg-white shadow-sm"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-sunshine-50/60"
                aria-expanded={openIndex === index}
              >
                <span className="font-extrabold text-slate-950">{faq.question}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-coral-500 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="border-t bg-sunshine-50/35 px-5 pb-5 pt-3">
                      <p className="text-sm leading-6 text-slate-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
