"use client";

import { ArrowLeft, Sparkles, Shield, Mail, Globe, MapPin, Building, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 py-5 glass-dark border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Rad<span className="gradient-text">ent</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-all text-sm font-medium"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{t("nav.home")}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Content ── */}
      <div className="pt-40 pb-24 relative z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-500/30 text-sm text-purple-300 mb-5 animate-fade-in-up">
              <Shield size={14} />
              {lang === 'en' ? "Privacy Policy" : "Gizlilik Politikası"}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              {lang === 'en' ? "Privacy " : "Gizlilik "}
              <span className="gradient-text">{lang === 'en' ? "Policy & KVKK" : "Politikası ve KVKK"}</span>
            </h1>
            <p className="text-white/50 text-sm md:text-base max-w-xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
              {lang === 'en' 
                ? "Last updated: March 2025" 
                : "Son Güncelleme: Mart 2025"}
            </p>
          </div>

          <div className="space-y-10 backdrop-blur-md relative z-10 glass rounded-3xl p-8 md:p-12 border border-white/10 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
            
            {/* 1. Giriş / Introduction */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-purple-400">
                <Building size={20} />
                {lang === 'en' ? "1. Data Controller" : "1. Veri Sorumlusu"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {lang === 'en'
                  ? "As Radent AI ('Company'), we process the personal data of our visitors on our website (radentai.co) in accordance with the Law on the Protection of Personal Data (KVKK) and relevant legislation."
                  : "Radent AI ('Şirket') olarak, web sitemiz (radentai.co) üzerindeki ziyaretçilerimizin kişisel verilerini Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuata uygun olarak işlemekteyiz."}
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 2. Toplanan Veriler / Collected Data */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-blue-400">
                <Users size={20} />
                {lang === 'en' ? "2. Collected Personal Data" : "2. Toplanan Kişisel Veriler"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                {lang === 'en'
                  ? "We collect the following personal data when you fill out our free demo request forms or contact us directly:"
                  : "Ücretsiz demo talep formlarımızı doldurduğunuzda veya bizimle doğrudan iletişime geçtiğinizde aşağıdaki kişisel verilerinizi topluyoruz:"}
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/60 text-sm pl-2">
                <li>{lang === 'en' ? "Name and Surname" : "Adınız ve Soyadınız"}</li>
                <li>{lang === 'en' ? "E-mail Address" : "E-posta Adresiniz"}</li>
                <li>{lang === 'en' ? "Phone Number (WhatsApp contact)" : "Telefon Numaranız (WhatsApp iletişimi için)"}</li>
                <li>{lang === 'en' ? "Clinic Name and City" : "Klinik Adı ve Şehir Bilgisi"}</li>
              </ul>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 3. Kullanım Amacı / Purpose of Use */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-teal-400">
                <ArrowRight size={20} />
                {lang === 'en' ? "3. Purposes of Processing Personal Data" : "3. Kişisel Verilerin İşlenme Amaçları"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                {lang === 'en'
                  ? "Your collected personal data is processed for the following limited purposes:"
                  : "Toplanan kişisel verileriniz aşağıdaki sınırlı amaçlarla işlenmektedir:"}
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/60 text-sm pl-2">
                <li>{lang === 'en' ? "Preparing and presenting custom demo solutions for your dental clinic" : "Diş kliniğinize özel demo çözümleri hazırlamak ve sunmak"}</li>
                <li>{lang === 'en' ? "Establishing communication and addressing your requests" : "Sizinle iletişim kurmak ve taleplerinizi yanıtlamak"}</li>
                <li>{lang === 'en' ? "Introducing, marketing, and enhancing our products and services" : "Ürün ve hizmetlerimizin tanıtımını, pazarlamasını yapmak ve geliştirmek"}</li>
              </ul>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 4. Saklama Süresi / Retention Period */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-amber-400">
                <Clock size={20} />
                {lang === 'en' ? "4. Data Retention Period" : "4. Verilerin Saklanma Süresi"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {lang === 'en'
                  ? "Your personal data is securely stored for a reasonable period of up to 2 years from the date of your request in order to evaluate demo requests and follow up on communication processes. At the end of this period, your data will be deleted or anonymized."
                  : "Kişisel verileriniz, demo taleplerinin değerlendirilmesi ve iletişim süreçlerinin takibi amacıyla talep tarihinden itibaren makul bir süre boyunca (en fazla 2 yıl) sistemlerimizde güvenli bir şekilde saklanır. Bu süre sonunda verileriniz silinir veya anonim hale getirilir."}
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 5. Üçüncü Taraflar / Third Parties */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-pink-400">
                <Globe size={20} />
                {lang === 'en' ? "5. Sharing with Third Parties" : "5. Üçüncü Taraflarla Paylaşım"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                {lang === 'en'
                  ? "Your personal data is never shared, sold, or leased to third parties for commercial purposes without your consent. However, data may be shared technically with our advertising and marketing partners (such as Meta for Meta Pixel tracking, or Google Analytics) to measure and optimize campaign performance."
                  : "Kişisel verileriniz, onayınız olmaksızın ticari amaçlarla üçüncü şahıslarla paylaşılmaz, satılmaz veya kiralanmaz. Ancak, reklam ve pazarlama kampanyalarımızın takibi amacıyla (kampanya optimizasyonu için Meta Pixel veya Google Analytics gibi entegrasyonlar kapsamında) yalnızca bu teknik ortaklarla paylaşılmaktadır."}
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 6. Haklar / User Rights */}
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-3 text-rose-400">
                <Shield size={20} />
                {lang === 'en' ? "6. Your Rights as a Data Subject" : "6. Veri Sahibi Olarak Haklarınız"}
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-4">
                {lang === 'en'
                  ? "Under relevant laws (including Article 11 of the KVKK), you have the right to:"
                  : "İlgili kanunlar (KVKK Madde 11 dahil) kapsamında aşağıdaki haklara sahipsiniz:"}
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/60 text-sm pl-2 mb-4">
                <li>{lang === 'en' ? "Learn whether your personal data is being processed" : "Kişisel verilerinizin işlenip işlenmediğini öğrenme"}</li>
                <li>{lang === 'en' ? "Request correction of incomplete or incorrect data" : "Eksik veya yanlış işlenmiş verilerin düzeltilmesini talep etme"}</li>
                <li>{lang === 'en' ? "Request deletion or destruction of your personal data" : "Kişisel verilerinizin silinmesini veya yok edilmesini talep etme"}</li>
              </ul>
              <p className="text-white/70 text-base leading-relaxed">
                {lang === 'en'
                  ? "You can exercise your rights at any time by sending an e-mail to demo@radentai.co."
                  : "Haklarınızı kullanmak için dilediğiniz zaman demo@radentai.co adresine e-posta göndererek bizimle iletişime geçebilirsiniz."}
              </p>
            </section>

            <div className="h-px bg-white/10 w-full" />

            {/* 7. İletişim / Contact */}
            <section>
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-purple-400">
                <Mail size={20} />
                {lang === 'en' ? "7. Contact Information" : "7. İletişim Bilgileri"}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                  <Mail className="text-purple-400 shrink-0" size={20} />
                  <span className="text-white/80 text-sm">demo@radentai.co</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/5">
                  <Globe className="text-blue-400 shrink-0" size={20} />
                  <span className="text-white/80 text-sm">radentai.co</span>
                </div>
                <div className="flex items-center gap-3 bg-white/5 rounded-xl p-4 border border-white/5 sm:col-span-2">
                  <MapPin className="text-teal-400 shrink-0" size={20} />
                  <span className="text-white/80 text-sm">İstanbul, Türkiye</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
