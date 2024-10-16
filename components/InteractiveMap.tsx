"use client"

import React from 'react';
import { MapContainer, TileLayer, Rectangle, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCoordinates } from '@/contexts/CoordinatesContext';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const bounds: L.LatLngBoundsExpression = [
  [82.92, -83.38],
  [-19.2, 92.78],
];

const MapEvents = () => {
  const { setCoordinates } = useCoordinates();
  
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      if (lat >= -19.2 && lat <= 82.92 && lng >= -83.38 && lng <= 92.78) {
        setCoordinates({ lat, lng });
      }
    },
  });
  return null;
};

const InteractiveMap: React.FC = () => {
  const { coordinates } = useCoordinates();

  return (
    <div className="w-full max-w-3xl mb-8">
      <MapContainer
        center={[31.86, 4.7]}
        zoom={2}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Rectangle bounds={bounds} pathOptions={{ color: 'red', weight: 2, fillOpacity: 0.2 }} />
        <MapEvents />
        {coordinates && <Marker position={[coordinates.lat, coordinates.lng]} />}
      </MapContainer>
      {coordinates && (
        <div className="mt-4">
          <p>Latitude: {coordinates.lat.toFixed(6)}</p>
          <p>Longitude: {coordinates.lng.toFixed(6)}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;