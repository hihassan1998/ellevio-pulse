# Executive Interview Preparation & Strategic Portfolio Report: Webbansvarig på Ellevio

**Kandidat:** Hassan Hussain  
**Tjänst:** Webbansvarig (Stockholm / Karlstad)  
**Företag:** Ellevio AB  
**Dokumenttyp:** Strategisk intervjuförberedelse, produktanalys & onboardingplan  
**Repository:** [github.com/hihassan1998/ellevio-pulse](https://github.com/hihassan1998/ellevio-pulse)  
**Portfölj:** [hihassan1998.github.io](https://hihassan1998.github.io) | **anotherAI:** [anotheraiplatform.com](https://anotheraiplatform.com)

---

## Executive Summary

Detta dokument är en täckande strategisk brief framtagen för att förbereda **Hassan Hussain** inför intervjuprocessen för rollen som **Webbansvarig på Ellevio**. 

Briefen analyserar Ellevios strategiska utmaningar och visar hur demoprojektet **EllevioPulse**, i kombination med Hassans praktiska erfarenhet som SaaS-grundare för **anotherAI** (där han lett 2 underkonsulter), frontendutvecklare på **QUHDock** och 172,5 hp universitetsstudier (BTH & LTU), direkt besvarar alla krav i Ellevios kravprofil.

---

## Del 1: Genomgång av EllevioPulse-funktioner (Problem, Lösning & Framtida Utveckling)

```
                            ELLEVIOPULSE ARKITEKTUR
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │                         HEADER & DISCLAIMER BANNER                          │
 │      • Transparens & Friskrivningsklausul för Ellevio AB & LinkedIn        │
 └─────────────────────────────────────────────────────────────────────────────┘
                                       │
 ┌─────────────────────────────────────┴───────────────────────────────────────┐
 │                  STRATEGISK REKRYTERINGSBANNER (HIRING TEAM)                 │
 │   1. Datavisualisering   │  2. Innehållsstrategi   │ 3. AI & Kundinsikt       │
 └─────────────────────────────────────┬───────────────────────────────────────┘
                                       │
 ┌─────────────────────────────────────┼───────────────────────────────────────┐
 │                                     │                                       │
 ▼                                     ▼                                       ▼
┌────────────────────────┐  ┌────────────────────────┐  ┌────────────────────────┐
│   SE1–SE4 SPOTCHART    │  │   VAD KOSTAR DET?      │  │  FLYTTANDE AI-CHATT    │
│  Live eldata via open  │  │  Smarta tidsintervall  │  │  gpt-4o-mini + EU AI   │
│  API (elprisetjustnu)  │  │ (00–06, 06–12, 12-24)  │  │  Act & Human-in-Loop   │
└────────────────────────┘  └────────────────────────┘  └────────────────────────┘
```

---

### 1. Realtidsvisualisering av Elområden (SE1–SE4)

* **Det Identifierade Problemet (Issue):**  
  Elmarknaden är komplex för icke-tekniska konsumenter. Skillnader i spotpriser och överföringskapacitet mellan norra (SE1/SE2) och södra Sverige (SE3/SE4) skapar ofta förvirring och kundfrågor på `ellevio.se`.
* **Implementerad Lösning (Solution):**  
  En interaktiv, tillgänglighetsanpassad (WCAG 2.1 AA) Recharts-grafer som hämtar levande data från det öppna API:et `elprisetjustnu.se`. Graferna visar spotpriser i öre/kWh inkl. moms och ger snabba nyckeltal (snitt, min, max) per elområde.
* **Framtida Utvecklingsidéer (Future Improvements):**  
  * **Integration med Svenska Kraftnäts (SVK) Elflödesdata:** Visualisera fysiska överföringskapaciteter och flaskhalsar mellan elområdena i realtid.
  * **Interaktiv Strömavbrottskarta:** Integrera Ellevios kartdata för avbrottshantering direkt i graferna för att visa om ett prisavvik beror på lokalt nätunderhåll.

---

### 2. "Vad kostar det för dig?" – Kalkylator med Smarta Tidsintervall

* **Det Identifierade Problemet (Issue):**  
  Vanliga kalkylatorer använder ett platt dygnsmedelpris. Det hjälper inte kunden att förstå *när* på dygnet det är billigast att använda elen eller hur de kan sänka sina kostnader.
* **Implementerad Lösning (Solution):**  
  Refaktorerad kalkylator med **4 sex-timmars tidsintervall** (00–06 Natt, 06–12 Morgon, 12–18 Eftermiddag, 18–24 Kväll). Beräknar exakt kostnad för elbilsladdning (40 kWh), tvätt (1.5 kWh) och uppvärmning (25 kWh) i valt tidsfönster och ger en automatisk sparkalkyl: *"Spara upp till X kr genom att ladda på natten!"*.
* **Framtida Utvecklingsidéer (Future Improvements):**  
  * **Push-notiser för Billigaste Laddtimme:** Möjlighet för kunden att ställa in notiser när spotpriset i deras elområde sjunker under en viss nivå.
  * **Solcellseffekt & Egenproduktion:** Kalkylator för kunder med solceller som visar när det är mest lönsamt att sälja överskottseffekt tillbaka till elnätet.

---

### 3. Flytande AI-Kundassistent med Human-in-the-Loop & EU AI Act Transparens

* **Det Identifierade Problemet (Issue):**  
  På Ellevios nuvarande webbplats slussas kundchatten direkt till mänskliga operatörer. Under toppar (t.ex. vid oväder eller fakturering) blir köerna långa. Samtidigt saknas uppföljning kring vilka ärenden kunderna föredrar att lösa via självbetjäning vs mänsklig kontakt.
* **Implementerad Lösning (Solution):**  
  En flytande bottom-right chattdrawer med OpenAI `gpt-4o-mini` som svara på 100% ren svenska dygnet runt. Inkluderar:
  * **EU AI Act Transparensbanner (Artikel 50):** Tydlig märkning att kunden pratar med en automatiserad AI-assistent.
  * **Byt till Mänsklig Kontakt (Human-in-the-Loop):** Växlar gränssnittet till en mänsklig operatör (Maria, Ellevio Kundtjänst) med grön statusindikator `🟢`.
  * **BankID Demo-Knapp:** Visar säker legitimering i uppvisningssyfte utan krascher.
  * **Datainsamling för Webbstrategi:** Loggar kundernas val mellan AI och mänsklig kontakt som underlag för Ellevios framtida webb- och bemanningsbeslut.
* **Framtida Utvecklingsidéer (Future Improvements):**  
  * **RAG (Retrieval-Augmented Generation) på Ellevios kunskapsbas:** Sök direkt i alla Ellevios officiella PDF-guider och villkor.
  * **Sömlös Överlämning till CRM/Ticketing:** Automatisk generering av ärendekort i Ellevios kundtjänstsystem när kunden byter till mänsklig operatör.

---

### 4. Strikt Datasäkerhet & Token-Skydd (`000-ai-privacy-rules.md`)

* **Det Identifierade Problemet (Issue):**  
  Att skicka stora prisdatabaser eller live API-matriser till AI-modeller orsakar token-explosion, höga kostnader och risk för AI-hallucinationer.
* **Implementerad Lösning (Solution):**  
  Skapat en obligatorisk arkitekturregel där **100% av prisdata beräknas lokalt** i TypeScript. AI-modellen tar endast emot korta användarfrågor. Detta garanterar blixtsnabba svar och en kostnad på under 0,0003 kr per meddelande.

---

## Del 2: Matchning mot Ellevios Kravprofil & Hassans Erfarenhet

| Ellevios Krav i Annonsen | Hassans Bevisade Erfarenhet & Portfölj | Hur det demonstreras i EllevioPulse |
| :--- | :--- | :--- |
| **"Flera års erfarenhet av webb, digital kommunikation eller redaktionellt arbete"** | **anotherAI & QUHDock:** 3+ års samlad erfarenhet av webbutveckling, frontend och digitala plattformar. | Byggt och lanserat kompletta webbapplikationer från idé till produktion. |
| **"Relevant utbildning inom IT/webb"** | **172,5 hp akademisk grund:**<br>• BTH: 120 hp Webbprogrammering (UX, tillgänglighet, databaser)<br>• LTU: 52,5 hp (databaser, matematik, MATLAB, C#) | Full förståelse för både teknisk arkitektur och användarcentrerad kommunikation. |
| **"Erfarenhet av att driva utvecklingsprojekt"** | **Grundare för anotherAI (Enskild Firma):** Drivit hela produktlivscykeln, kunddialoger och **lett 2 externa underkonsulter**. | Byggt EllevioPulse med modularitet, specifikationer (`docs/specs/`) och CI/CD. |
| **"God kunskap om digital tillgänglighet (DOS-lagen/WCAG)"** | **BTH Specialisering:** Djupgående studier och praktisk tillämpning av WCAG 2.1 AA. | Inkluderat tangentbordsfokus, aria-labels och kontrastrika färgscheman. |
| **"Använder AI som en naturlig del av ditt arbete"** | **GenAI-specialist & SaaS-byggare:** Expert på OpenAI API:er, Vercel AI SDK, prompt engineering och AI-integrationer. | Integrerat `gpt-4o-mini` med plain-text streaming, EU AI Act-banner och loop-skydd. |
| **"Förståelse för industri/teknik & kommunikation"** | **Hitachi Energy & Badger Meter:** Nätverksmigrering samt programmering av ABB IRC5-robotar. | Förmåga att översätta tekniska elnätskoncept till enkel svenska för elkunder. |

---

## Del 3: Onboardingplan & Framtida Fokusområden hos Ellevio

Om jag blir aktuell för tjänsten som Webbansvarig på Ellevio kommer jag under de första 90 dagarna att fokusera på följande tre områden:

```
                          90-DAGARS ONBOARDINGPLAN
 ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
 │    DAG 1 – 30        │   │    DAG 31 – 60       │   │    DAG 61 – 90       │
 │ Systemutbildning &   │ ──► Tillgänglighet &     │ ──► AI-Strategi &        │
 │ Optimizely CMS       │   │ Innehållsrevision    │   │ Datadriven Analys    │
 └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

1. **Optimizely (Episerver) CMS & Publiceringsflöden (Dag 1–30):**
   * *Fokus:* Sätta mig in i Ellevios befintliga CMS-arkitektur, komponentbibliotek, Optimizely-arbetsflöden och redaktörsrättigheter för att säkerställa smidig daglig publicering.
2. **Tillgänglighetsrevision & SEO-analys (Dag 31–60):**
   * *Fokus:* Genomföra en grundlig tillgänglighetsgranskning (WCAG 2.1 AA / DOS-lagen) på `ellevio.se`, identifiera förbättringsområden i sökstrukturen och optimera innehållet för kunders vanligaste sökbeteenden.
3. **AI-Driven Kundinsikt & Tvärfunktionellt Samarbete (Dag 61–90):**
   * *Fokus:* Samarbeta tätt med kommunikation, CX, kundservice och IT för att utvärdera var AI-stöd och automatisering kan avlasta kundtjänst och skapa bäst nytta för Ellevios kunder.

---

## Del 4: Löneförhandling & Strategi

### Target Lönenivå: **43 000 – 47 000 SEK / månad**

#### **Strategisk Motivering & Positionering vid Intervjun:**
* **Bredare än en traditionell webbredaktör:** Jag kombinerar redaktionell känsla och digital kommunikation med **fullstack webbprogrammering, AI-kompetens och databasförståelse**.
* **Affärsmässigt Produktansvar:** Som grundare för min enskilda firma (*anotherAI*) har jag drivit produkter från ax till limpa, hanterat kundrelationer och lett underkonsulter. Jag kräver minimal startsträcka.
* **Mätbar Effektivisering:** Med min kunskap inom AI-verktyg och automatisering kan jag effektivisera Ellevios publicerings- och innehållsprocesser avsevärt.

> **Svarsformulering vid lönefråga på intervjun:**  
> *"Baserat på min kombination av fullstack webbprogrammering (172,5 hp), praktisk erfarenhet av att driva digitala produkter och leda utveckling samt min spetskompetens inom AI och tillgänglighet, ser jag en lön i spannet 43 000 – 47 000 kr/månad som marknadsmässig och rimlig för rollen som Webbansvarig."*

---

## Del 5: Snabba Intervjusvar (Cheatsheet)

* **Fråga: "Hur ser du på rollen som Webbansvarig på Ellevio?"**  
  *Svar:* "För mig handlar rollen om att hålla ihop helheten på `ellevio.se` – att göra komplex elnätsinformation enkel, lättillgänglig och användarvänlig för nästan en miljon kunder, samtidigt som vi nyttjar modern teknik och AI för att kontinuerligt förbättra kundupplevelsen."
* **Fråga: "Hur arbetar du med digital tillgänglighet (WCAG)?"**  
  *Svar:* "Tillgänglighet handlar inte bara om lagkrav (DOS-lagen), utan om god UX för alla. Från min utbildning på BTH arbetar jag med semantisk HTML, tydliga kontrastförhållanden, tangentbordsnavigering och skärmläsarstöd från första början."
* **Fråga: "Hur använder du AI i ditt dagliga arbete?"**  
  *Svar:* "Jag använder AI för allt från att snabbt strukturera och målgruppsanpassa texter till SEO-analyser och automatisering. I mitt demoprojekt visar jag också hur AI kan avlasta kundtjänst dygnet runt med bibehållen transparens enligt EU AI Act."

---

*Rapporten är sparad i `docs/markdown.md` i EllevioPulse-repositoryt.*
