import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { StationFetchProvider } from '@/contexts/StationFetchContext';
import SettingsContainer from '@/screens/SettingsContainer';
import TrainsContainer from '@/screens/TrainsContainer';
import { Location } from '@/types/types';
import MapScreen from '@/components/MapView';

const Index = () => {
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [customLocation, setCustomLocation] = useState<Location>();
  const pagerRef = useRef<any>(null);

  const handleSwipeBack = () => {
    if (pagerRef.current) {
      pagerRef.current.setPage(1); // Assuming the main screen is at index 1
    }
  };

  return (
    <GestureHandlerRootView style={styles.fullFlex}>
      <PagerView style={styles.pagerView} initialPage={1} ref={pagerRef}>
        <View key="0">
          <MapScreen onSwipeBack={handleSwipeBack} />
        </View>
        <View key="1">
          <StationFetchProvider>
            <TrainsContainer
              selectedFamilies={selectedFamilies}
              customLocation={customLocation}
            />
          </StationFetchProvider>
        </View>
        <View key="2">
          <SettingsContainer
            onSelectionChange={setSelectedFamilies}
            setCustomLocation={setCustomLocation}
          />
        </View>
      </PagerView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    paddingHorizontal: 10,
  },
  fullFlex: {
    flex: 1,
  },
});

export default Index;

//     <>
//       {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
// <StationFetchProvider>
//   <TrainsContainer />
// </StationFetchProvider>
//     </>
//   );
// }
