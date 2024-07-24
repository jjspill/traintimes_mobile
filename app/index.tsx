import { StationFetchProvider } from '@/contexts/StationFetchContext';
import TrainsContainer from '@/screens/TrainsContainer';
import { Text, View } from 'react-native';

export default function Index() {
  return (
    <>
      {/* <Text>Edit app/index.tsx to edit this screen.</Text> */}
      <StationFetchProvider>
        <TrainsContainer />
      </StationFetchProvider>
    </>
  );
}
