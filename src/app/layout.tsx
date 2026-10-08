import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { ConversionTracking } from "@/components/conversion-tracking";
import { SiteBackground } from "@/components/site-background";
import { profile } from "@/data/portfolio";
import "./globals.css";
const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: { default: `${profile.name} — Shopify Developer & Media Buyer`, template: `%s | ${profile.name}` }, description: profile.description,
  alternates: { canonical: "/" }, authors: [{ name: profile.name }],
  openGraph: { type: "website", locale: "en_US", siteName: `${profile.name} · Development & Growth`, title: `${profile.name} — ${profile.headline}`, description: profile.description, url: "/" },
  twitter: { card: "summary_large_image", title: `${profile.name} — Shopify Developer & Media Buyer`, description: profile.description },
  robots: { index: true, follow: true }, icons: { icon: "/icon.svg" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable}><body><SiteBackground /><ConversionTracking /><a href="#main-content" className="skip-link">Skip to content</a><Navigation />{children}<Footer /></body></html>;
}
