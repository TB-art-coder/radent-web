import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp ile Randevu Almanın Kliniğinize Faydaları — Radent AI Blog",
  description: "Hastalarınızın %80'i telefonla aramak yerine mesajlaşmayı tercih ediyor. WhatsApp entegrasyonu sayesinde saniyeler içinde onaysız beklemeden randevu oluşturmanın avantajları.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
