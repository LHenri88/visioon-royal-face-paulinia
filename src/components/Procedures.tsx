import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Procedures() {
  const items: any[] = (CLINIC as any).procedure_details || [];
  if (!items.length) return null;
  return (
    <section id="procedures" className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.secondary}08 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Procedimentos" title="O que tratamos" sub="Cada procedimento com prompt clínico calibrado para o nosso protocolo." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((p: any, i: number) => (
            <article key={p.id} className="reveal group rounded-3xl overflow-hidden border bg-white hover:-translate-y-2 transition-transform" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 50}ms` }}>
              <div className="aspect-[5/4] overflow-hidden">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{p.name}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLINIC.brand.ink}aa` }}>{p.desc}</p>
                <a href="#simulator" className="text-sm font-semibold inline-flex items-center gap-1.5 no-underline" style={{ color: 'var(--color-primary)' }}>Simular →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
