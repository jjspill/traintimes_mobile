import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Station } from '@/types/types';
import DirectionsButton from './DirectionsComponent';
import { Location } from '@/types/types';
import { Default } from '@/constants/Fonts';

const StationDetailsComponent = ({
  stopName,
  headsign,
  trainLength, // if 0, return nothing
  coordinates,
}: {
  stopName: string;
  headsign: string;
  trainLength: number | undefined;
  coordinates: Location;
}) => {
  // if (trainLength === 0) {
  //   return null;
  // }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.content}>
        <View style={styles.locationName}>
          <Text style={styles.stationName}>{stopName} Station</Text>
          <DirectionsButton lat={coordinates.lat} lng={coordinates.lng} />
        </View>
        <Text style={styles.headsign}>{headsign}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  line: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  locationName: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stationName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: Default.fontFamily,
    textAlign: 'center',
  },
  headsign: {
    color: '#FFFFFF',
    fontSize: 20,
    marginTop: 2,
    fontWeight: 'bold',
    fontFamily: Default.fontFamily,
  },
});

export default StationDetailsComponent;
