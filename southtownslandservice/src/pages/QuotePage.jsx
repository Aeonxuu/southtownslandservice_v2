import QuoteForm from '../components/QuoteForm';
import { BadgeCheck } from 'lucide-react';

const PERKS = ['Free estimates, always', 'No hidden costs or surprises', 'We respond within 1 business day'];

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="page-shell">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <p className="eyebrow">Free Estimate</p>
            <h1 className="mt-2 text-3xl font-extrabold text-ink sm:text-4xl lg:text-5xl">
              Request a Quote
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">
              Fill out the form below and we'll get back to you within one business day with a clear, honest estimate — no obligation.
            </p>
            <ul className="mt-5 space-y-2">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-500">
                  <BadgeCheck size={15} className="shrink-0 text-moss" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="rounded-md border border-[#E4E6EB] bg-[#F0F2F5]/70 p-6 sm:p-8 shadow-[0_2px_6px_rgba(0,0,0,0.06),_0_8px_28px_rgba(0,0,0,0.14)]">
            <QuoteForm light />
          </div>
        </div>
      </div>
    </div>
  );
}
