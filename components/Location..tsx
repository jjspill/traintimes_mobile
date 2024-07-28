import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const GooglePlacesInput = () => {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);

  const fetchPlaces = async (text: string) => {
    if (text.length > 2) {
      // Trigger search for more than 2 characters
      const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(text)}&key=${apiKey}&language=en&components=country:us`;
      try {
        const response = await fetch(apiUrl);
        const json = await response.json();
        setPlaces(json.predictions);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    } else {
      setPlaces([]); // Clear results if input length is less than 3
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchPlaces(query);
    }, 500); // Debounce the API request by 500ms
    return () => clearTimeout(timeoutId);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search for places"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={places}
        keyExtractor={(item: any) => item.place_id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default GooglePlacesInput;
