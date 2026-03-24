import { Sparkles, MessageCircle, Briefcase, Mail, Phone } from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";

export default function KariyerPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5 py-3 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Rad<span className="gradient-text">ent</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/#features" className="hover:text-white transition-colors">Özellikler</Link>
            <Link href="/#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır</Link>
            <Link href="/#contact" className="hover:text-white transition-colors">İletişim</Link>
          </div>

          <Link
            href="/#contact"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all text-sm font-medium"
          >
            <MessageCircle size={14} />
            Demo Al
          </Link>
        </div>
      </nav>

      {/* ── Hero Section ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-grid-pattern">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-white/5 border border-white/10 mb-8 animate-fade-in-up shadow-2xl backdrop-blur-md">
            <Briefcase size={48} className="text-purple-400" />
          </div>

          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Radent AI'de <span className="gradient-text">Kariyer</span>
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold mb-10 text-white/80 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            Geleceği birlikte inşa ediyoruz
          </h2>

          <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 mb-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <p className="text-lg text-white/70 leading-relaxed mb-10 pb-6 border-b border-white/10">
              Şu an aktif bir iş ilanımız bulunmamaktadır. Ancak yetenekli insanlarla tanışmaktan her zaman mutluluk duyarız. CV'nizi demo@radentai.co adresine gönderebilirsiniz.
            </p>

            <a
              href="mailto:demo@radentai.co"
              className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-lg transition-all shadow-lg hover:shadow-purple-500/25 active:scale-[0.98]"
            >
              <Mail size={22} />
              Bize Ulaşın
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-white/5 bg-black relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles size={16} className="text-white" />
                </div>
                <span className="text-xl font-bold">Rad<span className="gradient-text">ent</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Diş kliniklerine özel yapay zeka asistanı ve otomasyon çözümleri.
                Türkiye'nin en akıllı klinik yönetim platformu.
              </p>
              <div className="flex items-center gap-3 mt-5">
                <a href="mailto:demo@radentai.co" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                  <Mail size={14} />
                  demo@radentai.co
                </a>
                <span className="text-white/20">•</span>
                <a href="tel:+905546141492" className="flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors">
                  <Phone size={14} />
                  +90 554 614 14 92
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4">Ürün</h4>
              <ul className="space-y-2 text-sm text-white/40">
                {["WhatsApp Botu", "Google Takvim", "Tam Otomasyon", "Analitik Panel"].map((item) => (
                  <li key={item}><Link href="/#" className="hover:text-white/70 transition-colors">{item}</Link></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><Link href="/about" className="hover:text-white/70 transition-colors">Hakkımızda</Link></li>
                {[
                  { name: "Blog", href: "/blog" },
                  { name: "Kariyer", href: "/kariyer" },
                  { name: "Gizlilik Politikası", href: "#" }
                ].map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-white/70 transition-colors">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <span>© 2026 Radent AI. Tüm hakları saklıdır.</span>
            <span>Türkiye'de geliştirildi 🇹🇷</span>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
