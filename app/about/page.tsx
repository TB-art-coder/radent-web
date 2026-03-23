import { ArrowLeft, Sparkles, CheckCircle, Target, Users, Shield } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-5 glass-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Rad<span className="gradient-text">ent</span>
            </span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium"
          >
            <ArrowLeft size={16} />
            Ana Sayfaya Dön
          </Link>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="pt-40 pb-24 relative z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-5 animate-fade-in-up">
              <Users size={14} />
              Hakkımızda
            </div>
            <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              Biz <span className="gradient-text">Kimiz?</span>
            </h1>
          </div>

          <div className="space-y-12 backdrop-blur-md relative z-10 glass rounded-3xl p-8 md:p-12 border border-white/10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Sparkles className="text-purple-400" />
                Radent AI
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Radent AI, diş kliniklerinin dijital dönüşümünü hızlandırmak için kurulmuş bir yapay zeka ve otomasyon şirketidir. Türkiye'nin ilk diş kliniği odaklı AI platformu olarak, kliniklerin 7/24 kesintisiz çalışmasını sağlıyoruz.
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Target className="text-blue-400" />
                Misyonumuz
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                Güncellenen dünyada güncellenmesi gereken alanları tespit edip onları modern teknolojiye entegre etmek. Diş kliniklerinin yapay zeka gücüyle büyümesini sağlamak.
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            <section>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Shield className="text-teal-400" />
                Neden Radent AI?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Diş kliniklerine özel, sektörü anlayan bir ekip",
                  "48 saat içinde kurulum",
                  "7/24 teknik destek",
                  "KVKK uyumlu altyapı"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                    <CheckCircle className="text-green-400 shrink-0 mt-0.5" size={20} />
                    <span className="text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
