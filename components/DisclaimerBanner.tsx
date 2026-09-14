'use client';

import React from 'react';
import { Info, ExternalLink } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-[#2c2827] text-white text-xs py-2.5 px-4 border-b border-[#0b8454]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <Info className="w-4 h-4 text-[#f5a623] shrink-0" />
          <p className="leading-normal">
            <strong className="text-[#f5a623]">Friskrivning:</strong> Detta är ett oberoende portfolio- och demonstrationsprojekt utvecklat av <strong>Hassan Hussain</strong> för att demonstrera fullstack- & AI-utveckling. Projektet har <strong>ingen officiell anknytning till eller godkännande av Ellevio AB</strong>.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold shrink-0">
          <a 
            href="https://www.ellevio.se"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#757575] hover:text-white transition-colors"
          >
            <span>Officiell webbplats (ellevio.se)</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-[#757575]">|</span>
          <a 
            href="https://www.linkedin.com/in/hassan-hussain-3b840429a/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#e7f6f0] hover:text-[#0b8454] underline underline-offset-2 transition-colors"
          >
            <span>Hassan Hussain på LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-[#0b8454]" />
          </a>
        </div>
      </div>
    </div>
  );
}
