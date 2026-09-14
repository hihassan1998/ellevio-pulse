# Mandatory Architectural Rule: AI Data Privacy & Token Protection

---

## 🔒 Mandatory Rule: ZERO Live API Price Data Sent to AI Models

### 1. Rule Statement
**Under no circumstances shall live electricity spot price datasets, API responses from `elprisetjustnu.se`, hourly price arrays, or computed financial metrics be injected into the OpenAI/AI model prompts, route handlers, or client message payloads.**

---

### 2. Technical Safeguards & Scoping

1. **Local & Client-Side Calculation Only:**
   - All spot price aggregations, average calculations, time-interval pricing (`00:00–06:00`, `06:00–12:00`, etc.), appliance cost estimates, and savings recommendations MUST be computed **100% locally** in TypeScript using client/server components (`lib/elpris.ts` and React components).

2. **AI Scope Restriction:**
   - The AI Assistant endpoint (`app/api/ai-assistant/route.ts`) is strictly reserved for answering general Swedish customer FAQs (grid connections, solar setup, general elområden explanations, outage reporting).
   - The prompt payload sent to OpenAI contains **ONLY** the user's typed plain text messages (`[{ role: 'user', content: '...' }]`).

3. **Prevention of Token Explosion & Catastrophic Cost:**
   - Injecting 24–96 hourly data points across 4 bidding zones into the AI context window wastes thousands of tokens per message and introduces latency/hallucination risks.
   - Restricting AI payloads guarantees sub-second response times and keeps token costs at < $0.00003 per query.

---

### 3. Compliance Enforcement for All Future Changes
- Before committing any refactor or new feature, verify that no `HourlyPrice[]` or `ZoneStats[]` objects are passed into `fetch('/api/ai-assistant')` or `streamText()`.
