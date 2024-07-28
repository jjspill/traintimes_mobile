import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Location } from '@/types/types'; // Ensure you import necessary types
import { Default } from '@/constants/Fonts';

interface StationDetailsProps {
  stopName: string;
  headsign: string;
  trainLength: number;
  coordinates: Location;
}

const StationDetailsComponentMap: React.FC<StationDetailsProps> = ({
  stopName,
  headsign,
  trainLength,
  coordinates,
}) => {
  if (trainLength === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <View style={styles.content}>
        <Text style={styles.stationName}>{stopName}</Text>
        <Text style={styles.headsign}>{headsign}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingVertical: 5,
    paddingHorizontal: 6,
    marginVertical: 4,
    borderRadius: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 3,
    paddingTop: 5,
  },
  stationName: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Default.fontFamily,
    marginBottom: 1,
  },
  headsign: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'normal',
    fontFamily: Default.fontFamily,
  },
  line: {
    height: 2,
    backgroundColor: '#FFFFFF',
    width: '100%',
  },
});

export default StationDetailsComponentMap;
