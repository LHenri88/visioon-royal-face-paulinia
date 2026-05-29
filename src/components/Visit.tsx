import { MapPin, Phone, MessageCircle } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Visit() {
  return (
    <section className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.accent}15 100%)` }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="Visite-nos" title="Te esperamos na clínica boutique" sub="Atendimento personalizado, sem fila, no coração de Paulínia." />
        <div className="grid md:grid-cols-3 gap-5">
          <div className="reveal bg-white p-7 rounded-2xl border text-center" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <MapPin size={32} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Endereço</h3>
            <p className="text-sm" style={{ color: `${CLINIC.brand.ink}aa` }}>Paulínia · SP<br />(consultar via WhatsApp)</p>
          </div>
          <div className="reveal bg-white p-7 rounded-2xl border text-center" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <Phone size={32} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>Horário</h3>
            <p className="text-sm" style={{ color: `${CLINIC.brand.ink}aa` }}>Seg-Sex · 9h-19h<br />Sáb · 9h-14h</p>
          </div>
          <div className="reveal bg-white p-7 rounded-2xl border text-center" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
            <MessageCircle size={32} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>WhatsApp</h3>
            <a href="https://wa.me/" className="text-sm font-semibold no-underline" style={{ color: 'var(--color-primary)' }}>Falar agora →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
