"use client";

import { useState, useEffect } from "react";
import { Sparkles, MessageCircle, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";

export default function BlogPost() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-dark border-b border-white/5 py-3" : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Rad<span className="gradient-text">ent</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="/blog" className="text-white font-medium transition-colors">Blog</Link>
          </div>
          <Link href="/#contact" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition-all text-sm font-medium">
            <MessageCircle size={14} /> Demo Al
          </Link>
        </div>
      </nav>

      <div className="pt-40 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8">
            <ArrowLeft size={16} /> Blog'a Dön
          </Link>

          <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight mb-6">
            7/24 Çalışan Bir Klinik Nasıl Olur?
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-white/50 mb-12 border-b border-white/10 pb-8">
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Mart 2025</span>
          </div>

          <div className="glass rounded-3xl p-8 md:p-12 border border-white/10 text-white/80 text-lg leading-relaxed space-y-6">
            <p>Kliniğiniz gece 23:00'te kapanıyor. Ama hasta o saatte randevu almak istiyor. Ne oluyor? Hasta başka bir kliniğe gidiyor.</p>
            <p>7/24 çalışan bir klinik için üç şey yeterli: WhatsApp botu, otomatik takvim entegrasyonu ve akıllı hatırlatma sistemi. Bu üç sistem bir arada çalıştığında kliniğiniz siz uyurken bile randevu alıyor.</p>
            <p>Radent AI ile 48 saat içinde kliniğiniz 7/24 aktif hale geliyor.</p>
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/#contact" className="whatsapp-btn inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg">
              <MessageCircle size={20} /> Hemen Demo Al
            </Link>
          </div>
        </div>
      </div>
      
      <ChatWidget />
    </div>
  );
}
