import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function BeforeAfter() {
  const pairs: [string, string][] = ((CLINIC as any).images?.before_after) || [];
  const results: string[] = ((CLINIC as any).images?.results_gallery) || [];

  // Se temos pares antes/depois reais (ICB), mostrar com slider
  if (pairs.length) {
    return (
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead kicker="Antes e depois" title="Resultados reais. Pacientes reais." sub="Cada caso é planejado individualmente — protocolo respeita anatomia e identidade." />
          <div className="grid sm:grid-cols-2 gap-5">
            {pairs.map(([antes, depois], i) => (
              <article key={i} className="reveal group relative rounded-3xl overflow-hidden border bg-white" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 60}ms` }}>
                <div className="grid grid-cols-2 aspect-[5/4]">
                  <div className="relative overflow-hidden">
                    <img src={antes} alt="antes" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                    <div className="absolute top-3 left-3 text-[10px] font-bold tracking-widest text-white px-2.5 py-1 rounded backdrop-blur-sm" style={{ background: `${CLINIC.brand.ink}cc` }}>ANTES</div>
                  </div>
                  <div className="relative overflow-hidden border-l-2" style={{ borderColor: 'white' }}>
                    <img src={depois} alt="depois" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-white px-2.5 py-1 rounded" style={{ background: 'var(--color-primary)' }}>DEPOIS</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs opacity-70">Caso {i + 1} · resultado pós-procedimento documentado</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Caso contrário, galeria simples de resultados
  if (results.length) {
    return (
      <section className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHead kicker="Galeria" title="Resultados reais" sub="Cada caso planejado individualmente." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {results.map((src, i) => (
              <article key={i} className="reveal aspect-[4/5] rounded-2xl overflow-hidden border group" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 30}ms` }}>
                <img src={src} alt={`Caso ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return null;
}
