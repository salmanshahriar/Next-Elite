'use client';

import type React from 'react';

import type { Locale } from '@/features/i18n/types/types';
import { DEFAULT_LOCALE } from '@/features/i18n/types/types';
import { resolveLocale } from '@/lib/validation/i18n';
import { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  locale: Locale;
  setLocale: (_locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

function safeGetLocalStorageItem(key: string): string | null {
  if (typeof window === 'undefined') return null;
  const storage = window.localStorage;
  if (!storage || typeof storage.getItem !== 'function') return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetLocalStorageItem(key: string, value: string): void {
  if (typeof window === 'undefined') return;
  const storage = window.localStorage;
  if (!storage || typeof storage.setItem !== 'function') return;
  try {
    storage.setItem(key, value);
  } catch {
    return;
  }
}

function getCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const value = match?.[1] ? decodeURIComponent(match[1]) : null;
  return value ? resolveLocale(value) : null;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const storedValue = safeGetLocalStorageItem('locale');
    const stored = storedValue ? resolveLocale(storedValue) : null;
    return stored || getCookieLocale() || DEFAULT_LOCALE;
  });

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    safeSetLocalStorageItem('locale', newLocale);
    document.cookie = `locale=${encodeURIComponent(newLocale)}; path=/; max-age=31536000; samesite=lax`;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
