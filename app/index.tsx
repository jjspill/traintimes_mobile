import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import { StationFetchProvider } from '@/contexts/StationFetchContext';
import SettingsContainer from '@/screens/SettingsContainer';
import TrainsContainer from '@/screens/TrainsContainer';
import { Location } from '@/types/types';

const Index = () => {
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [customLocation, setCustomLocation] = useState<Location>();

  return (
    <GestureHandlerRootView style={styles.fullFlex}>
      <PagerView style={styles.pagerView} initialPage={0}>
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
