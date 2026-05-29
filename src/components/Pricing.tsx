import { Check } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Pricing() {
  const p: any = (CLINIC as any).pricing;
  if (!p) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHead kicker="Investimento" title={p.title} sub={p.sub} />
        <div className="reveal bg-white border-2 rounded-3xl p-10 md:p-14" style={{ borderColor: 'var(--color-primary)' }}>
          <ul className="space-y-4 max-w-2xl mx-auto">
            {p.highlights.map((h: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-lg" style={{ color: `${CLINIC.brand.ink}cc` }}>
                <Check size={22} style={{ color: 'var(--color-primary)' }} className="mt-1 shrink-0" />
                {h}
              </li>
            ))}
          </ul>
          <div className="text-center mt-10">
            <a href="#schedule" className="inline-block px-8 py-4 rounded-full font-semibold text-white shadow-lg no-underline" style={{ background: 'var(--color-primary)' }}>Agendar avaliação gratuita</a>
          </div>
        </div>
      </div>
    </section>
  );
}
