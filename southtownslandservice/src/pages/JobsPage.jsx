import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronUp, Search, SlidersHorizontal, X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import JobCard from '../components/JobCard';
import JobDetail from '../components/JobDetail';
import SectionHeading from '../components/SectionHeading';
import { featuredJobs, jobs } from '../data/siteData';

const ALL = 'All';

export default function JobsPage() {
  const orderedFeaturedJobs = useMemo(() => [...featuredJobs].sort((a, b) => b.id - a.id), []);
  const orderedJobs = useMemo(() => [...jobs].sort((a, b) => b.id - a.id), []);
  const otherJobs = useMemo(
    () => orderedJobs.filter((job) => !orderedFeaturedJobs.some((fj) => fj.id === job.id)),
    [orderedFeaturedJobs, orderedJobs]
  );

  const categories = useMemo(() => {
    const cats = new Set(orderedJobs.map((j) => j.category).filter(Boolean));
    return [ALL, ...Array.from(cats).sort()];
  }, [orderedJobs]);

  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const filterRef = useRef(null);

  const isFiltered = activeCategory !== ALL || searchQuery.trim() !== '';

  const filteredJobs = useMemo(() => {
    if (!isFiltered) return null;
    let result = orderedJobs;
    if (activeCategory !== ALL) {
      result = result.filter((j) => j.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (j) =>
          j.title?.toLowerCase().includes(q) ||
          j.category?.toLowerCase().includes(q) ||
          j.description?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery, orderedJobs, isFiltered]);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedJob]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filterOpen]);

  const openJob = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const renderGrid = (list, offset = 0) => (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {list.map((job, index) => (
        <JobCard
          key={job.id}
          job={job}
          index={index + offset}
          isSelected={selectedJob?.id === job.id && isModalOpen}
          onClick={() => openJob(job)}
        />
      ))}
    </div>
  );

  return (
    <section className="bg-mist/60 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <div className="page-shell">
        <AnimatedSection>
          <SectionHeading title="Job Gallery" center />
        </AnimatedSection>

        {/* Search + Filter bar */}
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink/35 pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search projects…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-ink/15 bg-white py-2.5 pl-9 pr-10 text-sm text-ink placeholder:text-ink/40 focus:border-moss/50 focus:outline-none focus:ring-2 focus:ring-moss/15 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Filter button + dropdown */}
            <div className="relative shrink-0" ref={filterRef}>
              <button
                onClick={() => setFilterOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-md border border-ink bg-ink px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-white transition-colors whitespace-nowrap hover:bg-ink/80"
                aria-label="Filter by category"
              >
                <SlidersHorizontal size={13} />
                <span className="hidden sm:inline">
                  {activeCategory !== ALL ? activeCategory : 'Filter'}
                </span>
              </button>

              {filterOpen && (
                <div className="absolute right-0 top-full z-20 mt-2 min-w-[180px] rounded-xl border border-ink/10 bg-white py-1.5 shadow-xl">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setFilterOpen(false);
                      }}
                      className={[
                        'w-full px-4 py-2 text-left text-xs font-bold uppercase tracking-[0.12em] transition-colors',
                        activeCategory === cat
                          ? 'bg-moss/10 text-moss'
                          : 'text-ink/60 hover:bg-mist hover:text-ink'
                      ].join(' ')}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active filter chip */}
          {activeCategory !== ALL && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-xs text-ink/50">Filtering by:</span>
              <button
                onClick={() => setActiveCategory(ALL)}
                className="flex items-center gap-1 rounded-md bg-ink/8 px-3 py-1 text-xs font-bold text-ink hover:bg-ink/15 transition"
              >
                {activeCategory}
                <X size={11} />
              </button>
            </div>
          )}
        </div>

        <div className="mx-auto mt-6 max-w-7xl">
          {filteredJobs ? (
            filteredJobs.length > 0 ? (
              renderGrid(filteredJobs)
            ) : (
              <p className="py-16 text-center text-sm text-ink/40">No projects found.</p>
            )
          ) : (
            <>
              <div className="mb-4">
                <p className="text-left text-sm font-bold uppercase tracking-[0.22em] text-olive">Featured jobs</p>
              </div>
              {renderGrid(orderedFeaturedJobs)}

              <div className="mb-4 mt-12">
                <p className="text-left text-sm font-bold uppercase tracking-[0.22em] text-olive">Other Projects</p>
              </div>
              {renderGrid(otherJobs, orderedFeaturedJobs.length)}
            </>
          )}
        </div>

        <JobDetail
          job={isModalOpen ? selectedJob : null}
          activeImageIndex={activeImageIndex}
          onThumbnailClick={setActiveImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-moss text-white shadow-lg transition hover:bg-olive"
          aria-label="Back to top"
        >
          <ChevronUp size={18} />
        </button>
      )}
    </section>
  );
}
