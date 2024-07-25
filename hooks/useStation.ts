import { useStationFetch } from '@/contexts/StationFetchContext';
import { Station } from '@/types/types';
import { fixArrivalTime } from '@/utils/trainUtils';
import { useEffect, useState } from 'react';

export const useStation = (station: Station, refreshCounter: number) => {
  const [stop, setStop] = useState<Station | undefined>();
  const { startFetch, endFetch } = useStationFetch();

  useEffect(() => {
    const fetchStop = async () => {
      startFetch();
      try {
        const response = await fetch(`https://www.traintimes.nyc/api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stops: [station] }),
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        fixArrivalTime(data);
        setStop(data);
      } catch (error) {
        console.error('Failed to fetch stop:', error);
        setStop(station);
      }
      endFetch();
    };

    fetchStop();
  }, [station.stopName, refreshCounter]);

  return { stop };
};
