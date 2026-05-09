import { brand } from '../data/siteData';

export default function Footer() {
  return (
    <footer className="border-t border-black/5 bg-mist/70">
      <div className="page-shell flex flex-col gap-3 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <p>{brand.footer}</p>
        <p className="font-semibold text-ink">Southtowns Land Service</p>
      </div>
    </footer>
  );
}
