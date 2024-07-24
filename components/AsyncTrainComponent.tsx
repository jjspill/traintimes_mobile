import { Station } from '@/types/types';
import { getLineFamily } from '@/utils/trainUtils';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StationDetailsComponent from './StationsDetailsComponent';
import TrainsLoadingPlaceholder from './TrainsLoadingPlaceholder';
import TrainComponent from './TrainsComponent';
import DirectionsButton from './DirectionsComponent';
import { useStation } from '@/hooks/useStation';

interface AsyncStationComponentProps {
  stationIn: Station;
  refreshCounter: number;
}

export const AsyncStationComponent: React.FC<AsyncStationComponentProps> = ({
  stationIn,
  refreshCounter,
}) => {
  const { stop: fetchedStation } = useStation(stationIn, refreshCounter);

  // fetchedStation fetching state
  if (!fetchedStation) {
    return (
      <View style={styles.stationContainer}>
        <StationDetailsComponent
          stopName={stationIn.stopName}
          headsign={stationIn.n_headsign}
          trainLength={undefined}
          coordinates={stationIn.coordinates}
        />
        <TrainsLoadingPlaceholder />
      </View>
    );
  }

  // trains available, might need some reworking....
  return (
    <View style={styles.stationContainer}>
      {fetchedStation.n_headsign && (
        <>
          <StationDetailsComponent
            stopName={fetchedStation.stopName}
            headsign={fetchedStation.n_headsign}
            trainLength={fetchedStation?.n_trains?.length}
            coordinates={fetchedStation.coordinates}
          />

          {fetchedStation.n_trains === null ? (
            <TrainsLoadingPlaceholder />
          ) : (
            <TrainComponent trains={fetchedStation.n_trains} />
          )}
        </>
      )}

      {fetchedStation.s_headsign && (
        <>
          <StationDetailsComponent
            stopName={fetchedStation.stopName}
            headsign={fetchedStation.s_headsign}
            trainLength={fetchedStation?.s_trains?.length}
            coordinates={fetchedStation.coordinates}
          />
          {fetchedStation.s_trains === null ? (
            <TrainsLoadingPlaceholder />
          ) : (
            <TrainComponent trains={fetchedStation.s_trains} />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stationContainer: {
    paddingHorizontal: 8,
  },
});
