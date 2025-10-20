import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from '../i18n';
import useMultipleIntersectionObserver from './useMultipleIntersectionObserver';

function Facilities() {
  const { t } = useTranslation();
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
      images: [
        '/living_resized/1_Z9S_3201.jpg',
        '/living_resized/Z9S_1910.jpg',
        '/living_resized/Z9S_2115.jpg',
        '/living_resized/Z9S_3231.jpg',
        '/living_resized/Z9S_3275.jpg',
        '/living_resized/Z9S_3307.jpg',
        '/living_resized/Z9S_3313.jpg',
      ],
      title: t.facilities.livingArea.title,
      description: t.facilities.livingArea.description,
    },
    {
      images: [
        '/bedroom1_resized/1_Z9S_3341-2.jpg',
        '/bedroom1_resized/Z9S_1688.jpg',
        '/bedroom1_resized/Z9S_1700.jpg',
        '/bedroom1_resized/Z9S_3340.jpg',
        '/bedroom1_resized/Z9S_3350.jpg',
      ],
      title: t.facilities.bedroom1.title,
      description: t.facilities.bedroom1.description,
    },
    {
      images: [
        '/bedroom2_resized/1_Z9S_1649.jpg',
        '/bedroom2_resized/Z9S_1613.jpg',
        '/bedroom2_resized/Z9S_1628.jpg',
        '/bedroom2_resized/Z9S_1655.jpg',
        '/bedroom2_resized/Z9S_1666.jpg',
        '/bedroom2_resized/Z9S_1672.jpg',
      ],
      title: t.facilities.bedroom2.title,
      description: t.facilities.bedroom2.description,
    },
    {
      images: [
        '/kitchen_resized/1_Z9S_0161.jpg',
        '/kitchen_resized/Z9S_0176.jpg',
        '/kitchen_resized/Z9S_3123.jpg',
      ],
      title: t.facilities.kitchen.title,
      description: t.facilities.kitchen.description,
    },
    {
      images: [
        '/bath_resized/1_Z9S_1743.jpg',
        '/bath_resized/Z9S_1731.jpg',
        '/bath_resized/Z9S_1756.jpg',
        '/bath_resized/Z9S_1792.jpg',
        '/bath_resized/Z9S_1799.jpg',
        '/bath_resized/Z9S_1809.jpg',
      ],
      title: t.facilities.bathroom.title,
      description: t.facilities.bathroom.description,
    },
    {
      image: '/floor_plan/fc24db0b-71e9-43e9-b6b9-b62c8b3697e2.jpg',
      title: t.facilities.floorPlan.title,
      description: t.facilities.floorPlan.description,
    },
  ];

  // Initialize multiple intersection observer for all cards
  const { setRef, visibleItems } = useMultipleIntersectionObserver<HTMLDivElement>(
    rooms.length,
    {
      threshold: 0.1,
      rootMargin: '50px',
      triggerOnce: true,
    }
  );

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
    <section id="facilities" className="section-container">
      <h2 className="section-heading">
        {t.facilities.heading}
      </h2>

      <p className="section-content mb-12 md:mb-16 max-w-2xl">
        {t.facilities.description}
      </p>

      <div className="space-y-16 md:space-y-20">
        {rooms.map((room, index) => {
          const currentSlide = carouselIndex[index] || 0;
          const hasCarousel = room.images && room.images.length > 1;
          const isVisible = visibleItems.has(index);
          const isEven = index % 2 === 0;
          const animationClass = isEven ? 'fade-slide-left' : 'fade-slide-right';
          const isLastItem = index === rooms.length - 1;

          return (
            <div key={index}>
              {/* Divider before first item */}
              {index === 0 && (
                <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              )}

              <div
                ref={setRef(index)}
                className={`space-y-8 ${animationClass} ${isVisible ? 'visible' : ''}`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  willChange: isVisible ? 'auto' : 'opacity, transform'
                }}
              >
              <div className="text-center">
                <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-white tracking-wide mb-1">
                  {room.title}
                </h3>
                {room.description && (
                  <p className="section-content text-gray-400 font-light">
                    {room.description}
                  </p>
                )}
              </div>

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
              </div>

              {/* Divider */}
              {!isLastItem && (
                <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Facilities;
