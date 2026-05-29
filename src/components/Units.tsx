import { MapPin } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Units() {
  const items: string[] = (CLINIC as any).units || [];
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.primary}05 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Estamos perto de você" title={`${items.length} unidades pelo Brasil`} sub="Atendimento exclusivamente por médicos especialistas, na cidade mais perto de você." />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {items.map((u, i) => (
            <div key={i} className="reveal p-4 rounded-xl bg-white border flex items-center gap-3 hover:-translate-y-1 transition" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*20}ms` }}>
              <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
              <span className="text-sm font-medium">{u}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
