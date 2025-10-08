import { forwardRef } from 'react';

const BookingButton = forwardRef<HTMLElement>((_props, ref) => {
  const bookingUrl = 'https://hito-koto.tokyo/crossbase-shibuya?tripla_booking_widget_open=search';

  return (
    <section className="py-10 md:py-16 px-6" ref={ref}>
      <div className="max-w-md mx-auto">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener"
          className="pulse-hover block w-full bg-neon-red hover:bg-neon-red-bright text-white text-center text-lg md:text-xl font-orbitron font-bold py-4 px-12 rounded-xl tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,0,0,0.5)]"
        >
          Check Availability
        </a>
      </div>
    </section>
  );
});

BookingButton.displayName = 'BookingButton';

export default BookingButton;
