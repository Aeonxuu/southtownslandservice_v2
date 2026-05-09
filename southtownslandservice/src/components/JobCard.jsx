import { motion } from 'framer-motion';

export default function JobCard({ job, isSelected, onClick, index }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className={[
        'group w-full overflow-hidden rounded-md border bg-white text-left shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]',
        isSelected ? 'border-moss ring-2 ring-moss/20' : 'border-black/5'
      ].join(' ')}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={job.images[0]}
          alt={job.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="mt-2 text-sm font-bold leading-snug text-ink line-clamp-2 sm:text-base">{job.title}</h3>
      </div>
    </motion.button>
  );
}
