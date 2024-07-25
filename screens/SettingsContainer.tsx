import React, { useState } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Header from '@/components/HeaderComponent';
import FamilySelector from '@/components/FamilySelector';

export const SettingsContainer = ({
  onSelectionChange,
}: {
  onSelectionChange: (selected: string[]) => void;
}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header title="Settings" />
      <FamilySelector onSelectionChange={onSelectionChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    backgroundColor: 'white',
    // alignItems: 'center',
  },
});

export default SettingsContainer;
