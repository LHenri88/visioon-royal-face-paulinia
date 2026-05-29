import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';
import { Check } from 'lucide-react';

export default function Combos() {
  const items: any[] = (CLINIC as any).combos || [];
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32" style={{ background: `${CLINIC.brand.accent}30` }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Combos & Pacotes" title="Combinações pensadas pra você" />
        <div className="grid md:grid-cols-3 gap-5">
          {items.map((c: any, i: number) => (
            <article key={i} className="reveal bg-white p-8 rounded-3xl border hover:-translate-y-2 transition" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*60}ms` }}>
              <h3 className="font-display text-2xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>{c.name}</h3>
              <ul className="space-y-2 mb-6">
                {c.items.map((it: string, j: number) => (
                  <li key={j} className="flex items-start gap-2 text-sm" style={{ color: `${CLINIC.brand.ink}cc` }}>
                    <Check size={16} style={{ color: 'var(--color-primary)' }} className="mt-0.5 shrink-0" />
                    {it}
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>{c.price}</p>
              <a href="#schedule" className="block text-center w-full px-5 py-3 rounded-full font-semibold text-white no-underline" style={{ background: 'var(--color-primary)' }}>Quero esse combo</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
