"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import type { SchoolConfig } from "@/data/school.config";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SEOJsonLd } from "@/components/seo/SEOJsonLd";

type SiteChromeProps = {
  children: ReactNode;
  config: SchoolConfig;
};

export function SiteChrome({ children, config }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SEOJsonLd config={config} />
      <Navbar config={config} />
      <main>{children}</main>
      <Footer config={config} />
    </>
  );
}
