import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from 'sonner';
import PageViewTrackerWrapper from "@/components/PageViewTrackerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'UIJP2',
  description: "Université Internationale Jean Paul II - Bafang",
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
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100 min-h-screen`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <PageViewTrackerWrapper />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
