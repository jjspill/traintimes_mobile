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
import AsyncStationComponent from '@/components/AsyncTrainComponent';
import { useNearestStations } from '@/hooks/useNearestStations';
import useCurrentLocation from '@/hooks/useLocation';
import { useContinuousCountdown } from '@/hooks/useCountdown';
import FrownFace from '@/components/FrownFace';
import Header from '@/components/HeaderComponent';
import { StatusBox } from '@/components/StatusBox';
import { useStationFetch } from '@/contexts/StationFetchContext';
import { getLineFamily } from '@/utils/trainUtils';
import { Station } from '@/types/types';

export const TrainsContainer = ({
  selectedFamilies,
}: {
  selectedFamilies: string[];
}) => {
  const [searchRadius, setSearchRadius] = useState(0.25);
  const { refreshCounter, resetCountdown } = useContinuousCountdown();
  const { location, errorMsg } = useCurrentLocation();
  const { nearestStations } = useNearestStations(location, searchRadius);
  const { activeFetches, lastFetchTime } = useStationFetch();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const onRefresh = useCallback(() => {
    setSearchRadius(0.5);
    setRefreshing(true);
    resetCountdown();
  }, []);

  useEffect(() => {
    if (activeFetches === 0) {
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [activeFetches]);

  const handleLoadMore = () => {
    if (!loadingMore && nearestStations.length < 20) {
      setLoadingMore(true);
      setSearchRadius((prev) => prev + 0.25);
    }
  };

  const renderItem = ({ item }: { item: Station }) => {
    if (
      selectedFamilies.length === 0 ||
      !selectedFamilies.includes(getLineFamily(item.stopId))
    ) {
      return null;
    }

    return (
      <AsyncStationComponent stationIn={item} refreshCounter={refreshCounter} />
    );
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
        keyExtractor={(item) => item.stopId}
        renderItem={renderItem}
        ListHeaderComponent={() => (
          <>
            <StatusBox
              lastRefreshTime={lastFetchTime}
              currentLocation={location}
            />
          </>
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
        ListFooterComponent={
          <Text>
            Num Stations: {nearestStations.length}
            Search Radius: {searchRadius}
          </Text>
          // loadingMore ? (
          //   <ActivityIndicator
          //     size="large"
          //     color="#black"
          //     style={{ margin: 20 }}
          //   />
          // ) : null
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
