'use client';

import React from 'react';
import { Zap, ShieldCheck, Accessibility } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b border-[#e5e3e1] shadow-xs">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
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

        <div className="flex items-center space-x-3 text-xs sm:text-sm font-medium">
          <span className="flex items-center space-x-1.5 bg-[#e7f6f0] text-[#0b8454] px-3.5 py-1.5 rounded-full border border-[#0b8454]/20">
            <Accessibility className="w-4 h-4 text-[#0b8454]" />
            <span className="hidden md:inline font-semibold">WCAG 2.1 AA Tillgänglig</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-[#f2f1f0] text-[#2c2827] px-3.5 py-1.5 rounded-full border border-[#e5e3e1]">
            <ShieldCheck className="w-4 h-4 text-[#0b8454]" />
            <span className="font-semibold">Öppna Data</span>
          </span>
        </div>
      </div>
    </header>
  );
}
