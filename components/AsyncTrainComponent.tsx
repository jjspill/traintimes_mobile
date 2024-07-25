import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StationDetailsComponent from './StationsDetailsComponent';
import TrainsLoadingPlaceholder from './TrainsLoadingPlaceholder';
import TrainComponent from './TrainsComponent';
import DirectionsButton from './DirectionsComponent';
import { useStation } from '@/hooks/useStation';
import { Station } from '@/types/types';

interface AsyncStationComponentProps {
  stationIn: Station;
  refreshCounter: number;
}

const AsyncStationComponent: React.FC<AsyncStationComponentProps> = React.memo(
  ({ stationIn, refreshCounter }) => {
    const { stop: fetchedStation } = useStation(stationIn, refreshCounter);

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
  },
  (prevProps, nextProps) => {
    return (
      prevProps.refreshCounter === nextProps.refreshCounter &&
      prevProps.stationIn.stopId === nextProps.stationIn.stopId
    );
  },
);

const styles = StyleSheet.create({
  stationContainer: {
    paddingHorizontal: 8,
  },
});

export default AsyncStationComponent;
