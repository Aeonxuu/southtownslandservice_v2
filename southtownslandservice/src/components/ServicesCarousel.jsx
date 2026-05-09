import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from './AnimatedSection';

export default function ServicesCarousel({ services }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (e, info) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        // Swiped right - go to previous
        setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
      } else {
        // Swiped left - go to next
        setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Mobile Horizontal Carousel */}
      <div className="md:hidden">
        <div className="relative">
          <div className="mb-3 flex items-center justify-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-slate-500">
            <span>Swipe left or right</span>
          </div>

          {/* Carousel Container */}
          <div className="relative h-[28rem] overflow-hidden rounded-none">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white via-white/60 to-transparent opacity-70" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white via-white/60 to-transparent opacity-70" />

            <button
              type="button"
              onClick={goToPrev}
              className="absolute left-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/10 bg-white/90 text-ink shadow-md backdrop-blur-sm transition duration-300 active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-2 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center border border-black/10 bg-white/90 text-ink shadow-md backdrop-blur-sm transition duration-300 active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              drag="x"
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="flex h-full cursor-grab active:cursor-grabbing"
            >
              {services.map((service) => (
                <div
                  key={service.title}
                  className="relative min-w-full h-full bg-white/5 backdrop-blur-sm flex items-center justify-center p-4"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-auto object-contain max-w-[85vw]"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="mt-4 flex justify-center gap-2">
            {services.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                animate={{
                  width: index === currentIndex ? 32 : 12,
                  backgroundColor: index === currentIndex ? '#f5f5f4' : '#ffffffd1',
                  opacity: index === currentIndex ? 1 : 0.8,
                  boxShadow: index === currentIndex ? '0 0 0 1px rgba(245, 245, 244, 0.2)' : '0 0 0 1px rgba(245, 245, 244, 0.45)'
                }}
                transition={{ duration: 0.3 }}
                className="h-2.5 rounded-full transition-all duration-300"
                aria-label={`Go to service ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="hidden md:grid gap-5 lg:grid-cols-4 md:grid-cols-3">
        {services.map((service) => (
          <AnimatedSection key={service.title}>
            <img
              src={service.image}
              alt={service.title}
              className="w-full object-contain transition duration-500 hover:scale-[1.03]"
            />
          </AnimatedSection>
        ))}
      </div>
    </>
  );
}
