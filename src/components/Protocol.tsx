import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Protocol() {
  const p: any = (CLINIC as any).protocol;
  if (!p) return null;
  return (
    <section className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.secondary}10 100%)` }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="Nosso protocolo" title={p.title} sub={p.sub} />
        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {p.steps.map((s: any, i: number) => (
            <li key={i} className="reveal relative bg-white rounded-2xl p-7 border hover:-translate-y-1 transition" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 50}ms` }}>
              <div className="absolute -top-4 left-7 w-9 h-9 rounded-xl grid place-items-center font-bold text-sm shadow-lg" style={{ background: 'var(--color-primary)', color: CLINIC.brand.accent }}>{String(i+1).padStart(2,'0')}</div>
              <h3 className="font-display text-xl font-semibold mb-2 mt-3" style={{ color: 'var(--color-primary)' }}>{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${CLINIC.brand.ink}99` }}>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
