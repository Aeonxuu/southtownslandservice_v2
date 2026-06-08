import { useEffect, useState } from 'react';
import { ArrowRight, BadgeCheck, Mail, Phone, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import SectionHeading from '../components/SectionHeading';
import ServicesCarousel from '../components/ServicesCarousel';
import { brand, benefits, contacts, hero, reviews, services } from '../data/siteData';

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
        // Swiped right - go to previous
        setContactIndex((prev) => (prev === 0 ? contacts.length - 1 : prev - 1));
      } else {
        // Swiped left - go to next
        setContactIndex((prev) => (prev === contacts.length - 1 ? 0 : prev + 1));
      }
    }
  };

  const goToContactPrev = () => {
    setContactIndex((prev) => (prev === 0 ? contacts.length - 1 : prev - 1));
  };

  const goToContactNext = () => {
    setContactIndex((prev) => (prev === contacts.length - 1 ? 0 : prev + 1));
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
              <a href={hero.primaryCta.href} target="_blank" rel="noreferrer" className="primary-button border-sand bg-sand text-ink px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm hover:bg-transparent hover:text-white">
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

      <section id="about" className="section-shell bg-sand">
        <div className="page-shell">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Simple, clear reasons to trust the work"
              center
            />
          </AnimatedSection>

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

      <section id="services" className="section-shell bg-white">
        <div className="page-shell">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Our Services"
              title="Visual gallery of our work"
              center
            />
          </AnimatedSection>
          <div className="mt-10">
            <ServicesCarousel services={services} />
          </div>
          <div className="mt-8 flex justify-center">
            <a href="/jobs" className="primary-button bg-moss text-white border-moss hover:bg-white hover:text-moss">
              Check Our Jobs
            </a>
          </div>
        </div>
      </section>

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
              {/* Carousel Container */}
              <div className="relative h-[14rem] overflow-hidden">
                <motion.div
                  animate={{ x: `-${contactIndex * 100}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  drag="x"
                  dragElastic={0.15}
                  onDragEnd={handleContactDragEnd}
                  className="flex h-full cursor-grab active:cursor-grabbing"
                >
                  {contacts.map((contact, index) => {
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

              {/* Pagination Dots */}
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

      <section id="reviews" className="section-shell bg-white">
        <div className="page-shell">
          <AnimatedSection>
            <SectionHeading
              eyebrow="Reviews"
              title="What customers are saying"
              center
            />
          </AnimatedSection>
          <div className="mt-10">
            <div className="elfsight-app-21047a20-592f-4b5d-8a8f-c50b1f8da0c0" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>
    </>
  );
}
