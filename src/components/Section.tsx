// Wrapper de seção
import { CLINIC } from '../clinic.config';
export function SectionHead({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="reveal max-w-2xl mx-auto text-center mb-14">
      {kicker && <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-primary)' }}>{kicker}</span>}
      <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold text-balance" style={{ color: 'var(--color-primary)' }}>{title}</h2>
      {sub && <p className="mt-5 text-lg" style={{ color: `${CLINIC.brand.ink}99` }}>{sub}</p>}
    </div>
  );
}
