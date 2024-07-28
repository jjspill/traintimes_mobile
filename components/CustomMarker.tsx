import MapView, { Marker, Callout } from 'react-native-maps';
import { View, Text, StyleSheet } from 'react-native';
import { Station } from '@/types/types';

export const CustomMarker = ({ station }: { station: any }) => (
  <Marker
    coordinate={{
      latitude: station.latitude,
      longitude: station.longitude,
    }}
    title={station.name}
  >
    <View style={styles.markerStyle}>
      <Text style={styles.markerText}>M</Text>
    </View>
    <Callout tooltip>
      <View style={styles.calloutContainer}>
        <Text style={styles.calloutTitle}>{station.name}</Text>
        <Text style={styles.calloutText}>Next train: 5 mins</Text>
      </View>
    </Callout>
  </Marker>
);

const styles = StyleSheet.create({
  markerStyle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 150,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  calloutTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutText: {
    fontSize: 12,
  },
});
