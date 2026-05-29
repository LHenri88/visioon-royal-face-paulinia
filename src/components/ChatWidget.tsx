import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { CLINIC } from '../clinic.config';

type Msg = { role:'user'|'assistant'; content:string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => { if (open && msgs.length === 0) setMsgs([{ role:'assistant', content: `${CLINIC.chat_persona} Posso te ajudar com qual procedimento hoje?` }]); }, [open]);
  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight; }, [msgs, typing]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim(); if (!text || typing) return;
    const next = [...msgs, { role:'user' as const, content:text }];
    setMsgs(next); setInput(''); setTyping(true);
    try {
      const r = await fetch('/api/chat', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ clinicSlug: CLINIC.slug, messages: next }) });
      const j = await r.json();
      const reply = j.text || 'Desculpe, tive um problema. Pode reformular?';
      setMsgs([...next, { role:'assistant', content: reply }]);
    } catch { setMsgs([...next, { role:'assistant', content: 'Conexão instável — me chame de novo em alguns segundos.' }]); }
    finally { setTyping(false); }
  }

  return (<>
    <button onClick={() => setOpen(v=>!v)} className="fixed bottom-6 right-6 w-16 h-16 rounded-full grid place-items-center text-white z-50 shadow-2xl hover:scale-110 transition-transform" style={{ background: 'var(--color-primary)', boxShadow: `0 16px 50px ${CLINIC.brand.primary}80` }} aria-label="Abrir chat">
      {open ? <X size={26} /> : <MessageCircle size={26} />}
    </button>
    {open && (
      <div className="fixed bottom-28 right-6 w-[380px] max-w-[calc(100vw-32px)] h-[560px] max-h-[78vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 border" style={{ borderColor: `${CLINIC.brand.primary}25` }}>
        <div className="px-5 py-4 flex items-center gap-3 text-white" style={{ background: 'var(--color-primary)' }}>
          <div className="w-10 h-10 rounded-full grid place-items-center font-bold text-sm" style={{ background: CLINIC.brand.accent, color: CLINIC.brand.primary }}>{CLINIC.brand.logo_glyph}</div>
          <div className="flex-1 min-w-0"><div className="text-sm font-semibold truncate">{CLINIC.name} · IA</div><div className="text-[11px] opacity-85 flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400" />online</div></div>
          <button onClick={()=>setOpen(false)} className="opacity-70 hover:opacity-100"><X size={20} /></button>
        </div>
        <div ref={bodyRef} className="flex-1 px-4 py-4 overflow-y-auto flex flex-col gap-2.5" style={{ background: 'var(--color-paper)' }}>
          {msgs.map((m,i) => (
            <div key={i} className={`text-[14px] leading-relaxed px-3.5 py-2.5 rounded-2xl max-w-[85%] ${m.role==='user'?'self-end text-white rounded-br-md':'self-start bg-white border rounded-bl-md'}`} style={m.role==='user'?{ background:'var(--color-primary)' }:{ borderColor:`${CLINIC.brand.primary}18`, color:'var(--color-ink)' }}>{m.content}</div>
          ))}
          {typing && <div className="self-start text-xs italic opacity-60 flex items-center gap-2 px-2"><Loader2 size={12} className="animate-spin" /> digitando…</div>}
        </div>
        <form onSubmit={send} className="p-3 border-t flex gap-2 bg-white" style={{ borderColor: `${CLINIC.brand.primary}15` }}>
          <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Pergunte…" className="flex-1 px-4 py-2.5 rounded-full border outline-none text-sm" style={{ borderColor: `${CLINIC.brand.primary}25`, background: 'var(--color-paper)' }} />
          <button type="submit" className="w-11 h-11 rounded-full grid place-items-center text-white shrink-0" style={{ background: 'var(--color-primary)' }} aria-label="Enviar"><Send size={16} /></button>
        </form>
      </div>
    )}
  </>);
}
