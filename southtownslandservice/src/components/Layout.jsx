import { Outlet } from 'react-router-dom';
import { Phone } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuoteModal from './QuoteModal';
import { contacts } from '../data/siteData';

const phone = contacts.find((c) => c.type === 'Phone');

export default function Layout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />

      <QuoteModal />

      {/* Sticky click-to-call — mobile only */}
      {phone && (
        <a
          href={phone.href}
          className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-center gap-3 py-4 md:hidden"
          style={{
            backgroundColor: '#2d5016',
            boxShadow: '0 -4px 16px rgba(0,0,0,0.3)',
          }}
        >
          <Phone size={17} className="text-white" strokeWidth={2.5} />
          <span className="text-sm font-bold uppercase tracking-[0.12em] text-white">
            Call Now — (716) 983-6564
          </span>
        </a>
      )}
    </div>
  );
}
