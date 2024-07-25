import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
} from 'react';

interface StationFetchContextType {
  activeFetches: number;
  lastFetchTime: string;
  startFetch: () => void;
  endFetch: () => void;
}

const StationFetchContext = createContext<StationFetchContextType | undefined>(
  undefined,
);

// Explicitly type the props with FC<{ children: ReactNode }>
export const StationFetchProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeFetches, setActiveFetches] = useState(0);
  const [lastFetchTime, setLastFetchTime] = useState('');

  const startFetch = () => {
    setActiveFetches((prev) => prev + 1);
  };

  const endFetch = () => {
    setActiveFetches((prev) => {
      if (prev === 1) {
        setLastFetchTime(new Date().toLocaleTimeString());
      }
      return prev - 1;
    });
  };

  return (
    <StationFetchContext.Provider
      value={{ activeFetches, lastFetchTime, startFetch, endFetch }}
    >
      {children}
    </StationFetchContext.Provider>
  );
};

export const useStationFetch = (): StationFetchContextType => {
  const context = useContext(StationFetchContext);
  if (context === undefined) {
    throw new Error(
      'useStationFetch must be used within a StationFetchProvider',
    );
  }
  return context;
};
