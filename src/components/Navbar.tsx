import { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.facilities, href: '#facilities' },
    { label: t.nav.location, href: '#location' },
    { label: t.nav.reserve, href: 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search', external: true },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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
            className="text-xl md:text-2xl font-orbitron font-bold text-white hover:text-cyan-400 transition-colors"
          >
            CROSS BASE
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
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-black/40 backdrop-blur-md">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={handleMenuClick}
              className="block py-2 text-white hover:text-cyan-400 font-orbitron font-medium transition-colors duration-200 text-right"
              {...(item.external && { target: '_blank', rel: 'noopener' })}
            >
              {item.label}
            </a>
          ))}

          {/* Mobile Language Selector */}
          <div className="border-t border-white/20 pt-2 mt-2">
            <div className="flex items-center justify-end space-x-2 text-white/70 text-sm mb-2">
              <Globe size={16} />
              <span className="font-orbitron">Language</span>
            </div>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full text-right py-2 font-orbitron transition-colors duration-200 ${
                  language === lang
                    ? 'text-cyan-400'
                    : 'text-white hover:text-cyan-400'
                }`}
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
