'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { HourlyPrice, ZoneStats } from '@/lib/elpris';
import { REGIONS_DATA } from './gridData';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, ReferenceLine, Cell, CartesianGrid } from 'recharts';
import { MapPin, Zap, AlertCircle, Sparkles, TrendingDown, Clock, ShieldCheck, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

// Dynamic import for Leaflet Grid Map to avoid SSR window evaluation
const LeafletGridMap = dynamic(() => import('./LeafletGridMap'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#e5e3e1] shadow-xs flex flex-col h-full items-center justify-center min-h-[380px]">
      <div className="animate-pulse flex flex-col items-center gap-3 text-[#757575]">
        <div className="w-8 h-8 rounded-full bg-[#0b8454]/20 border-2 border-[#0b8454] border-t-transparent animate-spin" />
        <span className="text-xs font-semibold">Laddar Sverigekarta med länder & elområdespolygoner (OpenStreetMap)...</span>
      </div>
    </div>
  )
});

interface GridMapPriceForecastProps {
  stats: ZoneStats[];
  hourly: HourlyPrice[];
}

// Custom High-Contrast Tooltip for Recharts Timmätar-Matrix
const CustomMatrixTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#2c2827] text-white p-3.5 rounded-xl border border-white/20 shadow-2xl text-xs space-y-2 pointer-events-none min-w-[210px] z-50">
        <div className="flex items-center justify-between border-b border-white/15 pb-2">
          <span className="font-bold text-white flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#f5a623]" />
            <span>Kl {data.time}:00</span>
          </span>
          <span 
            className="px-2.5 py-0.5 rounded-full text-[10.5px] font-extrabold text-white shadow-xs"
            style={{ backgroundColor: data.color }}
          >
            {data.label}
          </span>
        </div>
        
        <div className="flex items-baseline justify-between pt-0.5">
          <span className="text-gray-300 text-[11.5px]">Spotpris:</span>
          <span className="text-base font-extrabold text-white">
            {data.price} <span className="text-xs font-normal text-gray-300">öre/kWh</span>
          </span>
        </div>

        <div className="text-[11px] leading-snug text-gray-200 pt-1 border-t border-white/10">
          {data.category === 'cheap_night' && (
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              🟢 Billigaste nattladdning (00–06)
            </span>
          )}
          {data.category === 'peak_load' && (
            <span className="text-rose-400 font-semibold flex items-center gap-1">
              🔴 Hög belastning & pristopp
            </span>
          )}
          {data.category === 'normal_day' && (
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              🟡 Normal dagstariff
            </span>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function GridMapPriceForecast({ stats, hourly }: GridMapPriceForecastProps) {
  const [selectedZone, setSelectedZone] = useState<'SE1' | 'SE2' | 'SE3' | 'SE4'>('SE3');
  const [selectedCity, setSelectedCity] = useState<string>('Stockholm');
  const [selectedHourIndex, setSelectedHourIndex] = useState<number>(new Date().getHours());

  // Handle region/city selection
  const handleSelectRegion = (zone: 'SE1' | 'SE2' | 'SE3' | 'SE4', city: string) => {
    setSelectedZone(zone);
    setSelectedCity(city);
  };

  // Extract selected zone stats
  const activeZoneStats = stats.find(s => s.zone === selectedZone) || stats[2]; // Default SE3

  // Current region data
  const currentRegion = REGIONS_DATA.find(r => r.city === selectedCity) || REGIONS_DATA[2];

  // Map 24h hourly data into an actionable Demand-Response Hourly Heatmap Matrix
  const hourlyMatrixData = hourly.map((item, index) => {
    const price = item[selectedZone] || 0;
    
    // Categorize hours into 3 load windows
    let category: 'cheap_night' | 'normal_day' | 'peak_load' = 'normal_day';
    let color = '#f5a623'; // Amber default
    let label = 'Normalpris';

    if (index >= 0 && index < 6) {
      category = 'cheap_night';
      color = '#0b8454'; // Ellevio green for best night charging
      label = 'Billigast Natt';
    } else if (price > activeZoneStats.avgPrice * 1.15 || (index >= 7 && index <= 9) || (index >= 17 && index <= 19)) {
      category = 'peak_load';
      color = '#ce1f36'; // Red warning for peak load
      label = 'Pristopp';
    }

    return {
      hourIndex: index,
      time: item.time,
      price,
      category,
      color,
      label,
      avg: activeZoneStats.avgPrice
    };
  });

  // Selected hour details
  const activeHourObj = hourlyMatrixData[selectedHourIndex] || hourlyMatrixData[0];
  const isHighPrice = activeHourObj.price > 80;

  // Calculate potential savings when shifting load from peak to cheap night (00-06)
  const peakPrice = activeZoneStats.maxPrice;
  const nightPrice = activeZoneStats.intervals.slot_00_06 || activeZoneStats.minPrice;
  const evSavingsPerCharge = Math.max(0, Math.round((peakPrice - nightPrice) * 0.40)); // 40 kWh EV charge

  // Live zone prices dictionary for map markers
  const zonePricesMap: Record<string, number> = {
    SE1: stats.find(s => s.zone === 'SE1')?.avgPrice || 0,
    SE2: stats.find(s => s.zone === 'SE2')?.avgPrice || 0,
    SE3: stats.find(s => s.zone === 'SE3')?.avgPrice || 0,
    SE4: stats.find(s => s.zone === 'SE4')?.avgPrice || 0,
  };

  return (
    <div className="card-ellevio mb-8 space-y-6">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#e5e3e1] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="bg-[#e7f6f0] text-[#0b8454] text-xs font-bold px-3 py-1 rounded-full border border-[#0b8454]/20 inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Timmätar-Matrix</span>
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2c2827] tracking-tight flex items-center gap-2">
            <span>📍 Lokalt Elnät & 24h Timmätar-Matrix (SE1–SE4)</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#757575] mt-1">
            Klicka på kortsidan eller timstaplarna för att planera elförbrukningen timme för timme och undvika dyra pristoppar.
          </p>
        </div>

        {/* Selected Grid Interactive Elområden Selector Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-[#f8f7f6] p-2 rounded-xl border border-[#e5e3e1] shrink-0">
          <span className="text-xs font-bold text-[#2c2827] px-2 flex items-center gap-1 shrink-0">
            <MapPin className="w-3.5 h-3.5 text-[#0b8454]" />
            <span>Elområde:</span>
          </span>

          <div className="flex items-center gap-1.5 flex-wrap">
            {(['SE1', 'SE2', 'SE3', 'SE4'] as const).map(zone => {
              const cityName = zone === 'SE1' ? 'Luleå' : zone === 'SE2' ? 'Sundsvall' : zone === 'SE3' ? 'Stockholm' : 'Malmö';
              const isActive = selectedZone === zone;
              
              let activeClasses = '';
              let inactiveClasses = '';

              switch (zone) {
                case 'SE1':
                  activeClasses = 'bg-[#0b8454] text-white shadow-xs ring-2 ring-[#0b8454]/30';
                  inactiveClasses = 'bg-[#e7f6f0] text-[#0b8454] border border-[#0b8454]/30 hover:bg-[#d0efe3]';
                  break;
                case 'SE2':
                  activeClasses = 'bg-[#3b82f6] text-white shadow-xs ring-2 ring-[#3b82f6]/30';
                  inactiveClasses = 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100';
                  break;
                case 'SE3':
                  activeClasses = 'bg-[#f5a623] text-white shadow-xs ring-2 ring-[#f5a623]/30';
                  inactiveClasses = 'bg-[#fef3e6] text-[#d97706] border border-[#f5a623]/30 hover:bg-[#fde7ce]';
                  break;
                case 'SE4':
                  activeClasses = 'bg-[#ce1f36] text-white shadow-xs ring-2 ring-[#ce1f36]/30';
                  inactiveClasses = 'bg-[#f2e5e7] text-[#ce1f36] border border-[#ce1f36]/30 hover:bg-[#ebd5d8]';
                  break;
              }

              return (
                <button
                  key={zone}
                  onClick={() => handleSelectRegion(zone, cityName)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                    isActive ? activeClasses : inactiveClasses
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-current'}`} />
                  <span>{zone} ({cityName})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Smart Threshold Alert Banner */}
      {isHighPrice && (
        <div className="bg-[#2c2827] text-white p-4 rounded-xl border-l-4 border-l-[#f5a623] shadow-md flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#f5a623] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs leading-relaxed">
            <h4 className="font-bold text-sm text-[#f5a623] mb-0.5 flex items-center gap-2">
              <span>Pristopp just nu i {selectedZone} ({selectedCity}): {activeHourObj.price} öre/kWh</span>
            </h4>
            <p className="text-gray-200">
              Timpriset är för närvarande högt. Om du kan, planera om elbilsladdning, tvätt och disk till nattetid (kl 00:00–06:00) då spotpriset är som lägst ({nightPrice} öre/kWh).
            </p>
          </div>
          {evSavingsPerCharge > 0 && (
            <div className="hidden lg:flex flex-col items-end justify-center bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 shrink-0 text-right">
              <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">Planerad besparing</span>
              <span className="text-sm font-extrabold text-[#f5a623]">Spara ~{evSavingsPerCharge} kr</span>
            </div>
          )}
        </div>
      )}

      {/* 2-Column Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Leaflet OpenStreetMap Grid Map (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <LeafletGridMap 
            selectedZone={selectedZone}
            selectedCity={selectedCity}
            onSelectRegion={handleSelectRegion}
            zonePrices={zonePricesMap}
          />

          {/* Region Status Detail Card */}
          <div className="bg-[#f8f7f6] p-4 rounded-xl border border-[#e5e3e1] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#e7f6f0] text-[#0b8454] rounded-lg">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#2c2827] block">{currentRegion.regionName} ({currentRegion.countyName})</span>
                <span className="text-[#757575] text-[11px]">Transformatorkapacitet: {currentRegion.capacityPct}% utnyttjad</span>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full font-bold text-[11px] border ${currentRegion.gridStatus === 'normal' ? 'bg-emerald-50 text-[#0b8454] border-emerald-200' : currentRegion.gridStatus === 'elevated' ? 'bg-[#fef3e6] text-[#f5a623] border-[#f5a623]/30' : 'bg-[#f2e5e7] text-[#ce1f36] border-[#ce1f36]/30'}`}>
              {currentRegion.gridStatus === 'normal' ? 'Normal Nätload' : currentRegion.gridStatus === 'elevated' ? 'Förhöjd Load' : 'Hög Load'}
            </span>
          </div>
        </div>

        {/* Right Column: Unique 24h Hourly Load & Savings Bar Matrix (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-[#e5e3e1] shadow-xs flex flex-col justify-between space-y-4">
          
          {/* Matrix Header & Legend */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5e3e1] pb-3">
            <div>
              <h3 className="font-bold text-base text-[#2c2827] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#0b8454]" />
                <span>24h Timmätar-Matrix – {selectedZone} ({selectedCity})</span>
              </h3>
              <p className="text-xs text-[#757575]">
                Färgkodad förbrukningsstyrning: Grönt = Billigast | Gult = Normalt | Rött = Pristopp
              </p>
            </div>

            {/* Matrix Color Legend */}
            <div className="flex items-center gap-2.5 text-[11px] font-semibold">
              <span className="flex items-center gap-1 text-[#0b8454]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0b8454]" /> Natt
              </span>
              <span className="flex items-center gap-1 text-[#f5a623]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623]" /> Dag
              </span>
              <span className="flex items-center gap-1 text-[#ce1f36]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ce1f36]" /> Topp
              </span>
            </div>
          </div>

          {/* Interactive Recharts 24-Bar Load Matrix */}
          <div className="w-full h-[220px] pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={hourlyMatrixData} 
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                onClick={(e) => {
                  if (e && e.activeTooltipIndex !== undefined) {
                    setSelectedHourIndex(e.activeTooltipIndex);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e3e1" />
                <XAxis dataKey="time" stroke="#757575" fontSize={10} tickLine={false} />
                <YAxis unit=" öre" stroke="#757575" fontSize={11} tickLine={false} axisLine={false} />
                
                {/* Clean Readable High-Contrast Custom Tooltip */}
                <Tooltip 
                  content={<CustomMatrixTooltip />} 
                  cursor={{ fill: 'rgba(44, 40, 39, 0.05)' }} 
                />

                <ReferenceLine y={activeZoneStats.avgPrice} stroke="#757575" strokeDasharray="3 3" label={{ value: 'Snitt', fill: '#757575', fontSize: 10 }} />
                <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                  {hourlyMatrixData.map((entry, idx) => (
                    <Cell 
                      key={`cell-${idx}`} 
                      fill={entry.color} 
                      opacity={selectedHourIndex === idx ? 1 : 0.75}
                      stroke={selectedHourIndex === idx ? '#2c2827' : undefined}
                      strokeWidth={selectedHourIndex === idx ? 2 : 0}
                      className="cursor-pointer transition-all hover:opacity-100"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Selected Hour Action Inspector Card */}
          <div className="p-3.5 rounded-xl bg-[#f8f7f6] border border-[#e5e3e1] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg text-white font-bold text-xs ${activeHourObj.category === 'cheap_night' ? 'bg-[#0b8454]' : activeHourObj.category === 'peak_load' ? 'bg-[#ce1f36]' : 'bg-[#f5a623]'}`}>
                {activeHourObj.time}
              </div>
              <div>
                <span className="font-bold text-[#2c2827] block">
                  Vald Timme kl {activeHourObj.time}: {activeHourObj.price} öre/kWh ({activeHourObj.label})
                </span>
                <span className="text-[#757575] text-[11.5px] leading-normal block">
                  {activeHourObj.category === 'cheap_night' ? (
                    <strong className="text-[#0b8454]">✅ Perfekt laddfönster för elbil & tvättmaskin!</strong>
                  ) : activeHourObj.category === 'peak_load' ? (
                    <strong className="text-[#ce1f36]">⚠️ Pristopp i elnätet – undvik tung förbrukning.</strong>
                  ) : (
                    <span>Normal dagstariff – laddning rekommenderas nattetid.</span>
                  )}
                </span>
              </div>
            </div>

            {/* Quick Action Button */}
            <div className="shrink-0">
              <span className="text-[11px] font-bold text-[#0b8454] bg-[#e7f6f0] px-3 py-1.5 rounded-lg border border-[#0b8454]/20 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Nattpris: {activeZoneStats.intervals.slot_00_06} öre</span>
              </span>
            </div>
          </div>

          {/* Smart Actionable Recommendation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#e5e3e1] text-xs">
            
            {/* Advice Box 1 */}
            <div className="p-3 rounded-xl bg-white border border-[#e5e3e1] flex items-start gap-2.5">
              <TrendingDown className="w-4 h-4 text-[#0b8454] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2c2827] font-bold block mb-0.5">Bästa Nattladdning:</strong>
                <span className="text-[#757575] leading-normal block">
                  Kl 00:00–06:00 är snittpriset <strong>{activeZoneStats.intervals.slot_00_06} öre/kWh</strong>.
                </span>
              </div>
            </div>

            {/* Advice Box 2 */}
            <div className="p-3 rounded-xl bg-white border border-[#e5e3e1] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#f5a623] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#2c2827] font-bold block mb-0.5">Sparkalkyl för {selectedCity}:</strong>
                <span className="text-[#757575] leading-normal block">
                  Spara upp till <strong>~{evSavingsPerCharge} kr/laddning</strong> genom att undvika pristoppar.
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
