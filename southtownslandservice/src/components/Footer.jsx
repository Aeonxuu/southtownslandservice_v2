import { Mail, Phone } from 'lucide-react';
import { brand, contacts } from '../data/siteData';

const phone = contacts.find((c) => c.type === 'Phone');
const email = contacts.find((c) => c.type === 'Email');

const navLinks = [
  { label: 'Home', href: '/#home' },
  { label: 'About', href: '/#about' },
  { label: 'Services', href: '/#services' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Free Quote', href: '/quote' },
  { label: 'Contact', href: '/#contact' },
];

const trustBadges = ['Licensed', 'Fully Insured', 'BBB Accredited', 'Locally Owned'];

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      {/* Trust badge strip */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="page-shell flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-4">
          {trustBadges.map((badge) => (
            <span key={badge} className="text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Main footer content */}
      <div className="page-shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand column */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <img src={brand.logo} alt={brand.name} className="h-8 w-8 object-contain" />
            <span className="text-sm font-bold uppercase tracking-[0.18em]">{brand.name}</span>
          </div>
          <p className="text-sm leading-6 text-white/50">
            Professional land clearing, excavation, and property services across Western New York.
          </p>
        </div>

        {/* Quick links */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Quick Links</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact column */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/40">Contact</p>
          {phone && (
            <a href={phone.href} className="flex items-center gap-2.5 text-sm text-white/60 transition hover:text-white">
              <Phone size={14} className="shrink-0 text-moss" />
              {phone.label.replace('Call ', '')}
            </a>
          )}
          {email && (
            <a href={email.href} className="flex items-center gap-2.5 text-sm text-white/60 transition hover:text-white">
              <Mail size={14} className="shrink-0 text-moss" />
              {email.label}
            </a>
          )}
          <p className="mt-1 text-xs text-white/30">Serving Western New York</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="page-shell flex flex-col gap-1 py-5 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {brand.footer}</p>
          <p>All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
