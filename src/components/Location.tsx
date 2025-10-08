import { useRef } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="location" ref={sectionRef} className={`section-container fade-in ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-heading">
        Location
      </h2>

      <p className="section-content mb-8 max-w-2xl">
        Just a 2-minute walk from Shibuya Station, Cross Base Shibuya is
        perfectly located near the iconic Hachiko Statue, the famous Shibuya
        Scramble Crossing, and Shibuya Center Town shopping district. Experience
        the vibrant heart of Tokyo at your doorstep.
      </p>

      <div className="mb-8">
        <p className="section-content">
          <span className="section-text-highlight">ADDRESS:</span>
          <br />
          WAVE Dogenzaka Bldg. 5F, 1-15-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043
          <br />
          〒150-0043 東京都渋谷区道玄坂1-15-8 WAVE道玄坂ビル 5F
        </p>
      </div>

      <div className="w-full aspect-video overflow-hidden rounded-lg">
        <iframe
          src="https://maps.google.com/maps?hl=en&q=cross base shibuya&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cross Base Shibuya Location"
          className="w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
    </section>
  );
}

export default Location;
