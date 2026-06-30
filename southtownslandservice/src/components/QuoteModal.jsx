import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BadgeCheck } from 'lucide-react';
import QuoteForm from './QuoteForm';
import { useQuoteModal } from '../context/QuoteModalContext';

const PERKS = ['Free estimates, always', 'No hidden costs', 'Response within 1 business day'];

export default function QuoteModal() {
  const { isOpen, closeModal } = useQuoteModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
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
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-10"
          style={{
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(4, 8, 3, 0.65)',
          }}
          onClick={closeModal}
        >
          <motion.div
            key="quote-panel"
            initial={{ opacity: 0, y: 36, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Glass card */}
            <div
              className="relative overflow-hidden rounded-2xl border border-[#E4E6EB] shadow-[0_40px_80px_rgba(0,0,0,0.45)]"
              style={{
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
              }}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between border-b border-[#E4E6EB] px-6 pt-6 pb-5"
                style={{ backgroundColor: 'rgba(240, 242, 245, 0.85)' }}
              >
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-moss">Free Estimate</p>
                  <h2 className="mt-1 text-xl font-extrabold text-[#050505]">Request a Quote</h2>
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

              {/* Form body */}
              <div className="px-6 py-6">
                <QuoteForm light />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
