import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { brand } from '../data/siteData';

const navLinkClass = (isActive) =>
  [
    'relative pb-1 text-sm font-semibold tracking-[0.16em] transition duration-300',
    isActive ? 'text-white after:absolute after:inset-x-0 after:-bottom-1 after:h-[2px] after:bg-[#C7A24A]' : 'text-white/80 hover:text-white'
  ].join(' ');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname === '/jobs' ? 'jobs' : '');
      return;
    }

    const sectionIds = ['home', 'about', 'services', 'contact'];
    const getActiveSection = () => {
      const headerOffset = 96;
      const scrollPosition = window.scrollY + headerOffset;

      const currentSection = sectionIds.reduce((activeId, sectionId) => {
        const element = document.getElementById(sectionId);

        if (!element) {
          return activeId;
        }

        const sectionTop = element.offsetTop;

        if (scrollPosition >= sectionTop - 8) {
          return sectionId;
        }

        return activeId;
      }, 'home');

      setActiveSection(currentSection);
    };

    getActiveSection();
    window.addEventListener('scroll', getActiveSection, { passive: true });
    window.addEventListener('resize', getActiveSection);

    return () => {
      window.removeEventListener('scroll', getActiveSection);
      window.removeEventListener('resize', getActiveSection);
    };
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080808] text-white backdrop-blur-xl">
        <div className="page-shell flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
            <img src={brand.logo} alt={`${brand.fullName} logo`} className="h-14 w-14 object-contain" />
            <span className="max-w-[11rem] font-display text-sm uppercase tracking-[0.18em] text-white sm:max-w-none sm:text-base">
              {brand.fullName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="/#home" className={navLinkClass(location.pathname === '/' && activeSection === 'home')}>
              HOME
            </a>
            <a href="/#about" className={navLinkClass(location.pathname === '/' && activeSection === 'about')}>
              ABOUT
            </a>
            <a href="/#services" className={navLinkClass(location.pathname === '/' && activeSection === 'services')}>
              SERVICES
            </a>
            <a href="/jobs" className={navLinkClass(location.pathname === '/jobs')}>
              JOBS
            </a>
            <a href="/#contact" className={navLinkClass(location.pathname === '/' && activeSection === 'contact')}>
              CONTACT
            </a>
          </nav>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle navigation"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="fixed inset-x-0 top-[4.5rem] z-40 max-h-[50vh] overflow-y-auto bg-[#080808]/95 backdrop-blur-xl md:hidden"
          >
            <div className="page-shell py-3 text-white">
              <div className="flex flex-col">
                <a href="/#home" className="py-4 text-sm font-semibold tracking-[0.16em] text-white/80 transition duration-300 hover:text-white" onClick={closeMenu}>
                  HOME
                </a>
                <div className="h-px bg-white/10" />
                <a href="/#about" className="py-4 text-sm font-semibold tracking-[0.16em] text-white/80 transition duration-300 hover:text-white" onClick={closeMenu}>
                  ABOUT
                </a>
                <div className="h-px bg-white/10" />
                <a href="/#services" className="py-4 text-sm font-semibold tracking-[0.16em] text-white/80 transition duration-300 hover:text-white" onClick={closeMenu}>
                  SERVICES
                </a>
                <div className="h-px bg-white/10" />
                <a href="/jobs" className="py-4 text-sm font-semibold tracking-[0.16em] text-white/80 transition duration-300 hover:text-white" onClick={closeMenu}>
                  JOBS
                </a>
                <div className="h-px bg-white/10" />
                <a href="/#contact" className="py-4 text-sm font-semibold tracking-[0.16em] text-white/80 transition duration-300 hover:text-white" onClick={closeMenu}>
                  CONTACT
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
