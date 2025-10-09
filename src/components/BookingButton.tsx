import { forwardRef } from 'react';
import { BadgeCheck } from 'lucide-react';
import { useTranslation } from '../i18n';

const BookingButton = forwardRef<HTMLElement>((_props, ref) => {
  const { t } = useTranslation();
  const bookingUrl = 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search';

  return (
    <section id="reserve" className="py-10 md:py-16 px-6" ref={ref}>
      <div className="max-w-md mx-auto">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener"
          className="pulse-hover block w-full bg-neon-red hover:bg-neon-red-bright text-white text-center text-lg md:text-xl font-orbitron font-bold py-4 px-12 rounded-xl tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,0,0,0.5)]"
        >
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
