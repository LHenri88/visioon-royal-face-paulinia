import { CLINIC } from '../clinic.config';
export default function Partners() {
  const items: string[] = (CLINIC as any).partners || [];
  if (!items.length) return null;
  return (
    <section className="py-14 border-y" style={{ borderColor: `${CLINIC.brand.primary}15`, background: 'var(--color-paper)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest mb-8 opacity-60">Trabalhamos com</p>
        <div className="overflow-hidden">
          <div className="marquee flex gap-16 whitespace-nowrap" style={{ width: 'max-content' }}>
            {[...items, ...items].map((name, i) => (
              <div key={i} className="font-display text-2xl opacity-70 hover:opacity-100 transition" style={{ color: 'var(--color-primary)' }}>{name}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
