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
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-opacity duration-300 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <a
        href={bookingUrl}
        target="_blank"
        rel="noopener"
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        className={`
          bounce-icon flex items-center justify-center w-full
          bg-cyan-500/90 backdrop-blur-sm
          text-white text-xl font-orbitron font-bold tracking-wider
          py-2.5
          transition-all duration-300
          hover:bg-cyan-400
          hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]
          active:scale-95
          ${isPressed ? 'scale-95' : 'scale-100'}
        `}
      >
        <HiChevronDoubleRight className="mr-2 h-6 w-6 transition-transform" />
        <span className="transition-all">{t.floating.reserve.toUpperCase()}</span>
      </a>
    </div>
  );
}

export default FloatingReserveButton;