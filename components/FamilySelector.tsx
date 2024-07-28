import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { trainFamilyComponents } from './TrainIcons';

const FamilySelector = ({
  onSelectionChange,
}: {
  onSelectionChange: (selectedFamilies: string[]) => void;
}) => {
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>(
    Object.keys(trainFamilyComponents),
  );

  const handleSelectAll = useCallback(() => {
    setSelectedFamilies(Object.keys(trainFamilyComponents));
  }, []);

  const handleDeselectAll = useCallback(() => {
    setSelectedFamilies([]);
  }, []);

  const toggleFamily = useCallback((familyName: string) => {
    setSelectedFamilies((current) =>
      current.includes(familyName)
        ? current.filter((name) => name !== familyName)
        : [...current, familyName],
    );
  }, []);

  useEffect(() => {
    onSelectionChange(selectedFamilies);
  }, [selectedFamilies, onSelectionChange]);

  const groupedFamilies = [
    ['Broadway', '6 Ave'],
    ['Lexington Ave', '7 Ave'],
    ['8 Ave', 'Nassau St', 'Flushing'],
    ['14 St', 'Crosstown', 'Shuttle'],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Train Lines</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleSelectAll}>
          <Text>Select All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDeselectAll}>
          <Text>Deselect All</Text>
        </TouchableOpacity>
      </View>
      {groupedFamilies.map((group, index) => (
        <View key={index} style={styles.row}>
          {group.map((familyName) => (
            <FamilyBox
              key={familyName}
              familyName={familyName}
              isSelected={selectedFamilies.includes(familyName)}
              toggleFamily={toggleFamily}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const FamilyBox = ({
  familyName,
  isSelected,
  toggleFamily,
}: {
  familyName: string;
  isSelected: boolean;
  toggleFamily: (family: string) => void;
}) => {
  const backgroundColor = isSelected ? '#4CAF50' : '#F5F5F5';

  return (
    <TouchableOpacity
      onPress={() => toggleFamily(familyName)}
      style={[styles.box, { backgroundColor }]}
      activeOpacity={0.3}
    >
      <View style={[styles.boxContent]}>
        <Text style={styles.familyName}>{familyName}</Text>
        <View style={styles.iconsContainer}>
          {trainFamilyComponents[familyName].map((TrainIcon, index) => (
            <View key={index} style={{ marginHorizontal: 1 }}>
              <TrainIcon key={index} scale={0.8} />
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
  },
  box: {
    flex: 1,
    margin: 5,
    padding: 10,
    paddingHorizontal: 0,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 5,
    paddingHorizontal: 5,
  },
  familyName: {
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  boxContent: {
    width: '100%',
    alignItems: 'center',
  },
});

export default FamilySelector;
