import { useEffect, useState } from 'react';

function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full md:px-10">
      <section
        className="
          relative w-full h-[33vh] md:h-[50vh]
          flex items-center justify-center overflow-hidden
          md:max-w-4xl md:mx-auto md:rounded-lg"
      >
        <div className="absolute inset-0">
          <div
            className="glitch-image-bg absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/hero-main.webp')",
              animation: 'kenburns 15s ease-in-out infinite alternate, image-glitch-filter 5s infinite, image-glitch-shift 5s infinite',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1
            className="glitch-text text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold tracking-wide text-white uppercase"
            data-text="Cross Base Shibuya"
            style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
              transform: `translateY(${scrollY * -0.3}px)`
            }}
          >
            Cross Base Shibuya
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Hero;
