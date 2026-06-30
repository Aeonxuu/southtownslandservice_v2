import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Loader2, Send } from 'lucide-react';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SERVICES = [
  'Land Clearing',
  'Brush Hogging',
  'Excavation',
  'Grading & Leveling',
  'Trench Digging',
  'Site Preparation',
  'Other',
];

const TIMES = ['Morning', 'Afternoon', 'Evening'];

const inputClass =
  'w-full rounded-md border border-white/15 bg-white/8 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/25 transition';

const labelClass = 'block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 mb-1.5';

export default function QuoteForm() {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY });
      setStatus('success');
      formRef.current?.reset();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <CheckCircle className="h-12 w-12 text-moss" />
        <h3 className="text-xl font-bold text-white">Thanks! We'll be in touch within 1 business day.</h3>
        <p className="text-sm text-white/50">We'll reach out by phone or email to discuss your project.</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-moss underline-offset-4 hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
      {/* Full Name */}
      <div>
        <label className={labelClass}>Full Name <span className="text-moss">*</span></label>
        <input
          name="from_name"
          type="text"
          required
          placeholder="John Smith"
          className={inputClass}
        />
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>Phone Number <span className="text-moss">*</span></label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="(716) 000-0000"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      {/* Town */}
      <div>
        <label className={labelClass}>Town / City <span className="text-moss">*</span></label>
        <input
          name="town"
          type="text"
          required
          placeholder="Hamburg, NY"
          className={inputClass}
        />
      </div>

      {/* Service */}
      <div>
        <label className={labelClass}>Service Needed <span className="text-moss">*</span></label>
        <select name="service" required className={inputClass + ' appearance-none cursor-pointer'}>
          <option value="" className="bg-ink">Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s} className="bg-ink">{s}</option>
          ))}
        </select>
      </div>

      {/* Best Time */}
      <div>
        <label className={labelClass}>Best Time to Call</label>
        <select name="best_time" className={inputClass + ' appearance-none cursor-pointer'}>
          <option value="" className="bg-ink">No preference</option>
          {TIMES.map((t) => (
            <option key={t} value={t} className="bg-ink">{t}</option>
          ))}
        </select>
      </div>

      {/* Project Description */}
      <div className="sm:col-span-2">
        <label className={labelClass}>Project Details</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us a little about your project, property size, or timeline."
          className={inputClass + ' resize-none'}
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <p className="sm:col-span-2 text-sm text-red-400">
          Something went wrong. Please try calling us directly at (716) 983-6564.
        </p>
      )}

      {/* Submit */}
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2.5 rounded-md bg-moss px-7 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-olive disabled:opacity-60"
        >
          {status === 'sending' ? (
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
    </form>
  );
}
