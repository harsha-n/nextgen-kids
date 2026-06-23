import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
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
        <SiteChrome config={config}>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
