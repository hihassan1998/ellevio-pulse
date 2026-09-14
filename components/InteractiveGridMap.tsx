'use client';

import React from 'react';
import { MapPin, Zap, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export interface GridRegion {
  id: string;
  zone: 'SE1' | 'SE2' | 'SE3' | 'SE4';
  city: string;
  regionName: string;
  countyName: string;
  gridStatus: 'normal' | 'elevated' | 'high';
  capacityPct: number;
  lat: number;
  lng: number;
  xPct: number; // For SVG map overlay coordinates (0-100%)
  yPct: number;
}

interface InteractiveGridMapProps {
  selectedZone: string;
  selectedCity: string;
  onSelectRegion: (zone: 'SE1' | 'SE2' | 'SE3' | 'SE4', city: string) => void;
  zonePrices: Record<string, number>;
}

export const REGIONS_DATA: GridRegion[] = [
  {
    id: 'lulea',
    zone: 'SE1',
    city: 'Luleå',
    regionName: 'SE1 Norrbotten',
    countyName: 'Norrbottens län',
    gridStatus: 'normal',
    capacityPct: 48,
    lat: 65.5848,
    lng: 22.1567,
    xPct: 66,
    yPct: 18
  },
  {
    id: 'sundsvall',
    zone: 'SE2',
    city: 'Sundsvall',
    regionName: 'SE2 Västernorrland',
    countyName: 'Västernorrlands län',
    gridStatus: 'normal',
    capacityPct: 54,
    lat: 62.3908,
    lng: 17.3069,
    xPct: 54,
    yPct: 38
  },
  {
    id: 'stockholm',
    zone: 'SE3',
    city: 'Stockholm',
    regionName: 'SE3 Stockholms elnät (Ellevio kärnområde)',
    countyName: 'Stockholms län',
    gridStatus: 'elevated',
    capacityPct: 78,
    lat: 59.3293,
    lng: 18.0686,
    xPct: 62,
    yPct: 64
  },
  {
    id: 'karlstad',
    zone: 'SE3',
    city: 'Karlstad',
    regionName: 'SE3 Värmlands elnät (Ellevio kärnområde)',
    countyName: 'Värmlands län',
    gridStatus: 'normal',
    capacityPct: 62,
    lat: 59.3793,
    lng: 13.5036,
    xPct: 36,
    yPct: 62
  },
  {
    id: 'malmo',
    zone: 'SE4',
    city: 'Malmö',
    regionName: 'SE4 Skåne & Södra Sverige',
    countyName: 'Skåne län',
    gridStatus: 'high',
    capacityPct: 88,
    lat: 55.6050,
    lng: 13.0038,
    xPct: 32,
    yPct: 88
  }
];

export default function InteractiveGridMap({
  selectedZone,
  selectedCity,
  onSelectRegion,
  zonePrices
}: InteractiveGridMapProps) {
  
  const getStatusBadge = (status: 'normal' | 'elevated' | 'high') => {
    switch (status) {
      case 'normal':
        return {
          bg: 'bg-emerald-50 text-[#0b8454] border-emerald-200',
          dot: 'bg-[#0b8454]',
          label: 'Normal Belastning',
          icon: <CheckCircle2 className="w-3 h-3 text-[#0b8454]" />
        };
      case 'elevated':
        return {
          bg: 'bg-[#fef3e6] text-[#f5a623] border-[#f5a623]/30',
          dot: 'bg-[#f5a623]',
          label: 'Förhöjd Belastning',
          icon: <AlertTriangle className="w-3 h-3 text-[#f5a623]" />
        };
      case 'high':
        return {
          bg: 'bg-[#f2e5e7] text-[#ce1f36] border-[#ce1f36]/30',
          dot: 'bg-[#ce1f36]',
          label: 'Hög Belastning',
          icon: <Zap className="w-3 h-3 text-[#ce1f36]" />
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e3e1] shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#e7f6f0] text-[#0b8454] rounded-lg">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#2c2827]">Sveriges Elområden & Länsgränser</h3>
            <p className="text-[11px] text-[#757575]">SE1–SE4 med Ellevios nätområden & länsgränser</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#0b8454] bg-[#e7f6f0] px-2.5 py-1 rounded-full border border-[#0b8454]/20 hidden sm:inline-flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Läns- & Nätstatus</span>
        </span>
      </div>

      {/* Map Container */}
      <div className="relative w-full h-[340px] sm:h-[380px] bg-[#f8f7f6] rounded-xl border border-[#e5e3e1] overflow-hidden flex items-center justify-center p-2">
        
        {/* Realistic Swedish Geographical Map with County Boundaries */}
        <svg 
          viewBox="0 0 320 540" 
          className="w-full h-full max-h-[360px] opacity-90 select-none" 
          aria-hidden="true"
        >
          <defs>
            <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.08" />
            </filter>
          </defs>

          {/* SE1 (Norrbotten / Lappland) */}
          <path 
            d="M 180 30 L 260 80 L 250 140 L 150 150 L 120 100 Z" 
            fill={selectedZone === 'SE1' ? '#c6ebd9' : '#e7f6f0'} 
            stroke="#0b8454" 
            strokeWidth="2" 
            filter="url(#shadow)"
          />
          {/* SE1 County Lines */}
          <path d="M 190 75 L 255 105" stroke="#0b8454" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="185" y="85" fill="#0b8454" fontSize="10" fontWeight="bold">SE1 Norrbotten</text>

          {/* SE2 (Västernorrland / Jämtland / Västerbotten) */}
          <path 
            d="M 150 150 L 250 140 L 230 260 L 110 240 L 120 180 Z" 
            fill={selectedZone === 'SE2' ? '#bfdbfe' : '#eff6ff'} 
            stroke="#3b82f6" 
            strokeWidth="2" 
            filter="url(#shadow)"
          />
          {/* SE2 County Lines */}
          <path d="M 130 195 L 240 190" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M 170 215 L 235 225" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="155" y="200" fill="#1d4ed8" fontSize="10" fontWeight="bold">SE2 Västernorrland & Jämtland</text>

          {/* SE3 (Stockholm / Värmland / Dalarna / Östergötland / Västra Götaland) */}
          <path 
            d="M 110 240 L 230 260 L 220 370 L 180 390 L 100 350 L 105 280 Z" 
            fill={selectedZone === 'SE3' ? '#fde68a' : '#fff7ed'} 
            stroke="#f5a623" 
            strokeWidth="2" 
            filter="url(#shadow)"
          />
          {/* SE3 County Lines (Värmland, Dalarna, Stockholm, Östergötland) */}
          <path d="M 110 280 L 225 295" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M 105 320 L 210 335" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M 150 335 L 155 385" stroke="#d97706" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="125" y="310" fill="#b45309" fontSize="10" fontWeight="bold">SE3 Stockholm & Värmland</text>

          {/* Gotland Island */}
          <ellipse cx="250" cy="360" rx="8" ry="18" fill="#fff7ed" stroke="#f5a623" strokeWidth="1.5" />
          <text x="262" y="364" fill="#b45309" fontSize="8" fontWeight="bold">Gotland</text>

          {/* SE4 (Skåne / Blekinge / Halland / Småland syd) */}
          <path 
            d="M 100 350 L 180 390 L 200 440 L 140 480 L 95 430 Z" 
            fill={selectedZone === 'SE4' ? '#fecaca' : '#fef2f2'} 
            stroke="#ce1f36" 
            strokeWidth="2" 
            filter="url(#shadow)"
          />
          {/* SE4 County Lines (Skåne, Blekinge, Halland) */}
          <path d="M 100 400 L 195 420" stroke="#ce1f36" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <path d="M 120 445 L 170 440" stroke="#ce1f36" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />
          <text x="120" y="425" fill="#991b1b" fontSize="10" fontWeight="bold">SE4 Skåne & Blekinge</text>
        </svg>

        {/* Interactive Region Pins Overlay */}
        {REGIONS_DATA.map((region) => {
          const isSelected = selectedCity === region.city || (selectedZone === region.zone && !selectedCity);
          const price = zonePrices[region.zone] || 0;
          const statusInfo = getStatusBadge(region.gridStatus);

          return (
            <button
              key={region.id}
              onClick={() => onSelectRegion(region.zone, region.city)}
              style={{ left: `${region.xPct}%`, top: `${region.yPct}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 focus:outline-none ${isSelected ? 'z-30 scale-110' : 'z-10 hover:scale-105'}`}
              aria-label={`Välj ${region.city} i ${region.countyName} (${region.zone}), pris ${price} öre/kWh`}
            >
              <div className="relative flex flex-col items-center">
                {/* Pin Badge */}
                <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1 border transition-all ${isSelected ? 'bg-[#2c2827] text-white border-[#0b8454] ring-2 ring-[#0b8454]/40 scale-105' : 'bg-white text-[#2c2827] border-[#e5e3e1] group-hover:border-[#0b8454]'}`}>
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-[#0b8454]' : 'text-[#757575]'}`} />
                  <span>{region.city}</span>
                  <span className="text-[#0b8454] font-extrabold ml-0.5">{price} öre</span>
                </div>

                {/* Status Dot & County Badge */}
                <div className="flex items-center gap-1 mt-1">
                  <span className={`w-2.5 h-2.5 rounded-full ${statusInfo.dot} animate-pulse`} />
                  <span className="text-[9.5px] font-semibold text-[#2c2827] bg-white/90 backdrop-blur-xs px-1.5 py-0.5 rounded-md shadow-2xs border border-gray-200">
                    {region.countyName}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Grid Status Quick Legend */}
      <div className="mt-3 pt-3 border-t border-[#e5e3e1] flex items-center justify-between text-xs text-[#757575] flex-wrap gap-2">
        <span className="font-semibold text-[#2c2827]">Läns- & Belastningsstatus:</span>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#0b8454]" /> Normal
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#f5a623]" /> Förhöjd
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#ce1f36]" /> Hög
          </span>
        </div>
      </div>
    </div>
  );
}
