import { useRef } from 'react';
import { LanguageProvider } from '../i18n';
import type { Language } from '../i18n/types';
import SEOHead from '../components/SEOHead';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Facilities from '../components/Facilities';
import Location from '../components/Location';
import BookingButton from '../components/BookingButton';
import FloatingReserveButton from '../components/FloatingReserveButton';
import useIntersectionObserver from '../components/useIntersectionObserver';

interface LocalizedAppProps {
  language: Language;
}

function LocalizedApp({ language }: LocalizedAppProps) {
  const bookingButtonRef = useRef<HTMLElement>(null);
  const isBookingButtonVisible = useIntersectionObserver(bookingButtonRef, {
    rootMargin: '0px 0px -100px 0px',
  });

  return (
    <LanguageProvider language={language}>
      <SEOHead />
      <div className="min-h-screen neon-bg">
        <div className="neon-orbs" />
        <Navbar />
        <Hero />
        <Facilities />
        <Location />
        <BookingButton ref={bookingButtonRef} />
        <FloatingReserveButton isHidden={isBookingButtonVisible} />
      </div>
    </LanguageProvider>
  );
}

export default LocalizedApp;
