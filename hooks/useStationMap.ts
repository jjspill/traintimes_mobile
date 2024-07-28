import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Station } from '@/types/types';
import { fixArrivalTime } from '@/utils/trainUtils';

export const useStationMap = (stations: Station[]) => {
  const [stops, setStops] = useState<Station[]>([]);

  useEffect(() => {
    const fetchStops = async () => {
      const fetchPromises = stations.map((station) =>
        fetch('https://www.traintimes.nyc/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stops: [station] }),
        })
          .then((response) => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
          })
          .then((data) => {
            fixArrivalTime(data);
            return data;
          })
          .catch((error) => {
            console.error(`Failed to fetch stop ${station.stopId}:`, error);
            return station; // Return original station data as fallback
          }),
      );

      try {
        const stopsData = await Promise.all(fetchPromises);
        setStops(stopsData);
      } catch (error) {
        console.error('Failed to fetch one or more stops:', error);
      }
    };

    fetchStops();
  }, [stations.map((s) => s.stopId).join(',')]);

  return { stops };
};
