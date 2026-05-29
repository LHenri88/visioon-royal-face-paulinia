import { CLINIC } from '../clinic.config';

export default function Doctor() {
  const d: any = (CLINIC as any).doctor;
  if (!d) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.4fr] gap-12 items-center">
        <div className="reveal relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
          <img src={d.avatar} alt={d.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="font-display text-2xl font-semibold">{d.name}</div>
            <div className="text-xs opacity-85 tracking-wide">{d.title}</div>
          </div>
        </div>
        <div className="reveal">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-primary)' }}>Conheça quem assina</span>
          <h2 className="font-display text-[clamp(30px,3.8vw,46px)] leading-[1.1] font-semibold mb-6 text-balance" style={{ color: 'var(--color-primary)' }}>{d.name}</h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: `${CLINIC.brand.ink}cc` }}>{d.bio}</p>
          <a href="#schedule" className="inline-block px-7 py-3.5 rounded-full font-semibold text-white shadow-lg no-underline" style={{ background: 'var(--color-primary)' }}>Agendar com {d.name.split(' ')[0]}</a>
        </div>
      </div>
    </section>
  );
}
