import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import type { SchoolConfig } from "@/data/school.config";

type PageContent = SchoolConfig["pageContent"][string];

type PageHeaderProps = {
  content: PageContent;
};

export function PageHeader({ content }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-sunshine-50 via-white to-coral-50/60 pb-14 pt-28 md:pb-20 md:pt-32">
      <div className="container grid gap-8 lg:grid-cols-[1fr_0.72fr] lg:items-center">
        <div className="max-w-3xl">
          <Badge variant="coral">{content.eyebrow}</Badge>
          <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-normal text-slate-950 md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 md:text-lg">
            {content.description}
          </p>
          {content.highlights?.length ? (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {content.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-md border border-white bg-white/75 px-3 py-2 text-sm font-bold text-slate-700 shadow-sm"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        {content.image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-soft">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
