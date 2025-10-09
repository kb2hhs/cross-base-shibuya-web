import { HiChevronDoubleRight } from "react-icons/hi2";
import { useState } from "react";
import { useTranslation } from '../i18n';

interface FloatingReserveButtonProps {
  isHidden?: boolean;
}

function FloatingReserveButton({ isHidden = false }: FloatingReserveButtonProps) {
  const { t } = useTranslation();
  const bookingUrl = 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search';
  const [isPressed, setIsPressed] = useState(false);

  return (
    // mdサイズ以上で非表示にする (md:hidden)
    <div
      className={`fixed bottom-6 right-4 z-50 md:hidden transition-opacity duration-300 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          bounce-icon flex items-center justify-center max-w-[45vw]
          bg-gray-700/90 backdrop-blur-sm
          text-white text-xs font-orbitron font-bold tracking-wider
          pl-3 pr-4 py-3 rounded-lg
          transition-all duration-300
          hover:bg-gray-600
          hover:shadow-[0_0_20px_rgba(107,114,128,0.5)]
          active:scale-95
          ${isPressed ? 'scale-95' : 'scale-100'}
        `}
      >
        <HiChevronDoubleRight className="mr-1.5 h-5 w-5 transition-transform flex-shrink-0" />
        <span className="transition-all flex flex-col">
          <span>{t.floating.bookAtBestRate.line1}</span>
          <span>{t.floating.bookAtBestRate.line2}</span>
        </span>
      </a>
    </div>
  );
}

export default FloatingReserveButton;