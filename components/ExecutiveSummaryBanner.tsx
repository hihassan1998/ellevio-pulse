'use client';

import React from 'react';
import { Sparkles, BarChart3, Users, Bot } from 'lucide-react';

export default function ExecutiveSummaryBanner() {
  return (
    <div className="card-ellevio border-l-4 border-l-[#0b8454] mb-8 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-[#e7f6f0] text-[#0b8454] text-xs font-bold px-3 py-1 rounded-full border border-[#0b8454]/20 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Till Ellevios Rekryteringsteam – Strategisk Webb- & UX-Analys</span>
        </span>
      </div>

      <h2 className="text-xl font-bold text-[#2c2827] tracking-tight mb-2">
        Demoprojektets Mervärde & Demonstrerbara Kompetenser för Webbansvarig
      </h2>
      <p className="text-xs text-[#757575] leading-relaxed mb-4">
        Detta demoprojekt är utvecklat av <strong>Hassan Hussain</strong> för att demonstrera hur strategisk webbhantering, användarcentrerad innehållsdesign och modern AI-teknik samverkar för att skapa mätbart kund- och affärsvärde på <strong>ellevio.se</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-3 border-t border-[#e5e3e1]">
        {/* Pillar 1 */}
        <div className="p-3.5 bg-[#f2f1f0] rounded-lg border border-[#e5e3e1]">
          <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
            <BarChart3 className="w-4 h-4 text-[#0b8454]" />
            <span>Datavisualisering för alla</span>
          </div>
          <p className="text-[#757575] leading-relaxed">
            Omvandlar komplexa elmarknadsdata (SE1–SE4) till pedagogiska, interaktiva och tillgänglighetsanpassade (WCAG 2.1 AA) grafer så att icke-tekniska kunder enkelt förstår sin energianvändning.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-3.5 bg-[#f2f1f0] rounded-lg border border-[#e5e3e1]">
          <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
            <Users className="w-4 h-4 text-[#0b8454]" />
            <span>Användarcentrerad Innehållsstrategi</span>
          </div>
          <p className="text-[#757575] leading-relaxed">
            Funktioner som <em>Smarta Tidsintervall</em> visar hur kunden kan planera sin förbrukning för att spara pengar och avlasta elnätet – en direkt koppling till Ellevios elektrifieringsuppdrag.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-3.5 bg-[#f2f1f0] rounded-lg border border-[#e5e3e1]">
          <div className="flex items-center gap-2 font-bold text-[#2c2827] mb-1.5">
            <Bot className="w-4 h-4 text-[#0b8454]" />
            <span>Strategisk AI & Kundinsikt</span>
          </div>
          <p className="text-[#757575] leading-relaxed">
            AI-assistenten avlastar kundtjänst dygnet runt med <em>Human-in-the-Loop</em>. Samtidigt samlas värdefull data in om kundernas val mellan AI och mänsklig kontakt som beslutsunderlag för framtida webbstrategier.
          </p>
        </div>
      </div>
    </div>
  );
}
