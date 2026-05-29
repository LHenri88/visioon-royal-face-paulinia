import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { CLINIC } from '../clinic.config';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(headlineRef.current, { y: 50, opacity: 0, duration: 1.1 })
        .from(subRef.current, { y: 28, opacity: 0, duration: 0.9 }, '-=0.7')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(visualRef.current, { x: 60, opacity: 0, duration: 1.2 }, '-=1.0');
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at 18% 30%, ${CLINIC.brand.secondary}33, transparent 55%), radial-gradient(circle at 82% 70%, ${CLINIC.brand.accent}22, transparent 55%)` }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_1fr] gap-14 items-center">
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest mb-7" style={{ background: `${CLINIC.brand.primary}15`, color: 'var(--color-primary)' }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }} />
            {CLINIC.hero.kicker}
          </span>
          <h1 ref={headlineRef} className="font-display text-[clamp(40px,5.5vw,72px)] leading-[1.02] font-semibold text-balance" style={{ color: 'var(--color-primary)' }}>
            {CLINIC.hero.headline}
          </h1>
          <p ref={subRef} className="mt-7 text-lg md:text-xl max-w-xl text-pretty" style={{ color: `${CLINIC.brand.ink}cc` }}>{CLINIC.hero.sub}</p>
          <div ref={ctaRef} className="mt-9 flex flex-wrap gap-4">
            <a href="#simulator" className="px-7 py-4 rounded-full font-semibold text-white shadow-xl hover:-translate-y-0.5 transition-all no-underline" style={{ background: 'var(--color-primary)', boxShadow: `0 16px 40px ${CLINIC.brand.primary}33` }}>{CLINIC.cta_primary}</a>
            <a href="#schedule" className="px-7 py-4 rounded-full font-semibold border-2 hover:-translate-y-0.5 transition-all no-underline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Agendar avaliação</a>
          </div>
        </div>
        <div ref={visualRef} className="relative aspect-[4/5] rounded-3xl overflow-hidden text-white p-12 grid place-items-center" style={{ background: `linear-gradient(135deg, ${CLINIC.brand.primary} 0%, ${CLINIC.brand.secondary} 100%)`, boxShadow: `0 40px 100px ${CLINIC.brand.primary}40` }}>
          <div className="orb absolute w-44 h-44 rounded-full blur-3xl" style={{ background: `${CLINIC.brand.accent}88`, top: '12%', left: '14%' }} />
          <div className="orb orb-2 absolute w-52 h-52 rounded-full blur-3xl" style={{ background: `${CLINIC.brand.secondary}88`, bottom: '14%', right: '10%' }} />
          <div className="relative text-center z-10">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs uppercase tracking-widest glass-dark mb-5">⊹ Visioon IA · {CLINIC.name}</span>
            <h3 className="font-display text-4xl leading-tight font-semibold mb-3 text-balance">{CLINIC.slogan}</h3>
            <p className="text-sm opacity-85 max-w-xs mx-auto">Veja seu resultado clínico antes de marcar a primeira avaliação.</p>
          </div>
          <div className="scroll-hint absolute bottom-8 left-1/2 text-[10px] tracking-[0.3em] uppercase opacity-60">↓ role para simular</div>
        </div>
      </div>
    </header>
  );
}
