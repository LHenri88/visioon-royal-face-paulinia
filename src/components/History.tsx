import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function History() {
  const h: any = (CLINIC as any).history;
  if (!h) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="Nossa trajetória" title={h.title} />
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: `${CLINIC.brand.primary}25` }} />
          {h.milestones.map((m: any, i: number) => (
            <div key={i} className={`reveal relative grid md:grid-cols-2 gap-6 md:gap-12 mb-12 ${i % 2 ? 'md:[direction:rtl]' : ''}`} style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="md:[direction:ltr]">
                <div className="bg-white border rounded-2xl p-7" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
                  <div className="font-display text-4xl font-semibold mb-3" style={{ color: 'var(--color-primary)' }}>{m.year}</div>
                  <p className="leading-relaxed" style={{ color: `${CLINIC.brand.ink}aa` }}>{m.text}</p>
                </div>
              </div>
              <div className="hidden md:block" />
              <div className="hidden md:block absolute left-1/2 top-8 -translate-x-1/2 w-4 h-4 rounded-full border-4" style={{ background: 'var(--color-primary)', borderColor: 'var(--color-paper)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
