import { useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Facilities from './components/Facilities';
import Location from './components/Location';
import BookingButton from './components/BookingButton';
import FloatingReserveButton from './components/FloatingReserveButton';
import useIntersectionObserver from './components/useIntersectionObserver';

function App() {
  const bookingButtonRef = useRef<HTMLElement>(null);
  const isBookingButtonVisible = useIntersectionObserver(bookingButtonRef, {
    rootMargin: '0px 0px -100px 0px', // 画面下部から100px手前で検知
  });

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Facilities />
      <Location />
      <BookingButton ref={bookingButtonRef} />
      <FloatingReserveButton isHidden={isBookingButtonVisible} />
    </div>
  );
}

export default App;
