"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
      >
        <Globe size={16} />
        {lang === "en" ? "EN" : "TR"}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-32 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-50">
          <button
            onClick={() => {
              setLang("tr");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
              lang === "tr" ? "text-purple-400 font-semibold" : "text-white/70"
            }`}
          >
            Türkçe (TR)
          </button>
          <button
            onClick={() => {
              setLang("en");
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
              lang === "en" ? "text-purple-400 font-semibold" : "text-white/70"
            }`}
          >
            English (EN)
          </button>
        </div>
      )}
    </div>
  );
}
