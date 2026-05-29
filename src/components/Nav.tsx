import { useEffect, useState } from 'react';
import { CLINIC } from '../clinic.config';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const links = [
    { id: 'procedures', label: 'Procedimentos' },
    { id: 'simulator', label: 'Simulador IA' },
    { id: 'testimonials', label: 'Resultados' },
    { id: 'schedule', label: 'Agendar' },
  ];
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass border-b border-black/5 py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 no-underline" style={{ color: 'var(--color-primary)' }}>
          <span className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm shadow-lg" style={{ background: 'var(--color-primary)', color: '#fff' }}>{CLINIC.brand.logo_glyph}</span>
          <span className="font-display text-xl font-semibold">{CLINIC.name}</span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="opacity-70 hover:opacity-100 transition no-underline" style={{ color: 'var(--color-ink)' }}>{l.label}</a>
          ))}
          <a href="#schedule" className="px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-transform hover:-translate-y-0.5 no-underline" style={{ background: 'var(--color-primary)' }}>
            {CLINIC.cta_primary || 'Agendar'}
          </a>
        </div>
      </div>
    </nav>
  );
}
