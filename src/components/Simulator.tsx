import { useRef, useState } from 'react';
import { Upload, Loader2, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { CLINIC } from '../clinic.config';

type Phase = 'idle'|'loading'|'done'|'error';

const PROC_LABELS: Record<string,string> = {
  'facetas-porcelana':'Facetas','implante-dentario':'Implante','lente-contato-dental':'Lente','clareamento':'Clareamento',
  'harmonizacao-facial':'Harmonização','preenchimento-labial':'Lábios','botox':'Botox','bichectomia':'Bichectomia','bioestimulador':'Bioestimulador',
  'implante-capilar':'FUE','implante-barba':'Barba','implante-sobrancelha':'Sobrancelha','tratamento-calvicie':'Calvície','tratamento-capilar':'Capilar',
};

export default function Simulator() {
  const procs: string[] = [...CLINIC.procedures] as string[];
  const [proc, setProc] = useState<string>(CLINIC.primary_procedure as string || procs[0]);
  const [user, setUser] = useState<{b64:string;mime:string;preview:string}|null>(null);
  const [result, setResult] = useState<string|null>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { const u = r.result as string; setUser({ b64: u.split(',')[1], mime: f.type, preview: u }); setResult(null); setPhase('idle'); };
    r.readAsDataURL(f);
  }

  async function simulate() {
    if (!user) { setErr('Envie uma foto frontal primeiro.'); setPhase('error'); return; }
    setPhase('loading'); setErr('');
    try {
      const r = await fetch('/api/simulate', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ userB64: user.b64, userMime: user.mime, procedure: proc, clinicSlug: CLINIC.slug }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || 'Erro do servidor');
      const parts = j?.response?.candidates?.[0]?.content?.parts || [];
      const img = parts.find((p:any)=>p.inlineData)?.inlineData;
      if (!img) throw new Error('Sem imagem na resposta (modo demo).');
      setResult(`data:${img.mimeType};base64,${img.data}`); setPhase('done');
    } catch (e:any) { setErr(e.message); setPhase('error'); }
  }

  return (
    <section id="simulator" className="py-24 md:py-32" style={{ background: `linear-gradient(180deg, var(--color-paper) 0%, ${CLINIC.brand.secondary}11 100%)` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal max-w-2xl mx-auto text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: 'var(--color-primary)' }}>Simulador clínico · IA</span>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold text-balance" style={{ color: 'var(--color-primary)' }}>Veja seu resultado antes da decisão.</h2>
          <p className="mt-5 text-lg" style={{ color: `${CLINIC.brand.ink}99` }}>Selecione o procedimento, envie uma foto frontal e nossa IA renderiza uma pré-visualização em até 15 segundos.</p>
        </div>

        <div className="reveal bg-white rounded-[28px] p-6 md:p-12 shadow-2xl border" style={{ borderColor: `${CLINIC.brand.primary}15`, boxShadow: `0 30px 90px ${CLINIC.brand.primary}1f` }}>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {procs.map((p) => (
              <button key={p} onClick={() => setProc(p)} className="px-5 py-2.5 rounded-full text-sm font-medium border transition-all hover:-translate-y-0.5"
                style={{ background: proc===p ? 'var(--color-primary)' : 'transparent', color: proc===p ? '#fff' : 'var(--color-ink)', borderColor: proc===p ? 'var(--color-primary)' : `${CLINIC.brand.primary}30` }}>
                {PROC_LABELS[p] || p}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed grid place-items-center cursor-pointer" style={{ borderColor: `${CLINIC.brand.primary}33` }} onClick={() => inputRef.current?.click()}>
              <input ref={inputRef} type="file" accept="image/*" hidden onChange={onFile} />
              {user ? <img src={user.preview} className="w-full h-full object-cover" /> : (
                <div className="text-center px-6">
                  <Upload size={44} className="mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                  <p className="font-semibold mb-1" style={{ color: 'var(--color-ink)' }}>Clique para enviar</p>
                  <p className="text-xs opacity-60">JPG ou PNG · frontal · boa luz</p>
                </div>
              )}
            </div>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 border-2 border-dashed grid place-items-center" style={{ borderColor: `${CLINIC.brand.primary}33` }}>
              {phase==='loading' ? (
                <div className="text-center shimmer w-full h-full grid place-items-center">
                  <div>
                    <Loader2 className="animate-spin mx-auto mb-3" size={36} style={{ color: 'var(--color-primary)' }} />
                    <p className="text-sm font-medium" style={{ color: 'var(--color-primary)' }}>renderizando…</p>
                  </div>
                </div>
              ) : result ? <img src={result} className="w-full h-full object-cover" /> : phase==='error' ? (
                <div className="text-center px-6">
                  <AlertCircle size={36} className="mx-auto mb-3 text-red-500" />
                  <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-ink)' }}>Erro</p>
                  <p className="text-xs opacity-70 max-w-xs">{err}</p>
                </div>
              ) : (
                <div className="text-center px-6">
                  <Sparkles size={36} className="mx-auto mb-3" style={{ color: 'var(--color-primary)' }} />
                  <p className="text-sm font-medium" style={{ color: 'var(--color-ink)' }}>Resultado simulado</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={simulate} disabled={phase==='loading'} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-white shadow-lg disabled:opacity-60 hover:-translate-y-0.5 transition-all" style={{ background: 'var(--color-primary)' }}>
              {phase==='loading' ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              Gerar pré-visualização
            </button>
            {(user || result) && (
              <button onClick={() => { setUser(null); setResult(null); setPhase('idle'); }} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border-2 hover:bg-black/5 transition" style={{ borderColor: 'var(--color-primary)', color: 'var(--color-primary)' }}>
                <RefreshCw size={16} /> Refazer
              </button>
            )}
            <a href="#schedule" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold border-2 hover:bg-black/5 transition no-underline" style={{ borderColor: `${CLINIC.brand.primary}40`, color: 'var(--color-ink)' }}>Agendar avaliação real</a>
          </div>
          <p className="text-center text-xs mt-7" style={{ color: `${CLINIC.brand.ink}77` }}>⚠ Pré-visualização IA — referência ilustrativa. Resultado final por avaliação presencial.</p>
        </div>
      </div>
    </section>
  );
}
