import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { AsyncStationComponent } from '@/components/AsyncTrainComponent';
import { useNearestStations } from '@/hooks/useNearestStations';
import useCurrentLocation from '@/hooks/useLocation';
import { useContinuousCountdown } from '@/hooks/useCountdown';
import FrownFace from '@/components/FrownFace';
import Header from '@/components/HeaderComponent';
import { StatusBox } from '@/components/StatusBox';
import { useStationFetch } from '@/contexts/StationFetchContext';
import { set } from 'date-fns';

export const TrainsContainer = () => {
  const [searchRadius, setSearchRadius] = useState(0.1);
  const { timer, refreshCounter, resetCountdown } = useContinuousCountdown();
  const { location, errorMsg } = useCurrentLocation();
  const { nearestStations } = useNearestStations(location, searchRadius);
  const { activeFetches, lastFetchTime } = useStationFetch();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    resetCountdown();
    // Optionally reset the searchRadius here if needed
  }, []);

  useEffect(() => {
    if (activeFetches === 0) {
      setRefreshing(false);
      // setLoadingMore(false);
    }
  }, [activeFetches]);

  const handleLoadMore = () => {
    if (!loadingMore) {
      setLoadingMore(true);
      setSearchRadius((prev) => prev + 0.1);
    }
  };

  if (nearestStations.length === 0) {
    return <FrownFace caption={errorMsg || 'No location found'} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Header />
      <FlatList
        data={nearestStations}
        keyExtractor={(item, index) => `station-${index}`}
        renderItem={({ item }) => (
          <AsyncStationComponent
            stationIn={item}
            refreshCounter={refreshCounter}
          />
        )}
        ListHeaderComponent={() => (
          <StatusBox
            lastRefreshTime={lastFetchTime}
            currentLocation={location}
          />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'white'}
          />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          loadingMore ? (
            <ActivityIndicator
              size="large"
              color="#black"
              style={{ margin: 20 }}
            />
          ) : null
        }
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    backgroundColor: 'white',
    // alignItems: 'center',
  },
});

export default TrainsContainer;

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   StatusBar,
//   RefreshControl,
// } from 'react-native';
// import { AsyncStationComponent } from '@/components/AsyncTrainComponent';
// import { useNearestStations } from '@/hooks/useNearestStations';
// import useCurrentLocation from '@/hooks/useLocation';
// import { useContinuousCountdown } from '@/hooks/useCountdown';
// import FrownFace from '@/components/FrownFace';
// import Header from '@/components/HeaderComponent';
// import { useStationFetch } from '@/contexts/StationFetchContext';
// import { StatusBox } from '@/components/StatusBox';

// export const TrainsContainer = () => {
//   const [searchRadius, setSearchRadius] = useState(0.5);
//   const { timer, refreshCounter, resetCountdown } = useContinuousCountdown();
//   const { location, errorMsg } = useCurrentLocation();
//   const { nearestStations } = useNearestStations(location, searchRadius);
//   const { activeFetches, lastFetchTime } = useStationFetch();
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = React.useCallback(() => {
//     setRefreshing(true);
//     resetCountdown();
//   }, []);

//   useEffect(() => {
//     if (activeFetches === 0) {
//       setRefreshing(false);
//     }
//   }, [activeFetches]);

//   if (nearestStations.length === 0) {
//     return <FrownFace caption={errorMsg || 'No location found'} />;
//   }

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="light-content" backgroundColor="black" />
//       <Header />

//       {nearestStations.length > 0 && (
//         <ScrollView
//           style={styles.scrollArea}
//           contentContainerStyle={styles.contentContainer}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//           refreshControl={
//             <RefreshControl
//               refreshing={refreshing}
//               onRefresh={onRefresh}
//               tintColor={'white'}
//             />
//           }
//         >
//           <StatusBox
//             lastRefreshTime={lastFetchTime}
//             currentLocation={location}
//           />
//           <View style={styles.stations}>
//             {nearestStations.map((station, index) => (
//               <AsyncStationComponent
//                 key={index}
//                 stationIn={station}
//                 refreshCounter={refreshCounter}
//               />
//             ))}
//           </View>
//         </ScrollView>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//     width: '100%',
//   },
//   safeArea: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   scrollArea: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   contentContainer: {
//     backgroundColor: 'white',
//     alignItems: 'center',
//   },
//   header: {
//     backgroundColor: 'black',
//     alignItems: 'center',
//     width: '100%',
//   },
//   whiteLine: {
//     height: 2,
//     width: '95%',
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 36,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   stations: {
//     width: '100%',
//     padding: 16,
//     paddingTop: 0,
//   },
// });

// export default TrainsContainer;
