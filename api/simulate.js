const PROCEDURE_PROMPTS = {
  "harmonizacao-facial": "Realistic facial harmonization preview. Subtle improvements: malar projection, mandibular angle definition, chin balance, mid-face support. Respect anatomy and golden ratio proportions. PRESERVE: identity, skin texture, hair, expression, lighting. Output must be IMMEDIATELY recognizable as the same person — only refined.",
  "preenchimento-labial": "Hyaluronic acid lip filler simulation. Increase lip volume by ~20% with natural projection — upper:lower ratio 1:1.6. Define cupid's bow and vermilion border. PRESERVE: lip color, skin, surrounding facial features, expression. Avoid duck-lip or overfilled appearance.",
  "botox": "Botulinum toxin simulation. Smooth dynamic wrinkles on forehead, glabella and crow's feet — KEEP some natural movement and skin texture. PRESERVE: identity, skin tone, brow position (no frozen brow lift). Photorealistic output.",
  "bioestimulador": "Collagen biostimulator simulation (Sculptra/Radiesse style). Restore mid-face volume and skin firmness with smoothed texture, lifted nasolabial area. PRESERVE: identity, hair, expression."
};
const CLINIC = { slug: 'royal-face-paulinia', name: "Royal Face Paulínia", tone: "Aspiracional-jovem, instagramável. Fala em 'a gente'. Glow, royalty, autoestima." };

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { userB64, userMime, procedure } = req.body || {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY_MISSING' });
  const basePrompt = PROCEDURE_PROMPTS[procedure];
  if (!basePrompt) return res.status(400).json({ error: 'Procedure not supported' });
  const fullPrompt = [basePrompt, `Preview for ${CLINIC.name}.`, 'CRITICAL: photorealistic clinical preview, preserve patient identity perfectly.'].join('\n');
  try {
    const form = new FormData();
    form.append('model', 'gpt-image-2');
    form.append('prompt', fullPrompt);
    form.append('quality', 'medium');
    // retrato 1024x1536 — classe Full HD (~1.6MP), formato adequado a fotos frontais
    form.append('size', '1024x1536');
    form.append('image', new Blob([Buffer.from(userB64, 'base64')], { type: userMime || 'image/png' }), 'photo.png');
    const r = await fetch('https://api.openai.com/v1/images/edits', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}` },
      body: form,
    });
    const j = await r.json();
    if (!r.ok) {
      const code = j?.error?.code || '';
      if (r.status === 429 || code === 'insufficient_quota' || code === 'rate_limit_exceeded') {
        return res.status(503).json({ error: 'QUOTA_EXCEEDED', userMessage: 'O simulador está temporariamente indisponível por limite de uso. Agende uma consulta para ver o resultado ao vivo com nossa equipe!' });
      }
      return res.status(500).json({ error: j?.error?.message || 'OpenAI error' });
    }
    const b64 = j?.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: 'No image in response' });
    return res.status(200).json({ ok: true, clinic: CLINIC.name, procedure, image: { mimeType: 'image/png', data: b64 } });
  } catch (err) { return res.status(500).json({ error: err.message }); }
}
