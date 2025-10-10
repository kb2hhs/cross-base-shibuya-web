import { useEffect, useRef, useState } from 'react';

interface UseMultipleIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Efficiently observes multiple elements with a single IntersectionObserver
 * Optimized for performance with lazy disconnect after first trigger
 */
export default function useMultipleIntersectionObserver<T extends HTMLElement>(
  count: number,
  options: UseMultipleIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true,
  } = options;

  const elementRefs = useRef<(T | null)[]>(new Array(count).fill(null));
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create a single observer for all elements
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-observe-index'));

          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set(prev).add(index));

            // Disconnect after first trigger for performance
            if (triggerOnce) {
              observerRef.current?.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            setVisibleItems((prev) => {
              const next = new Set(prev);
              next.delete(index);
              return next;
            });
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observe all elements
    elementRefs.current.forEach((element, index) => {
      if (element) {
        element.setAttribute('data-observe-index', String(index));
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, count]);

  const setRef = (index: number) => (element: T | null) => {
    elementRefs.current[index] = element;
  };

  return { setRef, visibleItems };
}
