'use client';

import React, { useState } from 'react';
import { Calculator, Car, WashingMachine, Zap } from 'lucide-react';
import { ZoneStats } from '@/lib/elpris';

export default function ImpactCalculator({ stats }: { stats: ZoneStats[] }) {
  const [selectedZone, setSelectedZone] = useState<string>('SE3');
  const [device, setDevice] = useState<'ev' | 'laundry' | 'heat'>('ev');

  const currentStats = stats.find(s => s.zone === selectedZone) || stats[2] || { avgPrice: 45 };

  const getDeviceCost = () => {
    switch (device) {
      case 'ev': return Math.round((currentStats.avgPrice * 40) / 100);
      case 'laundry': return Math.round((currentStats.avgPrice * 1.5) / 100);
      case 'heat': return Math.round((currentStats.avgPrice * 25) / 100);
    }
  };

  return (
    <div className="bg-[#0b8454] text-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/20 p-2.5 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">💡 Vad kostar det för dig?</h2>
          <p className="text-xs text-emerald-100">Räkna ut estimerad kostnad baserat på dagens snittpris i ditt elområde</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Step 1: Select Zone */}
        <div>
          <label className="block text-xs font-semibold text-emerald-100 mb-2">1. Välj ditt elområde:</label>
          <select 
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full bg-white text-[#2c2827] rounded-lg px-3.5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          >
            <option value="SE1">SE1 – Luleå / Norrbotten</option>
            <option value="SE2">SE2 – Sundsvall / Norrland</option>
            <option value="SE3">SE3 – Stockholm / Mellansverige</option>
            <option value="SE4">SE4 – Malmö / Södra Sverige</option>
          </select>
        </div>

        {/* Step 2: Select Appliance */}
        <div>
          <label className="block text-xs font-semibold text-emerald-100 mb-2">2. Välj apparat/aktivitet:</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setDevice('ev')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all ${device === 'ev' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Car className="w-5 h-5 mb-1" />
              <span>Elbil (40kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('laundry')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all ${device === 'laundry' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <WashingMachine className="w-5 h-5 mb-1" />
              <span>Tvätt (1.5kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('heat')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-lg border text-xs font-semibold transition-all ${device === 'heat' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Zap className="w-5 h-5 mb-1" />
              <span>Uppvärmning</span>
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-[#0f5a46] p-4 rounded-lg border border-white/20 text-center">
          <span className="text-xs text-emerald-100 block font-medium">Estimerad spotpriskostnad</span>
          <span className="text-3xl font-bold text-white mt-1 block">ca {getDeviceCost()} kr</span>
          <span className="text-[11px] text-emerald-200 mt-1 block">baserat på {currentStats.avgPrice} öre/kWh i {selectedZone}</span>
        </div>
      </div>
    </div>
  );
}
