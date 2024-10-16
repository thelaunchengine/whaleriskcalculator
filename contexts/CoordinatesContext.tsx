"use client"

import React, { createContext, useState, useContext } from 'react';

type Coordinates = {
  lat: number;
  lng: number;
} | null;

type CoordinatesContextType = {
  coordinates: Coordinates;
  setCoordinates: React.Dispatch<React.SetStateAction<Coordinates>>;
};

const CoordinatesContext = createContext<CoordinatesContextType | undefined>(undefined);

export const CoordinatesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coordinates, setCoordinates] = useState<Coordinates>(null);

  return (
    <CoordinatesContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </CoordinatesContext.Provider>
  );
};

export const useCoordinates = () => {
  const context = useContext(CoordinatesContext);
  if (context === undefined) {
    throw new Error('useCoordinates must be used within a CoordinatesProvider');
  }
  return context;
};