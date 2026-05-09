import { useEffect, useMemo, useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';
import JobCard from '../components/JobCard';
import JobDetail from '../components/JobDetail';
import SectionHeading from '../components/SectionHeading';
import { featuredJobs, jobs } from '../data/siteData';

export default function JobsPage() {
  const orderedFeaturedJobs = useMemo(() => [...featuredJobs].sort((a, b) => b.id - a.id), []);
  const orderedJobs = useMemo(() => [...jobs].sort((a, b) => b.id - a.id), []);
  const otherJobs = useMemo(() => orderedJobs.filter((job) => !orderedFeaturedJobs.some((featuredJob) => featuredJob.id === job.id)), [orderedFeaturedJobs, orderedJobs]);
  const initialJob = useMemo(() => orderedFeaturedJobs[0] || orderedJobs[0] || jobs[0], [orderedFeaturedJobs, orderedJobs]);
  const [selectedJob, setSelectedJob] = useState(initialJob);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedJob]);

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <section className="bg-mist/60 pt-8 pb-16 sm:pt-10 sm:pb-20 lg:pt-12 lg:pb-24">
      <div className="page-shell">
        <AnimatedSection>
          <SectionHeading title="Job Gallery" center />
        </AnimatedSection>

        <div className="mx-auto mt-10 max-w-7xl">
          <div className="mb-4">
            <p className="text-left text-sm font-bold uppercase tracking-[0.22em] text-olive">Featured jobs</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {orderedFeaturedJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index}
                isSelected={selectedJob?.id === job.id && isModalOpen}
                onClick={() => {
                  setSelectedJob(job);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>

          <div className="mt-12 mb-4">
            <p className="text-left text-sm font-bold uppercase tracking-[0.22em] text-olive">Other Projects</p>
          </div>

          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {otherJobs.map((job, index) => (
              <JobCard
                key={job.id}
                job={job}
                index={index + orderedFeaturedJobs.length}
                isSelected={selectedJob?.id === job.id && isModalOpen}
                onClick={() => {
                  setSelectedJob(job);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        </div>

        <JobDetail
          job={isModalOpen ? selectedJob : null}
          activeImageIndex={activeImageIndex}
          onThumbnailClick={setActiveImageIndex}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </section>
  );
}
