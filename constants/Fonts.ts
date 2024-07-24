import { Platform } from 'react-native';

export const Default = {
  fontFamily: Platform.select({
    ios: 'Helvetica',
    android: 'Roboto',
  }),
};
