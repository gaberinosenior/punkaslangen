import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PRODUCT } from "@/lib/product";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-roobert",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${PRODUCT.name} — ${PRODUCT.tagline}`,
    template: `%s — ${PRODUCT.name}`,
  },
  description: PRODUCT.description,
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    title: PRODUCT.name,
    description: PRODUCT.tagline,
    locale: "sv_SE",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone font-sans text-carbon">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
