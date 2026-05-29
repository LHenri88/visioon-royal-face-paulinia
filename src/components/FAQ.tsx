import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

export default function FAQ() {
  const items: any[] = (CLINIC as any).faq || [];
  const [open, setOpen] = useState<number | null>(0);
  if (!items.length) return null;
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHead kicker="Dúvidas frequentes" title="Perguntas que recebemos toda semana" />
        <div className="space-y-3">
          {items.map((f: any, i: number) => (
            <div key={i} className="reveal bg-white border rounded-2xl overflow-hidden" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center gap-4 p-5 text-left">
                <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>{f.q}</span>
                <ChevronDown size={20} className="shrink-0 transition-transform" style={{ color: 'var(--color-primary)', transform: open === i ? 'rotate(180deg)' : '' }} />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: `${CLINIC.brand.ink}aa` }}>{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
