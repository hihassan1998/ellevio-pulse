'use client';

import React from 'react';
import { Zap, ShieldCheck, Accessibility } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-[#005A9C] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-white p-2 rounded-lg text-[#005A9C]">
            <Zap className="w-6 h-6 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
              Ellevio<span className="text-emerald-400 font-light">Pulse</span>
            </h1>
            <p className="text-xs text-blue-100 hidden sm:block">
              Interaktiv Eldata- & Kundinsiktsportal för Sverige (SE1–SE4)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-xs sm:text-sm font-medium">
          <span className="flex items-center space-x-1 bg-blue-900/60 px-3 py-1.5 rounded-full border border-blue-400/30">
            <Accessibility className="w-4 h-4 text-emerald-400" />
            <span className="hidden md:inline">WCAG 2.1 AA Tillgänglig</span>
          </span>
          <span className="flex items-center space-x-1 bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4" />
            <span>Öppna Data</span>
          </span>
        </div>
      </div>
    </header>
  );
}
