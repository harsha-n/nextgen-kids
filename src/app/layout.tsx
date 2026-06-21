import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SEOJsonLd } from "@/components/seo/SEOJsonLd";
import { getSchoolConfig } from "@/lib/runtime-config";
import { generatePageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ef6f61"
};

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSchoolConfig();
  return generatePageMetadata("home", config);
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await getSchoolConfig();

  return (
    <html lang="en">
      <body>
        <SEOJsonLd config={config} />
        <Navbar config={config} />
        <main>{children}</main>
        <Footer config={config} />
        <Analytics />
      </body>
    </html>
  );
}
