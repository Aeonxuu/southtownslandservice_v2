import { useEffect, useState, Fragment } from 'react';
import { ArrowRight, BadgeCheck, ChevronDown, ChevronRight, ClipboardList, CheckCircle2, Mail, MapPin, Phone, Shield, ShieldCheck, Star } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import { useQuoteModal } from '../context/QuoteModalContext';
import { brand, benefits, contacts, hero, serviceAreas, services, stats } from '../data/siteData';

const contactIcons = {
  facebook: Star,
  badge: BadgeCheck,
  star: Star,
  phone: Phone,
  mail: Mail
};

export default function HomePage() {
  const { openModal } = useQuoteModal();
  const reducedMotion = useReducedMotion();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const scriptId = 'elfsight-platform-script';

    if (document.getElementById(scriptId)) {
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-[65vh] overflow-hidden bg-ink text-white sm:min-h-[calc(100vh-4.5rem)]">
        {/* aria-hidden: decorative background video, no informational content */}
        <video aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline controlsList="nofullscreen nodownload noremoteplayback">
          <source src={brand.heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-hero-grid" />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative page-shell flex min-h-[65vh] items-center justify-center py-8 sm:py-16 text-center sm:min-h-[calc(100vh-4.5rem)]">
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-sand/90 sm:text-sm lg:text-base">{hero.eyebrow}</p>
            <h1 className="mt-3 font-display text-3xl font-black uppercase leading-[1.1] tracking-[0.02em] sm:mt-4 sm:text-5xl lg:text-7xl">
              {hero.titleTop}
              <br />
              <span className="whitespace-nowrap">{hero.titleBottom}</span>
            </h1>
            <div className="mt-4 flex flex-row items-center justify-center gap-2 sm:mt-7 sm:gap-3">
              <button
                onClick={openModal}
                className="primary-button border-sand bg-sand text-ink px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm hover:bg-transparent hover:text-white"
              >
                {hero.primaryCta.label}
                <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
              </button>
              <a href={hero.secondaryCta.href} className="secondary-button px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm">
                {hero.secondaryCta.label}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ── */}
      {(() => {
        const BADGES = [
          { icon: <ShieldCheck size={16} className="shrink-0 text-sand" />, label: 'Fully Licensed' },
          { icon: <Shield size={16} className="shrink-0 text-sand" />, label: 'Fully Insured' },
          { icon: <BadgeCheck size={16} className="shrink-0 text-sand" />, label: 'Free Estimates' },
          { icon: <MapPin size={16} className="shrink-0 text-sand" />, label: 'Locally Owned & Operated' },
        ];
        return (
          <div style={{ backgroundColor: '#2f2b27' }}>
            {/* Mobile ticker (< 768px) ─────────────────────────────────────────
                aria-hidden: identical info exists in the footer trust strip
                Animation via inline style — immune to global reduced-motion CSS
                rules. useReducedMotion() from Framer Motion controls the gate.  */}
            <div
              className={`py-3.5 md:hidden ${reducedMotion ? 'ticker-fallback-scroll' : ''}`}
              style={{ overflow: reducedMotion ? 'auto' : 'hidden' }}
              aria-hidden="true"
            >
              {/* Badges duplicated × 2: translateX(-50%) scrolls exactly one full
                  set width, landing on the identical second copy → seamless loop */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  width: 'max-content',
                  alignItems: 'center',
                  willChange: 'transform',
                  animation: reducedMotion ? 'none' : 'badge-ticker 32s linear infinite',
                }}
              >
                {[...BADGES, ...BADGES].map(({ icon, label }, i) => (
                  <span key={i} className="inline-flex shrink-0 items-center">
                    <span className="inline-flex items-center gap-2 px-5">
                      {icon}
                      <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                        {label}
                      </span>
                    </span>
                    <span className="text-[10px] text-white/30">•</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Desktop static layout (≥ 768px) — unchanged ─────────────────── */}
            <div className="page-shell hidden gap-x-6 gap-y-4 py-5 md:grid md:grid-cols-2 lg:flex lg:items-center lg:justify-center lg:gap-10">
              {BADGES.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  {icon}
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">{label}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* ── ABOUT ── */}
      <section id="about" className="section-shell bg-sand">
        <div className="page-shell">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Simple, clear reasons to trust the work"
              center
            />
          </AnimatedSection>

          {/* Mobile benefits — stacked list, all visible at once */}
          <div className="mt-8 flex flex-col gap-3 md:hidden">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex items-start gap-4 border-2 border-[#546326] bg-[#FFFCE9] px-4 py-4">
                <div className="mt-0.5 shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full bg-moss/10 text-moss">
                  <BadgeCheck className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-5 text-slate-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop benefits grid */}
          <div className="mt-10 hidden gap-6 md:grid md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <AnimatedSection key={benefit.title} delay={index * 0.06}>
                <div className="rounded-none border-2 border-[#546326] bg-[#FFFCE9] h-full p-6 shadow-sm flex flex-col items-center text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-moss/10 text-moss">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ink">{benefit.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{benefit.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="section-shell bg-white">
        <div className="page-shell">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Services"
              title="What we do"
              center
            />
          </AnimatedSection>

          <div className="mt-10 grid items-stretch gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <AnimatedSection key={service.title} delay={index * 0.07} className="h-full">
                <div className="group flex h-full flex-col overflow-hidden rounded-md border border-black/8 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.11)]">
                  <div className="relative aspect-[2/1] overflow-hidden bg-mist">
                    <img
                      src={service.image}
                      alt={service.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-base font-bold text-ink">{service.title}</h3>
                    <ul className="mt-3 flex-1 space-y-1.5">
                      {service.jobs.map((job) => (
                        <li key={job} className="text-sm text-slate-500">
                          {job}
                        </li>
                      ))}
                    </ul>
                    <a
                      href="/jobs"
                      className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.14em] text-moss transition hover:text-olive"
                    >
                      View Projects <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>


      {/* ── HOW IT WORKS ── */}
      {(() => {
        const STEPS = [
          {
            Icon: Phone,
            title: 'Contact Us',
            text: "Call us or fill out our quote form. Tell us about your property and what you need done. We'll get back to you fast.",
          },
          {
            Icon: ClipboardList,
            title: 'Free On-Site Estimate',
            text: "We come to your property, assess the job, and give you a clear, written estimate. No surprises, no pressure.",
          },
          {
            Icon: CheckCircle2,
            title: 'Job Done Right',
            text: "We show up, do the work, and leave the property clean. You only pay once the job meets your standards.",
          },
        ];

        return (
          <section id="how-it-works" className="section-shell bg-[#F8F7F5]">
            <div className="page-shell">
              <AnimatedSection>
                <SectionHeading eyebrow="Simple Process" title="How It Works" center />
              </AnimatedSection>

              <div className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
                {/* Fragment key: avoids React "each child must have a unique key" warning on <>fragments */}
                {STEPS.map((step, i) => (
                  <Fragment key={step.title}>
                    <AnimatedSection delay={i * 0.1} className="flex flex-1 flex-col items-center text-center px-6">
                      {/* Icon circle with step number badge */}
                      <div className="relative">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-moss/25 bg-white shadow-sm">
                          <step.Icon size={30} className="text-moss" strokeWidth={1.5} />
                        </div>
                        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-moss text-[11px] font-extrabold text-white shadow">
                          {i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 text-base font-bold text-ink">{step.title}</h3>
                      <p className="mt-2.5 max-w-xs text-sm leading-6 text-slate-500">{step.text}</p>
                    </AnimatedSection>

                    {/* Arrow connector — desktop only */}
                    {i < STEPS.length - 1 && (
                      <div className="hidden lg:flex items-start justify-center pt-10 w-10 shrink-0">
                        <ArrowRight size={20} className="text-moss/35" strokeWidth={2} />
                      </div>
                    )}
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* ── CONTACT ── */}
      <section id="contact" className="section-shell bg-sky text-white">
        <div className="page-shell text-center">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-white sm:text-3xl lg:text-5xl">
                CONTACT US
              </h2>
              <p className="mt-2 text-xs font-medium leading-6 text-white/88 sm:mt-3 sm:text-sm lg:text-base">
                You can contact us through the following
              </p>
            </div>
          </AnimatedSection>

          {/* Mobile — stacked tappable rows, all visible at once */}
          <div className="mt-8 flex flex-col gap-2 lg:hidden">
            {contacts.map((contact) => {
              const iconSources = {
                Facebook: '/media/icons/facebook_icon.png',
                BBB: '/media/icons/bbb_icon.png',
                Yelp: '/media/icons/yelp_icon.png'
              };
              const iconSource = iconSources[contact.type];
              const Icon = contactIcons[contact.icon] || BadgeCheck;

              return (
                <a
                  key={contact.type}
                  href={contact.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-sm transition active:bg-white/20"
                >
                  <div className="shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                    {iconSource
                      ? <img src={iconSource} alt={`${contact.type} icon`} loading="lazy" className="h-7 w-7 object-contain" />
                      : <Icon className="h-4 w-4 text-white" />
                    }
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">{contact.type}</p>
                    <p className="text-sm font-semibold text-white truncate">{contact.label}</p>
                  </div>
                  <ChevronRight className="shrink-0 h-4 w-4 text-white/40" />
                </a>
              );
            })}
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid mt-10 gap-5 grid-cols-3">
            {contacts.map((contact, index) => {
              const iconSources = {
                Facebook: '/media/icons/facebook_icon.png',
                BBB: '/media/icons/bbb_icon.png',
                Yelp: '/media/icons/yelp_icon.png'
              };
              const iconSource = iconSources[contact.type];
              const Icon = contactIcons[contact.icon] || BadgeCheck;

              return (
                <AnimatedSection key={contact.type} delay={index * 0.05}>
                  <a href={contact.href} target="_blank" rel="noreferrer" className="block h-full border border-white/15 bg-white/10 p-6 shadow-soft backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:bg-white/15">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white">
                      {iconSource ? <img src={iconSource} alt={`${contact.type} icon`} loading="lazy" className="h-12 w-12 object-contain" /> : <Icon className="h-5 w-5" />}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">{contact.type}</p>
                    <h3 className="mt-2 text-lg font-bold text-white">{contact.label}</h3>
                  </a>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      {(() => {
        // ─────────────────────────────────────────────────────────────
        // SWAP THESE URLs when the Google Business Profile is confirmed
        const GOOGLE_URL = 'https://www.google.com/search?q=Southtowns+Land+Service+LLC+Boston+NY+reviews';
        const BBB_URL    = 'https://www.bbb.org/us/ny/boston/profile/excavating-contractors/southtowns-land-service-llc-0041-236029104/';

        // ─────────────────────────────────────────────────────────────
        // REPLACE THESE with real Google reviews when available.
        // Each object: { name, location, rating (1-5), text }
        const reviews = [
          {
            name: 'Mike R.',
            location: 'Hamburg, NY',
            rating: 5,
            text: 'Fantastic work clearing out our overgrown back field. They were on time, professional, and left the property looking great. Would absolutely hire again.',
          },
          {
            name: 'Sarah T.',
            location: 'Eden, NY',
            rating: 5,
            text: 'Had them put in a new stone driveway and grade the whole lot. Price was fair and the crew worked fast. Very happy with the results.',
          },
          {
            name: 'Dave K.',
            location: 'Orchard Park, NY',
            rating: 5,
            text: 'Hired Southtowns for brush hogging and stump removal. They knocked it out in a day. Honest, hardworking guys — highly recommend.',
          },
          {
            name: 'Lisa M.',
            location: 'Springville, NY',
            rating: 5,
            text: 'They did excavation and drainage work on our property. Showed up when they said they would and the job was done right the first time.',
          },
        ];
        // ─────────────────────────────────────────────────────────────

        const Stars = ({ count = 5 }) => (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: count }).map((_, i) => (
              <Star key={i} size={13} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        );

        return (
          <section id="reviews" className="section-shell bg-[#F8F7F5]">
            <div className="page-shell">
              {/* Header */}
              <AnimatedSection>
                <div className="text-center">
                  <p className="eyebrow">Customer Reviews</p>
                  <h2 className="section-title">What Our Customers Say</h2>
                  <a
                    href={GOOGLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 transition hover:text-ink"
                  >
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="font-bold text-ink">5.0</span>
                    <span>· Google Reviews</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </AnimatedSection>

              {/* Review cards — 2-column grid */}
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {reviews.map((review, index) => (
                  <AnimatedSection key={review.name} delay={index * 0.07}>
                    <div className="flex h-full flex-col gap-4 rounded-md border border-black/8 bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                      <Stars count={review.rating} />
                      <p className="flex-1 text-sm leading-7 text-slate-600">"{review.text}"</p>
                      <div>
                        <p className="text-sm font-bold text-ink">{review.name}</p>
                        {/* text-slate-500 ≈ 4.6:1 on white — slate-400 was only 2.77:1, fails WCAG AA */}
                        <p className="text-xs text-slate-500">{review.location}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                ))}
              </div>

              {/* CTA row */}
              <AnimatedSection delay={0.18}>
                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-5">
                  <a
                    href={GOOGLE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-moss px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-moss transition hover:bg-moss hover:text-white"
                  >
                    See All Reviews on Google <ArrowRight size={13} />
                  </a>
                  <a
                    href={BBB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-black/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-500 transition hover:border-ink hover:text-ink"
                  >
                    View BBB Profile <ArrowRight size={13} />
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </section>
        );
      })()}


      {/* ── SERVICE AREA ── */}
      <section id="areas" className="section-shell bg-ink text-white">
        <div className="page-shell">
          <AnimatedSection>
            <div className="[&_.eyebrow]:text-sand [&_.section-title]:text-white">
              <SectionHeading
                eyebrow="Service Area"
                title={serviceAreas.headline}
                center
              />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.08}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {serviceAreas.regions.map((region) => (
                <span
                  key={region}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white/90"
                >
                  {region}
                </span>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.14}>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
                {serviceAreas.towns.map((town) => (
                  <span key={town} className="flex items-center gap-1 text-sm text-white/60">
                    <MapPin size={11} className="text-moss" />
                    {town}
                  </span>
                ))}
              </div>
              <p className="mt-8 text-center text-sm text-white/50">{serviceAreas.note}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FAQ ── */}
      {(() => {
        const FAQS = [
          {
            q: 'Are you licensed and insured?',
            a: 'Yes. Southtowns Land Service is fully licensed and insured for all land clearing, excavation, and grading work in New York State. We carry general liability insurance and workers\' compensation.',
          },
          {
            q: 'What areas do you serve?',
            a: 'We serve Boston, NY and surrounding Erie County communities including Hamburg, Eden, Angola, Orchard Park, East Aurora, and more. Not sure if we come to you? Call us and we\'ll let you know.',
          },
          {
            q: 'Do you offer free estimates?',
            a: 'Yes — always. We visit your property, assess the scope, and give you a written estimate before any work begins. No obligation.',
          },
          {
            q: 'Do I need permits for excavation or land clearing work?',
            a: 'It depends on the scope and your municipality. We\'ll let you know during the estimate whether permits are required and can walk you through the process.',
          },
          {
            q: 'How long does a typical job take?',
            a: '1–3 days for most residential land clearing and grading jobs. Larger excavation or site prep projects may take longer. We give you a clear timeline with your estimate.',
          },
          {
            q: 'What equipment do you use?',
            a: 'We own and operate our own equipment — tractors, excavators, and skid steers. No subcontractors, no delays waiting on a rented machine.',
          },
        ];

        return (
          <section id="faq" className="section-shell bg-white">
            <div className="page-shell">
              <AnimatedSection>
                <SectionHeading eyebrow="Got Questions?" title="Frequently Asked" center />
              </AnimatedSection>

              <div className="mx-auto mt-10 max-w-2xl divide-y divide-black/8">
                {FAQS.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={item.q}>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-4 py-5 text-left focus-visible:rounded focus-visible:outline-2 focus-visible:outline-moss"
                        aria-expanded={isOpen}
                      >
                        <span className={`text-sm font-semibold leading-6 transition-colors ${isOpen ? 'text-moss' : 'text-ink'}`}>
                          {item.q}
                        </span>
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.22, ease: 'easeInOut' }}
                          className="shrink-0"
                        >
                          <ChevronDown
                            size={18}
                            className={`transition-colors ${isOpen ? 'text-moss' : 'text-ink/40'}`}
                            strokeWidth={2}
                          />
                        </motion.span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="answer"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden"
                          >
                            <p className="pb-5 pr-8 text-sm leading-7 text-slate-500">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <AnimatedSection delay={0.1}>
                <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-slate-400">
                  Still have questions?{' '}
                  <button onClick={openModal} className="font-semibold text-moss underline-offset-4 hover:underline">
                    Request a free estimate
                  </button>{' '}
                  or{' '}
                  <a href="tel:+17169836564" className="font-semibold text-moss underline-offset-4 hover:underline">
                    give us a call
                  </a>.
                </p>
              </AnimatedSection>
            </div>
          </section>
        );
      })()}
    </>
  );
}
