"use client";

import { useMemo } from "react";
import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";

interface MapViewProps {
  origin?: string;
  destination?: string;
  distanceKm?: number;
  durationMin?: number;
}

const limaCenter = { lat: -12.0464, lng: -77.0428 };

const districtCoordinates: Record<string, { lat: number; lng: number }> = {
  "san isidro": { lat: -12.0983, lng: -77.0308 },
  "miraflores": { lat: -12.1196, lng: -77.0303 },
  "san borja": { lat: -12.0847, lng: -77.0075 },
  "surco": { lat: -12.1303, lng: -76.9903 },
  "la molina": { lat: -12.0753, lng: -76.9475 },
  "barranco": { lat: -12.1442, lng: -77.0219 },
  "centro empresarial san isidro": { lat: -12.0983, lng: -77.0308 },
};

const calculateRoutePath = (originCoords: { lat: number; lng: number } | null, destCoords: { lat: number; lng: number } | null): Array<{ lat: number; lng: number }> => {
  if (!originCoords || !destCoords) {
    return [];
  }
  
  const midLat = (originCoords.lat + destCoords.lat) / 2;
  const midLng = (originCoords.lng + destCoords.lng) / 2;
  
  return [
    originCoords,
    { lat: midLat, lng: midLng },
    destCoords,
  ];
};

const calculateBounds = (originCoords: { lat: number; lng: number } | null, destCoords: { lat: number; lng: number } | null) => {
  if (!originCoords || !destCoords) {
    return null;
  }
  
  const minLat = Math.min(originCoords.lat, destCoords.lat);
  const maxLat = Math.max(originCoords.lat, destCoords.lat);
  const minLng = Math.min(originCoords.lng, destCoords.lng);
  const maxLng = Math.max(originCoords.lng, destCoords.lng);
  
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const maxDiff = Math.max(latDiff, lngDiff);
  
  let zoom = 12;
  if (maxDiff < 0.01) zoom = 14;
  else if (maxDiff < 0.02) zoom = 13;
  else if (maxDiff < 0.05) zoom = 12;
  else zoom = 11;
  
  return {
    center: { lat: centerLat, lng: centerLng },
    zoom,
  };
};

const darkMapStyles = [
  { elementType: "geometry", stylers: [{ color: "#212121" }] },
  { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9e9e9e" }],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#bdbdbd" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#181818" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#1b1b1b" }],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [{ color: "#2c2c2c" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#8a8a8a" }],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [{ color: "#373737" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#3c3c3c" }],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [{ color: "#4e4e4e" }],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [{ color: "#616161" }],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [{ color: "#757575" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#000000" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#3d3d3d" }],
  },
];

export default function MapView({ origin, destination, distanceKm, durationMin }: MapViewProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const getDistrictCoords = (name: string) => {
    const normalized = name.toLowerCase();
    for (const [key, coords] of Object.entries(districtCoordinates)) {
      if (normalized.includes(key)) {
        return coords;
      }
    }
    return null;
  };

  const originCoords = origin ? getDistrictCoords(origin) : null;
  const destCoords = destination ? getDistrictCoords(destination) : null;
  
  const routePath = useMemo(() => calculateRoutePath(originCoords, destCoords), [originCoords, destCoords]);
  const mapBounds = useMemo(() => calculateBounds(originCoords, destCoords), [originCoords, destCoords]);
  
  const mapCenter = mapBounds?.center || limaCenter;
  const mapZoom = mapBounds?.zoom || 12;

  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      zoomControl: true,
      styles: darkMapStyles,
    }),
    []
  );

  if (!apiKey) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-xl border border-[#2a2a2a] flex items-center justify-center shadow-lg">
        <p className="text-gray-400 text-sm">Configura NEXT_PUBLIC_GOOGLE_MAPS_API_KEY en .env.local</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[60vh] bg-gradient-to-br from-[#1a1a1a] via-[#121212] to-[#0a0a0a] rounded-xl border border-[#2a2a2a] flex items-center justify-center shadow-lg">
        <p className="text-gray-400 text-sm">Cargando mapa...</p>
      </div>
    );
  }

  if (!originCoords || !destCoords) {
    return (
      <div className="w-full h-[60vh] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-lg">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={limaCenter}
          zoom={12}
          options={mapOptions}
        >
          <div className="absolute top-4 left-4 bg-[#1a1a1a]/90 text-white px-4 py-2 rounded-lg text-sm border border-[#2a2a2a]">
            Sin ruta definida aún
          </div>
        </GoogleMap>
      </div>
    );
  }

  return (
    <div className="w-full h-[60vh] rounded-xl border border-[#2a2a2a] overflow-hidden shadow-lg relative">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={mapCenter}
        zoom={mapZoom}
        options={mapOptions}
      >
        <Marker
          position={originCoords}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#3B82F6",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.2,
          }}
        />
        <Marker
          position={destCoords}
          icon={{
            path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
            fillColor: "#10B981",
            fillOpacity: 1,
            strokeColor: "#ffffff",
            strokeWeight: 2,
            scale: 1.2,
          }}
        />
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{
              strokeColor: "#3B82F6",
              strokeWeight: 4,
              strokeOpacity: 0.8,
            }}
          />
        )}
      </GoogleMap>
      {distanceKm && durationMin && (
        <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/90 text-white px-4 py-2 rounded-lg text-sm border border-[#2a2a2a]">
          Distancia estimada: {distanceKm} km — Tiempo aprox: {durationMin} min
        </div>
      )}
    </div>
  );
}

