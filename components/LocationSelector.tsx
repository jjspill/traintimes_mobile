import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Location } from '../types/types';

export const AddressInput = ({
  onFocus,
  onBlur: propsOnBlur, // Rename to avoid confusion with local onBlur
  setCoordinates,
}: {
  onFocus: () => void;
  onBlur: () => void;
  setCoordinates: (location: Location | undefined) => void;
}) => {
  const [inputValue, setInputValue] = useState(''); // Track the input value

  const handleSelect = (data: any, details: any | null) => {
    if (details?.geometry.location) {
      const { lat, lng } = details.geometry.location;
      setCoordinates({ lat, lng });
    } else {
      console.log('Failed to fetch location details');
      setCoordinates(undefined);
    }
  };

  const handleChangeText = (text: string) => {
    setInputValue(text);
    if (text === '') {
      console.log('Input cleared');
      setCoordinates(undefined);
    }
  };

  const handleBlur = () => {
    propsOnBlur();
    if (inputValue === '') {
      console.log('Input was empty on blur');
      setCoordinates(undefined);
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
        onFail={(error) =>
          console.error('Failed to fetch location details:', error)
        }
        textInputProps={{
          onFocus,
          onBlur: handleBlur,
          onChangeText: handleChangeText,
          value: inputValue,
          placeholderTextColor: '#5d5d5d',
          clearButtonMode: 'always',
          clearTextOnFocus: true,
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
          language: 'en',
          components: 'country:us',
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
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TextInput,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';

// // Define location type for TypeScript
// interface Location {
//   lat: number;
//   lng: number;
// }

// interface Props {
//   onFocus: () => void;
//   onBlur: () => void;
//   setCoordinates: (location: Location) => void;
// }

// export const AddressInput: React.FC<Props> = ({
//   onFocus,
//   onBlur,
//   setCoordinates,
// }) => {
//   const [address, setAddress] = useState<string>('');
//   const [showInput, setShowInput] = useState<boolean>(false);
//   const inputOpacity = useRef(new Animated.Value(0)).current;

//   const handleSearchPress = () => {
//     Animated.timing(inputOpacity, {
//       toValue: showInput ? 0 : 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//     setShowInput(!showInput);
//   };

//   const fetchLocationDetails = async (placeId: string) => {
//     const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${process.env.EXPO_PUBLIC_GOOGLE_API_KEY}`;
//     try {
//       const response = await fetch(detailsUrl);
//       const json = await response.json();
//       const { lat, lng } = json.result.geometry.location;
//       setCoordinates({ lat, lng });
//     } catch (error) {
//       console.error('Failed to fetch location details:', error);
//     }
//   };

//   const handleSelectLocation = async (placeId: string) => {
//     await fetchLocationDetails(placeId);
//     setShowInput(false); // Optionally hide the input after selection
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity onPress={handleSearchPress} style={styles.button}>
//         <Text style={styles.buttonText}>Search Address</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.inputContainer, { opacity: inputOpacity }]}>
//         <TextInput
//           style={styles.textInput}
//           placeholder="Enter an address"
//           onChangeText={setAddress}
//           onFocus={onFocus}
//           onBlur={onBlur}
//         />
//         {/* Placeholder for list - Replace with your own list component */}
//         {address.length > 0 && (
//           <TouchableOpacity
//             onPress={() => handleSelectLocation('place_id_here')}
//           >
//             <Text>Select this location</Text>
//           </TouchableOpacity>
//         )}
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 20,
//   },
//   inputContainer: {
//     width: '100%',
//     paddingHorizontal: 10,
//   },
//   textInput: {
//     height: 40,
//     fontSize: 18,
//     borderWidth: 1,
//     paddingLeft: 10,
//     borderColor: '#c8c7cc',
//     marginTop: 20,
//   },
//   button: {
//     backgroundColor: 'blue',
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default AddressInput;
