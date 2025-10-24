import { createContext, useContext, ReactNode } from 'react';
import type { Translations, Language } from './types';
import { en } from './locales/en';
import { ja } from './locales/ja';
import { zhCN } from './locales/zh-cn';
import { zhTW } from './locales/zh-tw';
import { ko } from './locales/ko';
import { pt } from './locales/pt';

// 翻訳データのマップ
const translations: Record<Language, Translations> = {
  en,
  ja,
  'zh-cn': zhCN,
  'zh-tw': zhTW,
  ko,
  pt,
};

// Context型定義
interface LanguageContextType {
  t: Translations;
  language: Language;
}

// Context作成
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider Props
interface LanguageProviderProps {
  language: Language;
  children: ReactNode;
}

// Provider コンポーネント
export function LanguageProvider({ language, children }: LanguageProviderProps) {
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ t, language }}>
      {children}
    </LanguageContext.Provider>
  );
}

// カスタムフック
export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
