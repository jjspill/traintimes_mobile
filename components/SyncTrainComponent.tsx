import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StationDetailsComponent from './StationsDetailsComponent';
import TrainsLoadingPlaceholder from './TrainsLoadingPlaceholder';
import TrainComponent from './TrainsComponent';
import DirectionsButton from './DirectionsComponent';
import { useStation } from '@/hooks/useStation';
import { Station } from '@/types/types';
import { getLineFamily } from '@/utils/trainUtils';

interface SyncStationComponentProps {
  fetchedStation: Station;
  refreshCounter: number;
}

const SyncStationComponent: React.FC<SyncStationComponentProps> = React.memo(
  ({ fetchedStation, refreshCounter }) => {
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
      prevProps.fetchedStation.stopId === nextProps.fetchedStation.stopId
    );
  },
);

const styles = StyleSheet.create({
  stationContainer: {
    paddingHorizontal: 8,
  },
});

export default SyncStationComponent;
