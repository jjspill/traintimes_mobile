import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Location } from '../types/types';

export const AddressInput = ({
  onFocus,
  onBlur,
  setCoordinates,
}: {
  onFocus: () => void;
  onBlur: () => void;
  setCoordinates: (location: Location) => void;
}) => {
  const handleSelect = (data: any, details: any | null) => {
    const lat = details?.geometry.location.lat;
    const lng = details?.geometry.location.lng;

    if (lat && lng) {
      console.log(lat, lng);
      setCoordinates({ lat, lng });
    }
  };

  return (
    <View style={{ height: '100%' }}>
      <Text style={[styles.title, { backgroundColor: 'white' }]}>
        Search Location
      </Text>
      <GooglePlacesAutocomplete
        placeholder="Enter an address"
        onPress={handleSelect}
        minLength={2}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
          components: 'country:us',
        }}
        textInputProps={{
          onFocus,
          onBlur,
          placeholderTextColor: '#5d5d5d',
          clearButtonMode: 'never',
          clearTextOnFocus: true,
        }}
        fetchDetails={true}
        styles={{
          textInputContainer: styles.textInputContainer,
          textInput: styles.textInput,
          listView: styles.listView,
        }}
        enablePoweredByContainer={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  textInputContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  textInput: {
    height: 40,
    fontSize: 18,
    borderWidth: 1,
    paddingLeft: 10,
    borderColor: '#c8c7cc',
    backgroundColor: 'white',
  },
  listView: {
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: 'white',
    height: '100%',
    zIndex: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
});
