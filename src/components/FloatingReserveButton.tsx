import { HiChevronDoubleRight } from "react-icons/hi2";
import { useTranslation } from '../i18n';
import { useNeonButton } from '../hooks/useNeonButton';

interface FloatingReserveButtonProps {
  isHidden?: boolean;
}

function FloatingReserveButton({ isHidden = false }: FloatingReserveButtonProps) {
  const { t } = useTranslation();
  const bookingUrl = 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search';
  const { isPressed, pressHandlers, getNeonHandlers } = useNeonButton();

  const neonHandlers = getNeonHandlers(
    '0 0 10px #fff, inset 0 0 10px #fff, 0 0 10px #FF5722, 0 0 10px #FF5722, inset 0 0 20px #FF5722',
    '0 0 20px #fff, inset 0 0 20px #fff, 0 0 20px #FF5722, 0 0 20px #FF5722, inset 0 0 20px #FF5722'
  );

  return (
    <div
      className={`fixed bottom-6 right-4 z-[100] transition-opacity duration-300 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener"
        {...pressHandlers}
        {...neonHandlers}
        className={`
          bounce-icon flex items-center justify-center relative
          text-white text-xs font-orbitron font-bold tracking-[0.08em]
          pl-3 pr-4 py-3 rounded-lg
          border-[3px] border-white
          bg-black/80
          transition-all duration-300
          ${isPressed ? 'scale-95' : 'scale-100'}
        `}
        style={{
          boxShadow: '0 0 5px #fff, inset 0 0 5px #fff, 0 0 5px #FF5722, 0 0 5px #FF5722, inset 0 0 20px #FF5722',
          textShadow: '0 0 3px #fff, 0 0 5px #fff, 0 0 10px #FF5722, 0 0 10px #FF5722, 0 0 10px #FF5722',
        }}
      >
        {/* Animated neon orbs on border */}
        <span
          className="absolute inset-0 pointer-events-none rounded-lg"
          style={{ overflow: 'visible' }}
        >
          <span
            className="absolute w-4 h-4 rounded-full"
            style={{
              background: 'radial-gradient(circle, #fff 0%, #FF5722 50%, transparent 70%)',
              boxShadow: '0 0 10px #FF5722, 0 0 20px #FF5722',
              offsetPath: 'inset(-1.5px round 8px)',
              animation: 'borderOrb2 3s linear infinite, orbBlink 1s ease-in-out infinite',
            }}
          />
        </span>

        <HiChevronDoubleRight
          className="mr-1.5 h-5 w-5 transition-transform flex-shrink-0"
          style={{
            filter: 'drop-shadow(0 0 1px #fff) drop-shadow(0 0 3px #fff) drop-shadow(0 0 1px #FF5722) drop-shadow(0 0 3px #FF5722)',
            strokeWidth: '0.5',
          }}
        />
        <span className="transition-all flex flex-col">
          <span>{t.floating.bookAtBestRate.line1}</span>
          <span>{t.floating.bookAtBestRate.line2}</span>
        </span>
      </a>
    </div>
  );
}

export default FloatingReserveButton;