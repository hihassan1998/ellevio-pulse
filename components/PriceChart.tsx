'use client';

import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { HourlyPrice } from '@/lib/elpris';
import { ExternalLink } from 'lucide-react';

export default function PriceChart({ data }: { data: HourlyPrice[] }) {
  return (
    <div className="card-ellevio mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-xl font-bold text-[#2c2827] flex items-center gap-2">
            📊 Timpriser per Elområde (SE1–SE4)
          </h2>
          <p className="text-sm text-[#757575] mt-1 flex items-center gap-1.5 flex-wrap">
            <span>Spotpriser i öre/kWh inkl. moms via</span>
            <span className="relative group inline-block">
              <a 
                href="https://www.elprisetjustnu.se/elpris-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0b8454] font-bold underline hover:text-[#0f5a46] inline-flex items-center gap-0.5"
              >
                Öppna Data (elprisetjustnu.se)
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-56 bg-[#2c2827] text-white text-[10px] p-2 rounded-lg shadow-xl text-center pointer-events-none">
                <span>⚡ Klicka för officiell dokumentation av elpris-API</span>
                <span className="border-t-4 border-t-[#2c2827] border-x-4 border-x-transparent w-0 h-0 mt-0.5" />
              </span>
            </span>
          </p>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center gap-2 text-xs font-semibold flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-[#e7f6f0] text-[#0b8454] border border-[#0b8454]/20">SE1 Luleå</span>
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">SE2 Sundsvall</span>
          <span className="px-2.5 py-1 rounded-full bg-[#fef3e6] text-[#f5a623] border border-[#f5a623]/30">SE3 Sthlm</span>
          <span className="px-2.5 py-1 rounded-full bg-[#f2e5e7] text-[#ce1f36] border border-[#ce1f36]/20">SE4 Malmö</span>
        </div>
      </div>

      <div className="w-full h-[360px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e3e1" />
            <XAxis dataKey="time" stroke="#757575" fontSize={12} tickLine={false} />
            <YAxis unit=" öre" stroke="#757575" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2c2827', borderRadius: '8px', border: 'none', color: '#ffffff' }}
              itemStyle={{ color: '#ffffff', fontSize: '13px' }}
              formatter={(val: number) => [`${val} öre/kWh`, '']}
            />
            <Legend wrapperStyle={{ paddingTop: '15px' }} />
            <Line type="monotone" dataKey="SE1" name="SE1 (Luleå)" stroke="#0b8454" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="SE2" name="SE2 (Sundsvall)" stroke="#3B82F6" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="SE3" name="SE3 (Stockholm)" stroke="#f5a623" strokeWidth={2.5} dot={false} />
            <Line type="monotone" dataKey="SE4" name="SE4 (Malmö)" stroke="#ce1f36" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
