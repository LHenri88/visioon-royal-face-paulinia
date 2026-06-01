import { useEffect, useRef } from 'react';
import { CLINIC } from '../clinic.config';

function CounterItem({ n, label, delay }: { n: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const isNum = /^[\d,.]+/.test(n);
        if (!isNum) return;
        const end = parseFloat(n.replace(/[^\d.]/g, ''));
        const prefix = n.match(/^[^\d]*/)?.[0] || '';
        const suffix = n.match(/[^\d.]+$/)?.[0] || '';
        const dur = 1600 + delay;
        const start = performance.now();
        const raf = (now: number) => {
          const t = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          const val = ease * end;
          const disp = val >= 1000 ? val.toLocaleString('pt-BR', { maximumFractionDigits: 0 }) : val.toFixed(val < 10 ? 1 : 0);
          el.textContent = prefix + disp + suffix;
          if (t < 1) requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      }
    }, { threshold: 0.5 });
    io.observe(el.closest('section')!);
    return () => io.disconnect();
  }, []);

  return (
    <div className="reveal text-center py-8 px-4 rounded-2xl glass-dark border border-white/10" style={{ transitionDelay: `${delay}ms` }}>
      <div ref={ref} className="font-display text-4xl md:text-5xl font-semibold leading-none tabular-nums" style={{ color: CLINIC.brand.accent }}>{n}</div>
      <div className="mt-3 text-[11px] uppercase tracking-widest opacity-80">{label}</div>
    </div>
  );
}

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
          {items.map((m: any, i: number) => <CounterItem key={i} n={m.n} label={m.label} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
}
