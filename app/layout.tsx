import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PRODUCT } from "@/lib/product";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-editorial-new",
  display: "swap",
});

const grotesk = Inter({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-founders-grotesk",
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
    <html
      lang="sv"
      className={`${display.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-cream text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
