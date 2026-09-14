'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { REGIONS_DATA, GridRegion } from './gridData';

export { REGIONS_DATA };
export type { GridRegion };

interface LeafletGridMapProps {
  selectedZone: string;
  selectedCity: string;
  onSelectRegion: (zone: 'SE1' | 'SE2' | 'SE3' | 'SE4', city: string) => void;
  zonePrices: Record<string, number>;
}

const ClientMap = dynamic(() => import('./LeafletMapClientContainer'), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e3e1] shadow-xs flex flex-col h-full items-center justify-center min-h-[380px]">
      <div className="animate-pulse flex flex-col items-center gap-3 text-[#757575]">
        <div className="w-8 h-8 rounded-full bg-[#0b8454]/20 border-2 border-[#0b8454] border-t-transparent animate-spin" />
        <span className="text-xs font-semibold">Laddar Sverigekarta med OpenStreetMap...</span>
      </div>
    </div>
  )
});

export default function LeafletGridMap(props: LeafletGridMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e3e1] shadow-xs flex flex-col h-full items-center justify-center min-h-[380px]">
        <div className="animate-pulse flex flex-col items-center gap-3 text-[#757575]">
          <div className="w-8 h-8 rounded-full bg-[#0b8454]/20 border-2 border-[#0b8454] border-t-transparent animate-spin" />
          <span className="text-xs font-semibold">Laddar Sverigekarta...</span>
        </div>
      </div>
    );
  }

  return <ClientMap {...props} />;
}
