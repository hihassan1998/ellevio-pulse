'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { HourlyPrice } from '@/lib/elpris';

export default function PriceChart({ data }: { data: HourlyPrice[] }) {
  return (
    <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            📊 Timpriser per Elområde (SE1–SE4)
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Spotpriser i öre/kWh inkl. 25% moms för innevarande dygn
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">SE1 Luleå</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">SE2 Sundsvall</span>
          <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">SE3 Sthlm</span>
          <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">SE4 Malmö</span>
        </div>
      </div>

      <div className="w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} tickLine={false} />
            <YAxis unit=" öre" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', border: 'none', color: '#FFF' }}
              itemStyle={{ color: '#FFF', fontSize: '13px' }}
              formatter={(val: number) => [`${val} öre/kWh`, '']}
            />
            <Legend wrapperStyle={{ paddingTop: '15px' }} />
            <Line type="monotone" dataKey="SE1" name="SE1 (Luleå)" stroke="#10B981" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="SE2" name="SE2 (Sundsvall)" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="SE3" name="SE3 (Stockholm)" stroke="#F59E0B" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="SE4" name="SE4 (Malmö)" stroke="#EF4444" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
