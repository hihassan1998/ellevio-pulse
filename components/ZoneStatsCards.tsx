'use client';

import React from 'react';
import { ZoneStats } from '@/lib/elpris';
import { TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function ZoneStatsCards({ stats }: { stats: ZoneStats[] }) {
  const getBadgeColor = (zone: string) => {
    switch (zone) {
      case 'SE1': return 'bg-[#e7f6f0] text-[#0b8454] border-[#0b8454]/20';
      case 'SE2': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SE3': return 'bg-[#fef3e6] text-[#f5a623] border-[#f5a623]/30';
      default: return 'bg-[#f2e5e7] text-[#ce1f36] border-[#ce1f36]/20';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.zone} className="card-ellevio hover:border-[#0b8454]/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(s.zone)}`}>
              {s.zone}
            </span>
            <TrendingUp className="w-4 h-4 text-[#757575]" />
          </div>
          
          <h3 className="text-sm font-bold text-[#2c2827]">{s.name}</h3>
          
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold text-[#2c2827]">{s.avgPrice}</span>
            <span className="text-xs text-[#757575] font-medium">öre/kWh snitt</span>
          </div>

          <div className="mt-3 pt-3 border-t border-[#e5e3e1] flex items-center justify-between text-xs text-[#757575]">
            <span className="flex items-center gap-1 text-[#0b8454] font-semibold">
              <ArrowDownRight className="w-3.5 h-3.5" /> {s.minPrice} öre
            </span>
            <span className="flex items-center gap-1 text-[#ce1f36] font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" /> {s.maxPrice} öre
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
