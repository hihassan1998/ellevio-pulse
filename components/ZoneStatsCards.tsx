'use client';

import React from 'react';
import { ZoneStats } from '@/lib/elpris';
import { TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function ZoneStatsCards({ stats }: { stats: ZoneStats[] }) {
  const getBadgeColor = (zone: string) => {
    switch (zone) {
      case 'SE1': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'SE2': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'SE3': return 'bg-amber-50 text-amber-700 border-amber-200';
      default: return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((s) => (
        <div key={s.zone} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getBadgeColor(s.zone)}`}>
              {s.zone}
            </span>
            <TrendingUp className="w-4 h-4 text-gray-400" />
          </div>
          
          <h3 className="text-sm font-semibold text-gray-700">{s.name}</h3>
          
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-gray-900">{s.avgPrice}</span>
            <span className="text-xs text-gray-500 font-medium">öre/kWh snitt</span>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <span className="flex items-center gap-1 text-emerald-600 font-medium">
              <ArrowDownRight className="w-3.5 h-3.5" /> {s.minPrice} öre
            </span>
            <span className="flex items-center gap-1 text-rose-600 font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> {s.maxPrice} öre
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
