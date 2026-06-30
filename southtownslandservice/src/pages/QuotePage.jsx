import QuoteForm from '../components/QuoteForm';
import { BadgeCheck } from 'lucide-react';

const PERKS = ['Free estimates, always', 'No hidden costs or surprises', 'We respond within 1 business day'];

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-ink pt-24 pb-20">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <p className="eyebrow" style={{ color: '#7a9e3b' }}>Free Estimate</p>
            <h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              Request a Quote
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Fill out the form below and we'll get back to you within one business day with a clear, honest estimate — no obligation.
            </p>
            <ul className="mt-5 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-white/60">
                  <BadgeCheck size={15} className="shrink-0 text-moss" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="rounded-md border border-white/10 bg-white/5 p-6 sm:p-8">
            <QuoteForm />
          </div>
        </div>
      </div>
    </div>
  );
}
