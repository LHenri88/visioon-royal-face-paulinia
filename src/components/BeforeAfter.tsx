import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function BeforeAfter() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Antes e depois" title="Resultados reais. Imagens ilustrativas." sub="Cada caso é único — a simulação respeita sua identidade." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1,2,3,4,5,6].map((i) => (
            <article key={i} className="reveal group relative rounded-3xl overflow-hidden border" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 40}ms` }}>
              <div className="grid grid-cols-2 aspect-[5/4]">
                <div className="relative overflow-hidden bg-gray-100"><img src={`https://images.unsplash.com/photo-${['1494790108377-be9c29b29330','1438761681033-6461ffad8d80','1605497788044-5a32c7078486','1542131000-a06fa-4097-9f-9f8aff8e0a92','1531123897727-8f129e1688ce','1530268729831-4b0b9e170218'][i-1]}?w=400`} alt="antes" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition" loading="lazy" /><div className="absolute top-3 left-3 text-[10px] font-bold tracking-widest text-white bg-black/60 px-2 py-1 rounded">ANTES</div></div>
                <div className="relative overflow-hidden bg-gray-100"><img src={`https://images.unsplash.com/photo-${['1500917293891-ef795e70e1f6','1502323777036-f29e3972d82f','1607746882042-944635dfe10e','1487412947147-5cebf100ffc2','1531123897727-8f129e1688ce','1607746882042-944635dfe10e'][i-1]}?w=400`} alt="depois" className="w-full h-full object-cover" loading="lazy" /><div className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-white bg-black/60 px-2 py-1 rounded">DEPOIS</div></div>
              </div>
              <div className="p-4 bg-white"><p className="text-xs opacity-70">{['Facetas BL2','HOF discreta','Preenchimento labial','FUE 2.500 fios','Botox testa','Bioestimulador'][i-1]} · caso {i}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
