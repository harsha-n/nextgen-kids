import type { Metadata } from "next";
import { schoolConfig, type PageSeo, type SchoolConfig } from "@/data/school.config";

export function absoluteUrl(path = "/", config: SchoolConfig = schoolConfig) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  const domain = config.schoolInfo.domain.replace(/\/$/, "");
  return `${domain}${path.startsWith("/") ? path : `/${path}`}`;
}

export function getPageSeo(pageKey: string, config: SchoolConfig = schoolConfig): PageSeo {
  return config.seo.pages[pageKey] ?? config.seo.pages.home;
}

export function generatePageMetadata(
  pageKey: string,
  config: SchoolConfig = schoolConfig
): Metadata {
  const page = getPageSeo(pageKey, config);
  const title =
    pageKey === "home"
      ? config.seo.defaultTitle
      : config.seo.titleTemplate.replace("%s", page.title);
  const description = page.description || config.seo.defaultDescription;
  const canonical = absoluteUrl(page.path, config);
  const ogImage = absoluteUrl(page.ogImage || config.seo.ogImage, config);

  return {
    title,
    description,
    keywords: page.keywords,
    icons: {
      icon: config.schoolInfo.favicon,
      apple: "/apple-icon.png"
    },
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: config.schoolInfo.name,
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 901,
          alt: `${config.schoolInfo.name} preschool`
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

export function getJsonLd(config: SchoolConfig = schoolConfig) {
  const { schoolInfo } = config;

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
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.8051875",
      longitude: "83.3585625"
    },
    areaServed: schoolInfo.nearbyAreas.map((area) => ({
      "@type": "Place",
      name: area
    })),
    foundingDate: schoolInfo.establishedYear,
    openingHours: schoolInfo.timings,
    image: absoluteUrl(config.seo.ogImage, config),
    logo: absoluteUrl(schoolInfo.logo.src, config),
    sameAs: schoolInfo.socialLinks.filter((link) => link.visible).map((link) => link.href),
    makesOffer: config.programs.items.map((program) => ({
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

export function getFaqJsonLd(config: SchoolConfig = schoolConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faqs.items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function getBreadcrumbJsonLd(pageKey: string, config: SchoolConfig = schoolConfig) {
  const page = getPageSeo(pageKey, config);
  const homeUrl = absoluteUrl("/", config);
  const pageUrl = absoluteUrl(page.path, config);

  const breadcrumbs = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: homeUrl
    }
  ];

  if (pageKey !== "home") {
    breadcrumbs.push({
      "@type": "ListItem",
      position: 2,
      name: page.title,
      item: pageUrl
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs
  };
}
