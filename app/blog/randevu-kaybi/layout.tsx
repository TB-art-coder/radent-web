import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diş Kliniklerinde Randevu Kaybının 5 Nedeni ve Çözümü — Radent AI Blog",
  description: "Hastaların randevularına gelmemesi kliniklerin en büyük sorunlarından biridir. Otomatik hatırlatıcılar ve kolay iptal/erteleme seçenekleri ile bu kaybı nasıl minimize edeceğinizi keşfedin.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
