import { useEffect, useState } from 'react';
import { useTranslation } from '../i18n';

function Hero() {
  const { t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  // Scroll parallax effect
  useEffect(() => {
    let rafId: number | null = null;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        // Only update if scroll changed by more than 1px to reduce unnecessary renders
        if (Math.abs(currentScrollY - lastScrollY) > 1) {
          setScrollY(currentScrollY);
          lastScrollY = currentScrollY;
        }
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="home" className="w-full md:px-10">
      <section
        className="
          relative w-full h-[33vh] md:h-[50vh]
          flex items-center justify-center overflow-hidden
          md:max-w-4xl md:mx-auto md:rounded-lg"
      >
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/facilities-living-area.webp')",
              animation: 'kenburns 15s ease-in-out infinite alternate',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-wide text-white uppercase"
            style={{
              textShadow: '0 0 3px #fff, 0 0 10px #FF5722',
              transform: `translateY(${scrollY * -0.3}px)`
            }}
          >
            {t.hero.title}
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Hero;
