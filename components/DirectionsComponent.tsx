import React from 'react';
import { TouchableOpacity, Text, Platform, Linking } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const DirectionsButton = ({ lat, lng }: { lat: number; lng: number }) => {
  const destinationEncoded = `${lat},${lng}`;

  const directionsUrl =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?daddr=${destinationEncoded}&dirflg=w`
      : `https://www.google.com/maps/dir/?api=1&destination=${destinationEncoded}&travelmode=walking`;

  const handlePress = () => {
    Linking.openURL(directionsUrl);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{ padding: 1, backgroundColor: '#000000', borderRadius: 4 }}
    >
      <MapIcon />
    </TouchableOpacity>
  );
};

const MapIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="white">
    <Path d="M12 2a7.008 7.008 0 0 0-7 7c0 5.353 6.036 11.45 6.293 11.707l.707.707.707-.707C12.964 20.45 19 14.353 19 9a7.008 7.008 0 0 0-7-7zm0 16.533C10.471 16.825 7 12.553 7 9a5 5 0 0 1 10 0c0 3.546-3.473 7.823-5 9.533z" />
    <Path d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z" />
  </Svg>
);

export default DirectionsButton;
