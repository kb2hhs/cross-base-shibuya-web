import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../i18n';

// サイトのベースURL（デプロイ時に実際のURLに変更）
const SITE_URL = 'https://crossbase-shibuya.com';

function SEOHead() {
  const { t, language } = useTranslation();

  const getCanonicalUrl = () => {
    return language === 'en' ? SITE_URL : `${SITE_URL}/${language}`;
  };

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <html lang={language} />
      <title>{t.meta.title}</title>
      <meta name="description" content={t.meta.description} />

      {/* Canonical URL */}
      <link rel="canonical" href={getCanonicalUrl()} />

      {/* 言語別のalternate link */}
      <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
      <link rel="alternate" hrefLang="ja" href={`${SITE_URL}/ja`} />
      <link rel="alternate" hrefLang="zh-CN" href={`${SITE_URL}/zh-cn`} />
      <link rel="alternate" hrefLang="zh-TW" href={`${SITE_URL}/zh-tw`} />
      <link rel="alternate" hrefLang="ko" href={`${SITE_URL}/ko`} />
      <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={getCanonicalUrl()} />
      <meta property="og:title" content={t.meta.title} />
      <meta property="og:description" content={t.meta.description} />
      <meta property="og:locale" content={language === 'ja' ? 'ja_JP' : language === 'zh-cn' ? 'zh_CN' : language === 'zh-tw' ? 'zh_TW' : language === 'ko' ? 'ko_KR' : 'en_US'} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={getCanonicalUrl()} />
      <meta name="twitter:title" content={t.meta.title} />
      <meta name="twitter:description" content={t.meta.description} />
    </Helmet>
  );
}

export default SEOHead;
