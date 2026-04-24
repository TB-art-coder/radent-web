"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "@/locales/en";
import { tr } from "@/locales/tr";

export type Language = "tr" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  langPrefix: string; // "Ankara, Türkiye" v.s için değil ama dilediğimiz zaman dili bilmek için
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Language>("tr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("lang") as Language;
    if (savedLang && (savedLang === "en" || savedLang === "tr")) {
      setLangState(savedLang);
    } else {
      // Varsayılan
      localStorage.setItem("lang", "tr");
      setLangState("tr");
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
    // Refresh for language path redirect if we use that system, but we keep it simple for now
    window.location.reload();
  };

  const t = (key: string) => {
    const dictionary: any = lang === "en" ? en : tr;
    return dictionary[key] || key;
  };

  // SSR hydration mismatch önlemek için
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, langPrefix: lang === 'en' ? 'en' : 'tr', t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    // throw new Error("useLanguage must be used within a LanguageProvider");
    // Yedek (örneğin provider dışında kullanıldıysa)
    return {
      lang: "tr" as Language,
      setLang: () => {},
      langPrefix: "tr",
      t: (key: string) => tr[key as keyof typeof tr] || key
    };
  }
  return context;
};
