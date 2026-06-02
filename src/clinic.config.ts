export const CLINIC = {
  "slug": "royal-face-paulinia",
  "name": "Royal Face Paulínia",
  "tagline": "Clínica boutique de estética facial · Paulínia",
  "slogan": "Você antes do antes e depois",
  "hero_headline_real": "Estética boutique no interior de SP",
  "domain": "royalface.com.br",
  "email": "contato@royalface.com.br",
  "city": "Paulínia · SP",
  "category": "Estética Facial Boutique",
  "primary_procedure": "harmonizacao-facial",
  "brand": {
    "primary": "#7B2D4B",
    "secondary": "#D4A5A5",
    "accent": "#F6E6D9",
    "ink": "#241016",
    "paper": "#FFF8F4",
    "font_display": "'Playfair Display', serif",
    "font_body": "'Manrope', sans-serif",
    "logo_glyph": "R"
  },
  "tone_of_voice": "Aspiracional-jovem, instagramável. Fala em 'a gente'. Glow, royalty, autoestima.",
  "icp": "Mulheres 22-38, decisão rápida via WhatsApp/DM.",
  "sections": [
    "Hero",
    "Procedures",
    "Combos",
    "Simulator",
    "BeforeAfter",
    "Testimonials",
    "Visit",
    "Schedule",
    "Footer",
    "ChatWidget"
  ],
  "hero": {
    "kicker": "Boutique · Paulínia · SP",
    "headline": "Você antes do antes e depois.",
    "sub": "Veja sua harmonização facial pronta com a IA da Royal Face — sem dor de cabeça e sem promessa que a gente não cumpre."
  },
  "cta_primary": "Simular meu glow",
  "chat_persona": "Sou Stella, da Royal Face. Bora simular juntas o seu antes-e-depois e tirar todas as dúvidas no WhatsApp?",
  "procedures": [
    "harmonizacao-facial",
    "preenchimento-labial",
    "botox",
    "bioestimulador"
  ],
  "procedure_details": [
    {
      "id": "harmonizacao-facial",
      "name": "Harmonização Facial",
      "desc": "Combo top — equilíbrio facial pensado pra você.",
      "img": "/img/photo-1559599101-f09722fb4948-ef9fbc.jpg"
    },
    {
      "id": "preenchimento-labial",
      "name": "Boca dos Sonhos",
      "desc": "Ácido hialurônico premium com aplicação delicada.",
      "img": "/img/photo-1612349317150-e413f6a5b16d-3a3be9.jpg"
    },
    {
      "id": "botox",
      "name": "Botox Preventivo",
      "desc": "Pra quem quer começar cedo, sem exagero.",
      "img": "/img/photo-1576091160550-2173dba999ef-f4d721.jpg"
    },
    {
      "id": "bioestimulador",
      "name": "Skin Glow",
      "desc": "Bioestimulador pra pele radiante e firme.",
      "img": "/img/procedure-bio.jpg"
    }
  ],
  "combos": [
    {
      "name": "Combo Glow",
      "items": [
        "Harmonização leve",
        "Botox preventivo",
        "Sessão de skinbooster"
      ],
      "price": "a partir de R$ 2.800"
    },
    {
      "name": "Combo Boca + Olhar",
      "items": [
        "Preenchimento labial",
        "Botox testa + olhos"
      ],
      "price": "a partir de R$ 1.900"
    },
    {
      "name": "Pacote Noiva",
      "items": [
        "3 sessões pré-casamento",
        "Avaliação personalizada",
        "Suporte WhatsApp"
      ],
      "price": "a partir de R$ 4.500"
    }
  ],
  "testimonials_real": [
    {
      "text": "Saí da Royal me sentindo a Beyoncé. Sério. Sem exagero, sem cara de pato.",
      "author": "@duda_paulinia"
    },
    {
      "text": "Atendimento de outro nível. Voltei pra fazer combo de aniversário.",
      "author": "@ju.silvaa"
    },
    {
      "text": "Recomendei pra MINHA mãe. Ela amou também 💕",
      "author": "@beahcoelho"
    }
  ],
  "images": {
    "hero": "/img/photo-1616394584738-fc6e612e71b9-362d9e.jpg",
    "procedures": {
      "harmonizacao-facial": "/img/photo-1559599101-f09722fb4948-ef9fbc.jpg",
      "preenchimento-labial": "/img/photo-1612349317150-e413f6a5b16d-3a3be9.jpg",
      "botox": "/img/photo-1576091160550-2173dba999ef-f4d721.jpg",
      "bioestimulador": "/img/procedure-bio.jpg"
    },
    "_note": "Royal Face: curadoria Unsplash de estética facial — site oficial inexistente"
  }
} as const;
export type ClinicConfig = typeof CLINIC;
