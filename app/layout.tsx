import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from 'sonner';
import PageViewTrackerWrapper from "@/components/PageViewTrackerWrapper";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.uijpbafang.org'),
  title: {
    default: 'UIJP2 - Université Internationale Jean Paul II de Bafang',
    template: '%s | UIJP2'
  },
  description: "Université Internationale Jean Paul II de Bafang — Science et conscience pour un monde meilleur.",
  openGraph: {
    title: 'UIJP2 - Université Internationale Jean Paul II de Bafang',
    description: "Université Internationale Jean Paul II de Bafang — Science et conscience pour un monde meilleur.",
    url: 'https://www.uijpbafang.org',
    siteName: 'UIJP2',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCrash = process.env.CRASH === 'true';

  if (isCrash) {
    return (
      <html lang="fr" className="dark">
        <body
          className={`${montserrat.variable} ${inter.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="fr">
      <body
        className={`${montserrat.variable} ${inter.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "UIJP2 - Université Internationale Jean Paul II",
              "alternateName": ["UIJP Bafang", "UIJP2"],
              "url": "https://www.uijpbafang.org/"
            })
          }}
        />
        <Toaster />
        <PageViewTrackerWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
