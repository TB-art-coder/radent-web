import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diş Kliniklerinde Dijital Dönüşüm: Nereden Başlamalı? — Radent AI Blog",
  description: "Geleneksel yöntemlerden dijital sistemlere geçiş süreci göz korkutucu olabilir. Ancak doğru planlama ve teknoloji seçimi ile bu dönüşümü pürüzsüz hale getirebilirsiniz.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
