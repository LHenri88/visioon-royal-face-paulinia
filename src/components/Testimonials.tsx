import { Star } from 'lucide-react';
import { CLINIC } from '../clinic.config';

function TestimonialCard({ t }: { t: any }) {
  return (
    <article className="shrink-0 w-[340px] md:w-[380px] glass-dark rounded-3xl p-8 border border-white/10 mx-3">
      <div className="flex gap-1 mb-4">
        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" style={{ color: CLINIC.brand.accent }} />)}
      </div>
      <p className="text-[15px] leading-relaxed italic opacity-95 mb-6">"{t.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full grid place-items-center font-bold shrink-0" style={{ background: CLINIC.brand.accent, color: CLINIC.brand.primary }}>{t.author[0]}</div>
        <div className="text-sm font-semibold">{t.author}</div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const items: any[] = (CLINIC as any).testimonials_real || [];
  if (!items.length) return null;
  const doubled = [...items, ...items, ...items]; // triplicar para loop suave
  return (
    <section id="testimonials" className="py-24 md:py-32 text-white relative overflow-hidden" style={{ background: 'var(--color-primary)' }}>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: `radial-gradient(ellipse at 20% 50%, ${CLINIC.brand.accent}66, transparent 55%), radial-gradient(ellipse at 80% 50%, ${CLINIC.brand.secondary}66, transparent 55%)` }} />
      <div className="relative">
        <div className="reveal max-w-2xl mx-auto text-center mb-14 px-6">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: CLINIC.brand.accent }}>O que dizem</span>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold text-balance">Pacientes reais.</h2>
          <p className="mt-4 text-lg opacity-80">Resultados que falam por si.</p>
        </div>
        {/* Carrossel infinito — pausa no hover */}
        <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)' }}>
          <div className="flex testimonial-carousel" style={{ width: 'max-content' }}>
            {doubled.map((t: any, i: number) => <TestimonialCard key={i} t={t} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
