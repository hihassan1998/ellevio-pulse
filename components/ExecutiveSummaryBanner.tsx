'use client';

import React from 'react';
import { Sparkles, BarChart3, Users, Bot, ExternalLink, MapPin } from 'lucide-react';

export default function ExecutiveSummaryBanner() {
  return (
    <div className="card-ellevio border-l-4 border-l-[#0b8454] mb-8 bg-white max-w-full overflow-x-hidden break-words [overflow-wrap:anywhere]">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="bg-[#e7f6f0] text-[#0b8454] text-xs font-bold px-3 py-1 rounded-full border border-[#0b8454]/20 flex items-center gap-1.5 max-w-full break-words">
          <Sparkles className="w-3.5 h-3.5 fill-current shrink-0" />
          <span className="break-words">Till Ellevios Rekryteringsteam – Strategisk Webb- & UX-Analys</span>
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-[#2c2827] tracking-tight mb-2 break-words">
        Demoprojektets Mervärde & Demonstrerbara Kompetenser för Webbansvarig
      </h2>
      <p className="text-xs text-[#757575] leading-relaxed mb-4 break-words">
        Detta demoprojekt är utvecklat av <strong>Hassan Hussain</strong> för att demonstrera hur strategisk webbhantering, användarcentrerad innehållsdesign och modern AI-teknik samverkar för att skapa mätbart kund- och affärsvärde på <strong>ellevio.se</strong>.
      </p>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs pt-3 border-t border-[#e5e3e1]">
        {/* Pillar 1 */}
        <div className="p-3 bg-[#f2f1f0] rounded-xl border border-[#e5e3e1] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
              <BarChart3 className="w-4 h-4 text-[#0b8454]" />
              <span>1. Makrojämförelse (SE1–SE4)</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Jämför alla 4 elområden samtidigt i en linjegraf för att visa regionala prisskillnader via{' '}
              <span className="relative group inline-block">
                <a 
                  href="https://www.elprisetjustnu.se/elpris-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0b8454] font-bold underline underline-offset-2 hover:text-[#0f5a46] inline-flex items-center gap-0.5"
                >
                  Öppna Data API
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-52 bg-[#2c2827] text-white text-[10px] p-2 rounded-lg shadow-xl text-center pointer-events-none">
                  <span>⚡ Officiellt Öppet API för svenska spotpriser (elprisetjustnu.se)</span>
                  <span className="border-t-4 border-t-[#2c2827] border-x-4 border-x-transparent w-0 h-0 mt-0.5" />
                </span>
              </span>
              {' '}(<span className="relative group inline-block">
                <a 
                  href="https://www.w3.org/TR/WCAG21/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0b8454] font-bold underline underline-offset-2 hover:text-[#0f5a46] inline-flex items-center gap-0.5"
                >
                  WCAG 2.1 AA
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-48 bg-[#2c2827] text-white text-[10px] p-2 rounded-lg shadow-xl text-center pointer-events-none">
                  <span>🌐 Officiell W3C Tillgänglighetsstandard (DOS-lagen)</span>
                  <span className="border-t-4 border-t-[#2c2827] border-x-4 border-x-transparent w-0 h-0 mt-0.5" />
                </span>
              </span>).
            </p>
          </div>
        </div>

        {/* Pillar 2 */}
        <div className="p-3 bg-[#f2f1f0] rounded-xl border border-[#e5e3e1] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
              <Users className="w-4 h-4 text-[#0b8454]" />
              <span>2. Interaktiv Sparkalkylator</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Räknar ut faktiska <strong>kronor i besparing</strong> per laddning/tvätt för apparater (elbil, tvätt, värme) baserat på grova tidsintervall.
            </p>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="p-3 bg-[#f2f1f0] rounded-xl border border-[#e5e3e1] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
              <Bot className="w-4 h-4 text-[#0b8454]" />
              <span>3. Strategisk AI-Kundtjänst</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              AI-assistenten avlastar kundtjänst dygnet runt med <em>Human-in-the-Loop</em> och samlar in värdefull data om kundernas frågor.
            </p>
          </div>
        </div>

        {/* Pillar 4 */}
        <div className="p-3 bg-[#e7f6f0] rounded-xl border border-[#0b8454]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#0b8454] mb-1.5">
              <MapPin className="w-4 h-4 text-[#0b8454]" />
              <span>4. Elnätskarta & Timmätar-Matrix</span>
            </div>
            <p className="text-[#2c2827] leading-relaxed text-[11.5px]">
              Visualiserar <strong>Ellevios lokala nätbelastning (%)</strong> via OpenStreetMap & färgkodar 24 timmar (🟢 Natt, 🟡 Dag, 🔴 Pristopp) för nätavlastning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
