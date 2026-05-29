import { useState, useMemo } from 'react';
import { Calendar, Clock, User, Mail, Phone, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINIC } from '../clinic.config';
import { SectionHead } from './Section';

type Slot = { date: Date; time: string };

function buildSlots(): { date: Date; times: string[] }[] {
  const out: { date: Date; times: string[] }[] = [];
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    if (d.getDay() === 0) continue; // pula domingo
    const times = d.getDay() === 6
      ? ['09:00', '10:30', '13:00']
      : ['09:00', '10:30', '14:00', '15:30', '17:00'];
    out.push({ date: d, times });
  }
  return out.slice(0, 10);
}

const PROC_LABELS: Record<string,string> = {
  'facetas-porcelana':'Facetas','implante-dentario':'Implante','lente-contato-dental':'Lente','clareamento':'Clareamento',
  'harmonizacao-facial':'Harmonização','preenchimento-labial':'Lábios','botox':'Botox','bichectomia':'Bichectomia','bioestimulador':'Bioestimulador',
  'implante-capilar':'FUE','implante-barba':'Barba','implante-sobrancelha':'Sobrancelha','tratamento-calvicie':'Calvície','tratamento-capilar':'Capilar',
};

export default function Schedule() {
  const slots = useMemo(buildSlots, []);
  const [picked, setPicked] = useState<Slot | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', procedure: CLINIC.procedures[0] as string, notes: '' });
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!picked) { alert('Escolha uma data e horário.'); return; }
    // TODO: integrar com Calendly/Cal.com via webhook
    console.log('[schedule]', { ...form, slot: picked });
    setSent(true);
  }

  function fmtDate(d: Date) {
    return d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' });
  }

  if (sent) {
    return (
      <section id="schedule" className="py-24 md:py-32" style={{ background: `${CLINIC.brand.accent}20` }}>
        <div className="max-w-2xl mx-auto px-6 text-center reveal">
          <CheckCircle2 size={64} className="mx-auto mb-6" style={{ color: 'var(--color-primary)' }} />
          <h2 className="font-display text-4xl font-semibold mb-4" style={{ color: 'var(--color-primary)' }}>Pré-agendamento recebido</h2>
          <p className="text-lg mb-2" style={{ color: `${CLINIC.brand.ink}cc` }}>Olá, {form.name.split(' ')[0]}! Recebemos seu pedido para <strong>{PROC_LABELS[form.procedure]}</strong></p>
          <p className="text-base mb-8" style={{ color: `${CLINIC.brand.ink}99` }}>📅 {picked && fmtDate(picked.date)} · ⏰ {picked?.time}</p>
          <p className="text-sm opacity-80">Nossa equipe vai confirmar em até 2h úteis pelo WhatsApp ({form.phone}).</p>
        </div>
      </section>
    );
  }

  return (
    <section id="schedule" className="py-24 md:py-32" style={{ background: `${CLINIC.brand.accent}20` }}>
      <div className="max-w-6xl mx-auto px-6">
        <SectionHead kicker="Agendar avaliação" title="Escolha um horário para sua consulta" sub="Pré-agendamento online. Confirmamos sua vaga em até 2h úteis pelo WhatsApp." />

        <div className="reveal bg-white rounded-[28px] p-6 md:p-12 shadow-2xl border" style={{ borderColor: `${CLINIC.brand.primary}15`, boxShadow: `0 30px 90px ${CLINIC.brand.primary}1f` }}>

          {/* slots */}
          <div className="mb-10">
            <h3 className="font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
              <Calendar size={18} /> Escolha o dia e horário
            </h3>
            <div className="overflow-x-auto -mx-2 px-2">
              <div className="flex gap-3 pb-3" style={{ minWidth: 'min-content' }}>
                {slots.map((day, di) => (
                  <div key={di} className="shrink-0 w-[120px]">
                    <div className="text-center text-xs font-semibold uppercase mb-2 pb-2 border-b" style={{ borderColor: `${CLINIC.brand.primary}15`, color: 'var(--color-primary)' }}>
                      {fmtDate(day.date)}
                    </div>
                    <div className="flex flex-col gap-2">
                      {day.times.map((t) => {
                        const active = picked && picked.date.getTime() === day.date.getTime() && picked.time === t;
                        return (
                          <button key={t} type="button" onClick={() => setPicked({ date: day.date, time: t })}
                            className="px-3 py-2 rounded-lg text-sm font-medium border transition-all hover:-translate-y-0.5"
                            style={{ background: active ? 'var(--color-primary)' : 'transparent', color: active ? '#fff' : 'var(--color-ink)', borderColor: active ? 'var(--color-primary)' : `${CLINIC.brand.primary}25` }}>
                            <Clock size={11} className="inline mr-1" />{t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {picked && (
              <p className="mt-3 text-sm font-semibold" style={{ color: 'var(--color-primary)' }}>
                ✓ Selecionado: {fmtDate(picked.date)} às {picked.time}
              </p>
            )}
          </div>

          {/* form */}
          <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: `${CLINIC.brand.ink}99` }}>Nome completo</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                <input required value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} type="text" placeholder="Seu nome" className="w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none focus:border-current text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: `${CLINIC.brand.ink}99` }}>Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                <input required value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} type="email" placeholder="seu@email.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none focus:border-current text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: `${CLINIC.brand.ink}99` }}>WhatsApp</label>
              <div className="relative">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
                <input required value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} type="tel" placeholder="(11) 9XXXX-XXXX" className="w-full pl-11 pr-4 py-3.5 rounded-xl border outline-none focus:border-current text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }} />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: `${CLINIC.brand.ink}99` }}>Procedimento de interesse</label>
              <select value={form.procedure} onChange={(e)=>setForm({...form, procedure:e.target.value})} className="w-full px-4 py-3.5 rounded-xl border outline-none text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }}>
                {(CLINIC.procedures as readonly string[]).map((p) => <option key={p} value={p}>{PROC_LABELS[p] || p}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: `${CLINIC.brand.ink}99` }}>Observações (opcional)</label>
              <textarea value={form.notes} onChange={(e)=>setForm({...form, notes:e.target.value})} rows={3} placeholder="Conte um pouco sobre o que você procura…" className="w-full px-4 py-3.5 rounded-xl border outline-none text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }} />
            </div>
            <button type="submit" className="md:col-span-2 inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-semibold text-white shadow-xl hover:-translate-y-0.5 transition-all" style={{ background: 'var(--color-primary)' }}>
              Pré-agendar consulta <ArrowRight size={18} />
            </button>
            <p className="md:col-span-2 text-xs text-center" style={{ color: `${CLINIC.brand.ink}66` }}>
              📌 Integração futura: Calendly · Cal.com · Google Calendar
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
