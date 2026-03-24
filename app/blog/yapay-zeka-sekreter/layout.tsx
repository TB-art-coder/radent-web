import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yapay Zeka Sekreter mi, İnsan Sekreter mi? — Radent AI Blog",
  description: "Yapay zeka asistanlar insanların yerini mi alacak, yoksa onların işini mi kolaylaştıracak? İki farklı yaklaşımın güçlü ve zayıf yönlerini kliniğiniz için karşılaştırdık.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
