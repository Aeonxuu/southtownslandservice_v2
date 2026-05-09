import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function JobDetail({ job, activeImageIndex, onThumbnailClick, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && job) {
        onClose?.();
      }
      if (!job) return;
      if (event.key === 'ArrowLeft') {
        onThumbnailClick((activeImageIndex - 1 + job.images.length) % job.images.length);
      }
      if (event.key === 'ArrowRight') {
        onThumbnailClick((activeImageIndex + 1) % job.images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, job, onClose, onThumbnailClick]);

  const goToPrevious = () => {
    onThumbnailClick((activeImageIndex - 1 + job.images.length) % job.images.length);
  };

  const goToNext = () => {
    onThumbnailClick((activeImageIndex + 1) % job.images.length);
  };

  return (
    <AnimatePresence>
      {job ? (
        <motion.div
          key={job.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-2 py-2 backdrop-blur-xl sm:px-4 sm:py-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.28 }}
            className="relative flex h-[100dvh] w-[100dvw] max-w-[1600px] flex-col overflow-hidden bg-[#0C0C0C] shadow-2xl sm:h-[96vh] sm:w-[96vw] lg:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition duration-200 hover:bg-black/60 sm:right-4 sm:top-4 sm:h-11 sm:w-11"
              aria-label="Close job gallery"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex min-h-[48vh] flex-[1.7] items-center justify-center overflow-hidden bg-[#0C0C0C] lg:min-h-0">
              <img
                src={job.images[activeImageIndex]}
                alt={`${job.title} image ${activeImageIndex + 1}`}
                className="h-full w-full object-contain"
              />

              <button
                type="button"
                onClick={goToPrevious}
                className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition duration-200 hover:bg-black/70 sm:left-4 sm:h-12 sm:w-12"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition duration-200 hover:bg-black/70 sm:right-4 sm:h-12 sm:w-12"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </div>

            <div className="border-t border-white/10 bg-[#0C0C0C] p-4 sm:p-5 lg:w-[380px] lg:flex-shrink-0 lg:border-l lg:border-t-0 lg:p-6 xl:w-[430px]">
              <div className="flex h-full min-h-0 flex-col gap-4 overflow-y-auto pr-1">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="mt-1 text-2xl font-extrabold text-white sm:mt-2 sm:text-4xl">{job.title}</h3>
                    </div>
                    <div className="pt-1 text-right text-sm text-white/70">
                      <p>
                        {activeImageIndex + 1}/{job.images.length}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm leading-7 text-white/80 sm:text-base">{job.description}</p>
                </div>

                <div className="mt-auto flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:overflow-visible lg:grid-cols-4">
                  {job.images.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => onThumbnailClick(index)}
                      className={[
                        'min-w-[72px] overflow-hidden border transition duration-300 hover:-translate-y-0.5 sm:min-w-0',
                        activeImageIndex === index ? 'border-white ring-2 ring-white/70' : 'border-white/20'
                      ].join(' ')}
                    >
                      <img src={image} alt={`${job.title} thumbnail ${index + 1}`} className="aspect-square w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
