import { useEffect, useMemo, useState } from 'react';
import { ChevronUp } from 'lucide-react';
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
  const [selectedJob, setSelectedJob] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const filteredJobs = useMemo(() => {
    if (activeCategory === ALL) return null;
    return orderedJobs.filter((j) => j.category === activeCategory);
  }, [activeCategory, orderedJobs]);

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

        {/* Stat strip */}
        <div className="mx-auto mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/60">
              <span className="mr-1 text-base font-extrabold text-moss">48+</span>Completed Projects
            </span>
            <span className="hidden text-ink/20 sm:block">·</span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/60">
              <span className="mr-1 text-base font-extrabold text-moss">8</span>Service Types
            </span>
            <span className="hidden text-ink/20 sm:block">·</span>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-ink/60">Serving Western NY</span>
          </div>
        </div>

        {/* Category filter bar */}
        <div className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  'rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] transition-colors duration-200',
                  activeCategory === cat
                    ? 'bg-moss text-white'
                    : 'border border-ink/15 bg-white text-ink/60 hover:border-moss/40 hover:text-moss'
                ].join(' ')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          {filteredJobs ? (
            filteredJobs.length > 0 ? (
              renderGrid(filteredJobs)
            ) : (
              <p className="py-16 text-center text-sm text-ink/40">No projects found in this category.</p>
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
