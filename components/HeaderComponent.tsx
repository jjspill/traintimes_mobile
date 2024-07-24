import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Header = () => {
  return (
    <>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: 'black' }}
        edges={['top']}
      />

      <View style={styles.header}>
        <View style={styles.whiteLine} />
        <Text style={styles.title}>Subway</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

export default Header;
