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
import { set } from 'date-fns';
import { Link } from 'expo-router';
import EmojiPicker from '@/components/SwipeRightModal';
import CircleButton from '@/components/CircleButton';

export const TrainsContainer = () => {
  const [searchRadius, setSearchRadius] = useState(0.25);
  const { refreshCounter, resetCountdown } = useContinuousCountdown();
  const { location, errorMsg } = useCurrentLocation();
  const { nearestStations } = useNearestStations(location, searchRadius);
  const { activeFetches, lastFetchTime } = useStationFetch();
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  // ...rest of the code remains same

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  console.log('isModalVisible', isModalVisible);

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

  if (nearestStations.length === 0) {
    return <FrownFace caption={errorMsg || 'No location found'} />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <View style={{ top: 50, zIndex: 10 }}>
        <Text style={{ color: 'red' }}> HERE </Text>
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          {/* A list of emoji component will go here */}
          <Text>Emoji Picker</Text>
        </EmojiPicker>
        <CircleButton onPress={onAddSticker} />
      </View>

      <Header />
      <FlatList
        data={nearestStations}
        keyExtractor={(item) => item.stopId}
        renderItem={({ item }) => (
          <AsyncStationComponent
            stationIn={item}
            refreshCounter={refreshCounter}
          />
        )}
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
