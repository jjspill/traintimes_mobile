import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  GestureResponderEvent,
  Image,
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import AsyncStationComponent2 from './TrainComponentMap';
import useCurrentLocation from '@/hooks/useLocation';
import { useNearestStations } from '@/hooks/useNearestStationsMap';
import { useStationMap } from '@/hooks/useStationMap';
import GeoJsons from './GeoJsons';
import * as ExpoLocation from 'expo-location';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

async function getLocationPermission() {
  let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission to access location was denied');
    return;
  }
}

interface TouchInfo {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const screenWidth = Dimensions.get('window').width;

const MapScreen = ({ onSwipeBack }: { onSwipeBack: any }) => {
  getLocationPermission();
  const { location, errorMsg } = useCurrentLocation();
  const { nearestStations } = useNearestStations(location);
  const stops = useStationMap(nearestStations);
  const [touchInfo, setTouchInfo] = useState<TouchInfo | null>(null);
  const mapRef = React.useRef<MapView>(null);

  const handleTouchStart = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setTouchInfo({
      startX: locationX,
      startY: locationY,
      endX: 0,
      endY: 0,
    });
  };

  const handleTouchEnd = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    setTouchInfo((prevInfo) => ({
      ...prevInfo!,
      endX: locationX,
      endY: locationY,
    }));

    if (touchInfo) {
      const swipeDistance = touchInfo.startX - locationX;
      if (
        swipeDistance > screenWidth / 4 &&
        touchInfo.startX > screenWidth - 50 &&
        touchInfo.startX > locationX
      ) {
        console.log('swiped left', touchInfo.startX, locationX);
        onSwipeBack();
      }
    }
  };

  const navigateToUserLocation = () => {
    if (location && mapRef?.current) {
      mapRef.current.animateToRegion(
        {
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        500,
      );
    }
  };

  if (!location || !stops.stops) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg || 'Waiting for location...'}</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={styles.fullFlex}
    >
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
        showsMyLocationButton={true}
      >
        <GeoJsons />
        {stops.stops &&
          stops.stops.map((station) => (
            <Marker
              key={station.stopId}
              coordinate={{
                latitude: station.coordinates.lat,
                longitude: station.coordinates.lng,
              }}
              title={station.stopName}
            >
              <View style={styles.markerStyle}>
                <Image
                  source={require('../assets/images/marker.png')}
                  style={styles.imageStyle}
                />
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <AsyncStationComponent2 stationIn={station} />
                </View>
              </Callout>
            </Marker>
          ))}
        {/* <View style={styles.tempView}></View> */}
        <TouchableOpacity
          onPress={() => onSwipeBack()}
          style={styles.arrowStyle}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-forward-outline" size={24} color="#6a6d66" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={navigateToUserLocation}
          style={styles.locationButton}
        >
          <Ionicons name="locate-outline" size={24} color="#6a6d66" />
        </TouchableOpacity>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullFlex: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerStyle: {
    width: 30,
    height: 30,
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  customMarker: {
    width: 30,
    height: 30,
    backgroundColor: 'blue',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calloutContainer: {
    width: 250,
    height: 'auto',
    paddingHorizontal: 2,
    paddingVertical: 2,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  arrowStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    padding: 10,
    // width: 30,
    // height: 30,
    bottom: 20,
    backgroundColor: '#f5f8f1',
    position: 'absolute',
    borderRadius: 10,
    borderColor: '#6a6d66',
    borderWidth: 1,
  },
  locationButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    right: 80,
    padding: 10,
    borderColor: '#6a6d66',
    borderWidth: 1,
    // width: 30,
    // height: 30,
    bottom: 20,
    backgroundColor: '#f5f8f1',
    position: 'absolute',
    borderRadius: 10,
  },
});

export default MapScreen;
