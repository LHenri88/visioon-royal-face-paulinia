import { GoogleGenAI } from '@google/genai';
const CLINIC = {
  "slug": "royal-face-paulinia",
  "name": "Royal Face Paulínia",
  "tagline": "Clínica boutique de estética facial · Paulínia",
  "chat_persona": "Sou Stella, da Royal Face. Bora simular juntas o seu antes-e-depois e tirar todas as dúvidas no WhatsApp?",
  "tone_of_voice": "Aspiracional-jovem, instagramável. Fala em 'a gente'. Glow, royalty, autoestima.",
  "icp": "Mulheres 22-38, decisão rápida via WhatsApp/DM.",
  "procedures": [
    "harmonizacao-facial",
    "preenchimento-labial",
    "botox",
    "bioestimulador"
  ]
};
export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { messages } = req.body || {};
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY_MISSING' });
  const systemPrompt = `Você é ${CLINIC.chat_persona}
Clínica: ${CLINIC.name} — ${CLINIC.tagline}
Tom: ${CLINIC.tone_of_voice}
ICP: ${CLINIC.icp}
Procedimentos: ${CLINIC.procedures.join(', ')}
Regras: PT-BR, máx 3 parágrafos curtos, nunca prometer resultado, sugerir agendamento no #schedule.`.trim();
  try {
    const ai = new GoogleGenAI({ apiKey });
    const history = (messages||[]).map(m => `${m.role==='user'?'Paciente':'Você'}: ${m.content}`).join('\n');
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: { parts: [{ text: `${systemPrompt}\n\nConversa:\n${history}\n\nVocê:` }] },
    });
    const text = response?.candidates?.[0]?.content?.parts?.find?.(p=>p.text)?.text || response?.text || 'Desculpe, tive um problema.';
    return res.status(200).json({ ok: true, text });
  } catch (err) { return res.status(500).json({ error: err.message }); }
}
