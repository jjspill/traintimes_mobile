import React from 'react';
import { View, StyleSheet } from 'react-native';

const TrainsLoadingPlaceholder = () => {
  return (
    <View style={styles.container}>
      {Array.from({ length: 4 }).map((_, index) => (
        <View
          key={index}
          style={[
            styles.item,
            { borderBottomWidth: index === 3 ? 0 : StyleSheet.hairlineWidth },
          ]}
        >
          <View style={styles.circle} />
          <View style={styles.bar} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#DCDCDC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#B0BEC5',
  },
  bar: {
    width: '25%',
    height: 16,
    borderRadius: 8,
    backgroundColor: '#B0BEC5',
  },
});

export default TrainsLoadingPlaceholder;
