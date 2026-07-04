import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Script from "next/script";

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
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-F5V1L1NL7T"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-F5V1L1NL7T');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '982401061452177');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=982401061452177&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}

