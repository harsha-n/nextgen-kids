"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import type { SchoolConfig } from "@/data/school.config";
import { cn } from "@/lib/utils";

type NavbarProps = {
  config: SchoolConfig;
};

export function Navbar({ config }: NavbarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { schoolInfo, navigation, hero } = config;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition-all duration-300",
        scrolled ? "bg-white/95 shadow-sm" : "bg-white/90"
      )}
    >
      <nav
        className={cn(
          "container flex items-center justify-between gap-4 transition-all duration-300",
          scrolled ? "h-16" : "h-[4.5rem]"
        )}
        aria-label="Primary navigation"
      >
        <Link href="/" className="flex min-w-0 items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white shadow-sm ring-1 ring-slate-200 transition-transform hover:scale-105">
            <Image
              src={schoolInfo.logo.src}
              alt={schoolInfo.logo.alt}
              fill
              sizes="44px"
              className="object-contain p-0.5"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-lg font-extrabold leading-tight text-slate-950">
              {schoolInfo.name}
            </span>
            <span className="block truncate text-xs font-bold leading-tight text-coral-600">
              {schoolInfo.tagline}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navigation.main.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-sunshine-50 hover:text-coral-600",
                pathname === link.href && "bg-sunshine-50 text-coral-600",
                link.href === "/admissions" &&
                  "ml-1 bg-gradient-to-r from-sunshine-500 to-coral-500 text-white shadow-sm hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={`tel:${schoolInfo.phone.replace(/\s/g, "")}`}
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-slate-700")}
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {schoolInfo.phone}
          </a>
          <Link
            href={hero.primaryCta.href}
            aria-label={hero.primaryCta.ariaLabel}
            className={cn(buttonVariants({ variant: "coral", size: "sm" }))}
          >
            {hero.primaryCta.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border bg-white text-slate-900 lg:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t bg-white lg:hidden">
          <div className="container grid gap-2 py-4">
          {navigation.main.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-3 text-sm font-bold text-slate-700",
                  pathname === link.href && "bg-sunshine-50 text-coral-600",
                  link.href === "/admissions" &&
                    "bg-gradient-to-r from-sunshine-500 to-coral-500 text-center text-white"
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={hero.primaryCta.href}
              aria-label={hero.primaryCta.ariaLabel}
              className={cn(buttonVariants({ variant: "coral" }), "mt-2")}
              onClick={() => setIsOpen(false)}
            >
              {hero.primaryCta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
