import { useState, useEffect, useRef } from 'react';
import { Menu, X, Globe, Home, Building2, MapPin, Calendar } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { SUPPORTED_LANGUAGES, LANGUAGE_NAMES, type Language } from '../i18n/types';

function Navbar() {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId !== null) return;

      timeoutId = setTimeout(() => {
        setIsScrolled(window.scrollY > 50);
        if (isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        timeoutId = null;
      }, 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (timeoutId !== null) clearTimeout(timeoutId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);


  const menuItems = [
    { label: t.nav.home, href: '#home', icon: Home },
    { label: t.nav.facilities, href: '#facilities', icon: Building2 },
    { label: t.nav.location, href: '#location', icon: MapPin },
    { label: t.nav.reserve, href: 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search', external: true, icon: Calendar },
  ];

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    const path = lang === 'en' ? '/' : `/${lang}`;
    navigate(path);
    setIsLangMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="/施設ロゴ_渋谷共有用_ロゴのみ.png"
              alt="Cross Base Shibuya"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-white hover:text-cyan-400 font-orbitron font-medium transition-colors duration-200"
                {...(item.external && { target: '_blank', rel: 'noopener' })}
              >
                {item.label}
              </a>
            ))}

            {/* Desktop Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center space-x-2 text-white hover:text-cyan-400 font-orbitron font-medium transition-colors duration-200"
                aria-label="Select language"
              >
                <Globe size={20} />
                <span>{LANGUAGE_NAMES[language]}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-black/95 backdrop-blur-md rounded-lg shadow-lg py-2">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full text-left px-4 py-2 font-orbitron transition-colors duration-200 ${
                        language === lang
                          ? 'text-cyan-400 bg-white/10'
                          : 'text-white hover:text-cyan-400 hover:bg-white/5'
                      }`}
                    >
                      {LANGUAGE_NAMES[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-cyan-400 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-16 right-0 z-60 transition-all duration-300 ${
          isMobileMenuOpen ? 'w-40' : 'w-0'
        }`}
        style={{ height: 'calc(100vh - 4rem)' }}
      >
        <div className={`h-full px-4 pt-2 pb-4 space-y-2 bg-black/90 backdrop-blur-md overflow-hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={handleMenuClick}
                className="flex items-center justify-end gap-2 py-2 text-white hover:text-cyan-400 font-orbitron font-medium transition-all duration-200"
                style={{
                  animation: isMobileMenuOpen ? `slideInStagger 0.3s ease-out ${index * 0.1}s both` : 'none'
                }}
                {...(item.external && { target: '_blank', rel: 'noopener' })}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Mobile Language Selector */}
          <div className="border-t border-white/20 pt-2 mt-2">
            <div
              className="flex items-center justify-end space-x-2 text-white/70 text-sm mb-2"
              style={{
                animation: isMobileMenuOpen ? `slideInStagger 0.3s ease-out ${menuItems.length * 0.1}s both` : 'none'
              }}
            >
              <Globe size={16} />
              <span className="font-orbitron">Language</span>
            </div>
            {SUPPORTED_LANGUAGES.map((lang, index) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-right py-2 font-orbitron transition-colors duration-200 ${
                  language === lang
                    ? 'text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
                style={{
                  animation: isMobileMenuOpen ? `slideInStagger 0.3s ease-out ${(menuItems.length + 1 + index) * 0.1}s both` : 'none'
                }}
              >
                {LANGUAGE_NAMES[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
