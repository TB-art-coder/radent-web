import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Radent Blog — Yapay Zeka ve Otomasyon İpuçları",
  description: "Diş kliniklerini geleceğe taşıyan yapay zeka çözümleri, otomasyon sistemleri ve büyüme stratejileri hakkında en güncel yazılar.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
