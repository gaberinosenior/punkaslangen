import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import {
  defaultDescription,
  defaultTitle,
  graphJsonLd,
  ogImage,
} from "@/lib/seo";
import { publicSiteUrl } from "@/lib/site";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-roobert",
  display: "swap",
});

const site = publicSiteUrl();

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: `%s — Punkaslangen`,
  },
  description: defaultDescription,
  metadataBase: new URL(site),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    locale: "sv_SE",
    type: "website",
    siteName: "Punkaslangen",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: [ogImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone font-sans text-carbon">
        <JsonLd data={graphJsonLd([])} />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
