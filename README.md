# ⚡ EllevioPulse – Interaktiv Eldata & AI-Kundassistent för Ellevio

**EllevioPulse** är en modern, tillgänglighetsanpassad (WCAG 2.1 AA) fullstack-webbapplikation byggd med **Next.js 15**, **TypeScript**, **Tailwind CSS**, **Recharts** och **OpenAI (gpt-4o-mini)**.

Applikationen visualiserar och analyserar svenska elområden i realtid (**SE1 Luleå, SE2 Sundsvall, SE3 Stockholm och SE4 Malmö**) baserat på öppna data från [Elpriset Just Nu API](https://www.elprisetjustnu.se/elpris-api).

---

## ✨ Huvudfunktioner

- 📊 **Jämförelse av Elområden (SE1–SE4):** Interaktiva grafer som jämför timpriser (öre/kWh inkl. moms) mellan norra och södra Sverige.
- 💡 **Konsumentinsikter & Kalkylator:** Omvandlar spotpriser till faktiska hushållskostnader (elbil, tvätt, uppvärmning).
- 🤖 **AI-Kundassistent (OpenAI gpt-4o-mini):** Integrerad AI-assistent som besvarar kunders frågor om elnätsavgifter, solcellsanslutningar och elområdesskillnader på enkel svenska.
- ♿ **Tillgänglighet i Fokus (WCAG 2.1 AA):** Byggd med tangentbordsnavigering, aria-labels och kontrastrika färgscheman.

---

## 🛠️ Teknisk Stack

- **Framework:** Next.js 15 (App Router, Server Components)
- **Språk:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Grafer:** Recharts
- **Öppna Data:** [Elpriset Just Nu REST API](https://www.elprisetjustnu.se/elpris-api) (0 kr, kräver ingen API-nyckel)
- **AI-modell:** OpenAI `gpt-4o-mini` (via `@ai-sdk/openai`)

---

## 🚀 Snabbstart / Lokal Installation

### 1. Klona repositoryt
```bash
git clone https://github.com/hihassan1998/ellevio-pulse.git
cd ellevio-pulse
```

### 2. Installera beroenden
```bash
npm install
```

### 3. Konfigurera miljövariabler (`.env.local`)
Skapa en `.env.local`-fil i rotnivån och lägg till din OpenAI API-nyckel:
```env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
```

### 4. Starta utvecklingsservern
```bash
npm run dev
```
Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

---

## 🌐 Distribution (Vercel)

1. Importera repositoryt till [Vercel](https://vercel.com).
2. Lägg till miljövariabeln `OPENAI_API_KEY` under **Project Settings > Environment Variables**.
3. Klicka på **Deploy**.

---

## 👨‍💻 Utvecklad av
**Hassan Hussain**  
*Fullstackutvecklare & AI-specialist*  
- 🌐 Portfölj: [hihassan1998.github.io](https://hihassan1998.github.io)  
- 💼 LinkedIn: [linkedin.com/in/hassan-hussain-3b840429a](https://www.linkedin.com/in/hassan-hussain-3b840429a/)
