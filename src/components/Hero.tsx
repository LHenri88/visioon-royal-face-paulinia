import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Star, Users, Award } from 'lucide-react';
import { CLINIC } from '../clinic.config';

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const heroImg = (CLINIC as any).images?.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(headlineRef.current, { y: 50, opacity: 0, duration: 1.1 })
        .from(subRef.current, { y: 28, opacity: 0, duration: 0.9 }, '-=0.7')
        .from(ctaRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')
        .from(visualRef.current, { scale: 0.95, opacity: 0, duration: 1.2 }, '-=1.0');

      // parallax mouse-move sutil no visual
      const onMove = (e: MouseEvent) => {
        if (!visualRef.current) return;
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        gsap.to(visualRef.current, { x, y, duration: 1.2, ease: 'power2.out' });
      };
      window.addEventListener('mousemove', onMove);
      return () => window.removeEventListener('mousemove', onMove);
    });
    return () => ctx.revert();
  }, []);

  return (
    <header className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      {/* mesh gradient + dot grid */}
      <div className="absolute inset-0 pointer-events-none dot-grid opacity-40" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 18% 30%, ${CLINIC.brand.secondary}44, transparent 50%), radial-gradient(ellipse at 82% 70%, ${CLINIC.brand.accent}33, transparent 50%)` }} />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
        {/* coluna texto */}
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
            <a href="#simulator" className="btn-shine px-7 py-4 rounded-full font-semibold text-white shadow-xl hover:-translate-y-0.5 transition-all no-underline" style={{ background: 'var(--color-primary)', boxShadow: `0 16px 40px ${CLINIC.brand.primary}33` }}>{CLINIC.cta_primary}</a>
            <a href="#schedule" className="px-7 py-4 rounded-full font-semibold border-2 hover:-translate-y-0.5 transition-all no-underline" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>Agendar avaliação</a>
          </div>

          {/* trust strip */}
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 items-center pt-8 border-t" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" style={{ color: CLINIC.brand.accent }} />)}</div>
              <span className="text-sm font-semibold" style={{ color: 'var(--color-ink)' }}>4.9/5</span>
              <span className="text-xs opacity-60">· Google Reviews</span>
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: `${CLINIC.brand.ink}99` }}>
              <Users size={16} style={{ color: 'var(--color-primary)' }} />
              <strong style={{ color: 'var(--color-ink)' }}>+10.000</strong> pacientes
            </div>
            <div className="flex items-center gap-2 text-sm" style={{ color: `${CLINIC.brand.ink}99` }}>
              <Award size={16} style={{ color: 'var(--color-primary)' }} />
              CFO/CRM ativo
            </div>
          </div>
        </div>

        {/* coluna visual: imagem real */}
        <div ref={visualRef} className="relative">
          {/* shape blob por trás */}
          <div className="absolute -inset-6 rounded-[40px] -z-0" style={{ background: `linear-gradient(135deg, ${CLINIC.brand.secondary}55, ${CLINIC.brand.accent}33)`, filter: 'blur(40px)' }} />

          {/* imagem principal */}
          <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl group" style={{ boxShadow: `0 40px 100px ${CLINIC.brand.primary}33` }}>
            {heroImg ? (
              <img src={heroImg} alt={CLINIC.name} fetchPriority="high" decoding="async" className="w-full h-full object-cover hero-kenburns" />
            ) : (
              <div className="w-full h-full grid place-items-center" style={{ background: `linear-gradient(135deg, ${CLINIC.brand.primary}, ${CLINIC.brand.secondary})` }}>
                <span className="text-white font-display text-3xl">{CLINIC.brand.logo_glyph}</span>
              </div>
            )}
            {/* gradient overlay sutil para texto inferior */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs font-semibold uppercase tracking-widest mb-1 opacity-90">{CLINIC.category}</div>
              <div className="font-display text-2xl leading-tight">{CLINIC.slogan}</div>
            </div>
          </div>

          {/* floating badge card top-right */}
          <div className="float-anim absolute -top-4 -right-4 lg:-right-8 bg-white rounded-2xl px-5 py-3 shadow-xl border" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <div className="text-[10px] font-semibold uppercase tracking-widest opacity-60 mb-0.5">Hoje</div>
            <div className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>+8 consultas</div>
          </div>

          {/* floating mini-card bottom-left */}
          <div className="float-anim-2 absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl px-5 py-3 shadow-xl border flex items-center gap-3" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <div className="w-10 h-10 rounded-full grid place-items-center" style={{ background: `${CLINIC.brand.primary}15` }}>
              <span style={{ color: 'var(--color-primary)' }}>✓</span>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-widest opacity-60">Próxima vaga</div>
              <div className="text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>Hoje · 16h</div>
            </div>
          </div>

          {/* scroll hint */}
          <div className="hidden lg:block scroll-hint absolute -bottom-14 left-1/2 text-[10px] tracking-[0.3em] uppercase opacity-50" style={{ color: 'var(--color-primary)' }}>↓ role para conhecer</div>
        </div>
      </div>
    </header>
  );
}
