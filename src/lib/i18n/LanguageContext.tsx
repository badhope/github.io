'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Translations, en, zh } from './translations';

export type { Language } from './translations';

interface LanguageContextType {
  language: Language;
  translations: Translations;
  setLanguage: (lang: Language) => void;
  t: Translations;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'badhope-language';

function getInitialLanguage(): Language {
  // First check localStorage
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === 'zh' || stored === 'en') return stored;
    } catch (e) {}

    // Then check the pre-set data-lang attribute (from our pre-hydration script)
    try {
      const dataLang = document.documentElement.getAttribute('data-lang');
      if (dataLang === 'zh' || dataLang === 'en') return dataLang as Language;
    } catch (e) {}

    // Fallback to browser language
    try {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) return 'zh';
    } catch (e) {}
  }
  return 'en';
}

function getTranslations(lang: Language): Translations {
  return lang === 'zh' ? zh : en;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get the correct initial language after mount
    const initialLang = getInitialLanguage();
    setLanguageState(initialLang);
    setMounted(true);

    // Sync data-lang attribute when language changes
    document.documentElement.setAttribute('data-lang', initialLang);
    document.documentElement.classList.remove('lang-en', 'lang-zh');
    document.documentElement.classList.add('lang-' + initialLang);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.classList.remove('lang-en', 'lang-zh');
    document.documentElement.classList.add('lang-' + lang);
  };

  const translations = getTranslations(language);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage, t: translations, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: 'en' as Language,
      translations: en,
      setLanguage: () => {},
      t: en,
      mounted: false,
    };
  }
  return context;
}
