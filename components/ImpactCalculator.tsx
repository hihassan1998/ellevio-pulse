'use client';

import React, { useState } from 'react';
import { Calculator, Car, WashingMachine, Zap, Moon, Sun, Sunrise, Sunset, Clock, Sparkles } from 'lucide-react';
import { ZoneStats, IntervalPrices } from '@/lib/elpris';

export default function ImpactCalculator({ stats }: { stats: ZoneStats[] }) {
  const [selectedZone, setSelectedZone] = useState<string>('SE3');
  const [device, setDevice] = useState<'ev' | 'laundry' | 'heat'>('ev');
  const [timeSlot, setTimeSlot] = useState<'night' | 'morning' | 'afternoon' | 'evening' | 'avg'>('night');

  const currentStats = stats.find(s => s.zone === selectedZone) || stats[2] || {
    avgPrice: 45,
    intervals: { slot_00_06: 30, slot_06_12: 55, slot_12_18: 42, slot_18_24: 60 }
  };

  const getKwh = () => {
    switch (device) {
      case 'ev': return 40;
      case 'laundry': return 1.5;
      case 'heat': return 25;
    }
  };

  const getSlotPrice = (slot: string, intervals: IntervalPrices, avg: number) => {
    switch (slot) {
      case 'night': return intervals.slot_00_06 || avg;
      case 'morning': return intervals.slot_06_12 || avg;
      case 'afternoon': return intervals.slot_12_18 || avg;
      case 'evening': return intervals.slot_18_24 || avg;
      default: return avg;
    }
  };

  const currentPrice = getSlotPrice(timeSlot, currentStats.intervals, currentStats.avgPrice);
  const currentCost = Math.round((currentPrice * getKwh()) / 100);

  // Compute best (cheapest) and worst (highest) slots for recommendations
  const slots: { id: 'night' | 'morning' | 'afternoon' | 'evening'; name: string; price: number }[] = [
    { id: 'night', name: '00:00–06:00 (Natt)', price: currentStats.intervals.slot_00_06 },
    { id: 'morning', name: '06:00–12:00 (Morgon)', price: currentStats.intervals.slot_06_12 },
    { id: 'afternoon', name: '12:00–18:00 (Eftermiddag)', price: currentStats.intervals.slot_12_18 },
    { id: 'evening', name: '18:00–24:00 (Kväll)', price: currentStats.intervals.slot_18_24 }
  ].sort((a, b) => a.price - b.price);

  const cheapestSlot = slots[0];
  const peakSlot = slots[slots.length - 1];
  
  const cheapestCost = Math.round((cheapestSlot.price * getKwh()) / 100);
  const peakCost = Math.round((peakSlot.price * getKwh()) / 100);
  const savings = peakCost - cheapestCost;

  return (
    <div className="bg-[#0b8454] text-white p-6 sm:p-8 rounded-xl shadow-md mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-white/20 p-2.5 rounded-lg">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">💡 Vad kostar det för dig? (Smarta Tidsintervall)</h2>
          <p className="text-xs text-emerald-100">Planera din energianvändning efter dygnets billigaste timmar och spara pengar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mb-6">
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
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all ${device === 'ev' ? 'bg-white text-[#0b8454] border-white shadow-xs' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Car className="w-4 h-4 mb-1" />
              <span>Elbil (40kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('laundry')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all ${device === 'laundry' ? 'bg-white text-[#0b8454] border-white shadow-xs' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <WashingMachine className="w-4 h-4 mb-1" />
              <span>Tvätt (1.5kWh)</span>
            </button>
            <button 
              onClick={() => setDevice('heat')}
              className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-semibold transition-all ${device === 'heat' ? 'bg-white text-[#0b8454] border-white shadow-xs' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Zap className="w-4 h-4 mb-1" />
              <span>Värme (25kWh)</span>
            </button>
          </div>
        </div>

        {/* Step 3: Select Time Interval */}
        <div>
          <label className="block text-xs font-semibold text-emerald-100 mb-2">3. Välj tidsintervall på dygnet:</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-1.5">
            <button 
              onClick={() => setTimeSlot('night')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${timeSlot === 'night' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>00–06 (Natt)</span>
            </button>
            <button 
              onClick={() => setTimeSlot('morning')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${timeSlot === 'morning' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Sunrise className="w-3.5 h-3.5" />
              <span>06–12 (Morgon)</span>
            </button>
            <button 
              onClick={() => setTimeSlot('afternoon')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${timeSlot === 'afternoon' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>12–18 (Efterm)</span>
            </button>
            <button 
              onClick={() => setTimeSlot('evening')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${timeSlot === 'evening' ? 'bg-white text-[#0b8454] border-white' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <Sunset className="w-3.5 h-3.5" />
              <span>18–24 (Kväll)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Display & Smart Recommendation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-4 border-t border-white/20">
        <div className="bg-[#0f5a46] p-4 rounded-lg border border-white/20 text-center md:col-span-1">
          <span className="text-xs text-emerald-100 block font-medium">Estimerad kostnad i valt tidsfönster</span>
          <span className="text-3xl font-bold text-white mt-1 block">ca {currentCost} kr</span>
          <span className="text-[11px] text-emerald-200 mt-1 block">
            ({currentPrice} öre/kWh snitt i {selectedZone})
          </span>
        </div>

        {/* Smart Planning Recommendation Banner */}
        <div className="bg-white/15 p-4 rounded-lg border border-white/25 md:col-span-2 flex items-start gap-3">
          <div className="bg-white text-[#0b8454] p-2 rounded-lg shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <div className="text-xs">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              💡 Smarta Energitipset för {selectedZone}
            </h4>
            <p className="text-emerald-100 mt-1 leading-relaxed">
              Billigaste fönstret idag är <strong className="text-white underline">{cheapestSlot.name}</strong> ({cheapestSlot.price} öre/kWh).
              Om du kör {device === 'ev' ? 'elbilsladdningen' : device === 'laundry' ? 'tvätten' : 'uppvärmningen'} då kostar det ca <strong className="text-white font-bold">{cheapestCost} kr</strong> istället för <strong className="text-white font-bold">{peakCost} kr</strong> under dyraste perioden ({peakSlot.name}).
            </p>
            {savings > 0 && (
              <span className="inline-block mt-2 bg-white text-[#0b8454] font-bold px-2.5 py-1 rounded-md text-[11px]">
                🎉 Du sparar upp till {savings} kr!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
