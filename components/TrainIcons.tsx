import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const NComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
      <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
        N
      </Text>
    </View>
  );
};

export const QComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
      <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
        Q
      </Text>
    </View>
  );
};
export const RComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
      <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
        R
      </Text>
    </View>
  );
};
export const WComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
      <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
        W
      </Text>
    </View>
  );
};

export const BComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
      <Text style={styles.text}>B</Text>
    </View>
  );
};
export const DComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
      <Text style={styles.text}>D</Text>
    </View>
  );
};
export const FComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
      <Text style={styles.text}>F</Text>
    </View>
  );
};
export const MComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
      <Text style={styles.text}>M</Text>
    </View>
  );
};
export const OneComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
      <Text style={styles.text}>1</Text>
    </View>
  );
};
export const TwoComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
      <Text style={styles.text}>2</Text>
    </View>
  );
};
export const ThreeComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
      <Text style={styles.text}>3</Text>
    </View>
  );
};
export const FourComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
      <Text style={styles.text}>4</Text>
    </View>
  );
};
export const FiveComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
      <Text style={styles.text}>5</Text>
    </View>
  );
};
export const SixComponent = () => {
  return (
    <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
      <Text style={styles.text}>6</Text>
    </View>
  );
};

export const SixXComponent = () => {
  return (
    <View style={[styles.diamond, { backgroundColor: '#00933c' }]}>
      <Text style={styles.diamondText}>6</Text>
    </View>
  );
};

export const AComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
    <Text style={styles.text}>A</Text>
  </View>
);

export const CComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
    <Text style={styles.text}>C</Text>
  </View>
);

export const EComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
    <Text style={styles.text}>E</Text>
  </View>
);

export const JComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#996633' }]}>
    <Text style={styles.text}>J</Text>
  </View>
);

export const ZComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#996633' }]}>
    <Text style={styles.text}>Z</Text>
  </View>
);

export const LComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#a6a9ac' }]}>
    <Text style={styles.text}>L</Text>
  </View>
);

export const SComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#a6a9ac' }]}>
    <Text style={styles.text}>S</Text>
  </View>
);

export const SevenComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#ba33ad' }]}>
    <Text style={styles.text}>7</Text>
  </View>
);

export const SevenXComponent = () => (
  <View style={[styles.diamond, { backgroundColor: '#ba33ad' }]}>
    <Text style={styles.diamondText}>7</Text>
  </View>
);

export const GComponent = () => (
  <View style={[styles.circle, { backgroundColor: '#6cbe44' }]}>
    <Text style={styles.text}>G</Text>
  </View>
);

export const UnknownTrainComponent = ({ routeId }: { routeId: string }) => (
  <View style={[styles.circle, { backgroundColor: 'slategray' }]}>
    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
      {routeId}
    </Text>
  </View>
);

export const trainIconMap: { [key: string]: FunctionComponent } = {
  N: NComponent,
  Q: QComponent,
  R: RComponent,
  W: WComponent,
  B: BComponent,
  D: DComponent,
  F: FComponent,
  M: MComponent,
  '1': OneComponent,
  '2': TwoComponent,
  '3': ThreeComponent,
  '4': FourComponent,
  '5': FiveComponent,
  '6': SixComponent,
  '6X': SixXComponent,
  A: AComponent,
  C: CComponent,
  E: EComponent,
  J: JComponent,
  Z: ZComponent,
  L: LComponent,
  S: SComponent,
  '7': SevenComponent,
  '7X': SevenXComponent,
  G: GComponent,
};

export const trainFamilyComponents: Record<string, React.FC[]> = {
  'Lexington Avenue': [FourComponent, FiveComponent, SixComponent],
  '6 Avenue': [BComponent, DComponent, FComponent, MComponent],
  Broadway: [NComponent, QComponent, RComponent, WComponent],
  '7 Avenue': [OneComponent, TwoComponent, ThreeComponent],
  '8 Avenue': [AComponent, CComponent, EComponent],
  'Nassau Street': [JComponent, ZComponent],
  Flushing: [SevenComponent],
  '14 Street': [LComponent],
  Crosstown: [GComponent],
  Shuttle: [SComponent],
};

const styles = StyleSheet.create({
  circle: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    // transform: [{ rotate: '45deg' }],
  },
  diamond: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '45deg' }],
    marginRight: 4,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  diamondText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '-45deg' }],
  },
});
