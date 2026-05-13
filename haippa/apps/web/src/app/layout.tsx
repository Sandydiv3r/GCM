import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: { default: "HAIPPA — Discover Authentic African Art", template: "%s | HAIPPA" },
  description: "A curated marketplace connecting verified African artists with buyers worldwide.",
  keywords: ["African art", "African artists", "buy African art", "African marketplace"],
  openGraph: {
    type: "website", locale: "en_GB", siteName: "HAIPPA",
    url: process.env.NEXT_PUBLIC_BASE_URL,
    title: "HAIPPA — Discover Authentic African Art",
    description: "A curated marketplace connecting verified African artists with buyers worldwide.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-sand-100 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
