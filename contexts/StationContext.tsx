import { useContinuousCountdown } from '@/hooks/useCountdown';
import useCurrentLocation from '@/hooks/useLocation';
import { useNearestStations } from '@/hooks/useNearestStations';
import { Station } from '@/types/types';
import { fixArrivalTime } from '@/utils/trainUtils';
import { Location } from '@/types/types';
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface StationContextType {
  stations: { [key: string]: Station };
  searchRadius: number;
  nearestStations: Station[];
  location: Location | null;
  errorMsg: string | null;
  setSearchRadius: (radius: number) => void;
  resetCountdown: () => void;
  lastFetchTime: string;
  activeFetches: number;
}

export const StationContext = createContext<StationContextType | undefined>(
  undefined,
);

export const StationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // console.log('rendering StationProvider');
  const [stations, setStations] = useState<{ [key: string]: Station }>({});

  const [searchRadius, setSearchRadius] = useState(0.5);
  const { refreshCounter, resetCountdown } = useContinuousCountdown();
  const { location, errorMsg } = useCurrentLocation();
  const { nearestStations } = useNearestStations(location, searchRadius);
  const stationIds = useMemo(
    () => nearestStations.map((station) => station.stopId).join(','),
    [nearestStations],
  );

  const [lastFetchTime, setLastFetchTime] = useState('');
  const [activeFetches, setActiveFetches] = useState(0);
  // console.log('len stations', Object.keys(stations).length);

  useEffect(() => {
    const fetchStops = async () => {
      if (nearestStations.length === 0) return;
      setActiveFetches(nearestStations.length);
      const fetchPromises = nearestStations.map((station) =>
        fetch('https://www.traintimes.nyc/api', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stops: [station] }),
        })
          .then((response) => {
            // console.log('response');
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
          })
          .then((data) => {
            fixArrivalTime(data);
            // setStations((prev) => ({ ...prev, [station.stopId]: data }));
            return data;
          })
          .catch((error) => {
            console.error(`Failed to fetch stop ${station.stopId}:`, error);
            return station; // Return original station data as fallback
          }),
      );

      try {
        const stopsData = await Promise.all(fetchPromises);
        const stationsObject = stopsData.reduce((acc, stop) => {
          if (!stop.error && stop.stopId) {
            acc[stop.stopId] = stop;
          }
          return acc;
        }, {});
        setStations(stationsObject);

        setActiveFetches(0);
        setLastFetchTime(new Date().toLocaleTimeString());
      } catch (error) {
        console.error('Failed to fetch one or more stops:', error);
      }
    };

    fetchStops();
  }, [stationIds, refreshCounter]);

  return (
    <StationContext.Provider
      value={{
        stations,
        searchRadius,
        nearestStations,
        location,
        errorMsg,
        setSearchRadius,
        resetCountdown,
        lastFetchTime,
        activeFetches,
      }}
    >
      {children}
    </StationContext.Provider>
  );
};

export const useStations = (): StationContextType => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error('useStations must be used within a StationProvider');
  }
  return context;
};
