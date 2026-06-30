import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck, Loader2, Send } from 'lucide-react';
import QuoteForm from './QuoteForm';
import { useQuoteModal } from '../context/QuoteModalContext';

const PERKS = ['Free estimates, always', 'No hidden costs', 'Response within 1 business day'];

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();
  const [formStatus, setFormStatus] = useState('idle');
  const [showScrollHint, setShowScrollHint] = useState(true);
  const scrollBodyRef = useRef(null);

  const handleBodyScroll = () => {
    const el = scrollBodyRef.current;
    if (!el) return;
    setShowScrollHint(el.scrollHeight - el.scrollTop > el.clientHeight + 4);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setShowScrollHint(true);
    } else {
      document.body.style.overflow = '';
      setFormStatus('idle');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="quote-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[60] flex items-start sm:items-center justify-center px-4 pt-4 pb-4 sm:py-10"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(4, 8, 3, 0.65)',
          }}
          onClick={closeModal}
        >
          <motion.div
            key="quote-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="quote-modal-title"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass card — flex column, capped so form body scrolls internally */}
            <div
              className="relative flex flex-col overflow-hidden border border-[#E4E6EB] shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                maxHeight: '90svh',
              }}
            >
              {/* Header — never scrolls */}
              <div
                className="flex shrink-0 items-start justify-between border-b border-[#E4E6EB] px-6 pt-6 pb-5"
                style={{ backgroundColor: 'rgba(240, 242, 245, 0.85)' }}
              >
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-moss">Free Estimate</p>
                  <h2 id="quote-modal-title" className="mt-1 text-lg md:text-xl font-extrabold text-[#050505]">Request a Quote</h2>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {PERKS.map((perk) => (
                      <li key={perk} className="flex items-center gap-2 text-xs text-[#65676B]">
                        <BadgeCheck size={12} className="shrink-0 text-moss" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E4E6EB] text-[#65676B] transition hover:bg-[#CED0D4] hover:text-[#050505]"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Body — takes all remaining height, scrolls internally */}
              <div
                ref={scrollBodyRef}
                onScroll={handleBodyScroll}
                className="min-h-0 flex-1 overflow-y-auto px-6 py-6"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <QuoteForm light noSubmit onStatusChange={setFormStatus} />
              </div>

              {/* Submit footer — always visible; gradient extends upward to hint at unscrolled content */}
              {!['success', 'blocked'].includes(formStatus) && (
                <div
                  className="relative shrink-0 border-t border-[#E4E6EB]/60 px-6 pt-4"
                  style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)' }}
                >
                  <div
                    className={`pointer-events-none absolute bottom-full left-0 right-0 h-14 bg-gradient-to-t from-white/95 to-transparent transition-opacity duration-200 ${showScrollHint ? 'opacity-100' : 'opacity-0'}`}
                    aria-hidden="true"
                  />
                  <button
                    type="submit"
                    form="quote-form-id"
                    disabled={formStatus === 'sending'}
                    className="flex w-full items-center justify-center gap-2.5 rounded-md bg-moss px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-olive disabled:opacity-60"
                  >
                    {formStatus === 'sending' ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Request a Free Quote
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
