import { Flame } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function BestSellers() {
  const items: string[] = (CLINIC as any).best_sellers || [];
  if (!items.length) return null;
  return (
    <section className="py-20 text-white" style={{ background: 'var(--color-primary)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-wrap items-center justify-center gap-4 text-center">
          <Flame size={24} style={{ color: CLINIC.brand.accent }} />
          <span className="font-display text-2xl md:text-3xl">Mais procurados:</span>
          <div className="flex flex-wrap gap-3 justify-center">
            {items.map((b, i) => (
              <span key={i} className="px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: CLINIC.brand.accent, color: CLINIC.brand.primary }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
