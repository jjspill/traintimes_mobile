import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Location as ILocation } from '@/types/types';

export default function useCurrentLocation() {
  const [location, setLocation] = useState<ILocation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | null = null;

    async function subscribeToLocationUpdates() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        locationSubscription = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Highest, timeInterval: 10000 },
          (currentLocation) => {
            // setLocation({
            //   lat: currentLocation.coords.latitude,
            //   lng: currentLocation.coords.longitude,
            // });
            setLocation({
              lat: 40.7527,
              lng: -73.9772,
            });
          },
        );
      } catch (error) {
        setErrorMsg('Failed to get location');
        console.error(error);
      }
    }

    subscribeToLocationUpdates();

    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return { location, errorMsg };
}
