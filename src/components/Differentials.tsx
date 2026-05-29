import { Award, GraduationCap, MapPin, Handshake, Stethoscope, TrendingUp, Sparkles, Shield, Clock, Users } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

const ICONS: Record<string, any> = { Award, GraduationCap, MapPin, Handshake, Stethoscope, TrendingUp, Sparkles, Shield, Clock, Users };

export default function Differentials() {
  const items: any[] = (CLINIC as any).differentials || [];
  if (!items.length) return null;
  return (
    <section id="differentials" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead kicker="Por que escolher" title="O que nos torna referência" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((d: any, i: number) => {
            const Icon = ICONS[d.icon] || Award;
            return (
              <article key={i} className="reveal bg-white rounded-2xl p-7 border hover:-translate-y-1 transition-transform" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i * 40}ms` }}>
                <div className="w-12 h-12 rounded-xl grid place-items-center mb-4" style={{ background: `${CLINIC.brand.primary}10` }}>
                  <Icon size={22} style={{ color: 'var(--color-primary)' }} />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>{d.title || d}</h3>
                {d.desc && <p className="text-sm leading-relaxed" style={{ color: `${CLINIC.brand.ink}99` }}>{d.desc}</p>}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
