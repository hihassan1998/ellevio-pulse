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
    lng: 22.1567
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
    lng: 17.3069
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
    lng: 18.0686
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
    lng: 13.5036
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
    lng: 13.0038
  }
];
