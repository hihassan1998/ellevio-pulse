import React from 'react';
import { getAggregatedPrices } from '@/lib/elpris';
import PriceChart from '@/components/PriceChart';
import ZoneStatsCards from '@/components/ZoneStatsCards';
import ImpactCalculator from '@/components/ImpactCalculator';
import AIAssistantWidget from '@/components/AIAssistantWidget';

export const revalidate = 3600; // Revalidate every hour

export default async function HomePage() {
  const { hourly, stats } = await getAggregatedPrices();

  return (
    <div>
      {/* Introduction banner */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs mb-8">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          Välkommen till Ellevio<span className="text-[#005A9C]">Pulse</span>
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-3xl leading-relaxed">
          Detta demoprojekt visar hur Ellevios digitala kanaler kan visualisera realtidskunddata från Sveriges fyra elområden (SE1–SE4), förenkla komplexa elnätskoncept och nyttja Generativ AI för snabb kundtjänststöttning.
        </p>
      </div>

      {/* Zone stats cards */}
      <ZoneStatsCards stats={stats} />

      {/* Price chart */}
      <PriceChart data={hourly} />

      {/* Customer cost calculator */}
      <ImpactCalculator stats={stats} />

      {/* AI Assistant */}
      <AIAssistantWidget />
    </div>
  );
}
