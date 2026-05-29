import { Quote } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Testimonials() {
  const items: any[] = (CLINIC as any).testimonials_real || [];
  if (!items.length) return null;
  return (
    <section id="testimonials" className="py-24 md:py-32 text-white relative overflow-hidden" style={{ background: 'var(--color-primary)' }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle at 20% 30%, ${CLINIC.brand.accent}55, transparent 50%), radial-gradient(circle at 80% 70%, ${CLINIC.brand.secondary}55, transparent 50%)` }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: CLINIC.brand.accent }}>O que dizem</span>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold text-balance">Pacientes reais. Depoimentos reais.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t: any, i: number) => (
            <article key={i} className="reveal glass-dark rounded-3xl p-8 border border-white/10" style={{ transitionDelay: `${i * 80}ms` }}>
              <Quote size={28} style={{ color: CLINIC.brand.accent }} className="mb-4 opacity-80" />
              <p className="text-[15px] leading-relaxed italic opacity-95 mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full grid place-items-center font-bold" style={{ background: CLINIC.brand.accent, color: CLINIC.brand.primary }}>{t.author[0]}</div>
                <div><div className="text-sm font-semibold">{t.author}</div></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
