import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Svg, { Path, G } from 'react-native-svg';
import Header from '@/components/HeaderComponent';

const FrownFace = ({ caption }: { caption: string }) => {
  return (
    <>
      <Header />
      <View style={styles.container}>
        <Svg height="100" width="100" viewBox="0 0 90 90">
          <G fill="#000000">
            <Path d="M 45 0 C 20.187 0 0 20.187 0 45 c 0 24.813 20.187 45 45 45 c 24.813 0 45 -20.187 45 -45 C 90 20.187 69.813 0 45 0 z M 30.852 26.682 c 3.866 0 7 3.134 7 7 c 0 3.866 -3.134 7 -7 7 c -3.866 0 -7 -3.134 -7 -7 C 23.852 29.816 26.986 26.682 30.852 26.682 z M 64.404 64.656 c -0.692 0.848 -1.698 1.286 -2.713 1.286 c -0.778 0 -1.563 -0.259 -2.212 -0.789 c -4.136 -3.379 -9.143 -5.165 -14.479 -5.165 s -10.344 1.786 -14.479 5.164 c -1.496 1.224 -3.702 1.002 -4.925 -0.495 s -1.001 -3.702 0.496 -4.925 c 5.322 -4.35 12.038 -6.744 18.908 -6.744 s 13.585 2.395 18.907 6.743 C 65.404 60.955 65.627 63.16 64.404 64.656 z M 59.148 40.682 c -3.866 0 -7 -3.134 -7 -7 c 0 -3.866 3.134 -7 7 -7 c 3.866 0 7 3.134 7 7 C 66.148 37.548 63.014 40.682 59.148 40.682 z" />
          </G>
        </Svg>
        <Text style={styles.caption}>{caption}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    zIndex: -1,
  },
  caption: {
    fontSize: 16,
    paddingTop: 10,
  },
  header: {
    backgroundColor: 'black',
    alignItems: 'center',
    width: '100%',
  },
  whiteLine: {
    height: 2,
    width: '95%',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FrownFace;
