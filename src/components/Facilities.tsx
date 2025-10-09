import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import useIntersectionObserver from './useIntersectionObserver';

function Facilities() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [carouselIndex, setCarouselIndex] = useState<Record<number, number>>({});
  const [touchStart, setTouchStart] = useState<Record<number, number>>({});
  const [touchEnd, setTouchEnd] = useState<Record<number, number>>({});

  const rooms: Array<{
    image?: string;
    images?: string[];
    title: string;
    description: string;
  }> = [
    {
      image: '/facilities-living-area.webp',
      title: t.facilities.livingArea.title,
      description: t.facilities.livingArea.description,
    },
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
      image: '/kitchen_Z9S_3124.webp',
      title: t.facilities.kitchen.title,
      description: t.facilities.kitchen.description,
    },
    {
      images: ['/shower_Z9S_1743.webp', '/laundry_Z9S_1724.webp'],
      title: t.facilities.bathroom.title,
      description: t.facilities.bathroom.description,
    },
  ];

  const handleImageLoad = (index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  const handlePrevSlide = (roomIndex: number, totalImages: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [roomIndex]: ((prev[roomIndex] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const handleNextSlide = (roomIndex: number, totalImages: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [roomIndex]: ((prev[roomIndex] || 0) + 1) % totalImages,
    }));
  };

  const goToSlide = (roomIndex: number, slideIndex: number) => {
    setCarouselIndex(prev => ({
      ...prev,
      [roomIndex]: slideIndex,
    }));
  };

  const handleTouchStart = (roomIndex: number, e: React.TouchEvent) => {
    setTouchStart(prev => ({ ...prev, [roomIndex]: e.touches[0].clientX }));
    setTouchEnd(prev => ({ ...prev, [roomIndex]: e.touches[0].clientX }));
  };

  const handleTouchMove = (roomIndex: number, e: React.TouchEvent) => {
    setTouchEnd(prev => ({ ...prev, [roomIndex]: e.touches[0].clientX }));
  };

  const handleTouchEnd = (roomIndex: number, totalImages: number) => {
    const startX = touchStart[roomIndex] || 0;
    const endX = touchEnd[roomIndex] || 0;
    const diff = startX - endX;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        // Swiped left, go to next slide
        handleNextSlide(roomIndex, totalImages);
      } else {
        // Swiped right, go to previous slide
        handlePrevSlide(roomIndex, totalImages);
      }
    }
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
        {rooms.map((room, index) => {
          const currentSlide = carouselIndex[index] || 0;
          const hasCarousel = room.images && room.images.length > 1;

          return (
            <div key={index} className="space-y-4">
              <div className="relative w-full aspect-[4/3] image-zoom">
                {!loadedImages.has(index) && (
                  <div className="skeleton w-full h-full absolute inset-0" />
                )}

                {/* Single Image Display */}
                {room.image && (
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover"
                    onLoad={() => handleImageLoad(index)}
                    style={{ opacity: loadedImages.has(index) ? 1 : 0 }}
                  />
                )}

                {/* Carousel Display */}
                {room.images && (
                  <>
                    <div
                      className="relative w-full h-full overflow-hidden"
                      onTouchStart={(e) => handleTouchStart(index, e)}
                      onTouchMove={(e) => handleTouchMove(index, e)}
                      onTouchEnd={() => handleTouchEnd(index, room.images!.length)}
                    >
                      <div
                        className="flex transition-transform duration-500 ease-in-out h-full"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                      >
                        {room.images.map((imgSrc, imgIndex) => (
                          <img
                            key={imgIndex}
                            src={imgSrc}
                            alt={`${room.title} ${imgIndex + 1}`}
                            className="w-full h-full object-cover flex-shrink-0"
                            onLoad={() => handleImageLoad(index)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    {hasCarousel && (
                      <>
                        <button
                          onClick={() => handlePrevSlide(index, room.images!.length)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors z-10 drop-shadow-lg"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                          onClick={() => handleNextSlide(index, room.images!.length)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-cyan-400 transition-colors z-10 drop-shadow-lg"
                          aria-label="Next image"
                        >
                          <ChevronRight className="w-8 h-8" />
                        </button>
                      </>
                    )}

                    {/* Dot Indicators */}
                    {hasCarousel && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                        {room.images.map((_, dotIndex) => (
                          <button
                            key={dotIndex}
                            onClick={() => goToSlide(index, dotIndex)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              currentSlide === dotIndex
                                ? 'bg-cyan-400 w-6'
                                : 'bg-white/50 hover:bg-white/80'
                            }`}
                            aria-label={`Go to image ${dotIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
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
          );
        })}
      </div>
    </section>
  );
}

export default Facilities;
