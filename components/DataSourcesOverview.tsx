'use client';

import React from 'react';
import { Database, ExternalLink, Globe, ShieldCheck, Cpu, Zap } from 'lucide-react';

export default function DataSourcesOverview() {
  return (
    <div className="card-ellevio mb-8 space-y-6">
      {/* Header */}
      <div className="border-b border-[#e5e3e1] pb-4">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="bg-[#e7f6f0] text-[#0b8454] text-xs font-bold px-3 py-1 rounded-full border border-[#0b8454]/20 inline-flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5" />
            <span>📡 Öppen Data & Dataarkitektur</span>
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#2c2827] tracking-tight flex items-center gap-2">
          <span>Datakällor & Dataanvändning i EllevioPulse</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#757575] mt-1">
          En transparent sammanställning av alla öppna API:er, karttjänster, nätinfrastrukturdata och AI-modeller som driver applikationen.
        </p>
      </div>

      {/* 4 Data Source Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* Source 1: Elpris API */}
        <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#e5e3e1] hover:border-[#0b8454]/40 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] text-sm mb-1.5">
              <div className="p-1.5 bg-[#e7f6f0] text-[#0b8454] rounded-lg">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span>1. Spotprisdata (SE1–SE4)</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Hämtar 24-timmars spotpriser i öre/kWh inkl. moms för alla Sveriges elområden via{' '}
              <span className="relative group inline-block">
                <a 
                  href="https://www.elprisetjustnu.se/elpris-api" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#0b8454] font-bold underline underline-offset-2 hover:text-[#0f5a46] inline-flex items-center gap-0.5"
                >
                  elprisetjustnu.se API
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-52 bg-[#2c2827] text-white text-[10px] p-2 rounded-lg shadow-xl text-center pointer-events-none">
                  <span>⚡ Officiellt Öppet API för svenska spotpriser från Nord Pool</span>
                  <span className="border-t-4 border-t-[#2c2827] border-x-4 border-x-transparent w-0 h-0 mt-0.5" />
                </span>
              </span>.
            </p>
          </div>
          <div className="pt-2.5 border-t border-[#e5e3e1] text-[10.5px] text-[#0b8454] font-semibold flex items-center justify-between">
            <span>Uppdatering: Dagligen kl 13:00</span>
            <span className="px-2 py-0.5 bg-[#e7f6f0] rounded-md border border-[#0b8454]/20 font-mono text-[10px]">REST JSON</span>
          </div>
        </div>

        {/* Source 2: OpenStreetMap Tiles */}
        <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#e5e3e1] hover:border-blue-300 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] text-sm mb-1.5">
              <div className="p-1.5 bg-blue-50 text-blue-700 rounded-lg">
                <Globe className="w-4 h-4" />
              </div>
              <span>2. Geografisk Kartdata</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Kartflisor (tiles) och länsgränser från <strong>OpenStreetMap</strong> via Leaflet. Visualiserar exakta elområdespolygoner för SE1, SE2, SE3 och SE4 samt nyckelstäder.
            </p>
          </div>
          <div className="pt-2.5 border-t border-[#e5e3e1] text-[10.5px] text-blue-700 font-semibold flex items-center justify-between">
            <span>Källa: OpenStreetMap Contrib</span>
            <span className="px-2 py-0.5 bg-blue-50 rounded-md border border-blue-200 font-mono text-[10px]">Vector Tiles</span>
          </div>
        </div>

        {/* Source 3: Ellevio Grid Capacity */}
        <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#e5e3e1] hover:border-[#f5a623]/50 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] text-sm mb-1.5">
              <div className="p-1.5 bg-[#fef3e6] text-[#d97706] rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>3. Lokal Nätkapacitet</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Transformatorkapacitetsutnyttjande (%) och belastningsstatus (🟢 Normal, 🟡 Förhöjd, 🔴 Hög) kopplat till Ellevios elnätsområden i Stockholm, Karlstad, Luleå m.fl.
            </p>
          </div>
          <div className="pt-2.5 border-t border-[#e5e3e1] text-[10.5px] text-[#d97706] font-semibold flex items-center justify-between">
            <span>Status: Realitetsnära Demodata</span>
            <span className="px-2 py-0.5 bg-[#fef3e6] rounded-md border border-[#f5a623]/30 font-mono text-[10px]">Telemetry</span>
          </div>
        </div>

        {/* Source 4: OpenAI & AI SDK */}
        <div className="p-4 rounded-xl bg-[#f8f7f6] border border-[#e5e3e1] hover:border-[#ce1f36]/30 transition-all flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-2 font-bold text-[#2c2827] text-sm mb-1.5">
              <div className="p-1.5 bg-[#f2e5e7] text-[#ce1f36] rounded-lg">
                <Cpu className="w-4 h-4" />
              </div>
              <span>4. AI-Språkmodell (LLM)</span>
            </div>
            <p className="text-[#757575] leading-relaxed text-[11.5px]">
              Drivs av <strong>OpenAI GPT-4o-mini</strong> via Vercel AI SDK (<code className="text-[10.5px] bg-gray-200 px-1 py-0.5 rounded text-gray-800">@ai-sdk/openai</code>). Besvarar kundfrågor om elområden, avgifter och strömavbrott med Human-in-the-Loop.
            </p>
          </div>
          <div className="pt-2.5 border-t border-[#e5e3e1] text-[10.5px] text-[#ce1f36] font-semibold flex items-center justify-between">
            <span>Modell: GPT-4o-mini</span>
            <span className="px-2 py-0.5 bg-[#f2e5e7] rounded-md border border-[#ce1f36]/20 font-mono text-[10px]">Streamed SSE</span>
          </div>
        </div>

      </div>
    </div>
  );
}
