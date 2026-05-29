import { Award } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Awards() {
  const items: string[] = (CLINIC as any).awards || [];
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHead kicker="Reconhecimento" title="Prêmios e reconhecimentos" />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((a, i) => (
            <div key={i} className="reveal text-center p-8 border-2 rounded-2xl hover:-translate-y-1 transition" style={{ borderColor: `${CLINIC.brand.primary}20`, transitionDelay: `${i*60}ms` }}>
              <Award size={36} className="mx-auto mb-4" style={{ color: CLINIC.brand.accent }} />
              <p className="font-display text-base font-semibold" style={{ color: 'var(--color-primary)' }}>{a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
