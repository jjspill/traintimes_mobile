import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import StationDetailsComponent from './StationsDetailsComponent';
import TrainsLoadingPlaceholder from './TrainsLoadingPlaceholder';
import TrainComponent from './TrainsComponent';
import DirectionsButton from './DirectionsComponent';
import { useStation } from '@/hooks/useStation';
import { Station } from '@/types/types';
import { getLineFamily } from '@/utils/trainUtils';
import TrainComponentMap from './TrainsComponentMap';
import StationDetailsComponentMap from './StationsDetailsComponentMap';

interface AsyncStationComponentProps {
  stationIn: Station;
}

const AsyncStationComponentMap: React.FC<AsyncStationComponentProps> =
  React.memo(({ stationIn }) => {
    return (
      <View style={styles.stationContainer}>
        {stationIn.n_headsign && (
          <>
            <StationDetailsComponentMap
              stopName={stationIn.stopName}
              headsign={stationIn.n_headsign}
              trainLength={stationIn?.n_trains?.length!}
              coordinates={stationIn.coordinates}
            />

            {stationIn.n_trains === null ? (
              <TrainsLoadingPlaceholder />
            ) : (
              <TrainComponentMap trains={stationIn.n_trains} />
            )}
          </>
        )}

        {stationIn.s_headsign && (
          <>
            <StationDetailsComponentMap
              stopName={stationIn.stopName}
              headsign={stationIn.s_headsign}
              trainLength={stationIn?.s_trains?.length!}
              coordinates={stationIn.coordinates}
            />
            {stationIn.s_trains === null ? (
              <TrainsLoadingPlaceholder />
            ) : (
              <TrainComponentMap trains={stationIn.s_trains} />
            )}
          </>
        )}
      </View>
    );
  });

const styles = StyleSheet.create({
  stationContainer: {
    paddingHorizontal: 4,
  },
});

export default AsyncStationComponentMap;
