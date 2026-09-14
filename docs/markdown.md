# Executive Interview Preparation & Strategic Portfolio Report: Webbansvarig på Ellevio

**Kandidat:** Hassan Hussain  
**Tjänst:** Webbansvarig (Stockholm / Karlstad)  
**Företag:** Ellevio AB  
**Dokumenttyp:** Strategisk intervjuförberedelse, produktanalys, teknisk arkitektur & onboardingplan  
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
 │      • EU AI Act Transparens & Friskrivningsklausul för Ellevio AB          │
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
  En interaktiv, tillgänglighetsanpassad (WCAG 2.1 AA) Recharts-graf som hämtar levande data från det öppna API:et `elprisetjustnu.se`. Graferna visar spotpriser i öre/kWh inkl. moms och ger snabba nyckeltal (snitt, min, max) per elområde.
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
  En flytande bottom-right chattdrawer med OpenAI `gpt-4o-mini` som svarar på 100% ren svenska dygnet runt. Inkluderar:
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

## Del 2: Tekniska Beslut & Teknikvalsanalys

I detta demoprojekt har valen av teknologier gjorts utifrån ett strikt balansförhållande mellan **prestanda, tillgänglighet (WCAG), framtidssäkerhet och förvaltbarhet**.

### 1. Vald Teknikstack (Valda teknologier & varför)

| Teknologival | Varför detta valdes för EllevioPulse |
| :--- | :--- |
| **Next.js 15 (App Router & React 19)** | Ger både Server-Side Rendering (SSR) och Static Site Generation (SSG). Möjliggör blixtsnabb första laddtid, optimal SEO för Ellevios publika sidor och säkra serverlösningar för API-rutter utan exponering av API-nycklar. |
| **TypeScript (Strict Mode)** | Garanterar typsäkerhet över hela applikationen. Förhindrar runtime-krascher och `null/undefined`-fel vid hantering av externt API-data (t.ex. spotpris-JSON från `elprisetjustnu.se`). |
| **Tailwind CSS v4** | Verktygsbaserad CSS som tillåter exakt implementering av Ellevios designsystem (`#0b8454` grön, `#2c2827` mörk text, `#f2f1f0` yta) utan tung runtime-overhead eller CSS-in-JS prestandaförluster. |
| **Recharts** | Lättviktigt, tillgänglighetsanpassat SVG-diagrambibliotek som är enkelt att göra responsivt och anpassa för skärmläsare och tangentbordsnavigering. |
| **Vercel AI SDK + OpenAI `gpt-4o-mini`** | Ger streamade svar (`toTextStreamResponse`) i realtid med minimal latens. `gpt-4o-mini` valdes för att ge 99% av prestandan till 1/10 av kostnaden jämfört med `gpt-4o`. |
| **Lucide Icons** | Vektoriserade, WCAG-anpassade ikonkomponenter med inbyggd skärmläsar-tillgänglighet. |

### 2. Avfärdade Alternativ (Vad som inte valdes & varför)

* **Client-Side Single Page Application (Vite + React / Untyped JS):**  
  * *Varför bortvalt:* Saknar inbyggd SSR. Detta ger sämre SEO-indexering och längre "Time to Interactive" (TTI) för kunder på mobila nätverk. Utan TypeScript ökar också risken för tysta datatypfel i produktion.
* **Tunga UI-Komponentbibliotek (MUI / Bootstrap / Ant Design):**  
  * *Varför bortvalt:* Orsakar stor JavaScript-bundle-storlek (bloat), har rigid fördefinierad styling som är svår att anpassa till Ellevios unika varumärkesprofil, samt skapar prestandahinder på mobila enheter.
* **Tung RAG / Vektordatabas-infrastruktur (Pinecone / LangChain):**  
  * *Varför bortvalt:* För ett renodlat demo- och självbetjäningsgränssnitt tillför vektordatabaser onödig komplexitet, latens och höga molnkostnader. Istället användes strukturerad prompt-engineering och lokal databeräkning för omedelbar respons.
* **WebSockets för chatt backend:**  
  * *Varför bortvalt:* Kräver permanent servertillstånd och komplex lasthantering (sticky sessions). HTTP-streamade API-rutter via Vercel AI SDK ger samma realtidskänsla med betydligt enklare, serverlös och skalbar arkitektur.

---

## Del 3: Hassans Arbetssätt, Metodik & Överförbara Kompetenser

### 1. Det Klassiska 4-Fasiga Strategiska Ramverket

Hassan strukturerar allt sitt arbete kring den etablerade 4-fasiga produkt- och förändringsmodellen:

```
                     DET KLASSISKA 4-FASIGA RAMVERKET
 ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
 │     1. VISION        │ ─►│    2. MASTER PLAN    │ ─►│  3. IMPLEMENTATION   │ ─►│    4. ADAPTATION     │
 │ Identifiera behov,   │   │ Arkitektur, krav,    │   │ Bygga, prototypa &   │   │ Utvärdera insikter,  │
 │ utmaningar & mål.    │   │ specifikationer & UX.│   │ lansera källkod.     │   │ kantfall & förfina.  │
 └──────────────────────┘   └──────────────────────┘   └──────────────────────┘   └──────────────────────┘
```

* **Fas 1: Vision (Nulägesanalys & Målbild):**  
  Att kartlägga varför förändringen behövs, förstå affärsmålen och etablera en tydlig riktning för digital kommunikation och funktionalitet.
* **Fas 2: Master Plan (Strategisk Arkitektur & Design):**  
  Att bryta ner visionen i konkreta, delbara specifikationer, användarflöden, målgruppsprofiler och tekniska kravställningar innan resurser låses i kod.
* **Fas 3: Implementation (Exekvering & Prototypning):**  
  Att snabbt och agilt omsätta planerna till fungerande, typsäker källkod, tillgänglighetsanpassade gränssnitt och testbara lösningar.
* **Fas 4: Adaptation (Revision, Iteration & Långsiktig Förvaltning):**  
  Att kontinuerligt utvärdera lösningen mot verkliga användardata, hantera kantfall (edge cases), säkerställa legala krav (EU AI Act, WCAG) och refaktorisera utifrån användarfeedback.

---

### 2. Hassans Egenutvecklade 7-Stegs Operativa Strategi

För att omsätta det 4-fasiga ramverket i det dagliga arbetet använder Hassan sin egenutvecklade **7-stegs operativa exekveringsmodell**:

```
                   HASSANS OPERATIVA 7-STEGSSTRATEGI
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ 1. PINPOINTA PROBLEMET  ► Bryt ner den faktiska utmaningen & målet.         │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 2. DEFINIERA MÅLGRUPP   ► Vem drabbas? (Icke-tekniska kunder, redaktörer).  │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 3. DOKUMENTERA & DELA   ► Skriv öppna specifikationer (docs/specs/).        │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 4. PROTOTYPA & TESTA    ► Bygg den starkaste lösningen iterativt i kod.     │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 5. MÅLGRUPPSREFAKTOR    ► Justera UX, språk och kontrast efter insikter.    │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 6. EDGE-CASE REVISION   ► Granska kantområden, tillgänglighet & lagkrav.    │
 ├─────────────────────────────────────────────────────────────────────────────┤
 │ 7. HELHETSANSVAR        ► Sätt dig in i alla system utanför egen roll.     │
 └─────────────────────────────────────────────────────────────────────────────┘
```

#### Hur Hassans 7 steg exekverar de 4 faserna:

1. **Under Fas 1 (Vision):**
   * **Steg 1: Pinpointa & Förstå Problemet:** Bryter ner utmaningen till dess rotorsak (t.ex. varför kunder kontaktar kundtjänst eller varför el-information upplevs svår).
2. **Under Fas 2 (Master Plan):**
   * **Steg 2: Identifiera Målgrupp (Målgruppsanalys):** Skräddarsyr lösningen utifrån vem som drabbas – från icke-tekniska privatkunder till interna redaktörer och kundtjänstpersonal.
   * **Steg 3: Idégenerering & Dokumentation för Delbarhet:** Skriver öppna tekniska specifikationer (`docs/specs/`) som dokumenterar arkitektur, regler och idéer. Detta möjliggör transparent dialog och feedback med kollegor och ledning innan kod låses.
3. **Under Fas 3 (Implementation):**
   * **Steg 4: Iterativ Utveckling & Prototypbygge:** Snabb implementering av den bästa kandidatlösningen i källkod för att skapa en levande, testbar prototyp.
   * **Steg 5: Målgruppsanpassad Refaktorisering:** Refaktorerar och finjusterar UX, layout, tillgänglighet och copy baserat på målgruppens respons och faktiska användningsmönster.
4. **Under Fas 4 (Adaptation):**
   * **Steg 6: Noggrann Granskning & Kantfalls-Testning (Edge Cases):** Revision från användarens perspektiv. Vad händer om externt API fallerar? Fungerar tangentbordsnavigering? Efterlevs EU AI Act och GDPR?
   * **Steg 7: Helhetsansvar & Tekniknyfikenhet:** Proaktivt ta ansvar för att förstå även de tekniska delar som ligger utanför mitt omedelbara ansvarsområde (backend, molnarkitektur, legala ramverk, databaser). Detta skapar sömlös samverkan i tvärfunktionella team och garanterar långsiktigt hållbara digitala lösningar.

---

### 3. Överförbara Kompetenser för Rollen som Webbansvarig

* **Tvärfunktionell Kommunikation & Brobyggare:**  
  Förmåga att översätta komplexa IT- och elnätskoncept till ett enkelt, pedagogiskt språk som alla förstår.
* **Produktledarskap & Entreprenörskap (anotherAI):**  
  Erfarenhet av att ha drivit en enskild firma, prioriterat roadmap, hanterat kundkrav och **lett 2 underkonsulter**.
* **Industri- och Teknikförståelse:**  
  Erfarenhet från **Hitachi Energy** (nätverk/migrering) och **Badger Meter** (programmering av ABB IRC5-robotar), vilket ger en djup respekt för Ellevios industriella och samhällskritiska uppdrag.
* **Kvalitets- och Regelverkstänk (WCAG & EU AI Act):**  
  Formell utbildning (BTH 120 hp) i digital tillgänglighet och praktisk tillämpning av EU:s nyaste AI-regelverk.

---

## Del 4: Matchning mot Ellevios Kravprofil & Hassans Erfarenhet

| Ellevios Krav i Annonsen | Hassans Bevisade Erfarenhet & Portfölj | Hur det demonstreras i EllevioPulse |
| :--- | :--- | :--- |
| **"Flera års erfarenhet av webb, digital kommunikation eller redaktionellt arbete"** | **anotherAI & QUHDock:** 3+ års samlad erfarenhet av webbutveckling, frontend och digitala plattformar. | Byggt och lanserat kompletta webbapplikationer från idé till produktion. |
| **"Relevant utbildning inom IT/webb"** | **172,5 hp akademisk grund:**<br>• BTH: 120 hp Webbprogrammering (UX, tillgänglighet, databaser)<br>• LTU: 52,5 hp (databaser, matematik, MATLAB, C#) | Full förståelse för både teknisk arkitektur och användarcentrerad kommunikation. |
| **"Erfarenhet av att driva utvecklingsprojekt"** | **Grundare för anotherAI (Enskild Firma):** Drivit hela produktlivscykeln, kunddialoger och **lett 2 externa underkonsulter**. | Byggt EllevioPulse med modularitet, specifikationer (`docs/specs/`) och CI/CD. |
| **"God kunskap om digital tillgänglighet (DOS-lagen/WCAG)"** | **BTH Specialisering:** Djupgående studier och praktisk tillämpning av WCAG 2.1 AA. | Inkluderat tangentbordsfokus, aria-labels och kontrastrika färgscheman. |
| **"Använder AI som en naturlig del av ditt arbete"** | **GenAI-specialist & SaaS-byggare:** Expert på OpenAI API:er, Vercel AI SDK, prompt engineering och AI-integrationer. | Integrerat `gpt-4o-mini` med plain-text streaming, EU AI Act-banner och loop-skydd. |
| **"Förståelse för industri/teknik & kommunikation"** | **Hitachi Energy & Badger Meter:** Nätverksmigrering samt programmering av ABB IRC5-robotar. | Förmåga att översätta tekniska elnätskoncept till enkel svenska för elkunder. |

---

## Del 5: Onboardingplan & Framtida Fokusområden hos Ellevio

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

## Del 6: Löneförhandling & Strategi

### Target Lönenivå: **43 000 – 47 000 SEK / månad**

#### **Strategisk Motivering & Positionering vid Intervjun:**
* **Bredare än en traditionell webbredaktör:** Jag kombinerar redaktionell känsla och digital kommunikation med **fullstack webbprogrammering, AI-kompetens och databasförståelse**.
* **Affärsmässigt Produktansvar:** Som grundare för min enskilda firma (*anotherAI*) har jag drivit produkter från ax till limpa, hanterat kundrelationer och lett underkonsulter. Jag kräver minimal startsträcka.
* **Mätbar Effektivisering:** Med min kunskap inom AI-verktyg och automatisering kan jag effektivisera Ellevios publicerings- och innehållsprocesser avsevärt.

> **Svarsformulering vid lönefråga på intervjun:**  
> *"Baserat på min kombination av fullstack webbprogrammering (172,5 hp), praktisk erfarenhet av att driva digitala produkter och leda utveckling samt min spetskompetens inom AI och tillgänglighet, ser jag en lön i spannet 43 000 – 47 000 kr/månad som marknadsmässig och rimlig för rollen som Webbansvarig."*

---

## Del 7: Snabba Intervjusvar (Cheatsheet)

* **Fråga: "Hur ser du på rollen som Webbansvarig på Ellevio?"**  
  *Svar:* "För mig handlar rollen om att hålla ihop helheten på `ellevio.se` – att göra komplex elnätsinformation enkel, lättillgänglig och användarvänlig för nästan en miljon kunder, samtidigt som vi nyttjar modern teknik och AI för att kontinuerligt förbättra kundupplevelsen."
* **Fråga: "Hur arbetar du med digital tillgänglighet (WCAG)?"**  
  *Svar:* "Tillgänglighet handlar inte bara om lagkrav (DOS-lagen), utan om god UX för alla. Från min utbildning på BTH arbetar jag med semantisk HTML, tydliga kontrastförhållanden, tangentbordsnavigering och skärmläsarstöd från första början."
* **Fråga: "Hur använder du AI i ditt dagliga arbete?"**  
  *Svar:* "Jag använder AI för allt från att snabbt strukturera och målgruppsanpassa texter till SEO-analyser och automatisering. I mitt demoprojekt visar jag också hur AI kan avlasta kundtjänst dygnet runt med bibehållen transparens enligt EU AI Act."
* **Fråga: "Hur tacklar du ett nytt projekt eller en komplicerad utmaning?"**  
  *Svar:* "Jag arbetar utifrån det klassiska 4-fasiga strategiramverket (Vision ➔ Master Plan ➔ Implementation ➔ Adaptation) och exekverar det med min egenutvecklade 7-stegsmetod: jag pinpointar kärnproblemet, definierar målgruppen, dokumenterar idéer och beslut för öppen dialog med teamet, bygger en fungerande prototyp, refaktorerar utifrån målgruppens feedback, granskar kantfall/tillgänglighet och tar helhetsansvar för alla relaterade tekniska system."

---

*Rapporten är sparad i `docs/markdown.md` i EllevioPulse-repositoryt.*
