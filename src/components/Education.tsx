import { GraduationCap } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function Education() {
  const e: any = (CLINIC as any).education;
  if (!e) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="Centro de ensino" title={e.title} sub={e.sub} />
        <div className="grid md:grid-cols-3 gap-5">
          {e.courses.map((course: string, i: number) => (
            <div key={i} className="reveal bg-white p-7 rounded-2xl border text-center hover:-translate-y-1 transition" style={{ borderColor: `${CLINIC.brand.primary}15`, transitionDelay: `${i*60}ms` }}>
              <GraduationCap size={36} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
              <h3 className="font-display text-lg font-semibold" style={{ color: 'var(--color-primary)' }}>{course}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
