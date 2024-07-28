import React, { FunctionComponent } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Base size definitions
const BASE_CIRCLE_SIZE = 32;
const BASE_DIAMOND_SIZE = 28;

interface StyleProps {
  baseSize: number;
  scale: number;
  isDiamond?: boolean;
}

interface TrainIconProps {
  scale?: number;
}

const getStyle = ({
  baseSize,
  scale,
  isDiamond = false,
}: StyleProps): ViewStyle => {
  return {
    width: baseSize * scale,
    height: baseSize * scale,
    borderRadius: isDiamond ? 0 : (baseSize * scale) / 2,
    transform: isDiamond ? [{ rotate: '45deg' }] : [],
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    marginRight: isDiamond ? 4 : 0,
  };
};

interface TrainComponentProps {
  color: string;
  label: string;
  scale?: number;
  isDiamond?: boolean;
}

const TrainComponent = ({
  color,
  label,
  scale = 1,
  isDiamond = false,
}: TrainComponentProps) => {
  const size = isDiamond ? BASE_DIAMOND_SIZE : BASE_CIRCLE_SIZE;
  const style: ViewStyle = getStyle({ baseSize: size, scale, isDiamond });
  const textStyle: TextStyle = {
    fontSize: 24 * scale,
    fontWeight: 'bold',
    color: 'white',
    transform: isDiamond ? [{ rotate: '-45deg' }] : [],
  };

  return (
    <View style={[style, { backgroundColor: color }]}>
      <Text style={textStyle}>{label}</Text>
    </View>
  );
};

// Define each component with specific colors and labels
export const NComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#fbcc0a" label="N" {...props} />;
export const QComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#fbcc0a" label="Q" {...props} />;
export const RComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#fbcc0a" label="R" {...props} />;
export const WComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#fbcc0a" label="W" {...props} />;
export const BComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ff6318" label="B" {...props} />;
export const DComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ff6318" label="D" {...props} />;
export const FComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ff6318" label="F" {...props} />;
export const MComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ff6318" label="M" {...props} />;
export const OneComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ee352e" label="1" {...props} />;
export const TwoComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ee352e" label="2" {...props} />;
export const ThreeComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ee352e" label="3" {...props} />;
export const FourComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#00933c" label="4" {...props} />;
export const FiveComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#00933c" label="5" {...props} />;
export const SixComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#00933c" label="6" {...props} />;
export const SixXComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#00933c" label="6" isDiamond {...props} />;
export const AComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#0139a6" label="A" {...props} />;
export const CComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#0139a6" label="C" {...props} />;
export const EComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#0139a6" label="E" {...props} />;
export const JComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#996633" label="J" {...props} />;
export const ZComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#996633" label="Z" {...props} />;
export const LComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#a6a9ac" label="L" {...props} />;
export const SComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#a6a9ac" label="S" {...props} />;
export const SevenComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ba33ad" label="7" {...props} />;
export const SevenXComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#ba33ad" label="7" isDiamond {...props} />;
export const GComponent = (
  props: Omit<TrainComponentProps, 'color' | 'label'>,
) => <TrainComponent color="#6cbe44" label="G" {...props} />;
export const UnknownTrainComponent = ({
  routeId,
  scale = 1,
}: {
  routeId: string;
  scale?: number;
}) => <TrainComponent color="slategray" label={routeId} scale={scale} />;

export const trainIconMap: Record<string, React.FC<TrainIconProps>> = {
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

export const trainFamilyComponents: Record<string, React.FC<TrainIconProps>[]> =
  {
    'Lexington Ave': [FourComponent, FiveComponent, SixComponent],
    '6 Ave': [BComponent, DComponent, FComponent, MComponent],
    Broadway: [NComponent, QComponent, RComponent, WComponent],
    '7 Ave': [OneComponent, TwoComponent, ThreeComponent],
    '8 Ave': [AComponent, CComponent, EComponent],
    'Nassau St': [JComponent, ZComponent],
    Flushing: [SevenComponent],
    '14 St': [LComponent],
    Crosstown: [GComponent],
    Shuttle: [SComponent],
  };

// Optional styles (if needed)
const styles = StyleSheet.create({});

// import React, { FunctionComponent } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// export const NComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
//       <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
//         N
//       </Text>
//     </View>
//   );
// };

// export const QComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
//       <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
//         Q
//       </Text>
//     </View>
//   );
// };
// export const RComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
//       <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
//         R
//       </Text>
//     </View>
//   );
// };
// export const WComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#fbcc0a' }]}>
//       <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold' }}>
//         W
//       </Text>
//     </View>
//   );
// };

// export const BComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
//       <Text style={styles.text}>B</Text>
//     </View>
//   );
// };
// export const DComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
//       <Text style={styles.text}>D</Text>
//     </View>
//   );
// };
// export const FComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
//       <Text style={styles.text}>F</Text>
//     </View>
//   );
// };
// export const MComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ff6318' }]}>
//       <Text style={styles.text}>M</Text>
//     </View>
//   );
// };
// export const OneComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
//       <Text style={styles.text}>1</Text>
//     </View>
//   );
// };
// export const TwoComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
//       <Text style={styles.text}>2</Text>
//     </View>
//   );
// };
// export const ThreeComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#ee352e' }]}>
//       <Text style={styles.text}>3</Text>
//     </View>
//   );
// };
// export const FourComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
//       <Text style={styles.text}>4</Text>
//     </View>
//   );
// };
// export const FiveComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
//       <Text style={styles.text}>5</Text>
//     </View>
//   );
// };
// export const SixComponent = () => {
//   return (
//     <View style={[styles.circle, { backgroundColor: '#00933c' }]}>
//       <Text style={styles.text}>6</Text>
//     </View>
//   );
// };

// export const SixXComponent = () => {
//   return (
//     <View style={[styles.diamond, { backgroundColor: '#00933c' }]}>
//       <Text style={styles.diamondText}>6</Text>
//     </View>
//   );
// };

// export const AComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
//     <Text style={styles.text}>A</Text>
//   </View>
// );

// export const CComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
//     <Text style={styles.text}>C</Text>
//   </View>
// );

// export const EComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#0139a6' }]}>
//     <Text style={styles.text}>E</Text>
//   </View>
// );

// export const JComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#996633' }]}>
//     <Text style={styles.text}>J</Text>
//   </View>
// );

// export const ZComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#996633' }]}>
//     <Text style={styles.text}>Z</Text>
//   </View>
// );

// export const LComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#a6a9ac' }]}>
//     <Text style={styles.text}>L</Text>
//   </View>
// );

// export const SComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#a6a9ac' }]}>
//     <Text style={styles.text}>S</Text>
//   </View>
// );

// export const SevenComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#ba33ad' }]}>
//     <Text style={styles.text}>7</Text>
//   </View>
// );

// export const SevenXComponent = () => (
//   <View style={[styles.diamond, { backgroundColor: '#ba33ad' }]}>
//     <Text style={styles.diamondText}>7</Text>
//   </View>
// );

// export const GComponent = () => (
//   <View style={[styles.circle, { backgroundColor: '#6cbe44' }]}>
//     <Text style={styles.text}>G</Text>
//   </View>
// );

// export const UnknownTrainComponent = ({ routeId }: { routeId: string }) => (
//   <View style={[styles.circle, { backgroundColor: 'slategray' }]}>
//     <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
//       {routeId}
//     </Text>
//   </View>
// );

// const styles = StyleSheet.create({
//   circle: {
//     width: 32,
//     height: 32,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 16,
//     // transform: [{ rotate: '45deg' }],
//   },
//   diamond: {
//     width: 28,
//     height: 28,
//     justifyContent: 'center',
//     alignItems: 'center',
//     transform: [{ rotate: '45deg' }],
//     marginRight: 4,
//   },
//   text: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   diamondText: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     transform: [{ rotate: '-45deg' }],
//   },
// });
