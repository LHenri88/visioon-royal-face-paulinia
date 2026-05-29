import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Signature() {
  const s: any = (CLINIC as any).signature;
  if (!s) return null;
  return (
    <section className="py-24 md:py-32" style={{ background: `${CLINIC.brand.accent}15` }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="A assinatura" title={s.title} sub={s.sub} />
        <div className="grid md:grid-cols-3 gap-5">
          {s.pillars.map((p: any, i: number) => (
            <article key={i} className="reveal bg-white p-8 rounded-3xl border hover:-translate-y-2 transition" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*60}ms` }}>
              <h3 className="font-display text-2xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>{p.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${CLINIC.brand.ink}aa` }}>{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
