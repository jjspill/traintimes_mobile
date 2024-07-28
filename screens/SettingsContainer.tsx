import React, { useState, useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import Header from '@/components/HeaderComponent';
import FamilySelector from '@/components/FamilySelector';
import { AddressInput } from '@/components/LocationSelector';
import { Location } from '@/types/types';

export const SettingsContainer = ({
  onSelectionChange,
  setCustomLocation,
}: {
  onSelectionChange: (selectedFamilies: string[]) => void;
  setCustomLocation: (location: Location) => void;
}) => {
  const addressInputHeight = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  const onFocusInput = () => {
    Animated.timing(addressInputHeight, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const onBlurInput = () => {
    Animated.timing(addressInputHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const addressInputStyle = addressInputHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight * 0.11, screenHeight],
  });

  const familySelectorOpacity = addressInputHeight.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="black" />
      <Header title="Settings" />
      <Animated.View
        style={{ height: addressInputStyle, backgroundColor: 'white' }}
      >
        <AddressInput
          onFocus={onFocusInput}
          onBlur={onBlurInput}
          setCoordinates={setCustomLocation}
        />
      </Animated.View>
      <Animated.View style={{ flex: 1, opacity: familySelectorOpacity }}>
        <FamilySelector onSelectionChange={onSelectionChange} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
  },
});

export default SettingsContainer;
