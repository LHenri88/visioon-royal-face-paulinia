import { useRef } from 'react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

function TiltCard({ p, delay }: { p: any; delay: number }) {
  const cardRef = useRef<HTMLElement>(null);

  function onMove(e: React.MouseEvent<HTMLElement>) {
    const el = cardRef.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateZ(10px)`;
    const shine = el.querySelector('.card-shine') as HTMLElement;
    if (shine) shine.style.background = `radial-gradient(circle at ${(x+0.5)*100}% ${(y+0.5)*100}%, rgba(255,255,255,0.18) 0%, transparent 60%)`;
  }

  function onLeave() {
    const el = cardRef.current; if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    const shine = el.querySelector('.card-shine') as HTMLElement;
    if (shine) shine.style.background = 'transparent';
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="reveal rounded-3xl overflow-hidden border bg-white cursor-pointer"
      style={{
        borderColor: `${CLINIC.brand.primary}15`,
        transitionDelay: `${delay}ms`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        boxShadow: `0 8px 30px ${CLINIC.brand.primary}1a`,
      }}
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img src={p.img} alt={p.name} className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700" loading="lazy" />
        <div className="card-shine absolute inset-0 pointer-events-none transition-all duration-200" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <h3 className="font-display text-2xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{p.name}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: `${CLINIC.brand.ink}aa` }}>{p.desc}</p>
        <a href="#simulator" className="text-sm font-semibold inline-flex items-center gap-1.5 no-underline group" style={{ color: 'var(--color-primary)' }}>
          Ver simulação
          <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </a>
      </div>
    </article>
  );
}

export default function Procedures() {
  const items: any[] = (CLINIC as any).procedure_details || [];
  if (!items.length) return null;
  return (
    <section id="procedures" className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.secondary}08 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Procedimentos" title="O que tratamos" sub="Cada tratamento planejado individualmente, com tecnologia de última geração." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p: any, i: number) => <TiltCard key={p.id} p={p} delay={i * 50} />)}
        </div>
      </div>
    </section>
  );
}
