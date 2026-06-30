import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, Mail, MapPin, Phone, Shield, ShieldCheck, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import QuoteForm from '../components/QuoteForm';
import SectionHeading from '../components/SectionHeading';
import { brand, benefits, contacts, hero, serviceAreas, services, stats } from '../data/siteData';

const contactIcons = {
  facebook: Star,
  badge: BadgeCheck,
  star: Star,
  phone: Phone,
  mail: Mail
};

export default function HomePage() {
  const [contactIndex, setContactIndex] = useState(0);
  const [benefitIndex, setBenefitIndex] = useState(0);

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

  const handleContactDragEnd = (e, info) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        setContactIndex((prev) => (prev === 0 ? contacts.length - 1 : prev - 1));
      } else {
        setContactIndex((prev) => (prev === contacts.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const handleBenefitDragEnd = (e, info) => {
    if (Math.abs(info.offset.x) > 50) {
      if (info.offset.x > 0) {
        setBenefitIndex((prev) => (prev === 0 ? benefits.length - 1 : prev - 1));
      } else {
        setBenefitIndex((prev) => (prev === benefits.length - 1 ? 0 : prev + 1));
      }
    }
  };

  return (
    <>
      {/* ── HERO ── */}
      <section id="home" className="relative min-h-[65vh] overflow-hidden bg-ink text-white sm:min-h-[calc(100vh-4.5rem)]">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline controlsList="nofullscreen nodownload noremoteplayback">
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
              <a href="#contact" className="primary-button border-sand bg-sand text-ink px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm hover:bg-transparent hover:text-white">
                {hero.primaryCta.label}
                <ArrowRight className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4" />
              </a>
              <a href={hero.secondaryCta.href} className="secondary-button px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm">
                {hero.secondaryCta.label}
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── TRUST BADGE BAR ── */}
      <div style={{ backgroundColor: '#2f2b27' }}>
        <div className="page-shell grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:flex lg:items-center lg:justify-center lg:gap-10">
          {[
            { icon: <ShieldCheck size={16} className="shrink-0 text-sand" />, label: 'Fully Licensed' },
            { icon: <Shield size={16} className="shrink-0 text-sand" />, label: 'Fully Insured' },
            { icon: <BadgeCheck size={16} className="shrink-0 text-sand" />, label: 'Free Estimates' },
            { icon: <MapPin size={16} className="shrink-0 text-sand" />, label: 'Locally Owned & Operated' },
          ].map(({ icon, label }) => (
            <div key={label} className="flex items-center gap-2">
              {icon}
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/85">{label}</span>
            </div>
          ))}
        </div>
      </div>

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

          {/* Mobile benefits carousel */}
          <div className="mt-8 sm:mt-10 md:hidden">
            <div className="relative">
              <div className="relative h-[18rem] overflow-hidden">
                <motion.div
                  animate={{ x: `-${benefitIndex * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  drag="x"
                  dragElastic={0.15}
                  onDragEnd={handleBenefitDragEnd}
                  className="flex h-full cursor-grab active:cursor-grabbing"
                >
                  {benefits.map((benefit) => (
                    <div key={benefit.title} className="min-w-full h-full p-1">
                      <div className="flex h-full flex-col items-center justify-center border-2 border-[#546326] bg-[#FFFCE9] px-5 py-6 text-center shadow-sm">
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-moss/10 text-moss">
                          <BadgeCheck className="h-5 w-5" />
                        </div>
                        <h3 className="text-lg font-bold text-ink">{benefit.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="mt-4 flex justify-center gap-2">
                {benefits.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setBenefitIndex(index)}
                    animate={{
                      width: index === benefitIndex ? 32 : 12,
                      backgroundColor: index === benefitIndex ? '#2d5016' : '#ffffffd9',
                      opacity: index === benefitIndex ? 1 : 0.8,
                      boxShadow: index === benefitIndex ? '0 0 0 1px rgba(45, 80, 22, 0.18)' : '0 0 0 1px rgba(45, 80, 22, 0.45)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2.5 rounded-full transition-all duration-300"
                    aria-label={`Go to reason ${index + 1}`}
                  />
                ))}
              </div>
            </div>
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

          {/* Stats strip */}
          <AnimatedSection delay={0.1}>
            <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#546326]/20 pt-10 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center text-center">
                  <span className="text-2xl font-extrabold text-moss sm:text-3xl">{stat.value}</span>
                  <span className="mt-1 text-xs font-bold uppercase tracking-[0.15em] text-ink/50">{stat.label}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
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

          {/* Mobile Carousel */}
          <div className="mt-8 sm:mt-10 lg:hidden">
            <div className="relative">
              <div className="relative h-[14rem] overflow-hidden">
                <motion.div
                  animate={{ x: `-${contactIndex * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  drag="x"
                  dragElastic={0.15}
                  onDragEnd={handleContactDragEnd}
                  className="flex h-full cursor-grab active:cursor-grabbing"
                >
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
                        className="relative min-w-full h-full border border-white/15 bg-white/10 p-4 backdrop-blur-sm transition duration-300 hover:bg-white/15"
                      >
                        <div className="h-full flex flex-col items-center justify-center gap-3">
                          <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white">
                            {iconSource ? (
                              <img src={iconSource} alt={`${contact.type} icon`} className="h-10 w-10 object-contain" />
                            ) : (
                              <Icon className="h-5 w-5" />
                            )}
                          </div>
                          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/80">{contact.type}</p>
                          <h3 className="text-base font-bold text-white line-clamp-2">{contact.label}</h3>
                        </div>
                      </a>
                    );
                  })}
                </motion.div>
              </div>

              <div className="mt-4 flex gap-2 justify-center">
                {contacts.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setContactIndex(index)}
                    animate={{
                      width: index === contactIndex ? 32 : 12,
                      backgroundColor: index === contactIndex ? '#ffffff' : '#ffffffd1',
                      opacity: index === contactIndex ? 1 : 0.78,
                      boxShadow: index === contactIndex ? '0 0 0 1px rgba(255, 255, 255, 0.2)' : '0 0 0 1px rgba(255, 255, 255, 0.5)'
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2.5 rounded-full transition-all duration-300"
                    aria-label={`Go to contact ${index + 1}`}
                  />
                ))}
              </div>
            </div>
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
                      {iconSource ? <img src={iconSource} alt={`${contact.type} icon`} className="h-12 w-12 object-contain" /> : <Icon className="h-5 w-5" />}
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

      {/* ── QUOTE FORM ── */}
      <section id="quote" className="section-shell bg-ink">
        <div className="page-shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <AnimatedSection>
              <div className="[&_.section-title]:text-white [&_.eyebrow]:text-moss">
                <SectionHeading
                  eyebrow="Free Estimate"
                  title="Request a Quote"
                />
              </div>
              <p className="mt-4 text-sm leading-7 text-white/55">
                Fill out the form and we'll get back to you within one business day with a clear, honest estimate — no obligation.
              </p>
              <ul className="mt-5 space-y-2">
                {['Free estimates, always', 'No hidden costs or surprises', 'Serving Western New York'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-white/60">
                    <BadgeCheck size={15} className="shrink-0 text-moss" />
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <div className="rounded-md border border-white/10 bg-white/5 p-6 sm:p-8">
                <QuoteForm />
              </div>
            </AnimatedSection>
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
                        <p className="text-xs text-slate-400">{review.location}</p>
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
    </>
  );
}
