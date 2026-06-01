import { useState } from 'react';
import { X } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Results() {
  const items: string[] = ((CLINIC as any).images?.results_gallery) || [];
  const [open, setOpen] = useState<string | null>(null);
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Resultados" title="Casos reais documentados" sub="Cada caso planejado individualmente — sem fórmulas genéricas." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((src, i) => (
            <button
              key={i}
              onClick={() => setOpen(src)}
              className="reveal aspect-square rounded-2xl overflow-hidden border cursor-zoom-in group block"
              style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*30}ms` }}
            >
              <img src={src} alt={`Caso ${i+1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </button>
          ))}
        </div>
        {/* lightbox */}
        {open && (
          <div onClick={() => setOpen(null)} className="fixed inset-0 z-[100] bg-black/90 grid place-items-center p-6 cursor-zoom-out">
            <button onClick={() => setOpen(null)} className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/10 hover:bg-white/20"><X size={24} /></button>
            <img src={open} alt="caso" className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl" />
          </div>
        )}
      </div>
    </section>
  );
}
