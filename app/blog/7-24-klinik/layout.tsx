import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7/24 Çalışan Bir Klinik Nasıl Olur? — Radent AI Blog",
  description: "Mesai saatleri dışında bile hastalarınıza hizmet vermek artık hayal değil. Yapay zeka destekli asistanlar ile kliniğinizin kapılarını dijitalde hiç kapatmayın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
