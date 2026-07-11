import { Manrope, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { CookieNotice } from "@/components/cookies/CookieNotice";
import { CookiePreferencesDialog } from "@/components/cookies/CookiePreferencesDialog";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteScrollManager } from "@/components/layout/RouteScrollManager";
import { siteConfig } from "@/lib/data/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-black text-white">
        <CookieConsentProvider>
          <RouteScrollManager />
          <div className="fixed inset-0 bg-grid opacity-30 pointer-events-none z-0" />
          <div className="relative z-10">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
          <CookieNotice />
          <CookiePreferencesDialog />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
