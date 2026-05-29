import { CLINIC } from '../clinic.config';
export default function Press() {
  const items: string[] = (CLINIC as any).press || [];
  if (!items.length) return null;
  return (
    <section className="py-16 border-y" style={{ borderColor: `${CLINIC.brand.primary}15`, background: 'var(--color-paper)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-widest mb-8 opacity-70">Aparições na imprensa</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
          {items.map((name, i) => (
            <div key={i} className="font-display text-xl md:text-2xl opacity-60 hover:opacity-100 transition" style={{ color: `${CLINIC.brand.primary}` }}>{name}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
