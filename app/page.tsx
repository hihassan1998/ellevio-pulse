import React from 'react';
import { getAggregatedPrices } from '@/lib/elpris';
import ExecutiveSummaryBanner from '@/components/ExecutiveSummaryBanner';
import PriceChart from '@/components/PriceChart';
import ZoneStatsCards from '@/components/ZoneStatsCards';
import GridMapPriceForecast from '@/components/GridMapPriceForecast';
import ImpactCalculator from '@/components/ImpactCalculator';
import DataSourcesOverview from '@/components/DataSourcesOverview';
import AIAssistantWidget from '@/components/AIAssistantWidget';

export const revalidate = 3600;

export default async function HomePage() {
  const { hourly, stats } = await getAggregatedPrices();

  return (
    <div className="space-y-8">
      {/* Executive Strategy Banner for Hiring Team */}
      <ExecutiveSummaryBanner />

      {/* Zone stats cards */}
      <ZoneStatsCards stats={stats} />

      {/* Price chart */}
      <PriceChart data={hourly} />

      {/* Spec 005: Local Grid Status & 24h Price Forecast Map */}
      <GridMapPriceForecast stats={stats} hourly={hourly} />

      {/* Customer cost calculator with smart time intervals */}
      <ImpactCalculator stats={stats} />

      {/* Transparency section describing all data sources used */}
      <DataSourcesOverview />

      {/* Floating AI Assistant Widget */}
      <AIAssistantWidget />
    </div>
  );
}
