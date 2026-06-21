import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import type { SchoolConfig } from "@/data/school.config";

type FooterProps = {
  config: SchoolConfig;
};

export function Footer({ config }: FooterProps) {
  const { schoolInfo, navigation } = config;

  return (
    <footer className="bg-slate-950 text-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white ring-1 ring-white/15">
              <Image
                src={schoolInfo.logo.src}
                alt={schoolInfo.logo.alt}
                fill
                sizes="44px"
                className="object-contain p-0.5"
              />
            </span>
            <span>
              <span className="block text-lg font-extrabold">{schoolInfo.name}</span>
              <span className="block text-sm text-white/60">{schoolInfo.tagline}</span>
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">{schoolInfo.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {schoolInfo.socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-md border border-white/10 px-3 py-2 text-sm font-bold text-white/80 transition hover:bg-white/10"
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-sunshine-100">
            Pages
          </h2>
          <ul className="mt-4 space-y-3">
            {navigation.footer.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 transition hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-sunshine-100">
            Future
          </h2>
          <ul className="mt-4 space-y-3">
            {navigation.future.map((link) => (
              <li key={link.href}>
                <span className="text-sm text-white/50">{link.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-[0.14em] text-sunshine-100">
            Contact
          </h2>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
              <a href={`tel:${schoolInfo.phone.replace(/\s/g, "")}`}>{schoolInfo.phone}</a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
              <a href={`mailto:${schoolInfo.email}`}>{schoolInfo.email}</a>
            </li>
            <li className="flex min-w-0 gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-coral-500" aria-hidden="true" />
              <span className="min-w-0 break-words">{schoolInfo.address}</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container flex flex-col gap-2 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>{schoolInfo.name} - {schoolInfo.type}</p>
          <p>{schoolInfo.timings}</p>
        </div>
      </div>
    </footer>
  );
}
