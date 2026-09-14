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
      case 'ev': return Math.round((currentStats.avgPrice * 40) / 100); // 40 kWh EV charge
      case 'laundry': return Math.round((currentStats.avgPrice * 1.5) / 100); // 1.5 kWh laundry wash
      case 'heat': return Math.round((currentStats.avgPrice * 25) / 100); // 25 kWh daily heating
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#005A9C] to-[#003A66] text-white p-6 sm:p-8 rounded-2xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/10 p-2.5 rounded-xl">
          <Calculator className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-xl font-bold">💡 Vad kostar det för dig?</h2>
          <p className="text-xs text-blue-200">Räkna ut estimerad kostnad baserat på dagens snittpris i ditt elområde</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Step 1: Select Zone */}
        <div>
          <label className="block text-xs font-semibold text-blue-200 mb-2">1. Välj ditt elområde:</label>
          <select 
            value={selectedZone} 
            onChange={(e) => setSelectedZone(e.target.value)}
            className="w-full bg-white/10 border border-white/20 text-white rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="SE1" className="text-gray-900">SE1 – Luleå / Norrbotten</option>
            <option value="SE2" className="text-gray-900">SE2 – Sundsvall / Norrland</option>
            <option value="SE3" className="text-gray-900">SE3 – Stockholm / Mellansverige</option>
            <option value="SE4" className="text-gray-900">SE4 – Malmö / Södra Sverige</option>
          </select>
        </div>

        {/* Step 2: Select Appliance */}
        <div>
          <label className="block text-xs font-semibold text-blue-200 mb-2">2. Välj apparat/aktivitet:</label>
          <div className="grid grid-cols-3 gap-2">
            <button 
              onClick={() => setDevice('ev')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${device === 'ev' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/5 border-white/10 text-blue-100 hover:bg-white/10'}`}
            >
              <Car className="w-5 h-5 mb-1" />
              <span>Elbil (40kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('laundry')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${device === 'laundry' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/5 border-white/10 text-blue-100 hover:bg-white/10'}`}
            >
              <WashingMachine className="w-5 h-5 mb-1" />
              <span>Tvätt (1.5kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('heat')}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${device === 'heat' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-white/5 border-white/10 text-blue-100 hover:bg-white/10'}`}
            >
              <Zap className="w-5 h-5 mb-1" />
              <span>Uppvärmning</span>
            </button>
          </div>
        </div>

        {/* Result */}
        <div className="bg-white/10 p-4 rounded-xl border border-white/15 text-center">
          <span className="text-xs text-blue-200 block font-medium">Estimerad spotpriskostnad</span>
          <span className="text-3xl font-black text-emerald-400 mt-1 block">ca {getDeviceCost()} kr</span>
          <span className="text-[11px] text-blue-200 mt-1 block">baserat på {currentStats.avgPrice} öre/kWh i {selectedZone}</span>
        </div>
      </div>
    </div>
  );
}
