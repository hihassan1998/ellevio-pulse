import React from 'react';
import { getAggregatedPrices } from '@/lib/elpris';
import PriceChart from '@/components/PriceChart';
import ZoneStatsCards from '@/components/ZoneStatsCards';
import ImpactCalculator from '@/components/ImpactCalculator';
import AIAssistantWidget from '@/components/AIAssistantWidget';

export const revalidate = 3600;

export default async function HomePage() {
  const { hourly, stats } = await getAggregatedPrices();

  return (
    <div className="space-y-8">
      {/* Introduction banner */}
      <div className="card-ellevio border-l-4 border-l-[#0b8454]">
        <h1 className="text-2xl font-bold text-[#2c2827] tracking-tight">
          Välkommen till Ellevio<span className="text-[#0b8454]">Pulse</span>
        </h1>
        <p className="text-sm text-[#757575] mt-2 max-w-3xl leading-relaxed">
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
