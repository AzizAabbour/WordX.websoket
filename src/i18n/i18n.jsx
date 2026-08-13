import { createContext, useContext, useState, useCallback } from 'react';
import en from './locales/en.json';

const translations = { en };

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(localStorage.getItem('wordx_lang') || 'en');

  const t = useCallback((key, params = {}) => {
    const keys = key.split('.');
    let value = translations[locale] || translations.en;
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value !== 'string') return key;
    return Object.entries(params).reduce(
      (str, [k, v]) => str.replace(`{{${k}}}`, v),
      value
    );
  }, [locale]);

  const changeLocale = useCallback((newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('wordx_lang', newLocale);
    document.documentElement.setAttribute('lang', newLocale);
    document.documentElement.setAttribute('dir', newLocale === 'ar' ? 'rtl' : 'ltr');
  }, []);

  return (
    <I18nContext.Provider value={{ locale, t, changeLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
