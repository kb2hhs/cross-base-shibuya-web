import { useRef } from 'react';
import { useTranslation } from '../i18n';
import useIntersectionObserver from './useIntersectionObserver';

function Location() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

  return (
    <section id="location" ref={sectionRef} className={`section-container fade-in ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-heading">
        {t.location.heading}
      </h2>

      <p className="section-content mb-8 max-w-2xl">
        {t.location.description}
      </p>

      <div className="mb-8">
        <p className="section-content">
          <span className="section-text-highlight">{t.location.addressLabel}</span>
          <br />
          {t.location.addressLine1}
          <br />
          {t.location.addressLine2}
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
