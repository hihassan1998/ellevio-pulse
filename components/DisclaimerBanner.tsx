'use client';

import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-[#2c2827] text-white text-xs py-2.5 px-4 border-b border-[#0b8454] max-w-full overflow-x-hidden">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 flex-wrap break-words [overflow-wrap:anywhere]">
        <div className="flex items-center gap-2 flex-1 min-w-[260px] break-words">
          <Info className="w-4 h-4 text-[#f5a623] shrink-0" />
          <p className="leading-normal break-words">
            <strong className="text-[#f5a623]">Friskrivning:</strong> Detta är ett oberoende portfolio- och demonstrationsprojekt utvecklat av <strong>Hassan Hussain</strong> för att demonstrera fullstack- & AI-utveckling. Projektet har <strong>ingen officiell anknytning till eller godkännande av Ellevio AB</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold flex-wrap shrink-0 break-words">
          <a 
            href="https://www.ellevio.se"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#f5a623] hover:text-amber-300 font-bold underline underline-offset-2 transition-colors break-all"
          >
            <span>Officiell webbplats (ellevio.se)</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#f5a623] shrink-0" />
          </a>
          <span className="text-[#757575] hidden sm:inline">|</span>
          <a 
            href="https://www.linkedin.com/in/hassan-hussain-3b840429a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#e7f6f0] hover:text-[#0b8454] underline underline-offset-2 transition-colors break-all"
          >
            <span>Hassan Hussain på LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[#0b8454] shrink-0" />
          </a>
        </div>
      </div>
    </div>
  );
}
