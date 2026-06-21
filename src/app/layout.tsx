import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { SEOJsonLd } from "@/components/seo/SEOJsonLd";
import { schoolConfig } from "@/data/school.config";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata("home");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ef6f61"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SEOJsonLd />
        <Navbar config={schoolConfig} />
        <main>{children}</main>
        <Footer config={schoolConfig} />
      </body>
    </html>
  );
}
