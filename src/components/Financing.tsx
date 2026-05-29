import { CreditCard, Check } from 'lucide-react';
import { CLINIC } from '../clinic.config';

export default function Financing() {
  const f: any = (CLINIC as any).financing;
  if (!f) return null;
  return (
    <section className="py-24 md:py-32" style={{ background: `${CLINIC.brand.accent}20` }}>
      <div className="max-w-5xl mx-auto px-6">
        <div className="reveal bg-white rounded-3xl p-10 md:p-14 border-2 grid md:grid-cols-[1fr_2fr] gap-8 items-center" style={{ borderColor: `${CLINIC.brand.primary}20` }}>
          <div className="w-20 h-20 rounded-2xl grid place-items-center" style={{ background: 'var(--color-primary)' }}>
            <CreditCard size={36} color={CLINIC.brand.accent} />
          </div>
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>{f.title}</h2>
            <p className="text-lg" style={{ color: `${CLINIC.brand.ink}aa` }}>{f.sub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
