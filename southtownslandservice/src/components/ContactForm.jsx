import { useState } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import { services } from '../data/siteData';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    await fetch('/', { method: 'POST', body: data });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-12 w-12 text-moss" />
        <h3 className="text-xl font-bold text-ink">We got your message!</h3>
        <p className="text-sm text-slate-600">We'll get back to you within one business day.</p>
      </div>
    );
  }

  return (
    <form
      name="estimate"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="grid gap-4 sm:grid-cols-2"
    >
      <input type="hidden" name="form-name" value="estimate" />
      <p className="hidden"><input name="bot-field" /></p>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.15em] text-ink/60">Name *</label>
        <input
          name="name"
          type="text"
          required
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
          className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-bold uppercase tracking-[0.15em] text-ink/60">Phone *</label>
        <input
          name="phone"
          type="tel"
          required
          placeholder="(716) 000-0000"
          value={form.phone}
          onChange={handleChange}
          className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
        />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-xs font-bold uppercase tracking-[0.15em] text-ink/60">Service Needed</label>
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-ink focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
        >
          <option value="">Select a service...</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>{s.title}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label className="text-xs font-bold uppercase tracking-[0.15em] text-ink/60">Project Details</label>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your project — size, location, what you're looking to get done..."
          value={form.message}
          onChange={handleChange}
          className="resize-none rounded-md border border-black/15 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 focus:border-moss focus:outline-none focus:ring-2 focus:ring-moss/20"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-md bg-moss px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-white transition hover:bg-olive"
        >
          <Send size={14} />
          Send Request
        </button>
      </div>
    </form>
  );
}
