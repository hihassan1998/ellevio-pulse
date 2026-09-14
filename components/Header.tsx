'use client';

import React from 'react';
import { Zap, ShieldCheck, Accessibility, ExternalLink } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-[#e5e3e1] shadow-xs relative z-40">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 min-h-[5rem] py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <div className="bg-[#0b8454] p-2 rounded-lg text-white">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-[#2c2827] flex items-center gap-2">
              Ellevio<span className="text-[#0b8454] font-normal">Pulse</span>
            </h1>
            <p className="text-xs text-[#757575] hidden sm:block font-normal">
              Interaktiv Eldata- & Kundinsiktsportal för Sverige (SE1–SE4)
            </p>
          </div>
        </div>

        {/* Header Action Badges with Tooltips & Links */}
        <div className="flex items-center space-x-3 text-xs sm:text-sm font-medium">
          {/* WCAG 2.1 AA Badge with Hover Tooltip */}
          <div className="relative group">
            <a 
              href="https://www.w3.org/TR/WCAG21/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#e7f6f0] text-[#0b8454] hover:bg-[#0b8454] hover:text-white px-3.5 py-1.5 rounded-full border border-[#0b8454]/20 transition-all cursor-pointer shadow-xs"
            >
              <Accessibility className="w-4 h-4 shrink-0" />
              <span className="hidden md:inline font-semibold">WCAG 2.1 AA Tillgänglig</span>
              <span className="md:hidden font-semibold">WCAG 2.1</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
            </a>
            
            {/* Tooltip Popup */}
            <div className="absolute top-full right-0 mt-2 hidden group-hover:flex flex-col items-center z-50 w-64 bg-[#2c2827] text-white text-[11px] p-2.5 rounded-xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 border border-[#0b8454]/40">
              <span className="font-bold text-[#e7f6f0] mb-0.5 flex items-center gap-1">
                🌐 WCAG 2.1 AA Tillgänglighet
              </span>
              <span className="text-gray-200 text-center leading-tight">
                Uppfyller DOS-lagen. Klicka för att öppna W3C:s officiella tillgänglighetsstandard.
              </span>
              <span className="border-b-4 border-b-[#2c2827] border-x-4 border-x-transparent w-0 h-0 absolute -top-1 right-6" />
            </div>
          </div>

          {/* Öppna Data Badge with Hover Tooltip */}
          <div className="relative group">
            <a 
              href="https://www.elprisetjustnu.se/elpris-api"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 bg-[#f2f1f0] text-[#2c2827] hover:bg-[#2c2827] hover:text-white px-3.5 py-1.5 rounded-full border border-[#e5e3e1] transition-all cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#0b8454] group-hover:text-emerald-400 shrink-0" />
              <span className="font-semibold">Öppna Data</span>
              <ExternalLink className="w-3 h-3 shrink-0 opacity-70" />
            </a>
            
            {/* Tooltip Popup */}
            <div className="absolute top-full right-0 mt-2 hidden group-hover:flex flex-col items-center z-50 w-64 bg-[#2c2827] text-white text-[11px] p-2.5 rounded-xl shadow-2xl pointer-events-none animate-in fade-in zoom-in-95 duration-150 border border-[#f5a623]/40">
              <span className="font-bold text-[#f5a623] mb-0.5 flex items-center gap-1">
                ⚡ Gratis Öppet API (elprisetjustnu.se)
              </span>
              <span className="text-gray-200 text-center leading-tight">
                Live spotpriser SE1–SE4 utan API-nycklar. Klicka för API-dokumentation.
              </span>
              <span className="border-b-4 border-b-[#2c2827] border-x-4 border-x-transparent w-0 h-0 absolute -top-1 right-6" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
