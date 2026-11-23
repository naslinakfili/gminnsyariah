import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hotel GM Inn Syariah — Banda Aceh",
  description:
    "Hotel syariah nyaman dan strategis di Peunayong, pusat kota Banda Aceh. Berjarak 700 meter dari Masjid Raya Baiturrahman dengan akses mudah ke kuliner Aceh dan Rooftop Coffee & Food.",
  // Demo guard: set index and follow to true once the site is ready for production launch.
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${cormorant.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#1B2223]">
        {children}
      </body>
    </html>
  );
}
