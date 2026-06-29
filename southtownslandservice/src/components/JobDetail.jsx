import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Images, MessageCircle, Tag, X } from 'lucide-react';

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
            className="relative flex h-[100dvh] w-[100dvw] max-w-[1600px] flex-col overflow-hidden bg-white shadow-2xl sm:h-[96vh] sm:w-[96vw] lg:flex-row"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-3 top-3 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E4E6EB] text-[#050505] shadow-sm transition duration-200 hover:bg-[#CED0D4] sm:right-4 sm:top-4"
              aria-label="Close job gallery"
            >
              <X className="h-4 w-4" />
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

            {/* Mobile: hard edge separating dark photo panel from light sidebar */}
            <div className="h-px w-full bg-[#E4E6EB] lg:hidden" />

            <div className="flex flex-col border-t border-[#E4E6EB] bg-white lg:w-[400px] lg:flex-shrink-0 lg:border-l lg:border-t-0 xl:w-[450px]">
              {/* Header bar — category + counter */}
              <div className="flex items-center justify-between border-b border-[#E4E6EB] bg-[#F0F2F5] px-5 py-3 lg:px-6">
                {job.category ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-moss/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-moss">
                    <Tag size={10} />
                    {job.category}
                  </span>
                ) : (
                  <span />
                )}
                <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#65676B]">
                  <Images size={11} className="text-[#BCC0C4]" />
                  {activeImageIndex + 1} / {job.images.length}
                </span>
              </div>

              {/* Scrollable body */}
              <div className="flex flex-1 flex-col gap-5 overflow-y-auto p-5 lg:p-6">
                {/* Title block */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#BCC0C4]">Project</p>
                  <h3 className="text-xl font-extrabold leading-snug text-[#050505] sm:text-2xl lg:text-3xl">{job.title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm leading-7 text-[#65676B]">{job.description}</p>

                {/* Progress dots */}
                <div className="flex flex-wrap gap-1.5">
                  {job.images.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => onThumbnailClick(i)}
                      aria-label={`Go to image ${i + 1}`}
                      className={[
                        'h-1.5 rounded-full transition-all duration-300',
                        i === activeImageIndex
                          ? 'w-6 bg-moss'
                          : 'w-1.5 bg-[#CED0D4] hover:bg-[#BCC0C4]'
                      ].join(' ')}
                    />
                  ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E4E6EB]" />

                {/* Thumbnail strip */}
                <div>
                  <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#BCC0C4]">Gallery</p>
                  <div className="grid grid-cols-5 gap-1.5 sm:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5">
                    {job.images.map((image, index) => (
                      <button
                        key={image}
                        type="button"
                        onClick={() => onThumbnailClick(index)}
                        className={[
                          'group relative overflow-hidden rounded-sm border transition duration-200',
                          activeImageIndex === index
                            ? 'border-moss ring-2 ring-moss/40'
                            : 'border-[#E4E6EB] hover:border-[#BCC0C4]'
                        ].join(' ')}
                      >
                        <img
                          src={image}
                          alt={`${job.title} thumbnail ${index + 1}`}
                          className="aspect-square w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                        {activeImageIndex === index && (
                          <div className="absolute inset-0 bg-moss/10" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sticky CTA footer */}
              <div className="border-t border-[#E4E6EB] bg-[#F0F2F5] p-5 lg:p-6">
                <a
                  href="/#estimate"
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2.5 rounded-md bg-moss py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition duration-200 hover:bg-olive"
                >
                  <MessageCircle size={15} />
                  Get a Free Estimate
                </a>
                <p className="mt-2.5 text-center text-[11px] text-[#65676B]">No obligation · We respond within 1 business day</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
