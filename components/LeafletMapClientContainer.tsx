'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Zap, ShieldCheck } from 'lucide-react';
import { REGIONS_DATA, GridRegion } from './gridData';

interface LeafletMapClientContainerProps {
  selectedZone: string;
  selectedCity: string;
  onSelectRegion: (zone: 'SE1' | 'SE2' | 'SE3' | 'SE4', city: string) => void;
  zonePrices: Record<string, number>;
}

// Rough Coordinates for Sweden's 4 Price Zones (Polygons)
const SE1_POLYGON: [number, number][] = [
  [69.0, 20.5],
  [68.5, 24.2],
  [65.5, 24.0],
  [64.2, 21.0],
  [64.5, 15.0],
  [68.0, 16.5]
];

const SE2_POLYGON: [number, number][] = [
  [64.5, 15.0],
  [64.2, 21.0],
  [62.5, 18.0],
  [60.6, 17.5],
  [60.8, 12.2],
  [63.5, 12.0]
];

const SE3_POLYGON: [number, number][] = [
  [60.8, 12.2],
  [60.6, 17.5],
  [58.8, 18.5],
  [57.8, 16.5],
  [57.0, 12.0],
  [59.0, 11.2]
];

const SE4_POLYGON: [number, number][] = [
  [57.0, 12.0],
  [57.8, 16.5],
  [56.0, 16.0],
  [55.3, 14.3],
  [55.3, 12.8],
  [56.5, 12.4]
];

// Helper to create custom HTML markers for Leaflet
function createCustomMarkerIcon(city: string, zone: string, price: number, isSelected: boolean, status: string) {
  const dotColor = status === 'normal' ? '#0b8454' : status === 'elevated' ? '#f5a623' : '#ce1f36';
  
  return L.divIcon({
    className: 'custom-leaflet-marker-wrapper',
    html: `
      <div style="
        display: flex; 
        flex-direction: column; 
        align-items: center; 
        transform: translate(-50%, -50%);
        cursor: pointer;
      ">
        <div style="
          background-color: ${isSelected ? '#2c2827' : '#ffffff'}; 
          color: ${isSelected ? '#ffffff' : '#2c2827'}; 
          border: 2px solid ${isSelected ? '#0b8454' : '#e5e3e1'}; 
          padding: 3px 8px; 
          border-radius: 9999px; 
          font-size: 11px; 
          font-weight: 700; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          display: flex;
          align-items: center;
          gap: 4px;
          white-space: nowrap;
        ">
          <span>${city}</span>
          <span style="color: #0b8454; font-weight: 800;">${price} öre</span>
        </div>
        <div style="
          margin-top: 2px;
          display: flex;
          align-items: center;
          gap: 3px;
          background: rgba(255,255,255,0.9);
          padding: 1px 5px;
          border-radius: 4px;
          border: 1px solid #e5e3e1;
          font-size: 9px;
          font-weight: 600;
        ">
          <span style="width: 7px; height: 7px; border-radius: 50%; background-color: ${dotColor}; display: inline-block;"></span>
          <span>${zone}</span>
        </div>
      </div>
    `,
    iconSize: [80, 40],
    iconAnchor: [40, 20]
  });
}

// Controller component to smoothly pan/zoom map on selection
function MapViewController({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], map.getZoom(), { duration: 1 });
    }
  }, [lat, lng, map]);
  return null;
}

export default function LeafletMapClientContainer({
  selectedZone,
  selectedCity,
  onSelectRegion,
  zonePrices
}: LeafletMapClientContainerProps) {

  // Selected region coordinates for MapViewController
  const selectedRegion = REGIONS_DATA.find(r => r.city === selectedCity) || REGIONS_DATA[2];

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#e5e3e1] shadow-xs flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-[#e7f6f0] text-[#0b8454] rounded-lg">
            <Zap className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-[#2c2827]">Sverigekarta med Elområden (OpenStreetMap)</h3>
            <p className="text-[11px] text-[#757575]">Realistisk karta över länder, länsgränser & elområden SE1–SE4</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-[#0b8454] bg-[#e7f6f0] px-2.5 py-1 rounded-full border border-[#0b8454]/20 hidden sm:inline-flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" />
          <span>Realistiska Kartflisor</span>
        </span>
      </div>

      {/* Real Leaflet OpenStreetMap Container */}
      <div className="relative w-full h-[340px] sm:h-[380px] rounded-xl border border-[#e5e3e1] overflow-hidden z-10">
        <MapContainer
          center={[62.5, 16.5]}
          zoom={5}
          scrollWheelZoom={false}
          style={{ width: '100%', height: '100%' }}
          className="rounded-xl"
        >
          <MapViewController lat={selectedRegion.lat} lng={selectedRegion.lng} />

          {/* OpenStreetMap Real Geographical Tiles */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* SE1 Zone Polygon Overlay */}
          <Polygon 
            positions={SE1_POLYGON} 
            pathOptions={{ 
              color: '#0b8454', 
              fillColor: '#0b8454', 
              fillOpacity: selectedZone === 'SE1' ? 0.35 : 0.15,
              weight: selectedZone === 'SE1' ? 3 : 1.5,
              dashArray: selectedZone === 'SE1' ? undefined : '4,4'
            }}
            eventHandlers={{ click: () => onSelectRegion('SE1', 'Luleå') }}
          />

          {/* SE2 Zone Polygon Overlay */}
          <Polygon 
            positions={SE2_POLYGON} 
            pathOptions={{ 
              color: '#3b82f6', 
              fillColor: '#3b82f6', 
              fillOpacity: selectedZone === 'SE2' ? 0.35 : 0.15,
              weight: selectedZone === 'SE2' ? 3 : 1.5,
              dashArray: selectedZone === 'SE2' ? undefined : '4,4'
            }}
            eventHandlers={{ click: () => onSelectRegion('SE2', 'Sundsvall') }}
          />

          {/* SE3 Zone Polygon Overlay */}
          <Polygon 
            positions={SE3_POLYGON} 
            pathOptions={{ 
              color: '#f5a623', 
              fillColor: '#f5a623', 
              fillOpacity: selectedZone === 'SE3' ? 0.35 : 0.15,
              weight: selectedZone === 'SE3' ? 3 : 1.5,
              dashArray: selectedZone === 'SE3' ? undefined : '4,4'
            }}
            eventHandlers={{ click: () => onSelectRegion('SE3', 'Stockholm') }}
          />

          {/* SE4 Zone Polygon Overlay */}
          <Polygon 
            positions={SE4_POLYGON} 
            pathOptions={{ 
              color: '#ce1f36', 
              fillColor: '#ce1f36', 
              fillOpacity: selectedZone === 'SE4' ? 0.35 : 0.15,
              weight: selectedZone === 'SE4' ? 3 : 1.5,
              dashArray: selectedZone === 'SE4' ? undefined : '4,4'
            }}
            eventHandlers={{ click: () => onSelectRegion('SE4', 'Malmö') }}
          />

          {/* City Markers */}
          {REGIONS_DATA.map((region) => {
            const isSelected = selectedCity === region.city || (selectedZone === region.zone && !selectedCity);
            const price = zonePrices[region.zone] || 0;
            const customIcon = createCustomMarkerIcon(region.city, region.zone, price, isSelected, region.gridStatus);

            return (
              <Marker
                key={region.id}
                position={[region.lat, region.lng]}
                icon={customIcon}
                eventHandlers={{
                  click: () => onSelectRegion(region.zone, region.city)
                }}
              >
                <Popup>
                  <div className="p-1 text-xs">
                    <strong className="text-sm text-[#2c2827] block mb-1">{region.city} ({region.countyName})</strong>
                    <div className="flex items-center justify-between gap-3 text-gray-700">
                      <span>Elområde: <strong>{region.zone}</strong></span>
                      <span>Spotpris: <strong className="text-[#0b8454]">{price} öre/kWh</strong></span>
                    </div>
                    <div className="mt-1.5 text-[11px] text-[#757575]">
                      Transformatorkapacitet: {region.capacityPct}%
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Grid Status Quick Legend */}
      <div className="mt-3 pt-3 border-t border-[#e5e3e1] flex items-center justify-between text-xs text-[#757575] flex-wrap gap-2">
        <span className="font-semibold text-[#2c2827]">Elområdespolygoner:</span>
        <div className="flex items-center gap-3 font-medium text-[11px]">
          <span className="inline-flex items-center gap-1 text-[#0b8454]">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0b8454]/40 border border-[#0b8454]" /> SE1 Norr
          </span>
          <span className="inline-flex items-center gap-1 text-[#3b82f6]">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#3b82f6]/40 border border-[#3b82f6]" /> SE2 Mitt
          </span>
          <span className="inline-flex items-center gap-1 text-[#d97706]">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#f5a623]/40 border border-[#f5a623]" /> SE3 Sthlm/Värmland
          </span>
          <span className="inline-flex items-center gap-1 text-[#ce1f36]">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#ce1f36]/40 border border-[#ce1f36]" /> SE4 Syd
          </span>
        </div>
      </div>
    </div>
  );
}
