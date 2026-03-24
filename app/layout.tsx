import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radent AI — Diş Kliniklerine Özel Yapay Zeka Asistanı",
  description: "WhatsApp randevu botu, Google Takvim entegrasyonu ve tam otomasyon ile kliniğiniz 7/24 çalışır. 48 saat içinde kurulum. Ücretsiz demo alın.",
  keywords: "diş kliniği randevu sistemi, diş kliniği otomasyon, whatsapp randevu botu, diş kliniği yapay zeka, klinik yönetim sistemi",
  openGraph: {
    title: "Radent AI — Diş Kliniklerine Özel Yapay Zeka",
    description: "Kliniğinizi 48 saatte dönüştürün. WhatsApp botu, Google Takvim entegrasyonu ve tam otomasyon.",
    url: "https://www.radentai.co",
    type: "website",
  },
  alternates: {
    canonical: "https://www.radentai.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
