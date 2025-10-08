import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Facilities', href: '#facilities' },
    { label: 'Location', href: '#location' },
    { label: 'Reserve', href: 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search', external: true },
  ];

  const handleMenuClick = () => {
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
          <div className="hidden md:flex space-x-8">
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
          isMobileMenuOpen ? 'max-h-64' : 'max-h-0'
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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
