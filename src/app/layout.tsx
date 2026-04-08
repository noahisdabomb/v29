import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Archivo } from "next/font/google";
import localFont from "next/font/local";
import LenisProvider from "@/components/layout/LenisProvider";
import Loader from "@/components/layout/Loader";
import SpotlightLayer from "@/components/layout/SpotlightLayer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const neueCorpExtended = localFont({
  src: "./fonts/PPNeueCorp-ExtendedUltrabold.otf",
  variable: "--font-nc-extended",
  weight: "800",
  display: "swap",
});

const neueCorpNormal = localFont({
  src: "./fonts/PPNeueCorp-NormalMedium.otf",
  variable: "--font-nc-normal",
  weight: "500",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noah Williams | Creative Director. Strategy to Final Files.",
  description:
    "Bangkok-based creative director. 15 years on Coca-Cola, Toyota, Delta, Orangetheory. You send a brief at 5pm. By 7am, the campaign's ready.",
  metadataBase: new URL("https://noahisdabomb.com"),
  twitter: {
    card: "summary_large_image",
    title: "Noah Williams | Creative Director. Strategy to Final Files.",
    description:
      "Your brief at 5pm becomes a campaign by 7am. One creative director, 15 years on Coca-Cola and Toyota, working overnight from Bangkok.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} ${neueCorpExtended.variable} ${neueCorpNormal.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Noah Williams',
              jobTitle: 'Creative Director',
              url: 'https://noahisdabomb.com',
              sameAs: ['https://linkedin.com/in/noahisdabomb'],
              worksFor: { '@type': 'Organization', name: 'Independent' },
              knowsAbout: [
                'Creative Direction',
                'Brand Strategy',
                'Campaign Development',
                'Film Production',
              ],
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Bangkok',
                addressCountry: 'TH',
              },
            }),
          }}
        />
        <SpotlightLayer />
        <Loader />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
