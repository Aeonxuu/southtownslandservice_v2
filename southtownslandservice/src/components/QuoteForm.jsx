import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Clock, Loader2, Send } from 'lucide-react';

// ── Rate limiting ────────────────────────────────────────────────────────────
const RL_KEY     = 'stls_quote_ts';  // localStorage key
const RL_MAX     = 3;                // max submissions
const RL_WINDOW  = 24 * 60 * 60 * 1000; // 24-hour rolling window

function getTimestamps() {
  try {
    const raw = localStorage.getItem(RL_KEY);
    const now = Date.now();
    return raw
      ? JSON.parse(raw).filter((t) => now - t < RL_WINDOW)
      : [];
  } catch {
    return [];
  }
}

function recordTimestamp() {
  const timestamps = [...getTimestamps(), Date.now()];
  try { localStorage.setItem(RL_KEY, JSON.stringify(timestamps)); } catch {}
}

function getRateLimitInfo() {
  const timestamps = getTimestamps();
  const blocked = timestamps.length >= RL_MAX;
  if (!blocked) return { blocked: false, resetIn: 0 };
  const oldest  = Math.min(...timestamps);
  const resetIn = Math.max(0, oldest + RL_WINDOW - Date.now());
  return { blocked: true, resetIn };
}

function formatTime(ms) {
  const h = Math.floor(ms / 3_600_000);
  const m = Math.ceil((ms % 3_600_000) / 60_000);
  if (h > 0) return `${h}h ${m}m`;
  return `${m} minute${m !== 1 ? 's' : ''}`;
}
// ────────────────────────────────────────────────────────────────────────────

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

const darkInput =
  'w-full rounded-md border px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 transition';
const lightInput =
  'w-full rounded-md border px-4 py-3 text-sm text-[#050505] placeholder:text-[#BCC0C4] focus:outline-none focus:ring-2 transition';

const darkLabel = 'block text-[10px] font-bold uppercase tracking-[0.18em] text-white/50 mb-1.5';
const lightLabel = 'block text-[10px] font-bold uppercase tracking-[0.18em] text-[#65676B] mb-1.5';

function validateEmail(val) {
  if (!val) return null; // optional field
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim())
    ? null
    : 'Enter a valid email address (e.g. john@example.com)';
}

function validatePhone(val) {
  if (!val) return 'Phone number is required';
  const digits = val.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 11) {
    return 'Enter a valid 10-digit phone number (e.g. 716-983-6564)';
  }
  return null;
}

export default function QuoteForm({ light = false }) {
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error | blocked
  const [errors, setErrors] = useState({});
  const [resetIn, setResetIn] = useState(0);

  // Check rate limit once on mount
  useState(() => {
    const { blocked, resetIn: ms } = getRateLimitInfo();
    if (blocked) { setStatus('blocked'); setResetIn(ms); }
  });

  const inputClass = light ? lightInput : darkInput;
  const labelClass = light ? lightLabel : darkLabel;

  const borderNormal = light ? 'border-[#E4E6EB] bg-white focus:border-moss focus:ring-moss/20'
                              : 'border-white/15 bg-white/8 focus:border-moss focus:ring-moss/25';
  const borderError  = light ? 'border-red-400 bg-white focus:border-red-400 focus:ring-red-200'
                              : 'border-red-400 bg-white/8 focus:border-red-400 focus:ring-red-400/20';
  const errorText    = light ? 'text-red-600' : 'text-red-400';

  const fieldClass = (name) =>
    inputClass + ' ' + (errors[name] ? borderError : borderNormal);

  const clearError = (name) =>
    setErrors((prev) => { const next = { ...prev }; delete next[name]; return next; });

  const validate = (data) => {
    const errs = {};
    const phoneErr = validatePhone(data.phone);
    if (phoneErr) errs.phone = phoneErr;
    const emailErr = validateEmail(data.email);
    if (emailErr) errs.email = emailErr;
    return errs;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const err = validatePhone(value);
      setErrors((prev) => err ? { ...prev, phone: err } : (() => { const n = { ...prev }; delete n.phone; return n; })());
    }
    if (name === 'email') {
      const err = validateEmail(value);
      setErrors((prev) => err ? { ...prev, email: err } : (() => { const n = { ...prev }; delete n.email; return n; })());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Re-check rate limit in case the window closed while the form was open
    const { blocked, resetIn: ms } = getRateLimitInfo();
    if (blocked) { setStatus('blocked'); setResetIn(ms); return; }

    const form = formRef.current;
    const data = Object.fromEntries(new FormData(form));
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, { publicKey: PUBLIC_KEY });
      recordTimestamp();
      setStatus('success');
      form.reset();
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  if (status === 'blocked') {
    return (
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <div className={`flex h-14 w-14 items-center justify-center rounded-full ${light ? 'bg-amber-100' : 'bg-amber-400/15'}`}>
          <Clock size={26} className="text-amber-500" />
        </div>
        <h3 className={`text-lg font-bold ${light ? 'text-[#050505]' : 'text-white'}`}>
          You've already submitted 3 requests today.
        </h3>
        <p className={`max-w-xs text-sm leading-6 ${light ? 'text-[#65676B]' : 'text-white/50'}`}>
          To keep our inbox manageable, we limit quote requests to 3 per 24 hours.
          You can try again in <span className="font-semibold">{formatTime(resetIn)}</span>.
        </p>
        <p className={`text-sm ${light ? 'text-[#65676B]' : 'text-white/50'}`}>
          Need to reach us sooner?{' '}
          <a href="tel:+17169836564" className="font-bold text-moss underline-offset-4 hover:underline">
            Call (716) 983-6564
          </a>
        </p>
      </div>
    );
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-14 text-center">
        <CheckCircle className="h-12 w-12 text-moss" />
        <h3 className={`text-xl font-bold ${light ? 'text-[#050505]' : 'text-white'}`}>
          Thanks! We'll be in touch within 1 business day.
        </h3>
        <p className={`text-sm ${light ? 'text-[#65676B]' : 'text-white/50'}`}>
          We'll reach out by phone or email to discuss your project.
        </p>
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
          className={fieldClass('from_name')}
          onChange={() => clearError('from_name')}
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
          className={fieldClass('phone')}
          onBlur={handleBlur}
          onChange={() => clearError('phone')}
        />
        {errors.phone && (
          <p className={`mt-1.5 text-xs ${errorText}`}>{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email Address</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className={fieldClass('email')}
          onBlur={handleBlur}
          onChange={() => clearError('email')}
        />
        {errors.email && (
          <p className={`mt-1.5 text-xs ${errorText}`}>{errors.email}</p>
        )}
      </div>

      {/* Town */}
      <div>
        <label className={labelClass}>Town / City <span className="text-moss">*</span></label>
        <input
          name="town"
          type="text"
          required
          placeholder="Hamburg, NY"
          className={fieldClass('town')}
          onChange={() => clearError('town')}
        />
      </div>

      {/* Service */}
      <div>
        <label className={labelClass}>Service Needed <span className="text-moss">*</span></label>
        <select name="service" required className={fieldClass('service') + ' appearance-none cursor-pointer'}>
          <option value="" className={light ? 'bg-white' : 'bg-ink'}>Select a service…</option>
          {SERVICES.map((s) => (
            <option key={s} value={s} className={light ? 'bg-white' : 'bg-ink'}>{s}</option>
          ))}
        </select>
      </div>

      {/* Best Time */}
      <div>
        <label className={labelClass}>Best Time to Call</label>
        <select name="best_time" className={fieldClass('best_time') + ' appearance-none cursor-pointer'}>
          <option value="" className={light ? 'bg-white' : 'bg-ink'}>No preference</option>
          {TIMES.map((t) => (
            <option key={t} value={t} className={light ? 'bg-white' : 'bg-ink'}>{t}</option>
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
          className={fieldClass('message') + ' resize-none'}
        />
      </div>

      {/* EmailJS send error */}
      {status === 'error' && (
        <p className={`sm:col-span-2 text-sm ${errorText}`}>
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
