import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Results() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Resultados" title="Casos reais do Dr. Paulo" sub="Cada caso planejado individualmente — sem fórmulas genéricas." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4,5,6,7,8].map((i) => (
            <div key={i} className="reveal aspect-square rounded-2xl overflow-hidden border" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*30}ms` }}>
              <img src={`https://images.unsplash.com/photo-${['1494790108377-be9c29b29330','1438761681033-6461ffad8d80','1487412947147-5cebf100ffc2','1521119989659-a83eee488004','1530268729831-4b0b9e170218','1531123897727-8f129e1688ce','1607746882042-944635dfe10e','1502323777036-f29e3972d82f'][i-1]}?w=400`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
