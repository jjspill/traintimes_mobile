import { StyleSheet, View, Text } from 'react-native';
import { Location } from '@/types/types';

interface StatusBoxProps {
  lastRefreshTime: string;
  currentLocation: Location | null;
}

export const StatusBox: React.FC<StatusBoxProps> = ({
  lastRefreshTime,
  currentLocation,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Last Refresh: {lastRefreshTime}</Text>
      {currentLocation !== null && (
        <Text style={styles.text}>
          Location: {currentLocation.lat}, {currentLocation.lng}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 8,
    paddingTop: 12,
    alignItems: 'center',
  },
  text: {
    color: 'gray',
    fontSize: 16,
  },
});
