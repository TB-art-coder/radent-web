"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Calendar,
  Bot,
  Zap,
  Shield,
  BarChart3,
  ChevronRight,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  ArrowRight,
  Sparkles,
  Clock,
  Users,
  TrendingUp,
  RefreshCw,
  Bell,
  Settings,
  Database,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import ChatWidget from "@/components/ChatWidget";

// ── Orbital Timeline Data ─────────────────────────────────────────────────────
const orbitalData = [
  {
    id: 1,
    title: "WhatsApp Botu",
    date: "7/24 Aktif",
    content:
      "Hastalar WhatsApp üzerinden randevu alır, iptal eder ve bilgi sorgular. Bot saniyeler içinde akıllıca yanıt verir.",
    category: "İletişim",
    icon: MessageCircle,
    relatedIds: [2, 3],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Google Takvim",
    date: "Anlık Sync",
    content:
      "Randevular otomatik olarak kliniğinizin Google Takvimine eklenir. Doktor ve personel takvimlerini senkronize eder.",
    category: "Entegrasyon",
    icon: Calendar,
    relatedIds: [1, 4],
    status: "completed" as const,
    energy: 95,
  },
  {
    id: 3,
    title: "AI Asistan",
    date: "GPT-4 Güçlü",
    content:
      "Hasta sorularını anlayan, klinik protokollerinizi öğrenen ve kişiselleştirilmiş yanıtlar üreten yapay zeka.",
    category: "Yapay Zeka",
    icon: Bot,
    relatedIds: [1, 5],
    status: "completed" as const,
    energy: 98,
  },
  {
    id: 4,
    title: "Tam Otomasyon",
    date: "No-Code",
    content:
      "Randevu hatırlatmaları, anket gönderimi ve CRM senkronizasyonu için 500+ entegrasyon ile güçlü iş akışları.",
    category: "Otomasyon",
    icon: RefreshCw,
    relatedIds: [2, 6],
    status: "in-progress" as const,
    energy: 80,
  },
  {
    id: 5,
    title: "Bildirimler",
    date: "Anlık",
    content:
      "Hasta randevusu, iptali veya acil durumunda kliniğinize anlık bildirim gönderilir. Hiçbir şeyi kaçırmayın.",
    category: "Bildirim",
    icon: Bell,
    relatedIds: [3, 4],
    status: "in-progress" as const,
    energy: 75,
  },
  {
    id: 6,
    title: "Analitik Panel",
    date: "Gerçek Zamanlı",
    content:
      "Hasta eğilimleri, randevu oranları ve bot performansını gösteren kapsamlı dashboard ile veriye dayalı kararlar alın.",
    category: "Analitik",
    icon: BarChart3,
    relatedIds: [4, 1],
    status: "pending" as const,
    energy: 60,
  },
];

// ── Features ────────────────────────────────────────────────────────────────
const features = [
  {
    icon: MessageCircle,
    color: "from-green-500 to-emerald-600",
    glow: "rgba(34,197,94,0.2)",
    title: "WhatsApp Randevu Botu",
    desc: "Hastalarınız WhatsApp'tan saniyeler içinde randevu alır. Bot, kliniğinizin müsait saatlerini kontrol eder ve otomatik onay gönderir.",
    points: [
      "7/24 kesintisiz hizmet",
      "Türkçe doğal dil anlama",
      "Otomatik onay & hatırlatma",
      "Çakışma kontrolü",
    ],
  },
  {
    icon: Calendar,
    color: "from-blue-500 to-indigo-600",
    glow: "rgba(59,130,246,0.2)",
    title: "Google Takvim Entegrasyonu",
    desc: "Alınan her randevu anında Google Takviminize yansır. Doktorlarınız ve personel kendi takvimlerini gerçek zamanlı görür.",
    points: [
      "Anlık iki yönlü senkronizasyon",
      "Çoklu doktor takvimi",
      "Tatil & izin yönetimi",
      "Tekrarlayan randevular",
    ],
  },
  {
    icon: RefreshCw,
    color: "from-purple-500 to-violet-600",
    glow: "rgba(168,85,247,0.2)",
    title: "Tam Otomasyon",
    desc: "Randevu hatırlatması, anket, SMS ve daha fazlası için görsel iş akışlarıyla kliniğinizin tüm süreçlerini otomatize edin.",
    points: [
      "500+ uygulama entegrasyonu",
      "Kodsuz iş akışı tasarımı",
      "Anket & geri bildirim",
      "CRM senkronizasyonu",
    ],
  },
  {
    icon: Shield,
    color: "from-teal-500 to-cyan-600",
    glow: "rgba(20,184,166,0.2)",
    title: "KVKK Uyumlu & Güvenli",
    desc: "Hasta verileriniz şifreli kanallar üzerinden iletilir ve KVKK mevzuatına tam uyumlu altyapıyla korunur.",
    points: [
      "End-to-end şifreleme",
      "KVKK uyumlu veri işleme",
      "Türkiye sunucuları",
      "İzinli pazarlama",
    ],
  },
  {
    icon: Globe,
    color: "from-sky-500 to-cyan-600",
    glow: "rgba(14,165,233,0.2)",
    title: "Sağlık Turizmi & Çoklu Dil",
    desc: "Gelişmiş yapay zeka desteğiyle, hastalarınızla İngilizce, Rusça, Arapça dahil 50+ dilde native ve anında iletişim kurun.",
    points: [
      "Anında akıllı çeviri",
      "Native 50+ dil desteği",
      "Uluslararası randevu",
      "Tercüman maliyetini sıfırla",
    ],
  },
  {
    icon: Settings,
    color: "from-pink-500 to-rose-600",
    glow: "rgba(236,72,153,0.2)",
    title: "Kolay Kurulum & Destek",
    desc: "48 saat içinde kliniğiniz canlıya alınır. Teknik destek ekibimiz her adımda yanınızda. Kurulum sizden değil bizden.",
    points: [
      "48 saat kurulum süresi",
      "Ücretsiz onboarding",
      "7/24 teknik destek",
      "Video eğitim içerikleri",
    ],
  },
];

// ── Stats ────────────────────────────────────────────────────────────────────
const stats = [
  { value: "%94", label: "Randevu Doluluk Oranı", icon: TrendingUp },
  { value: "7/24", label: "Kesintisiz Hizmet", icon: Clock },
  { value: "48s", label: "Kurulum Süresi", icon: Zap },
];

const faqs = [
  {
    q: "Hangi kanallardan çalışıyor?",
    a: "WhatsApp, telefon ve web sitesi üzerinden gelen randevu taleplerini otomatik olarak karşılar. İstek durumunda diğer platformlarla da entegrasyon sağlanabilir."
  },
  {
    q: "Bot yanlış cevap verirse ne olur?",
    a: "Belirsiz durumlarda hasta kliniğinize yönlendirilir. Tüm konuşmalar kayıt altına alınır."
  },
  {
    q: "Kurulum ne kadar sürer?",
    a: "48 saat içinde kliniğiniz canlıya alınır. Kurulum tamamen bizim tarafımızdan yapılır."
  },
  {
    q: "Sözleşme zorunluluğu var mı?",
    a: "Hayır. Bağlayıcı sözleşme yoktur, istediğiniz zaman iptal edebilirsiniz."
  }
];


// ── Main Component ─────────────────────────────────────────────────────────
export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState({ name: "", clinic: "", phone: "", city: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleWhatsAppDemo = () => {
    const message = `Merhaba, Radent AI demo talep ediyorum.
Ad: ${formData.name || "-"}
Klinik: ${formData.clinic || "-"}
Telefon: ${formData.phone || "-"}
Şehir: ${formData.city || "-"}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905546141492?text=${encodedMessage}`, '_blank');
  };
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const isVisible = (id: string) => visibleSections.has(id);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* ── Navbar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-dark border-b border-white/5 py-3" : "py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Rad<span className="gradient-text">ent</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">Nasıl Çalışır</a>
            <a href="#contact" className="hover:text-white transition-colors">İletişim</a>
          </div>

          <a
            href="#contact"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all text-sm font-medium"
          >
            <MessageCircle size={14} />
            Demo Al
          </a>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black border-b border-white/5">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-30 mix-blend-lighten"
          >
            <source src="/radent_reklam_yeni.mp4" type="video/mp4" />
          </video>
          {/* Gradient overlays to ensure text readability & merge cleanly */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-30 mix-blend-overlay"></div>
        </div>

        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/30 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-900/20 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            Kliniğinizi{" "}
            <span className="gradient-text">Yapay Zeka</span>
            <br />
            ile Büyütün
          </h1>

          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            WhatsApp randevu botu, Google Takvim entegrasyonu ve tam otomasyon akışlarıyla
            kliniğiniz 7/24 çalışır. Personel maliyetinizi düşürün, hasta memnuniyetini artırın.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <a
              href="#contact"
              className="whatsapp-btn flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-2xl"
            >
              <MessageCircle size={22} />
              WhatsApp Demo İste
            </a>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-8 py-4 rounded-xl glass border border-white/10 hover:border-white/20 transition-all font-semibold"
            >
              Nasıl Çalışır
              <ChevronRight size={18} />
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center glass rounded-xl px-6 py-4 border border-white/5">
                <span className="text-3xl font-black gradient-text">{s.value}</span>
                <span className="text-xs text-white/50 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating icons */}
        <div className="absolute top-28 left-10 animate-float opacity-30">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 border border-green-500/30 flex items-center justify-center">
            <MessageCircle size={20} className="text-green-400" />
          </div>
        </div>
        <div className="absolute bottom-28 right-10 animate-float opacity-30" style={{ animationDelay: "1s" }}>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Calendar size={20} className="text-blue-400" />
          </div>
        </div>
        <div className="absolute top-1/2 right-16 animate-float opacity-25" style={{ animationDelay: "2s" }}>
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
            <Bot size={16} className="text-purple-400" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-32 relative bg-dot-pattern">
        <div className="max-w-7xl mx-auto px-6">
          <div
            id="feat-header"
            data-animate
            className={`text-center mb-20 transition-all duration-700 ${isVisible("feat-header") ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-5">
              <Zap size={14} />
              Güçlü Özellikler
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Kliniğinizin İhtiyacı Olan{" "}
              <span className="gradient-text">Her Şey</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Randevu yönetiminden hasta iletişimine kadar tüm süreçlerinizi otomatize edin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                id={`feat-${i}`}
                data-animate
                className={`feature-card glass rounded-2xl p-7 border border-white/5 transition-all duration-700 ${isVisible(`feat-${i}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 shadow-lg`}
                  style={{ boxShadow: `0 8px 25px ${f.glow}` }}
                >
                  <f.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{f.desc}</p>
                <ul className="space-y-2">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-white/60">
                      <CheckCircle size={12} className="text-green-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Deep Dive ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/40 via-black to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-sm text-green-400 mb-6">
                <MessageCircle size={14} />
                WhatsApp Randevu Botu
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Hastanız Yazar,
                <br />
                <span className="text-green-400">Bot Halleder</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                WhatsApp Business API ile entegre botumuz, hastanızın mesajını anlar,
                müsait saatleri kontrol eder ve onay mesajı gönderir.
                Sekreteranızın telefona çıkmasına gerek kalmaz.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Clock, text: "Ortalama 8 saniyede randevu onayı" },
                  { icon: Globe, text: "Türkçe doğal dil işleme (NLP)" },
                  { icon: Shield, text: "WhatsApp Business API lisanslı" },
                  { icon: Database, text: "Hasta geçmişi otomatik kayıt" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                      <item.icon size={14} className="text-green-400" />
                    </div>
                    <span className="text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="whatsapp-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold"
              >
                <MessageCircle size={18} />
                Ücretsiz Demo Al
              </a>
            </div>

            {/* Mock Chat UI */}
            <div className="relative">
              <div className="glass-dark rounded-3xl p-2 border border-white/10 shadow-2xl max-w-sm mx-auto animate-glow-pulse">
                {/* Phone header */}
                <div className="bg-green-700/80 rounded-2xl px-4 py-3 flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="text-lg font-bold">R</span>
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Radent Klinik</div>
                    <div className="text-xs text-green-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 inline-block" />
                      çevrimiçi
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="bg-[#0d1117] rounded-xl p-4 space-y-3 text-sm">
                  <div className="flex justify-end">
                    <div className="bg-green-700 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                      <p className="text-white text-xs">Merhaba, yarın için randevu alabilir miyim?</p>
                      <p className="text-green-300 text-[10px] mt-1 text-right">14:22 ✓✓</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#1e2633] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                      <p className="text-white/90 text-xs">Merhaba! 😊 Radent&apos;e hoş geldiniz. Yarın için uygun saatlerimiz:</p>
                      <div className="mt-2 space-y-1">
                        {["09:30", "11:00", "14:30", "16:00"].map((t) => (
                          <div key={t} className="bg-green-600/20 border border-green-500/30 rounded-lg px-3 py-1.5 text-xs text-green-300 cursor-pointer hover:bg-green-600/30 transition-colors">
                            🕐 {t}
                          </div>
                        ))}
                      </div>
                      <p className="text-green-400/60 text-[10px] mt-1">14:22</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-green-700 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[60%]">
                      <p className="text-white text-xs">11:00 olsun lütfen</p>
                      <p className="text-green-300 text-[10px] mt-1 text-right">14:23 ✓✓</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-[#1e2633] rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                      <p className="text-white/90 text-xs">✅ Randevunuz oluşturuldu!</p>
                      <p className="text-white/70 text-xs mt-1">📅 Yarın, 11:00<br />📍 Radent Diş Kliniği<br />🔔 1 saat önce hatırlatırım</p>
                      <p className="text-green-400/60 text-[10px] mt-1">14:23</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 glass rounded-xl px-3 py-2 border border-green-500/30 text-xs text-green-400 flex items-center gap-1.5 shadow-lg">
                <CheckCircle size={12} />
                Randevu Onaylandı!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Google Calendar Deep Dive ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-black to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Calendar Mockup */}
            <div className="relative order-2 md:order-1">
              <div className="glass-dark rounded-3xl p-5 border border-white/10 shadow-2xl max-w-sm mx-auto">
                {/* Calendar header */}
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-bold text-base">Mart 2025</h4>
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-lg glass flex items-center justify-center cursor-pointer hover:bg-white/10">
                      <ChevronRight size={14} className="rotate-180" />
                    </div>
                    <div className="w-7 h-7 rounded-lg glass flex items-center justify-center cursor-pointer hover:bg-white/10">
                      <ChevronRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {["Pt", "Sa", "Ça", "Pe", "Cu", "Ct", "Pz"].map((d) => (
                    <div key={d} className="text-center text-[10px] text-white/40 font-medium py-1">{d}</div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-1">
                  {[...Array(31)].map((_, i) => {
                    const day = i + 1;
                    const hasAppointment = [3, 7, 10, 14, 17, 21, 24, 28].includes(day);
                    const isToday = day === 15;
                    return (
                      <div
                        key={day}
                        className={`aspect-square rounded-lg flex items-center justify-center text-xs relative transition-colors
                          ${isToday ? "bg-blue-600 text-white font-bold" : "hover:bg-white/5"}
                          ${hasAppointment && !isToday ? "ring-1 ring-blue-500/40" : ""}
                        `}
                      >
                        {day}
                        {hasAppointment && !isToday && (
                          <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-400" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Today's appointments */}
                <div className="mt-5 space-y-2">
                  <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-3">Bugünkü Randevular</p>
                  {[
                    { time: "09:00", name: "Ahmet Y.", color: "bg-green-500" },
                    { time: "10:30", name: "Fatma K.", color: "bg-blue-500" },
                    { time: "11:00", name: "Yeni Randevu", color: "bg-purple-500", isNew: true },
                    { time: "14:00", name: "Mehmet A.", color: "bg-amber-500" },
                  ].map((apt) => (
                    <div key={apt.time} className={`flex items-center gap-3 p-2 rounded-lg glass ${apt.isNew ? "border border-purple-500/40 bg-purple-500/5" : ""}`}>
                      <div className={`w-2 h-2 rounded-full ${apt.color} shrink-0`} />
                      <span className="text-xs text-white/40 w-10 shrink-0">{apt.time}</span>
                      <span className={`text-xs flex-1 ${apt.isNew ? "text-purple-300 font-medium" : "text-white/70"}`}>{apt.name}</span>
                      {apt.isNew && <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">WhatsApp</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 glass rounded-xl px-3 py-2 border border-blue-500/30 text-xs text-blue-400 flex items-center gap-1.5 shadow-lg">
                <RefreshCw size={10} className="animate-spin" />
                Anlık senkronizasyon aktif
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-sm text-blue-400 mb-6">
                <Calendar size={14} />
                Google Takvim Entegrasyonu
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Takvim Artık
                <br />
                <span className="text-blue-400">Kendisi Doluyor</span>
              </h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                WhatsApp&apos;tan gelen her randevu, Google Takviminize anında yansır.
                Doktorlarınız kendi Gmail hesabında randevuları görür,
                çakışma riski sıfıra iner.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: RefreshCw, title: "İki Yönlü Sync", desc: "WA ↔ Calendar anlık güncelleme" },
                  { icon: Users, title: "Çok Doktor", desc: "Her doktor kendi takviminde görür" },
                  { icon: Bell, title: "Otomatik Hatırlatma", desc: "Hasta & doktora bildirim" },
                  { icon: Database, title: "Arşiv", desc: "Tüm geçmiş randevular kayıtlı" },
                ].map((item) => (
                  <div key={item.title} className="glass rounded-xl p-4 border border-white/5">
                    <item.icon size={18} className="text-blue-400 mb-2" />
                    <div className="font-semibold text-sm mb-1">{item.title}</div>
                    <div className="text-xs text-white/40">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works (Orbital Timeline) ── */}
      <section id="how-it-works" className="py-24 relative bg-grid-pattern">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-5">
              <Bot size={14} />
              Nasıl Çalışır?
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-5 tracking-tight">
              Radent&apos;in{" "}
              <span className="gradient-text">Otomasyonu</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              Birbirine bağlı tüm sistemlerimizi keşfetmek için orbital haritaya tıklayın.
            </p>
          </div>

          <div className="h-[600px] w-full">
            <RadialOrbitalTimeline timelineData={orbitalData} />
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-black to-blue-950/30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-6">
            <ArrowRight size={14} />
            Hemen Başlayın
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Kliniğinizi{" "}
            <span className="gradient-text">48 Saatte</span>
            <br />
            Dönüştürün
          </h2>

          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Ücretsiz demo isteyin. Uzmanlarımız kliniğinize özel bir demo
            hazırlayıp WhatsApp üzerinden sunsun.
          </p>

          <div className="glass rounded-2xl p-8 border border-white/10 mb-8">
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Adınız"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <input
                type="text"
                placeholder="Klinik Adı"
                value={formData.clinic}
                onChange={(e) => setFormData({ ...formData, clinic: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <input
                type="tel"
                placeholder="WhatsApp Numaranız"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
              <input
                type="text"
                placeholder="Şehir"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <button 
              onClick={handleWhatsAppDemo}
              className="w-full whatsapp-btn flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-transform active:scale-[0.98]"
            >
              <MessageCircle size={22} />
              WhatsApp'tan Demo Talep Et
            </button>
            <p className="text-center text-white/60 text-sm mt-5">
              Ya da sağ alttaki AI asistanımızla hemen konuşun 👇
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/40">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Ücretsiz kurulum</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> Bağlayıcı sözleşme yok</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} className="text-green-400" /> 48 saat canlı</span>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-black pointer-events-none" />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-5 tracking-tight">
              Sıkça Sorulan <span className="gradient-text">Sorular</span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="glass rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full glass border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 ${openFaq === index ? "rotate-90 bg-white/10" : ""}`}>
                    <ChevronRight size={16} />
                  </div>
                </button>
                <div 
                  className={`px-6 text-white/60 leading-relaxed overflow-hidden transition-all duration-300 ${
                    openFaq === index ? "max-h-40 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <span className="text-xl font-bold">Rad<span className="gradient-text">ent</span></span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                Diş kliniklerine özel yapay zeka asistanı ve otomasyon çözümleri.
                Türkiye&apos;nin en akıllı klinik yönetim platformu.
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
                  <li key={item}><a href="#" className="hover:text-white/70 transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-4">Şirket</h4>
              <ul className="space-y-2 text-sm text-white/40">
                <li><a href="/about" className="hover:text-white/70 transition-colors">Hakkımızda</a></li>
                {[
                  { name: "Blog", href: "/blog" },
                  { name: "Kariyer", href: "/kariyer" },
                  { name: "Gizlilik Politikası", href: "/gizlilik" }
                ].map((item) => (
                  <li key={item.name}><a href={item.href} className="hover:text-white/70 transition-colors">{item.name}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <span>© 2026 Radent AI. Tüm hakları saklıdır.</span>
            <span>Türkiye&apos;de geliştirildi 🇹🇷</span>
          </div>
        </div>
      </footer>
      {/* ── Chat Widget ── */}
      <ChatWidget />
    </div>
  );
}
