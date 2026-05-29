import { CLINIC } from '../clinic.config';

export default function Footer() {
  return (
    <footer className="text-white py-16 pb-8" style={{ background: CLINIC.brand.ink }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-10 rounded-xl grid place-items-center font-bold text-sm" style={{ background: 'var(--color-primary)' }}>{CLINIC.brand.logo_glyph}</span>
              <span className="font-display text-xl">{CLINIC.name}</span>
            </div>
            <p className="text-sm opacity-70 mb-2">{CLINIC.tagline}</p>
            <p className="text-sm opacity-70">{CLINIC.city}</p>
            <p className="text-sm opacity-70">{CLINIC.email}</p>
          </div>
          <div>
            <h4 className="font-display text-base mb-4" style={{ color: CLINIC.brand.accent }}>Procedimentos</h4>
            {(CLINIC as any).procedure_details?.slice(0,5).map((p: any) => (
              <a key={p.id} href="#procedures" className="block text-sm opacity-70 hover:opacity-100 mb-2 no-underline text-white">{p.name}</a>
            ))}
          </div>
          <div>
            <h4 className="font-display text-base mb-4" style={{ color: CLINIC.brand.accent }}>Navegar</h4>
            <a href="#procedures" className="block text-sm opacity-70 hover:opacity-100 mb-2 no-underline text-white">Procedimentos</a>
            <a href="#simulator" className="block text-sm opacity-70 hover:opacity-100 mb-2 no-underline text-white">Simulador IA</a>
            <a href="#testimonials" className="block text-sm opacity-70 hover:opacity-100 mb-2 no-underline text-white">Resultados</a>
            <a href="#schedule" className="block text-sm opacity-70 hover:opacity-100 mb-2 no-underline text-white">Agendar</a>
          </div>
          <div>
            <h4 className="font-display text-base mb-4" style={{ color: CLINIC.brand.accent }}>Tecnologia</h4>
            <p className="text-sm font-semibold mb-1" style={{ color: CLINIC.brand.accent }}>⊹ Powered by VISIOON</p>
            <p className="text-xs opacity-60">Certeza visual antes da decisão.</p>
            <p className="text-xs opacity-50 mt-3">Gemini 3.1 · proxy seguro</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-wrap justify-between text-xs opacity-50 gap-3">
          <span>© 2026 {CLINIC.name}. Todos os direitos reservados.</span>
          <span>Site demonstrativo · VISIOON IA</span>
        </div>
      </div>
    </footer>
  );
}
