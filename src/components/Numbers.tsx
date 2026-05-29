import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Numbers() {
  const items: any[] = (CLINIC as any).numbers || [];
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32 text-white relative overflow-hidden" style={{ background: 'var(--color-primary)' }}>
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ background: `radial-gradient(circle at 20% 30%, ${CLINIC.brand.accent}55, transparent 50%), radial-gradient(circle at 80% 70%, ${CLINIC.brand.secondary}55, transparent 50%)` }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="reveal max-w-3xl mx-auto text-center mb-14">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: CLINIC.brand.accent }}>Os números</span>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold text-balance">Escala que fala por si.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items.map((m: any, i: number) => (
            <div key={i} className="reveal text-center py-8 px-4 rounded-2xl glass-dark border border-white/10" style={{ transitionDelay: `${i * 40}ms` }}>
              <div className="font-display text-4xl md:text-5xl font-semibold leading-none" style={{ color: CLINIC.brand.accent }}>{m.n}</div>
              <div className="mt-3 text-[11px] uppercase tracking-widest opacity-80">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
