import type { Metadata } from "next";
import { schoolConfig, type PageSeo } from "@/data/school.config";

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const domain = schoolConfig.schoolInfo.domain.replace(/\/$/, "");
  return `${domain}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getPageSeo(pageKey: keyof typeof schoolConfig.seo.pages): PageSeo {
  return schoolConfig.seo.pages[pageKey] ?? schoolConfig.seo.pages.home;
}

export function generatePageMetadata(pageKey: keyof typeof schoolConfig.seo.pages): Metadata {
  const page = getPageSeo(pageKey);
  const title =
    pageKey === "home"
      ? schoolConfig.seo.defaultTitle
      : schoolConfig.seo.titleTemplate.replace("%s", page.title);
  const description = page.description || schoolConfig.seo.defaultDescription;
  const canonical = absoluteUrl(page.path);
  const ogImage = absoluteUrl(page.ogImage || schoolConfig.seo.ogImage);

  return {
    title,
    description,
    keywords: page.keywords,
    icons: {
      icon: schoolConfig.schoolInfo.favicon,
      apple: "/apple-icon.png"
    },
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: schoolConfig.schoolInfo.name,
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 901,
          alt: `${schoolConfig.schoolInfo.name} preschool`
        }
      ],
      locale: "en_IN",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage]
    },
    robots: {
      index: true,
      follow: true
    }
  };
}

export function getJsonLd() {
  const { schoolInfo } = schoolConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["Preschool", "EducationalOrganization", "LocalBusiness"],
    name: schoolInfo.name,
    description: schoolInfo.description,
    url: schoolInfo.domain,
    telephone: schoolInfo.phone,
    email: schoolInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: schoolInfo.address,
      addressLocality: schoolInfo.city,
      addressCountry: "IN"
    },
    areaServed: schoolInfo.nearbyAreas.map((area) => ({
      "@type": "Place",
      name: area
    })),
    foundingDate: schoolInfo.establishedYear,
    openingHours: schoolInfo.timings,
    image: absoluteUrl(schoolConfig.seo.ogImage),
    logo: absoluteUrl(schoolInfo.logo.src),
    sameAs: schoolInfo.socialLinks.map((link) => link.href),
    makesOffer: schoolConfig.programs.items.map((program) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "EducationalOccupationalProgram",
        name: program.title,
        description: program.description,
        educationalProgramMode: "Onsite"
      }
    }))
  };
}
