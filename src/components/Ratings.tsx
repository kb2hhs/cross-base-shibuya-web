import { useRef } from 'react';
import { HiChevronDoubleRight } from 'react-icons/hi2';
import useIntersectionObserver from './useIntersectionObserver';

function Ratings() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    rootMargin: '50px',
  });

  // Neon style (currently inactive)
  const neonButtonClassName = "w-full px-2 py-2 text-[10px] md:text-xs bg-black/80 border-[1px] border-white text-white rounded-lg transition-all duration-300 font-orbitron font-bold text-center whitespace-nowrap flex items-center justify-center gap-0.5";
  const neonButtonStyle = {
    boxShadow: '0 0 2px #fff, inset 0 0 2px #fff, 0 0 2px #FF5722, inset 0 0 5px #FF5722',
    textShadow: '0 0 1px #fff, 0 0 2px #FF5722',
  };
  const neonIconStyle = {
    filter: 'drop-shadow(0 0 0.5px #fff) drop-shadow(0 0 0.5px #FF5722)',
  };

  // Cyan style (currently active)
  const buttonClassName = "w-full px-2 py-2 text-[10px] md:text-xs bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-400 rounded-lg transition-all duration-300 font-orbitron font-semibold text-center whitespace-nowrap flex items-center justify-center gap-0.5";
  const buttonStyle = {};
  const iconStyle = {};

  return (
    <section
      ref={sectionRef}
      className={`section-container py-6 md:py-8 fade-slide-up ${isVisible ? 'visible' : ''}`}
    >
      <div className="flex items-start justify-center gap-6 md:gap-10 lg:gap-16">
        {/* Airbnb */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://www.airbnb.jp/rooms/1475969562919490770"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-32 md:w-40 lg:w-48"
          >
            <img
              src="/bnb-logo-3.png"
              alt="Airbnb Rating 5.0"
              className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </a>
          <a
            href="https://www.airbnb.jp/rooms/1475969562919490770"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName}
            style={buttonStyle}
          >
            <HiChevronDoubleRight className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" style={iconStyle} />
            <span>Check Reviews</span>
          </a>
        </div>

        {/* Booking.com */}
        <div className="flex flex-col items-center gap-2">
          <a
            href="https://www.booking.com/hotel/jp/cross-base-shibuya.html"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-32 md:w-40 lg:w-48"
          >
            <img
              src="/booking-logo-4.png"
              alt="Booking.com Rating 10.0"
              className="w-full h-auto object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </a>
          <a
            href="https://www.booking.com/hotel/jp/cross-base-shibuya.html"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClassName}
            style={buttonStyle}
          >
            <HiChevronDoubleRight className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" style={iconStyle} />
            <span>Check Reviews</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Ratings;
