"use client";

import { useState, useEffect } from "react";
import { Sparkles, MessageCircle, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import ChatWidget from "@/components/ChatWidget";

const blogPosts = [
  {
    id: 1,
    slug: "randevu-kaybi",
    title: "Diş Kliniklerinde Randevu Kaybının 5 Nedeni ve Çözümü",
    excerpt: "Hastaların randevularına gelmemesi kliniklerin en büyük sorunlarından biridir. Otomatik hatırlatıcılar ve kolay iptal/erteleme seçenekleri ile bu kaybı nasıl minimize edeceğinizi keşfedin.",
    date: "Mart 2025",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=800&auto=format&fit=crop",
    category: "Yönetim"
  },
  {
    id: 2,
    slug: "whatsapp-randevu",
    title: "WhatsApp ile Randevu Almanın Kliniğinize Faydaları",
    excerpt: "Hastalarınızın %80'i telefonla aramak yerine mesajlaşmayı tercih ediyor. WhatsApp entegrasyonu sayesinde saniyeler içinde onaysız beklemeden randevu oluşturmanın avantajları.",
    date: "Mart 2025",
    readTime: "3 dk okuma",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    category: "İletişim"
  },
  {
    id: 3,
    slug: "7-24-klinik",
    title: "7/24 Çalışan Bir Klinik Nasıl Olur?",
    excerpt: "Mesai saatleri dışında bile hastalarınıza hizmet vermek artık hayal değil. Yapay zeka destekli asistanlar ile kliniğinizin kapılarını dijitalde hiç kapatmayın.",
    date: "Mart 2025",
    readTime: "5 dk okuma",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=800&auto=format&fit=crop",
    category: "Otomasyon"
  },
  {
    id: 4,
    slug: "dijital-donusum",
    title: "Diş Kliniklerinde Dijital Dönüşüm: Nereden Başlamalı?",
    excerpt: "Geleneksel yöntemlerden dijital sistemlere geçiş süreci göz korkutucu olabilir. Ancak doğru planlama ve teknoloji seçimi ile bu dönüşümü pürüzsüz hale getirebilirsiniz.",
    date: "Mart 2025",
    readTime: "6 dk okuma",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    category: "Teknoloji"
  },
  {
    id: 5,
    slug: "yapay-zeka-sekreter",
    title: "Yapay Zeka Sekreter mi, İnsan Sekreter mi?",
    excerpt: "Yapay zeka asistanlar insanların yerini mi alacak, yoksa onların işini mi kolaylaştıracak? İki farklı yaklaşımın güçlü ve zayıf yönlerini kliniğiniz için karşılaştırdık.",
    date: "Mart 2025",
    readTime: "4 dk okuma",
    image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop",
    category: "Yapay Zeka"
  }
];

export default function BlogPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      </div>

      {/* Navbar */}
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
            <span className="text-xl font-bold tracking-tight">
              Rad<span className="gradient-text">ent</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
            <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
            <Link href="/blog" className="text-white font-medium transition-colors">Blog</Link>
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

      <main className="relative z-10 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-6">
              <Sparkles size={14} />
              Gelişmeler ve İpuçları
            </div>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6">
              Radent <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              Diş kliniklerini geleceğe taşıyan yapay zeka çözümleri, otomasyon sistemleri ve büyüme stratejileri hakkında en güncel yazılar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Link 
                href={`/blog/${post.slug}`}
                key={post.id} 
                className="group glass rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 cursor-pointer overflow-hidden hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                  {post.id === 2 ? (
                    <div className="w-full h-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <MessageCircle size={64} className="text-white relative z-10" />
                    </div>
                  ) : (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md border border-white/20 text-white">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                    Devamını Oku 
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* CTA Box */}
      <section className="relative z-10 py-16 mb-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="glass-dark rounded-3xl p-10 border border-purple-500/30 text-center relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-purple-600/10 blur-2xl pointer-events-none" />
            <h2 className="text-3xl font-bold mb-4">Yeni yazıları ilk siz okuyun</h2>
            <p className="text-white/60 mb-6">En güncel ipuçları ve sektörel gelişmeler mail kutunuza gelsin.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm flex-1 focus:outline-none focus:border-purple-500/50"
              />
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 relative z-10 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <span className="text-xl font-bold">Rad<span className="gradient-text">ent</span></span>
            </Link>
            
            <div className="flex items-center gap-6 text-sm text-white/50">
              <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
              <Link href="/about" className="hover:text-white transition-colors">Hakkımızda</Link>
              <Link href="/blog" className="text-white font-medium">Blog</Link>
            </div>
            
            <div className="text-xs text-white/30">
              © 2025 Radent AI. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
      
      <ChatWidget />
    </div>
  );
}
