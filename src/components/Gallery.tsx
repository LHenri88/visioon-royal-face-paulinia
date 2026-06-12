import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Gallery() {
  const imgs: string[] = ((CLINIC as any).images?.ambiance) || ((CLINIC as any).images?.insta_feed) || ((CLINIC as any).images?.promo_banners) || [];
  if (!imgs.length) return null;
  // duplica para marquee infinito (precisa de pelo menos 2 cópias)
  const doubled = imgs.length < 6 ? [...imgs, ...imgs, ...imgs, ...imgs] : [...imgs, ...imgs];
  return (
    <section className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <SectionHead kicker="Conheça o ambiente" title="Estrutura, equipe e bastidores" />
      </div>
      <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 6%, black 94%, transparent)' }}>
        <div className="flex gap-4 marquee" style={{ width: 'max-content' }}>
          {doubled.map((src, i) => (
            <div key={i} className="shrink-0 w-[280px] sm:w-[340px] aspect-[4/3] rounded-2xl overflow-hidden border bg-gray-100" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
              <img src={src} alt="ambiente" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
