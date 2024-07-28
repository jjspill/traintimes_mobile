import { Station, Location, ApiResponse } from '@/types/types';
import { findClosestStations } from '@/utils/locationUtils';
import { fixArrivalTime, sortSubwayStops } from '@/utils/trainUtils';
import { useState, useEffect } from 'react';

const GRAND_CENTRAL: Location = { lat: 40.7527, lng: -73.9772 };

export const useNearestStations = (
  location: Location | null,
  // selectedFamily: string,
) => {
  const searchRadius = 0.5;
  const [nearestStations, setNearestStations] = useState<Station[]>([]);

  useEffect(() => {
    const findNearestStations = async () => {
      if (!location || !searchRadius) return;

      try {
        const closestStations = findClosestStations(
          location.lat,
          location.lng,
          typeof searchRadius === 'string'
            ? parseFloat(searchRadius)
            : searchRadius,
        );
        const sortedStations = sortSubwayStops(closestStations);
        setNearestStations(sortedStations);
      } catch (error) {
        console.error('Error finding nearest stations:', error);
      }
    };

    findNearestStations();
  }, [location, searchRadius]);

  return { nearestStations };
};
