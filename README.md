# ⚡ EllevioPulse – Interaktiv Eldata, Elnätskarta & AI-Kundassistent för Ellevio

**EllevioPulse** är en modern, tillgänglighetsanpassad (WCAG 2.1 AA) fullstack-webbapplikation byggd med **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, **Leaflet (OpenStreetMap)**, **Recharts** och **OpenAI (gpt-4o-mini)**.

Applikationen visualiserar och analyserar svenska elområden i realtid (**SE1 Luleå, SE2 Sundsvall, SE3 Stockholm och SE4 Malmö**) baserat på öppna data från [Elpriset Just Nu API](https://www.elprisetjustnu.se/elpris-api) och kopplar spotpriser till **Ellevios lokala elnät och transformatorkapacitet**.

---

## ✨ Huvudfunktioner

- 📊 **Makrojämförelse av Elområden (SE1–SE4):** Interaktiva grafer som jämför timpriser (öre/kWh inkl. moms) mellan norra och södra Sverige i realtid.
- 🗺️ **Sverigekarta med Elområden (OpenStreetMap + Leaflet):** Interaktiv geografisk karta med länsgränser, elområdespolygoner (SE1–SE4) och realtidsindikatorer för Ellevios transformatorkapacitet (%).
- ⏱️ **Demand-Response Timmätar-Matrix:** 24-timmars färgkodad belastningsmatris (🟢 Nattladdning 00–06, 🟡 Dagpris, 🔴 Pristopp & nätbelastning) med interaktiv timgranskare och automatiska tröskelvarningar.
- 💡 **Interaktiv Sparkalkylator:** Omvandlar spotpriser till faktiska besparingar i kronor för hushållsapparater (elbil, tvättmaskin, uppvärmning).
- 🤖 **AI-Kundassistent (OpenAI gpt-4o-mini):** Integrerad AI-assistent som besvarar kunders frågor om elnätsavgifter, solcellsanslutningar och elområdesskillnader på enkel svenska (med Human-in-the-Loop och lokal demo-fallback).
- 📡 **Öppen Data & Dataarkitektur:** Transparent översiktssektion som redovisar alla datakällor (Nord Pool API, OpenStreetMap vector tiles, Ellevio telemetry, OpenAI SSE stream).
- ♿ **Tillgänglighet i Fokus (WCAG 2.1 AA):** Byggd med tangentbordsnavigering, aria-labels, W3C-standarder och kontrastrika färgscheman.

---

## 🛠️ Teknisk Stack

- **Framework:** Next.js 14 (App Router, Server Components & Dynamic Client Modules)
- **Språk:** TypeScript
- **Styling:** Tailwind CSS + Lucide Icons
- **Karta:** Leaflet & React-Leaflet + OpenStreetMap Vector Tiles
- **Grafer:** Recharts (BarChart & LineChart)
- **Öppna Data:** [Elpriset Just Nu REST API](https://www.elprisetjustnu.se/elpris-api) (0 kr, öppet API)
- **AI-modell:** OpenAI `gpt-4o-mini` (via `@ai-sdk/openai` & Vercel AI SDK)

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
Skapa en `.env.local`-fil i rotnivån (valfritt för AI-nyckel; applikationen har inbyggd demo-fallback om nyckel saknas):
```env
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
```

### 4. Starta utvecklingsservern
```bash
npm run dev
```
Öppna [http://localhost:3000](http://localhost:3000) i din webbläsare.

---

## 🧪 Bygg & Produktionstest

För att verifiera att applikationen kompilerar utan fel:
```bash
npm run build
```

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

