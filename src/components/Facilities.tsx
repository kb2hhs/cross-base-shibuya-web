import { useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import useIntersectionObserver from './useIntersectionObserver';

function Facilities() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const rooms = [
    {
      image: '/facilities-bedroom-1.webp',
      title: t.facilities.bedroom1.title,
      description: t.facilities.bedroom1.description,
    },
    {
      image: '/facilities-bedroom-2.webp',
      title: t.facilities.bedroom2.title,
      description: t.facilities.bedroom2.description,
    },
    {
      image: '/facilities-living-area.webp',
      title: t.facilities.livingArea.title,
      description: t.facilities.livingArea.description,
    },
  ];

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <section id="facilities" ref={sectionRef} className={`section-container slide-in-right ${isVisible ? 'visible' : ''}`}>
      <h2 className="section-heading">
        {t.facilities.heading}
      </h2>

      <p className="section-content mb-12 md:mb-16 max-w-2xl">
        {t.facilities.description}
      </p>

      <div className="space-y-12 md:space-y-16">
        {rooms.map((room, index) => (
          <div key={index} className="space-y-4">
            <div className="relative w-full aspect-[16/9] image-zoom">
              {!loadedImages.has(index) && (
                <div className="skeleton w-full h-full absolute inset-0" />
              )}
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(index)}
                style={{ opacity: loadedImages.has(index) ? 1 : 0 }}
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-white tracking-wide mb-1">
                {room.title}
              </h3>
              {room.description && (
                <p className="section-content text-gray-400 font-light">
                  {room.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Facilities;
