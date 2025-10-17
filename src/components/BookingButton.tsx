import { forwardRef, useEffect, useRef, useState } from 'react';
import { BadgeCheck } from 'lucide-react';
import { useTranslation } from '../i18n';
import { useNeonButton } from '../hooks/useNeonButton';

const BookingButton = forwardRef<HTMLElement>((_props, ref) => {
  const { t } = useTranslation();
  const bookingUrl = 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search';
  const { isPressed, pressHandlers, getNeonHandlers } = useNeonButton();
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const neonHandlers = getNeonHandlers(
    '0 0 10px #fff, inset 0 0 10px #fff, 0 0 10px #FF5722, 0 0 10px #FF5722, inset 0 0 20px #FF5722',
    '0 0 20px #fff, inset 0 0 20px #fff, 0 0 20px #FF5722, 0 0 20px #FF5722, inset 0 0 20px #FF5722'
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    if (buttonRef.current) {
      observer.observe(buttonRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section id="reserve" className="py-10 md:py-16 px-6" ref={ref}>
      <div className="max-w-md mx-auto" ref={buttonRef}>
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener"
          {...pressHandlers}
          {...neonHandlers}
          className={`
            block w-full relative
            text-white text-center text-xl md:text-2xl font-orbitron font-bold
            py-4 px-12 rounded-xl tracking-wide
            border-[3px] border-white
            bg-black/80
            transition-all duration-300
            ${isVisible ? 'bounce-3d-enter' : 'opacity-0'}
            ${isPressed ? 'scale-95' : 'scale-100'}
          `}
          style={{
            boxShadow: '0 0 5px #fff, inset 0 0 5px #fff, 0 0 5px #FF5722, 0 0 5px #FF5722, inset 0 0 20px #FF5722',
            textShadow: '0 0 3px #fff, 0 0 10px #FF5722, 0 0 10px #FF5722, 0 0 10px #FF5722',
          }}
        >
          {/* Animated neon orbs on border */}
          <span
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ overflow: 'visible' }}
          >
            <span
              className="absolute w-4 h-4 rounded-full"
              style={{
                background: 'radial-gradient(circle, #fff 0%, #FF5722 50%, transparent 70%)',
                boxShadow: '0 0 10px #FF5722, 0 0 20px #FF5722',
                offsetPath: 'inset(-1.5px round 12px)',
                animation: 'borderOrb2 3s linear infinite, orbBlink 1s ease-in-out infinite',
              }}
            />
          </span>
          {t.booking.checkAvailability}
        </a>

        {/* Best Rate Text */}
        <div className="mt-2 flex items-center justify-end gap-2 px-2">
          <BadgeCheck size={18} className="text-cyan-400" />
          <span className="text-cyan-400 font-orbitron font-semibold text-xs md:text-sm tracking-wide">
            {t.booking.bestRate}
          </span>
        </div>
      </div>
    </section>
  );
});

BookingButton.displayName = 'BookingButton';

export default BookingButton;
